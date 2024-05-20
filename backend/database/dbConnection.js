import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const dbConnection = () => {
  const mongoUrl = "mongodb+srv://tripathysatyaranjan389:tripathysatyaranjan389@cluster0.luc1qns.mongodb.net/jobPortal"

  if (!mongoUrl) {
    console.error('MONGO_URL environment variable not defined.');
    process.exit(1); // Exit the process with a failure code
  }

  mongoose
    .connect(mongoUrl, {
      dbName: 'MERN_JOB_SEEKING_WEBAPP',
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    })
    .then(() => {
      console.log('Connected to database.');
    })
    .catch((err) => {
      console.error(`Error connecting to the database: ${err.message}`);
      process.exit(1); // Exit the process with a failure code
    });

  mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err.message}`);
  });
};
