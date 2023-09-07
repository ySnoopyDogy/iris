import { open, close, data, SocketData } from './listeners';
import { startPolling } from './telegram/updates';
import { openDabatase } from './database';
import { populateCommands } from './telegram/parseCommand';

const PORT = 42069;

openDabatase();
await populateCommands();

Bun.listen<SocketData>({
  hostname: '0.0.0.0',
  port: PORT,
  socket: { open, close, data },
}).ref();

console.log(`Listening to TCP on ${PORT}`);

startPolling();
