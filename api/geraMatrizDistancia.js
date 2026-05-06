const axios = require('axios');

async function geraMatrizDistanciaETempo(coordenadas) {
  const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';

  try {
    const response = await axios.post(
      url,
      {
        locations: coordenadas,
        metrics: ['distance', 'duration'],
        units: 'km'
      },
      {
        headers: {
          'Authorization': '5b3ce3597851110001cf624883c938d5189048eeb7e51719bb8378df',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Matriz de distâncias (km):", response.data.distances);
    console.log("Matriz de tempos (segundos):", response.data.durations);
    //conveter para minuntos 
    //const duracoesMinutos = response.data.durations.map(linha => linha.map(valor => valor / 60));
    // Retorna ambas as matrizes
    return {
      distancias: response.data.distances,
      duracoes: response.data.durations
    };

  } catch (error) {
    console.error('Erro ao chamar OpenRouteService:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { geraMatrizDistanciaETempo };
