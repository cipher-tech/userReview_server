import {config} from 'dotenv';
import './models/review';
import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import trackRoutes from './routes/review';
import cors from 'cors'
import Server from "socket.io";
import { createServer, Server as serve } from "http";
import ioClient from 'socket.io-client';

config()
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(trackRoutes);

if (!process.env.DATABASE_URL) {
  throw new Error(
    `MongoURI was not supplied.`);
}
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

const httpServer = createServer(app)

export const io = (Server as any)(httpServer, {
  cors: {
    origin: "*",
  }
});

io.on("connect", (socket: any) => {
  socket.on("review_added", async () => {
    const Review = mongoose.model('Review');
    
    const reviews = await Review.find();

    io.emit("New_review", { status: "successful", reviews } );
  })
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
