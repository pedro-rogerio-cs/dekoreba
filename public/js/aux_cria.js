function alterna_edita_div (n_idi, item_i, coluna_i, i_cor, tipo) {

	const item_voc = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
	const item = (n_idi === 1) ? item_voc.idioma_1[coluna_i] : item_voc.idioma_2[coluna_i]

  const soma = conta_sist_escr(n_idi)
  const soma_ativos = (n_idi === 1) ? soma.ativos : soma.ativos

	const recip  = document.getElementById(`recip_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}`)

	const valor_input = item.item

	recip.innerHTML = `
		<input id="input_editavel_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}" type="text" class="input_texto cria_palavra item_cap_${cap_i_ativo} item_idioma_${n_idi} t${soma_ativos}_palavra sist_escri_${i_cor} cria_item_${n_idi}" value="${valor_input}" onchange="altera_palavra(this.value, ${cap_i_ativo}, ${item_i}, 'idioma_${n_idi}', ${i_cor - 1}, ${coluna_i}, '${tipo}')" onfocusout="tira_foco_input_palavra(${n_idi}, ${item_i}, ${coluna_i}, ${i_cor})" onkeyup="if(event.keyCode == 9) cria_input_digita(${n_idi}, ${cap_i_ativo}, ${item_i}, ${coluna_i}, ${i_cor}, '${tipo}')"/>
	`

	const input = document.getElementById(`input_editavel_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}`)

	input.selectionStart = input.selectionEnd = input.value.length
	input.focus()
			
}

function tira_foco_input_palavra (n_idi, item_i, coluna_i, i_cor) {
	
	const soma = conta_sist_escr(n_idi)
  const soma_ativos = (n_idi === 1) ? soma.ativos : soma.ativos

	const item_voc = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
	const item = (n_idi === 1) ? item_voc.idioma_1[coluna_i] : item_voc.idioma_2[coluna_i]
  
  const descricao = (item.descricao) ? item.descricao : ''

	const recip  = document.getElementById(`recip_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}`)
	recip.innerHTML = `
		<div id="input_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}" type="text" class="cria_palavra item_cap_${cap_i_ativo} item_idioma_${n_idi} t${soma_ativos}_palavra sist_escri_${i_cor} cria_item_idi_${n_idi}" placeholder="Palavra em Idioma ${n_idi}" onclick="alterna_edita_div(${n_idi}, ${item_i}, ${coluna_i}, ${i_cor})">
			<span>${item.item}</span>
			<span class="dom_descricao">${descricao}</span>
		</div>
	`
}

function popup_descricao (item_i, n_idi, coluna_i) {

	const recipao = document.getElementById('recip_popup_descricao_fora')
	recipao.style.display = (recipao.style.display === 'none') ? 'flex' : 'none'

	let item_voc = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
	let item = (n_idi === 1) ? item_voc.idioma_1[coluna_i] : item_voc.idioma_2[coluna_i]

	let descricao = ''
	if (item.descricao) {
		if (item.descricao != '') descricao = item.descricao
	}

	let recipinho = document.getElementById('recip_popup_descricao_dentro')
	recipinho.innerHTML = `
		<input id="input_descricao" type="text" class="input_texto" style="border: 1px solid grey;" placeholder="Escreva aqui a descrição" value="${descricao}"/>
	   	<div class="flex_row T1 center">
	    <button class="botao" onclick="popup_descartar()">Descartar alterações</button>
	    <button class="botao" onclick="popup_salvar(${item_i}, ${n_idi}, ${coluna_i})">Salvar</button>
	  </div>
	`
}

function popup_salvar (item_i, n_idi, coluna_i) {

	let item_voc = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
	let item = (n_idi === 1) ? item_voc.idioma_1[coluna_i] : item_voc.idioma_2[coluna_i]

	const descricao = document.getElementById('input_descricao').value
	if (descricao != '') item["descricao"] = descricao

	document.getElementById('recip_popup_descricao_fora').style.display = 'none'
	document.getElementById('input_descricao').value = ''

	const recip = document.getElementById(`input_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}`)
	recip.innerHTML = `<span>${item.item}</span><span class="dom_descricao">${descricao}</span>`

	let botao_add_descricao = document.getElementById(`div_botao_add_descricao_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${coluna_i}`)

	// Mudar o Adiciona descricao pra altera descrição, se necessário.
	botao_add_descricao.innerHTML = (descricao != '') ? 'Alterar descrição' : 'Adicionar descrição'

	if (descricao === '') {
		delete item["descricao"]
	}




  // Esse for abaixo verifica se o ícone do menú é preenchido ou vazado.
    
  let botao = document.getElementById(`icone_menu_linha_cap${cap_i_ativo}_item${item_i}`)

  for (let i = 0; i < item_voc.idioma_1.length; i++) {

    if (item_voc.idioma_1[i].tipo != 'palavra' || item_voc.idioma_1[i].descricao) {
      troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      return
    }
  }

  for (let i = 0; i < item_voc.idioma_2.length; i++) {

    if (item_voc.idioma_2[i].tipo != 'palavra' || item_voc.idioma_2[i].descricao) {
      troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      return
    }
  }


  troca_classe (botao, 'icon-th-thumb', 'icon-th-thumb-empty')





    



}

