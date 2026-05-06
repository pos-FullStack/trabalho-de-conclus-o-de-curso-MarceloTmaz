var express = require('express');
var router = express.Router();
var modelCombutivel=require('../models/combutivelModel')
var modelVeiculo=require('../models/veiculoModel')
var preModel=require('../models/preModel')
const axios = require('axios');


router.post('/gerenciar', async (req, res) => {
  const id=req.body.id;
  try {
      const combustiveis=await modelCombutivel.findCar(id);
      console.log(combustiveis);/*
      const ultimoId = combustiveis.length > 0 
        ? Math.max(...combustiveis.map(c => c.idtb_combustivel)) 
        : 0;*/
 
      const busca = await preModel.select();
      console.log('busca', busca)
      const user=id;
      const ultimoId = combustiveis.length > 0 
        ? Math.max(...combustiveis.map(c => c.idtb_combustivel)) 
        : 0;
     console.log(ultimoId)
      console.log('combustiveis', combustiveis);
      res.render('combutivel', { combustiveis, ultimoId, id, busca, user, title: 'Gerenciar Combustivel' });
  } catch (error) {
    res.redirect('/usuario/perfil')
  }
});

router.post('/gerenciar_salvar', async (req, res) => {
  const { id, combustiveis_primario, combustiveis } = req.body;
  let combutivieisUso;
  let idUso = [];
  let usados = [];

  try {
    const combustivel = await modelCombutivel.findCar(id);
    combutivieisUso = combustivel;
  } catch (error) {
    console.error("Erro ao buscar combustíveis do usuário:", error);
    return res.redirect('/usuario/perfil');
  }

  for (let index = 0; index < combutivieisUso.length; index++) {
    idUso.push(combutivieisUso[index].idtb_combustivel);
    usados.push(0);
  }
  const idUsoStr = idUso.map(x => String(x));

  // Função auxiliar para "explodir" arrays em itens unitários
  function explodeCombustiveis(list) {
      const out = [];
      for (const c of list) {
          // Se o nome for array, significa que temos múltiplos itens vindo no mesmo bloco
          if (Array.isArray(c.nome)) {
              for (let j = 0; j < c.nome.length; j++) {
                  out.push({
                      // Pega o referencial na mesma posição J do array, ou vazio se não existir
                      referencial: (Array.isArray(c.referencial) && c.referencial[j]) ? String(c.referencial[j]) : "",
                      preco: c.preco ? c.preco[j] : null,
                      consumo: c.consumo ? c.consumo[j] : null,
                      nome: c.nome[j],
                  });
              }
          } else {
              // Caso seja um item único (não array)
              out.push({
                  referencial: (c.referencial && c.referencial !== "undefined") ? String(c.referencial) : "",
                  preco: c.preco,
                  consumo: c.consumo,
                  nome: c.nome,
              });
          }
      }
      return out;
  }

  if (Array.isArray(combustiveis) && combustiveis.length > 0) {
    const items = explodeCombustiveis(combustiveis);

    for (const item of items) {
      const ehPrimarioBit = String(combustiveis_primario) === item.referencial ? 1 : 0;
      console.log(`Comparando: Item do Form (${item.referencial}) com Lista do Banco (${idUsoStr})`);
      console.log(`Existe na lista? ${idUsoStr.includes(item.referencial)}`);
      if (idUsoStr.includes(item.referencial)) {
        // UPDATE existente
        const idx = idUsoStr.indexOf(item.referencial);
        usados[idx] = 1;
        console.log(item.nome)
        try {
          await modelCombutivel.update(
            item.preco,
            item.consumo,
            item.nome,
            ehPrimarioBit,
            item.referencial
          );
          console.log("Atualizado:", item.referencial);
        } catch (error) {
          console.error("Erro ao atualizar:", error);
        }
      } else {
        // CREATE novo
        try {
          await modelCombutivel.create(
            item.preco,
            item.consumo,
            item.nome,
            ehPrimarioBit,
            id
          );
          console.log("Inserido:", item.referencial);
        } catch (error) {
          console.error("Erro ao inserir combustível:", error);
        }
      }

      console.log(
        `- Nome: ${item.nome}, Consumo: ${item.consumo}, Preço: ${item.preco}, É Primário: ${ehPrimarioBit}`
      );
    }
  } else {
    console.log("Nenhum combustível encontrado. A estrutura do formulário pode estar incorreta.");
  }

  // Remover os que não foram usados
  for (let i = 0; i < usados.length; i++) {
    if (usados[i] === 0) {
      try {
        const removido=await modelCombutivel.delete(idUso[i]);

        console.log("Para remover:", removido);
      } catch (error) {
        console.error("Erro ao remover:", error);
      }
    }
  }

  res.redirect('/usuario/perfil');
});

module.exports = router;

