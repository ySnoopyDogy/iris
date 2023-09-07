import type { Message } from '@grammyjs/types';
import { readdir } from 'node:fs';
import { resolve } from 'node:path';

interface Command {
  name: string;
  execute: (message: Message) => void;
}
const availableCommands: Command[] = [];

const populateCommands = async () =>
  new Promise((res, rej) => {
    readdir(resolve(import.meta.dir, 'commands'), (err, files) => {
      if (err) return rej(err);

      files.forEach(async (file, i) => {
        const mod = await import(resolve(`${import.meta.dir}/commands/${file}`));
        availableCommands.push({
          name: file.substring(0, file.length - 3),
          execute: mod.default,
        });

        if (i === files.length - 1) res(undefined);
      });
    });
  });

const parseCommand = (message: Message) => {
  if (!message.entities) return;

  if (!message.entities.some((a) => a.type === 'bot_command')) return;

  const [command] = message.text!.split(' ');
  const execute = availableCommands.find((cmd) => `/${cmd.name}` === command);
  if (!execute) return;

  execute.execute(message);
};

export { parseCommand, populateCommands };
