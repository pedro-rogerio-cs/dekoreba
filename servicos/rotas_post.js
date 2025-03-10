require('dotenv').config()

const fs = require('fs-extra')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const util = require('util')
const multer = require('multer')
const sharp = require('sharp')
const Groq = require("groq-sdk")
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const acesso = require('../modelos/acesso')
const modeloCursos = require('../modelos/modelos').modeloCursos
const modelo_usuarios = require('../modelos/modelos').modelo_usuarios
const modelo_afazer = require('../modelos/modelos').modelo_afazer
const modelo_sugestao = require('../modelos/modelos').modelo_sugestao

const servicos_especificos = require('./servicos_especificos.js')
const regras_verbais = require('./sobre_verbos/regras_verbais.js')
const imprime_pdf = require('./imprime_pdf/funcoes.js')
const oi = require('../regras_negocio/oi.js')
const servicos = require('./regras_negocio.js')

const jsonParser = bodyParser.json()

// As variáveis verbos_todos, letras, regras e modelo_salvar são modificadas na função reinsere_verbos()
// Em cada um dos idioma modificamos elas.
const reinsere_verbos = require('./sobre_verbos/funcoes.js')
let verbos_todos, letras, regras, modelo_salvar // GAMBIARRAAA

// Ajeita o Multer.
const storage = multer.diskStorage({

// Aqui salvamos a imagem inteira, sem alterações.
	destination: function (req, file, cb) {
		cb(null, './public/imagens/avatares/temporarios/qualquer_tamanho')
	},
	filename: function (req, file, cb) {
		const extensao = file.mimetype.slice(6, file.mimetype.length);
		cb(null, file.fieldname + '-' + Date.now() + '.' + extensao)
	}
})

const upload = multer({ storage: storage })

