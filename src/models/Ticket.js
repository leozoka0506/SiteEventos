import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event",
      required: true
    },
    price: {
      type: Number, 
      required: true,
      min: [0, "O preço do ingresso não pode ser negativo"]
    }
  },
  { timestamps: true } 
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
