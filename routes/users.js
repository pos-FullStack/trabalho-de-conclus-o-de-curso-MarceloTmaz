var express = require('express');
var router = express.Router();
var path = require('path');

//gerar email
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config(); // carrega as variáveis do .env
const {db} = require('../bd/db_config'); // pool mysql2
//fim
//colocar imagem
var multer = require('multer');
//fim
const Usuario = require('../bd/Usuario'); 
var model=require('../models/usuarioModel')
var modelVeiculo=require('../models/veiculoModel')
var modelViagem=require('../models/viagemModel');
const { title } = require('process');
const { Op } = require('sequelize'); 


// Configuração do armazenamento de arquivos
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pasta onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    var nomeArquivo = Date.now() + path.extname(file.originalname);
    cb(null, nomeArquivo);
  }
});

// Inicializa o multer com a configuração acima
var upload = multer({ storage: storage });


/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/cadastrar',(req,res)=>{

    res.render('cadastrar_usuario',{title:'Cadastrar'})

})
/*
router.post('/cadastro', upload.single('foto'), async(req,res)=>{
    const { nome, email, senha, telefone } = req.body;
    const foto = req.file ? req.file.filename : null;


    // Gera token único
    const token = crypto.randomBytes(32).toString('hex');

    // Salva usuário como "não verificado"
    try {
      console.log(foto)
      if(foto==null){

      
            await pool.query(
                'INSERT INTO tb_usuario (nome, email, senha, telefone, email_verificado, email_token) VALUES (?, ?, ?, ?, 0, ?)',
                [nome, email, senha, telefone, token]
            );
          }else{
            await pool.query(
                'INSERT INTO tb_usuario (nome, email, senha, telefone,imagem, email_verificado, email_token) VALUES (?, ?, ?, ?, ?, 0, ?)',
                [nome, email, senha, telefone, foto, token]
            );
          }

        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
                
                const errorMessage = 'Este e-mail já está cadastrado.';
                
                // CORREÇÃO: Codifica a mensagem e a anexa à URL como query parameter
                const encodedMessage = encodeURIComponent(errorMessage);

                // Redireciona para o URL de login com a mensagem de erro
                return res.redirect(`/usuario/login?mensagem=${encodedMessage}`);

            } else {
                console.error('Erro ao registrar usuário:', error);
                // É bom usar 'return' aqui também para encerrar a execução
                return res.render('cadastrar_usuario', { errorMessage: 'Ocorreu um erro inesperado. Tente novamente.' });
            }
        }
    

    // Monta link de verificação
   // const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const frontendUrl = 'https://unreleasable-arturo-daringly.ngrok-free.dev';
    const verifyLink = `${frontendUrl}/usuario/verificar-email/${token}`;

    // Envia e-mail
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Confirme seu cadastro',
      html: `<p>Olá ${nome},</p>
             <p>Confirme seu cadastro clicando no link abaixo:</p>
             <a href="${verifyLink}">${verifyLink}</a>`
    });
  res.redirect('/usuario/login')
})
*/

router.post('/cadastro', upload.single('foto'), async (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    const foto = req.file ? req.file.filename : null;
    // Gera token único
    const token = crypto.randomBytes(32).toString('hex');

    try {

        await Usuario.create({
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            imagem: foto, 
            email_verificado: 0,
            email_token: token
        });

    } catch (error) {
        // O Sequelize lança um erro específico para violação de UNIQUE (e-mail duplicado)
        if (error.name === 'SequelizeUniqueConstraintError' || error.errno === 1062) {
            const errorMessage = 'Este e-mail já está cadastrado.';
            const encodedMessage = encodeURIComponent(errorMessage);
            return res.redirect(`/usuario/login?mensagem=${encodedMessage}`);
        } else {
            console.error('Erro ao registrar usuário:', error);
            return res.render('cadastrar_usuario', { 
                errorMessage: 'Ocorreu um erro inesperado. Tente novamente.' 
            });
        }
    }

    // Monta link de verificação
    const frontendUrl ='http://localhost:3000';
  //const frontendUrl = 'https://unreleasable-arturo-daringly.ngrok-free.dev';
    const verifyLink = `${frontendUrl}/usuario/verificar-email/${token}`;

    // Envia e-mail
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Confirme seu cadastro',
            html: `<p>Olá ${nome},</p>
                   <p>Confirme seu cadastro clicando no link abaixo:</p>
                   <a href="${verifyLink}">${verifyLink}</a>`
        });
    } catch (mailError) {
        console.error('Erro ao enviar e-mail:', mailError);
        // Opcional: tratar erro de envio de e-mail aqui
    }

    res.redirect('/usuario/login');
});

