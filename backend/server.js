// backend/server.js
import express from 'express';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // Add this line

//ajout tarek
import path from 'path';
import cors from 'cors';

dotenv.config();

import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//modif tarek
const port = process.env.PORT || 5050; 
//const port = process.env.PORT || 5000; 

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins }));

app.get('/', (req, res) => { 
   res.send('API is running...')
});

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // Add this line

//ajout tarek
if (process.env.NODE_ENV === 'production') {
   const __dirname = path.resolve();
   app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
   app.use(express.static(path.join(__dirname, '/frontend/build')));
 
   //any route that is not api will be redirected to index.html
   app.get('*', (req, res) =>
     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
   );
 } else {
   const __dirname = path.resolve();
   app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
   app.get('/', (req, res) => {
     res.send('API is running....');
   });
 }

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))