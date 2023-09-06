import { Socket } from 'bun';
import { SocketData } from '.';

const open = (socket: Socket<SocketData>) => {
  socket.data = { id: 0 };
};

export { open };
