import { tudoCerto } from '/js/senha_apenas_um.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form[action="/usuario/atualizar"]');
    const senha = form.querySelector('input[name="senha"]');
    const senha2 = form.querySelector('input[name="senha2"]');

    form.addEventListener("submit", function (event) {

        const senhaVazia = senha.value === "" && senha2.value === "";

        // 👉 Se as duas estiverem vazias, permite atualizar sem validar senha
        if (senhaVazia) {
            return; // deixa o formulário enviar
        }

        // Validação geral
        if (tudoCerto === false) {
            event.preventDefault();
            alert("Por favor verifique as obrigatoriedades");
            return;
        }

        // Senhas diferentes
        if (senha.value !== senha2.value) {
            event.preventDefault();
            alert("As senhas não coincidem. Por favor, verifique.");
            senha2.focus();
            return;
        }

        // Senha curta
        if (senha.value.length < 8) {
            event.preventDefault();
            alert("A senha deve ter no mínimo 8 caracteres.");
            senha.focus();
            return;
        }
    });

    // Feedback em tempo real (opcional, mas recomendado)
    senha2.addEventListener("input", function () {
        if (senha.value !== senha2.value) {
            senha2.setCustomValidity("As senhas não coincidem");
        } else {
            senha2.setCustomValidity("");
        }
    });

    senha.addEventListener("input", function () {
        if (senha.value.length > 0 && senha.value.length < 8) {
            senha.setCustomValidity("A senha deve ter no mínimo 8 caracteres");
        } else {
            senha.setCustomValidity("");
        }
    });
});
