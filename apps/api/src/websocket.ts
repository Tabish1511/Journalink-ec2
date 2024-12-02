import { WebSocketServer } from 'ws';
import { httpServer } from './index';
import { createClient } from 'redis';

// const client = createClient({
//   url: process.env.EXTERNAL_REDIS_URL,
// });
// const client = createClient();

const client = createClient({
  url: 'redis://journalink-redis:6379'
});
client.on('error', (err) => console.error('Redis client error:', err));

const wss = new WebSocketServer({ server: httpServer, path: '/api/v1/chatWs' });

wss.on('connection', function connection(ws) {
  ws.on('message', async function message(data, isBinary) {

    try{
      client.lPush('newMessages', data.toString());   // << One way to make the delivery faster
      console.log('Message saved to Redis');
    }catch(e){
      console.error('Error saving message to redis:', e);
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

async function startServer(){
  try{
    await client.connect();
    console.log('Connected to Redis from websocket server');
  }catch(e){
    console.log('Error connecting to Redis:', e);
  }
}

startServer();

export { wss };
