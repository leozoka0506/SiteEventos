import mongoose from "mongoose";

// Define o schema (esquema) para a coleção de eventos
const eventSchema = new mongoose.Schema(
  {
    // Campo obrigatório: título do evento
    title: { 
      type: String, 
      required: [true, "O título do evento é obrigatório"], // Mensagem personalizada se não for fornecido
      minlength: [5, "O título deve ter pelo menos 5 caracteres"] // Validação de comprimento mínimo
    },
    // Campo obrigatório: data do evento
    date: { 
      type: Date, 
      required: [true, "A data do evento é obrigatória"],
      validate: {
        // Valida se a data informada é futura
        validator: (value) => value > new Date(),
        message: "A data do evento deve ser no futuro" // Mensagem de erro personalizada
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