router.get('/verificar-email/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT idtb_usuario FROM tb_usuario WHERE email_token = ?',
      [token]
    );

    if (rows.length === 0) {
      return res.render("login", { mensagem:"Token inválido ou já utilizado."});
    }

    const userId = rows[0].idtb_usuario;

    // Atualiza status de verificação
    await db.query(
      'UPDATE tb_usuario SET email_verificado = 1, email_token = NULL WHERE idtb_usuario = ?',
      [userId]
    );

     res.render("login", {title:'Login', mensagem:"E-mail confirmado com sucesso! Agora você pode fazer login."});
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao verificar e-mail.");
  }
})

router.get('/atualizar',(req,res)=>{
const { id, nome, telefone } = req.session.usuario;
const user=id;
  res.render('atualizar_usuario', { title:'Atualizar',id, nome, telefone,user });
})

//npm install multer

router.post('/atualizar', upload.single('foto'), async (req, res) => {
  const { id, nome, telefone, senha } = req.body;
  
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).send("Usuário não encontrado");
    }

    const dadosAtualizados = { nome, telefone };

    if (senha && senha.trim() !== "") {
      dadosAtualizados.senha = senha;
    }

    if (req.file) {
      dadosAtualizados.imagem = req.file.filename;
    }

    await usuario.update(dadosAtualizados);

    res.redirect('/usuario/perfil');

  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).send("Erro interno no servidor");
  }
});

router.get('/login',(req,res)=>{
  if(req.query.mensagem){
    res.render('login',{title:'Login', mensagem:req.query.mensagem})
  }else{
   res.render('login',{title:'Login'})
  }

})

/*
router.post('/login',(req,res)=>{
  console.log("pão")
  const email = req.body.email;
  const senha = req.body.senha;
(async () => {
  

  try {
    const usuario = await model.findOne(email, senha);

    if (usuario) {
      req.session.usuario = {
        id: usuario.idtb_usuario,
        email: usuario.email,
        nome: usuario.nome,
        telefone: usuario.telefone
      };

      console.log(req.session.usuario);
      res.redirect('/');
    } else {
      res.render('login', { mensagem: 'Usuário ou senha incorretos.' });
    }
  } catch (err) {
    console.error(err);
    res.render('login', { mensagem: 'Ocorreu um erro ao tentar fazer login. Tente novamente.' });
  }

})
    
})
*/
router.post("/login", async (req, res) => {
  const { email, senha, meuCheckbox } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email: email } });

    if (usuario) {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.render("login", { title: 'Login', mensagem: "Usuário ou senha incorretos." });
      }

      if (!usuario.email_verificado) {
        return res.render("login", { title: 'Login', mensagem: "Confirme seu e-mail antes de fazer login." });
      }

      if (meuCheckbox === "sim") {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 dias
      } else {
        req.session.cookie.expires = false; // Expira ao fechar navegador
      }

      req.session.usuario = {
        id: usuario.idtb_usuario,
        email: usuario.email,
        nome: usuario.nome,
        telefone: usuario.telefone
      };
      return res.redirect("/");
    } else {
      return res.render("login", { title: 'Login', mensagem: "Usuário ou senha incorretos." });
    }
  } catch (err) {
    console.error("Erro no login:", err);
    return res.render("login", { title: 'Login', mensagem: "Erro ao tentar fazer login." });
  }
});


router.get('/perfil', async (req, res) => {
  if (req.session.usuario) {
    const { id, nome, telefone } = req.session.usuario;
    let veiculos = [];
    let usuarioFoto = null;
    const email=req.session.usuario.email
    try {
      const [usuario] = await db.query('SELECT imagem FROM tb_usuario WHERE idtb_usuario = ?', [id]);
      if (usuario.length > 0) {
        usuarioFoto = usuario[0].imagem;
      }
      console.log(usuarioFoto)
      veiculos = await modelVeiculo.findUser(id);
      const viagem=await modelViagem.findCount(id);
      console.log(viagem)
      const total = viagem[0]['COUNT(*)'];  
      const user=id;
      res.render('perfil', { title:'Perfil',user,id, nome, email,total, veiculos, foto: usuarioFoto });
    } catch (error) {
      console.error(error);
      return res.render('perfil', {
        title:'Perfil',user,
        id, nome, telefone,
        mensagem: 'Ocorreu um erro ao tentar obter os veículos. Tente novamente.'
      });
    }
  } else {
    res.redirect('/usuario/login');
  }
});


router.get('/esqueci_senha',(req,res)=>{
  res.render('recuperarSenha',{title:'Esqueci Senha'})
})


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // seu email gmail
    pass: process.env.SMTP_PASS  // senha de app
  }
});
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "****OK****" : "NÃO DEFINIDA");

