import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "O nome é obrigatório"], 
      minlength: [3, "O nome deve ter pelo menos 3 caracteres"]
    },
    email: { 
      type: String, 
      required: [true, "O email é obrigatório"], 
      unique: true, 
      match: [/.+\@.+\..+/, "Por favor, insira um email válido"]
    },
    password: { 
      type: String, 
      required: [true, "A senha é obrigatória"], 
      minlength: [6, "A senha deve ter pelo menos 6 caracteres"]
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