function popup_descartar () {
	document.getElementById('recip_popup_descricao_fora').style.display = 'none'
	document.getElementById('input_descricao').value = ''
} 

function fecha_popup_descricao () {
	popup_descartar ()
}

function fecha_popup_verbo () {
	document.getElementById('recip_popup_verbo').style.display = 'none'
	// document.getElementById('')
}

function insere_sigla_som (idioma, n_idioma) {

	// let idioma_sigla_som = (n_idioma === 1) ? obj_teste.idioma_1_sigla_som : obj_teste.idioma_2_sigla_som
	
	let idioma_sigla_som
	for (let i = 0; i < obj_idiomas_alfabetos.length; i++) {
	 	if (obj_idiomas_alfabetos[i].idioma === idioma) idioma_sigla_som = obj_idiomas_alfabetos[i].sigla_som
	}

	if (n_idioma === 1) obj_teste.idioma_1_sigla_som = idioma_sigla_som
	if (n_idioma === 2) obj_teste.idioma_2_sigla_som = idioma_sigla_som
	
}

function faz_alfabetos_inicio (obj_idiomas_alfabetos, n_idioma) {

  let string_alfabetos = ''

  for (let i = 0; i < obj_idiomas_alfabetos.length; i++) {

	  // Aqui roda um pra cada alfabeto.
	  // Se tiver no obj_teste.sis... é ativo, senão tiver, é inativo.

	  const obj_sistemas_e = (n_idioma === 1) ? obj_teste.idioma_1_sistemas_escrita : obj_teste.idioma_2_sistemas_escrita

	  let sistema_ativo = 'inativo'
	  for (let j = 0; j < obj_sistemas_e.length; j++) {
	    if (obj_sistemas_e[j].sistema === obj_idiomas_alfabetos[i]) sistema_ativo = 'ativo'
	  }

	  let alfabeto_atividade
	  if (sistema_ativo === 'inativo') alfabeto_atividade = `alfabeto_inativo sist_escri_${i + 1}_inativo`
	  if (sistema_ativo === 'ativo') alfabeto_atividade = `alfabeto_ativo sist_escri_${i + 1}_ativo`

	  string_alfabetos += `<div class="flex_row center botao_sist_escrita idi_${n_idioma} ${alfabeto_atividade}" onclick="altera_sist_escrita(this)">${alfabetos[obj_idiomas_alfabetos[i]]}</div>`

  }
	
	return string_alfabetos
}

function faz_alfabetos (obj_idiomas_alfabetos, n_idioma) {
 
 	let string_alfabetos = ''
  for (let i = 0; i < obj_idiomas_alfabetos.length; i++) {
    
    let alfabeto_atividade
  	if (i === 0) alfabeto_atividade = `alfabeto_ativo sist_escri_${i + 1}_ativo`
  	if (i != 0) alfabeto_atividade = `alfabeto_inativo sist_escri_${i + 1}_inativo`

  	string_alfabetos += `<div class="flex_row center botao_sist_escrita idi_${n_idioma} ${alfabeto_atividade}" onclick="altera_sist_escrita(this)">${alfabetos[obj_idiomas_alfabetos[i]]}</div>`
  }

  return string_alfabetos
}

function limpa_sistemas_escritas_obj_teste (n_idioma) {
	if (n_idioma === 1) {
    for (let i = 0; i < obj_teste.idioma_1_sistemas_escrita; i++) {
      obj_teste.idioma_1_sistemas_escrita.splice(0, 1)
    }

    obj_teste.idioma_1_sistemas_escrita.length = 0
  }
  if (n_idioma === 2) {
    for (let i = 0; i < obj_teste.idioma_2_sistemas_escrita; i++) {
  	  obj_teste.idioma_2_sistemas_escrita.splice(0, 1)
    }

    obj_teste.idioma_2_sistemas_escrita.length = 0
  }
}

