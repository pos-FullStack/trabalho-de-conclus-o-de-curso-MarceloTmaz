// Aguarda o DOM estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    let containerCombustiveis = document.getElementById('container-combustiveis');
    let ultimoId = window.ultimoId  || 1;
    let cont = window.combustiveis.length ||1;
    console.log(cont)
    let combustivelIndex = ultimoId; // Para rastrear o número de combustíveis

    // Função para adicionar um novo grupo de campos de combustível
    window.adicionarCombustivel = function() {
        combustivelIndex++;
        cont++;
        // Cria a nova div com a classe row
        let novoCombustivel = document.createElement('div');
        novoCombustivel.classList.add('row', 'mt-3', 'combustivel-item');

        // Conteúdo HTML para o novo grupo de campos
/*
        novoCombustivel.innerHTML = `
            <div class="col-md-4">
                <p class="text-end">Combustível ${combustivelIndex}</p>
            </div>
            <div class="col-md-8">
                <input type="text" class="form-control" name="combustiveis[${combustivelIndex}][nome]" placeholder="EX: Etanol" required>
            </div>
            <div class="col-md-4">
                <p class="text-end">KM/L ${combustivelIndex}</p>
            </div>
            <div class="col-md-8">
                <input type="number" step="0.1" class="form-control" name="combustiveis${combustivelIndex}consumo" placeholder="EX: 8.5" required>
            </div>
            <div class="col-md-4">
                <p class="text-end">Preço ${combustivelIndex}</p>
            </div>
            <div class="col-md-8">
                <input type="number" step="0.01" class="form-control" name="combustiveis${combustivelIndex}preco" placeholder="EX: 4.50" required>
            </div>
            <div class="col-md-4">
                <p class="text-end form-check-label">É primário?</p>
            </div>
            <div class="col-md-8">
                <input type="radio" class="form-check-input" name="combustivel_primario" value="${combustivelIndex}" required>
            </div>
            <div class="col-12 mt-2 text-center">
                <button type="button" class="btn btn-danger btn-sm" onclick="removerCombustivel(this)">Remover</button>
            </div>
        `;
        */

        novoCombustivel.innerHTML = `
            <div class="col-md-4">
                <p class="text-end">Combustível </p>
            </div>
            <div class="col-md-8">
                <input type="text" class="form-control" name="combustiveis[${combustivelIndex}][nome]" placeholder="EX: Etanol" required>
            </div>
            <div class="col-md-4">
                <p class="text-end">KM/L </p>
            </div>
            <div class="col-md-8">
                <input type="number" step="0.1" class="form-control" name="combustiveis[${combustivelIndex}][consumo]" placeholder="EX: 8.5" required>
            </div>
            <div class="col-md-4">
                <p class="text-end">Preço </p>
            </div>
            <div class="col-md-8">
                <input type="number" step="0.01" class="form-control" name="combustiveis[${combustivelIndex}][preco]" placeholder="EX: 4.50" required>
            </div>
            <div class="col-md-4">
                <p class="text-end form-check-label">É primário?</p>
            </div>
            <div class="col-md-8">
                <input type="radio" class="form-check-input" name="combustiveis_primario" value="${combustivelIndex}" required>
                <input type="hidden" name="combustiveis[${combustivelIndex}][referencial]" value="${combustivelIndex}">
            </div>
            <div class="col-12 mt-2 text-center">
                <button type="button" class="btn btn-danger btn-sm" onclick="removerCombustivel(this)">Remover</button>
            </div>
        `;
        containerCombustiveis.appendChild(novoCombustivel);
    };

    // Função para remover um grupo de campos de combustível
    window.removerCombustivel = function(botao) {
        let combustivelItems = document.querySelectorAll('.combustivel-item');
        // Só remove se houver mais de um item
        if (combustivelItems.length > 1) {
            botao.closest('.combustivel-item').remove();
        } else {
            alert('Você deve ter pelo menos um combustível cadastrado.');
        }
    };
});