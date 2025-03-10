require('dotenv').config()
const fs = require('fs-extra')


const acesso = require('../modelos/acesso')
const servicos_especificos = require('./servicos_especificos.js')

module.exports = {

	/* POST */

	// envia_hud_deslogado é utilizado no index, cadastro e login deslogados. 
	envia_hud_deslogado: async (req, res, tela) => {
		// Só volta esse verifica, se enviará algum JSON de localização.
		const verifica = servicos_especificos.verifica_localizacao(req, res)

		if (verifica) {
			try {
				const data = await fs.readFile(verifica, 'utf8')
	      const parsedData = JSON.parse(data)
				const dados = { tela: tela, hud: parsedData }
				res.render('index', { 'dados': JSON.stringify(dados) })
			} catch (err) {
				return res.status(500).json({ error: 'Não foi possível ler o arquivo.' })
			}
		}

		if (!verifica) {
			const dados = { tela: tela }
		  res.render('index', { 'dados': JSON.stringify(dados) })
		}
	},

	envia_frase_post: async function (req, res) {

		const { idioma, frase } = req.body

		const idioma_adaptado_a_llm = servicos_especificos.ajeita_idioma_para_llm(idioma)

	  const resposta = await groq_main(idioma_adaptado_a_llm, frase)

	  // Aqui temos que ajeitar toda a parada.
	  // Primeiro, teríamos que fazer um áudio da frase completa. Muito importante.

	  let cap_curso = {
	  	titulo: "Tradução de frase",
	  	informacoes: "",
	  	tipo: "pra_valer",
	  	vocabulario: []
	  }

	  let cap_praticado = {
	  	id_capitulo: '0',
	  	palavras_liberadas_mult: [],
	  	palavras_liberadas_escr: []
	  }

	  let resp_obj = JSON.parse(resposta)

	  for (let i = 0; i < resp_obj.palavras.length; i++) {
	  	let obj_liberada = {
	  		id_palavra: "",
	  		decorada: "nao",
	  		masterizou: 'nao',
	  		acertos_e_erros: []
	  	}

	  	let obj_voca = {
	  		idioma_1: [{
	  			item: "",
	  			arquivo: "",
	  			sistema_escrita: "latino",
	  			tipo: "palavra"
	  		}],
	  		idioma_2: [{
	  			item: "",
	  			arquivo: "",
	  			sistema_escrita: "latino",
	  			tipo: "palavra"
	  		}]
	  	}

	  	cap_curso.vocabulario.push(obj_voca)

	  	for (let j = 0; j < 2; j++) {

	  		const idioma_simples = servicos_especificos.simplifica_idioma(idioma)

	  		let idioma_da_vez
	  		idioma_da_vez = (j === 0) ? idioma_simples : 'portugues'
	  		
			  const end_pasta = `./public/mp3/${idioma_da_vez}`
				const sigla_som = servicos_especificos.determina_sigla_som(idioma_da_vez)
				const id_randomico = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)

				// lista_mp3.arquivos.push({palavra: palavra, nome_arquivo: id_randomico})

				let vocabulario_recente = cap_curso.vocabulario[cap_curso.vocabulario.length - 1]
				let vocabulario_idioma = (j === 0) ? vocabulario_recente.idioma_1 : vocabulario_recente.idioma_2
				const palavra = (j === 0) ? resp_obj.palavras[i].original : resp_obj.palavras[i].traduzida

				// Atualiza o vocabulario[], que descerá.
				vocabulario_idioma[0].item = palavra
				vocabulario_idioma[0].arquivo = id_randomico

				const palavra_falada = servicos_especificos.tira_aspas(palavra)
				const end_arquivo = `${end_pasta}/${id_randomico}.mp3`

				// Faz e salva o .mp3
				await servicos_especificos.salva_mp3(palavra_falada, sigla_som, end_arquivo)
	  	}

	  	let obj_1 = { orientacao: '1-2', n_acertos_erros: 0 }
	  	let obj_2 = { orientacao: '2-1', n_acertos_erros: 0 }
	  	obj_liberada.acertos_e_erros.push(obj_1)
	  	obj_liberada.acertos_e_erros.push(obj_2)

	  	cap_praticado.palavras_liberadas_mult.push(obj_liberada)
	  	cap_praticado.palavras_liberadas_escr.push(obj_liberada)

	  }

	  // No começo, acho que não precisa ver se a palavra já existe no banco de dados.
	  // Daria para mandar tudo de uma só vez e ver no que dá.
	  // E jogar uma partida com as palavras que forem pra baixo, apênas, depois melhora-se.


	  return res.send({ msg: 'envia_frase__sucesso', obj: resposta, cap_curso: cap_curso, cap_praticado: cap_praticado, idioma: idioma })
	},



}