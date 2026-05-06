export let tudoCerto = false;

let maiusculaT=false;
let minusculaT=false;
let numeroT=false;
let tamanhoT=false;

document.addEventListener('DOMContentLoaded', function() {
    // 1. Pega a referência do campo de senha e dos elementos de validação
    const senhaInput = document.getElementById('senha');
    const necessario = document.getElementById('necessario');
    
    const requisitos=[
        "Obrigatório uma letra maiúscula (A-Z)",
        "Obrigatório uma letra minúscula (a-z)",
        "Obrigatório um número (0-9)",
        "Obrigatório pelo menos 8 caracteres"];
    let cumprir=[false,false,false,false];

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
            cumprir[0]=true;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            
           // maiuscula.classList.add('text-success');
            maiusculaT=true
        } else {
            cumprir[0]=false;
           for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            maiusculaT=false
        }

        // --- 2. VERIFICA LETRA MINÚSCULA ---
        atende = regexMinuscula.test(senha);
        if (atende) {
           cumprir[1]=true;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            minusculaT=true
        } else {
           cumprir[1]=false;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            minusculaT=false
        }

        // --- 3. VERIFICA NÚMERO ---
        atende = regexNumero.test(senha);
        if (atende) {
           cumprir[2]=true;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            numeroT=true
        } else {
            cumprir[2]=false;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            numeroT=false;
        }

        // --- 4. VERIFICA TAMANHO (8 CARACTERES) ---
        atende = senha.length >= 8;
        if (atende) {
           cumprir[3]=true;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            tamanhoT=true;
        } else {
            cumprir[3]=true;
            for (let index = 0; index < cumprir.length; index++) {
                if(cumprir[index]==false){
                    necessario.textContent=requisitos[index];
                }
            }
            //tamanho.classList.remove('text-success');
            tamanhoT=false;
        }

        if(maiusculaT===true&& minusculaT==true&&numeroT==true&&tamanhoT==true){
            tudoCerto=true;
            necessario.classList.remove('text-danger')
            necessario.classList.add('text-success')

        }else{
            tudoCerto=false;
        }
    });
});