Gestão de Equipamentos Fotográficos

📌 Sobre o Projeto

Este projeto tem como objetivo facilitar a gestão de equipamentos fotográficos e clientes, permitindo o controle de empréstimos, disponibilidade e histórico de uso.

🚀 Tecnologias Utilizadas

Backend: Node.js, Express

Banco de Dados: (Escolheremos entre MongoDB ou PostgreSQL)

Frontend: React.js

Autenticação: JWT (JSON Web Token)

Gerenciamento de Estado: Context API ou Redux

Estilização: TailwindCSS

Controle de Versão: Git & GitHub

📂 Estrutura do Projeto

/server
│── controllers/       # Lógica dos endpoints
│── models/            # Modelos do banco de dados
│── routes/            # Definição das rotas
│── middlewares/       # Middleware de autenticação e validação
│── config/            # Configuração do banco de dados
│── uploads/           # Pasta para armazenar imagens
│── server.js          # Arquivo principal
│── .env               # Variáveis de ambiente

📖 Como Rodar o Projeto

Clone o repositório:

git clone https://github.com/seu-usuario/gestao-equipamentos.git

Acesse a pasta do backend:

cd server

Instale as dependências:

npm install

Crie um arquivo .env e configure as variáveis de ambiente:

PORT=5000
DATABASE_URL=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta

Inicie o servidor:

node server.js

Agora, o servidor estará rodando em http://localhost:5000/ 🚀

✨ Próximos Passos

Criar os modelos de dados

Definir as rotas principais

Desenvolver o frontend em React.js

Implementar autenticação com JWT

💡 Contribuições e sugestões são bem-vindas!

