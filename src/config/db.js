/**
 * Função para conectar ao MongoDB usando Mongoose.
 * 
 * - Lê a variável de ambiente MONGO_URI do arquivo .env
 * - Emite logs no console sobre o status da conexão
 * - Encerra o processo se ocorrer algum erro de conexão
 */

// Importa o mongoose para gerenciar a conexão com o MongoDB
import mongoose from "mongoose";

// Importa dotenv para carregar variáveis de ambiente do arquivo .env
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

/**
 * Conecta ao banco de dados MongoDB utilizando a URI fornecida via variável de ambiente.
 * Em caso de erro, exibe mensagem e encerra o processo.
 */
const connectDB = async () => {
  try {
    // Verifica se a URI do MongoDB está definida no arquivo .env
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI não está definido no .env");
    }
    
    console.log("Conectando ao MongoDB...");

    // Tenta estabelecer conexão com o banco de dados
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Usa o novo mecanismo de descoberta de servidores
    });
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    // Em caso de erro, exibe a mensagem e encerra o processo
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra com código de erro
  }
};

// Exporta a função para ser usada em outras partes da aplicação (server.js)
export default connectDB;
