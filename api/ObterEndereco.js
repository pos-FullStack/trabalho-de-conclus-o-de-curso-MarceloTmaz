const axios = require('axios');

async function obterEndereco(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TCC/1.0'
      }
    });

    const data = await response.json();

    if (data && data.address) {
      console.log(data.address.road, data.address.town);
     // console.log(data)
      return [data.address.road, data.address.town];
      // console.log("Endereço:", data.display_name);

    } else {
      console.log("Endereço não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter o endereço:", error);
    return null;
  }
   
}

module.exports={obterEndereco};