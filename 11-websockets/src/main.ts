import { WebSocket, WebSocketServer } from 'ws';

const port = 3000


// CREACION DEL SERVIDOR/SERVICIO
const wss = new WebSocketServer({ port });


// Cuando un cliente se conecte...
wss.on('connection', (ws) => {

    console.log('Client connected')

    // Cuando se desconecte el cliente
    ws.on('close', () => console.log('Client disconnected'));
    
    ws.on('error', console.error);

    // Cuando se reciba un nuevo mensaje
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        const resp = {
            type: 'server-msg',
            payload: data.toString().toUpperCase(),
        }

        // Obtener los clientes del servidor WebSocket
        wss.clients.forEach( (client) => {
            // Enviar el mensaje recibido, excepto a quien genero el mensaje (este WebSocket) y que este OPEN
            if( client !== ws && client.readyState === WebSocket.OPEN){
                client.send( JSON.stringify(resp) )
            }
        })

        // Esperar 1 seg y responder
        // setTimeout(() => {
        //     ws.send( JSON.stringify(resp) )
        // }, 1000);
    });

    // Enviar un mensaje "de bienvenida"
    ws.send(JSON.stringify({
        type: 'server-msg',
        payload: 'Hi from server',
    }));
});


console.log(`Server running on port localhost:${port}`);