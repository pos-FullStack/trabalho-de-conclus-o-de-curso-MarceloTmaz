const axios = require('axios');

async function obterEndereco(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse`;
  
  try {
    const response = await axios.get(url, {
      params: {
        format: 'json',
        lat: latitude,
        lon: longitude
      },
      headers: {
        'User-Agent': 'TCC/1.0 (marcelo@example.com)' // substitua por seu email ou app real
      },
      timeout: 15000 // 15 segundos
    });

    const data = response.data;

    if (data && data.address) {
      console.log(data.address.road, data.address.town);
      return [data.address.road, data.address.town];
    } else {
      console.log("Endereço não encontrado.");
      return null;
    }

  } catch (error) {
    console.error("Erro ao obter o endereço:", error.message);
    return null;
  }
}

module.exports = { obterEndereco };
