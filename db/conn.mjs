import mongoose from 'mongoose';

// 
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("URL is: ", process.env.MONGODB_URI)
    console.log('Error connecting to MongoDB', error);
  }
};

export default connectToDatabase;