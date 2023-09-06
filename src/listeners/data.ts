import { Socket } from 'bun';
import { SocketData } from '.';

const data = (socket: Socket<SocketData>, data: Buffer) => {
  console.log(`Message from ${socket.data.id}`, data.toString('utf-8'));
};

export { data };
