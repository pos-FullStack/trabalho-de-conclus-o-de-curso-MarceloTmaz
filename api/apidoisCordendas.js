const axios = require('axios');

async function descobrirCoordenada(endereco) {
  const url = 'https://api.openrouteservice.org/geocode/search';
  const key = '5b3ce3597851110001cf624883c938d5189048eeb7e51719bb8378df';

  const response = await axios.get(url, {
    params: {
      api_key: key,
      text: endereco
    }
  });

  const features = response.data.features;
  if (features.length > 0) {
    const [longitude, latitude] = features[0].geometry.coordinates;
    return [longitude, latitude];
  } else {
    throw new Error(`Endereço não encontrado: ${endereco}`);
  }
}

module.exports = { descobrirCoordenada };