module.exports = {

	rotas: async (app) => {

		app.post('/login', jsonParser, (req, res) => { oi.login(req, res) })
		app.post('/esqueceu_senha', jsonParser, (req, res) => { oi.esqueceu_senha(email, req, res) })
		app.post('/cadastro', jsonParser, (req, res) => { oi.cadastro(req, res) })
		app.post('/troca_email', jsonParser, (req, res) => { oi.troca_email(req, res) })
		app.post('/reenvia_token', (req, res) => { oi.reenvia_token(req, res) })
		app.post('/solicita_troca_senha', jsonParser, (req, res) => { oi.solicita_troca_senha(req, res) })
		app.post('/altera_senha', jsonParser, (req, res) => { oi.altera_senha_post(req, res) })

		app.post('/home', async (req, res) => { 


	    // const mainDomain = `https://dekoreba.local:3004/home`;
	    // res.redirect(301, mainDomain); // 301 = redirecionamento permanente
	    
			let id_usuario = req.session.userId
			if (req.session.userId) {

				// Aqui, temos que redirecionar o endereço para o www.
				const usuario = await acesso.busca_usuario(id_usuario)

				const modo_tela = usuario.configuracoes[0].modo_tela
				const dados = { usuario: usuario, id_usuario: id_usuario, modo_tela: modo_tela }

				res.send({ usuario: usuario })

			 	// Esse if serve só para o primeiro acesso do usuário, para mostrar a tela de 
			 	// teste, para ele eliminar da lista palavras que já previamente sabe.
				if (usuario.primeiro_acesso === true) {
					usuario.primeiro_acesso = false
					await usuario.save()
				}

				return
			} if (!req.session.userId) {

				// console.log(">>> Redirecionando ao Index.")

				const hud = await acesso.busca_hud("Português", "home")

				const dados = { tela: 'index', hud: hud }
				res.render('index', { 'dados': JSON.stringify(dados) })
			}
		})

		app.post('/perfil', jsonParser, async (req, res) => { 

			const id_perfil = req.body.id_perfil
			console.log("esse é o id que ta vinnno")
			console.log(id_perfil)

			const isNotEmpty = (obj) => {
				return Object.keys(obj).length !== 0;
			}

			const perfil_propriedade = (id_perfil === req.session.userId) ? 'proprio' : 'alheio'

		  /// Duplicando a busca. Bem desnecessário.
			const usuario_proprio = await acesso.busca_usuario(req.session.userId)
			const usuario = await acesso.busca_usuario(id_perfil)

		  // Aqui tá buscando todas as dekorebas. Na verdade era para buscar apenas algumas informações.
		  // Realmente, buscar tudo é ridículo.
			const todas_decorebas_campos = await acesso.busca_todas_dekorebas_campos('_id titulo qtd_palavras imagem_fundo cor cor_letras')

			const decorebas_proprias = (usuario.decorebas_proprias.length) ? await acesso.busca_dekorebas(usuario.decorebas_proprias) : {}

			let seguidores = {}
			let seguidos = {}

			if (usuario.perfis_seguidores) {
				const ids_seguidores = usuario.perfis_seguidores.map( (valor) => { return valor.id_perfil } )
				seguidores = await acesso.busca_seguidores(ids_seguidores)
			}

			if (usuario.perfis_seguidos) {
				const ids_seguidos = usuario.perfis_seguidos.map( (valor) => { return valor.id_perfil } )
				seguidos = await acesso.busca_seguidores(ids_seguidos)
			}

			console.log("vai mandar tudo pra baixo")

			for (let i = 0; i < todas_decorebas_campos.length; i++) {
				console.log(todas_decorebas_campos[i].titulo)
			}

			return res.send({ msg: 'perfil__sucesso', usuario: usuario, decorebas_proprias: decorebas_proprias, perfil_propriedade: perfil_propriedade, usuario_proprio: usuario_proprio, seguidores: seguidores, seguidos: seguidos, dados_decs: todas_decorebas_campos })
		})


		app.post('/seguir', jsonParser, async (req, res) => { 

			const id_perfil = req.body.id_perfil

			let usuario = await acesso.busca_usuario(req.session.userId)
			let usuario_visitado = await acesso.busca_usuario(id_perfil)

			if (usuario.perfis_seguidos.length) {

		  	// Faz-se uma array com os perfis que o usuário já segue, mas sem o perfil do visitado.
		  	// Se esta array nova for igual à antiga, quer dizer o que o usuário está seguindo o visitado.
		  	// Se for diferente (menor) é pq o usuário já seguia o visitado, logo, está desseguindo-o.

				const perfis_seguidos = usuario.perfis_seguidos.map( valor => {
					if (valor.id_perfil != id_perfil) return valor
		  	}).filter(Boolean) // esse filter(Boolean) remove os valores undefined

				const acao = (perfis_seguidos.length === usuario.perfis_seguidos.length) ? 'seguir' : 'desseguir'

				if (acao === 'desseguir') {
					usuario.perfis_seguidos = perfis_seguidos
					await acesso.salva_usuario(usuario)

					const perfis_seguidores = usuario_visitado.perfis_seguidores.map( valor => {
						if (valor.id_perfil != req.session.userId) return valor
					}).filter(Boolean)

					usuario_visitado.perfis_seguidores = perfis_seguidos
					await acesso.salva_usuario(usuario_visitado)

					const n_seguidores = usuario_visitado.perfis_seguidores.length

					return res.send({ msg: 'seguir__sucesso', acao: "desseguir", n_seguidores: n_seguidores })
				}
			}

			usuario.perfis_seguidos.push({ id_perfil: id_perfil })
			await acesso.salva_usuario(usuario)

			usuario_visitado.perfis_seguidores.push({ id_perfil: usuario._id })
			await acesso.salva_usuario(usuario_visitado)
			
			const n_seguidores = usuario_visitado.perfis_seguidores.length

			return res.send({ msg: 'seguir__sucesso', acao: "seguir", n_seguidores: n_seguidores })
		})

		app.post('/decoreba_cria', jsonParser, async (req, res) => { 

			const usuario = await acesso.busca_usuario(req.session.userId)

			let ids_deks_proprias = []
			for (let i = 0; i < usuario.decorebas_proprias.length; i++) {
				ids_deks_proprias.push({_id: usuario.decorebas_proprias[i].id_decoreba})
			}

			let decorebas_proprias = {}
			if (usuario.decorebas_proprias.length) {
				decorebas_proprias = await acesso.busca_dekorebas(ids_deks_proprias)
			}

			console.log("demolay")
			return res.send({ msg: 'decoreba_cria__puxa', decorebas_proprias: decorebas_proprias })
		})
		
		app.post('/decoreba_deleta', jsonParser, async (req, res) => { 

			const id_decoreba = req.body.id_decoreba

			if (id_decoreba != 'nova') await acesso.deleta_dekoreba(id_decoreba)

		  // Não apagamos nenhum .mp3
		  // Devemos fazer algo a respeito mas ainda não sei bem.
		  // Talvez dizer ao sistema que essa palavra não está mais sendo usada por esta dekoreba e,
		  // se em um mes por exemplo, ninguem cadastrar ou mesmo usar o .mp3 da palavra em algum jogo,
		  // o sistema deletaria e só gravaria denovo caso alguém fosse usar ou cadastrar ela novamente.

		  // Mas uma coisa é certa, se o cara curtiu uma dekoreba que foi deletada, algo deve ser feito.

				return res.send({ msg: 'decoreba_deleta__sucesso', id_usuario: req.session.userId })
		})
		
		app.post('/decoreba_salva', jsonParser, async (req, res) => { 

			const { id_decoreba, idioma_1, idioma_1_sistemas_escrita, idioma_2_sistemas_escrita, idioma_1_sigla_som, idioma_2, idioma_2_sigla_som, sistemas_escrita, titulo, capitulos, marcacoes, cor, cor_letras, mexidos } = req.body

			const id_usuario = req.session.userId
			const usuario = await acesso.busca_usuario(id_usuario)

			await servicos_especificos.cria_as_primeiras_listas () // Checa se tem listas_mp3. Se tem, blz, se não tem, cria uma para cada idioma suportado.

			let cap_num = (capitulos[0].tipo === 'verbos') ? 1 : 0

			const i_1 = servicos_especificos.acha_alfabeto_principal(idioma_1, capitulos[cap_num].vocabulario[0].idioma_1)
			const i_2 = servicos_especificos.acha_alfabeto_principal(idioma_2, capitulos[cap_num].vocabulario[0].idioma_2)

		  // Na versão simples do idioma, tiramos os acentos e as letras maiúsculas para ficar melhor no endereço das pastas.
			const idioma_1_simples = servicos_especificos.ajeita_idioma_pasta_mp3(idioma_1)
			const idioma_2_simples = servicos_especificos.ajeita_idioma_pasta_mp3(idioma_2)

			const end_pasta_idi_1 = `./public/mp3/${idioma_1_simples}`
			const end_pasta_idi_2 = `./public/mp3/${idioma_2_simples}`

			let lista_mp3_1 = await acesso.busca_lista_mp3(idioma_1_simples)
			let lista_mp3_2 = await acesso.busca_lista_mp3(idioma_2_simples)

			if (!id_decoreba || id_decoreba == 'nova') {

				console.log('Salvará uma dekoreba nova.')

		  	// Agora é só excluir os ids com _recente, dos capitulos e das dekorebas
		    // Esses deletes aqui do for abaixo é uma gambiarra que só existe por mal tratamento do capitulos no frontend.

				for (let i = 0; i < capitulos.length; i++) {
					if (capitulos[i]._id == "") delete capitulos[i]._id
						if (capitulos[i]._id) {
							if (capitulos[i]._id.includes("recem_criado_")) {
								delete capitulos[i]._id
							}
						}

						for (let j = 0; j < capitulos[i].vocabulario.length; j++) {

							if (capitulos[i].vocabulario[j]._id) {
								if (capitulos[i].vocabulario[j]._id.includes("recem_criado_")) delete capitulos[i].vocabulario[j]._id
							}

						for (let k = 0; k < capitulos[i].vocabulario[j].idioma_1.length; k++) {
							if (capitulos[i].vocabulario[j].idioma_1[k]._id) {
								if (capitulos[i].vocabulario[j].idioma_1[k]._id.includes("recem_criado_")) {
									delete capitulos[i].vocabulario[j].idioma_1[k]._id
								}
							}	
						}

						for (let k = 0; k < capitulos[i].vocabulario[j].idioma_2.length; k++) {
							if (capitulos[i].vocabulario[j].idioma_2[k]._id) {
								if (capitulos[i].vocabulario[j].idioma_2[k]._id.includes("recem_criado_")) {
									delete capitulos[i].vocabulario[j].idioma_2[k]._id
								}	
							}
						}

					}

				}

				for (let i = 0; i < capitulos.length; i++) {
					for (let j = 0; j < capitulos[i].vocabulario.length; j++) {

						const palavra_1 = capitulos[i].vocabulario[j].idioma_1[i_1].item
						const palavra_1_falada = servicos_especificos.tira_aspas(palavra_1)
						console.log("palavra_1_falada: " + palavra_1_falada)

						const palavra_2 = capitulos[i].vocabulario[j].idioma_2[i_2].item
						const palavra_2_falada = servicos_especificos.tira_aspas(palavra_2)


						console.log("tá vindo por aqui")
						// Isso aqui terá que mudar algum dia pois o sistema não checa se o id randômico recém criado já existe.
						if (lista_mp3_1.arquivos.length) {
							
							// Serve pra não salvar 2 .mp3 com a mesma palavra que tenha descrições diferentes mas grafía e fonética iguais.
							const comparativo_palavras = servicos_especificos.compara_palavra_lista(lista_mp3_1.arquivos, palavra_1_falada)
							
							if (comparativo_palavras.encontrou === 'nao') {
								servicos_especificos.cria_novissimo_elemento(i, j, capitulos, lista_mp3_1, palavra_1, 'idioma_1', i_1, `${end_pasta_idi_1}`, idioma_1_sigla_som)
							}

							if (comparativo_palavras.encontrou === 'sim') {
								capitulos[i].vocabulario[j].idioma_1[i_1].arquivo = `${comparativo_palavras.nome_arquivo}`
							}
							
						}

						if (!lista_mp3_1.arquivos.length) {
							servicos_especificos.cria_novissimo_elemento(i, j, capitulos, lista_mp3_1, palavra_1, 'idioma_1', i_1, `${end_pasta_idi_1}`, idioma_1_sigla_som)
						}


						if (lista_mp3_2.arquivos.length) {

							const comparativo_palavras = servicos_especificos.compara_palavra_lista(lista_mp3_2.arquivos, palavra_2_falada)

							if (comparativo_palavras.encontrou === 'nao') servicos_especificos.cria_novissimo_elemento(i, j, capitulos, lista_mp3_2, palavra_2, 'idioma_2', i_2, `${end_pasta_idi_2}`, idioma_2_sigla_som)

								if (comparativo_palavras.encontrou === 'sim') capitulos[i].vocabulario[j].idioma_2[i_2].arquivo = `${comparativo_palavras.nome_arquivo}`

							}

						if (!lista_mp3_2.arquivos.length) servicos_especificos.cria_novissimo_elemento(i, j, capitulos, lista_mp3_2, palavra_2, 'idioma_2', i_2, `${end_pasta_idi_2}`, idioma_2_sigla_som)

					}
			}

			await acesso.salva_lista_mp3(lista_mp3_1)
			await acesso.salva_lista_mp3(lista_mp3_2)

	    // Criamos o arquivo a ser salvo
			const obj_salva_decoreba = {

				criador_id: id_usuario,

				titulo: titulo,
				idioma_1: idioma_1,
				idioma_1_sigla_som: idioma_1_sigla_som,
				idioma_2: idioma_2,
				idioma_2_sigla_som: idioma_2_sigla_som,
				sistemas_escrita: sistemas_escrita,
				idioma_1_sistemas_escrita: idioma_1_sistemas_escrita,
				idioma_2_sistemas_escrita: idioma_2_sistemas_escrita,
				cor: cor,
				cor_letras: cor_letras,
				estrelas: 0,
				quem_curtiu: [],
				capitulos: capitulos,
				marcacoes: marcacoes
			}

			const dek_salva = await acesso.salva_dekoreba(obj_salva_decoreba)

			usuario.decorebas_proprias.push({ _id: dek_salva.id })
			await usuario.save()
			console.log("Vai salvar a dekoreba pela primeira vez.")

			console.log("Console do mexidos")
	  	console.log(util.inspect(mexidos, false, null, true /* enable colors */))

			return res.send({ msg: 'decoreba_salva__nova_decoreba_salva', id_decoreba: `${dek_salva.id}` })

		}

		else {

			// Primeiro salva a dekoreba, os capitulos que vieram.
			console.log('Iremos atualizar a decoreba.')

	    // Primeiro buscamos a dekoreba no BD, antes dela ser salva com as alterações recém vindas do cliente.
			const decoreba = await modeloCursos.findById(id_decoreba)

	    // Criamos uma arraya nova, para quando alterarmos ela, não mexer na original. Lembrando que não basta copiar a arraya em uma nova variável.
			let decoreba_banco_antes_alteraçoes = JSON.parse(JSON.stringify(decoreba))
			let capitulos_sem_ids_recentes = JSON.parse(JSON.stringify(capitulos))

      // Excluamos os ids com recem_criado__, dos capitulos e das dekorebas
			for (let i = 0; i < capitulos.length; i++) {

      	// Limpa os ids 'recem_criado__' dos capítulos
				if (capitulos[i]._id) {
					if (capitulos[i]._id.includes("recem_criado__")) {
						capitulos_sem_ids_recentes[i].id_recente = capitulos_sem_ids_recentes[i]._id
						delete capitulos_sem_ids_recentes[i]._id
					}
				}

      	// Limpa os ids 'recem_criado__' dos vocabularios
				for (let j = 0; j < capitulos_sem_ids_recentes[i].vocabulario.length; j++) {

					if (capitulos_sem_ids_recentes[i].vocabulario[j]._id) {
						if (capitulos_sem_ids_recentes[i].vocabulario[j]._id.includes("recem_criado__")) {
							capitulos_sem_ids_recentes[i].vocabulario[j].id_recente = capitulos_sem_ids_recentes[i].vocabulario[j]._id
							delete capitulos_sem_ids_recentes[i].vocabulario[j]._id
						}
					}

          // Limpa os ids 'recem_criado__' dos items do idioma_1 e idioma_2
					for (let k = 0; k < capitulos_sem_ids_recentes[i].vocabulario[j].idioma_1.length; k++) {

						if (capitulos_sem_ids_recentes[i].vocabulario[j].idioma_1[k]._id.includes("recem_criado__")) {
							delete capitulos_sem_ids_recentes[i].vocabulario[j].idioma_1[k]._id
						}
					}

					for (let k = 0; k < capitulos_sem_ids_recentes[i].vocabulario[j].idioma_2.length; k++) {

						if (capitulos_sem_ids_recentes[i].vocabulario[j].idioma_2[k]._id.includes("recem_criado__")) {
							delete capitulos_sem_ids_recentes[i].vocabulario[j].idioma_2[k]._id
						}
					}

				}
			}

			for (let i = 0; i < capitulos.length; i++) {
				for (let j = 0; j < capitulos[i].vocabulario.length; j++) {
					for (let k = 0; k < capitulos[i].vocabulario[j].idioma_1.length; k++) {

						let item = capitulos[i].vocabulario[j].idioma_1[k].item
						capitulos_sem_ids_recentes[i].vocabulario[j].idioma_1[k].item = servicos_especificos.bota_aspas(item)
						
					}

					for (let k = 0; k < capitulos[i].vocabulario[j].idioma_2.length; k++) {

						let item = capitulos[i].vocabulario[j].idioma_2[k].item
						capitulos_sem_ids_recentes[i].vocabulario[j].idioma_2[k].item = servicos_especificos.bota_aspas(item)
						
					}
				}
			}

	    // Salva tudo...
			decoreba.titulo = titulo
			decoreba.idioma_1 = idioma_1
			decoreba.idioma_1_sigla_som = idioma_1_sigla_som
			decoreba.idioma_2 = idioma_2
			decoreba.idioma_2_sigla_som = idioma_2_sigla_som
			decoreba.idioma_1_sistemas_escrita = idioma_1_sistemas_escrita
			decoreba.idioma_2_sistemas_escrita = idioma_2_sistemas_escrita
			decoreba.sistemas_escrita = sistemas_escrita
			decoreba.cor = cor
			decoreba.cor_letras = cor_letras
			decoreba.marcacoes = marcacoes

	    decoreba.capitulos = capitulos_sem_ids_recentes // ..., inclusive a arraya que criamos a pouco.

	    const decoreba_atualizada = await acesso.salva_dekoreba(decoreba)

			// Primeiro trocamos os id_capitulos de toda as palavras e outros_termos na arraya mexidos, que está com o 'recente_' pelo id correto, recém salvo da parada. Isso vale para capítulos e palavras contidas na mexidos.
	    for (let i = 0; i < decoreba_atualizada.capitulos.length; i++) {
	    	for (let j = 0; j < mexidos.length; j++) {
	    		if (decoreba_atualizada.capitulos[i].id_recente == mexidos[j].id_capitulo) {
	    			mexidos[j].id_capitulo = '' + decoreba_atualizada.capitulos[i]._id
	    		}
	    	}
	    }


			// Depois fazemos um loop com os itens modificados.
	    for (let i = 0; i < mexidos.length; i++) {

	    	if (mexidos[i].tipo === 'palavra' & mexidos[i].acao === 'modifica') {

	    		if (mexidos[i].id_item.includes("recem_criado_")) {

	    			for (let j = 0; j < decoreba_atualizada.capitulos.length; j++) {
	    				for (let k = 0; k < decoreba_atualizada.capitulos[j].vocabulario.length; k++) {
	    					if (decoreba_atualizada.capitulos[j].vocabulario[k].id_recente === mexidos[i].id_item) {

	    						for (let l = 1; l < 3; l++) {
	    							
	    							const end_pasta_idi = (l === 1) ? end_pasta_idi_1 : end_pasta_idi_2
	    							const idioma_sigla_som = (l === 1) ? idioma_1_sigla_som : idioma_2_sigla_som

	    							const lista_mp3 = (l === 1) ? lista_mp3_1 : lista_mp3_2
	    							const arquivos_lista = (lista_mp3.arquivos) ? lista_mp3.arquivos : lista_mp3

	    							let elm_idioma
	    							if (l === 1) {
	    								elm_idioma = decoreba_atualizada.capitulos[j].vocabulario[k].idioma_1[i_1]
	    							}
	    							if (l === 2) {
	    								elm_idioma = decoreba_atualizada.capitulos[j].vocabulario[k].idioma_2[i_2]
	    							}

	    							const palavra_falada = servicos_especificos.tira_aspas(elm_idioma.item)

	    							const comparativo_palavras = servicos_especificos.compara_palavra_lista(arquivos_lista, palavra_falada)

	    							if (comparativo_palavras.encontrou === 'nao') {

	    								const i_principal = (l === 1) ? i_1 : i_2

	    								servicos_especificos.cria_novissimo_elemento(j, k, decoreba_atualizada.capitulos, lista_mp3, elm_idioma.item, `idioma_${l}`, i_principal, `${end_pasta_idi}`, idioma_sigla_som)
	    							}

	    							if (comparativo_palavras.encontrou === 'sim') {
	    								elm_idioma.arquivo = `${comparativo_palavras.nome_arquivo}`
	    							}


	    						}

	    						
	    					}
	    				}
	    			}
	    		}

	    		if (!mexidos[i].id_item.includes("recem_criado_")) {

	    			// Primeiro verificamos se esta palavra já foi criada anteriormente.
	    			// Se for, só repete o mesmo áudio, se não for, criamos um áudio novo.

	    			for (let j = 0; j < decoreba_atualizada.capitulos.length; j++) {
	    				for (let k = 0; k < decoreba_atualizada.capitulos[j].vocabulario.length; k++) {

	    					for (let l = 1; l < 3; l++) {

	    						let i_col_palavra = (l === 1) ? i_1 : i_2

	    						if (decoreba_atualizada.capitulos[j].vocabulario[k]._id == mexidos[i].id_item) {
	    							console.log("ACHOU A DITA CUJAAA")

		    						// Aqui, achou o item modificado. Magavilha.
		    						// Agora precisa saber, qual é o nome do arquivo novo deste item.

	    							let palavra
	    							if (l === 1) {
	    								palavra = decoreba_atualizada.capitulos[j].vocabulario[k].idioma_1[i_1].item
	    							}
	    							if (l === 2) {
	    								palavra = decoreba_atualizada.capitulos[j].vocabulario[k].idioma_2[i_2].item
	    							}

	    							const end_pasta = (l === 1) ? end_pasta_idi_1 : end_pasta_idi_2
	    							const idioma_sigla_som = (l === 1) ? idioma_1_sigla_som : idioma_2_sigla_som

	    							let lista_mp3 = (l === 1) ? lista_mp3_1 : lista_mp3_2
	    							lista_mp3 = (lista_mp3.arquivos) ? lista_mp3.arquivos : lista_mp3

	    							let item = decoreba_atualizada.capitulos[j].vocabulario[k]
	    							let item_idioma = (l === 1) ? item.idioma_1 : item.idioma_2

	    							let achou_a_palavra = 'nao'
	    							for (let l = 0; l < lista_mp3.length; l++) {
	    								if (lista_mp3[l].palavra == item_idioma[i_col_palavra].item) {

	    									item_idioma[i_col_palavra].arquivo = lista_mp3[l].arquivo
	    									achou_a_palavra = 'sim'
	    								}
	    							}
		    						// aqui precisamos adicionar a palavra na lista e fazer o mp3 e bereréus. 
	    							if (achou_a_palavra === 'nao') {
	    								servicos_especificos.cria_novissimo_elemento(j, k, decoreba_atualizada.capitulos,lista_mp3, palavra, `idioma_${l}`, i_col_palavra, `${end_pasta}`, idioma_sigla_som)
	    							}

	    						}
	    					}

	    					
	    				}
	    			}
	    		}
	    	}
	    }

	    const idioma_1_simples = servicos_especificos.ajeita_idioma_pasta_mp3(idioma_1)
	    const idioma_2_simples = servicos_especificos.ajeita_idioma_pasta_mp3(idioma_2)

	    await acesso.atualiza_lista_mp3(idioma_1_simples, lista_mp3_1)
	    await acesso.atualiza_lista_mp3(idioma_2_simples, lista_mp3_2)

	    // Vamos resalvar a dekoreba somente por causa do campo arquivo do item falado da dekoreba.
	    // Ele também precisa saber qual é o arquivo .mp3 do áudio.
	    await acesso.salva_dekoreba(decoreba_atualizada)

	    return res.send({ msg: 'decoreba_salva__nova_decoreba_salva', id_decoreba: `${decoreba_atualizada.id}` })

	    // Checamos se ela já existe em mp3, pela lista.

	    // Se existe, não fazemos nada.
	    // Se não existe, criamos uma e incrementamos ela na lista.

			// Se alguma palavra foi alterada, deixamos o audio antigo inalterado pois talvez alguma outra dekoreba o use.

			// Vemos se esta palavra nova já foi gravada, se foi, linkamos ela com o audio dela.
			// Se não foi, gravamos ela, simples assim.

			// Se alguma palavra foi criada, vemos se ela ja foi criada por outra pessoa antes, se foi, só linka o arquivo,
			// se não foi, gravamos ela e linkamos com o audio recém criado.

			// Se excluímos alguma palavra, excluímos apenas da dekoreba, não na lista.

			// Só.

	  }


		// Colocar uma validade de um mês. Se em um mês a palavra não for utilizada, deletemo-la.

		// Ao iniciar uma dekoreba, há de se buscar todos os arquivos antes de iniciar o jogo.
		// Se faltar algum, criar. Se não faltar nenhum, carrega tudo e segue o jogo normalmente.

	})

app.post('/decoreba_mostra', jsonParser, async (req, res) => { 

	const { id_decoreba } = req.body

		// Esse if abaixo é meio que uma gambiarra.
		// Ajeita malemalz o roteamento da parada quanto às setas de histórico da parada.

	if (id_decoreba === '60ff07c9e09eb74600e0eeed') {
			// volta pra home
		const dados = { tela: 'home' }
		return res.render('index', { 'dados': JSON.stringify(dados) })
	}

	const dekoreba = await acesso.busca_dekoreba(id_decoreba)

	  const criador = await acesso.busca_usuario(dekoreba.criador_id) // Aqui ta puxando com a senha. Tem que ver isso.
	  const usuario = await acesso.busca_usuario(req.session.userId)

	  return res.send({ item: dekoreba, criador: criador, usuario: usuario })

	})
app.post('/decoreba_jogo', jsonParser, async (req, res) => { 

		// Lê toda a dekoreba.
	const id_decoreba = req.body.id_decoreba

	const decoreba = await acesso.busca_dekoreba(id_decoreba)
	let enderecos_mp3_1 = []
	let enderecos_mp3_2 = []

	const idioma_1_simples = servicos_especificos.ajeita_idioma_pasta_mp3(decoreba.idioma_1)
	const idioma_2_simples = servicos_especificos.ajeita_idioma_pasta_mp3(decoreba.idioma_2)

	let lista_mp3_1 = await acesso.busca_lista_mp3(idioma_1_simples)
	let lista_mp3_2 = await acesso.busca_lista_mp3(idioma_2_simples)

	let palavra_idi_1
	let palavra_idi_2

	  // AVISO, GAMBIARRA ALERT!
	console.log("IWDss: " + id_decoreba)
	  /*
	  if (decoreba.capitulos.length) {
		palavra_idi_1 = decoreba.capitulos[1].vocabulario[0].idioma_1
	  	palavra_idi_2 = decoreba.capitulos[1].vocabulario[0].idioma_2
	  }
	  else {
	  	palavra_idi_1 = decoreba.capitulos[0].vocabulario[0].idioma_1
	  	palavra_idi_2 = decoreba.capitulos[0].vocabulario[0].idioma_2
	  }
	  */

	if (decoreba.capitulos[1]) {
		palavra_idi_1 = decoreba.capitulos[1].vocabulario[0].idioma_1
		palavra_idi_2 = decoreba.capitulos[1].vocabulario[0].idioma_2
	}
	if (!decoreba.capitulos[1]) {
		palavra_idi_1 = decoreba.capitulos[0].vocabulario[0].idioma_1
		palavra_idi_2 = decoreba.capitulos[0].vocabulario[0].idioma_2
	}



	const i_1 = servicos_especificos.acha_alfabeto_principal(decoreba.idioma_1, palavra_idi_1)
	const i_2 = servicos_especificos.acha_alfabeto_principal(decoreba.idioma_2, palavra_idi_2)

	  // Esse for abaixo aqui tá demorando uma eternidade pra carregar em dekorebas maiores.
	  // Tem que ver isso ai.
	for (let i = 0; i < decoreba.capitulos.length; i++) {
	  	// console.log(`${i} de ${decoreba.capitulos.length - 1}`)

		for (let j = 0; j < decoreba.capitulos[i].vocabulario.length; j++) {

			const palavra_1 = decoreba.capitulos[i].vocabulario[j].idioma_1[i_1].item
			const palavra_2 = decoreba.capitulos[i].vocabulario[j].idioma_2[i_2].item



			const arquivo_1 = decoreba.capitulos[i].vocabulario[j].idioma_1[i_1].arquivo
			const arquivo_2 = decoreba.capitulos[i].vocabulario[j].idioma_2[i_2].arquivo

			enderecos_mp3_1.push({ palavra: `${palavra_1}`, endereco: `../mp3/${idioma_1_simples}/${arquivo_1}.mp3` })
			enderecos_mp3_2.push({ palavra: `${palavra_2}`, endereco: `../mp3/${idioma_2_simples}/${arquivo_2}.mp3` })

		   


		      // No final do último item, envia tudo ao cliente.

			if (i == decoreba.capitulos.length - 1 & j == decoreba.capitulos[i].vocabulario.length - 1) {

		        // Retorna pro cliente o endereço de cada MP3, para tocar em momento oportuno.

				return res.send({ msg: 'decoreba_jogo__sucesso', enderecos_mp3_1: enderecos_mp3_1, enderecos_mp3_2: enderecos_mp3_2, idioma_1: `${decoreba.idioma_1}`, idioma_2: `${decoreba.idioma_2}` })
			}


		}
	}


})
app.post('/escolhas_decoreba', jsonParser, async (req, res) => { 


			// Parece que esse modalidade tá vindo mas já tem no escolhas_dek, dá pra tirar pra diminuir o tráfego de dados.
	const { id_decoreba, i_capitulo, modalidade, escolhas_dek } = req.body

	const usuario = await acesso.busca_usuario(req.session.userId)
	const decoreba = await acesso.busca_dekoreba(id_decoreba)
	const cor_decoreba = decoreba.cor


	  // Procura a dekoreba da vez.
	for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {
		if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) {

			i_dec = i
			usuario.decorebas_praticadas[i].escolhas = escolhas_dek
		}
	}

	await acesso.salva_usuario(usuario)

	const cap_curso = decoreba.capitulos[i_capitulo]

	let cap_praticado
	for (let i = 0; i < usuario.decorebas_praticadas[i_dec].caps_praticados.length; i++) {
		if (usuario.decorebas_praticadas[i_dec].caps_praticados[i].id_capitulo == cap_curso._id) {
			cap_praticado = usuario.decorebas_praticadas[i_dec].caps_praticados[i]
		}
	}


	return res.send({ msg: 'escolhas_decoreba__sucesso', cap_praticado: cap_praticado, cap_curso: cap_curso, cor_decoreba: cor_decoreba}) })



app.post('/orientacao_decoreba', jsonParser, async (req, res) => { 

	const { id_decoreba, orientacao } = req.body

	const usuario = await acesso.busca_usuario(req.session.userId)

	  // Se tiver a decoreba praticada o sistema grava a nova distancia recente,
	  // Se não tiver ela como praticada, não faz nada pq o cabra só clicou na parada.
	if (usuario.decorebas_praticadas.length) {

		for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {
			if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) {
				usuario.decorebas_praticadas[i].orientacao_recente = orientacao
			}
		}

	}

	await acesso.salva_usuario(usuario)
	return res.send({ msg: 'orientacao_decoreba__sucesso' })

})
app.post('/distancia_decoreba', jsonParser, async (req, res) => { 


	const { id_decoreba, distancia } = req.body

	const usuario = await acesso.busca_usuario(req.session.userId)

	  // Se tiver a decoreba praticada o sistema grava a nova distancia recente,
	  // Se não tiver ela como praticada, não faz nada pq o cabra só clicou na parada.
	if (usuario.decorebas_praticadas.length) {

		for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {
			if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) {
				usuario.decorebas_praticadas[i].distancia_recente = distancia
			}
		}
	}

	await acesso.salva_usuario(usuario)
	return res.send({ msg: 'distancia_decoreba__sucesso' })


})
app.post('/prepara_teste', jsonParser, async (req, res) => { 

	const { id_decoreba, id_capitulo } = req.body

	const decoreba = await modeloCursos.findById(id_decoreba)

	const titulo = decoreba.titulo

	let i_capitulo = 0
	if (id_capitulo === 'id_capitulo_teste_inicial') {
		i_capitulo = 1
	} else {
		for (let i = 0; i < decoreba.capitulos.length; i++) {
			if (decoreba.capitulos[i]._id == id_capitulo) {
				i_capitulo = i
			}
		}
	}
	const titulo_capitulo = decoreba.capitulos[i_capitulo].titulo

  // Esse id_usuario aqui tá indo o id do primeiro capítulo. Nada ver, preciso ajeitar isso aqui.
	const id_usuario = decoreba.capitulos[i_capitulo]._id

	const idioma_1 = decoreba.idioma_1
	const idioma_2 = decoreba.idioma_2

	const sistemas_escrita_1 = decoreba.idioma_1_sistemas_escrita
	const sistemas_escrita_2 = decoreba.idioma_2_sistemas_escrita

	const capitulos = decoreba.capitulos
	const cor = decoreba.cor
	const cor_letras = decoreba.cor_letras

	return res.send({ msg: 'prepara_teste__sucesso', titulo: titulo, titulo_capitulo: titulo_capitulo, id_usuario: id_usuario, idioma_1: idioma_1, idioma_2: idioma_2, sistemas_escrita_1: sistemas_escrita_1, sistemas_escrita_2: sistemas_escrita_2, capitulos: capitulos, cor: cor, cor_letras: cor_letras, i_capitulo: i_capitulo })
})

