import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "O ID do usuário é obrigatório"]
    },
    event: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event", 
      required: [true, "O ID do evento é obrigatório"]
    },
    price: { 
      type: Number, 
      required: [true, "O preço do ingresso é obrigatório"], 
      min: [0, "O preço do ingresso não pode ser negativo"]
    }
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
