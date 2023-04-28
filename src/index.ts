import {
    Server
} from './server';
import {
    WebSocketServer
} from 'ws';

import {
    authenticateToken
} from './utils/Authenticate';
import {
    AppDataSource
} from './data-source';
import {
    User
} from './entity/User';
import {
    Group
} from './entity/Friends';
import {
    Messages
} from './entity/Message';

let server = new Server().app;

let port = 9000;

server.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})




const wss = new WebSocketServer({
    port: 8080
});
const clients = new Map();


wss.on('connection', async (ws, req) => {

    const token = req.headers.authorization
    const authentication: any = authenticateToken(token)

    // Authenticate the message sender 
    if (!authentication) {
        ws.send("Invalid Authorization");
        ws.close();
        return;
    }

    // get user id with authentication 
    const id = authentication.user_id
    // set user id as client id 
    clients.set(id, ws!);

    ws.send('welcome to the websocket server!');

    // 
    ws.on('message', async function message(data: string) {

        try {
            const messageData= JSON.parse(data)

            const targetID:string = messageData.targetID
            const content:string = messageData.messageBody
            const receiverType:string = messageData.receiverType

            const userRepository = AppDataSource.getRepository(User)
            const groupRepository = AppDataSource.getRepository(Group)


            const user = await userRepository.findOneBy({
                id: id
            })

            console.log(clients)

            const targetClient = clients.get(Number(targetID));
            
            if (targetClient) {
                targetClient.send(content);
            } else {
                console.log(`Client with id ${targetClient} not found`)
            }
            
            const messageRepository = AppDataSource.getRepository(Messages)
            if (receiverType === "user") {

                const targetUser = await userRepository.findOneBy({
                    id: Number(targetID)
                })

                const message = new Messages();
                message.user = user;
                message.receiver = targetUser;
                message.message_body = content;

                await messageRepository.save(message);

            } else {

                const group = await groupRepository.findOneBy({
                    id: Number(targetID)
                })

                const message = new Messages();
                message.user = user;
                message.group_receiver = group;
                message.message_body = content;

                await messageRepository.save(message);

            }

            console.log(`received ${data}`)
        } catch (error) {
            console.log(error)
            ws.close()
            return;
        }



    });

    ws.on('close', async () => {
        console.log("client disconnected");
        await ws.close();
    })
})