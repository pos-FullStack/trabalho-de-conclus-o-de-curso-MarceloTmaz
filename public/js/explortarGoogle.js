const origem = pontos[0];
const destino = pontos[pontos.length - 1];
const waypoints = pontos.slice(1, -1); // todos exceto origem e destino

const url = `https://www.google.com/maps/dir/?api=1` +
  `&origin=${origem[0]},${origem[1]}` +
  `&destination=${destino[0]},${destino[1]}` +
  `&waypoints=${waypoints.map(p => `${p[0]},${p[1]}`).join('|')}`;

window.open(url, '_blank');
