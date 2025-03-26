import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔥 Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra a aplicação se a conexão falhar
  }
};


export default connectDB