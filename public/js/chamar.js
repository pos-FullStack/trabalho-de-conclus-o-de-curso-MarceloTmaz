import { buscarEnderecos } from "/js/autocompletar.js";

export function setupAutocomplete(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) {
    console.warn(`Input ou dropdown não encontrado: ${inputId}, ${dropdownId}`);
    return;
  }

  let timer;
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
          const div = document.createElement("div");
          div.classList.add("dropdown-item");
          div.textContent = `${item.rua}, ${item.bairro}, ${item.cidade}`;
          div.addEventListener("click", () => {
            input.value = div.textContent;
            dropdown.style.display = "none";
          });
          dropdown.appendChild(div);
        });

        dropdown.style.display = "block";
      } catch (err) {
        console.error(err);
        dropdown.innerHTML = "<div class='dropdown-item'>Erro ao buscar endereços</div>";
        dropdown.style.display = "block";
      }
    }, 1000);
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}

// Inicializa os campos
document.addEventListener("DOMContentLoaded", () => {
  setupAutocomplete("partida", "dropdown-partida");
  
  for (let i = 1; i <= 35; i++) {
    const inputId = `parada${i}`;
    const dropdownId = `dropdown-parada${i}`;
    if (document.getElementById(inputId) && document.getElementById(dropdownId)) {
      setupAutocomplete(inputId, dropdownId);
    }
  }
});
