import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "O título do evento é obrigatório"], 
      minlength: [5, "O título deve ter pelo menos 5 caracteres"]
    },
    date: { 
      type: Date, 
      required: [true, "A data do evento é obrigatória"],
      validate: {
        validator: (value) => value > new Date(),
        message: "A data do evento deve ser no futuro"
      }
    },
    location: { 
      type: String, 
      required: [true, "A localização do evento é obrigatória"]
    }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
