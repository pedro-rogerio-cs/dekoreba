const fs = require('fs-extra')
const util = require('util')


const modelos_salvar_verbo = require('./modelos_salvar_verbo').modelos_salvar_verbo
const acesso = require('../../modelos/acesso')
const verbos_comuns = require('./verbos_comuns').verbos_comuns

module.exports = {

	acha_idioma_verbos_comuns: (idioma) => {
		for (let i = 0; i < verbos_comuns.length; i++) {
			if (verbos_comuns[i].idioma === idioma) return verbos_comuns[i]
		}
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

	ingles: async (req, res) => {
		
		const idioma = 'ingles'
		console.log("Ta vindo no ingles")
		let verbos_sem_parse = await fs.readFileSync(`public/verbos/ingles/verbs-conjugations.json`, 'utf8', async (err, data) => {
				  
				if (err) {
				  console.error(err)
				  return
				}

				return data
			})

			const verbos = JSON.parse(verbos_sem_parse)


			// Buscamos o objeto com os verbos comuns do idioma dentro da arrayazona verbos_comuns[].
			const verbos_comuns_deste_idioma = module.exports.acha_idioma_verbos_comuns(idioma)

			// Roda por todos os dez mil verbos.
			let verbos_completos_populares = []

			for (let j = 0; j < verbos.length; j++) {

				let eh_popular = 'nao'

				const infinitivo = verbos[j].infinitive

				traducao_infinitivo_pt = ''

				if (infinitivo) {

					infinitivo_string = infinitivo[0]

					for (let k = 0; k < verbos_comuns_deste_idioma.verbos.length; k++) {
						if (infinitivo_string == verbos_comuns_deste_idioma.verbos[k]) {
							eh_popular = 'sim'
							
							// console.log(util.inspect(verbos_comuns_deste_idioma, false, null, true /* enable colors */))

							traducao_infinitivo_pt = verbos_comuns_deste_idioma.verbos_em_pt[k]

						}
					}
				}

				// Aqui salvamos este verbo conjugadão.
				if (eh_popular === 'sim') {
					
					letra_vez_com_possivel_acento = infinitivo[0][0]
					let letra_vez = module.exports.tira_acento(letra_vez_com_possivel_acento)

					for (let k = 0; k < verbos_todos.lista.length; k++) {

						if (verbos_todos.lista[k].letra === letra_vez) {

							verbos_todos.lista[k].verbos.push(verbos[j].infinitive[0])

							modelo_salvar.infinitivo = verbos[j].infinitive[0]
							modelo_salvar.traducao_pt = traducao_infinitivo_pt
							modelo_salvar.participio = verbos[j].participle[0]
							modelo_salvar.gerundio = verbos[j].gerund[0]

							modelo_salvar.modos[0].tempos[0].conjugacoes = verbos[j].indicative["present"]
							modelo_salvar.modos[0].tempos[2].conjugacoes = verbos[j].indicative["imperfect"]

							await acesso.salva_verbos(idioma, modelo_salvar)

						}
					}
				}
			}

		await acesso.salva_lista_verbos_idiomas(verbos_todos)
	},

	frances: async (req, res) => {
		const idioma = 'frances'
		console.log("chamou o frances")
		let verbos_sem_parse = await fs.readFileSync(`public/verbos/frances/verbes_lowercase.json`, 'utf8', async (err, data) => {
				  
				if (err) {
				  console.error(err)
				  return
				}

				return data
			})

			const verbos = JSON.parse(verbos_sem_parse)


			// Buscamos o objeto com os verbos comuns do idioma dentro da arrayazona verbos_comuns[].
			const verbos_comuns_deste_idioma = module.exports.acha_idioma_verbos_comuns(idioma)

			// Roda por todos os dez mil verbos.
			let verbos_completos_populares = []

			for (let j = 0; j < verbos.length; j++) {

				let eh_popular = 'nao'

				const infinitivo = verbos[j].infinitif
				let traducao_infinitivo_pt = ''

				if (infinitivo) {

					infinitivo_string = infinitivo.présent[0]

					for (let k = 0; k < verbos_comuns_deste_idioma.verbos.length; k++) {
						if (infinitivo_string == verbos_comuns_deste_idioma.verbos[k]) {
							eh_popular = 'sim'
							traducao_infinitivo_pt = verbos_comuns_deste_idioma.verbos_em_pt[k]
						}
					}
				}

				// Aqui salvamos este verbo conjugadão.
				if (eh_popular === 'sim') {
					
					letra_vez_com_possivel_acento = infinitivo.présent[0][0]
					let letra_vez = module.exports.tira_acento(letra_vez_com_possivel_acento)


					for (let k = 0; k < verbos_todos.lista.length; k++) {

						console.log(`${verbos_todos.lista[k].letra} === ${letra_vez}`)

						if (verbos_todos.lista[k].letra === letra_vez) {

							console.log(`Salvará: ${infinitivo_string}`)

							verbos_todos.lista[k].verbos.push(verbos[j].infinitif.présent[0])

							modelo_salvar.traducao_pt = traducao_infinitivo_pt

							modelo_salvar.infinitivo = verbos[j].infinitif.présent[0]
							modelo_salvar.participio = verbos[j].participe.passé[0]
							// gerúndio não tem nessa lista baixada

							modelo_salvar.modos[0].tempos[0].conjugacoes = verbos[j].indicatif["présent"]
							modelo_salvar.modos[0].tempos[1].conjugacoes = verbos[j].indicatif["passé composé"]
							modelo_salvar.modos[0].tempos[2].conjugacoes = verbos[j].indicatif["imparfait"]
							modelo_salvar.modos[0].tempos[3].conjugacoes = verbos[j].indicatif["plus-que-parfait"]
							modelo_salvar.modos[0].tempos[4].conjugacoes = verbos[j].indicatif["passé simple"]
							modelo_salvar.modos[0].tempos[5].conjugacoes = verbos[j].indicatif["passé antérieur"]
							modelo_salvar.modos[0].tempos[6].conjugacoes = verbos[j].indicatif["futur simple"]
							modelo_salvar.modos[0].tempos[7].conjugacoes = verbos[j].indicatif["futur antérieur"]

							modelo_salvar.modos[1].tempos[0].conjugacoes = verbos[j].subjonctif["présent"]
							modelo_salvar.modos[1].tempos[1].conjugacoes = verbos[j].subjonctif["passé"]
							modelo_salvar.modos[1].tempos[2].conjugacoes = verbos[j].subjonctif["imparfait"]
							modelo_salvar.modos[1].tempos[3].conjugacoes = verbos[j].subjonctif["plus-que-parfait"]

							modelo_salvar.modos[2].tempos[0].conjugacoes = verbos[j].conditionnel["présent"]
							modelo_salvar.modos[2].tempos[1].conjugacoes = verbos[j].conditionnel["passé 1ère forme"]

							modelo_salvar.modos[3].tempos[0].conjugacoes = verbos[j].impératif["présent"]

							await acesso.salva_verbos(idioma, modelo_salvar)
						}
					}
				}
			}

		await acesso.salva_lista_verbos_idiomas(verbos_todos)
	},
	
	italiano: async (req, res) => {
		
		const idioma = 'italiano'

		// Cópia profunda do modelo_salvar, super limpão.
		const modelo_salvar_limpao = JSON.parse(JSON.stringify(modelo_salvar))

		const extrairPrimeiraPalavra = (str) => {
		  
		  var palavras = str.split(',') // Dividindo a string pelo delimitador ','
		  return palavras[0] // Retornando a primeira palavra (o primeiro elemento do array)
		}

		const converte_tempo = (modo, tempo) => {
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
		}

		const converte_pessoa = (modo, pessoa) => {
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
		}

		for (let i = 0; i < letras.length; i++) {

			let lista_verbos_sem_parse = await fs.readFileSync(`public/verbos/italiano/categories/${letras[i]}.json`, 'utf8', async (err, data) => {
			  
			  if (err) {
			    console.error(err)
			    return
			  }

			  return data
			})

			const lista_verbos = JSON.parse(lista_verbos_sem_parse)
			
			let verbos_crus = []
			// Aqui loopa em cada um dos verbos desta letra.
		  for (let j = 0; j < lista_verbos.length; j++) {

		  	const verbo_inteiro_sem_parse = await fs.readFileSync(`public/verbos/italiano/content/${letras[i]}/${lista_verbos[j]}.json`, 'utf8', (err_2, data_conj) => {
					if (err_2) {
					  console.error(err_2);
					  return;
					}

					return data_conj
		  	})

		  	const verbo_inteiro = JSON.parse(verbo_inteiro_sem_parse)
		  	verbos_crus.push(verbo_inteiro)
			}
					
			for (let j = 0; j < verbos_crus.length; j++) {

				let verbo_cru = verbos_crus[j]

				// Se o verbo é valido...
				if (verbo_cru.conjugations) {
								
					let infinitivo_string = verbo_cru.conjugations[0].value // Primeiramente achamos o infinitivo.
					let traducao_infinitivo_pt = ''

					let eh_popular = 'nao'
					for (let k = 0; k < verbos_comuns.length; k++) {

						// Acha o idioma da vêz.
						if (verbos_comuns[k].idioma === idioma) {

							for (let l = 0; l < verbos_comuns[k].verbos.length; l++) {
								if (infinitivo_string === verbos_comuns[k].verbos[l]) {
									eh_popular = 'sim'
									traducao_infinitivo_pt = verbos_comuns[k].verbos_em_pt[l]
								}
							}
						}
					}
						  	
					if (eh_popular === 'sim') {

						modelo_salvar = JSON.parse(JSON.stringify(modelo_salvar_limpao))

						// Agora é necessário visitar cada um dos verbos_crus válidos...
						// ...e preencher o modelo_salvar com os dados do verbo_cru da vêz.
						modelo_salvar.infinitivo = infinitivo_string
						modelo_salvar.traducao_pt = traducao_infinitivo_pt

						// Primeiro e fora de tudo, salvamos o infinitivo, gerúndio e particípio.
						for (let k = 0; k < verbo_cru.conjugations.length; k++) {

							if (verbo_cru.conjugations[k].group === 'pastparticiple/singular' && verbo_cru.conjugations[k].form === 'masculine' || verbo_cru.conjugations[k].group === 'pastparticiple/masculine' || verbo_cru.conjugations[k].group === 'pastparticiple') {

								// O particípio no ITALIANO, às vezes tem duas formas.
								// Para facilitar, utilizaremos apenas a primeira.
								// Com o tempo, podemos colocar a segunda também, mas isso mais pra frente.

								// Aqui, as duas formas são separadas por vírgula, logo, da vírgula pro fim, apagamos,
								// inclusive a vírgula.

								var primeiraPalavra = extrairPrimeiraPalavra(verbo_cru.conjugations[k].value)
								
								modelo_salvar.participio = primeiraPalavra
							}

							if (verbo_cru.conjugations[k].group === 'gerund') {
								modelo_salvar.gerundio = verbo_cru.conjugations[k].value
							}
						}

						let forma = ''

						for (let k = 0; k < regras.modos.length; k++) {
							for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
								for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
												
									let tem_conjugado = 'nao'
									// o n começa e acaba aqui, pode usar denovo tranquilo.
									for (let n = 0; n < regras.modos[k].ordenacao[l].elementos.length; n++) {

										if (regras.modos[k].ordenacao[l].elementos[n] === 'conjugado') tem_conjugado = 'sim'
									}

									// forma é a pessoa em inglês dos verbos que baixei.
									if (tem_conjugado === 'sim') {

										let grupo = converte_tempo(regras.modos[k].modo, regras.modos[k].ordenacao[l].tempos[m])

										for (let n = 0; n < regras.modos[k].ordenacao[l].pessoas.length; n++) {
											forma = converte_pessoa(regras.modos[k].modo, regras.modos[k].ordenacao[l].pessoas[n])

											let valor = verbo_cru.conjugations.find((a) => {
												return a.group === grupo && a.form === forma
											})

											valor = valor.value

											for (let o = 0; o < modelo_salvar.modos.length; o++) {

												if (modelo_salvar.modos[o].modo === regras.modos[k].modo) {
													for (let p = 0; p < modelo_salvar.modos[o].tempos.length; p++) {

														if (modelo_salvar.modos[o].tempos[p].tempo === regras.modos[k].ordenacao[l].tempos[m]) {

															if (modelo_salvar.modos[o].modo === 'imperativo') {
																valor = extrairPrimeiraPalavra(valor)
															}

															// Aqui salva o valor do conjugado.
															modelo_salvar.modos[o].tempos[p].conjugacoes.push(valor)
														}
													}
												}
											}
										}
									}
								}
							}
						}

						// PRIMEIRO - Tem que descomentar para salvar o verbo
						await acesso.salva_verbos(idioma, modelo_salvar)

						// Esse forzinho aqui preenche a lista.
						for (let k = 0; k < verbos_todos.lista.length; k++) {
							if (verbos_todos.lista[k].letra === letras[i]) {
								verbos_todos.lista[k].verbos.push(modelo_salvar.infinitivo)
							}
						}
					}
				}
			}
		}

		// SEGUNDO - Tem que descomentar pra salvar a lista
		await acesso.salva_lista_verbos_idiomas(verbos_todos)
	},

	portugues: async (req, res) => {
		const idioma = 'portugues'

		// Cópia profunda do modelo_salvar, super limpão.
		const modelo_salvar_limpao = JSON.parse(JSON.stringify(modelo_salvar))


		const converte_tempo = (modo, tempo) => {
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
		}

		const converte_pessoa = (modo, pessoa) => {
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
		}



		for (let i = 0; i < letras.length; i++) {

			let lista_verbos_sem_parse = await fs.readFileSync(`public/verbos/portugues/categories/${letras[i]}.json`, 'utf8', async (err, data) => {
			  
			  if (err) {
			    console.error(err)
			    return
			  }

			  return data
			})

			const lista_verbos = JSON.parse(lista_verbos_sem_parse)
			
			let verbos_crus = []
			// Aqui loopa em cada um dos verbos desta letra.
		  for (let j = 0; j < lista_verbos.length; j++) {

		  	const verbo_inteiro_sem_parse = await fs.readFileSync(`public/verbos/portugues/content/${letras[i]}/${lista_verbos[j]}.json`, 'utf8', (err_2, data_conj) => {
					if (err_2) {
					  console.error(err_2);
					  return;
					}

					return data_conj
		  	})

		  	const verbo_inteiro = JSON.parse(verbo_inteiro_sem_parse)
		  	verbos_crus.push(verbo_inteiro)
			}

			for (let j = 0; j < verbos_crus.length; j++) {

				let verbo_cru = verbos_crus[j]

				// Se o verbo é valido...
				if (verbo_cru.conjugations) {

					let infinitivo_string = verbo_cru.conjugations[0].value // Primeiramente achamos o infinitivo.

					// Se for um verbo popular, dizemos que lo-é e pegamos a tradução dele no infinitivo em português.
					let eh_popular = 'nao'
					let traducao_infinitivo_pt = ''
					for (let k = 0; k < verbos_comuns.length; k++) {

						// Acha o idioma da vêz.
						if (verbos_comuns[k].idioma === idioma) {

							for (let l = 0; l < verbos_comuns[k].verbos.length; l++) {
								if (infinitivo_string === verbos_comuns[k].verbos[l]) {
									eh_popular = 'sim'
									traducao_infinitivo_pt = verbos_comuns[k].verbos_em_pt[l]
								}
							}
						}
					}

					// Continuamos...

					if (eh_popular === 'sim') {

						modelo_salvar = JSON.parse(JSON.stringify(modelo_salvar_limpao))

						console.log(`eh_popular: ${modelo_salvar.infinitivo}`)

						// Agora é necessário visitar cada um dos verbos_crus válidos...
						// ...e preencher o modelo_salvar com os dados do verbo_cru da vêz.

						// Primeiro e fora de tudo, salvamos o infinitivo, gerúndio e particípio.
						for (let k = 0; k < verbo_cru.conjugations.length; k++) {

							// Aqui, em pt é infinitive/impersonal e es é infinitive solamente.
							if (verbo_cru.conjugations[k].group === 'infinitive/impersonal') {
								modelo_salvar.infinitivo = verbo_cru.conjugations[k].value
								modelo_salvar.traducao_pt = traducao_infinitivo_pt
							}


							// Salva o gerúndio e o particípio.
							if (verbo_cru.conjugations[k].group === 'pastparticiple/singular' && verbo_cru.conjugations[k].form === 'masculine') {
								modelo_salvar.participio = verbo_cru.conjugations[k].value
							}

							if (verbo_cru.conjugations[k].group === 'gerund') {
								modelo_salvar.gerundio = verbo_cru.conjugations[k].value
							}
			
						}

						let forma = ''

						for (let k = 0; k < regras.modos.length; k++) {
							for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
								for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
											
									let tem_conjugado = 'nao'
									// o n começa e acaba aqui, pode usar denovo tranquilo.
									for (let n = 0; n < regras.modos[k].ordenacao[l].elementos.length; n++) {

										if (regras.modos[k].ordenacao[l].elementos[n] === 'conjugado') tem_conjugado = 'sim'
									}

									// forma é a pessoa em inglês dos verbos que baixei.
									if (tem_conjugado === 'sim') {

										let grupo = converte_tempo(regras.modos[k].modo, regras.modos[k].ordenacao[l].tempos[m])

										for (let n = 0; n < regras.modos[k].ordenacao[l].pessoas.length; n++) {
											forma = converte_pessoa(regras.modos[k].modo, regras.modos[k].ordenacao[l].pessoas[n])

											let valor = verbo_cru.conjugations.find((a) => {
												return a.group === grupo && a.form === forma
				 							})

											console.log(valor)
											valor = valor.value

											// Esse modelo salvar, tem que salvar novo, não repetir tudo.

											for (let o = 0; o < modelo_salvar.modos.length; o++) {

												if (modelo_salvar.modos[o].modo === regras.modos[k].modo) {
													for (let p = 0; p < modelo_salvar.modos[o].tempos.length; p++) {
														if (modelo_salvar.modos[o].tempos[p].tempo === regras.modos[k].ordenacao[l].tempos[m]) {

															// Aqui salva o valor do conjugado.
															modelo_salvar.modos[o].tempos[p].conjugacoes.push(valor)
														}
													}
												}
											}
										}
									}
								}
							}
						}


						// PRIMEIRO - Tem que descomentar para salvar o verbo
					await acesso.salva_verbos(idioma, modelo_salvar)


					// Esse forzinho aqui preenche a lista.
					for (let k = 0; k < verbos_todos.lista.length; k++) {
						if (verbos_todos.lista[k].letra === letras[i]) {
							verbos_todos.lista[k].verbos.push(modelo_salvar.infinitivo)
						}
					}
					}
					
				}
			}
		}
	

		// SEGUNDO - Tem que descomentar pra salvar a lista
		await acesso.salva_lista_verbos_idiomas(verbos_todos)

		

	},

	espanhol: async (req, res) => {

		const idioma = 'espanhol'

		const extrai_tu_do_vos = (str) => {
			
			const palavra = str.split(' (') // Dividindo a string pelo delimitador ','
		  return palavra[0] // Retornando a primeira palavra (o primeiro elemento do array)
		}

		// Cópia profunda do modelo_salvar, super limpão.
		const modelo_salvar_limpao = JSON.parse(JSON.stringify(modelo_salvar))

		const converte_tempo = (modo, tempo) => {

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
		}

		const converte_pessoa = (modo, pessoa) => {

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
		}

		for (let i = 0; i < letras.length; i++) {

			let lista_verbos_sem_parse = await fs.readFileSync(`public/verbos/espanhol/categories/${letras[i]}.json`, 'utf8', async (err, data) => {
			  
			  if (err) {
			    console.error(err)
			    return
			  }

			  return data
			})


			const lista_verbos = JSON.parse(lista_verbos_sem_parse)

			let verbos_crus = []
			// Aqui loopa em cada um dos verbos desta letra.
		  for (let j = 0; j < lista_verbos.length; j++) {

		  	const verbo_inteiro_sem_parse = await fs.readFileSync(`public/verbos/espanhol/content/${letras[i]}/${lista_verbos[j]}.json`, 'utf8', (err_2, data_conj) => {
					if (err_2) {
					  console.error(err_2);
					  return;
					}

					return data_conj
		  	})

		  	const verbo_inteiro = JSON.parse(verbo_inteiro_sem_parse)
		  	verbos_crus.push(verbo_inteiro)
			}
		
			for (let j = 0; j < verbos_crus.length; j++) {

				let verbo_cru = verbos_crus[j]

				// Se o verbo é valido...
				if (verbo_cru.conjugations) {
					
					let infinitivo_string = verbo_cru.conjugations[0].value // Primeiramente achamos o infinitivo.

					// Se for um verbo popular, dizemos que lo-é e pegamos a tradução dele no infinitivo em português.
					let eh_popular = 'nao'
					let traducao_infinitivo_pt = ''
					for (let k = 0; k < verbos_comuns.length; k++) {

						// Acha o idioma da vêz.
						if (verbos_comuns[k].idioma === idioma) {

							for (let l = 0; l < verbos_comuns[k].verbos.length; l++) {
								if (infinitivo_string === verbos_comuns[k].verbos[l]) {
									eh_popular = 'sim'
									traducao_infinitivo_pt = verbos_comuns[k].verbos_em_pt[l]
								}
							}
						}
					}
					
					if (eh_popular === 'sim') {

						modelo_salvar = JSON.parse(JSON.stringify(modelo_salvar_limpao))

						// Agora é necessário visitar cada um dos verbos_crus válidos...
						// ...e preencher o modelo_salvar com os dados do verbo_cru da vêz.

						// Primeiro e fora de tudo, salvamos o infinitivo, gerúndio e particípio.
						for (let k = 0; k < verbo_cru.conjugations.length; k++) {

							// Aqui, em pt é infinitive/impersonal e es é infinitive solamente.
							if (verbo_cru.conjugations[k].group === 'infinitive') {
								modelo_salvar.infinitivo = verbo_cru.conjugations[k].value
								modelo_salvar.traducao_pt = traducao_infinitivo_pt
							}

							// Salva o gerúndio e o particípio.
							if (verbo_cru.conjugations[k].group === 'pastparticiple/singular' && verbo_cru.conjugations[k].form === 'masculine') {
								modelo_salvar.participio = verbo_cru.conjugations[k].value
							}

							if (verbo_cru.conjugations[k].group === 'gerund') {
								modelo_salvar.gerundio = verbo_cru.conjugations[k].value
							}
		
						}

						let forma = ''

						for (let k = 0; k < regras.modos.length; k++) {
							for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
								for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
												
									let tem_conjugado = 'nao'
									// o n começa e acaba aqui, pode usar denovo tranquilo.
									for (let n = 0; n < regras.modos[k].ordenacao[l].elementos.length; n++) {

										if (regras.modos[k].ordenacao[l].elementos[n] === 'conjugado') tem_conjugado = 'sim'
									}

									// forma é a pessoa em inglês dos verbos que baixei.
									if (tem_conjugado === 'sim') {

										let grupo = converte_tempo(regras.modos[k].modo, regras.modos[k].ordenacao[l].tempos[m])

										for (let n = 0; n < regras.modos[k].ordenacao[l].pessoas.length; n++) {
											forma = converte_pessoa(regras.modos[k].modo, regras.modos[k].ordenacao[l].pessoas[n])

											let valor = verbo_cru.conjugations.find((a) => {
												return a.group === grupo && a.form === forma
				 							})

											valor = valor.value

											// Essa extração do tu e do vos se dá devido a dupla conjugação, uma do tu e outra do vos.
											// que no banco de dados que estou usando, estão na mesma linha.
											// Assim, utilizamos apenas a do tú e ignoramos a do vós.
											// Mais pra frente dará para usar as duas, mas até lá, vai assim msm.
											const pessoa_da_vez = regras.modos[k].ordenacao[l].pessoas[n]
											if (pessoa_da_vez === 'tú') valor = extrai_tu_do_vos(valor)

											// Esse modelo salvar, tem que salvar novo, não repetir tudo.

											for (let o = 0; o < modelo_salvar.modos.length; o++) {

												if (modelo_salvar.modos[o].modo === regras.modos[k].modo) {
													for (let p = 0; p < modelo_salvar.modos[o].tempos.length; p++) {
														if (modelo_salvar.modos[o].tempos[p].tempo === regras.modos[k].ordenacao[l].tempos[m]) {

															// Aqui salva o valor do conjugado.
															modelo_salvar.modos[o].tempos[p].conjugacoes.push(valor)
														}
													}
												}
											}
										}
									}
								}
							}
						}

						// PRIMEIRO - Tem que descomentar para salvar o verbo
						await acesso.salva_verbos(idioma, modelo_salvar)

						console.log("Vai limpar o modelo_salvar com o limpão.")



						// Esse forzinho aqui preenche a lista.
						for (let k = 0; k < verbos_todos.lista.length; k++) {
							if (verbos_todos.lista[k].letra === letras[i]) {
								verbos_todos.lista[k].verbos.push(modelo_salvar.infinitivo)
							}
						}
					}
				}
			}
		}

		// SEGUNDO - Tem que descomentar pra salvar a lista
		await acesso.salva_lista_verbos_idiomas(verbos_todos)

	},




	alemao: async (req, res) => {
		const idioma = 'alemao'

		

	}
}