// Testa se o servidor SMTP está respondendo
transporter.verify((error, success) => {
  if (error) {
    console.error("Erro no SMTP:", error);
  } else {
    console.log("Servidor SMTP pronto para enviar mensagens");
  }
});

//npm install nodemailer
//npm install bcrypt
//npm install dotenv

/*-
router.post('/recuperar', async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ error: 'Email é obrigatório' });

    const [rows] = await pool.query('SELECT idtb_usuario, nome FROM tb_usuario WHERE email = ?', [email]);
    if (rows.length === 0) return res.json({ message: 'Se o email existir, será enviado um link de recuperação.' });

    const user = rows[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hora

    await pool.query('UPDATE tb_usuario SET reset_token = ?, reset_expires = ? WHERE idtb_usuario = ?', [token, expires, user.idtb_usuario]);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';


    const resetLink = `${frontendUrl}/usuario/recuperar-senha/${token}`;

await transporter.sendMail({
  from: process.env.SMTP_FROM,       // "Suporte <seuemail@gmail.com>"
  to: email,                         // email do usuário que pediu recuperação
  subject: 'Recuperação de senha',
  text: `Clique no link para redefinir sua senha: ${resetLink}`,
  html: `<p>Clique no link abaixo para redefinir sua senha:</p>
         <a href="${resetLink}">${resetLink}</a>`
});


    return res.render("login", {title:'Login', mensagem: 'Será enviado um link de recuperação.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
});
*/
router.post('/recuperar', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    // 1. Buscar o usuário pelo email usando Sequelize
    const usuario = await Usuario.findOne({
      where: { email: email }
    });

    // Por segurança, não confirmamos se o email existe ou não para evitar "user enumeration"
    if (!usuario) {
      return res.render("login", { 
        title: 'Login', 
        mensagem: 'Se o email existir, será enviado um link de recuperação.' 
      });
    }

    // 2. Gerar o token e a expiração
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hora a partir de agora

    // 3. Atualizar o usuário com os dados do reset
    usuario.reset_token = token;
    usuario.reset_expires = expires;
    await usuario.save();

    // 4. Configurar link e enviar email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  //const frontendUrl = 'https://unreleasable-arturo-daringly.ngrok-free.dev';
    const resetLink = `${frontendUrl}/usuario/recuperar-senha/${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Recuperação de senha',
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
      html: `
        <p>Olá, ${usuario.nome},</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este link expira em 1 hora.</p>
      `
    });

    return res.render("login", { 
      title: 'Login', 
      mensagem: 'Será enviado um link de recuperação.' 
    });

  } catch (err) {
    console.error("Erro na recuperação de senha:", err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
});

   //const frontendUrl = 'https://unreleasable-arturo-daringly.ngrok-free.dev';


router.get('/recuperar-senha/:token', async (req, res) => {  const { token } = req.params;
  // aqui você pode validar no banco se token existe e não expirou
    const [rows] = await db.query(
    "SELECT idtb_usuario FROM tb_usuario WHERE reset_token = ? AND reset_expires > NOW()",
    [token]
  );
  if(rows.length===0){
        return res.render('login', { mensagem: "Token inválido ou expirado" });
  }
  res.render('digitarSenha', {title:'Digite sua senha', token });
});

router.post('/atualizarSenha', async (req, res) => {
  const { token, senha, senha2 } = req.body;

  // 1. Validação básica de coincidência
  if (senha !== senha2) {
    return res.render('digitarSenha', { token, mensagem: "As senhas não coincidem" });
  }

  try {
    // 2. Buscar o usuário pelo token e verificar expiração
    // reset_expires deve ser maior que a data atual [Op.gt] significa "Greater Than"
    const usuario = await Usuario.findOne({
      where: {
        reset_token: token,
        reset_expires: {
          [Op.gt]: new Date() 
        }
      }
    });

    if (!usuario) {
      return res.render('digitarSenha', { mensagem: "Token inválido ou expirado" });
    }


    usuario.senha = senha; 
    usuario.reset_token = null;
    usuario.reset_expires = null;
    
    await usuario.save();

    res.render("login", { mensagem: "Senha atualizada com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    res.status(500).render("digitarSenha", { mensagem: "Erro interno no servidor" });
  }
});

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Erro ao encerrar sessão:", err);
            return res.status(500).send("Erro ao fazer logout");
        }
        res.clearCookie("connect.sid"); // Remove cookie da sessão
        res.redirect("/"); // Redireciona para página inicial
    });
});

module.exports = router;
