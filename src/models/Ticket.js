/**
 * Modelo de Ingresso (Ticket)
 * Representa um ingresso associado a um usuário e a um evento.
 *
 * Campos:
 * - user: ObjectId (referência ao modelo User), obrigatório
 * - event: ObjectId (referência ao modelo Event), obrigatório
 * - price: número, obrigatório, não pode ser negativo
 * 
 * Inclui timestamps automáticos (createdAt e updatedAt)
 */


import mongoose from "mongoose";

// Define o schema (estrutura) para o modelo de ingresso (Ticket)
const ticketSchema = new mongoose.Schema(
  {
    // Referência ao usuário que comprou o ingresso
    user: { 
      type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId referenciando outro documento
      ref: "User", // Relacionamento com o modelo 'User'
      required: [true, "O ID do usuário é obrigatório"] // Validação com mensagem personalizada
    },
    // Referência ao evento relacionado ao ingresso
    event: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event", // Relacionamento com o modelo 'Event'
      required: [true, "O ID do evento é obrigatório"]
    },
    // Preço do ingresso
    price: { 
      type: Number, 
      required: [true, "O preço do ingresso é obrigatório"], // Campo obrigatório 
      min: [0, "O preço do ingresso não pode ser negativo"]  // Validação: não pode ser menor que zero
    }
  },
  // Adiciona automaticamente os campos createdAt e updatedAt
  { timestamps: true }
);

// Cria o modelo 'Ticket' baseado no schema definido acima
const Ticket = mongoose.model("Ticket", ticketSchema);

// Exporta o modelo para ser utilizado em outras partes da aplicação
export default Ticket;
