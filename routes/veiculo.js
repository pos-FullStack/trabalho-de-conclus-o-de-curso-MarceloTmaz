var express = require('express');
var router = express.Router();
var modelCombutivel=require('../models/combutivelModel')
var modelVeiculo=require('../models/veiculoModel')
const axios = require('axios');
const veiculo = require('../models/veiculoModel');
var preModel=require('../models/preModel')
const Veiculos =require('../bd/Veiculo')
/* GET users listing. */
router.get('/', function(req, res ) {
  res.send('precisarei de banco de dados');
});

router.get('/cadastrar_veiculo', async (req, res) => {
  const user=req.session.usuario.id
  if(user){
    const busca = await preModel.select();
    console.log(busca)
    const id=req.session.usuario.id;
    res.render('cadastrar_veiculo',{title:'Cadastrar Veiculo',user,id,busca});
  }else{
    res.redirect('/')
  }
});
/*
router.post('/cadastro', async (req, res) => {
    // Desestruture 'combustiveis' e 'combustiveis_primario' separadamente
    const { id,modelo, placa, combustiveis,meuCheckbox, combustiveis_primario } = req.body;
    
    console.log("Modelo:", modelo);
    console.log("Placa:", placa);
    console.log("primario",meuCheckbox)
    console.log("Combustível primário selecionado (índice):", combustiveis_primario);
//modelo, placa,id

    
      try {
        if (meuCheckbox === 'sim') {
          await modelVeiculo.resetPrimarios(id);
          await modelVeiculo.create(modelo, placa, 1, id);
        } else {
          const busca=await modelVeiculo.findUser(id);
          if(busca.length<1){
              await modelVeiculo.create(modelo, placa, 1, id);
          }else{
              await modelVeiculo.create(modelo, placa, 0, id);
          }
         
        }
      } catch (error) {
        console.error(error)
      }
    let id_veiculo=0;
      try {
        const busca=await modelVeiculo.findCreate(modelo,placa,id)
        console.log(busca)
        id_veiculo = busca[0].idtb_veiculo
      } catch (err) {
        
      }
    console.log(id_veiculo)
    console.log(combustiveis)
    // Verifique se combustiveis é um array e se tem conteúdo
    if (Array.isArray(combustiveis) && combustiveis.length > 0) {
       for (const [i,combustivel] of combustiveis.entries()) {
          const { nome, consumo, preco } = combustivel;
          const ehPrimario = (String(combustiveis_primario) === String(i)) ? 1 : 0;
          console.log(`Comparando: Radio(${combustiveis_primario}) com Ref(${referencial}) -> Resultado: ${ehPrimario}`);

          try {
              const inserir = await modelCombutivel.create(
                  preco,
                  consumo,
                  nome,
                  ehPrimario == referencial ? 1 : 0,
                  id_veiculo
              );
              console.log("Inserido:", inserir);
          } catch (error) {
              console.error("Erro ao inserir combustível:", error);
          }
          console.log(`- Nome: ${nome}, Consumo: ${consumo}, Preço: ${preco}, É Primário: ${ehPrimario == referencial}`);
      }
    } else {
        console.log("Nenhum combustível encontrado. A estrutura do formulário pode estar incorreta.");
    }
    res.redirect('/')
    //res.send({ id,modelo, placa, combustiveis, combustiveis_primario });
});
*/
router.post('/cadastro', async (req, res) => {
    // Desestruture 'combustiveis' e 'combustiveis_primario' separadamente
    const { id,modelo, placa, combustiveis,meuCheckbox, combustiveis_primario } = req.body;
    
    console.log("Modelo:", modelo);
    console.log("Placa:", placa);
    console.log("primario",meuCheckbox)
    console.log("Combustível primário selecionado (índice):", combustiveis_primario);
//modelo, placa,id

    
      try {
        if (meuCheckbox === 'sim') {
          await modelVeiculo.resetPrimarios(id);
          await modelVeiculo.create(modelo, placa, 1, id);
        } else {
          const busca=await modelVeiculo.findUser(id);
          if(busca.length<1){
              await modelVeiculo.create(modelo, placa, 1, id);
          }else{
              await modelVeiculo.create(modelo, placa, 0, id);
          }
         
        }
      } catch (error) {
        console.error(error)
      }
    let id_veiculo=0;
      try {
        const busca=await modelVeiculo.findCreate(modelo,placa,id)
        console.log(busca)
        id_veiculo = busca[0].idtb_veiculo
      } catch (err) {
        
      }
    console.log(id_veiculo)
    console.log(combustiveis)
    // Verifique se combustiveis é um array e se tem conteúdo
    if (Array.isArray(combustiveis) && combustiveis.length > 0) {
       for (const combustivel of combustiveis) {
          const { nome, consumo, preco, referencial } = combustivel;
          const ehPrimario = Number(combustiveis_primario);
          const ref = Number(referencial);

          try {
              const inserir = await modelCombutivel.create(
                  preco,
                  consumo,
                  nome,
                  ehPrimario == ref ? 1 : 0,
                  id_veiculo
              );
              console.log("Inserido:", inserir);
          } catch (error) {
              console.error("Erro ao inserir combustível:", error);
          }
              
          console.log(`- Nome: ${nome}, Consumo: ${consumo}, Preço: ${preco}, É Primário: ${ehPrimario == referencial}`);
      }
    } else {
        console.log("Nenhum combustível encontrado. A estrutura do formulário pode estar incorreta.");
    }
    res.redirect('/')
    //res.send({ id,modelo, placa, combustiveis, combustiveis_primario });
});


router.post('/atualizar', async (req,res)=>{
  
  const id=req.body.id
  console.log(id)

  const dados=await modelVeiculo.findOne(id);
  const modelo=dados[0].modelo;
  const placa=dados[0].placa;
  const user=req.session.usuario.id
  res.render('atualizar_veiculo',{title:'Atualizar Veiculo',user, id,modelo,placa,})
})

router.post('/atualizar_v',async(req,res)=>{
  const {id,modelo,placa}=req.body;
  console.log(req.body)
  try {
    const atualizar = await modelVeiculo.update(id,modelo,placa);
  } catch (error) {
    console.error(error)
  }
  res.redirect('/usuario/perfil');
})

router.post('/deletar', async (req, res) => {
  const { id } = req.body;

  try {
    // No Sequelize, usamos o método destroy
    await Veiculos.destroy({
      where: {
        idtb_veiculo: id // Certifique-se que o nome do atributo coincide com o do seu modelo
      }
    });
    
    // Opcional: Você pode adicionar um log ou mensagem de sucesso
    console.log(`Veículo ${id} e seus combustíveis foram removidos.`);

  } catch (error) {
    // É importante tratar o erro para não travar a aplicação
    console.error("Erro ao deletar veículo:", error);
    // Opcional: enviar uma mensagem de erro para a view
  }

  // Redireciona o usuário após a operação
  res.redirect('/usuario/perfil');
});

router.get('/gerenciar_primario', async(req,res)=>{
  const id=req.session.usuario.id;
  let veiculos=await modelVeiculo.findUser(id)
  console.log(veiculos)
  const user=id;
  res.render('escolherPrimario',{title:'Escolher Primario',user,veiculos})
})

router.post('/gerenciar_salvar',async(req,res)=>{
  const check=req.body.primario
  await modelVeiculo.resetPrimarios(req.session.usuario.id)
  await modelVeiculo.updatePrimario(check)
  res.redirect('/usuario/perfil')
})


module.exports = router;

