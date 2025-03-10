function xeca_mexido (obj) {

	mexidos.push(obj)

	// Somente 4 possíveis mexidos

	// * Altera palavra
	// * Altera termo
	// * Exclui palavra e termos
	// * Exclui termo


	// Na curadoria,
	// 	retirar os altera palavra que tenham um exclui palavra e termos com o mesmo id.
	// 	retirar os altera termo que tenham um exclui termo com o mesmo id.

	// console.log(obj)
	/*

  let ja_foi_mexido = 'nao'

  for (let i = 0; i < mexidos.length; i++) {

  	if (tipo === 'capitulo') {
  		
    	if (acao === 'cria') {
    		id_item = id_capitulo
    	}

    	if (acao === 'exclui') {

    		let ja_foi_mexido = 'nao'

			  for (let i = 0; i < mexidos.length; i++) {
			    if (mexidos[i].tipo == "capitulo" & mexidos[i].acao == "exclui" & id_capitulo == id_capitulo) {
			      ja_foi_mexido = 'sim'
			    }
			  }

			  // Aqui, como excluiu um capitulo inteiro, qualquer alteração nesse capítulo, seja nele msm ou em palavras nele modificadas, são ignoradas.
			  for (let i = 0; i < mexidos.length; i++) {

			    if (mexidos[i].tipo === 'palavra' & mexidos[i].id_capitulo === id_capitulo) {
			      mexidos.splice(i, 1)
			      i--
			    } else if (mexidos[i].tipo === 'capitulo' & mexidos[i].id_capitulo === id_capitulo & mexidos[i].acao === 'cria' || mexidos[i].tipo === 'capitulo' & mexidos[i].id_capitulo === id_capitulo & mexidos[i].acao === 'altera_texto') {
			      mexidos.splice(i, 1)
			      i--
			    }
			  }
    	}

    	if (acao === 'altera_texto') {
    		const id_capitulo = obj_teste.capitulos[cap_i_ativo]._id
			  let ja_foi_mexido = 'nao'
			  for (let i = 0; i < mexidos.length; i++) {
			    if (mexidos[i].tipo == "capitulo" & mexidos[i].acao == "altera_texto" & id_capitulo == id_capitulo) {
			      ja_foi_mexido = 'sim'
			    }
			  }
    	}
    }

    if (tipo === 'palavra_e_termos') {

      if (acao === 'exclui') {
      	if (mexidos[i].id_capitulo == id_capitulo & mexidos[i].id_item == id_item) {
          ja_foi_mexido = 'sim'
        }

        if (!id_deste_item.includes('recem_criado__')) {
			  	if (ja_foi_mexido == 'nao') mexidos.push({ tipo: "palavra", acao: "exclui", id_capitulo: id_deste_cap, id_item: id_deste_item })
			  		ja_foi_mexido = 'sim'
			  }
			        }
    }

    if (tipo === 'palavra') {

    	if (acao === 'modifica') {
        if (mexidos[i].id_capitulo == id_capitulo & mexidos[i].id_item == id_item) {
          ja_foi_mexido = 'sim'
        }
      }

    }

    if (tipo === 'outro_termo') {
    	if (acao === 'modifica') {
				if (mexidos[i].id_capitulo == id_capitulo & mexidos[i].id_item == id_item) {
          ja_foi_mexido = 'sim'
        }
    	}
    	if (acao === 'excluiu') {

    	}
    }



  }

  if (ja_foi_mexido == 'nao') mexidos.push({
    tipo: tipo,
    acao: acao,
    id_capitulo: id_capitulo,
    id_item: id_item
  })

  	*/
}

// * Transformar os palavra em item ou outro_termo

// É NECESSÁRIO COLOCAR NESSE MEXIDOS AQUI O IDIOMA QUE FOI MEXIDA A PARADA.

function analisa_mexidos_2 () {

	mexidos.map()
	for (let i = 0; i < mexidos.length; i++) {
		if (mexidos[i].acao === 'exclui' & mexidos[i].tipo === 'outro_termo') {


			for (let j = 0; j < mexidos.length; j++) {

			}


			if (mexidos[j].id_item === mexidos[i].id_item & mexidos[j].acao === 'modifica') {
				mexidos.splice(j, 1)
				      j--
				      i--
						}
		}

	}
}



// Se os dados forem capitulo:
// 	- Deletar: Apagar os registros anteriores de todos os itens deste capítulo.

// Se os dados forem capitulo:
// 	- Deletar: Apagar os registros anteriores de todos os itens deste capítulo. Inclusive os deletar.

// Se os dados for outro_termo:
// 	- Deletar: Apagar os registros anteriores deste outro termo.

// Se for palavra:
// 	- Deletar: Apaga os registros desta palavra e dos termos desta palavra.

// Se for palavra_e_termos:
// 	- Deletar: Aí já no lo sê.


// O certo é enviar a palavra e a marcação, se é palavra ou se é termo. Se é capítulo. Qualquer coisa.
// Mandar todas as alterações e o servidor fará o que for necessário.

// O negócio é exibir uma lista no cliente ao clicar no Log de Coisas e mostrar todas as coisas feitas, numa lista
// Só depois tratar as duplicidades e demais paradas, as modificações seguidas de exclusões, etc. Mas primeiro mostrar tudo.


