import { tudoCerto } from '/js/frontSenha.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form[action="/usuario/atualizarSenha"]');
    const senha = form.querySelector('input[name="senha"]');
    const senha2 = form.querySelector('input[name="senha2"]');
    let senhaDiferente=false;
    let senhaPequena=false;
    form.addEventListener("submit", function (event) {
        if(tudoCerto==false){
             event.preventDefault(); // Impede envio
             alert("Por favor verifiquei as obrigatoridade")
        }
        if (senha.value !== senha2.value) {
            event.preventDefault(); // Impede envio
            alert("As senhas não coincidem. Por favor, verifique.");
            senha2.focus();
            senhaDiferente=true
        }
        if(senha.value.length<8){
            event.preventDefault(); // Impede envio
            alert("A senha está muito curta. Por favor, verifique.");
            senha1.focus();
            senhaPequena=true
        }
    });

    if(senhaDiferente==true){
        // Feedback imediato
        senha2.addEventListener("input", function () {
            if (senha2.value !== senha.value) {
                senha2.setCustomValidity("As senhas não coincidem");
            } else {
                senha2.setCustomValidity("");
            }
        });
    }
    if(senhaPequena==true){
         senha1.addEventListener("input", function () {
            senha1.setCustomValidity("As senhas curta");
        });
    }

});
