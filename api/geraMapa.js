 const axios = require('axios');
//necessario instalr o pacote npm install dotenv
//npm init -y
//npm install express axios dotenv
require('dotenv').config();

const ORS_API_KEY = process.env.ORS_API_KEY;

async function getRoute(coordinates) {
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
  
  const response = await axios.post(url, {
    coordinates,
    instructions: false
  }, {
    headers: {
      'Authorization': ORS_API_KEY,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = { getRoute };
