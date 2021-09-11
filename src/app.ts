import './models/review';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import trackRoutes from './routes/review';


const app = express();   

app.use(bodyParser.json());
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:4DUJ6qEaQvmBbj4@cluster0.wwxiu.mongodb.net/reviews?retryWrites=true&w=majority';
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.`  );
}
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance'); 
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send(`hello world`);
});
 
app.listen(3000, () => {
  console.log('Listening on port 3000');  
});  