import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import connectDB from './Config/Connection.js';
import userRoutes from './Routes/UserRoutes.js';
const app = express()
const DATABASE_URL=process.env.DATABASE_URL;
// console.log(DATABASE_URL);
connectDB(DATABASE_URL);
//JSON:-
app.use(express.json())
//Load Routes:--
 app.use("/user",userRoutes);
app.get('/', function (req, res) {
  res.send('Hello World goodmorning')
})

app.listen(process.env.PORT);