import { telegramRequest } from '.';
import { answerAcknowledge, sendAlert } from './notify';

let offset = 0;
const timeout = 60;
const limit = 1;
const allowed_updates = ['message', 'callback_query'];

const startPolling = async (): Promise<void> => {
  const response = await telegramRequest('getUpdates', { offset, timeout, allowed_updates, limit });

  if (!response) return startPolling();

  const parsed = await response.json();

  if (parsed.result.length === 0) return startPolling();

  const [event] = parsed.result;

  offset = event.update_id + 1;

  if (event.callback_query)
    answerAcknowledge(
      event.callback_query.message.message_id,
      event.callback_query.message.chat.id,
    );

  if (event.message) {
    sendAlert({ text: 'ALERTA UWU' });
  }

  startPolling();
};

export { startPolling };
