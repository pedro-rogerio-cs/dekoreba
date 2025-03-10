const pdf = require("pdf-creator-node")
const acesso = require('../../modelos/acesso')
const regras_verbais = require('../sobre_verbos/regras_verbais.js')

async function prepara_pdf (req, res) {

	req.session.margin_lateral = 75

	// Create a document
	const doc = new PDFDocument({
		size: 'A4',
		margins: {
		  top: 35,
		  bottom: 35,
		  left: req.session.margin_lateral,
		  right: req.session.margin_lateral
		}
	})

	doc.pipe(res) // Pipe its output in a HTTP response

	res.setHeader('Content-Type', 'application/pdf') // Define o tipo de conteúdo do cabeçalho HTTP

	// Define o cabeçalho Content-Disposition para indicar ao navegador que deve baixar o arquivo
	res.setHeader('Content-Disposition', 'inline; filename=exemplo.pdf');

	// Aqui tem que descobrir de qual alfabeto que se trata  itennn, para assim, escolhermos a fonte correta.

	// Título

	doc.font('public/font/fontello.ttf')
	doc.fontSize(20)

	// Logo dekoreba e elefantinho.
	doc.text(`\uE838;`, req.session.margin_lateral, 50)
	doc.fontSize(30)
	doc.text(`\uE839;`, req.session.margin_lateral + 120, 40)

	doc.font('public/font/fontes_pdf/ARIAL.TTF')
	return doc
}

