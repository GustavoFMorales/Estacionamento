
var express = require('express');
var db = require('../util/db')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/listar', function(req, res){
  db.query('SELECT * FROM registros',[req.body.id,req.body.nome_cliente,req.body.cpf,req.body.modelo_carro,req.body.placa_carro,req.body.data_entrada,req.body.data_saida,req.body.forma_pagamento], function (erro, resultado){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('lista', {lista : resultado})
  })
});
/* Rota para acessar o formulário de cadastro */
router.get('/add', function(req, res) {
  res.render('form', {estacionamento: {}});
});
// rota para receber os dados de cadastro

router.post('/add', function(req, res) {
 
  db.query('insert into registros(nome_clinete,cpf,modelo_carro,placa_carro,data_entrada,data_saida,forma_pagamento) VALUES(?,?,?,?,?,?,?)',[req.body.nome_cliente,req.body.cpf,req.body.modelo_carro,req.body.placa_carro,req.body.data_entrada,req.body.data_saida,req.body.forma_pagamento],function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro);
    }
    res.redirect('/listar');
  })
 
});

// Rota para buscar o cadastro para edição
router.get('/edit/:id', function(req, res){
  db.query('SELECT * FROM registros where id = ?',[req.params.id], function(erro, resultado){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.render('form', {estacionamento: resultado[0]});
  })
});

router.post('/edit/:id', function(req, res) {
 
  db.query('update registros set nome_clinete = ?, cpf = ?, modelo_carro = ?, placa_carro = ?, data_entrada = ?, data_saida = ?, forma_pagamento = ? where id = ?',[req.body.nome_cliente,req.body.cpf,req.body.modelo_carro,req.body.placa_carro,req.body.data_entrada,req.body.data_saida,req.body.forma_pagamento, req.params.id],function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro);
    }
    res.redirect('/listar');
  })
 
});

router.delete('/delete/:id', function(req, res) {
 
  db.query('delete from registros where id = ?',[ req.params.id],function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro);
    }else{
      res.status(200).send('Excluido');
    }
   
  })
 
});
module.exports = router;



