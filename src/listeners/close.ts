import { Socket } from 'bun';
import { SocketData } from '.';

const close = (socket: Socket<SocketData>) => {
  console.log(`Socket ${socket.data.id} closed`);
};

export { close };