module.exports = {

	gera_pdf_verbo_post: async function (req, res) {
		
		const { idioma, infinitivo } = req.body
		const id_usuario = req.session.userId

		function ehMultiploDeTres(numero) {
      return numero !== 0 && numero % 3 === 0;
		}

		let regras
		if (idioma === 'es') regras = regras_verbais.find(item => item.idioma === "espanhol")
		if (idioma === 'fr') regras = regras_verbais.find(item => item.idioma === "frances")
		if (idioma === 'it') regras = regras_verbais.find(item => item.idioma === "italiano")
		if (idioma === 'en') regras = regras_verbais.find(item => item.idioma === "ingles")

		const doc = await prepara_pdf(req, res)

		const verbo = await acesso.buscar_verbo(idioma, infinitivo)
		
		// O que é, no infinitivo.
		let idioma_verbo = ''
		if (idioma === 'fr') idioma_verbo = 'Francês'
		if (idioma === 'es') idioma_verbo = 'Espanhol'
		if (idioma === 'en') idioma_verbo = 'Inglês'
		if (idioma === 'ar') idioma_verbo = 'Árabe'
		if (idioma === 'gr') idioma_verbo = 'Grêgo'
		if (idioma === 'jp') idioma_verbo = 'Japonês'
		if (idioma === 'ru') idioma_verbo = 'Russo'
		if (idioma === 'co') idioma_verbo = 'Coreano'
		if (idioma === 'it') idioma_verbo = 'Italiano'
		if (idioma === 'pt') idioma_verbo = 'Português'

		let primeira_pagina = 'sim'

		doc.fontSize(17)
		doc.text(`${idioma_verbo}`, req.session.margin_lateral, 105, {align: 'center'})

		doc.fontSize(25)
		doc.text(`${infinitivo}`, req.session.margin_lateral, 130, {align: 'center'})

		let cont_linhas_puladas = 0

    for (let i = 0; i < verbo.modos.length; i++) {

      let string_conjugados = ''
      let dados_modo = verbo.modos[i].modo

      let altura_modo = (primeira_pagina === 'sim') ? 180 : 50 

			let pula_linha_tempo = 0

			// Escrevemos aqui o nome do modo
			doc.fontSize(18)			
			doc.text(`${verbo.modos[i].modo}`, req.session.margin_lateral, altura_modo + 25, {align: 'center'})

			let vezes_espacamento_x = -1

      for (let j = 0; j < verbo.modos[i].tempos.length; j++) {

				let eh = ehMultiploDeTres(j) // É o primeiro tempo de uma nova linha
				if (eh === false) vezes_espacamento_x++

				if (eh === true) {
					vezes_espacamento_x = 0
					pula_linha_tempo += 150 // Pro tempo de baixo
					cont_linhas_puladas++
				}

				let altura_tempo = altura_modo + 50 + pula_linha_tempo

				let eixo_x_tempo = req.session.margin_lateral + (150 * vezes_espacamento_x)

				doc.fontSize(16)
      	
        string_conjugados = ''

				doc.text(`${verbo.modos[i].tempos[j].tempo}`, eixo_x_tempo, altura_tempo, {align: 'left'})
       
       	doc.fontSize(12)
        
        let encontrou = 'nao'

        let i_modo = 0 // Esse é o i dos modos da regra.
        let i_ordenacao // i da ordenação da regra
        let i_tempo // i do tempo dentro da ordenacao da regra

        // Aqui começa as regras
        for (let k = 0; k < regras.modos.length; k++) {

          if (regras.modos[k].modo === verbo.modos[i].modo) {
            i_modo = k
                
            for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
              for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
                if (verbo.modos[i].tempos[j].tempo === regras.modos[k].ordenacao[l].tempos[m] & encontrou === 'nao') {
                  // Achouo tempo
                  encontrou = 'sim'
                  i_ordenacao = l
                  i_tempo = m
                }
              }
            }
          }
        }

        let conjugado = '' // Parece que não to mais usando esse aqui.

        for (let k = 0; k < regras.modos[i_modo].ordenacao[i_ordenacao].pessoas.length; k++) {

          // Esse if abaixo é só para mexer a terceira vez no respostas_verbos.

          // Ordena os elementos
          let elemento_1 = ''
          let elemento_2 = ''
          let elemento_3 = ''
          let elemento_4 = ''

          for (let l = 0; l < regras.modos[i_modo].ordenacao[i_ordenacao].elementos.length; l++) {

            const elemento = regras.modos[i_modo].ordenacao[i_ordenacao].elementos[l]
            const ordenacao = regras.modos[i_modo].ordenacao[i_ordenacao]

            let valor = ''
            let valor_pessoa = ''

            if (elemento === 'conjugado') { valor = verbo.modos[i].tempos[j].conjugacoes[k] }
            else if (elemento === 'infinitivo') { valor = verbo.infinitivo }
            else if (elemento === 'gerundio') { valor = verbo.gerundio }
            else if (elemento === 'participio') { valor = verbo.participio }
            else if (elemento === 'pessoas') { valor = regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k] }
            
            else { valor = (elemento.length > 1) ? ordenacao[elemento][k] : ordenacao[elemento][0] }

         		if (l == 0) elemento_1 = valor
            if (l == 1) elemento_2 = valor
            if (l == 2) elemento_3 = valor
            if (l == 3) elemento_4 = valor

            if (idioma === 'fr') {
              if (verbo.modos[i].tempos[j].tempo === 'présent' || verbo.modos[i].tempos[j].tempo === 'imparfait' || verbo.modos[i].tempos[j].tempo === 'passé composé' || verbo.modos[i].tempos[j].tempo === 'plus-que-parfait' || verbo.modos[i].tempos[j].tempo === 'passé antérieur' || verbo.modos[i].tempos[j].tempo === 'futur antérieur' || verbo.modos[i].tempos[j].tempo === 'passé' || verbo.modos[i].tempos[j].tempo === 'passé 1ère forme') {

                if (k === 0) {
                    if (valor[0] === 'a' || valor[0] === 'e') {

                      // O valor pessoa é diferentão.
                      const valor_a_inserir = (elemento === 'pessoas') ? valor_pessoa : valor 

                      // Quarta e última mexida no respostas_verbos.
                      // Colocamos a resposta correta para futura comparação com a resposta do usuário.

                      elemento_1 = `j'`
                    }
                  }
                }
              }
          	}


            let mais_altura = (k+1) * 20
            
            if (j === verbo.modos[i].tempos.length - 1 && k === regras.modos[i_modo].ordenacao[i_ordenacao].pessoas.length - 1) {
            	doc.text(`${elemento_1} ${elemento_2} ${elemento_3} ${elemento_4}`, eixo_x_tempo, altura_tempo + mais_altura, {align: 'left'})
            	
            	if (i < verbo.modos.length - 1) doc.addPage()
            	cont_linhas_puladas = 0
            } else {
            	doc.text(`${elemento_1} ${elemento_2} ${elemento_3} ${elemento_4}`, eixo_x_tempo, altura_tempo + mais_altura, {align: 'left'})
            }

        }
        
      }
      
    }

		doc.end()		
	},

	gera_pdf_lista_post: async function (req, res) {

		const { id_decoreba, id_capitulo } = req.body

  	// Obter dados necessários
		const decoreba = await acesso.busca_dekoreba (id_decoreba)
		const doc = await prepara_pdf(req, res)
    const id_usuario = req.session.userId
	  const usuario = await acesso.busca_usuario(id_usuario)

	  // Setamos o tipo do capítulo. Será útil mais pra frente.
	  let tipo_cap = ''
	  for (let i = 0; i < decoreba.capitulos.length; i++) {
			if (decoreba.capitulos[i]._id == id_capitulo) tipo_cap = decoreba.capitulos[i].tipo
	  }

		let dec_praticada
		for (let i = 0; i < usuario.decorebas_praticadas.length; i++) {
			if (usuario.decorebas_praticadas[i].id_decoreba == id_decoreba) {
				dec_praticada = usuario.decorebas_praticadas[i]
			}
		}

		// Se não for tipo_cap == 'pra_valer', não terá este capítulo na dec_praticada
		let i_cap_praticado = 'nao_eh_pra_valer'
		if (tipo_cap === 'pra_valer') {
			for (let i = 0; i < dec_praticada.caps_praticados.length; i++) {
				if (dec_praticada.caps_praticados[i].id_capitulo == id_capitulo) i_cap_praticado = i
			}
		}


		let impressao = 'capitulo' // 'capitulo' ou 'dekoreba'

		let primeira_pagina = 'sim'

		const margin_lateral = req.session.margin_lateral
		
		const eixo_y_primeira = 200

		let eixo_y = eixo_y_primeira
		let eixo_x = req.session.margin_lateral

		for (let i = 0; i < decoreba.capitulos.length; i++) {

			// Todo capitulo impresso, que for 'pra_valer', deve ter sido praticado, pois, não se pode clicar na impressão
			// em capítulos ainda não liberados.

			if (decoreba.capitulos[i]._id == id_capitulo) {
				
				if (primeira_pagina === 'sim') {

					doc.fontSize(17)
					doc.text(`${decoreba.idioma_2} - ${decoreba.idioma_1}`, req.session.margin_lateral, 105, {align: 'center'})
				}

				doc.fontSize(25)
				doc.text(`${decoreba.capitulos[i].titulo}`, req.session.margin_lateral, 130, {align: 'center'})


				doc.fontSize(15)
				for (let j = 0 ; j < decoreba.capitulos[i].vocabulario.length; j++) {					 
					
					// Aqui setamos essa let palavra_aparece.
					// Se for sim, é pq o capítulo é pra_valer e a palavra já está liberada.
					// Ou então é pq o capítulo não é pra_valer, logo, todas as palavras dele estão liberadas para treino,
					// logo, pode aparecer.
					let palavra_aparece = 'nao'
					if (i_cap_praticado != 'nao_eh_pra_valer') {
						let cap_praticado = dec_praticada.caps_praticados[i_cap_praticado]
						for (let k = 0; k < cap_praticado.palavras_liberadas_mult.length; k++) {
							if (cap_praticado.palavras_liberadas_mult[k].id_palavra == decoreba.capitulos[i].vocabulario[j]._id) {
								palavra_aparece = 'sim'
							}
						}
					}
					
					let palavra_idi_1 = ''
					for (let k = 0; k < decoreba.capitulos[i].vocabulario[j].idioma_1.length; k++) {
						if (decoreba.capitulos[i].vocabulario[j].idioma_1[k].tipo === 'palavra') {

							const sistema_escrita = decoreba.capitulos[i].vocabulario[j].idioma_1[k].sistema_escrita
							if (sistema_escrita === 'devanagari') doc.font('public/font/fontes_pdf/tiro.ttf')
							if (sistema_escrita === 'latino') doc.font('public/font/fontes_pdf/ARIAL.TTF')


							palavra_idi_1 += `${decoreba.capitulos[i].vocabulario[j].idioma_1[k].item}  `
						}
					}

					palavra_idi_1 = palavra_idi_1.replace("&#39;", "'")
					palavra_idi_1 = palavra_idi_1.replace('&#34;', '"')

					let palavra_idi_2 = ''
					for (let k = 0; k < decoreba.capitulos[i].vocabulario[j].idioma_2.length; k++) {
						if (decoreba.capitulos[i].vocabulario[j].idioma_2[k].tipo === 'palavra') {

							const sistema_escrita = decoreba.capitulos[i].vocabulario[j].idioma_2[k].sistema_escrita
							if (sistema_escrita === 'devanagari') {

								doc.font('public/tiro.ttf')
							}
							if (sistema_escrita === 'latino') doc.font('public/font/fontes_pdf/ARIAL.TTF')

							palavra_idi_2 += decoreba.capitulos[i].vocabulario[j].idioma_2[k].item
						}
					}

					palavra_idi_2 = palavra_idi_2.replace("&#39;", "'")
					palavra_idi_2 = palavra_idi_2.replace('&#34;', '"')

					// Nem todas as colunas sao iguais em largura.
					// doc.text(`${palavra_idi_2}: ${palavra_idi_1}`, eixo_x, eixo_y)

					//75.19 = Largura em pontos de cada uma das quatro colunas.
					const colWidth = doc.page.width / 4;
					
					// Aqui daria para somar a qtd de caracteres e ver se surpassa a width da parada.
					if (decoreba.idioma_2 === 'Indiano') doc.font('public/font/fontes_pdf/tiro.ttf')
					if (decoreba.idioma_2 === 'Coreano') doc.font('public/font/fontes_pdf/pretendard.ttf')
					if (decoreba.idioma_2 === 'Português') doc.font('public/font/fontes_pdf/ARIAL.TTF')

					const larguraTexto2 = doc.widthOfString(palavra_idi_2);
				
					// doc.text(`${palavra_idi_2} `, eixo_x, eixo_y)
					if (palavra_aparece === 'sim' || tipo_cap != 'pra_valer') {
						doc.text(`${palavra_idi_2} `, eixo_x, eixo_y, { width: colWidth - 50})
					}

					// Preciso descobrir o valor em pontos de cada uma das quatro colunas.
					// cada coluna parece ter 100 pixels

					if (decoreba.idioma_1 === 'Indiano') doc.font('public/font/fontes_pdf/tiro.ttf')
					if (decoreba.idioma_1 === 'Coreano') doc.font('public/font/fontes_pdf/pretendard.ttf')
					if (decoreba.idioma_1 === 'Português') doc.font('public/font/fontes_pdf/ARIAL.TTF')

					const larguraTexto1 = doc.widthOfString(palavra_idi_1);

					// if (larguraTexto1 > 115) doc.text(`${palavra_idi_1}`, eixo_x + 100, eixo_y)

					if (palavra_aparece === 'sim' || tipo_cap != 'pra_valer') {
						doc.text(`${palavra_idi_1}`, eixo_x + 100, eixo_y, { width: colWidth})
  			  	.moveDown()
  			  }

  			  if (larguraTexto1 > 135 || larguraTexto2 > 90) eixo_y += 20
  			  if (larguraTexto1 > 270 || larguraTexto2 > 180) eixo_y += 20
  			  if (larguraTexto1 > 405 || larguraTexto2 > 270) eixo_y += 20

  			  if (eixo_y === 780 & eixo_x === 325) {

						eixo_x = req.session.margin_lateral
	  			  eixo_y = 20
  			  	primeira_pagina = 'nao'
  			  	
  			  	doc.addPage()
  			  }

  			  if (eixo_y === 780) {

  			  	eixo_x += 250

  			  	if (primeira_pagina === 'sim') eixo_y = eixo_y_primeira - 20
  			  	if (primeira_pagina === 'nao') eixo_y = 20
  			  }

  			 	eixo_y += 20

				}
			}
		}
		
		doc.end()

	},
}