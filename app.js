var createError = require('http-errors');
const exphbs = require('express-handlebars');
var express = require('express');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rotas=require('./routes/rotas');
var veiculo=require('./routes/veiculo')
var combutiveis=require('./routes/combutivel')
var app = express();

//const sequelize = require('./bd/database');
const mysql = require('mysql2/promise');




const { db, ensureDatabaseExists } = require("./bd/db_config");


/*
async function startApp() {
    try {
        
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678'
        });
        await connection.query('CREATE DATABASE IF NOT EXISTS `rotas`;');
        await connection.end();
        
       await ensureDatabaseExists();
        console.log("✅ Banco verificado ou criado!");

        await sequelize.authenticate();
        

        await sequelize.sync({ alter: true }); 
        console.log("🚀 Tabelas sincronizadas e servidor pronto!")

        
    } catch (error) {
        console.error("❌ Erro ao iniciar:", error);
    }
}*/

async function startApp() {
    try {
        // PASSO 1: Cria o banco usando mysql2 puro (sem database no config)
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Mtc2004*'
        });
        await connection.query('CREATE DATABASE IF NOT EXISTS `rotas`;');
        await connection.end();
        console.log("✅ Banco de dados 'rotas' verificado!");

        // PASSO 2: Agora que o banco existe, importamos o sequelize e os models
        const sequelize = require('./bd/database');
        require('./bd/Combustivel')
        require('./bd/Precombustivel')
        require('./bd/Rota')
        require('./bd/Usuario')
        require('./bd/Veiculo')
        require('./bd/Viagem')

        // PASSO 3: Autentica e Sincroniza
        await sequelize.sync({ alter: true })
        .then(() => console.log('Banco sincronizado'))
        .catch(err => console.error(err)); 
        console.log("🚀 Servidor pronto e tabelas criadas!");

    } catch (error) {
        console.error("❌ Erro ao iniciar:", error);
    }
}

startApp();






app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));





// para senssion npm install express-session
const session = require('express-session');
app.use(session({
    secret: 'otimi_route', // Use uma string forte e única para a sua aplicação em produção
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


//necessario instalr o pacote npm install dotenv
// view engine setup
require('dotenv').config();
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "****OK****" : "NÃO DEFINIDA");


// Configuração do Handlebars
app.engine('hbs', exphbs.engine({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views'),
    extname: '.hbs',
    helpers: {
        //NOVO HELPER PARA FORMATAR DURAÇÃO/DISTÂNCIA COM 2 CASAS DECIMAIS
        formatDuration: function (duration) {
            // Verifica se o valor é um número para aplicar toFixed(2) com segurança
            if (typeof duration === 'number' && !isNaN(duration)) {
                return duration.toFixed(2);
            }
            // Retorna o valor original ou um fallback se não for um número válido
            return duration; 
        },

        // JSON
        json: function (context) {
            return JSON.stringify(context);
        },

        // INC
        inc: function (value) {
            return parseInt(value) + 1;
        },

        // EQ
        eq: function (a, b) {
            return a == b;
        },
        gt: function (a, b) {
            return Number(a) > Number(b);
        },
        horas: function (a) {
            let totalMinutos = Number(a);
            let horas = Math.floor(totalMinutos / 60);
            let minutos = Math.round(totalMinutos % 60);
            return horas + ":" + minutos.toString().padStart(2, '0');
        },

        minutos: function (distancia) {
            let totalMinutos = Number(distancia);
            let min = Math.floor(totalMinutos);
            // Pega a parte decimal e converte em segundos
            let seg = Math.round((totalMinutos - min) * 60);
            return min.toString().padStart(2, '0') + ":" + seg.toString().padStart(2, '0');
        },
        add: (a, b) => a + b,
        // CONTENT (necessário para {{#content}} )
        content: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));



//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/rotas',rotas);
app.use('/veiculo',veiculo);
app.use('/combustivel',combutiveis)
//app.use('/rotas/paradas',rotas);

//app.use(express.static(path.join(__dirname, 'public')));



const port = process.env.PORT || 3000;
//const port =80;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
