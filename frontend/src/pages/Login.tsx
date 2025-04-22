import { useState } from "react"; // Importa o hook useState para gerenciar o estado dos inputs
    
export default function Login() {
  // Define estados para armazenar os valores de email e senha digitados pelo usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função que lida com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
    console.log("Login:", { email, password }); // Exibe no console os valores digitados
  };

  return (
    // Div principal que ocupa toda a altura da tela e centraliza o conteúdo
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* Container branco que contém o formulário de login */}
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        {/* Título do formulário */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de entrada para o email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email" // Define o tipo do input como email
              value={email} // O valor do input é controlado pelo estado "email"
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              required // Campo obrigatório
            />
          </div>

          {/* Campo de entrada para a senha */}
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password" // Define o tipo do input como senha
              value={password} // O valor do input é controlado pelo estado "password"
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              required // Campo obrigatório
            />
          </div>

          {/* Botão de envio do formulário */}
          <button
            type="submit" // Define o botão como do tipo submit
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
