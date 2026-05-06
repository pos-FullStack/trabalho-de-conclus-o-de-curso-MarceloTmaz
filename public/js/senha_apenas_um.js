export let tudoCerto = false;

document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.getElementById('senha');
    const necessario = document.getElementById('necessario');

    const requisitos = [
        "Obrigatório uma letra maiúscula (A-Z)",
        "Obrigatório uma letra minúscula (a-z)",
        "Obrigatório um número (0-9)",
        "Obrigatório pelo menos 8 caracteres"
    ];

    senhaInput.addEventListener('keyup', function() {
        const senha = senhaInput.value;

        // Regras de verificação
        const cumprir = [
            /[A-Z]/.test(senha),      // Maiúscula
            /[a-z]/.test(senha),      // Minúscula
            /[0-9]/.test(senha),      // Número
            senha.length >= 8         // Tamanho
        ];

        // Mostra o primeiro requisito ainda não atendido
        const indexFaltando = cumprir.indexOf(false);
        if (indexFaltando !== -1) {
            necessario.textContent = requisitos[indexFaltando];
            necessario.classList.remove('text-success');
            necessario.classList.add('text-danger');
            tudoCerto = false;
        } else {
            necessario.textContent = "Senha atende a todos os requisitos!";
            necessario.classList.remove('text-danger');
            necessario.classList.add('text-success');
            tudoCerto = true;
        }
    });
});
