import { Message } from "../interface/Message";
import * as io from 'socket.io-client'

export function sendMessage(message: Message, host){
    const socket = io.io(host)
    socket.emit('new message', message);
}