app.post('/puxa_capitulo', jsonParser, async (req, res) => { 

	const { id_decoreba, i_capitulo } = req.body

	const decoreba = await acesso.busca_dekoreba(id_decoreba)

	const capitulo = decoreba.capitulos[i_capitulo]

	return res.send({ msg: 'puxa_capitulo__sucesso', capitulo: capitulo })

})


app.post('/encerrar_teste', jsonParser, async (req, res) => { 

	// Aqui nós devemos:
	// 1 - receber a lista_respostas_teste.
	const { lista_respostas_teste, id_decoreba, id_capitulo, titulo_capitulo } = req.body

	console.log(util.inspect(lista_respostas_teste, false, null, true /* enable colors */))

	console.log("ENcerrará o teste")
	const decoreba = await acesso.busca_dekoreba(id_decoreba)
	let qtd_palavras_cap = 0
	let capitulo_curso

	for (let i = 0; i < decoreba.capitulos.length; i++) {
		if (decoreba.capitulos[i]._id == id_capitulo) {
			
			qtd_palavras_cap = decoreba.capitulos[i].vocabulario.length
			capitulo_curso = decoreba.capitulos[i]
		}
	}

	const usuario = await acesso.busca_usuario(req.session.userId)

	// 2 - salvar as palavras dekoradas como decoradas especiais.

	// Achamos o capitulo praticado nos progressos pessoais do próprio usuário.
	// Setamos também o i e o j que iremos usar mais adiante.

	let capitulo
	let qtd_liberadas
	for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {

		if (usuario.decorebas_praticadas[i].id_decoreba === id_decoreba) {

			for (let j = 0; j < usuario.decorebas_praticadas[i].caps_praticados.length; j++) {
				if (usuario.decorebas_praticadas[i].caps_praticados[j].id_capitulo === id_capitulo) {
					capitulo = usuario.decorebas_praticadas[i].caps_praticados[j]
					qtd_liberadas = capitulo.palavras_liberadas_mult.length
				}
			}
		}
	}

	for (let i = 0; i < lista_respostas_teste.length; i++) {

		const resultado = lista_respostas_teste[i].resultado

		// Esse if resultado === 'acertou' aqui é uma baita de uma gambiarra safada.
		// Fiz o código para, não importar se o usuário erre ou acerte a palavra, liberá-la-ia.
		// Porém, se o cara errar as 5, liberará 5 palavras novas, enchendo assim de novas palavras.
		// Agora, se o cara acertou apenas, é que liberará.

		if (resultado === 'acertou') {

			let achou = 'nao'
			let era_masterizada = 'nao' // Se já foi masterizada, algum dia, seja na mult ou escr, quer dizer que essa palavra já liberou alguma outra palavra.

			for (let j = 0; j < capitulo.palavras_liberadas_mult.length; j++) {

				if (lista_respostas_teste[i].id_palavra === capitulo.palavras_liberadas_mult[j].id_palavra) {
					// palavra dekorada já estava liberada. Marquemos-la como decorada.

					achou = 'sim'

					era_masterizada = (capitulo.palavras_liberadas_mult[j].masterizou === 'sim' || capitulo.palavras_liberadas_escr[j].masterizou === 'sim') ? 'sim' : 'nao' 
					
					capitulo.palavras_liberadas_mult[j].decorada = 'sim'
					capitulo.palavras_liberadas_mult[j].masterizou = 'sim'
					capitulo.palavras_liberadas_escr[j].decorada = 'sim'
					capitulo.palavras_liberadas_escr[j].masterizou = 'sim'

				}
			}

			if (achou === 'nao') {
				
				// Não achou, ou seja, palavra ainda não foi liberada.
				// Liberemo-la e marquemo-la como decorada.

				let acertos_e_erros = []

				// GAMBIARRA! Aqui, vamos considerar que haverá apenas um alfabeto, logo, apenas 2 orientações.
				// 1-2 e 2-1
				let orientacoes = ['1-2', '2-1']

				for (let k = 0; k < orientacoes.length; k++) {
					acertos_e_erros.push({ orientacao: orientacoes[k], n_acertos_erros: 4 })
				}

				capitulo.palavras_liberadas_mult.push({
					id_palavra: lista_respostas_teste[i].id_palavra,
					decorada: 'sim',
					masterizou: 'sim',
					acertos_e_erros: acertos_e_erros
				})

				capitulo.palavras_liberadas_escr.push({
					id_palavra: lista_respostas_teste[i].id_palavra,
					decorada: 'sim',
					masterizou: 'sim',
					acertos_e_erros: acertos_e_erros
				})
			}

			// Aqui, se essa palavra ainda não foi masterizada, ou seja, não liberou alguma outra palavra
			// e se há ainda palavras novas há se liberarem, liberemos uma.
			if (qtd_liberadas != qtd_palavras_cap & era_masterizada === 'nao') {


				let ids_cap = [] // Todos os ids de palavras deste capítulo.
				for (let j = 0; j < capitulo_curso.vocabulario.length; j++) {
					ids_cap.push(''+`${capitulo_curso.vocabulario[j]._id}`)
				}

				let ids_liberadas = []
				for (let j = 0; j < liberadas_mult.length; j++) {
					ids_liberadas.push(`${liberadas_mult[j].id_palavra}`)
				}

				const indiceSemRepeticao = servicos_especificos.sortearIndiceSemRepeticao(ids_cap, ids_liberadas)
				
				const id_nova_palavra = capitulo_curso.vocabulario[indiceSemRepeticao]._id

				let acertos_e_erros = []

				// GAMBIARRA! Aqui, vamos considerar que haverá apenas um alfabeto, logo, apenas 2 orientações.
				// 1-2 e 2-1
				let orientacoes = ['1-2', '2-1']

				for (let k = 0; k < orientacoes.length; k++) {
					acertos_e_erros.push({ orientacao: orientacoes[k], n_acertos_erros: 4 })
				}

				liberadas_mult.push({id_palavra: id_nova_palavra, decorada: 'nao', masterizou: 'nao', acertos_e_erros: acertos_e_erros })
				liberadas_escr.push({id_palavra: id_nova_palavra, decorada: 'nao', masterizou: 'nao', acertos_e_erros: acertos_e_erros })

			 	// Preenchemos a arraya que descerá.
				palavras_liberadas.push({
					idioma_1: capitulo_curso.vocabulario[indiceSemRepeticao].idioma_1[0].item,
					idioma_1_mp3: capitulo_curso.vocabulario[indiceSemRepeticao].idioma_1[0].arquivo,
					idioma_2: capitulo_curso.vocabulario[indiceSemRepeticao].idioma_2[0].item,
					idioma_2_mp3: capitulo_curso.vocabulario[indiceSemRepeticao].idioma_2[0].arquivo
				})
			}

		}
	}

	// 3 - Salvemos todo.
	await usuario.save()

	return res.send({ msg: 'encerrar_teste__sucesso', palavras_liberadas: palavras_liberadas })

})