function insere_sist_esc_obj_teste (botoes, n_idioma) {
  // Coloca o alfabeto principal no obj_teste.idioma_1_sistemas_escrita ou obj_teste.idioma_2_sistemas_escrita

	for (let i = 0; i < botoes.length; i++) {
    if (botoes[i].classList.contains('alfabeto_ativo')) {

      const alfabeto_da_vez = reconhece_sist_escrita(botoes[i].innerHTML)

      if (n_idioma == 1) {
        obj_teste.idioma_1_sistemas_escrita.length = []
        obj_teste.idioma_1_sistemas_escrita.push({ sistema: alfabeto_da_vez })
      }
      if (n_idioma == 2) {
        obj_teste.idioma_2_sistemas_escrita.length = []
        obj_teste.idioma_2_sistemas_escrita.push({ sistema: alfabeto_da_vez })
      }
    }
  }
}

function insere_termos_obj_muda_alfabeto (n_idioma, alfabeto) {

	const soma_sistemas = conta_sist_escr(n_idioma)
	let itens_novos = []

	console.log("soma_sistemas.ativos: " + soma_sistemas.ativos)

  for (let i = 0; i < obj_teste.capitulos.length; i++) {
    for (let j = 0; j < obj_teste.capitulos[i].vocabulario.length; j++) {

    	itens_novos = []

    	let itens_idioma
    	if (n_idioma === 1) itens_idioma = obj_teste.capitulos[i].vocabulario[j].idioma_1
    	if (n_idioma === 2) itens_idioma = obj_teste.capitulos[i].vocabulario[j].idioma_2

    	let qtd_andada = soma_sistemas.ativos - 2
    	// -2 pq: -1 pq que ativou agora e ainda não tem nada e -1 pq o loop já vai incrementar mais 1 automaticamente.

       for (let k = 0; k < itens_idioma.length; k++) {
       	
		    itens_novos.push({
		      tipo: itens_idioma[k].tipo,
		      item: "",
		      sistema_escrita: alfabeto,
		      arquivo: itens_idioma[k].arquivo
		    })

       	k = k + qtd_andada

      }

      for (let l = 0; l < itens_novos.length; l++) {
      	itens_idioma.push(itens_novos[l])
      }


      // antes de sair, era bom deixar a parada em ordem alfabetica.
			let ordenado = itens_idioma.sort((a, b) => a.tipo.localeCompare(b.tipo))
			itens_idioma = ordenado

    }
	
	}

}
        

function limpa_tudo_troca_idioma () {
	obj_teste.capitulos = [{ informacoes: "", titulo: "", vocabulario: [] }]

  // Limpamos os campos todos desse idioma e das palavras da dekoreba toda.
  document.getElementById('recip_palavras').innerHTML = ''
  document.getElementById('titulo_capitulo').value = ''
  document.getElementById('capitulos_decoreba').value = '' // Select.

  const sele = document.getElementById('capitulos_decoreba')

  const tamanho = sele.length
  for (let i = 0; i < tamanho; i++) {
    document.getElementById('capitulos_decoreba').remove(0) // Sempre remove o item 0, assim tira um por um dos options.
  }

  let opc = document.createElement('option')
	opc.value = 0
  opc.innerHTML = ''
  sele.appendChild(opc)
  sele.value = 0

  sele.style.display = 'none'
}

function aparece_insere_info() { document.getElementById('recip_insere_info').style.display = 'flex' }
function some_insere_info() { document.getElementById('recip_insere_info').style.display = 'none' }

async function salva_dekoreba() {

	analisa_mexidos()

  const decoreba_criada = await vai_filhao_2('decoreba_salva')

  if (decoreba_criada.msg === 'decoreba_salva__nova_decoreba_salva' || decoreba_criada.msg === 'decoreba_salva__decoreba_atualizada') {
    document.getElementById('recip_decoreba_cria').style.display = 'none'
    document.getElementById('recip_decoreba_criada').style.display = 'flex'

    const recip_botao = document.getElementById('recip_bot_decoreba_criada')
    recip_botao.innerHTML = `
      <a href="${servidor}/decoreba_mostra/${decoreba_criada.id_decoreba}">
        <button class="botao">Visualizar Decoreba</button>
      </a>  
    `
  }
  
}

