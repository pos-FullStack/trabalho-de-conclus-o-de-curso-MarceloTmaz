export let tudoCerto = false;

let maiusculaT=false;
let minusculaT=false;
let numeroT=false;
let tamanhoT=false;

document.addEventListener('DOMContentLoaded', function() {
    // 1. Pega a referência do campo de senha e dos elementos de validação
    const senhaInput = document.getElementById('senha');
    const maiuscula = document.getElementById('maiuscula');
    const minuscula = document.getElementById('minuscula');
    const numero = document.getElementById('numero');
    const tamanho = document.getElementById('tamanho');

    // Expressões Regulares (Regex) para cada regra
    // ^.*[A-Z].*$ -> Qualquer coisa, depois uma maiúscula, depois qualquer coisa
    const regexMaiuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    
    // Adiciona um "listener" para reagir a cada tecla digitada
    senhaInput.addEventListener('keyup', function() {
        const senha = senhaInput.value;
        let atende;

        // --- 1. VERIFICA LETRA MAIÚSCULA ---
        atende = regexMaiuscula.test(senha);
        if (atende) {
            maiuscula.classList.remove('text-danger');
            maiuscula.classList.add('text-success');
            maiusculaT=true
        } else {
            maiuscula.classList.remove('text-success');
            maiuscula.classList.add('text-danger');
            maiusculaT=false
        }

        // --- 2. VERIFICA LETRA MINÚSCULA ---
        atende = regexMinuscula.test(senha);
        if (atende) {
            minuscula.classList.remove('text-danger');
            minuscula.classList.add('text-success');
            minusculaT=true
        } else {
            minuscula.classList.remove('text-success');
            minuscula.classList.add('text-danger');
            minusculaT=false
        }

        // --- 3. VERIFICA NÚMERO ---
        atende = regexNumero.test(senha);
        if (atende) {
            numero.classList.remove('text-danger');
            numero.classList.add('text-success');
            numeroT=true
        } else {
            numero.classList.remove('text-success');
            numero.classList.add('text-danger');
            numeroT=false;
        }

        // --- 4. VERIFICA TAMANHO (8 CARACTERES) ---
        atende = senha.length >= 8;
        if (atende) {
            tamanho.classList.remove('text-danger');
            tamanho.classList.add('text-success');
            tamanhoT=true;
        } else {
            tamanho.classList.remove('text-success');
            tamanho.classList.add('text-danger');
            tamanhoT=false;
        }

        if(maiusculaT===true&& minusculaT==true&&numeroT==true&&tamanhoT==true){
            tudoCerto=true;
        }else{
            tudoCerto=false;
        }
    });
});