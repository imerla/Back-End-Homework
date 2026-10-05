import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { SocketEvents, Message } from '../shared/types';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  // Track which room each socket is in
  private socketRoomMap: Map<string, string> = new Map();

  constructor(private readonly roomsService: RoomsService) {
    this.roomsService.registerTypingExpiredCallback((roomCode, socketId) => {
      this.broadcastTyping(roomCode);
    });
  }

  private broadcastTyping(roomCode: string): void {
    const room = this.roomsService.getRoom(roomCode);
    if (!room) return;

    for (const [socketId] of room.users.entries()) {
      const typingUsers = this.roomsService.getTypingUsers(roomCode, socketId);
      this.server.to(socketId).emit(SocketEvents.TYPING_UPDATE, { users: typingUsers });
    }
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const roomCode = this.socketRoomMap.get(client.id);
    
    if (roomCode) {
      const username = this.roomsService.removeUserFromRoom(roomCode, client.id);
      this.socketRoomMap.delete(client.id);
      
      if (username) {
        this.server.to(roomCode).emit(SocketEvents.ROOM_USER_LEFT, { username });
        this.broadcastTyping(roomCode);
      }
    }
  }

  @SubscribeMessage(SocketEvents.ROOM_CREATE)
  handleCreateRoom(
    @MessageBody() createRoomDto: CreateRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { username } = createRoomDto;
    
    try {
      const code = this.roomsService.generateRoomCode();
      const room = this.roomsService.createRoom(code);
      
      this.roomsService.addUserToRoom(code, client.id, username);
      this.socketRoomMap.set(client.id, code);
      
      client.join(code);
      
      client.emit(SocketEvents.ROOM_JOINED, {
        code,
        users: this.roomsService.getUsers(code),
        history: this.roomsService.getMessages(code),
      });
      
      console.log(`Room created: ${code} by ${username}`);
    } catch (error) {
      client.emit(SocketEvents.ERROR, { message: 'Failed to create room' });
    }
  }

  @SubscribeMessage(SocketEvents.ROOM_JOIN)
  handleJoinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { code, username } = joinRoomDto;
    
    if (!this.roomsService.hasRoom(code)) {
      client.emit(SocketEvents.ERROR, { message: 'Invalid room code' });
      return;
    }
    
    const added = this.roomsService.addUserToRoom(code, client.id, username);
    
    if (!added) {
      client.emit(SocketEvents.ERROR, { message: 'Username already taken in this room' });
      return;
    }
    
    this.socketRoomMap.set(client.id, code);
    client.join(code);
    
    client.emit(SocketEvents.ROOM_JOINED, {
      code,
      users: this.roomsService.getUsers(code),
    });
    
    // Notify others in the room
    client.to(code).emit(SocketEvents.ROOM_USER_JOINED, { username });
    
    console.log(`${username} joined room: ${code}`);
  }

  @SubscribeMessage(SocketEvents.ROOM_LEAVE)
  handleLeaveRoom(@ConnectedSocket() client: Socket) {
    const roomCode = this.socketRoomMap.get(client.id);
    
    if (roomCode) {
      const username = this.roomsService.removeUserFromRoom(roomCode, client.id);
      this.socketRoomMap.delete(client.id);
      
      client.leave(roomCode);
      
      if (username) {
        this.server.to(roomCode).emit(SocketEvents.ROOM_USER_LEFT, { username });
        this.broadcastTyping(roomCode);
      }
      
      console.log(`${username} left room: ${roomCode}`);
    }
  }

  @SubscribeMessage(SocketEvents.MESSAGE_SEND)
  handleMessageSend(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const roomCode = this.socketRoomMap.get(client.id);
    
    if (!roomCode) {
      client.emit(SocketEvents.ERROR, { message: 'Not in a room' });
      return;
    }
    
    const room = this.roomsService.getRoom(roomCode);
    if (!room) {
      client.emit(SocketEvents.ERROR, { message: 'Room not found' });
      return;
    }
    
    const username = room.users.get(client.id);
    if (!username) {
      client.emit(SocketEvents.ERROR, { message: 'User not found in room' });
      return;
    }
    
    const message: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      username,
      text: sendMessageDto.text.trim(),
      timestamp: Date.now(),
    };
    
    this.roomsService.addMessage(roomCode, message);
    
    // Clear typing state for this user when they send a message
    this.roomsService.clearTyping(roomCode, client.id);
    
    // Broadcast to all in room (including sender)
    this.server.to(roomCode).emit(SocketEvents.MESSAGE_NEW, message);
    
    this.broadcastTyping(roomCode);
  }

  @SubscribeMessage(SocketEvents.TYPING_START)
  handleTypingStart(@ConnectedSocket() client: Socket) {
    const roomCode = this.socketRoomMap.get(client.id);
    
    if (roomCode) {
      const wasAlreadyTyping = this.roomsService.setTyping(roomCode, client.id);
      
      // Only broadcast if this is a new typing state
      if (!wasAlreadyTyping) {
        this.broadcastTyping(roomCode);
      }
    }
  }

  @SubscribeMessage(SocketEvents.TYPING_STOP)
  handleTypingStop(@ConnectedSocket() client: Socket) {
    const roomCode = this.socketRoomMap.get(client.id);
    
    if (roomCode) {
      this.roomsService.clearTyping(roomCode, client.id);
      this.broadcastTyping(roomCode);
    }
  }
}
