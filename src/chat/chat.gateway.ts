import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import Socket = SocketIO.Socket;


@WebSocketGateway({ namespace: 'messages' })
export class ChatGateway implements OnGatewayInit {

    socket:Socket;

    constructor (private chatService:ChatService) {}

    afterInit (server) {}

    handleConnection (socket) {
        this.socket = socket;
        process.nextTick(() => {
            socket.emit('allMessages', this.chatService.getMessages());
        });
    }

    handleDisconnect (socket) {}

    @SubscribeMessage('isWriting')
    handleIsWriting (sender, user) {
        sender.broadcast.emit('isWriting', user);
    }
}
