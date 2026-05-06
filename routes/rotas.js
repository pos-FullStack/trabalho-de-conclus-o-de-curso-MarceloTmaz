var express = require('express');
var router = express.Router();

const endereco = require('../api/DescobrirEndereco');
const geraMatrizDistancia = require('../api/geraMatrizDistancia'); // supondo que você separou em outro arquivo
const tsp_forca_bruta=require('../api/TSP')
const obterEndereco=require('../api/ObterEndereco')
const tsp_inicio_fim=require('../api/TSPInicioEFim');
const subrota=require('../api/sub_rotas')
//const orsService = require('../api/geraMapa');
const axios = require('axios');
var viagemModel=require('../models/viagemModel')
var rotaModel=require('../models/rotaModel')


//assicrono
const multer = require('multer');
const Viagem = require('../bd/Viagem');
const upload = multer();

router.get('/', function(req, res, next) {
  res.render('receber', { title: 'Informe os pontos de pausa' });
});

router.post('/paradas', (req, res) => {
  const qtd = parseInt(req.body.qtd);
  console.log(qtd);
  res.render('paradas_ajax', { qtd });
});
/*
router.post('/resumo', async (req, res) => {
  const qtd = parseInt(req.body.qtd);
  const paradas = [];

  for (let i = 0; i < qtd; i++) {
    paradas.push(req.body[`parada${i}`]);
  }

  

  try {
    // Obtem as coordenadas de cada parada (endereços)
  var coordenadas = [];

    for (const parada of paradas) {
      const coord = await endereco.descobrirCoordenada(parada); // retorna [lon, lat]
      coordenadas.push(coord);
    }

    // Gera a matriz de distâncias com as coordenadas
   // const matriz = await geraMatrizDistancia(coordenadas); // você precisa adaptar a função para retornar o resultado

    // Envia tudo para a view
    res.render('resumo', { paradas, coordenadas });

  } catch (error) {
    console.error('Erro ao buscar coordenadas ou gerar matriz:', error);
    res.status(500).send('Erro ao processar os endereços');
  }
});
*/
var   volataAoIncio=false;
/*
router.post('/resumo', async (req, res) => {
  console.log(req.body);
  
  const qtd = parseInt(req.body.qtd);
  const paradas = [];
  const partida=req.body.partida;
  paradas.push(partida)
  for (let i = 0; i < qtd; i++) {
    paradas.push(req.body[`parada${i}`]);
  }
  volataAoIncio=false;
  const checkboxMarcado = req.body.meuCheckbox === 'sim';
  if (checkboxMarcado) {
    paradas.push(partida);
    volataAoIncio=true;
  }
  console.log(checkboxMarcado)
  console.log(volataAoIncio)

   //Envia tudo para a view
   res.render('resumo_com_carregamento_ajax', { paradas });


});*/
// npm install multer

let minimizar;
router.post('/resumo', upload.none(), (req, res) => {
  //console.log('Recebido:', req.body);
  const body = req.body;

  const paradas = Object.keys(body)
    .filter(key => key.startsWith('parada') && !key.startsWith('dropdown'))
    .map(key => body[key]);

  console.log(paradas);
  const partida=req.body.partida;
  paradas.unshift(partida)
  console.log(paradas)
  volataAoIncio=false;
  minimizar=req.body.minimizar;
  const checkboxMarcado = req.body.meuCheckbox === 'sim';
  if (checkboxMarcado) {
    paradas.push(partida);
    volataAoIncio=true;
  }
    console.log(paradas)
  res.json(paradas);
 // res.send('Processado com sucesso!');
});


router.post('/api/coordenadas', async (req, res) => {
     const paradas = req.body.paradas; // <-- Alterado aqui!
    
    try {
        const coordenadas = [];
        console.log(paradas);

        for (const parada of paradas) {
            const coord = await endereco.descobrirCoordenada(parada); 
            if (coord) {
                coordenadas.push(coord);
            }
        }
          console.log(coordenadas)
        res.json(coordenadas);
    } catch (error) {
        console.error('Erro ao buscar coordenadas para API:', error);
        res.status(500).json({ error: 'Erro ao buscar coordenadas' });
    }
});

