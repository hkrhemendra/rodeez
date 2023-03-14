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
const clients = new Map < string,
    any > ();

wss.on('connection', async (ws, req) => {

    const token = req.headers.authorization
    const authentication: any = authenticateToken(token)

    if (!authentication) {
        ws.send("Invalid Authorization");
        ws.close();
        return;
    }

    const id = authentication.user_id
    clients.set(id, ws);

    ws.on('message', async function message(data: string) {

        try {
            const messageData= JSON.parse(data)

            const targetID:string = messageData.targetId
            const content:string = messageData.messageBody
            const receiverType:string = messageData.receiverType

            console.log("target id -------> ", JSON.parse(data))

            const userRepository = AppDataSource.getRepository(User)
            const groupRepository = AppDataSource.getRepository(Group)

            console.log('id -----------> ', typeof id)

            const user = await userRepository.findOneBy({
                id: id
            })

            const targetClient = clients.get(targetID);
            if (targetClient) {
                targetClient.send(content);
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
            } else {
                console.log(`Client with id ${targetID} not found`)
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