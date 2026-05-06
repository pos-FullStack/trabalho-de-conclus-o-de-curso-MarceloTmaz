import { setupAutocomplete } from "./chamar.js";

export let contadorParadas = 1;

document.addEventListener('DOMContentLoaded', () => {
  const MAX_PARADAS = 35;
  // Ajuste conforme sua necessidade inicial (ex: se já existem 2 no HTML, o próximo é 3)
  contadorParadas = 3; 

  const container = document.getElementById('container-paradas');
  const botaoAdicionar = document.getElementById('add-parada');

  botaoAdicionar.addEventListener('click', () => {
    if (contadorParadas > MAX_PARADAS) {
      alert("Limite de 35 paradas atingido.");
      return;
    }

    // 1. Cria a div principal com a classe mb-2 (conforme seu exemplo)
    // Adicionei d-flex e gap-2 para acomodar o botão de lixeira ao lado
    const paradaWrapper = document.createElement('div');
    paradaWrapper.className = 'mb-2 d-flex align-items-end gap-2'; 
    paradaWrapper.dataset.paradaId = contadorParadas;

    // 2. Cria o container interno para manter a estrutura de label/input/dropdown
    const inputContent = document.createElement('div');
    inputContent.className = 'flex-grow-1';

    // 3. Label: <label class="form-label" for="paradaX">Parada X</label>
    const label = document.createElement('label');
    label.className = 'form-label'; 
    label.setAttribute('for', `parada${contadorParadas}`);
    label.textContent = `Parada ${contadorParadas}`;

    // 4. Input: <input id="paradaX" class="form-control" type="text" ... />
    const input = document.createElement('input');
    input.id = `parada${contadorParadas}`;
    input.className = 'form-control'; 
    input.type = 'text';
    input.name = `parada${contadorParadas}`;
    input.placeholder = `Digite a parada ${contadorParadas}`;
    input.autocomplete = "on";

    // 5. Dropdown: <div id="dropdown-paradaX" class="dropdown-container"></div>
    const dropdown = document.createElement('div');
    dropdown.id = `dropdown-parada${contadorParadas}`;
    dropdown.className = 'dropdown-container';

    // Montagem da estrutura interna
    inputContent.appendChild(label);
    inputContent.appendChild(input);
    inputContent.appendChild(dropdown);

    // 6. Botão remover (Circular com lixeira conforme solicitado anteriormente)
    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn-remover-circular';
    // Aproximadamente 20px a 24px costuma alinhar com o centro do input padrão do Bootstrap
    btnRemover.style.marginTop = '20px'
    btnRemover.title = 'Remover parada';
    btnRemover.innerHTML = `
        <svg class="icone-lixeira" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>`;

    btnRemover.addEventListener('click', () => {
      paradaWrapper.remove();
      atualizarLabels();
    });

    // Montagem final no container
    paradaWrapper.appendChild(inputContent);
    paradaWrapper.appendChild(btnRemover);
    container.appendChild(paradaWrapper);

    contadorParadas++;

    // Ativa o autocomplete para o novo campo criado
    setupAutocomplete(input.id, dropdown.id);
  });

  function atualizarLabels() {
    const paradas = container.querySelectorAll('[data-parada-id]');
    let numero = 3; // Mantendo sua lógica de começar a renumerar a partir do 3
    paradas.forEach(parada => {
      const label = parada.querySelector('.form-label');
      const input = parada.querySelector('.form-control');
      const dropdown = parada.querySelector('.dropdown-container');

      label.setAttribute('for', `parada${numero}`);
      label.textContent = `Parada ${numero}`;
      
      input.id = `parada${numero}`;
      input.name = `parada${numero}`;
      input.placeholder = `Digite a parada ${numero}`;
      
      dropdown.id = `dropdown-parada${numero}`;
      
      parada.dataset.paradaId = numero;
      numero++;
    });
    contadorParadas = numero;
  }
});