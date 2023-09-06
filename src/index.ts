import { open, close, data, SocketData } from './listeners';

const PORT = 42069;

Bun.listen<SocketData>({
  hostname: '0.0.0.0',
  port: PORT,
  socket: { open, close, data },
}).ref();

console.log(`Listening to TCP on ${PORT}`);