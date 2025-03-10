const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const path = require('path')
const fs = require('fs-extra')

const acesso = require('../modelos/acesso')
const oi = require('../regras_negocio/oi.js')
const regras_negocio = require('./regras_negocio.js')
const servicos_especificos = require('./servicos_especificos.js')
const mongoose = require('mongoose')


// Middlewares de redirecionamento.
const redirectLogin = (req, res, next) => {

  if (!req.session.userId) {
    // console.log("redirect to Index")
    console.log("diz que nao ta logado")
    const dados = { tela: 'index' }
    res.render('index', { 'dados': JSON.stringify(dados) })
  } else {
    // console.log("redirectLogin: Está logado.")
    next()
  }
}

const redirectHome = (req, res, next) => {

  if (req.session.userId) {
    console.log("redirect to Home")
    const dados = { tela: 'home' }
    res.render('index', { 'dados': JSON.stringify(dados) })
  } else {
    // console.log("nao vai pra home")
    next()
  }
}

module.exports = {

	rotas: async (app) => {

		app.get(['/', '/index'], redirectHome, async (req, res) => regras_negocio.envia_hud_deslogado(req, res, 'index'))
	  app.get('/login', redirectHome, (req, res) => regras_negocio.envia_hud_deslogado(req, res, 'login'))
	  app.get('/cadastro', redirectHome, (req, res) => regras_negocio.envia_hud_deslogado(req, res, 'cadastro'))
		
		app.get('/politica_privacidade', redirectHome, (req, res) => {
			const dados = { tela: 'politica_privacidade' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })

		app.get('/termos_uso', redirectHome, (req, res) => { 
			const dados = { tela: 'termos_uso' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })

		app.get('/home', redirectLogin, async (req, res) => { 

			// Aqui ou tá logado ou não está.
			// Se tá, pode mandar o id_usuario. Se não está, aí manda que não tá.
			// Não precisa comunicar com o servidor por POST depois, para saber se tá logado.

			const id_usuario = (req.session.userId) ? req.session.userId : 'nao_logado'
			const avatar_50 = (req.session.avatar_50) ? req.session.avatar_50 : 'sem_avatar'


			let modo_tela = 'diurno'
			let nome = ''

			if (id_usuario != 'nao_logado') {
				const usuario = await acesso.busca_usuario(id_usuario)
				nome = usuario.nome
				modo_tela = usuario.configuracoes[0].modo_tela
			}

		  const dados = { tela: 'home', nome: nome, id_usuario: id_usuario, avatar_50: avatar_50, modo_tela: modo_tela }
		  res.render('index', { 'dados': JSON.stringify(dados) })
	  })

		app.get('/decoreba_jogo', redirectLogin, async (req, res) => { 	 

			// Está voltando para a home, aqui do jogo.
			const dados = { tela: 'home' }	  
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })
		
		app.get('/decoreba_mostra', redirectLogin, async (req, res) => { 
			const dados = { tela: 'home' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })

		// Talvez não esteja usando esse teste_jogo
		app.get('/teste_jogo', (req, res) => { 
			const dados = { tela: 'teste_jogo' }
		  res.render('index', { 'dados': JSON.stringify(dados) })
		})

		app.get('/opcoes', redirectLogin, (req, res) => { 	  
			const dados = { tela: 'opcoes' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })
		
		app.get('/afazeres', (req, res) => { 
			const dados = { tela: 'afazeres' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })
		
		app.get('/testes', (req, res) => { 	  
			const dados = { tela: 'testes' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })
		
		app.get('/decoreba_mostra/:id_decoreba', async (req, res) => { 
			const id_decoreba = req.params.id_decoreba

		  const dekoreba = await acesso.busca_dekoreba(id_decoreba)
		  if (dekoreba) {
		    dados = { tela: 'decoreba_mostra', 'id_decoreba': id_decoreba }
		    res.render('index', { 'dados': JSON.stringify(dados) })
		  }
		  if (!dekoreba) {
		    dados = { tela: '404' }
		    res.render('index', { 'dados': JSON.stringify(dados) })
		  }
	  })

		app.get('/perfil/:id_perfil', redirectLogin, async (req, res) => { 

			if (req.params.id_perfil != 'undefined') {

		    const id_perfil = req.params.id_perfil
		    const usuario = await acesso.busca_usuario(id_perfil)

		    if (usuario) dados = { tela: 'perfil', 'id_perfil': id_perfil }
		    if (!usuario) dados = { tela: 'perfil', 'id_perfil': 'nao_encontrado' }

		    res.render('index', { 'dados': JSON.stringify(dados) })

		  } else {
		    console.log("Ta entrando mó bugadao aqui.")
		  }
	  })

	  app.get('/busca_usuario', redirectLogin, async (req, res) => {
			const dados = { tela: 'busca_usuario' }
	  	res.render('index', { 'dados': JSON.stringify(dados) })
	  })

		app.get('/decoreba_cria/:id_decoreba', redirectLogin, async (req, res) => { 

			const id_decoreba = req.params.id_decoreba

		  let obj_decoreba
		  let msg = ''
		  if (id_decoreba === 'nova') {

		    obj_decoreba = {
		      _id: "nova",
		      titulo: "",
		      idioma_1: "",
		      idioma_2: "",
		      idioma_1_sistemas_escrita: [],
		      idioma_2_sistemas_escrita: [],
		      sistemas_escrita: {
		        idioma_1: [],
		        idioma_2: []
		      },
		      capitulos: [
		        {
		          titulo: "",
		          informacoes: "",
		          vocabulario: []
		        }
		      ],
		      marcacoes: [
		        { marcacao: '' },
		        { marcacao: '' },
		        { marcacao: '' },
		        { marcacao: '' },
		        { marcacao: '' }
		      ]
		    }

		  }

		  if (id_decoreba != 'nova') {

		    const id_valido = mongoose.isValidObjectId(id_decoreba); /* will return true/false */
		    if (id_valido) {

		      const busca_decoreba = await acesso.busca_dekoreba(id_decoreba)
		      if (busca_decoreba) {
		        console.log("achou o id_decoreba digitado")
		        obj_decoreba = busca_decoreba
		      }
		      if (!busca_decoreba) {
		        console.log("Não achou o id_decoreba digitado")
		      }
		    }

		    if (!id_valido) {
		      msg = 'id_nao_valido'
		    }

		  }

		  const dados = { tela: 'decoreba_cria', decoreba: obj_decoreba, msg: msg }
		  res.render('index', { 'dados': JSON.stringify(dados) })
	  })

		app.get('/confirma_cadastro', (req, res) => { oi.confirma_cadastro(req, res) })
		app.get('/altera_senha', jsonParser,(req, res) => { oi.altera_senha_get(req, res) })
	}
}