// Aqui excluimos todos as alterações dos itens deste capitulo mas mantemos o capitlo de tipo == 'exclui'.
// Pode ser que mais pra frente eu faça com que esta informação seja útil.
function analisa_deletar_capitulo () {

	// Copiamos a arraya mexidos, para não dar xabú nesse loop ao excluirmos os itens necessários da arraya original.
	let mexidos_copia = JSON.parse(JSON.stringify(mexidos))
	
	for (let i = 0; i < mexidos_copia.length; i++) {
		if (mexidos_copia[i].tipo === 'capitulo' & mexidos_copia[i].acao === 'exclui') {

			for (let j = 0; j < mexidos.length; j++) {
				if (mexidos[j].id_cap === mexidos_copia[i].id_cap & mexidos[j].tipo != 'capitulo') {
					mexidos.splice(j, 1)
				  j--
				}
			}
		}
	}
}


function analisa_deletar_palavras_e_termos () {
	
	// Copiamos a arraya mexidos, para não dar xabú nesse loop ao excluirmos os itens necessários da arraya original.
	let mexidos_copia = JSON.parse(JSON.stringify(mexidos))

	// Primeiramente verificamos se o item de alteração é sobre uma exclusão de palavra ou termo.
	// Se for, eliminamos todas as marcações de modificação que este item recebeu, pois ele vai ser excluído mesmo.
	for (let i = 0; i < mexidos_copia.length; i++) {

		if (mexidos_copia[i].tipo === 'palavra_e_termos' & mexidos_copia[i].acao === 'exclui') {

			for (let j = 0; j < mexidos.length; j++) {
				if (mexidos[j].id_item === mexidos_copia[i].id_item & mexidos[j].acao === 'modifica') {
					mexidos.splice(j, 1)
		    	j--
				}
			}
		}
	}



}

function analisa_mexidos () {

	// Primeiro, setamos se foi criada ou modificada.
	for (let i = 0; i < mexidos.length; i++) {
		if (mexidos[i].tipo === 'palavra' || mexidos[i].tipo === 'outro_termo') {
			if (mexidos[i].id_item.includes('recem_criado__')) mexidos[i]["condicao"] = 'criada'
			if (!mexidos[i].id_item.includes('recem_criado__')) mexidos[i]["condicao"] = 'modificada'
		}
	}

	analisa_deletar_capitulo()
	analisa_deletar_palavras_e_termos()
	// analisa_deletar_outro_termo()


	for (let i = 0; i < mexidos.length; i++) {

		console.log(mexidos[i])

		if (mexidos[i].tipo === 'outro_termo') {

			if (mexidos[i].acao === 'exclui') {

				// Limpa todas as alterações anteriores deste item, já que o msm será excluido, não adianta nem alterar.

				for (let j = 0; j < mexidos.length; j++) {

					if (mexidos[i]) {

						if (mexidos[j].id_item === mexidos[i].id_item & mexidos[j].acao === 'modifica') {
							mexidos.splice(j, 1)
				      j--
						}
					}
				}

				// E se for um item recém criado, exclui o excluir também.
				if (mexidos[i].id_item.includes('recem_criado__')) {
					mexidos.splice(i, 1)
			    i--
				}

			}

			if (mexidos[i].acao === 'modifica') {

				// Limpa possíveis outras modificações que este item tenha sofrido.
				for (let j = 0; j < mexidos.length; j++) {

					if (mexidos[i]) {
						if (mexidos[j].id_item === mexidos[i].id_item & mexidos[j].acao === 'modifica' & j != i) {
							mexidos.splice(j, 1)
				    	j--
						}
					}
				}

			}

		}

		if (mexidos[i].tipo === 'palavra') {
			if (mexidos[i].acao === 'modifica') {

				// Limpa possíveis outras modificações que este item tenha sofrido.
				for (let j = 0; j < mexidos.length; j++) {
					if (mexidos[i]) {

						if (mexidos[j].id_item === mexidos[i].id_item & mexidos[j].acao === 'modifica' & j != i) {
							mexidos.splice(j, 1)
				    	j--
						}
					}
				}

			}
		}

		if (mexidos[i].tipo === 'palavra_e_termos') {
			if (mexidos[i].acao === 'exclui') {

				for (let j = 0; j < mexidos.length; j++) {


						if (mexidos[j].id_item === mexidos[i].id_item & mexidos[j].acao === 'modifica' & j != i) {
							mexidos.splice(j, 1)
				    	j--
						}

				}
			}
		}

		if (mexidos[i].tipo === 'capitulo') {
			if (mexidos[i].acao === 'exclui') {

				// Apagamos todos as alterações de items deste capitulo, já que o mesmo foi excluido completamente.
				for (let j = 0; j < mexidos.length; j++) {

					if (mexidos[j].id_cap === mexidos[i].id_cap & mexidos[i].tipo != 'capitulo') {
						mexidos.splice(j, 1)
				   	j--
					}
					
				}
			}
		}


	}
}

// Esta criando duas entradas repetidas para a criação de uma palavra nova.

function log_de_coisas () {
	console.log("Log de coisas")
	console.log(mexidos)
}

function mostra_mexidos() {
	console.log("mostra_mexidos()")
	analisa_mexidos()
	console.log(mexidos)
}