function subrota(matriz){
    let saida=[];
    let pontos=[];
    let final=[]
    let distanciaPercorrida=0;
    for (let index = 0; index < matriz.length; index++) {
        pontos.push(index);
    }
    saida.push(0);
    while(saida.length!=matriz.length){
        let menorSaida=-1;
        let distanciaSaida=999999999;
        let menorChegada=-1;
        let distanciaChegada=99999999;
        for (let index = 0; index < matriz[saida[saida.length-1]].length; index++) {
            if(distanciaSaida>matriz[saida[saida.length-1]][index]&&matriz[saida[saida.length-1]][index]>0){
                let achou=false;
                for (let l = 0; l < saida.length; l++) {
                        if(saida[l]===index){
                            achou=true;
                        }
                }
                if(achou===false){
                    menorSaida=index;
                    distanciaSaida=matriz[saida[saida.length-1]][index];
                }
            }
        }
        for (let inicio = 0; inicio < matriz.length; inicio++) {
            if(inicio!=saida[saida.length-1]){
                for (let index = 0; index < matriz[inicio].length; index++) {
                    if(distanciaChegada>matriz[inicio][index]){
                        let achou=false;
                        if(matriz[saida[saida.length-1]][index]==0){
                            for (let l = 0; l < saida.length; l++) {
                                if(saida[l]===index){
                                    achou=true;
                                }
                            }
                        }else{
                            for (let l = 0; l < saida.length; l++) {
                                if(saida[l]===index){
                                    achou=true;
                                }
                            }
                        }
                        if(achou ===false){
                            menorChegada=index;
                            distanciaChegada=matriz[saida[saida.length-1]][index];
                        }
                    }
                }
            }
        }
        console.log('saida: ', menorSaida,distanciaSaida)

        console.log('chegada: ', menorChegada,distanciaChegada)
        if(distanciaChegada>=distanciaSaida){
            saida.push(menorSaida)
            console.log('fim')
            distanciaPercorrida+=distanciaSaida;
        }else{
             console.log('comeco')

            saida.unshift(menorChegada)
            distanciaPercorrida+=distanciaChegada;
        }
    }
    let adicionar=false
    for (let index = 0; index < saida.length; index++) {
        if(saida[index]===0){
            adicionar=true;
        }
        if(adicionar===true){
            final.push(saida[index]);
        }
    }
    for (let index = 0; index < saida.length; index++) {
        if(saida[index]===0){
            break;
        }else{
            final.push(saida[index])
        }
    }
    console.log(saida)
    return [final,distanciaPercorrida];
}

module.exports={subrota}