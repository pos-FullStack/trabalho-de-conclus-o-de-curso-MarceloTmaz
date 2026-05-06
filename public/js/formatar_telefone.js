 // Formata: (XX) XXXXX-XXXX para 11 dígitos, (XX) XXXX-XXXX para 10
function formatarTelefone(valor) {
            const digitos = valor.replace(/\D/g, "").slice(0, 11); // limita a 11
            const d = digitos;

            if (d.length <= 2) return d;
            if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
            if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
            return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`;
        }

        // Aplica máscara mantendo experiência suave em "input" e "paste"
        function aplicarMascaraTelefone(input) {
            const posAnterior = input.selectionStart;
            const valorAnterior = input.value;
            input.value = formatarTelefone(input.value);

            // Ajuste simples de cursor: tenta manter próximo do fim
            const diff = input.value.length - valorAnterior.length;
            const novaPos = Math.max(0, (posAnterior || input.value.length) + diff);
            input.setSelectionRange(novaPos, novaPos);
        }

        const tel = document.getElementById("telefone");
        tel.addEventListener("input", () => aplicarMascaraTelefone(tel));