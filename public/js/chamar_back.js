import { buscarEnderecos } from "./autocompletar.js";

function setupAutocomplete(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  let timer;

  if (!input || !dropdown) return; // segurança

  input.addEventListener("input", () => {
    clearTimeout(timer);
    const query = input.value.trim();

    if (query.length < 3) {
      dropdown.style.display = "none";
      return;
    }

    timer = setTimeout(async () => {
      try {
        const dados = await buscarEnderecos(query);
        dropdown.innerHTML = "";

        if (dados.length === 0) {
          dropdown.style.display = "none";
          return;
        }

        dados.forEach(item => {
          const option = document.createElement("option");
          option.value = `${item.rua}, ${item.bairro}, ${item.cidade}`;
          option.textContent = option.value;
          dropdown.appendChild(option);
        });

        dropdown.style.display = "block";
      } catch (err) {
        console.error(err);
        dropdown.innerHTML = "<option>Erro ao buscar endereços</option>";
        dropdown.style.display = "block";
      }
    }, 300);
  });

  dropdown.addEventListener("change", () => {
    const selected = dropdown.options[dropdown.selectedIndex];
    input.value = selected.value;
    dropdown.style.display = "none";
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Campo de partida
  setupAutocomplete("partida", "dropdown-partida");

  // Campos de paradas
  const qtdInput = document.getElementById("qtd");
  const qtd = parseInt(qtdInput?.value || "0");

  for (let i = 0; i < qtd; i++) {
    setupAutocomplete(`parada${i}`, `dropdown-parada${i}`);
  }
});
