console.log("🔥 adicionarCombutivel.js carregado!");

// Variáveis globais (garantem que o botão onclick funciona)
window.combustivelIndex = 1;

// Função para gerar o select de combustíveis
function gerarSelectCombustivel(index) {
    if (!window.combustiveisBack || !Array.isArray(window.combustiveisBack)) {
        console.error("❌ combustiveisBack não carregado do backend.");
        return `<select class="form-select" name="combustiveis[${index}][nome]" required>
                    <option value="">Nenhum combustível disponível</option>
                </select>`;
    }

    let options = `<option value="">Selecione um combustível</option>`;

    window.combustiveisBack.forEach(c => {
        options += `<option value="${c.nome}">${c.nome}</option>`;
    });

    return `
        <select class="form-select" name="combustiveis[${index}][nome]" required>
            ${options}
        </select>
    `;
}

// Função para adicionar combustível
window.adicionarCombustivel = function () {
    console.log("➕ Adicionando combustível...");

    window.combustivelIndex++;

    const container = document.getElementById("container-combustiveis");

let novo = document.createElement("div");
// Adicionamos a classe mb-5 e a borda inferior para separar visualmente cada item novo
novo.classList.add("combustivel-item", "mb-5");
novo.style.borderBottom = "1px dashed rgba(255,255,255,0.1)";
novo.style.paddingBottom = "20px";

novo.innerHTML = `
    <div class="row">
        <div class="col-md-6">
            <label class="form-label-custom">Consumo (KM/L)</label>
            <input type="number" step="0.1" class="form-control-custom" 
                   name="combustiveis[${window.combustivelIndex}][consumo]" 
                   placeholder="8.5" required>
        </div>

        <div class="col-md-6">
            <label class="form-label-custom">Preço</label>
            <input type="number" step="0.01" class="form-control-custom" 
                   name="combustiveis[${window.combustivelIndex}][preco]" 
                   placeholder="4.59" required>
        </div>

        <div class="col-md-12">
            <label class="form-label-custom">Combustível</label>
            ${gerarSelectCombustivel(window.combustivelIndex)}
            <input type="hidden" name="combustiveis[${window.combustivelIndex}][referencial]" value="${window.combustivelIndex}">
        </div>
    </div>

    <div class="d-flex align-items-center gap-3 mt-2">
        <div class="form-check">
            <input class="form-check-input" type="radio" 
                   name="combustiveis_primario" 
                   id="primario_${window.combustivelIndex}"
                   value="${window.combustivelIndex}">
            <label class="text-white" for="primario_${window.combustivelIndex}">É primário?</label>
        </div>
        
        <button type="button" class="delete-btn" onclick="removerCombustivel(this)">
            <small>Excluir</small>
        </button>
    </div>
`;

    container.appendChild(novo);

    console.log("✔ Combustível adicionado:", window.combustivelIndex);
};

// Função para remover combustível
window.removerCombustivel = function (btn) {
    const items = document.querySelectorAll(".combustivel-item");

    if (items.length <= 1) {
        alert("Você deve ter pelo menos um combustível.");
        return;
    }

    btn.closest(".combustivel-item").remove();
    console.log("❌ Combustível removido");
};
