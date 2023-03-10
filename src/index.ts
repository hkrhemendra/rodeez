import {
    Server
} from './server';
import {
    WebSocketServer
} from 'ws';
import * as url from 'url';
import * as uuid from 'uuid';

let server = new Server().app;

let port = 9000;

server.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})




const wss = new WebSocketServer({
    port: 8080
});
const clients = new Map<string, any>();

wss.on('connection', (ws)=> {
    const id = uuid.v4();
    clients.set(id, ws);

    ws.send(`welcome, your id is ${id}`)
    ws.on('message', function message(data: string) {
        
        const {targetID, content} = JSON.parse(data)

        const targetClient = clients.get(targetID);
        if(targetClient){
            targetClient.send(content);
            
        }else{
            console.log(`Client with id ${targetID} not found`)
        }
        console.log(`received ${data}`)

    });

    ws.send('something')
})