let map;
let gpsMarker;
let loading;
// Localização inicial
export function criarMapaLocalizacao(lat, lon) {
  if (map) {
    map.remove();
    map = null;
  }
  loading=document.getElementById('spinner-overlay')
    if(loading){
      loading.style.display = 'none';
    }

  const mapContainer = document.getElementById('map');
  mapContainer.innerHTML = '';

  map = L.map('map').setView([lat, lon], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '...',
    maxZoom: 19
  }).addTo(map);

  L.marker([lat, lon]).addTo(map).bindPopup("Você está aqui").openPopup();

  setTimeout(() => map.invalidateSize(), 300);
}

export function criarMapaLocalizacaoSemLocalizacao(lat, lon) {
  if (map) {
    map.remove();
    map = null;
  }
  loading=document.getElementById('spinner-overlay')
    if(loading){
      loading.style.display = 'none';
    }

  const mapContainer = document.getElementById('map');
  mapContainer.innerHTML = '';

  map = L.map('map').setView([lat, lon], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '...',
    maxZoom: 19
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 300);
}
// Rota
export async function criarMapaRota(melhorCaminha) {
  if (map) {
    map.remove();
    map = null;
  }

  const mapContainer = document.getElementById('map');
  mapContainer.innerHTML = '';

  map = L.map('map').setView([melhorCaminha[0][1], melhorCaminha[0][0]], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '...',
    maxZoom: 19
  }).addTo(map);

  // Marcadores
  melhorCaminha.forEach((coord, i) => {
    const latlng = [coord[1], coord[0]];
    L.marker(latlng).addTo(map).bindPopup(`Parada ${i + 1}`);
  });

  // Buscar rota
  const response = await fetch('/rotas/api/directions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coordinates: melhorCaminha })
  });

  if (response.ok) {
    const data = await response.json();
    const route = L.geoJSON(data, { style: { color: 'blue', weight: 4 } }).addTo(map);
    map.fitBounds(route.getBounds());

    setTimeout(() => map.invalidateSize(), 300);

    gerarExportacaoGoogleMaps(melhorCaminha);

  } else {
    alert('Erro ao carregar rota.');
  }
}

function gerarExportacaoGoogleMaps(paradas) {
  const divExportar = document.getElementById('exportar');
  divExportar.innerHTML = ''; // limpa antes de adicionar novos botões

  const MAX_GOOGLE_MAPS_WEB_POINTS = 11; // 1 origem + 9 waypoints + 1 destino
  let menor=false;
  // mensagem de aviso conforme o número de paradas
  if (paradas.length > MAX_GOOGLE_MAPS_WEB_POINTS) {
    divExportar.innerHTML = `
      <h3>Exportar rota para o Google Maps</h3>
      <p style="color:red; font-weight:bold;">
        A rota possui mais de 11 paradas. Ela será dividida em vários trechos.
      </p>
    `;
    menor=false;
  } else {
    divExportar.innerHTML = `
      <h3>Exportar rota para o Google Maps</h3>
      <p style="color:green; font-weight:bold;">
        A rota possui ${paradas.length} paradas. Será exportada em um único trecho.
      </p>
    `;
    menor=true;
  }
   let inicio = 0;
  let blocoIndex = 0;

  while (inicio < paradas.length - 1) {
    const fim = Math.min(inicio + MAX_GOOGLE_MAPS_WEB_POINTS, paradas.length);
    const bloco = paradas.slice(inicio, fim);

    if (bloco.length >= 2) {
      const origem = bloco[0];
      const destino = bloco[bloco.length - 1];
      const waypoints = bloco.slice(1, -1);

      const url = `https://www.google.com/maps/dir/?api=1` +
        `&origin=${origem[1]},${origem[0]}` +
        `&destination=${destino[1]},${destino[0]}` +
        (waypoints.length > 0 ? `&waypoints=${waypoints.map(p => `${p[1]},${p[0]}`).join('|')}` : '');

      const botao = document.createElement('button');
      if(menor==true){
        botao.textContent = `Exportar trecho`;
      }else{
        botao.textContent = `Exportar trecho ${blocoIndex + 1}`;
      }
      botao.style.margin = '5px';
      botao.style.padding = '8px';
      botao.style.display = 'block';
      botao.style.fontWeight = 'bold';
      botao.className='btn btn-primary'

      botao.addEventListener('click', () => {
        window.open(url, '_blank');
      });

      divExportar.appendChild(botao);
      blocoIndex++;
    }

    // sobreposição para continuidade entre blocos
    inicio = fim - 1;
  }
}
