import {
  MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/live', cors: { origin: '*' } })
export class LiveGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;

  handleConnection(socket: any) {
    // client can join a match room by sending { matchId } to 'join'
  }
  handleDisconnect(socket: any) {}

  // This method can be used by clients to join a match room
  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { matchId: string }) {
    const room = `match:${data.matchId}`;
    // @ts-ignore
    const socket = (this as any).server?.of('/live')?.sockets?.get(this['client']?.id) || null;
    // best: clients emit 'join' themselves; but services will emit globally to room as well
    return { ok: true, room };
  }

  emitToMatch(matchId: string, event: string, payload: any) {
    this.server.to(`match:${matchId}`).emit(event, payload);
  }

  // Allow controllers/services to add clients to room by id
  addToRoom(client: any, matchId: string) {
    client.join(`match:${matchId}`);
  }
}
