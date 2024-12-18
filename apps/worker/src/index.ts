import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });
import http from 'http';

const prisma = new PrismaClient();

// const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
//   // Set CORS headers
//   response.setHeader('Access-Control-Allow-Origin', '*'); // Or specify 'http://localhost:3000' instead of '*'
//   response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (request.method === 'OPTIONS') {
//       response.writeHead(204);
//       response.end();
//       return;
//   }

//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello, World!\n');
// };  

// const server = http.createServer(requestHandler);

// const client = createClient({
//   url: process.env.EXTERNAL_REDIS_URL,
// });
// const client = createClient();

const client = createClient({
  url: 'redis://journalink-redis:6379'
});

console.log('redis Worker started');

async function processMessage(message: string) {
  try {
    await prisma.message.create({
      data: {
        content: message,
      },
    });
    console.log('Message saved to database');
  } catch (error) {
    console.error('Error saving message to database:', error);
  }
}

async function startWorker() {
  try {
      await client.connect();
      console.log('Connected to Redis from worker');
  } catch (error) {
      console.error('Failed to connect to Redis:', error);
      return; // Exit if Redis connection fails
  }

  while (true) {
      if (!client.isOpen) {
          console.error('Redis connection lost. Exiting worker loop.');
          break;
      }
      try {
          const messageData = await client.brPop("newMessages", 0);
          if (messageData?.element) {
              await processMessage(messageData.element);
              console.log('Message processed in BG WORKER');
          } else {
              console.log('NO MESSAGE IN BG WORKER');
          }
      } catch (error) {
          console.error("Error processing message:", error);
      }
  }
}

startWorker();

// server.listen(4000);