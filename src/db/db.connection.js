import mongoose from "mongoose";

const connectToDB = async () => {
    try {
      const { connection } = await mongoose.connect(`${process.env.MONGO_URI}`);
  
      if (connection) {
        console.log(`DB is connected ${connection.host}`);
      }
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  };
  
  export default connectToDB;
  