function valida_add_capitulo () {
  
  const ultimo_cap = obj_teste.capitulos.length - 1

	if (obj_teste.capitulos[ultimo_cap].titulo === '') {
    // alert("Por obséquio, preencha o título do capítulo.")
    // return
  }

  // Não pode ter menos de três linhas totalmente preenchidas (item_idioma_1 e item_idioma_2)
  let linhas_preenchidas = 0
  for (let i = 0; i < obj_teste.capitulos[ultimo_cap].vocabulario.length; i++) {

    if (obj_teste.capitulos[ultimo_cap].vocabulario[i].item_idioma_1 != '' && obj_teste.capitulos[ultimo_cap].vocabulario[i].item_idioma_2 != '') {
      linhas_preenchidas++
    }
  }

  if (linhas_preenchidas < 3) {
    /// alert("O capítulo recém criado não pode ficar com menos de 3 palavras.")
    // return false
  }
}

function add_capitulo_select () {
	const novo_cap_i = obj_teste.capitulos.length
  cap_i_ativo = novo_cap_i

  let capitulos = document.getElementById('capitulos_decoreba')
  let opc = document.createElement('option')
  opc.value = `${novo_cap_i}`
  opc.innerHTML = `Novo Capítulo`
  capitulos.appendChild(opc)
  capitulos.value = novo_cap_i
}

function altera_obj_teste () {

}

// insere_palavra() //

function determina_alfabeto_principal (n_idi) {

  const idioma = document.getElementById(`idioma_${n_idi}`)
  const botoes_sist_escr = document.getElementsByClassName(`idi_${n_idi}`)

  // Roda por toda a var global em busca do idioma especifico [i]
	for (let i = 0; i < obj_idiomas_alfabetos.length; i++) {    
    // Quando acha...
    if (obj_idiomas_alfabetos[i].idioma === idioma.value) {

      // Roda por toda a ordem de prioridade desse idioma, começando da mais prioritária.
      // Se achar o return no primeiro loop, significa que o alfabeto principalzão está ativo. Se achar no segundo, quer dizer que o segundo está ativo, e assim por diante, retornando sempre o prioritário possível dentre os ativos.
      for (let j = 0; j < obj_idiomas_alfabetos[i].ordem_prioridade.length; j++) {

        // Roda também por todos os botões, ativos ou não. Hmm
        for (let k = 0; k < botoes_sist_escr.length; k++) {

        	// Conertemos o innerHTML do botão para o sistema de escrita que ele representa
          const sist_escrita_bot = reconhece_sist_escrita(botoes_sist_escr[k].innerHTML)
          
          const contabilidade_sistemas = conta_sist_escr(n_idi) // Pegamos os sistemas ativos no momento

          // Fazemos esse último loop pra saber se o sistema do botão em questã está ativo
          for (let l = 0; l < contabilidade_sistemas.sistemas.length; l++) {
            if (contabilidade_sistemas.sistemas[l].sistema === sist_escrita_bot) {
              if (contabilidade_sistemas.sistemas[l].situacao === 'ativo') {

              	// No primeiro da pri
                if (obj_idiomas_alfabetos[i].alfabetos[obj_idiomas_alfabetos[i].ordem_prioridade[j]] === sist_escrita_bot) {
           
                  alfabeto_principal = obj_idiomas_alfabetos[i].alfabetos[obj_idiomas_alfabetos[i].ordem_prioridade[j]]
                  return alfabeto_principal
                }
              }
            }
          }
        }
      }
    }
  }
}

function valida_nova_palavra (tipo) {
  // Valida que impede inserção de novas palavras sem antes selecionarmos o idioma da parada.

  const idioma_1 = document.getElementById('idioma_1')
  const idioma_2 = document.getElementById('idioma_2')

	if (tipo === 'nova_palavra') {
    if (idioma_1.value === '' || idioma_2.value === '') {
      //alert("Para adicionares palavras à dekoreba, os dois idiomas devem ser selecionados antes.")
      //return
    }
  }
}

function somatoria_outros_termos (soma, idi, item_i) {
	
	let itens_idioma
	if (idi === 'idi_1') itens_idioma = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_1
	if (idi === 'idi_2') itens_idioma = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_2
	
	let qtd_outros_termos = 0

  for (let i = 0; i < itens_idioma.length; i++) {
    if (itens_idioma[i].tipo.includes('outro_termo')) qtd_outros_termos++
  }
  qtd_outros_termos = qtd_outros_termos / soma.ativos

  return qtd_outros_termos
}

