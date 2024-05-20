
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';

// import postRoutes from './routes/posts.js';
import studentRoutes from './routes/student.js';
import companyRoutes from './routes/company.js';
import opportunityRoutes from './routes/opportunity.js';


dotenv.config();
const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/student', studentRoutes);
app.use('/company', companyRoutes);
app.use('/opportunity', opportunityRoutes);


const CONNECTION_URL = process.env.DB_URL ||'mongodb://localhost:27017/' ;
const PORT = process.env.PORT|| 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}\nDataBase Running on: ${CONNECTION_URL}`)))
  .catch((error) => console.log(`${error} => did not connect`));

mongoose.set('useFindAndModify', false);

