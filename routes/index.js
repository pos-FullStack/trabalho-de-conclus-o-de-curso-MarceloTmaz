var express = require('express');
var router = express.Router();
const axios = require('axios');
var modelCombutivel=require('../models/combutivelModel')
var modelVeiculo=require('../models/veiculoModel')
var Precombutivel=require('../bd/Precombustivel')
/* GET home page. */
router.get('/', async function(req, res, next) {
  
try {
  const pc = await Precombutivel.findAll();
  
  if (pc.length === 0) {
    // Usando bulkCreate para inserir todos de uma vez (mais eficiente)
    await Precombutivel.bulkCreate([
      { nome: 'Gasolina' },
      { nome: 'Etanol' },
      { nome: 'Diesel S10' },
      { nome: 'Diesel' }, // Corrigi o erro de digitação de "Disel"
      { nome: 'GNV' }
    ]);
    console.log("Combustíveis iniciais cadastrados com sucesso!");
  }
} catch (error) {
  console.error("Erro ao popular tabela:", error);
}
  
  if(req.session.usuario){
    let { id, nome, telefone }=req.session.usuario
    let veiculos=[]
    try {
      //retornar todos os veiculos do usuario
      veiculos=await modelVeiculo.findUser(id);
      let combutiviesTotais=[]; 
      for(const veiculo of veiculos){
        const{idtb_veiculo,modelo,placa,idtb_usuario}=veiculo
        console.log(idtb_usuario)
        let combutiveis=await modelCombutivel.findCar(idtb_veiculo);
        combutiviesTotais.push(combutiveis);
      }
      console.log(veiculos)
      console.log(combutiviesTotais)
      let veiculosComCombustiveis = veiculos.map((v, i) => ({
        ...v,
        combustiveis: combutiviesTotais[i]
      }));
      console.log(veiculosComCombustiveis)
      const user=id;
      const index=true;
      res.render('principal', { 
        title: 'Gerenciador de rotas',
        veiculosComCombustiveis,
         user,
        nome,
        index
      });
    } catch (error) {
      console.log(error)
       //res.render('principal', { title: 'Express' });
    }
  }else{
    const index=true;
   res.render('index', { title: 'Gerenciador de rotas',index });
  }
  

});

module.exports = router;
