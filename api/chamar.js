import { buscarEnderecos } from "./autocompletar.js";

let timer;

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("partida");
  const dropdown = document.getElementById("dropdown");

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

      } catch (error) {
        console.error(error);
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

  // Fecha o dropdown se clicar fora
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
});
