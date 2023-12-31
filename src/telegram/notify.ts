import { telegramRequest } from '.';

interface Notification {
  text: string;
}

const sendAlert = async (notification: Notification) => {
  const body = {
    chat_id: `${Bun.env.CHAT_ID}`,
    text: notification.text,
    parse_mode: 'MarkdownV2',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Acknowledge',
            callback_data: 'ack',
          },
        ],
      ],
    },
  };

  await telegramRequest('sendMessage', body);
};

const sendMessage = async (text: string) => {
  const body = {
    chat_id: `${Bun.env.CHAT_ID}`,
    text: text,
    parse_mode: 'MarkdownV2',
  };

  await telegramRequest('sendMessage', body);
};

const answerAcknowledge = async (messageId: number, chatId: number) => {
  telegramRequest('editMessageText', {
    text: 'O evento foi coisado',
    message_id: messageId,
    chat_id: chatId,
    reply_markup: { inline_keyboard: [] },
  });
};

export { sendAlert, answerAcknowledge, sendMessage };