function define_tipo_item (idi, soma, item_i) {

		let itens_idioma
	  if (idi === 'idi_1') itens_idioma = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_1
	  if (idi === 'idi_2') itens_idioma = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_2

	  // let qtd_outros_termos = 0

	  let cont = 0
	  let numero = 1

	  for (let i = 0; i < itens_idioma.length; i++) {

	  	if (itens_idioma[i].tipo.includes('outro_termo_')) {

	  		itens_idioma[i].tipo = `outro_termo_${numero}`

	  		cont++
	  		if (cont === soma.ativos) {
	  			cont = 0
	  			numero++
	  		}


	  	}

		}
	  
	  tipo_de_item = `outro_termo_${numero}`
	  
	  return tipo_de_item
}

function define_numero_arquivo (idi) {
	// O procedimento abaixo define o número do arquivo .mp3 da palavra que será criada.
  // Vê todos os arquivos .mp3 numerados já criados neste capítulo e acrescenta +1 ao maior número da lista.
  // Se não tem nenhum arquivo ainda criado neste capítulo então será o arquivo 0.mp3
	
	// Aqui, tanto faz se for palavra ou termo. O negócio tem que ver todos os termos e todos e adicionar um numero a mais. Waréva seja.

  let numeros_arquivos = []

  vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario
  if (vocabulario.length) {
  	for (let i = 0; i < vocabulario.length; i++) {

  		for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {
  			const n_arquivo = vocabulario[i].idioma_1[j].arquivo.replace(".mp3", "")
       	if (n_arquivo != "") numeros_arquivos.push(Number(n_arquivo))
  		}
  		
  		for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {
  			const n_arquivo = vocabulario[i].idioma_2[j].arquivo.replace(".mp3", "")
       	if (n_arquivo != "") numeros_arquivos.push(Number(n_arquivo))
  		}
 		}

  	const numero_arquivo = Math.max(...numeros_arquivos) + 1

 		return numero_arquivo
  }
}

function cria_item (soma, tipo_de_item, numero_arquivo, apagou) {
	// Aqui criamos um item para o idioma selecionado, com o número de alfabetos selecionados em cada idioma.

  const rand = gera_id_randomico ()
  const id_provisorio = `recem_criado__${rand}`

	let itens_idi = []
	for (let i = 0; i < soma.sistemas.length; i++) {
	  if (soma.sistemas[i].situacao === 'ativo') {
	    itens_idi.push({
	    	_id: id_provisorio,
	    	tipo: tipo_de_item,
	    	item: "",
	    	sistema_escrita: soma.sistemas[i].sistema,
	    	arquivo: `${numero_arquivo}.mp3`
	    })
	  }
	}
	return itens_idi
}

function faz_termo (idi, item_i, i_tipo, col, soma) {

	const n_idi = (idi === 'idi_1') ? 1 : 2
	const classe_idi = (idi === 'idi_1') ? 'item_idioma_1' : 'item_idioma_2'
	const placeholder = (idi === 'idi_1') ? 'Palavra em Idioma 1' : 'Palavra em Idioma 1'

	const input = document.createElement("input");
	input.id = `input_idi1_cap${cap_i_ativo}_item${item_i}_col${col}`
	input.classList.add(`cria_palavra`, `item_cap_${cap_i_ativo}`, `${classe_idi}`, `t${soma.ativos}_palavra`, `sist_escri_${i_tipo + 1}`, `cria_item_idi_${n_idi}`)
	input.placeholder = placeholder
	input.setAttribute("onchange", () => {
		altera_palavra(this.value, cap_i_ativo, item_i, 'idioma_1', i_tipo, col, 'outro_termo')
	})

	return input
}

function faz_linha_interna (id) {

	const div = document.createElement("div")
	div.id = id
	div.classList.add('flex_row', 'T1', 'div_deslizavel', 'linha_interna_deslizavel')
	return div
}


function cria_faz_input_palavra () {

	const vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario

	let palavras = ''

  for (let i = 0; i < vocabulario.length; i++) {
    palavras += html_palavras(cap_i_ativo, i)
  }

  document.getElementById(`recip_palavras`).innerHTML = palavras

  
	cria_termos_ocultos () // Fazemos os inputs dos termos
}

