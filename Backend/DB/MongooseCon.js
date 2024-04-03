import mongoose from "mongoose";

const MongooseCon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("error conneting to MongoDB :", error.message);
  }
};

export default MongooseCon;
