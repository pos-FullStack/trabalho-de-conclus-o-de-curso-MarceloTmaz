import { criarMapaLocalizacao,criarMapaLocalizacaoSemLocalizacao } from '/js/mapaLogica.js';
export let achou=true;
//npm install -g ngrok

document.addEventListener('DOMContentLoaded', async () => {
    const inputPartida = document.getElementById('partida');

    if (!navigator.geolocation) {
        inputPartida.value = "Geolocalização não suportada.";
        criarMapaLocalizacaoSemLocalizacao(-19.9208300, -43.9377800);
        return;
    }

    try {
        // Promise para obter localização
        const geoPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Promise para timeout de 10 segundos
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout de geolocalização')), 10000);
        });

        // Usando Promise.race para pegar a primeira que resolver
        const position = await Promise.race([geoPromise, timeoutPromise]);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("Latitude obtida:", lat);
        console.log("Longitude obtida:", lon);

        const response = await fetch(`/rotas/pegar_localizacao?latitude=${lat}&longitude=${lon}`);

        if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);

        const data = await response.json();
        console.log(data);

        if (!data[0] || !data[1]) {
            inputPartida.value = `Não foi possível obter um nome de local.`; 
            achou = false;
        } else {
            inputPartida.value = data[0] + " " + data[1];
            achou = true;
        }

        if (achou) {
            criarMapaLocalizacao(lat, lon);
        } else {
            criarMapaLocalizacaoSemLocalizacao(-19.9208300, -43.9377800);
        }

    } catch (error) {
        console.error('Erro ao obter localização:', error);
        inputPartida.value = 'Não foi possível obter a localização.';
        criarMapaLocalizacaoSemLocalizacao(-19.9208300, -43.9377800);
    }
});