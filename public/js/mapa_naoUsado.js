// Desenha marcadores no mapa (opcional)
export function iniciarMapa(melhorCaminha) {
  melhorCaminha.forEach((coord, i) => {
    L.marker([coord[1], coord[0]]).addTo(map).bindPopup(`Parada ${i + 1}`);
  });

  console.log('melhor caminho',melhorCaminha)
  // Envia para o backend via API '/rotas/api/calcular_rota'
  fetch('/rotas/api/directions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ coordinates: melhorCaminha })  // Aqui usa sua variável
  })
    .then(res => res.json())
    .then(data => {
      const route = L.geoJSON(data, {
        style: { color: 'blue', weight: 4 }
      }).addTo(map);
      map.fitBounds(route.getBounds());
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao carregar rota.');
    });
  }

