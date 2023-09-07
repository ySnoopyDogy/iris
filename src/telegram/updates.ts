import { Update } from '@grammyjs/types';
import { telegramRequest } from '.';
import { answerAcknowledge } from './notify';
import { parseCommand } from './parseCommand';

let offset = 0;
const timeout = 60;
const limit = 100;
const allowed_updates = ['message', 'callback_query'];

const startPolling = async (): Promise<void> => {
  const response = await telegramRequest('getUpdates', { offset, timeout, allowed_updates, limit });

  if (!response) return startPolling();

  const parsed = await response.json();

  const updates = parsed.result;

  if (updates.length === 0) return startPolling();

  updates.forEach((event: Update) => {
    offset = event.update_id + 1;

    if (event.callback_query)
      return answerAcknowledge(
        event.callback_query.message!.message_id,
        event.callback_query.message!.chat.id,
      );

    if (!event.message) return;
    parseCommand(event.message);
  });

  startPolling();
};

export { startPolling };