// Esse puxa_quais_capitulos_teste serve apenas para o cliente saber se existem capitulos já totalmente decorados.
// Para não precisar mostrar esses capítulos dentre as opções para o usuário fazer o teste.
// Ou seja, detalhes.

app.post('/puxa_quais_capitulos_teste', jsonParser, async (req, res) => { 

	const id_decoreba = req.body.id_decoreba

	const id_usuario = req.session.userId

	console.log("Ta begaando")
	console.log(`id_decoreba: ${id_decoreba}`)

	const decoreba = await acesso.busca_dekoreba(id_decoreba)
	const usuario = await acesso.busca_usuario(id_usuario)
		let capitulos_para_teste = [] // É essa array que desce pro cliente.

		let decoreba_praticada
		for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {
			if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) {
				decoreba_praticada = usuario.decorebas_praticadas[i]
			}
		}

		let capitulos_comparados = []

		for (let i = 0; i < decoreba.capitulos.length; i++) {
			for (let j = 0; j < decoreba_praticada.caps_praticados.length; j++) {

				if (decoreba_praticada.caps_praticados[j].id_capitulo == decoreba.capitulos[i]._id) {

					const capitulo_da_decoreba = decoreba.capitulos[i]
					const capitulo_praticado = decoreba_praticada.caps_praticados[j]

					capitulos_comparados.push({
						capitulo_da_decoreba: capitulo_da_decoreba,
						capitulo_praticado: capitulo_praticado
					})

					console.log(`Comparação ${decoreba.capitulos[i].titulo}`)

				}
			}
		}


		console.log(`capitulos_comparados.lenf: ${capitulos_comparados.length}`)

		// Por enquantos, todas as palavras serão interpretadas como tendo apenas 1 alfabeto.
		for (let i = 0; i < capitulos_comparados.length; i++) {
			console.log(`comparação n: ${i}`)
			const capitulo_da_decoreba = capitulos_comparados[i].capitulo_da_decoreba
			const capitulo_praticado = capitulos_comparados[i].capitulo_praticado

			let totas_as_palavras_decoradas = 'sim' // Já começa achando que é sim, óia que audácia.

			// Esse for inteiro aqui embaixo serve somente para ver se totas_as_palavras_decoradas continua 'sim'
			// ou então vai pro 'nao'.
			for (let j = 0; j < capitulo_da_decoreba.vocabulario.length; j++) {

				console.log(`vocabu: ${j}`)
				let cont_acertos_erros_mult = 0

				for (let k = 0; k < capitulo_praticado.palavras_liberadas_mult.length; k++) {

					const liberadas_mult = capitulo_praticado.palavras_liberadas_mult

					if (liberadas_mult.id_palavra == capitulo_da_decoreba.vocabulario[j]._id) {
						for (let l = 0; l < liberadas_mult.acertos_e_erros.length; l++) {

							cont_acertos_erros_mult += liberadas_mult.acertos_e_erros[l].n_acertos_erros
							
						}
					}
				}

				let cont_acertos_erros_escr = 0

				for (let k = 0; k < capitulo_praticado.palavras_liberadas_escr.length; k++) {

					const liberadas_escr = capitulo_praticado.palavras_liberadas_escr

					if (liberadas_escr.id_palavra == capitulo_da_decoreba.vocabulario[j]._id) {
						for (let l = 0; l < liberadas_escr.acertos_e_erros.length; l++) {

							cont_acertos_erros_escr += liberadas_escr.acertos_e_erros[l].n_acertos_erros
							
						}
					}
				}

				if ((cont_acertos_erros_mult + cont_acertos_erros_escr) != 8) totas_as_palavras_decoradas = 'nao'
					console.log(`Somatória: ${cont_acertos_erros_mult + cont_acertos_erros_escr}`)
			}


			if (totas_as_palavras_decoradas === 'nao') {
				const obj_capitulo_ainda_nao_decorado = {
					id_capitulo: capitulos_comparados[i].capitulo_da_decoreba._id,
					titulo_capitulo: capitulos_comparados[i].capitulo_da_decoreba.titulo
				}

				capitulos_para_teste.push(obj_capitulo_ainda_nao_decorado)
				console.log(`Titulo, um que vai: ${capitulos_para_teste[capitulos_para_teste.length - 1].id_capitulo}`)
			}
		}



		return res.send({ msg: 'puxa_quais_capitulos_teste__sucesso', capitulos_para_teste: capitulos_para_teste })

	})
