Event API

Uma API RESTful para gerenciamento de eventos, usuários e tickets. Desenvolvida com Node.js, Express e MongoDB.

📋 Funcionalidades

- Autenticação de usuários (JWT)
- Criação, listagem, atualização e exclusão de eventos
- Compra de tickets associando usuários e eventos
- Controle de permissões (usuário e admin)
- Validação de dados com express-validator
- Cobertura de testes com Jest e Supertest

Tecnologias Utilizadas

- Node.js
- Express
- MongoDB com Mongoose
- JWT para autenticação
- Bcryptjs para hash de senhas
- Express Validator
- Jest + Supertest (testes automatizados)
- Dotenv para variáveis de ambiente

Como Rodar o Projeto

1. Clone o repositório:
bash
git clone https://github.com/seu-usuario/event-api.git
cd event-api

Instale as dependências:
npm install

Crie um arquivo .env com as variáveis:MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta
PORT=5000

Execute o servidor:
npm run dev

Endpoints Principais:
| Método | Rota                    | Descrição                        | Protegida |
| ------ | ----------------------- | -------------------------------- | --------- |
| POST   | /api/auth/register      | Registrar novo usuário           | ❌         |
| POST   | /api/auth/login         | Login de usuário                 | ❌         |
| GET    | /api/users              | Listar todos os usuários (admin) | ✅         |
| PUT    | /api/users/promote/\:id | Promover usuário a admin         | ✅ admin   |
| GET    | /api/events             | Listar eventos                   | ❌         |
| POST   | /api/events             | Criar novo evento                | ✅ admin   |
| POST   | /api/tickets            | Comprar ticket                   | ✅         |

Estrutura de Entidades
User: name, email, password, role (user/admin)

Event: title, date, location

Ticket: userId, eventId, price
Integrantes
Leonardo (desenvolvedor principal)
Samuel(testes e integração final)
Tito(Documentação)

Link para o vídeo de apresentação:
https://youtu.be/fxwgV1JEj9M
