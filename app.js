require('dotenv').config()

const express = require('express')
const session = require('express-session')
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const https = require('https')
const cors = require('cors')
const fs = require('fs-extra')
const rotas_get = require('./servicos/rotas_get.js')
const rotas_post = require('./servicos/rotas_post.js')
const privateKey = fs.readFileSync(`${process.env.CHAVE_PRIVADA}`, 'utf8')
const certificate = fs.readFileSync(`${process.env.CERTIFICADO}`, 'utf8')
// const ca = fs.readFileSync(`${process.env.CA}`, 'utf8')

// const credenciais = { ca: ca, key: privateKey, cert: certificate } // Com o ca
const credenciais = { key: privateKey, cert: certificate } // Sem o ca
const urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.CONEXAO_MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true }) // Conecta pelo Mongoose com nosso MongoDB local

// Chamamos e configuramos o express.
const app = express()

app.use(compression())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Middleware para permitir solicitações de intervalo de bytes
app.use((req, res, next) => {
  res.header('Accept-Ranges', 'bytes');
  next();
});

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/*
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hora
    secure: false
  },
  store: MongoStore.create({ mongoUrl: `${process.env.CONEXAO_MONGODB}` })
}))
*/
const TWO_HOURS = 1000 * 60 * 60 * 2

const {
  SESS_NAME = 'sessao',
  SESS_SECRET = 'segredo_da_sessao',
  SESS_LIFETIME = TWO_HOURS
} = process.env
const IN_PROD = process.env.NODE_ENV === 'production'

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: false,
    secure: false,
    httpOnly: false
  },
  store: MongoStore.create({ mongoUrl: `${process.env.CONEXAO_MONGODB}` })
}))

// Middleware que trata erros.
app.use((err, req, res, next) => {
  console.log('err')
  res.status(500).send({msg: err.message})
})
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

// Middleware para capturar subdomínio.
app.use((req, res, next) => {
  const host = req.headers.host; // Ex: "pt.seudominio.com"
  const subdomain = host.split('.')[0]; // Captura o subdomínio (antes do primeiro ponto)

  // Armazena o subdomínio na requisição para uso posterior
  req.subdomain = subdomain;
  next();
});

// Middleware para definir idioma baseado no subdomínio
app.use((req, res, next) => {
  

  // Aqui abaixo, se o usuário não digitou as siglas antes do domínio,
  // mostramos, na www. o site no idioma preferido do usuário.
  // Se não tem as siglas antes do domínio, nem idioma preferido, vai inglês msm.
  const acceptLanguage = req.headers['accept-language']

  // Se o cabeçalho não estiver presente, use 'en' como fallback
  const idiomaPreferido = acceptLanguage ? acceptLanguage.split(',')[0] : 'en';

  // Pegando somente a sigla do idioma (antes do hífen)
  const idioma_preferido_sigla = idiomaPreferido.split('-')[0];
  console.log(`${req.url}  :  ${req.method}`)
  // console.log('Idioma preferido do usuário:', idioma_preferido_sigla); // Exemplo: 'pt' ou 'en'

  const supportedLanguages = ['pt', 'es', 'en', 'it', 'fr', 'de']; // Idiomas suportados
  if (supportedLanguages.includes(req.subdomain)) {
    req.idioma_interface = req.subdomain;
  } else {
    req.idioma_interface = idioma_preferido_sigla; // Idioma padrão
  }

  // console.log(req.session)

  req.session.desce_JSON = 'nao'
  if (req.idioma_anterior) {
    if (req.idioma_anterior != req.idioma_interface) {
      req.session.desce_JSON = 'sim'
    }
  }

  if (!req.idioma_anterior) {
    req.idioma_anterior = req.idioma_interface
    req.session.desce_JSON = 'sim'
  }

  // Tem que ver se altera tb, e marcar na req.alterou_idioma, para enviar o JSON novo.
  next();
});

const server = https.createServer(credenciais, app) // Criamos o servidor, de fato.

server.listen(process.env.PORTA_SERVIDOR, `${process.env.IP_SERVIDOR}`, () => {
  console.log(`Servidor HTTPS ativo em https://${process.env.IP_SERVIDOR}:${process.env.PORTA_SERVIDOR}`)
  console.log('Para derrubar o servidor: ctrl + c. Saoooko.')
  console.log('***************************************************************************')
})

rotas_get.rotas(app)
rotas_post.rotas(app)

app.use((req, res, next) => {
  const dados = { tela: '404' }
  res.render('index', { 'dados': JSON.stringify(dados) })
})