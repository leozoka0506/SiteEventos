/**
 * Modelo de Usuário (User)
 * Representa um usuário da aplicação, com autenticação básica e controle de acesso.
 *
 * Campos:
 * - name: string, obrigatório, mínimo 3 caracteres
 * - email: string, obrigatório, único, deve ter formato válido
 * - password: string, obrigatório, mínimo 6 caracteres (deve ser criptografada antes de salvar)
 * - role: string, opcional, valores permitidos: "user" ou "admin", padrão: "user"
 *
 * Inclui timestamps automáticos (createdAt e updatedAt)
 */

import mongoose from "mongoose";

// Define o schema (estrutura) do usuário
const userSchema = new mongoose.Schema(
  {
    // Nome do usuário
    name: { 
      type: String, 
      required: [true, "O nome é obrigatório"], // Validação obrigatória com mensagem
      minlength: [3, "O nome deve ter pelo menos 3 caracteres"] // Validação de tamanho mínimo
    },

    // Email do usuário
    email: { 
      type: String, 
      required: [true, "O email é obrigatório"], 
      unique: true, // Garante que não existam emails duplicados
      match: [/.+\@.+\..+/, "Por favor, insira um email válido"] // Validação de formato de email
    },

    // Senha do usuário (deve ser criptografada antes de salvar no banco)
    password: { 
      type: String, 
      required: [true, "A senha é obrigatória"], 
      minlength: [6, "A senha deve ter pelo menos 6 caracteres"]
    },

    // Papel do usuário: 'user' (padrão) ou 'admin'
    role: { 
      type: String, 
      enum: ["user", "admin"], // Define os valores permitidos
      default: "user"  // Valor padrão caso não seja especificado
    }
  },
  // Adiciona automaticamente os campos createdAt e updatedAt
  { timestamps: true }
);

// Cria o modelo 'User' baseado no schema definido
const User = mongoose.model("User", userSchema);

// Exporta o modelo para uso em outras partes da aplicação
export default User;
