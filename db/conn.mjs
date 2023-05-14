import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    });
    console.log('Connected to MongoDB Atlas');
} catch (error) {
    console.log("URL is: ", process.env.ATLAS_URI)
    console.log('Error connecting to MongoDB Atlas', error);
  }
};

export default connectToDatabase;