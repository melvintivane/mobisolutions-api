import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/mobisolutions-db"
    );
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro na conexão com MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