function cria_termos_ocultos () {

  // AMÉM!!

	const vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario

  const soma_1 = conta_sist_escr (1)
  const soma_2 = conta_sist_escr (2)


  for (let i = 0; i < vocabulario.length; i++) {

    for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {
      if (vocabulario[i].idioma_1[j].tipo != "palavra") {
        
        // Apesar de não ter trocado nenhum alfabeto, no cria_faz_input_termo()
        // é o mesmo proceder na troca de alfabeto e no preenchimento do carregamento do banco.

        cria_faz_input_termo ('idi_1', i, vocabulario[i].idioma_1[j].tipo, 'trocou_alfabeto')
        j = j + soma_1.ativos // É 1 cria_faz_input_termo() pra cada listra de termos. 1 input para cada alfabeto ativo.
        j--
      }
    }


    for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {
      if (vocabulario[i].idioma_2[j].tipo != "palavra") {
        cria_faz_input_termo ('idi_2', i, vocabulario[i].idioma_2[j].tipo, 'trocou_alfabeto')
        j = j + soma_2.ativos
        j--
      }
    }
  }

  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.  
  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {

      if (vocabulario[i].idioma_1[j].tipo != "palavra") {

        const descricao = (vocabulario[i].idioma_1[j].descricao) ? vocabulario[i].idioma_1[j].descricao : ''
        const escrito = `<span>${vocabulario[i].idioma_1[j].item}</span><span class="dom_descricao">${descricao}</span>`

        document.getElementById(`input_idi1_cap${cap_i_ativo}_item${i}_col${j}`).innerHTML = escrito
      }
    }
  }

  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.  
  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {

      const descricao = (vocabulario[i].idioma_2[j].descricao) ? vocabulario[i].idioma_2[j].descricao : ''
      const escrito = `<span>${vocabulario[i].idioma_2[j].item}</span><span class="dom_descricao">${descricao}</span>`

      document.getElementById(`input_idi2_cap${cap_i_ativo}_item${i}_col${j}`).innerHTML = escrito
    }
  }

  // Agora, temos que esconder os input termos recém criados.
  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {
      if (vocabulario[i].idioma_1[j].tipo != "palavra") {
        document.getElementById(`linha_termos_${cap_i_ativo}_${i}`).style.display = 'none'
        if (i != vocabulario.length - 1) i++
      }
    }
  }

  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {
      if (vocabulario[i].idioma_2[j].tipo != "palavra") {
        document.getElementById(`linha_termos_${cap_i_ativo}_${i}`).style.display = 'none'
        if (i != vocabulario.length - 1) i++
      }
    }
  }


  // Esse for abaixo verifica se o ícone do menú é preenchido ou vazado.
  for (let i = 0; i < vocabulario.length; i++) {
    
    let botao = document.getElementById(`icone_menu_linha_cap${cap_i_ativo}_item${i}`)

    for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {
      if (vocabulario[i].idioma_1[j].tipo != 'palavra' || vocabulario[i].idioma_1[j].descricao) {
        troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      }
    }

    for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {
      if (vocabulario[i].idioma_2[j].tipo != 'palavra' || vocabulario[i].idioma_2[j].descricao) {
        troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      }
    }

  }
}




// elimina_palavra() //

function abre_popup_excluir_palavras (cap_i, item_i) {

	document.getElementById('recip_popup_excluir_palavras').style.display = 'flex'

	let itens_idi_1 = obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_1
	let itens_idi_2 = obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_2

	let html_inputs_idi_1 = ''
	for (let i = 0; i < itens_idi_1.length; i++) {

		if (i === 0) html_inputs_idi_1 += `<div class="flex_row T1 palavra_principal_do_excluir">` // Primeira palavra
		
		if (i != 0) {
			if (itens_idi_1[i].tipo != 'palavra' & itens_idi_1[i - 1].tipo != itens_idi_1[i].tipo) {
				html_inputs_idi_1 += `<div class="flex_row T1 termo_do_excluir">`
			}
		}

		html_inputs_idi_1 += `<span class="flex_row center span_palavra_excluir" onclick="exclui_termo(${item_i}, ${i}, '${itens_idi_1[i].tipo}', 'idi_1')">${itens_idi_1[i].item}</span>`

		if (itens_idi_1[i + 1]) {
			if (itens_idi_1[i].tipo != itens_idi_1[i + 1].tipo) html_inputs_idi_1 += `</div>`
		}

		if (!itens_idi_1[i + 1]) html_inputs_idi_1 += `</div>` // Ultima palavra
	}

	let html_inputs_idi_2 = ''
	for (let i = 0; i < itens_idi_2.length; i++) {

		if (i === 0) html_inputs_idi_2 += `<div class="flex_row T1 palavra_principal_do_excluir">` // Primeira palavra
		
		if (i != 0) {
			if (itens_idi_2[i].tipo != 'palavra' & itens_idi_2[i - 1].tipo != itens_idi_2[i].tipo) {

				html_inputs_idi_2 += `<div class="flex_row T1 termo_do_excluir" onclick="exclui_termo(${item_i}, ${i}, '${itens_idi_2[i].tipo}', 'idi_2')">`
			}
		}

		html_inputs_idi_2 += `<span class="flex_row center span_palavra_excluir">${itens_idi_2[i].item}</span>`

		if (itens_idi_2[i + 1]) {
			if (itens_idi_2[i].tipo != itens_idi_2[i + 1].tipo) html_inputs_idi_2 += `</div>`
		}

		if (!itens_idi_2[i + 1]) html_inputs_idi_2 += `</div>` // Ultima palavra
	}

	document.getElementById('recip_interno_popup_excluir_palavras').innerHTML = `

		<div>
			Clique no item que queira excluir.
		</div>

		<div class="flex_row T1 center">
			<div class="flex_col T2 center" style="justify-content: flex-start; height: 100%;">
				${html_inputs_idi_1}
			</div>
			<div class="flex_col T2 center" style="justify-content: flex-start; height: 100%;">
				${html_inputs_idi_2}
			</div>
		</div>

		Caso queira excluir todo este conjunto de palavras <span class="flex_row center botao" onclick="elimina_palavra(${cap_i}, ${item_i})">clique aqui</span>
	`
}

