require('dotenv').config()

const util = require('util')
const gTTS = require('gtts')
const fs = require('fs-extra')
const PDFDocument = require('pdfkit')

const modeloCursos = require('../modelos/modelos').modeloCursos
const modelo_usuarios = require('../modelos/modelos').modelo_usuarios
const modelo_afazer = require('../modelos/modelos').modelo_afazer
const modelo_sugestao = require('../modelos/modelos').modelo_sugestao
const path = require('path')

const acesso = require('../modelos/acesso')

let array_verbos_pt = []

const idioma_insercao = "italiano"

// Dois botões, um reinserir verbos e o outro é refalar palavras.

// Reinserir verbos.
	// Apaga todos os verbos e seus sons.
	// Reinserimos apenas os verbos, sem os sons, embasados na lista de mais populares.
	// Já criamos as pastas para inserir os sons, caso não hajam pastas para os .mp3.

// Regrava som verbos.
	// Apaga todos os sons dos verbos, se tiver algum som e regrava eles.
	
// Regrava som das palavras.
	// Apaga todos os sons das palavras e regrava tudo. Rescrevendo no banco de dados as respectivas referências aos .mp3.
	// Aqui podemos separar os .mp3 em duas pastas: palavras e verbos. Dentro delas, criamos uma pasta para cada letra.

	// Lembrando que aqui teremos a voz padrão, caso o usuário queira gravar as palavras com a voz dele, deveremos criar uma pasta separada para tanto.

const vai_inserir_verbos = 'nao'
const som_verbos_gravar = 'nao'
const vai_corrigir_som_palavras = 'nao' // Essa correção é para palavras que ficaram sem som, NaN.mp3 por exemplo.
const vai_refazer_o_som_das_palavras = 'nao' // Aqui refaz todos os sons de todas as palavras da dekoreba inteira.


const verbos_comuns = require('./sobre_verbos/verbos_comuns').verbos_comuns
const regras_verbais = require('./sobre_verbos/regras_verbais')
const letras_idiomas = require('./sobre_verbos/letras_idiomas').letras_idiomas
const modelos_salvar_verbo = require('./sobre_verbos/modelos_salvar_verbo').modelos_salvar_verbo
const reinsere_verbos = require('./sobre_verbos/funcoes.js')

