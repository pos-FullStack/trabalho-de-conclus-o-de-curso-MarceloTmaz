const axios = require('axios');

async function geraMatrizDistancia(coordenadas) {
  const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': '5b3ce3597851110001cf624883c938d5189048eeb7e51719bb8378df',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locations: coordenadas,
        metrics: ['distance'],
        units: 'km'
      })
    });

    console.log(response)

    const data = await response.json();
    console.log("Matriz de distâncias:", data.distances);
    return data.distances;
  } catch (error) {
    console.error('Erro ao chamar OpenRouteService:', error);
    throw error; // para que o `catch` no router capture
  }
}
module.exports = { geraMatrizDistancia }; 