app.post('/puxa_dominio_palavras_capitulo', jsonParser, async (req, res) => { 

	const { id_decoreba, id_capitulo, modalidade, orientacao } = req.body

	const usuario = await acesso.busca_usuario(req.session.userId)

		// Podem ter até umas quatro decorebas_praticadas com o mesmo id_decoreba.
		// Uma para cada orientação, isso quando o idioma tem até dois alfabetos.
		// Acho que dá para medir o domínio de uma mesma palavra no mesmo idioma, independente do tanto de alfabetos que o idioma possua.

		// Primeiramente criamos uma lista com o endereço dos áudios para cada um dos dois idiomas.

	const decoreba = await acesso.busca_dekoreba(id_decoreba)

	let enderecos_mp3_1 = []
	let enderecos_mp3_2 = []

	const idioma_1_simples = servicos_especificos.ajeita_idioma_pasta_mp3(decoreba.idioma_1)
	const idioma_2_simples = servicos_especificos.ajeita_idioma_pasta_mp3(decoreba.idioma_2)

	let lista_mp3_1 = await acesso.busca_lista_mp3(idioma_1_simples)
	let lista_mp3_2 = await acesso.busca_lista_mp3(idioma_2_simples)

	let palavra_idi_1
	let palavra_idi_2

	  // AVISO, GAMBIARRA ALERT, POIS O PRIMEIRO CAPÍTULO AINDA É O VERBO, ENTONCES VEJEMOS COMO PROCEDEREMOS!
	if (decoreba.capitulos[1]) {
		palavra_idi_1 = decoreba.capitulos[1].vocabulario[0].idioma_1
		palavra_idi_2 = decoreba.capitulos[1].vocabulario[0].idioma_2
	}
	if (!decoreba.capitulos[1]) {
		palavra_idi_1 = decoreba.capitulos[0].vocabulario[0].idioma_1
		palavra_idi_2 = decoreba.capitulos[0].vocabulario[0].idioma_2
	}

	const i_1 = servicos_especificos.acha_alfabeto_principal(decoreba.idioma_1, palavra_idi_1)
	const i_2 = servicos_especificos.acha_alfabeto_principal(decoreba.idioma_2, palavra_idi_2)

	  // Esse for abaixo aqui tá demorando uma eternidade pra carregar em dekorebas maiores.
	  // Tem que ver isso ai.
	for (let i = 0; i < decoreba.capitulos.length; i++) {
		console.log(`${i} de ${decoreba.capitulos.length - 1}`)

		if (decoreba.capitulos[i]._id == id_capitulo) {
			for (let j = 0; j < decoreba.capitulos[i].vocabulario.length; j++) {

				const palavra_1 = decoreba.capitulos[i].vocabulario[j].idioma_1[i_1].item
				const palavra_2 = decoreba.capitulos[i].vocabulario[j].idioma_2[i_2].item

				const arquivo_1 = decoreba.capitulos[i].vocabulario[j].idioma_1[i_1].arquivo
				const arquivo_2 = decoreba.capitulos[i].vocabulario[j].idioma_2[i_2].arquivo

				enderecos_mp3_1.push({ palavra: `${palavra_1}`, endereco: `../mp3/${idioma_1_simples}/${arquivo_1}.mp3` })
				enderecos_mp3_2.push({ palavra: `${palavra_2}`, endereco: `../mp3/${idioma_2_simples}/${arquivo_2}.mp3` })

			}
		}
	}

	console.log(orientacao)
		// console.log("lenf 1: " + enderecos_mp3_1[4].endereco)
	let orientacao_corrigida = orientacao.replace("_", "-")
	console.log("puxa_dominio_palavras_capitulo_post()")

	let obj_mult_vai = []
	let obj_escr_vai = []

	if (usuario.decorebas_praticadas.length) {

		for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {

	    	// Se o camarada já praticou esta dekoreba em questã.
			if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) {

				console.log("achou a dekoreba")

	      	// Aqui embaixo pode ter 4 tipos da mesma dekorebca.

				let cap_praticados = (modalidade == 'mult_esc') ? usuario.decorebas_praticadas[i].cap_praticados_mult : usuario.decorebas_praticadas[i].cap_praticados_escr

				if (cap_praticados.length) {

					for (let j = 0; j < cap_praticados.length; j++) {
						console.log(`${cap_praticados[j].orientacao}  ${orientacao}`)
						if (cap_praticados[j].id_capitulo == id_capitulo & cap_praticados[j].orientacao == orientacao_corrigida) {

							if (modalidade == 'mult_esc') {
								obj_mult_vai.push({orientacao: orientacao_corrigida, dominio_palavras: cap_praticados[j].dominio_palavras})
							}
							if (modalidade == 'escrita') {
								obj_escr_vai.push({orientacao: orientacao_corrigida, dominio_palavras: cap_praticados[j].dominio_palavras})
							}
						}
					}
				}
			}
		}
	}

	  // console.log(util.inspect(obj_mult_vai, false, null, true /* enable colors */))

	return res.send({ msg: 'puxa_dominio_palavras_capitulo__sucesso', obj_mult_vai: obj_mult_vai, obj_escr_vai: obj_escr_vai, enderecos_mp3_1: enderecos_mp3_1, enderecos_mp3_2: enderecos_mp3_2, cor: decoreba.cor })

})

app.post('/buscar_usuario', jsonParser, async (req, res) => {
	
	console.log("Buscar_usuario:::::::::::::::::::")
	const { input, pagina } = req.body

	function validarNome(nome) {
	  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
	    throw new Error('Nome inválido');
	  }
	  return nome.trim();
	}


	async function buscarUsuarios(nome, page = 1, limit = 4) {
	  try {
	    const regex = new RegExp(nome, 'i');
	    const skip = (page - 1) * limit;

	    const [usuarios, total] = await Promise.all([
	      modelo_usuarios.find({ nome: regex }).skip(skip).limit(limit).exec(),
	      modelo_usuarios.countDocuments({ nome: regex }), // Conta o total de resultados sem limitar
	    ]);

	    return {
	      usuarios,
	      total, // Total de documentos encontrados
	      page,
	      totalPages: Math.ceil(total / limit),
	    };
	  } catch (err) {
	    console.error('Erro ao buscar usuários:', err);
	    throw new Error('Erro interno');
	  }
	}


	try {
		console.log(input)
    const nome = validarNome(input);
    // const usuarios = await buscarUsuarios(nome);

    const resultado = await buscarUsuarios(nome, pagina, 4);
   

    return res.send({ msg: 'buscar_usuario__sucesso', usuarios: resultado.usuarios, qtd_total_resultados: resultado.total, pagina: resultado.page, total_paginas: resultado.totalPages, nome_buscado: input })

  } catch (err) {
    res.status(400).json({ error: err.message });
  }

})

