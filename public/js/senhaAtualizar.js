// No seu arquivo senha_apenas_um.js

export let tudoCerto = false;

document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.getElementById('senha');
    const formulario = document.querySelector('form'); // Pega o formulário
    const necessario = document.getElementById('necessario');

    const requisitos = [
        "Obrigatório uma letra maiúscula (A-Z)",
        "Obrigatório uma letra minúscula (a-z)",
        "Obrigatório um número (0-9)",
        "Obrigatório pelo menos 8 caracteres"
    ];

    senhaInput.addEventListener('keyup', function() {
        const senha = senhaInput.value;
        const cumprir = [
            /[A-Z]/.test(senha),
            /[a-z]/.test(senha),
            /[0-9]/.test(senha),
            senha.length >= 8
        ];

        const indexFaltando = cumprir.indexOf(false);
        
        if (indexFaltando !== -1) {
            necessario.textContent = requisitos[indexFaltando];
            necessario.className = 'text-danger';
            tudoCerto = false;
        } else {
            necessario.textContent = "Senha atende a todos os requisitos!";
            necessario.className = 'text-success';
            tudoCerto = true;
        }


    });

    // BLOQUEIO DE ENVIO
    formulario.addEventListener('submit', function(event) {
                // Dentro do evento de submit ou keyup:
        const senha2Input = document.getElementsByName('senha2')[0];

        if (senhaInput.value !== senha2Input.value) {
            necessario.textContent = "As senhas não coincidem!";
            tudoCerto = false;
        }
        if (!tudoCerto) {
            event.preventDefault(); // Impede o formulário de ser enviado
            alert("Por favor, preencha a senha corretamente antes de continuar.");
        }
    });
});