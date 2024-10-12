import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DATABASE || 'mongodb://localhost:27017/mydb', {})
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.error(err));

// API Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

// WebSocket setup
io.on("connection", (socket: Socket) => {
  console.log("New client connected:", socket.id);

  socket.on("message", (data: any) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
