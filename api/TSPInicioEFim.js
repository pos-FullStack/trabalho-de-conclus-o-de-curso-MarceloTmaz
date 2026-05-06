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
  return total;
}
function calculaTempo(rota, matrizTempo) {
  let total = 0;
  for (let i = 0; i < rota.length - 1; i++) {
    total += matrizTempo[rota[i]][rota[i + 1]];
  }
  return total;
}

function tspForcaBruta(matrizDistancia) {
  const cidades = matrizDistancia.map((_, indice) => indice);
  const inicio = cidades[0];
  const fim = cidades[cidades.length - 1];

  if (cidades.length <= 2) {
    return { melhorRota: [inicio, fim], menorDistancia: calculaDistancia([inicio, fim], matrizDistancia) };
  }

  const intermediarias = cidades.slice(1, cidades.length - 1);
  const permutacoes = permuta(intermediarias);

  let melhorRota = [];
  let menorDistancia = Infinity;

  for (const p of permutacoes) {
    const rota = [inicio, ...p, fim];
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
  const fim = cidades[cidades.length - 1];

  if (cidades.length <= 2) {
    return { melhorRota: [inicio, fim], menorDistancia: calculaTempo([inicio, fim], matrizTempo) };
  }

  const intermediarias = cidades.slice(1, cidades.length - 1);
  const permutacoes = permuta(intermediarias);

  let melhorRota = [];
  let menorDistancia = Infinity;

  for (const p of permutacoes) {
    const rota = [inicio, ...p, fim];
    const distancia = calculaTempo(rota, matrizTempo);
    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      melhorRota = rota;
    }
  }

  return { melhorRota, menorDistancia };
}

async function chamar(matriz) {
  const resultado = await tspForcaBruta(matriz);
  console.log("Melhor rota:", resultado.melhorRota);
  console.log("Distância mínima:", resultado.menorDistancia);
  return [resultado.melhorRota,resultado.menorDistancia];
}

async function chamarTempo(matriz) {
  const resultado = await tspForcaBrutaTempo(matriz);
  console.log("Melhor rota:", resultado.melhorRota);
  console.log("Tempo mínima:", resultado.menorDistancia);
  return [resultado.melhorRota,resultado.menorDistancia];
}
module.exports = { chamar,chamarTempo };   