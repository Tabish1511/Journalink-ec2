import { Router } from 'express';
const messageRouter = Router();
import { wss } from '../websocket'; // Import the WebSocket server if needed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

messageRouter.get('/test', (req, res) => {
  res.send('Hello, messageRoute!');
});

messageRouter.get('/messages', async (req, res) => {
  try {
    const messages = await prisma.message.findMany();
    res.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).send("Failed to fetch messages");
  }
});

export default messageRouter;