let matrizDistanciaParaTempo;

router.get('/api/matriz', async (req, res) => {
    const localidadeRaw = req.query.coordenadas;
    //console.log('Recebido:', localidadeRaw);

    try {
        const coordenadas = localidadeRaw.split(';').map(pair => {
            const [lon, lat] = pair.split(',').map(Number);
            return [lon, lat];
        });
        console.log(coordenadas);
        const matriz = await geraMatrizDistancia.geraMatrizDistanciaETempo(coordenadas);
        console.log(matriz.distancias);
        if(minimizar==1){
          res.json(matriz.distancias)
          matrizDistanciaParaTempo=matriz.distancias;

        }else{
          matrizDistanciaParaTempo=matriz.distancias;
           res.json(matriz.duracoes) // Retorna apenas o JSON
        }
    } catch (error) {
        console.error('Erro ao gera matriz para API:', error);
        res.status(500).json({ error: 'Erro ao gera matriz coordenadas' });
    }
});

function parseBool(value) {
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return Boolean(value);
}

router.post('/api/calcular_rota', async (req ,res)=>{
  const matriz_distancia=req.body.matriz;


  console.log(volataAoIncio)
     try {
      let rota=[]
        
        if( volataAoIncio===true){
          if(matriz_distancia.length<13){
            if(minimizar==1){
                rota =await tsp_inicio_fim.chamar(matriz_distancia);
            }else{
              rota =await tsp_inicio_fim.chamarTempo(matriz_distancia);
            }
          
          }else{
            rota = subrota.subrota(matriz_distancia)
          }
        }else{
          if(minimizar==1){
            if(matriz_distancia.length<12){
              rota =await tsp_forca_bruta.chamarDistanicia(matriz_distancia);
            }else{
              rota=subrota.subrota(matriz_distancia);
            }
          }else{
            if(matriz_distancia.length<12){
              rota =await tsp_forca_bruta.chamarTempo(matriz_distancia);
            }else{
              rota=subrota.subrota(matriz_distancia);
            }
          }
        }
        console.log(rota);
        
        const disancia=tsp_forca_bruta.calculaDistancia(rota[0], matrizDistanciaParaTempo);
        res.json({
            rota: rota,
            distancia: disancia
        }); // Retorna apenas o JSON
    } catch (error) {
        console.error('Erro ao calculara tsp para API:', error);
        res.status(500).json({ error: 'Erro ao calculara tsp coordenadas' });
    }
})

router.get('/pegar_localizacao', async (req, res) => {
    const latitude = req.query.latitude;
    const longitude= req.query.longitude;
    //let endereco='';
    try {
      console.log(latitude);
      console.log(longitude)
       const endereco= await obterEndereco.obterEndereco(latitude,longitude)//retorna rua e cidade
        console.log(endereco);
        res.json(endereco); // Retorna apenas o JSON
    } catch (error) {
        console.error('Erro ao buscar coordenadas para API:', error);
        res.status(500).json({ error: 'Erro ao buscar coordenadas' });
    }
});

router.post('/api/directions', async (req, res) => {
  console.log('cheguei');
  const coordinates = req.body.coordinates;
  console.log('coordinates:', coordinates);

  if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
    return res.status(400).json({ error: 'Coordenadas inválidas' });
  }

  const ORS_API_KEY = '5b3ce3597851110001cf624883c938d5189048eeb7e51719bb8378df';

  try {
    /*
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      { coordinates },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );*/
      const response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          coordinates,
          instructions: false,
          geometry_simplify: false
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

    
    console.log('Coordenadas da linha retornada:', response.data.features[0].geometry.coordinates.length);

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao chamar ORS:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro ao obter rota do ORS' });
  }
});

