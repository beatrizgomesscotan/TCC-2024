
// // Dados de login fixos
// const validUsername = "admin";
// const validPassword = "123456";

// // Manipulando o formulário
// document.getElementById("loginForm").addEventListener("submit", function (event) {
//   event.preventDefault(); // Previne o envio do formulário

//   // Pegando os valores dos inputs
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   // Validando o login
//   if (username === validUsername && password === validPassword) {
//     alert("Login realizado com sucesso!");
//     // Aqui você pode redirecionar o usuário para outra página
//     window.location.href = "pagina-principal.html"; // Exemplo de redirecionamento
//   } else {
//     const errorMessage = document.getElementById("error-message");
//     errorMessage.style.display = "block";
//     errorMessage.textContent = "Usuário ou senha inválidos!";
//   }
// });

   



// Variáveis para armazenar as credenciais do usuário
let validUsername = "usuario";  // Usuário inicial
let validPassword = "123";    // Senha inicial

// Função para validar os campos de login e redirecionar
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Verifica se os campos estão vazios
    if (username === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verifica se o usuário e a senha estão corretos
    if (username === validUsername && password === validPassword) {
        // Se as credenciais forem corretas, redireciona para outra página
        window.location.href = "index.html"; // Substitua "pagina_inicial.html" pelo nome da sua página de destino
    } else {
        alert("Usuário ou senha incorretos. Tente novamente.");
    }
});

// Mostrar o formulário para alterar a senha
document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Esconde o formulário de login e exibe o de alteração de senha
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('resetPasswordForm').style.display = 'block';
});

// Voltar para a tela de login
document.getElementById('backToLogin').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Esconde o formulário de alteração de senha e volta para o login
    document.getElementById('resetPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Alterar a senha
document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    var newPassword = document.getElementById('newPassword').value;

    // Verifica se a nova senha não está vazia
    if (newPassword === "") {
        alert("Por favor, digite uma nova senha.");
        return;
    }

    // Atualiza a senha
    validPassword = newPassword;

    // Exibe uma mensagem de sucesso e volta para o login
    alert("Senha alterada com sucesso!");
    document.getElementById('resetPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

