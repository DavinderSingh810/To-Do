const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/todoDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB successfully!');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); 
    }
  };
  

  export default connectDB;
 