app.post('/atualiza_pontos', jsonParser, async (req, res) => { 


	// Quando a palavra chega em 16 acertos totais, ela está dekorada.
	// Por enquanto, uma vez dekorada, a palavra não poderá mais ser esquecida.
	// Ou seja, uma vez dekorada as pontuações negativas não serão levadas mais em conta.
	// Isso terá que mudar, pois se o cabra errar uma palavra dekorada, é necessário que ele retreine ela.

	console.log("atualiza_pontos_post::::::::::::::::")
	const { id_decoreba, id_capitulo, modalidade, dominadas_vai, palavras } = req.body
	// Parece que o dominadas_vai não existe mais. Agora, só o palavras que funciona. Parece.


	let usuario = await acesso.busca_usuario(req.session.userId)
	const decoreba = await acesso.busca_dekoreba(id_decoreba)

	let i_dec = 0
	for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {
		if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) i_dec = i
	}

	let i_cap = 0
	for (let i = 0; i < usuario.decorebas_praticadas[i_dec].caps_praticados.length; i++) {
		if (usuario.decorebas_praticadas[i_dec].caps_praticados[i].id_capitulo == id_capitulo) i_cap = i
	}

	let cap_praticado = usuario.decorebas_praticadas[i_dec].caps_praticados[i_cap]

	// Coloca os palavras_liberadas_mult e palavras_liberadas_escr em lets, para facilitar as paradaish.
	let prat_palavras_liberadas
	let prat_palavras_liberadas_outra

	if (modalidade === 'multipla_escolha') {
		prat_palavras_liberadas = cap_praticado.palavras_liberadas_mult
		prat_palavras_liberadas_outra = cap_praticado.palavras_liberadas_escr
	}

	if (modalidade === 'escrita') {
		prat_palavras_liberadas = cap_praticado.palavras_liberadas_escr
		prat_palavras_liberadas_outra = cap_praticado.palavras_liberadas_mult
	}

	let capitulo
	for (let i = 0; i < decoreba.capitulos.length; i++) {
		if (decoreba.capitulos[i]._id == id_capitulo) capitulo = decoreba.capitulos[i]
	}
	
	const qtd_palavras_cap_curso = capitulo.vocabulario.length

	// praticou = 'sim' apenas na primeira jogada de cada dekoreba. Pra constar no perfil.
	if (usuario.decorebas_praticadas[i_dec].praticou === 'nao') usuario.decorebas_praticadas[i_dec].praticou = 'sim'
			

	// Faz um looping manoahh, sacou?
	for (let i = 0; i < palavras.length; i++) {

		// Se, na prova, acertou uma que já está liberada, decora ela.
		// Se, na prova, acertou uma que não está liberada, liberamos ela e decoramos ela.
		if (palavras[i].situacao_teste === 'testada_e_acertou') {

			let encontrou = 'nao'

			for (let j = 0; j < prat_palavras_liberadas.length; j++) {
				if (palavras[i].id_palavra === prat_palavras_liberadas[j].id_palavra) {

					console.log(`1 // ${cap_praticado.qtd_masterizadas_mult}`)
					if (cap_praticado.palavras_liberadas_mult[j].masterizou === 'nao') cap_praticado.qtd_masterizadas_mult++
					if (cap_praticado.palavras_liberadas_escr[j].masterizou === 'nao') cap_praticado.qtd_masterizadas_escr++

					encontrou = 'sim'
					prat_palavras_liberadas[j].liberada = 'sim'
					prat_palavras_liberadas[j].masterizou = 'sim'
					prat_palavras_liberadas[j].decorada = 'sim'

					prat_palavras_liberadas_outra[j].liberada = 'sim'
					prat_palavras_liberadas_outra[j].masterizou = 'sim'
					prat_palavras_liberadas_outra[j].decorada = 'sim'	

					for (let k = 0; k < prat_palavras_liberadas[j].acertos_e_erros.length; k++) {

						prat_palavras_liberadas[j].acertos_e_erros[k].n_acertos_erros = 4
						prat_palavras_liberadas_outra[j].acertos_e_erros[k].n_acertos_erros = 4
					}
				}
			}

			if (encontrou === 'nao') {
									console.log(`2 // ${cap_praticado.qtd_masterizadas_mult}`)

				cap_praticado.qtd_masterizadas_mult++
				cap_praticado.qtd_masterizadas_escr++

				let acertos_e_erros = []

				for (let k = 0; k < palavras[i].pontuacoes.length; k++) {
					acertos_e_erros.push({ orientacao: palavras[i].pontuacoes[k].orientacao, n_acertos_erros: 4 })
				}

				prat_palavras_liberadas.push({
					id_palavra: palavras[i].id_palavra,
					decorada: 'sim',
					masterizou: 'sim',
					acertos_e_erros: acertos_e_erros
				})

				prat_palavras_liberadas_outra.push({
					id_palavra: palavras[i].id_palavra,
					decorada: 'sim',
					masterizou: 'sim',
					acertos_e_erros: acertos_e_erros
				})
			}

			// Aqui, temos que liberar alguma palavra, quando o camarada acerta uma palavra que já tenha sido liberada.

			if (encontrou === 'sim') {

				/* ---------------------------------------------------------------------------- */

				// Aqui, o masterizou importa bastante.
				// Deve haver sempre, 5 palavras a mais, para a quantidade de palavras masterizadas. Ex:
				// 15 palavras liberadas, 10 masterizadas e 5 não masterizadas.
				// 20 palavras liberadas, 15 masterizadas e 5 não masterizadas.

				// A não ser quando já se tenham liberado todas as palavras do capítulo. Ex:
				// Capítulo de 30 palavras. 26 palavras masterizadas e 4 não masterizadas.
				// Capítulo de 30 palavras. 29 palavras masterizadas e 1 não masterizada.

				/* ---------------------------------------------------------------------------- */


				// Primeiramente, precisamos saber se vai liberar alguma palavra nova.
				// qtd_palavras_cap_curso
				const qtd_liberadas = prat_palavras_liberadas.length
				
				/*
				let qtd_masterizadas = 0
				let qtd_nao_masterizadas = 0

				for (let j = 0; j < qtd_liberadas; j++) {
					if (prat_palavras_liberadas[j].masterizou === 'sim') qtd_masterizadas++
					if (prat_palavras_liberadas[j].masterizou === 'nao') qtd_nao_masterizadas++
				}
				*/


				function escolherElementoAleatorioUnico(arrayOrigem, arrayExcluidos) {
				  // 1. Cria uma cópia do array de origem para não alterá-lo
				  const elementosDisponiveis = [...arrayOrigem];

				  // 2. Remove os elementos do arrayExcluidos da cópia
				  for (const elementoExcluido of arrayExcluidos) {
				    const index = elementosDisponiveis.indexOf(elementoExcluido);
				    if (index > -1) {
				      elementosDisponiveis.splice(index, 1);
				    }
				  }

				  // 3. Verifica se há elementos disponíveis após a exclusão
				  if (elementosDisponiveis.length === 0) {
				    return null; // ou algum valor indicando que não há elementos válidos
				  }

				  // 4. Escolhe um índice aleatório entre os elementos disponíveis
				  const indiceAleatorio = Math.floor(Math.random() * elementosDisponiveis.length);

				  // 5. Retorna o elemento aleatório
				  return elementosDisponiveis[indiceAleatorio]
				}

				if (qtd_palavras_cap_curso != qtd_liberadas) {
					console.log("Entrou.")
					let ids_cap_curso = []
					let ids_cap_prat = []

					for (let k = 0; k < prat_palavras_liberadas.length; k++) {
						ids_cap_prat.push(""+prat_palavras_liberadas[k].id_palavra)
					}

					for (let k = 0; k < capitulo.vocabulario.length; k++) {
						ids_cap_curso.push(""+capitulo.vocabulario[k]._id)
					}

					const id_sorteado_unico = escolherElementoAleatorioUnico(ids_cap_curso, ids_cap_prat)
					console.log("id_sorteado_unico: " + id_sorteado_unico)

					let acertos_e_erros = []

					for (let k = 0; k < palavras[i].pontuacoes.length; k++) {
						acertos_e_erros.push({ orientacao: palavras[i].pontuacoes[k].orientacao, n_acertos_erros: 0 })
					}

					prat_palavras_liberadas.push({
						id_palavra: id_sorteado_unico,
						decorada: 'nao',
						masterizou: 'nao',
						acertos_e_erros: acertos_e_erros
					})

					prat_palavras_liberadas_outra.push({
						id_palavra: id_sorteado_unico,
						decorada: 'nao',
						masterizou: 'nao',
						acertos_e_erros: acertos_e_erros
					})


				}
			}
		}

		// Se, na prova, errou uma já liberada, zeramos toda a pontuação dela. Radical, chique.
		// Se, na prova, errou uma ainda não liberada, fica elas por elas e não faz nada.
		if (palavras[i].situacao_teste === 'testada_e_errou') {

			console.log("testou e ERROUU!!")
			/* POR ENQUANTO, ESSE DECAIMENTO DO NÍVEL QUANDO SE ERRA NO TESTE ESTÁ DESABILITADO */
			/* Mas funciona perfeitamente. Eu acho. */

			/*
			// Só altera aqui, palavras testadas e já liberadas.
			// Se o camarada testou e errou uma palavra ainda não liberada, deixa ela como está, sem liberar.
			if (palavras[i].liberada === 'sim') {

				for (let j = 0; j < prat_palavras_liberadas.length; j++) {

					if (prat_palavras_liberadas[j].id_palavra == palavras[i].id_palavra) {

						prat_palavras_liberadas[j].decorada = 'nao'
						prat_palavras_liberadas[j].masterizou = 'nao'

						prat_palavras_liberadas_outra[j].decorada = 'nao'	
						prat_palavras_liberadas_outra[j].masterizou = 'nao'

						for (let k = 0; k < prat_palavras_liberadas[j].acertos_e_erros.length; k++) {
							prat_palavras_liberadas[j].acertos_e_erros[k].n_acertos_erros = 0
							prat_palavras_liberadas_outra[j].acertos_e_erros[k].n_acertos_erros = 0
						}
					}
				}
			}
			*/
		}

				// Se, na prova, não chegou a vez dessa palavra e acabou não testando ela.
		if (palavras[i].situacao_teste === 'era_teste_e_nao_testada') {
				// Não faishh nada. Heheee.

		}

		// Se não era uma prova e a palavra estava liberada, adicionamos a pontuação, com erros e acertos nela.
		// Se não era uma prova e a palavra não estava liberada, liberamos ela e adicionamos a pontuação conseguida
		// na rodada que acabou de rolar.
		if (palavras[i].situacao_teste === 'nao_era_teste') {

			// Uma vez masterizada, sempre masterizada, até errar a palavra em um teste. Não sei se tá mto certo isso.
			// Por enquanto, se a palavra foi masterizada, e o cara errou ela depois, diminui a pontuação mas não
			// tira esse masterizou === 'sim' daqui.
			if (palavras[i].masterizou === "nao") {
				
				const qtd_orientacoes = palavras[i].pontuacoes.length
				const limite_max_acertos = 4 * qtd_orientacoes // Só um alfabeto, limite_max_acertos === 8, padrãozão.
				let somatoria_acertos = 0
				for (let j = 0; j < qtd_orientacoes; j++) {
					somatoria_acertos += palavras[i].pontuacoes[j].n_acertos_erros
				}

				if (somatoria_acertos === limite_max_acertos) {
					palavras[i].masterizou = "sim"
										console.log(`3 // ${cap_praticado.qtd_masterizadas_mult}`)

					if (modalidade === 'multipla_escolha') cap_praticado.qtd_masterizadas_mult++
					if (modalidade === 'escrita') cap_praticado.qtd_masterizadas_escr++
				}
				
			}

			// Aqui só marca o decorada como "sim" se, neste momento, tanto mult_esc quanto escrita estiverem com o
			// máximo de acertos possíveis em todas as orientações.

			// Se foi marcada uma vez como decorada, só desdecorará se errar no teste.
			// Não sei se tá certo isso, mas por enquanto está assim mesmo.
			if (palavras[i].decorada === "nao") {

				const qtd_orientacoes = palavras[i].pontuacoes.length
				const limite_max_acertos = 4 * qtd_orientacoes

				let somatoria_acertos = 0
				for (let j = 0; j < qtd_orientacoes; j++) {
					somatoria_acertos += palavras[i].pontuacoes[j].n_acertos_erros
				}


				let somatoria_acertos_outra = 0
				for (let j = 0; j < prat_palavras_liberadas_outra.length; j++) {

					if (prat_palavras_liberadas_outra[j].id_palavra == palavras[i].id_palavra) {
						
						for (let k = 0; k < qtd_orientacoes; k++) {
							somatoria_acertos_outra += prat_palavras_liberadas_outra[j].acertos_e_erros[k].n_acertos_erros
						}
					}
				}

				if (somatoria_acertos + somatoria_acertos_outra === limite_max_acertos * 2) palavras[i].decorada = "sim"
			}


			if (palavras[i].liberada === 'sim') {

				let encontrou = 'nao'
				for (let j = 0; j < prat_palavras_liberadas.length; j++) {

					if (prat_palavras_liberadas[j].id_palavra == palavras[i].id_palavra) {
						encontrou = 'sim'

						prat_palavras_liberadas[j].decorada = palavras[i].decorada
						prat_palavras_liberadas[j].masterizou = palavras[i].masterizou
						prat_palavras_liberadas[j].acertos_e_erros = palavras[i].pontuacoes
					}
				}

				// Aqui, adiciona a palavra novwah, no palavras_liberadas_mult e no palavras_liberadas_escr.
				if (encontrou === 'nao') {

					prat_palavras_liberadas.push({
						id_palavra: palavras[i].id_palavra,
						decorada: palavras[i].decorada, // Sempre vai ser não, pois, pra decorar, precisa passar pelas duas modalidases.
						masterizou: palavras[i].masterizou,
						acertos_e_erros: palavras[i].pontuacoes
					})

					let acertos_e_erros_outra = []
					for (let k = 0; k < palavras[i].pontuacoes.length; k++) {

						acertos_e_erros_outra.push({
							orientacao: palavras[i].pontuacoes[k].orientacao,
							n_acertos_erros: 0
						})
					}

					prat_palavras_liberadas_outra.push({

						id_palavra: palavras[i].id_palavra,
						decorada: 'nao',
						masterizou: 'nao',
						acertos_e_erros: acertos_e_erros_outra
					})

				}			
			}
		}

		

	}

	await usuario.save()

	return res.send({ msg: 'atualiza_pontos__sucesso' })

})
app.post('/curtir_decoreba', jsonParser, async (req, res) => { 

	const { id_decoreba } = req.body

	const decoreba = await acesso.busca_dekoreba(id_decoreba)
	const usuario = await acesso.busca_usuario(req.session.userId)

	if (!usuario) {
		return res.send({ msg: 'curtir_decoreba__deslogado'})
	}

	if (decoreba.quem_curtiu.length) {

		for (let i = 0; i < decoreba.quem_curtiu.length; i++) {
	      // Se achar, então é Descurtir
			if (decoreba.quem_curtiu[i].id_perfil == req.session.userId) {
				console.log("Achou, vai descutrirt na decoreba")
				decoreba.quem_curtiu.splice(i, 1)
				await decoreba.save()

				for (let j = 0; j < usuario.decorebas_curtidas.length; j++) {
					if (usuario.decorebas_curtidas[j].id_decoreba == id_decoreba) {
						console.log("Agora vai descurtir no usuario")
						usuario.decorebas_curtidas.splice(j, 1)
						await usuario.save()

					}
				}

				return res.send({ msg: 'curtir_decoreba__sucesso', acao: 'descurtir' })
			}
		}

	}


	  // Se chegou até aqui é pq não achou o id nas arrays, então não curtiu ainda, logo, é curtir.
	decoreba.quem_curtiu.push({ id_perfil: req.session.userId })
	await acesso.salva_dekoreba(decoreba)

	usuario.decorebas_curtidas.push({ id_decoreba: id_decoreba })
	await acesso.salva_usuario(usuario)

	return res.send({ msg: 'curtir_decoreba__sucesso', acao: 'curtir' })

})
app.post('/explorar', async (req, res) => { servicos.explorar_post(req, res) })
app.post('/listar_verbo', jsonParser, async (req, res) => { 


	const { idioma, letra } = req.body
	console.log(`Idioma: ${idioma} -- Letra: ${letra}`)
	const busca = await acesso.listar_verbo(idioma, letra)
	return res.send({ msg: 'listar_verbo__sucesso', lista: busca })


})

