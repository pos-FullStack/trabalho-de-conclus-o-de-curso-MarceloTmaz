document.addEventListener('DOMContentLoaded', function() {
    const placaInput = document.getElementById('placa');

    placaInput.addEventListener('input', function() {
        const placa = placaInput.value;
        
        const placaMaiuscula = placa.toUpperCase();
        
        placaInput.value = placaMaiuscula;
    });
});