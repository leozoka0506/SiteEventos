SiteEventos
Este é um projeto de site para gerenciamento de eventos, desenvolvido utilizando JavaScript.

Estrutura do Projeto
src/: Contém os arquivos-fonte do projeto.

node_modules/: Diretório de dependências gerenciadas pelo npm.

.env: Arquivo para variáveis de ambiente.

package.json: Arquivo de configuração do projeto, incluindo scripts e dependências.

package-lock.json: Arquivo que registra as versões exatas das dependências instaladas.

Tecnologias Utilizadas
JavaScript

Node.js

Como Executar
Clone o repositório:

git clone https://github.com/leozoka0506/SiteEventos.git
Navegue até o diretório do projeto:

cd SiteEventos
Instale as dependências:

npm install
Inicie o projeto:

npm start
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests

estrutura de projeto (2025/05/08): 
src/
├── models/           # Schemas do MongoDB (Eventos, Usuários, Tickets)
├── controllers/      # Lógica de negócio (Eventos, Autenticação)
├── middlewares/      # Validação e autorização
├── config/           # Configuração do banco de dados
.env                  # Variáveis de ambiente (MongoDB, JWT)

Permissões

    Rotas administrativas usam o middleware adminMiddleware (usuário precisa ter role: "admin" no banco).

    Inclua o token JWT no header Authorization para rotas protegidas.

Segurança

    Rotas administrativas requerem role admin no banco de dados

    Sempre utilize HTTPS em produção para mitigar riscos de MITM, injeções SQL e invasões comuns pela porta 22

    Tokens JWT têm validade de 1 hora (configurável no código)


funções básicas de como criar e registrar um evento: 

curl -X POST http://localhost:3000/api/events \
-H "Authorization: Bearer SEU_TOKEN_JWT" \
-H "Content-Type: application/json" \
-d '{
  "title": "Conferência de TI",
  "date": "2024-10-20",
  "location": "Auditório Principal"
}'



curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Ana Costa",
  "email": "ana@exemplo.com",
  "password": "senhaSegura123"
}'

Licença
Este projeto está licenciado sob a MIT License.



Raw Docs:








