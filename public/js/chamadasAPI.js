
        
export async function iniciarChamadas(PARADAS_DO_BACKEND) {
        //const lista = document.getElementById('coordenadas-lista');
        //const container = document.getElementById('container-paradas');
        //ajax
        let coordenadas=[];
        try {
          const response = await fetch('/rotas/api/coordenadas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paradas: PARADAS_DO_BACKEND }) // Envia as paradas como JSON
          });

          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
          }

          coordenadas = await response.json();
          console.log(coordenadas);

          // Processamento das coordenadas...
        } catch (error) {
          console.error('Erro ao carregar coordenadas assincronamente:', error);
        }


        //const matriz = document.getElementById('matriz');
        //const container_matriz = document.getElementById('container-matriz');
        var matrizDistancia;
        try{
          const local = coordenadas.map(coord => `${coord[0]},${coord[1]}`).join(';');

          const response_matriz = await fetch(`/rotas/api/matriz?coordenadas=${local}`);
           if (!response_matriz.ok) {
            throw new Error(`Erro na requisição: ${response_matriz.status}`);
        } 
          matrizDistancia = await response_matriz.json();
          console.log(matrizDistancia);
        //  matriz.innerHTML='';
          /*
          for (let i =0 ;i<matrizDistancia.length;i++){
           
            const li = document.createElement('li');
            li.textContent=matrizDistancia(i);
            matriz.appendChild(li);
          }*/
         /*
          const table = document.createElement('table');
          matrizDistancia.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(distancia => {/*
              const td = document.createElement('td');
              td.textContent = distancia.toFixed(2); // arredonda se quiser
              tr.appendChild(td);
            });
            table.appendChild(tr);
          });
          */
          //matriz.appendChild(table);
        }catch (error) {
          console.error('Erro ao carregar matriz assincronamente:', error);
        //  matriz.innerHTML = '<li>Erro ao carregar matriz.</li>';
        }/*
        const rota_tsp = document.getElementById('rota_tsp');
        const container_rota = document.getElementById('container-rota');*/
        var melhorRota;
        //const table_rota = document.createElement('table');
         try{
            const response_rota = await fetch('/rotas/api/calcular_rota', {
              method: 'POST', // Define o método HTTP como POST
              headers: {
                'Content-Type': 'application/json' // Informa ao servidor que o corpo é JSON
              },
              body: JSON.stringify({ matriz: matrizDistancia}) // Converte o objeto para JSON e envia no corpo
            });         
         if (!response_rota.ok) {
            throw new Error(`Erro na requisição: ${response_rota.status}`);
           } 
          melhorRota = await response_rota.json();
          console.log("Rota:", melhorRota.rota);
          console.log("Distância total:", melhorRota.distancia);

          let ordemIndices = melhorRota.rota[0];   // se essa estrutura realmente for assim
          let distanciaFinal = melhorRota.distancia;
          //rota_tsp.innerHTML='';
          melhorRota.rota[0].forEach(coord => {
            /*
              const li = document.createElement('li');
              li.textContent = `${coord}`; // Ajuste se coord for um array de múltiplos elementos
              rota_tsp.appendChild(li);*/
          });/*
          const li = document.createElement('li');
          li.textContent = `Distancia á ser percorrida ${melhorRota[1]}`; 
          rota_tsp.appendChild(li);*/
         // rota_tsp.appendChild(table_rota);
         let melhorCaminha =[]
         const ordem = melhorRota.rota[0];  // agora acessa corretamente

          for (let i = 0; i < ordem.length; i++) {
              const indice = ordem[i];
              const parada = coordenadas[indice];
              melhorCaminha.push(parada);
          }
         return { 
          caminho: melhorCaminha, 
          distancia:  Array.isArray(melhorRota.rota[1]) ? melhorRota.rota[1][0] : melhorRota.rota[1],
          ordem:melhorRota.rota[0],
          km:distanciaFinal
        };

        }catch (error) {
          console.error('Erro ao calcular rota assincronamente:', error);
         // matriz.innerHTML = '<li>Erro ao carregar matriz.</li>';
        }


}