function exclui_termo (item_i, coluna_i, tipo, idi) {

	let itens = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
	let itens_idioma = (idi === 'idi_1') ? itens.idioma_1 : itens.idioma_2

	const valor_idioma = (idi === 'idi_1') ? 'idioma_1' : 'idioma_2'

  const soma = (idi === 'idi_1') ? conta_sist_escr (1) : conta_sist_escr (2)
  const soma_1 = conta_sist_escr (1)
  const soma_2 = conta_sist_escr (2)

  const alfabeto_principal = (idi === 'idi_1') ? determina_alfabeto_principal(1) : determina_alfabeto_principal(2)

  // O NEGÓCIO AGORA É VER ISSO AQUI
   const valor = itens_idioma[coluna_i].item

  // Exclui
	for (let j = 0; j < itens_idioma.length; j++) {
		if (itens_idioma[j].tipo === tipo) {

			// Vê se esse termo é do alfabeto principal, se for, xeca o mexido, se não for, não faz nada.
			if (itens_idioma[j].sistema_escrita === alfabeto_principal) {
				xeca_mexido({
	  			tipo: 'outro_termo',
	  			acao: 'exclui',
	  			item_i: item_i,
	  			id_cap: cap_i_ativo,
	  			id_item: itens_idioma[j]._id,
	  			valor: valor,
	  			idioma: valor_idioma
	  		})
			}
  		
			itens_idioma.splice(j, 1)
			j--
		}
	}

	// aqui excluiu do obj_teste. Precisa-se rotular novamente os ids.
	let cont = 0
	let numeron = 1

	for (let i = 0; i < itens_idioma.length; i++) {
		if (itens_idioma[i].tipo.includes('outro_termo_')) {

			itens_idioma[i].tipo = `outro_termo_${numeron}`	

	  	cont++
	  	if (cont === soma.ativos) {
	  		cont = 0
	  		numeron++
	  	}
	  }
	}
	  		
	fecha_popup_excluir_palavras()

  document.getElementById(`recip_linha_${cap_i_ativo}_${item_i}`).style.display = 'none' // Isso aqui não sei o que faz
  
  // AQUI QUE ESTÁ A TRETA DOS PARANAUÊS!
  
  // Rapa tudo fora e faz denovo cada input.
  // Não é a melhor abordagem mas é o que tem pra hj.
  let palavras_iniciais = ''
  for (let i = 0; i < obj_teste.capitulos[0].vocabulario.length; i++) {
    palavras_iniciais += html_palavras(0, i)
  }

  document.getElementById('recip_palavras').innerHTML = palavras_iniciais

  cria_termos_ocultos ()

	
	cria_faz_menu_palavra(cap_i_ativo, item_i, 'excluiu_termo') // cria a parada do menu, mas vazio

	document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).style.display = 'flex' // Mostra algum div ai

	// Fazemos os inputs dos termos.
	if (itens.idioma_1) {
		for (let i = 0; i < itens.idioma_1.length; i++) {

			if (itens.idioma_1[i].tipo != "palavra") {
		
				cria_faz_input_termo ('idi_1', item_i, itens.idioma_1[i].tipo, 'excluiu_termo')
				i = i + soma_1.ativos
				i--
			}
		}
	}

	if (itens.idioma_2) {
		for (let i = 0; i < itens.idioma_2.length; i++) {

			if (itens.idioma_2[i].tipo != "palavra") {
		
				cria_faz_input_termo ('idi_2', item_i, itens.idioma_2[i].tipo, 'excluiu_termo')
				i = i + soma_2.ativos
				i--
			}
		}
	}

  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.
  for (let j = 0; j < itens.idioma_1.length; j++) {

    const descricao = (itens.idioma_1[j].descricao) ? itens.idioma_1[j].descricao : ''

    document.getElementById(`input_idi1_cap${cap_i_ativo}_item${item_i}_col${j}`).innerHTML = `<span>${itens.idioma_1[j].item}</span><span class="dom_descricao">${descricao}</span>`
  }
  
  for (let j = 0; j < itens.idioma_2.length; j++) {
  	
  	const descricao = (itens.idioma_2[j].descricao) ? itens.idioma_2[j].descricao : ''

    document.getElementById(`input_idi2_cap${cap_i_ativo}_item${item_i}_col${j}`).innerHTML = `<span>${itens.idioma_2[j].item}</span><span class="dom_descricao">${descricao}</span>`
  }





  // Esse for abaixo verifica se o ícone do menú é preenchido ou vazado.
    
  let botao = document.getElementById(`icone_menu_linha_cap${cap_i_ativo}_item${item_i}`)


  // Esse for abaixo verifica se o ícone do menú é preenchido ou vazado.

  let itens_voc = obj_teste.capitulos[cap_i_ativo].vocabulario
	// Esse for abaixo verifica se o ícone do menú é preenchido ou vazado.
  for (let i = 0; i < itens_voc.length; i++) {

    let botao = document.getElementById(`icone_menu_linha_cap${cap_i_ativo}_item${i}`)

    for (let j = 0; j < itens_voc[i].idioma_1.length; j++) {
      if (itens_voc[i].idioma_1[j].tipo != 'palavra' || itens_voc[i].idioma_1[j].descricao) {
        troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      }
    }

    for (let j = 0; j < itens_voc[i].idioma_2.length; j++) {
      if (itens_voc[i].idioma_2[j].tipo != 'palavra' || itens_voc[i].idioma_2[j].descricao) {
        troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      }
    }

  }
    


}

