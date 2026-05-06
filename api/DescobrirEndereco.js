const axios = require('axios');

async function descobrirCoordenada(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json`;

  try {
    const response = await fetch(url, { // <-- Use await aqui
      method: 'GET',
      headers: {
        'User-Agent': 'TCC/1.0', // necessário para Nominatim
        'Accept-Language': 'pt-BR' // opcional, idioma da resposta
      }
    });

    if (!response.ok) { // Sempre verifique se a resposta HTTP foi bem-sucedida (status 200)
      console.error(`Erro HTTP ${response.status} ao buscar coordenadas para ${endereco}`);
      return null; // Retorna null ou um valor indicando falha
    }

    const dados = await response.json(); // <-- Use await aqui para esperar o JSON

    if (dados.length > 0) {
      const latitude = parseFloat(dados[0].lat); // É bom garantir que são números
      const longitude = parseFloat(dados[0].lon); // É bom garantir que são números
      console.log(`Coordenadas para "${endereco}": Longitude: ${longitude}, Latitude: ${latitude}`);
      return [longitude, latitude]; // <-- Este return agora retorna o valor da função async
    } else {
      console.log(`Endereço "${endereco}" não encontrado.`);
      return null; // Endereço não encontrado, retorna null
    }
  } catch (error) {
    console.error(`Erro ao buscar localização para "${endereco}":`, error);
    return null; // Erro na rede ou na API, retorna null
  }
}

module.exports={descobrirCoordenada};

// Exemplo de uso
//geocodificarEndereco("belo horizonte, 3, Manhuaçu, MG");