app.post('/buscar_verbo', jsonParser, async (req, res) => { const { idioma, verbo_inf } = req.body
	const busca = await acesso.buscar_verbo(idioma, verbo_inf)
	return res.send({ msg: 'buscar_verbo__sucesso', verbo: busca })
})

app.post('/cria_puxa', jsonParser, async (req, res) => { 
	let usuario = await modelo_usuarios.findById(req.session.userId)
	return res.send({ msg: 'cria_puxa__sucesso', id: usuario._id, avatar_50: usuario.avatar_50 })
})

app.post('/opcoes_puxa', jsonParser, async (req, res) => { 

	const id_usuario = req.session.userId
	let user = await modelo_usuarios.findById(id_usuario)

	if (req.session.userId) {
		req.session.avatar_temporario = user.avatar_arquivo

		return res.send({ msg: 'opcoes_puxa__sucesso', configuracoes: user.configuracoes[0], email: user.login, nome: user.nome, avatar: user.avatar, avatar_50: user.avatar_50, avatar_400: user.avatar_400, _id: user._id })

	}	else {

		const dados = { tela: 'index' }
		return res.render('index', { 'dados': JSON.stringify(dados) })
	}
})


app.post('/troca_avatar', jsonParser, async (req, res, next) => { 
	const nome_arquivo = req.session.avatar_temporario

	// A const endereco_diretorio pega o diretorio que está esse documento regras_negocio.js e retira a pasta /servicos,
	// para acessar a pasta public normalmente.
	const endereco_diretorio = __dirname.replace('/servicos', '')

	// Aqui salvamos a imagem temporária inteira e pesada em uma imagem, também temporária, mas mais leve 400x400.
	await sharp(endereco_diretorio + `/public/imagens/avatares/temporarios/qualquer_tamanho/${nome_arquivo}`)
	.resize({ width: 400, height: 400 })
	.toFile(endereco_diretorio + `/public/imagens/avatares/temporarios/400_400/${nome_arquivo}`)

	  // Essa imagem acima deve permanecer nos arquivos do servidor por, uns, no máximo, cinco minutos.
		// Ela terá que ter um timer para ser deletada pois, o camarada pode sair do sistema antes de
	  // confirmar que essa será a nova imagem de perfil dele.

	// Após isso, podemos apagar a imagem original grandona.
	fs.remove(endereco_diretorio + `/public/imagens/avatares/temporarios/qualquer_tamanho/${nome_arquivo}`)
	.then(() => {
		console.log('Imagem da pasta temporários foi removida com sucesso!');
	})
	.catch(err => {
		console.error('Erro ao remover o arquivo:', err);
	});

  return res.send({ msg: 'troca_avatar__sucesso', nome_arquivo: `${nome_arquivo}` }) // ...enviamos a resposta ao cliente.

})

app.post('/opcoes_salva', jsonParser, async (req, res) => { 

	let { nome, facebook, instagram, youtube, twitter, linkedin, modo_tela, email, distancia } = req.body

	const id_usuario = req.session.userId
	const user = await acesso.busca_usuario(id_usuario)

	const digitos_1_e_2 = id_usuario.substring(0, 2)
	const digitos_3_e_4 = id_usuario.substring(2,4)

	// Primeiramente, tiramos os possíveis .br pois agora tudo as redes sociais usam só o .com ui
	if (facebook.includes("facebook.com.br")) facebook = facebook.replace("facebook.com.br", "facebook.com")
	  // Aqui, a let facebook_corrigido recebe facebook pois, se não contiver "ok.com/", salvamos o facebook inalterado, como o usuário digitou. Se tiver, mudamos seu valor.
		let facebook_corrigido = facebook
	if (facebook.includes(".com/")) {
		const indice = facebook.indexOf(".com/")
		const indice_usuario = indice + 5
		facebook_corrigido = facebook.substring(indice_usuario, facebook.length)
		facebook_corrigido = "https://www.facebook.com/" + facebook_corrigido
	}

	if (instagram.includes("instagram.com.br")) instagram = instagram.replace("instagram.com.br", "instagram.com")
		let instagram_corrigido = instagram
	if (instagram.includes(".com/")) {
		const indice = instagram.indexOf(".com/")
		const indice_usuario = indice + 5
		instagram_corrigido = instagram.substring(indice_usuario, instagram.length)
		instagram_corrigido = "https://www.instagram.com/" + instagram_corrigido
	}

	if (youtube.includes("youtube.com.br")) youtube = youtube.replace("youtube.com.br", "youtube.com")
		let youtube_corrigido = youtube
	if (youtube.includes(".com/")) {
		const indice = youtube.indexOf(".com/")
		const indice_usuario = indice + 13
		youtube_corrigido = youtube.substring(indice_usuario, youtube.length)
		youtube_corrigido = "https://www.youtube.com/channel/" + youtube_corrigido
	}

	if (twitter.includes("twitter.com.br")) twitter = twitter.replace("twitter.com.br", "twitter.com")
		let twitter_corrigido = twitter
	if (twitter.includes(".com/")) {
		const indice = twitter.indexOf(".com/")
		const indice_usuario = indice + 5
		twitter_corrigido = twitter.substring(indice_usuario, twitter.length)
		twitter_corrigido = "https://www.twitter.com/" + twitter_corrigido
	}

	if (linkedin.includes("linkedin.com.br")) linkedin = linkedin.replace("linkedin.com.br", "linkedin.com")
		let linkedin_corrigido = linkedin
	if (linkedin.includes(".com/")) {
		const indice = linkedin.indexOf(".com/")
		const indice_usuario = indice + 8
		linkedin_corrigido = linkedin.substring(indice_usuario, linkedin.length)
		linkedin_corrigido = "https://www.linkedin.com/in/" + linkedin_corrigido
	}

	user.configuracoes[0].facebook = facebook_corrigido
	user.configuracoes[0].instagram = instagram_corrigido
	user.configuracoes[0].youtube = youtube_corrigido
	user.configuracoes[0].twitter = twitter_corrigido
	user.configuracoes[0].linkedin = linkedin_corrigido
	user.configuracoes[0].modo_tela = modo_tela
	user.configuracoes[0].email = email

	user.nome = nome
	user.avatar_arquivo = req.session.avatar_temporario

	user.avatar_50 = `https://${process.env.SERVIDOR_IMG_AVATAR}/imagens/avatares/${digitos_1_e_2}/${digitos_3_e_4}/50_50/${req.session.avatar_temporario}`
	user.avatar_400 = `https://${process.env.SERVIDOR_IMG_AVATAR}/imagens/avatares/${digitos_1_e_2}/${digitos_3_e_4}/400_400/${req.session.avatar_temporario}`

	const endereco_diretorio = __dirname.replace('/servicos', '')

 	// Aqui salvamos as opções, logo...
 	// Se tiver algum arquivo temporário req.session.avatar_temporario estiver na pasta temporária,
 	// Devemos efetivar ele. Se não há nenhum, não tem pq rodar o código de efetivação do avatar.

	const caminhoArquivoTemp = endereco_diretorio + `/public/imagens/avatares/temporarios/400_400/${req.session.avatar_temporario}`

	fs.pathExists(caminhoArquivoTemp)
	.then(async existe => {
		if (existe) {
			console.log('O arquivo existe.');

			// Primeiramente temos que ver se a pasta, com os primeiros dígitos do id do usuário, já foi criada.
			await fs.ensureDir(endereco_diretorio + `/public/imagens/avatares/${digitos_1_e_2}/${digitos_3_e_4}/50_50`)
			await fs.ensureDir(endereco_diretorio + `/public/imagens/avatares/${digitos_1_e_2}/${digitos_3_e_4}/400_400`)

			console.log("Ta aqui embaixo")
		  // Agora, salvamos a imagem temporária, de 400x400 para definitiva em 50x50
			await sharp(endereco_diretorio + `/public/imagens/avatares/temporarios/400_400/${req.session.avatar_temporario}`)
			.resize({ width: 50, height: 50 })
			.toFile(endereco_diretorio + `/public/imagens/avatares/${digitos_1_e_2}/${digitos_3_e_4}/50_50/${req.session.avatar_temporario}`)


	 		// Depois, movemos a imagem 400x400 temporária para a pasta definitiva.

			const caminhoOrigem = endereco_diretorio + `/public/imagens/avatares/temporarios/400_400/${req.session.avatar_temporario}`

			const caminhoDestino = endereco_diretorio + `/public/imagens/avatares/${digitos_1_e_2}/${digitos_3_e_4}/400_400/${req.session.avatar_temporario}`

			fs.move(caminhoOrigem, caminhoDestino).catch(err => {
				console.error('Erro ao copiar o arquivo:', err);
			});

		} else {
			console.log('O arquivo não existe.');
		}
	})
	.catch(err => {
		console.error('Erro ao verificar se o arquivo existe:', err);
	})

	await acesso.salva_usuario(user)
	return res.send({ msg: 'opcoes_salva__sucesso', avatar_arquivo: user.avatar_arquivo, avatar_50: user.avatar_50, avatar_400: user.avatar_400 })
})



app.post('/sugestao', jsonParser, async (req, res) => { 

	const sugestao = req.body.sugestao
	await acesso.salva_sugestao(sugestao)  
	return res.send({ msg: 'sugestao__sucesso' })

})
app.post('/logout', (req, res) => { 

	req.session.destroy(err => {
		if (err) {
	      // return res.redirect('/')
		}

	    // res.clearCookie('sessao')
		res.clearCookie(process.env.SESS_NAME)
		return res.send({ 'msg': 'saiu' })
	}) })



