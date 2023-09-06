const baseURL = `https://api.telegram.org/bot${Bun.env.TELEGRAM_BOT_TOKEN}`;

const telegramRequest = (endpoint: string, body: unknown) =>
  fetch(`${baseURL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).catch(() => undefined);

export { baseURL, telegramRequest };
