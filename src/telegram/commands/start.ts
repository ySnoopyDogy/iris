import { Message } from '@grammyjs/types';
import { sendMessage } from '../notify';
import { getOpenAlerts } from '../../database';

export default async (message: Message) => {
  if (`${message.chat.id}` !== Bun.env.CHAT_ID) return;

  const openAlerts = getOpenAlerts();

  await sendMessage(
    `💓 Ohayo, ${message.from?.first_name} 💓\n\nExistem *${openAlerts}* alertas abertos`,
  );
};