app.post('/prepara_remexe', jsonParser, async (req, res) => { 

	const { id_decoreba, acao } = req.body

	  // Aqui temos que ver de qual dekoreba que se trata o remexe.
	const dekoreba = await acesso.busca_dekoreba(id_decoreba)

	let idioma = servicos_especificos.simplifica_idioma(dekoreba.idioma_1)


	if (acao === 'reinserir_verbos') {

		await servicos_especificos.limpa_mp3_verbos(idioma)

		if (idioma === 'ingles') await reinsere_verbos.ingles()
		if (idioma === 'espanhol') await reinsere_verbos.espanhol()
		if (idioma === 'italiano') await reinsere_verbos.italiano()
		if (idioma === 'portugues') await reinsere_verbos.portugues()
		if (idioma === 'frances') await reinsere_verbos.frances()
	}

	if (acao === 'regravar_som_verbos') {
		await servicos_especificos.regravar_som_verbos(idioma)
	}

	if (acao === 'regravar_som_palavras') {
		await servicos_especificos.regravar_som_palavras(idioma)
	}

	return res.send({ msg: 'prepara_remexe__sucesso' })
})

app.post('/envia_frase', jsonParser, async (req, res) => { servicos.envia_frase_post(req, res) })
app.post('/afazeres', jsonParser, async (req, res) => { 

	if (req.body.acao === 'upa') {
		const { categoria, prioridade, descricao } = req.body

		const afazer = { 
			estado: 'incompleto',
			categoria: categoria,
			prioridade: prioridade,
			descricao, descricao
		}

		await acesso.salva_afazer(afazer)
		return res.send({})
	}

	if (req.body.acao === 'puxa') {
		const afazeres = await modelo_afazer.find()
		return res.send({ acao: 'puxa', afazeres: afazeres }).sort({ data_criacao: -1 })
	}

	if (req.body.acao === 'edita') {
		const { categoria, prioridade, descricao, data_criacao, data_conclusao, estado, _id } = req.body
		console.log("ta vindo aqui.")
		let afazer = await modelo_afazer.findById(_id)

		afazer.categoria = categoria
		afazer.prioridade = prioridade
		afazer.descricao = descricao
		afazer.data_criacao = data_criacao
		afazer.data_conclusao = data_conclusao
		afazer.estado = estado

		afazer.save()

		return res.send({})
	}

	if (req.body.acao === 'deleta') {
		const _id = req.body._id

		const afazer = await modelo_afazer.findOneAndDelete({_id: _id})

		return res.send({})
	} })


	app.post('/gera_pdf_lista', jsonParser, async (req, res) => { imprime_pdf.gera_pdf_lista_post(req, res) })
	app.post('/gera_pdf_verbo', jsonParser, async (req, res) => { imprime_pdf.gera_pdf_verbo_post(req, res) })

	app.post('/avatar_temporario', upload.single('avatar'), (req, res, next) => {

		req.session.avatar_temporario = req.file.filename
		return res.send({ msg: 'avatar_temporario__sucesso', nome_arquivo: `${req.file.filename}`, files: req.files })
	})



	app.post('/cria_frase', jsonParser, async (req, res) => { 

		// 5 a 10 palavras: Frase curta.
		// 11 a 25 palavras: Frase longa.
		// 26 a 50 palavras: Parágrafo.

		/*
			Substantivos: 20% a 30%
			Verbos: 15% a 25%
			Adjetivos: 5% a 15%
			Pronomes: 10% a 20%
			Advérbios: 5% a 10%
			Preposições: 10% a 15%
			Conjunções: 5% a 10%
		*/

		const { id_decoreba, tamanho_frase } = req.body

		const dekoreba = await acesso.busca_dekoreba(id_decoreba)






		function getWordDistribution(totalWords) {
	    const percentageRanges = {
	        pronome: [0.1, 0.2],

	        substantivo: [0.2, 0.3],
	        adjetivo: [0.05, 0.15],

	        verbo: [0.15, 0.25],
	        adverbio: [0.05, 0.1],

	        preposicao: [0.1, 0.15],
	        conjuncao: [0.05, 0.1]
	    };

	    function getRandomInRange(min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    }

	    let distribution = {};
	    let sum = 0;

	    // Distribuir valores iniciais dentro dos percentuais
	    for (let category in percentageRanges) {
	        let [minPercent, maxPercent] = percentageRanges[category];
	        let minWords = Math.floor(totalWords * minPercent);
	        let maxWords = Math.floor(totalWords * maxPercent);
	        distribution[category] = getRandomInRange(minWords, maxWords);
	        sum += distribution[category];
	    }

	    // Ajustar para garantir que a soma seja totalWords
	    let diff = totalWords - sum;
	    let keys = Object.keys(distribution);

	    while (diff !== 0) {
	        let key = keys[Math.floor(Math.random() * keys.length)];
	        let [minPercent, maxPercent] = percentageRanges[key];
	        let minWords = Math.floor(totalWords * minPercent);
	        let maxWords = Math.floor(totalWords * maxPercent);

	        if (diff > 0 && distribution[key] < maxWords) {
	            distribution[key]++;
	            diff--;
	        } else if (diff < 0 && distribution[key] > minWords) {
	            distribution[key]--;
	            diff++;
	        }
	    }

	    return distribution;
	}

	const OLHAAA = getWordDistribution(100)
	console.log(OLHAAA)



		// Aqui, seria bom receber o número de palavras e, de qual capítulo, o camarada deseja praticar.

		// Buscamos as palavras que esse dito cujo já concluiu.
		const id_usuario = req.session.userId
		const usuario = await acesso.busca_usuario(id_usuario)

		const praticadas = usuario.decorebas_praticadas
		let decoreba_praticada

		for (let i = 0; i < praticadas.length; i++) {

			if (praticadas[i].id_decoreba == id_decoreba) {
				console.log("È o msm id")
				decoreba_praticada = praticadas[i]
			}
		}


		// Por enquanto, esse palavras masterizadas vai colocar todos os tipos de palavras possíveis,
		// sejam elas adjetivos, substantivos, partículas, etc.

		let palavras_masterizadas = [] // Essa array conterá objetos com id_capitulo e id_palavra.
		for (let i = 0; i < decoreba_praticada.caps_praticados.length; i++) {

			const cap_praticado = decoreba_praticada.caps_praticados[i]

			if (cap_praticado.tipo === 'pra_valer') {

				for (let j = 0; j < cap_praticado.palavras_liberadas_mult.length; j++) {
					if (cap_praticado.palavras_liberadas_mult[j].masterizou === 'sim') {

						for (let k = 0; k < dekoreba.capitulos.length; k++) {
							
							if (dekoreba.capitulos[k]._id) {
								if (dekoreba.capitulos[k]._id == cap_praticado.id_capitulo) {
									if (dekoreba.capitulos[k].classe === 'substantivo' || dekoreba.capitulos[k].classe === 'adjetivo' || dekoreba.capitulos[k].classe === 'adverbio' || dekoreba.capitulos[k].classe === 'pronome') {

										palavras_masterizadas.push({
											"id_capitulo": cap_praticado.id_capitulo,
											"id_palavra": cap_praticado.palavras_liberadas_mult[j].id_palavra
										})

									}
								}
							}
							
						}
						
					}
				}
			}
		}

		// Agora, sorteamos 3 das palavras aptas à dekoreba.

		function sortearTres(array) {
	    if (array.length < 3) {
	      // throw new Error("A array deve ter pelo menos 3 objetos.");
	      return 'menos_de_3_palavras'
		  }
		    
		  const sorteados = [];
		  const copiaArray = [...array]; // Faz uma cópia da array original

		  while (sorteados.length < 3) {
		    const index = Math.floor(Math.random() * copiaArray.length);
		    sorteados.push(copiaArray.splice(index, 1)[0]); // Remove e adiciona o elemento sorteado
		  }

		  return sorteados;
		}

		const sorteados = sortearTres(palavras_masterizadas)

		// Agora, temos que saber quais são essas palavras, no idioma do usuário.
		if (sorteados === "menos_de_3_palavras") {
			return res.send({ msg: 'cria_frase__menos_tres_palavras' })
		}

		let palavras_idioma_usuario = []
		for (let i = 0; i < sorteados.length; i++) {

			let capitulo
			for (let j = 0; j < dekoreba.capitulos.length; j++) {

				if (sorteados[i].id_capitulo == dekoreba.capitulos[j]._id) {

					capitulo = dekoreba.capitulos[j]
				}
			}

			let palavra
			for (let j = 0; j < capitulo.vocabulario.length; j++) {
				if (capitulo.vocabulario[j]._id == sorteados[i].id_palavra) {
					console.log("Vohriz")
					palavra = capitulo.vocabulario[j]
					console.log(`${palavra.idioma_2[0].item}`)

				}
			}

			palavras_idioma_usuario.push(palavra.idioma_2[0].item)

		}

		// Agora, pedimos para a AI Llama formar uma pequena frase, no idioma do usuário, utilizando as 3
		// palavras contidas na array palavras_idioma_usuario.
		const idioma_adaptado_a_llm = servicos_especificos.ajeita_idioma_para_llm('Português')

		console.log(`${palavras_idioma_usuario[0]}, ${palavras_idioma_usuario[1]} e ${palavras_idioma_usuario[2]}`)
		
		async function main() {
		  const completion = await groq.chat.completions
		    .create({
		      messages: [
		        {
		          role: "user",
		          content: `Tell a small phrase, in brazillian portuguese, with no double nor single quotes, whith the following words: ${palavras_idioma_usuario[0]}, ${palavras_idioma_usuario[1]} e ${palavras_idioma_usuario[2]}.`,
		        },
		      ],
		      model: "llama-3.3-70b-versatile",
		    })
		    .then((chatCompletion) => {
		       console.log(chatCompletion.choices[0]?.message?.content || "");
		      return chatCompletion.choices[0]?.message?.content || ""
		    });

		    return completion
		}

		const frase_portugues = await main()
		console.log(frase_portugues)

		req.session.frase_a_traduzir = frase_portugues

		return res.send({ msg: 'cria_frase__sucesso', frase_portugues: frase_portugues })
	})

	app.post('/analiza_traducao', jsonParser, async (req, res) => {
		const { idioma, traducao } = req.body

		// Primeiramente, identificamos a frase a ser traduzida e a tradução.
		const frase_a_traduzir = req.session.frase_a_traduzir
		const idioma_em_ingles = servicos_especificos.ajeita_idioma_para_llm(idioma)
		console.log("O idioma para traduzir será: " + idioma_em_ingles)
		async function main() {
		  const completion = await groq.chat.completions
		    .create({
		      messages: [
		        {
		          role: "user",
		          content: `Preciso que você me envie somente um JSON. Nada de outras palavras fora desse JSON.
		          Primeiramente, veja se a tradução está correta:
		          	Frase original em português: ${frase_a_traduzir},
		          	A tradução em  ${idioma}: ${traducao}. Agora, me envie somente um JSON, nesse exato formato: 
		          	{
			          	"esta_correto":  "", // "sim" ou "não", apenas isso.
			          	"traducao_correta": "" // Se a tradução estiver errada, me envie a correta. Se a tradução que eu enviei está correta, não me envie nada aqui.
			          	"dicas": "", // Se a tradução que eu enviei estiver errada, me dê dicas de como eu posso melhorar.
			          	}
			          }
		          `
		        },
		      ],
		      model: "llama-3.3-70b-versatile",
		    })
		    .then((chatCompletion) => {
		       // console.log(chatCompletion.choices[0]?.message?.content || "");
		      return chatCompletion.choices[0]?.message?.content || ""
		    });

		    return completion
		}

		const json_da_traducao = await main()
		console.log("json abaixo")
		console.log(json_da_traducao)
		console.log("json acima")


		return res.send({ msg: 'analiza_traducao__sucesso', json_da_traducao: JSON.parse(json_da_traducao) })

	})

	}
}