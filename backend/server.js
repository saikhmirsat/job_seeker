import dotenv from 'dotenv';
import app from './app.js';
import cloudinary from 'cloudinary';

// Load environment variables from .env file
dotenv.config();

// Check for required environment variables and handle missing variables
const requiredEnvVars = [
  'CLOUDINARY_CLIENT_NAME',
  'CLOUDINARY_CLIENT_API',
  'CLOUDINARY_CLIENT_SECRET',
  'PORT',
];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Environment variable ${varName} is not defined.`);
    process.exit(1); // Exit the process with a failure code
  }
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Start the server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
    