router.post('/salvar', async (req, res) => {
  try {
    const { origem, distancia, paradas } = req.body;
    const idUsuario = req.session.usuario.id;
    console.log(distancia)
    if (!origem || !distancia || !Array.isArray(paradas)) {
      return res.status(400).json({ error: "Dados incompletos ou inválidos." });
    }

    // Cria a viagem
    //const viagemCriada = await viagemModel.create(origem, distancia,minimizar, idUsuario);
    const novaViagem = await Viagem.create({
      origem: origem,
      distancia: distancia,
      otimizacao: minimizar,
      idtb_usuario: idUsuario
      // Note que não passamos 'data' nem 'data_cadastro', 
      // o Sequelize e o Banco cuidam disso!
    });

    const idViagem = novaViagem.idtb_viagem

    // Salva as paradas na ordem recebida
    for (const parada of paradas) {
      await rotaModel.create(parada, idViagem);
    }

    res.status(201).json({
      message: "Viagem e rotas salvas com sucesso!",
      idViagem,
      paradasSalvas: paradas
    });

  } catch (error) {
    console.error("Erro ao salvar viagem:", error);
    res.status(500).json({ error: "Erro interno ao salvar viagem." });
  }
});

/*
router.get('/viagens', async (req, res) => {
  try {
    const idUsuario = req.session.usuario.id;
    let viagens = await viagemModel.findUser(idUsuario);

    // Ordenar da mais recente para a mais antiga
    viagens.sort((a, b) => new Date(b.data) - new Date(a.data));

    // Agrupar por data (dia/mês/ano)
    const viagensPorData = {};
    viagens.forEach(v => {
      const dataFormatada = new Date(v.data).toLocaleDateString('pt-BR');
      if (!viagensPorData[dataFormatada]) {
        viagensPorData[dataFormatada] = [];
      }
      viagensPorData[dataFormatada].push(v);
    });

    res.render('viagens', { viagensPorData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar viagens');
  }
});

*/

router.get('/viagens', async (req, res) => {
  console.log("entrou")
  let user;
  try {
const idUsuario = req.session.usuario ? req.session.usuario.id : null;
if (!idUsuario) {
    console.log("Usuário não logado na sessão");
    return res.redirect("/login"); // Ou trate o erro
}    user=idUsuario;
    // Buscar viagens do usuário
    let viagens = await viagemModel.findUser(idUsuario);

    // === 1) ORDENAR CORRETAMENTE POR DATA (MAIS NOVA → MAIS ANTIGA) ===
    viagens.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());


    // No seu map, mude para:
viagens = viagens.map((v, index) => {
    // Se for Sequelize, use v.get({ plain: true }) ou {...v.dataValues}
    const viagemSimples = v.get ? v.get({ plain: true }) : v; 

    viagemSimples.contadorGlobal = viagens.length - index;
    const dataObj = new Date(viagemSimples.data);
    
    viagemSimples.horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    viagemSimples.dataFormatada = dataObj.toLocaleDateString("pt-BR");

    return viagemSimples;
});

    // === 3) AGRUPAR POR DATA, SEM MEXER NA ORDEM ===
    const viagensPorData = {};
    viagens.forEach(v => {
      if (!viagensPorData[v.dataFormatada]) {
        viagensPorData[v.dataFormatada] = [];
      }
      viagensPorData[v.dataFormatada].push(v);
    });

    res.render("viagens", {title:'Viagens',user, viagensPorData });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar viagens");
  }
});



router.get('/viagens/:id', async (req, res) => {
  try {
    const idViagem = req.params.id;
    const viagem = await rotaModel.find(idViagem)
    console.log(viagem)
    if (!viagem) {
      return res.status(404).send('Rota não encontrada');
    }
    let inicio = null;
    let fim = null;
    let paradas = [];

    if (viagem && viagem.length > 0) {
        inicio = viagem[0];
        fim = viagem[viagem.length - 1];
        paradas = viagem.slice(1, viagem.length - 1);
    }
    const user=req.session.usuario.id;

    res.render("detalhesViagem", {
        viagem,
        inicio,
        fim,
        paradas,
        user,
        title:'Viagem Detalhe'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar detalhes da viagem');
  }
});

//npm run dev
module.exports = router;