module.exports = {

	/* GERAL */

	verifica_localizacao: (req, res) => {

		let idioma_json
		// Se não tem, envia o JSON.
		if (req.session.desce_JSON === 'sim') {
			if (req.idioma_interface === 'pt') idioma_json = 'portugues'
			if (req.idioma_interface === 'en') idioma_json = 'ingles'
			if (req.idioma_interface === 'es') idioma_json = 'espanhol'
			if (req.idioma_interface === 'fr') idioma_json = 'frances'
			if (req.idioma_interface === 'it') idioma_json = 'italiano'
			if (req.idioma_interface === 'de') idioma_json = 'alemao'
			if (!req.idioma_interface) idioma_json = 'portugues'

			let jsonPath = path.join(__dirname, `../locales/${idioma_json}.json`)

			return 	jsonPath
		}

		return false
	},

	sortearIndiceSemRepeticao: (primeiraArray, segundaArray) => {

    // Loop para sortear um índice aleatório enquanto o valor correspondente se repetir
    let indice = Math.floor(Math.random() * primeiraArray.length)

    let true_false = (segundaArray[0] === primeiraArray[0]) ? 'true' : 'false'

    let repete = 'nao'
    do {

      repete = 'nao'
      indice = Math.floor(Math.random() * primeiraArray.length)

      for (let i = 0; i < segundaArray.length; i++) {

        if (primeiraArray[indice] == segundaArray[i]) {
          repete = 'sim'
          break
        }
      }
    } while (repete === 'sim')

    return indice
	},

	nova_palavra_orientacoes: (qtd_sistemas_idioma_1, qtd_sistemas_idioma_2) => {

		// Se o idioma tem mais de um alfabeto, agregamos.
		let orientacoes = ['1-2', '2-1']
		if (qtd_sistemas_idioma_1 > 1) orientacoes.push ('1-1')
		if (qtd_sistemas_idioma_2 > 1) orientacoes.push('2-2')

		return orientacoes
	},

	soma_pontos: (ace_err) => {

	  let total_acertos_erros = 0

	  // Antes de mais nada, precisamos saber o quanto falta para a palavra ser dekorada.
	  for (let i = 0; i < ace_err.length; i++) {
	  	total_acertos_erros += ace_err[i].n_acertos_erros
	  }

	  return total_acertos_erros

	},

	acha_idioma_verbos_comuns: (idioma) => {
		for (let i = 0; i < verbos_comuns.length; i++) {
			if (verbos_comuns[i].idioma === idioma) return verbos_comuns[i]
		}
	},



	acha_alfabeto_principal: (idioma, palavra) => {

	  // Aqui rodamos todos os items (cada um em um alfabeto) da primeira palavra do primeiro capítulo.
	  // Assim, descobrimos qual é o i do item no alfabeto principal, para gravar o som com o sutaque correto.
	  // Se não acha o alfabeto principal, vai o primeiro mesmo (o return 0 lá debaixo).
	  // Aqui mora um mistério. No japonês existem 3 alfabetos, fora o latino do romanji, logo, botei o hiragana como principal.

	  for (let i = 0; i < palavra.length; i++) {
	  	if (palavra[i].tipo === 'palavra') {

	  		if (idioma === 'Russo' & palavra[i].sistema_escrita === 'cirilico_russo') return i
		    if (idioma === 'Chinês' & palavra[i].sistema_escrita === 'kanji') return i
		    if (idioma === 'Indiano' & palavra[i].sistema_escrita === 'devanagari') return i
		    if (idioma === 'Coreano' & palavra[i].sistema_escrita === 'hangul') return i
		    if (idioma === 'Árabe' & palavra[i].sistema_escrita === 'arabe') return i
		    if (idioma === 'Grego' & palavra[i].sistema_escrita === 'grego') return i
		    if (idioma === 'Japonês' & palavra[i].sistema_escrita === 'hiragana') return i
	  	}
	  }

		return 0
	},

	// Tá bota, mas é tira
	bota_aspas: (palavra) => {
		console.log(palavra)
		let palavra_sem_aspas = palavra.split('"').join('&quot;')
		palavra_sem_aspas = palavra_sem_aspas.split("'").join('&apos;')
		console.log(palavra_sem_aspas)

		return palavra_sem_aspas
	},

	// Tá tira, mas é bota
	tira_aspas: (palavra) => {

	  // Limpamos as aspas da palavra, caso haja alguma. Assim não teremos problemas com as aspas na hora da fala.
	  let palavra_falada = palavra.split("&quot;").join('"')
	  return palavra_falada = palavra_falada.split("&apos;").join("'")
	},

	salva_mp3: async (palavra_falada, idioma_sigla_som, palavra_endereco) => {
		
		const gtts_1 = new gTTS(`${palavra_falada}`, `${idioma_sigla_som}`)
		await gtts_1.save(`${palavra_endereco}`, async (err, result) => {

			console.log(`${palavra_falada} - ${idioma_sigla_som}`)
	  	if (err) { throw new Error(err) }
	  })
	},

	salva_mp3_verbos: async (palavra_falada, idioma_sigla_som, palavra_endereco) => {
		
	},

	ajeita_idioma_para_llm: (idioma) => {

		if (idioma === 'Alemão') return 'german'
		if (idioma === 'Francês') return 'french'
		if (idioma === 'Italiano') return 'italian'
		if (idioma === 'Espanhol') return 'spanish'
		if (idioma === 'Inglês') return 'english'
		if (idioma === 'Português') return 'portuguese'
	},

	ajeita_idioma_pasta_mp3: (idioma_complexo) => {

		if (idioma_complexo === 'Alemão') return 'alemao'
		if (idioma_complexo === 'Árabe') return 'arabe'
		if (idioma_complexo === 'Catalão') return 'catalao'
		if (idioma_complexo === 'Chinês') return 'chines'
		if (idioma_complexo === 'Coreano') return 'coreano'
		if (idioma_complexo === 'Espanhol') return 'espanhol'
		if (idioma_complexo === 'Esperanto') return 'esperanto'
		if (idioma_complexo === 'Francês') return 'frances'
		if (idioma_complexo === 'Grego') return 'grego'
		if (idioma_complexo === 'Indiano') return 'indiano'
		if (idioma_complexo === 'Inglês') return 'ingles'
		if (idioma_complexo === 'Italiano') return 'italiano'
		if (idioma_complexo === 'Japonês') return 'japones'
		if (idioma_complexo === 'Latim') return 'latim'
		if (idioma_complexo === 'Português') return 'portugues'
		if (idioma_complexo === 'Russo') return 'russo'
	},

	complexiza_idioma: (idioma_simples) => {

		if (idioma_simples === 'alemao') return 'Alemão'
		if (idioma_simples === 'arabe') return 'Árabe'
		if (idioma_simples === 'catalao') return 'Catalão'
		if (idioma_simples === 'chines') return 'Chinês'
		if (idioma_simples === 'coreano') return 'Coreano'
		if (idioma_simples === 'espanhol') return 'Espanhol'
		if (idioma_simples === 'esperanto') return 'Esperanto'
		if (idioma_simples === 'frances') return 'Francês'
		if (idioma_simples === 'grego') return 'Grego'
		if (idioma_simples === 'indiano') return 'Indiano'
		if (idioma_simples === 'ingles') return 'Inglês'
		if (idioma_simples === 'italiano') return 'Italiano'
		if (idioma_simples === 'japones') return 'Japonês'
		if (idioma_simples === 'latim') return 'Latim'
		if (idioma_simples === 'portugues') return 'Português'
		if (idioma_simples === 'russo') return 'Russo'

	},

	compara_palavra_lista: (arquivos_da_lista, palavra) => {

		console.log(`Comparará a palavra ${palavra}`)

		let valor_i = 0
		for (let i = 0; i < arquivos_da_lista.length; i++) {
			console.log(`${arquivos_da_lista[i].palavra} === ${palavra}`)

			if (arquivos_da_lista[i].palavra === palavra) {
				return {encontrou: 'sim', nome_arquivo: arquivos_da_lista[i].nome_arquivo}
			}
			valor_i = i
		}

		return {encontrou: 'nao', valor_i: valor_i}
	},

	ajeita_arquivo_mp3: async (palavra, lista_arquivos, end_pasta, sigla_som) => {
		
		// Compara e vê se tem na lista.
		const comparacao = module.exports.compara_palavra_lista(lista_arquivos, palavra)
		let id_randomico = ''
		
		// Se não tem, criamos um mp3 para ele.
		if (comparacao.encontrou === 'nao') {

			id_randomico = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)			// Random AiDí
			lista_arquivos.push({palavra: palavra, nome_arquivo: id_randomico})			// Inserimos na lista

			// Criamos o .mp3
			const palavra_falada = module.exports.tira_aspas(palavra)
			const end_arquivo = `${end_pasta}/${id_randomico}.mp3`
			await module.exports.salva_mp3(palavra_falada, sigla_som, end_arquivo)
			
		}

		return {lista_arquivos: lista_arquivos, id_randomico: id_randomico}
	},

	converte_tempo_it: (modo, tempo) => {
		let grupo = ''
		if (modo === 'indicativo') {
			if (tempo === 'presente') grupo = 'indicative/present'
			if (tempo === 'passato prossimo') grupo = ''
			if (tempo === 'imperfetto') grupo = 'indicative/imperfect'
			if (tempo === 'trapassato prossimo') grupo = ''
			if (tempo === 'passato remoto') grupo = 'indicative/pasthistoric'
			if (tempo === 'trapassato remoto') grupo = ''
			if (tempo === 'futuro semplice') grupo = 'indicative/future'
			if (tempo === 'futuro anteriore') grupo = ''
		}
		if (modo === 'congiuntivo') {
			if (tempo === 'presente') grupo = 'subjunctive/present'
			if (tempo === 'passato') grupo = ''
			if (tempo === 'imperfetto') grupo = 'subjunctive/imperfect'
			if (tempo === 'trapassato') grupo = ''
		}

		if (modo === 'condizionale') {
			if (tempo === 'presente') grupo = 'conditional/present'
			if (tempo === 'passato') grupo = ''
		}

		if (modo === 'imperativo') {
			if (tempo === 'imperativo') grupo = 'imperative'
		}

		return grupo
	},

	converte_tempo_es: (modo, tempo) => {

		let grupo = ''
		if (modo === 'indicativo') {
			if (tempo === 'presente') grupo = 'indicative/present'
			if (tempo === 'pretérito perfecto compuesto') grupo = ''
			if (tempo === 'pretérito imperfecto') grupo = 'indicative/imperfect'
			if (tempo === 'pretérito pretérito pluscuamperfecto') grupo = ''
			if (tempo === 'pretérito perfecto simple') grupo = 'indicative/preterite'
			if (tempo === 'pretérito anterior') grupo = ''
			if (tempo === 'futuro') grupo = 'indicative/future'
			if (tempo === 'futuro perfecto') grupo = ''
		}
		if (modo === 'condicional') {
			if (tempo === 'simple') grupo = 'indicative/conditional'
			if (tempo === 'compuesto') grupo = ''
		}
		if (modo === 'subjuntivo') {
			if (tempo === 'presente') grupo = 'subjunctive/present'
			if (tempo === 'pretérito perfecto') grupo = ''
			if (tempo === 'pretérito imperfecto 1') grupo = 'subjunctive/imperfect_ra'
			if (tempo === 'pretérito imperfecto 2') grupo = 'subjunctive/imperfect_se'
			if (tempo === 'pretérito pluscuamperfecto 1') grupo = ''
			if (tempo === 'pretérito pluscuamperfecto 2') grupo = ''
			if (tempo === 'futuro') grupo = 'subjunctive/future'
			if (tempo === 'futuro perfecto') grupo = ''
		}
		if (modo === 'imperativo') {
			if (tempo === 'imperativo') grupo = 'imperative/affirmative'
		}

		return grupo
	},

	converte_pessoa_it: (modo, pessoa) => {
		let forma = ''

		if (modo === 'congiuntivo') {
			if (pessoa === 'io') forma = 's1-a'
			if (pessoa === 'tu') forma = 's2-a'
			if (pessoa === 'lui/lei') forma = 's3-a'
			if (pessoa === 'noi') forma = 'p1-a'
			if (pessoa === 'voi') forma = 'p2-a'
			if (pessoa === 'loro') forma = 'p3-a'
		}

		if (modo === 'indicativo' || modo === 'condizionale') {
			if (pessoa === 'io') forma = 's1'
			if (pessoa === 'tu') forma = 's2'
			if (pessoa === 'lui/lei') forma = 's3'
			if (pessoa === 'noi') forma = 'p1'
			if (pessoa === 'voi') forma = 'p2'
			if (pessoa === 'loro') forma = 'p3'
		}

		if (modo === 'imperativo') {
			if (pessoa === 'tu') forma = 's2'
			if (pessoa === 'lui/lei') forma = 's3-b'
			if (pessoa === 'noi') forma = 'p1'
			if (pessoa === 'voi') forma = 'p2'
			if (pessoa === 'loro') forma = 'p3-b'
		}

		return forma
	},

	converte_pessoa_es: (modo, pessoa) => {

		forma = ''

		if (modo === 'indicativo' || modo === 'condicional' || modo === 'subjuntivo') {
			if (pessoa === 'yo') forma = 's1'
			if (pessoa === 'tú') forma = 's2'
			if (pessoa === 'él/ella') forma = 's3'
			if (pessoa === 'nosotros(as)') forma = 'p1'
			if (pessoa === 'vosotros(as)') forma = 'p2'
			if (pessoa === 'ellos/ellas') forma = 'p3'
		}

		if (modo === 'imperativo') {
			if (pessoa === 'tú') forma = 's2'
			if (pessoa === 'usted') forma = 's3'
			if (pessoa === 'nosotros(as)') forma = 'p1'
			if (pessoa === 'vosotros(as)') forma = 'p2'
			if (pessoa === 'ustedes') forma = 'p3'
		}

		return forma
	},

	converte_tempo_pt: (modo, tempo) => {

		let grupo = ''
		if (modo === 'indicativo') {
			if (tempo === 'presente') grupo = 'indicative/present'
			if (tempo === 'pretérito imperfeito') grupo = 'indicative/imperfect'
			if (tempo === 'pretérito perfeito simples') grupo = 'indicative/preterite'
			if (tempo === 'pretérito mais-que-perfeito simples') grupo = 'indicative/pluperfect'
			if (tempo === 'futuro do presente') grupo = 'indicative/future'
			if (tempo === 'futuro do pretérito') grupo = 'conditional'
		}

		if (modo === 'subjuntivo') {
			if (tempo === 'presente') grupo = 'subjunctive/present'
			if (tempo === 'pretérito imperfeito') grupo = 'subjunctive/imperfect'
			if (tempo === 'futuro') grupo = 'subjunctive/preterite' // Sim, está preterite ai mas na fonte origina está errado.
		}

		if (modo === 'imperativo') {
			if (tempo === 'afirmativo') grupo = 'imperative/affirmative'
			if (tempo === 'negativo') grupo = 'imperative/negative'
		}
		
		if (modo === 'infinitivo') {
			if (tempo === 'pessoal') grupo = 'infinitive/personal'
		}
		

		return grupo
	},

	converte_pessoa_pt: (modo, pessoa) => {

		let forma = ''

		if (modo === 'indicativo' || modo === 'subjuntivo' || modo === 'infinitivo') {
			if (pessoa === 'eu') forma = 's1'
			if (pessoa === 'tu') forma = 's2'
			if (pessoa === 'ele/ela') forma = 's3'
			if (pessoa === 'nós') forma = 'p1'
			if (pessoa === 'vós') forma = 'p2'
			if (pessoa === 'eles/elas') forma = 'p3'
		}

		if (modo === 'imperativo') {
			if (pessoa === 'tu') forma = 's2'
			if (pessoa === 'você') forma = 's3'
			if (pessoa === 'nós') forma = 'p1'
			if (pessoa === 'vós') forma = 'p2'
			if (pessoa === 'vocês') forma = 'p3'
		}

		return forma
	},

	// Async/Await:
	carrega_verbos_fr: async () => {

		// Primeiro separamos os verbos por letras iniciais, para 


		let verbos = []

	},

	carrega_verbos_es: async (letra) => {

	let verbos = []

			let lista_verbos_sem_parse = await fs.readFileSync(`public/verbos/espanhol/categories/${letra}.json`, 'utf8', async (err, data) => {
			  
			  if (err) {
			    console.error(err)
			    return
			  }

			  return data
			})

			const lista_verbos = JSON.parse(lista_verbos_sem_parse)

			// Aqui loopa em cada um dos verbos desta letra.
		  for (let j = 0; j < lista_verbos.length; j++) {

		  	const verbo_inteiro_sem_parse = await fs.readFileSync(`public/verbos/portugues/content/${letra}/${lista_verbos[j]}.json`, 'utf8', (err_2, data_conj) => {
					if (err_2) {
					  console.error(err_2);
					  return;
					}

					return data_conj

		  	})

		  	const verbo_inteiro = JSON.parse(verbo_inteiro_sem_parse)
		  	verbos.push(verbo_inteiro)
			}
		
		return verbos
	},


	simplifica_idioma: (idioma_complexo) => {
	    if (idioma_complexo === 'Alemão') return 'alemao'
	    if (idioma_complexo === 'Árabe') return 'arabe'
	    if (idioma_complexo === 'Catalão') return 'catalao'
	    if (idioma_complexo === 'Chinês') return 'chines'
	    if (idioma_complexo === 'Coreano') return 'coreano'
	    if (idioma_complexo === 'Espanhol') return 'espanhol'
	    if (idioma_complexo === 'Esperanto') return 'esperanto'
	    if (idioma_complexo === 'Francês') return 'frances'
	    if (idioma_complexo === 'Grego') return 'grego'
	    if (idioma_complexo === 'Indiano') return 'indiano'
	    if (idioma_complexo === 'Inglês') return 'ingles'
	    if (idioma_complexo === 'Italiano') return 'italiano'
	    if (idioma_complexo === 'Japonês') return 'japones'
	    if (idioma_complexo === 'Latim') return 'latim'
	    if (idioma_complexo === 'Português') return 'portugues'
	    if (idioma_complexo === 'Russo') return 'russo'
	},

	determina_sigla_som: (idioma) => {
		if (idioma === 'alemao') return 'de'
		if (idioma === 'arabe') return 'ar'
		if (idioma === 'catalao') return 'ca'
		if (idioma === 'chines') return 'zh'
		if (idioma === 'coreano') return 'ko'
		if (idioma === 'espanhol') return 'es'
		if (idioma === 'esperanto') return 'eo'
		if (idioma === 'frances') return 'fr'
		if (idioma === 'grego') return 'el'
		if (idioma === 'indiano') return 'hi'
		if (idioma === 'ingles') return 'en'
		if (idioma === 'italiano') return 'it'
		if (idioma === 'japones') return 'ja'
		if (idioma === 'latim') return 'la'
		if (idioma === 'portugues') return 'pt-br'
		if (idioma === 'russo') return 'ru'
	},

	tira_acento (letra) {
		letra = letra.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
		letra = letra.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
		letra = letra.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
		letra = letra.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
		letra = letra.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
		letra = letra.replace(new RegExp('[Ç]', 'gi'), 'c')

		return letra
	},

	limpa_mp3_verbos: async (idioma) => {

		// 1 - Apaga os .mp3 antigos, se tiver algum.
		// 2 - Cria pastas vazias para os .mp3 novos.
		// 3 - Apaga os registros dos verbos no banco de dados.

		// Chamamos as letras deste idioma.
		letras = []
		for (let j = 0; j < letras_idiomas.length; j++) {
			if (letras_idiomas[j].idioma === idioma) {
				letras = letras_idiomas[j].letras
			}
		}

		// Apagamos a pasta antiga com os .mp3 dos verbos deste idioma e criamos uma pastosa toda nova.
		const pasta_verbos_idioma = `./public/mp3/${idioma}/verbos/`
		if (fs.existsSync(pasta_verbos_idioma)) fs.rmSync(pasta_verbos_idioma, { recursive: true, force: true })
		fs.mkdirSync(pasta_verbos_idioma)
		
		verbos_todos = {
			idioma: idioma,
			lista: []
		}
		
		// Criamos uma pastinha vazia para cada letra deste belo idioma na pasta de .mp3 dos verbos.
		for (let j = 0; j < letras.length; j++) {
		
			verbos_todos.lista.push({
				letra: letras[j],
				verbos: []
			})

			// Criamos uma pastinha da letra para receber o áudio destes verbos...
			const pasta_verbos_letra = `./public/mp3/${idioma}/verbos/${letras[j]}`
			if (!fs.existsSync(pasta_verbos_letra)) fs.mkdirSync(pasta_verbos_letra)
		}

		// Escolhe as regras verbais certas do idioma a ser inserido as paradas.

		for (let j = 0; j < regras_verbais.length; j++) {
			if (regras_verbais[j].idioma === idioma) {
				regras = regras_verbais[j]
			}
		}

		// E escolhe o modelo do salvar também.

		for (let j = 0; j < modelos_salvar_verbo.length; j++) {
			console.log(`${modelos_salvar_verbo[j].idioma} === ${idioma}`)
			if (modelos_salvar_verbo[j].idioma === idioma) {
				modelo_salvar = modelos_salvar_verbo[j].modelo
			}
		}

		// Agora esvaziamos o idioma na lista_verbos_idiomas no banco de dados, onde ficam os infinitivos desta língua.
		const idioma_lista_verbo = await acesso.busca_idioma_lista_verbos(idioma)
		if (idioma_lista_verbo)	await acesso.deleta_idioma_lista_verbos(idioma)

		// Esvaziamos também os verbos conjugados antigos deste idioma, já guardados no banco de dados.
		const verbos = await acesso.buscar_todos_verbos(idioma) // Primeiro baixa os verbos
		if (verbos) await acesso.deleta_todos_verbos(idioma)
	},

	regravar_som_verbos: async (idioma) => {
		console.log(idioma)
		let verbos = await acesso.buscar_todos_verbos(idioma) // Primeiro baixa os verbos

		// Escolhe as regras verbais certas do idioma a ser inserido as paradas.
		// Cógido duplicado!!!
		let regras
		for (let j = 0; j < regras_verbais.length; j++) {
						
			if (regras_verbais[j].idioma === idioma) {

				regras = regras_verbais[j]
			}
		}

		for (let h = 0; h < verbos.length; h++) {

			// Depois tem que formar a frase inteira, com pessoa, conjugado e auxiliares.
		  for (let i = 0; i < verbos[h].modos.length; i++) {
					

				let primeira_letra = verbos[h].infinitivo[0]

		    let string_conjugados = ''
		    let dados_modo = verbos[h].modos[i].modo

		    for (let j = 0; j < verbos[h].modos[i].tempos.length; j++) {

					string_conjugados = ''

			    const dados_tempo = verbos[h].modos[i].tempos[j].tempo

			    let encontrou = 'nao'

			    let i_modo = 0 // Esse é o i dos modos da regra.
			    let i_ordenacao // i da ordenação da regra
			    let i_tempo // i do tempo dentro da ordenacao da regra

			    for (let k = 0; k < regras.modos.length; k++) {

			      if (regras.modos[k].modo === verbos[h].modos[i].modo) {

			        i_modo = k
			                
			        for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
			          for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
			            if (dados_tempo === regras.modos[k].ordenacao[l].tempos[m] & encontrou === 'nao') {

			              encontrou = 'sim'
			              i_ordenacao = l
			              i_tempo = m

			            }
			          }
			        }
			      }
			    }

			    let conjugado = '' // Parece que não to mais usando esse aqui.

			    verbos[h].modos[i].tempos[j].audios = []

			    
			    for (let k = 0; k < regras.modos[i_modo].ordenacao[i_ordenacao].pessoas.length; k++) {

			      // Tá inserindo um nome novo para cada possível áudio deste verbo. Um pra cada pessoa em cada um dos tempos em cada um dos modos.
			      const id_randomico = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)
			      verbos[h].modos[i].tempos[j].audios.push(id_randomico)

			      // Ordena os elementos
			      let elemento_1 = ''
			      let elemento_2 = ''
			      let elemento_3 = ''
			      let elemento_4 = ''

			      let verbo_falado = ''

			      for (let l = 0; l < regras.modos[i_modo].ordenacao[i_ordenacao].elementos.length; l++) {

			        const elemento = regras.modos[i_modo].ordenacao[i_ordenacao].elementos[l]
			        const ordenacao = regras.modos[i_modo].ordenacao[i_ordenacao]

			        let valor = ''

			        if (elemento === 'conjugado') {

			          if (l == 0) elemento_1 = verbos[h].modos[i].tempos[j].conjugacoes[k]
			          if (l == 1) elemento_2 = verbos[h].modos[i].tempos[j].conjugacoes[k]
			          if (l == 2) elemento_3 = verbos[h].modos[i].tempos[j].conjugacoes[k]
			          if (l == 3) elemento_4 = verbos[h].modos[i].tempos[j].conjugacoes[k]           

			        } else if (elemento === 'infinitivo') {

			          if (l == 0) elemento_1 = verbos[h].infinitivo
			          if (l == 1) elemento_2 = verbos[h].infinitivo
			          if (l == 2) elemento_3 = verbos[h].infinitivo
			          if (l == 3) elemento_4 = verbos[h].infinitivo

			        } else if (elemento === 'gerundio') {

			          if (l == 0) elemento_1 = verbos[h].gerundio
			          if (l == 1) elemento_2 = verbos[h].gerundio
			          if (l == 2) elemento_3 = verbos[h].gerundio
			          if (l == 3) elemento_4 = verbos[h].gerundio

			            } else if (elemento === 'participio') {

			              if (l == 0) elemento_1 = verbos[h].participio
			              if (l == 1) elemento_2 = verbos[h].participio
			              if (l == 2) elemento_3 = verbos[h].participio
			              if (l == 3) elemento_4 = verbos[h].participio

			            } else if ( elemento === 'pessoas') {

			              if (l == 0) elemento_1 = regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k]
			              if (l == 1) elemento_2 = regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k]
			              if (l == 2) elemento_3 = regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k]
			              if (l == 3) elemento_4 = regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k]
			                
			            } else  {

			            	// Provavelmente aqui deverá conter a modificação para a gravação dos verbos em francês com a flexão.
			              valor = (elemento.length > 1) ? ordenacao[elemento][k] : ordenacao[elemento][0]

			              if (l == 0) elemento_1 = valor
			              if (l == 1) elemento_2 = valor
			              if (l == 2) elemento_3 = valor
			              if (l == 3) elemento_4 = valor

			            }
			            
			          }

			        	verbo_falado = `${elemento_1} ${elemento_2} ${elemento_3} ${elemento_4}`

			        	// Se for francês na primeira pessoa, dependendo do caso o je vira j', aí tem que mudar o verbo_falado
			        	// pro sistema pronunciar direito a paradénha.
			          let tempo_verbo = verbos[h].modos[i].tempos[j].tempo
			          if (idioma_insercao === 'frances') {
			          	if (tempo_verbo === 'présent' || tempo_verbo === 'imparfait' || tempo_verbo === 'passé composé' || tempo_verbo=== 'plus-que-parfait' || tempo_verbo === 'passé antérieur' || tempo_verbo === 'futur antérieur' || tempo_verbo === 'passé' || tempo_verbo === 'passé 1ère forme') {
										if (k === 0 & elemento_3 != '') {
	                    if (elemento_2[0] === 'a' || elemento_2[0] === 'e') {
	                    	verbo_falado = `j'${elemento_2} ${elemento_3} ${elemento_4}`

	                    }
	                  }
			          	}
			          }
			          
			          console.log(`verbo_falado: ${verbo_falado}`)
			          console.log(`primeira_letra: ${primeira_letra}`)

			         	primeira_letra = module.exports.tira_acento(primeira_letra)
			         	const sigla_som = module.exports.determina_sigla_som(idioma)

			          const end_pasta = `./public/mp3/${idioma}/verbos/${primeira_letra}`
								const verbo_falado_limpo = module.exports.tira_aspas(verbo_falado)
								const end_arquivo = `${end_pasta}/${id_randomico}.mp3`
								console.log(`end_arquivo::: ${end_arquivo}`)
								await module.exports.salva_mp3(verbo_falado_limpo, sigla_som, end_arquivo)

								// console.log(`Gravará: ${verbo_falado_limpo}`)
								await verbos[h].save() // Aqui hay que gravarse al verbo con el id randomico, ke es la ubicación del .mp3 del verbo.

			        }
		     	}
		    }
		}
	},

	regravar_som_palavras: async (idioma) => {

		// module.exports.cria_as_primeiras_listas()
		// Acredito que no banco de dados, nos valores, não podem haver " nem '. Tem que ser com código.


		async function deleteFile(directory, filename) {
	    const filePath = path.join(directory, filename);
	    if (await fs.pathExists(filePath)) {
	      await fs.remove(filePath);
	      console.log(`Arquivo ${filename} deletado.`);
	    } else {
	      console.log(`Arquivo ${filename} não encontrado.`);
	    }
		}




		console.log(`regravar_som_palavras: ${idioma}`)
		const idioma_complexo = module.exports.complexiza_idioma(idioma)

		let dekoreba = await acesso.busca_dekoreba_por_idioma(idioma_complexo)

		let lista_nova = {
			idioma: idioma,
		 	arquivos: []
		}

		let lista_palavras_pt = await acesso.busca_lista_mp3('portugues')
		let nova_lista_palavras_pt = {
			idioma: 'portugues',
		 	arquivos: []
		}
		
		let i_principal

		let lista_antiga_idioma_1 = await acesso.busca_lista_mp3(idioma)

		if (lista_antiga_idioma_1) {
			for (let j = 0; j < lista_antiga_idioma_1.arquivos.length; j++) {
				deleteFile(`./public/mp3/${idioma}`, `${lista_antiga_idioma_1.arquivos[j].nome_arquivo}.mp3`)
			}
		}



		for (let j = 0; j < dekoreba.capitulos.length; j++) {

			if (dekoreba.capitulos[j].tipo != 'verbos') {

		  	console.log(" " + dekoreba.capitulos[j].titulo)



		 		for (let k = 0; k < dekoreba.capitulos[j].vocabulario.length; k++) {

		 			if (k === 0 & i_principal === undefined) {
		 				const palavra = dekoreba.capitulos[j].vocabulario[j].idioma_1
		 				i_principal = module.exports.acha_alfabeto_principal(idioma_complexo, palavra)
		 			}

		 			dekoreba.capitulos[j].vocabulario[k].idioma_1[i_principal].arquivo = ''
		 			
		 			let	palavra = dekoreba.capitulos[j].vocabulario[k].idioma_1[i_principal].item
		 			palavra = palavra.replace("&#39;", "'")


					const id_randomico = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)
				 	const sigla_som = module.exports.determina_sigla_som(idioma)
				  const end_pasta = `./public/mp3/${idioma}`
					const palavra_limpa = module.exports.tira_aspas(palavra)
					const end_arquivo = `${end_pasta}/${id_randomico}.mp3`
					await module.exports.salva_mp3(palavra_limpa, sigla_som, end_arquivo)


					if (dekoreba.capitulos[j].vocabulario[k].idioma_1.length) {
						for (let l = 0; l < dekoreba.capitulos[j].vocabulario[k].idioma_1.length; l++) {
							dekoreba.capitulos[j].vocabulario[k].idioma_1[l].arquivo = id_randomico
						}
					} else {
						dekoreba.capitulos[j].vocabulario[k].idioma_1[i_principal].arquivo = id_randomico
					}

					lista_nova.arquivos.push({ nome_arquivo: id_randomico, palavra: palavra})

					// Agora só falta trocar os ' de todas as palavras pelo código &#39;
					palavra = palavra.replace("'", "&#39;")

					// Agora vê em PT.
					let palavra_pt = dekoreba.capitulos[j].vocabulario[k].idioma_2[0].item
		 			palavra_pt = palavra_pt.replace("&#39;", "'")

					let achou_palavra_pt = 'nao'

					// Se não tiver uma lista em português, precisamos criar uma vazia.
					if (!lista_palavras_pt) {

						console.log("LISTA PORTUGUÊS INEXISTENTE.")

						// Essa parte de criar o arquivo de áudio em português, se repete no código.
						// Dá pra modularizar isso.

						const id_randomico_pt = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)
				 		const sigla_som_pt = module.exports.determina_sigla_som('portugues')

					  const end_pasta_pt = `./public/mp3/portugues`
						const palavra_limpa_pt = module.exports.tira_aspas(palavra_pt)
						const end_arquivo_pt = `${end_pasta_pt}/${id_randomico_pt}.mp3`
						await module.exports.salva_mp3(palavra_limpa_pt, sigla_som_pt, end_arquivo_pt)

						dekoreba.capitulos[j].vocabulario[k].idioma_2[0].arquivo = id_randomico_pt

						nova_lista_palavras_pt.arquivos.push({nome_arquivo: id_randomico_pt, palavra: palavra_pt})

						// Agora só falta trocar os ' de todas as palavras pelo código &#39;
						palavra_pt = palavra_pt.replace("'", "&#39;")

					} else if (lista_palavras_pt) {

						for (let l = 0; l < lista_palavras_pt.arquivos.length; l++) {
							if (lista_palavras_pt.arquivos[l].palavra === palavra_pt) {
								dekoreba.capitulos[j].vocabulario[k].idioma_2[0].arquivo = lista_palavras_pt.arquivos[l].nome_arquivo
								achou_palavra_pt = 'sim'
								console.log("portuga: " + palavra_pt)
							}
						}

						if (achou_palavra_pt === 'nao') {

							const id_randomico_pt = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)
					 		const sigla_som_pt = module.exports.determina_sigla_som('portugues')

						  const end_pasta_pt = `./public/mp3/portugues`
							const palavra_limpa_pt = module.exports.tira_aspas(palavra_pt)
							const end_arquivo_pt = `${end_pasta_pt}/${id_randomico_pt}.mp3`
							console.log("salvará mp3")
							await module.exports.salva_mp3(palavra_limpa_pt, sigla_som_pt, end_arquivo_pt)

							dekoreba.capitulos[j].vocabulario[k].idioma_2[0].arquivo = id_randomico_pt

							lista_palavras_pt.arquivos.push({nome_arquivo: id_randomico_pt, palavra: palavra_pt})

							// Agora só falta trocar os ' de todas as palavras pelo código &#39;
							palavra_pt = palavra_pt.replace("'", "&#39;")
						}
					}

			  }
		 	}
		}

		await acesso.salva_dekoreba(dekoreba)

		if (!lista_palavras_pt) await acesso.salva_lista_mp3(nova_lista_palavras_pt)
		if (lista_palavras_pt) await acesso.atualiza_lista_mp3('portugues', lista_palavras_pt)

		if (!lista_antiga_idioma_1) await acesso.salva_lista_mp3(lista_nova)
		if (lista_antiga_idioma_1) await acesso.atualiza_lista_mp3(idioma, lista_nova)

	},

	carrega_verbos: async (letra, idioma) => {
		
		let verbos = []

			let lista_verbos_sem_parse = await fs.readFileSync(`public/verbos/${idioma}/categories/${letra}.json`, 'utf8', async (err, data) => {
			  
			  if (err) {
			    console.error(err)
			    return
			  }

			  return data
			})

			const lista_verbos = JSON.parse(lista_verbos_sem_parse)

			// Aqui loopa em cada um dos verbos desta letra.
		  for (let j = 0; j < lista_verbos.length; j++) {

		  	const verbo_inteiro_sem_parse = await fs.readFileSync(`public/verbos/${idioma}/content/${letra}/${lista_verbos[j]}.json`, 'utf8', (err_2, data_conj) => {
					if (err_2) {
					  console.error(err_2);
					  return;
					}

					return data_conj

		  	})

		  	const verbo_inteiro = JSON.parse(verbo_inteiro_sem_parse)
		  	verbos.push(verbo_inteiro)
			}
		
		
		return verbos
	},


	cria_as_primeiras_listas: async () => {
		
		// Primeiramente, checa se todas as listas foram salvas.
		// Se faltar alguma, criar uma zerada.
		const listas_mp3 = await acesso.busca_todas_listas_mp3()

	  const obj_idiomas = ['alemao', 'arabe', 'catalao', 'chines', 'coreano', 'espanhol', 'esperanto', 'frances', 'grego', 'indiano', 'ingles', 'italiano', 'japones', 'latin', 'portugues', 'russo']

	  let obj_lista = []

	  if (!listas_mp3.length) {
	  	for (let i = 0; i < obj_idiomas.length; i++) {

	  		const obj = {
	  			idioma: obj_idiomas[i],
	  			arquivos: []
	  		}

	  		obj_lista.push(obj)
	  	}

	  	for (let j = 0; j < obj_lista.length; j++) {
	  		await acesso.salva_lista_mp3(obj_lista[j])
	  	}

	  }

	},

	cria_novissimo_elemento: async (i, j, capitulos, lista_mp3, palavra, idioma, i_principal, end_pasta, idioma_sigla_som) => {

		// 1 - Criamos um nome aleatório para o arquivo
		// 2 - Inserimos a palavra e o nome do arquivo na lista_mp3
		// 3 - Atualizamos o nome do arquivo no documento capitulos do curso
		// 4 - Salvamos o .mp3

		const id_randomico = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)

		console.log("lista_mp3 do cria_novissimo_elemento")

		lista_mp3.arquivos.push({palavra: palavra, nome_arquivo: id_randomico})

		if (idioma === 'idioma_1') capitulos[i].vocabulario[j].idioma_1[i_principal].arquivo = id_randomico
		if (idioma === 'idioma_2') capitulos[i].vocabulario[j].idioma_2[i_principal].arquivo = id_randomico

		const palavra_falada = module.exports.tira_aspas(palavra)
		const end_arquivo = `${end_pasta}/${id_randomico}.mp3`
		await module.exports.salva_mp3(palavra_falada, idioma_sigla_som, end_arquivo)
	}

}