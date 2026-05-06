const axios = require('axios');

function permuta(arr) {
  if (arr.length <= 1) return [arr];
  const resultado = [];

  for (let i = 0; i < arr.length; i++) {
    const atual = arr[i];
    const restante = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const restantePermutado = permuta(restante);
    for (const p of restantePermutado) {
      resultado.push([atual, ...p]);
    }
  }

  return resultado;
}

function calculaDistancia(rota, matrizDistancia) {
  let total = 0;
  for (let i = 0; i < rota.length - 1; i++) {
    total += matrizDistancia[rota[i]][rota[i + 1]];
  }
  // Apenas retorne o total acumulado entre os pontos, sem o salto de volta
  return total;
}

function tspForcaBrutaDistancia(matrizDistancia) {
  const cidades = matrizDistancia.map((_, indice) => indice);
  const inicio = cidades[0];
  const paraPermutar = cidades.slice(1);
  const permutacoes = permuta(paraPermutar);

  let melhorRota = [];
  let menorDistancia = Infinity;

  for (const p of permutacoes) {
    const rota = [inicio, ...p];
    const distancia = calculaDistancia(rota, matrizDistancia);
    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      melhorRota = rota;
    }
  }

  return { melhorRota, menorDistancia };
}

function tspForcaBrutaTempo(matrizTempo) {
  const cidades = matrizTempo.map((_, indice) => indice);
  const inicio = cidades[0];
  const paraPermutar = cidades.slice(1);
  const permutacoes = permuta(paraPermutar);

  let melhorRota = [];
  let menorTempo = Infinity;

  for (const p of permutacoes) {
    const rota = [inicio, ...p];
    const tempo = calculaDistancia(rota, matrizTempo);
    if (tempo < menorTempo) {
      menorTempo = tempo;
      melhorRota = rota;
    }
  }

  return { melhorRota, menorTempo };
}

async function chamarDistanicia(matriz) {
  const resultado = await tspForcaBrutaDistancia(matriz);
  console.log("Melhor rota:", resultado.melhorRota);
  console.log("Distância mínima:", resultado.menorDistancia);
  return [resultado.melhorRota,resultado.menorDistancia];
}

async function chamarTempo(matriz) {
  const resultado = await tspForcaBrutaTempo(matriz);
  console.log("Melhor rota:", resultado.melhorRota);
  console.log("Tempo mínima:", resultado.menorTempo);
  return [resultado.melhorRota,resultado.menorTempo];
}

module.exports = { chamarDistanicia,chamarTempo,calculaDistancia };   