function valida_elimina_palavra (item_i) {
	let linhas_preenchidas = 0
  for (let i = 0; i < obj_teste.capitulos[cap_i_ativo].vocabulario.length; i++) {
    
    if (obj_teste.capitulos[cap_i_ativo].vocabulario[i].item_idioma_1 != '' && obj_teste.capitulos[cap_i_ativo].vocabulario[i].item_idioma_2 != '') {
      linhas_preenchidas++
    }

  }

  if (obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].item_idioma_1 != '' && obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].item_idioma_2 != '' && item_i <= 3 && linhas_preenchidas <= 3) {
    alert("O capítulo não pode ficar com menos de 3 palavras.")
    return false
  }

  if (linhas_preenchidas <= 3) {
    alert("O capítulo não pode ficar com menos de 3 palavras.")
    return false
  }
}

function digita_titulo_capitulo (valor) {
  // Muda apenas o select do título do capítulo. Efeito bacana.

  let select = document.getElementById('capitulos_decoreba')
  select.options[cap_i_ativo].innerHTML = valor

  obj_teste.capitulos[cap_i_ativo].titulo = valor

  select.style.display = (valor == '') ? 'none' : 'flex'

  // Esse if abaixo serve só para quando é o primeiro capítulo, pois, como não há o clique no botão Adicionar Capitulo,
  // o capítulo ainda não ganhou um id provisório.
  if (!obj_teste.capitulos[cap_i_ativo]._id) {

	  // Atualizamos o obj_teste e o mexidos.
	  const rand = gera_id_randomico()
	  const id_provisorio = `recem_criado__${rand}`

  	obj_teste.capitulos[cap_i_ativo]["_id"] = id_provisorio
  }

}

function muda_titulo_capitulo() {
	const id_capitulo = obj_teste.capitulos[cap_i_ativo]._id
	console.log("id_capitulo:: " + id_capitulo)
	console.log(obj_teste.capitulos[cap_i_ativo])
  xeca_mexido({tipo: 'capitulo', acao: 'altera_texto', id_cap: id_capitulo})
}