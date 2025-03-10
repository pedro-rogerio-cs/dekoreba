
function some_aparece_inputs_termos (item_i, acao) {

  const soma_1 = conta_sist_escr (1)
  const soma_2 = conta_sist_escr (2)

  const estilo = (acao === 'some') ? 'none' : 'inline'

  let vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
  if (vocabulario.idioma_1.length) {
    for (let i = 0; i < vocabulario.idioma_1.length; i++) {
      if (vocabulario.idioma_1[i].tipo != 'palavra') {
        const col_somada = soma_1.ativos + i

        document.getElementById(`recip_idi1_cap${cap_i_ativo}_item${item_i}_col${i}`).style.display = estilo
      }
    }
  }

  if (vocabulario.idioma_2.length) {
    for (let i = 0; i < vocabulario.idioma_2.length; i++) {
      if (vocabulario.idioma_2[i].tipo != 'palavra') {
        const col_somada = soma_2.ativos + i
        document.getElementById(`recip_idi2_cap${cap_i_ativo}_item${item_i}_col${i}`).style.display = estilo
      }
    }
  }
}

function cria_faz_input_termo (idi, item_i, tipo_de_item, situacao) {

  if (!document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).innerHTML.includes('div')) {

    let string = `

      <div id="linha_${cap_i_ativo}_${item_i}" class="flex_row T1" style="overflow-x: auto; border-radius: 10px; ">
          
        <div id="recip_col_${cap_i_ativo}_${item_i}_idi_1" class="flex_col T2"></div>
        <div id="recip_col_${cap_i_ativo}_${item_i}_idi_2" class="flex_col T2"></div>
        
        <i class="flex_row center x_fechar_ativo icon-th-thumb-empty" style="visibility: hidden;"></i>

      </div>
    `
    
    document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).innerHTML += string
  } 

  document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).style.display = 'flex'

  const string_termos = html_termos (item_i, idi, tipo_de_item, situacao)

  const div_termo = `
    <div id="linha_${cap_i_ativo}_${item_i}_${idi}" class="flex_row T1 div_deslizavel" style="height: 120px; position: relative; overflow-x: auto; align-items: flex-start;">
      ${string_termos}
    </div>
  `

  document.getElementById(`recip_col_${cap_i_ativo}_${item_i}_${idi}`).innerHTML += div_termo

  // Esse for abaixo verifica se o ícone do menú é preenchido ou vazado.
  
  let item = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]

  let botao = document.getElementById(`icone_menu_linha_cap${cap_i_ativo}_item${item_i}`)

  for (let i = 0; i < item.idioma_1.length; i++) {

    if (item.idioma_1[i].tipo != 'palavra' || item.idioma_1[i].descricao) {
      troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      return
    }
  }

  for (let i = 0; i < item.idioma_2.length; i++) {

    if (item.idioma_2[i].tipo != 'palavra' || item.idioma_2[i].descricao) {
      troca_classe (botao, 'icon-th-thumb-empty', 'icon-th-thumb')
      return
    }
  }


  troca_classe (botao, 'icon-th-thumb', 'icon-th-thumb-empty')


}

// Outro termo input
// <input id="input_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${col_somada}" type="text" class="cria_palavra item_cap_${cap_i_ativo} item_idioma_${n_idi} t${soma.ativos}_palavra sist_escri_${i + 1} cria_item_${idi}" placeholder="${placeholder}" onchange="altera_palavra(this.value, ${cap_i_ativo}, ${item_i}, 'idioma_${n_idi}', ${i}, ${col_somada}, 'outro_termo')">

function html_termos (item_i, idi, tipo_de_item, situacao) {

  const n_idi = (idi === 'idi_1') ? 1 : 2
  const soma = (idi === 'idi_1') ? conta_sist_escr(1) : conta_sist_escr(2)
  const placeholder = (idi === 'idi_1') ? "Palavra em idioma 1" : "Palavra em idioma 2"
  let itens
  if (idi === 'idi_1') itens = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_1
  if (idi === 'idi_2') itens = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_2
  
  let string_palavras = ''
   
  let col_incrementa = 0
 
  let n_desse_item = tipo_de_item.replace('outro_termo_', '')
  const numero_desse_item = Number(n_desse_item)

  if (n_idi === 1) {
    console.log("idioma uno")
    //console.log()
  }

  for (let i = 0; i < soma.sistemas.length; i++) {
    if (soma.sistemas[i].situacao === 'ativo') {

      /*
      const item_voc = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
      const item = (n_idi === 1) ? item_voc.idioma_1[coluna_i] : item_voc.idioma_2[coluna_i]
      const palavra = item.item

      const descricao = (item.descricao) ? item.descricao : ''
      */
      // <span>${palavra}</span><span class="dom_descricao">${descricao}</span>

      let col_somada
      if (situacao === 'novo_termo') col_somada = itens.length - soma.sistemas.length + col_incrementa
      if (situacao === 'excluiu_termo') col_somada = numero_desse_item * soma.sistemas.length + col_incrementa
      if (situacao === 'trocou_alfabeto') col_somada = numero_desse_item * soma.ativos + col_incrementa


      let itenzin // Esse itenzin só é usado pra saber se vai ser Alterar ou Adicionar descrição
      if (n_idi === 1) itenzin = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_1[col_somada]
      if (n_idi === 2) itenzin = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_2[col_somada]
      const texto_botao_add_desc = (itenzin.descricao) ? 'Alterar descrição' : 'Adicionar descrição'

      string_palavras += `
        <div class="t${soma.ativos}_recip_palavra" style="">

          <div id="recip_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${col_somada}" class="flex_row T1 center">
            <div id="input_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${col_somada}" type="text" class="cria_palavra item_cap_${cap_i_ativo} item_idioma_${n_idi} t${soma.ativos}_palavra sist_escri_${i + 1} cria_item_idi_${n_idi}" placeholder="Palavra em Idioma ${n_idi}" onchange="altera_palavra (this.value, ${cap_i_ativo}, ${item_i}, 'idioma_${n_idi}', ${i}, ${col_somada}, 'outro_termo')" onclick="alterna_edita_div(${n_idi}, ${item_i}, ${col_somada}, ${i + 1}, 'outro_termo')">
            </div>
          </div>

          <div class="flex_row T1 center recip_bot_add_desc_${cap_i_ativo}_${item_i}">
            <div id="div_botao_add_descricao_idi${n_idi}_cap${cap_i_ativo}_item${item_i}_col${col_somada}" class="flex_row T1 center botao_add_descricao" onclick="popup_descricao(${item_i}, ${n_idi}, ${col_somada})">
              ${texto_botao_add_desc}
            </div>
          </div>
        </div>
      `
      col_incrementa++
    }
  }


  return string_palavras
}

// os parâmetros acao e idi só são usados quando é inserção de termos. Na inserção de palavras nenhum destes parâmetros são utilizados.

// Termo do insere palavra idioma 1
// <input id="input_idi1_cap${cap_i}_item${item_i}_col${col_1}" type="text" class="cria_palavra item_cap_${cap_i} item_idioma_1 t${soma_1.ativos}_palavra sist_escri_${i + 1} cria_item_idi_1" style="" placeholder="Palavra em Idioma 1" value="${itens_idioma_1[k].item}" onchange="altera_palavra(this.value, ${cap_i}, ${item_i}, 'idioma_1', ${i}, ${col_1}, 'palavra')" style="margin: 3px;">

function html_palavras (cap_i, item_i, acao, idi) {

  console.log(`item_i: ${item_i} - acao: ${acao}`)

  const soma_1 = conta_sist_escr(1)
  const soma_2 = conta_sist_escr(2)

  const soma = (idi === 'idi_1') ? conta_sist_escr(1) : conta_sist_escr(2)
  
  let itens_idioma_1 = obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_1
  let itens_idioma_2 = obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_2

  let itens
  if (idi === 'idi_1') itens = obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_1
  if (idi === 'idi_2') itens = obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_2

  
  const n_idi = (idi === 'idi_1') ? 1 : 2

  // Aqui diminuimos a qtd de alfabetos ativos pq o obj_teste é criado antes, e aqui criaremos o DOM.
  // Os itens em branco já foram inseridos no obj_teste, alterando a qtd de intens no idioma_1 e idioma_2
  let col_1 = (itens_idioma_1.length) ? itens_idioma_1.length - soma_1.ativos : 0 
  let col_2 = (itens_idioma_2.length) ? itens_idioma_2.length - soma_2.ativos : 0 


  if (acao === 'inserir_termo') {

    // Essa parte da função só retornará os inputs do idioma cujo novo termo for solicitado.

    let string_palavras_idi_1 = ''

    // Pra definir a coluna, precisa-se pegar todos as palavras e termos no idioma daquele vocábulo e adicionar mais 1 na hora de fazer a parada.

    if (n_idi === 1) {

      for (let i = 0; i < soma_1.sistemas.length; i++) {
        if (soma_1.sistemas[i].situacao === 'ativo') {

          for (let k = 0; k < itens_idioma_1.length; k++) {
            if (soma_1.sistemas[i].sistema === itens_idioma_1[k].sistema_escrita & itens_idioma_1[k].tipo === 'palavra') {

              let alterar_ou_adicionar = (itens_idioma_1[k].descricao) ? 'Alterar descricao' : 'Adicionar descrição'

              string_palavras_idi_1 += `
                <div style="width: calc(100% - 10px); margin: 2px;">

                <input id="input_idi1_cap${cap_i}_item${item_i}_col${col_1}" type="text" class="cria_palavra item_cap_${cap_i} item_idioma_1 t${soma_1.ativos}_palavra sist_escri_${i + 1} cria_item_idi_${n_idi}" style="" placeholder="Palavra em Idioma 1" value="" onchange="altera_palavra(this.value, ${cap_i}, ${item_i}, 'idioma_1', ${i}, ${col_1}, 'outro_termo')">

                <div class="flex_row T1 center recip_bot_add_desc_${cap_i}_${item_i}">
                  <div class="flex_row T1 center botao" style="width: 200px; height: 25px; font-size: 12pt; font-style: italic; margin-top: 5px;" onclick="popup_descricao(${item_i}, ${n_idi}, ${col_1})">${alterar_ou_adicionar}</div>
                  </div>
                </div>
              `
              col_1++

            }

            if (soma_1.sistemas[i].sistema === itens_idioma_1[k].sistema_escrita & itens_idioma_1[k].tipo != 'palavra') {
              console.log("comentaaa")

              let alterar_ou_adicionar = (itens_idioma_1[k].descricao) ? 'Alterar descricao' : 'Adicionar descrição'

              string_palavras_idi_1 += `
                <div style="width: calc(100% - 10px); margin: 2px;">

                <input id="input_idi1_cap${cap_i}_item${item_i}_col${col_1}" type="text" class="cria_palavra item_cap_${cap_i} item_idioma_1 t${soma_1.ativos}_palavra sist_escri_${i + 1} cria_item_idi_${n_idi}" style="" placeholder="Palavra em Idioma 1" value="" onchange="altera_palavra(this.value, ${cap_i}, ${item_i}, 'idioma_1', ${i}, ${col_1}, 'outro_termo')">

                <div class="flex_row T1 center recip_bot_add_desc_${cap_i}_${item_i}">
                  <div class="flex_row T1 center botao" style="width: 200px; height: 25px; font-size: 12pt; font-style: italic; margin-top: 5px;" onclick="popup_descricao(${item_i}, ${n_idi}, ${col_1})">${alterar_ou_adicionar}</div>
                  </div>
                </div>
              `
              col_1++
            }
          }
        }
      }

      return string_palavras_idi_1
    }
    
    let string_palavras_idi_2 = ''

    if (n_idi === 2) {
      for (let i = 0; i < soma_2.sistemas.length; i++) {
        if (soma_2.sistemas[i].situacao === 'ativo') {
          for (let k = 0; k < obj_teste.capitulos[cap_i].vocabulario[item_i].idioma_2.length; k++) {

            if (soma_2.sistemas[i].sistema === itens_idioma_2[k].sistema_escrita & itens_idioma_2[k].tipo === 'palavra') {

              let alterar_ou_adicionar = (itens_idioma_2[k].descricao) ? 'Alterar descricao' : 'Adicionar descrição'

              string_palavras_idi_2 += `
              <div style="width: calc(100% - 10px); margin: 2px;">

                <input id="input_idi2_cap${cap_i}_item${item_i}_col${col_2}"  type="text" class="cria_palavra item_cap_${cap_i} item_idioma_2 t${soma_2.ativos}_palavra sist_escri_${i + 1} cria_item_idi_${n_idi}" placeholder="Palavra em Idioma 2" value="" onchange="altera_palavra(this.value, ${cap_i}, ${item_i}, 'idioma_2', ${i}, ${col_2}, 'outro_termo')">

                <div class="flex_row T1 center recip_bot_add_desc_${cap_i}_${item_i}">
                  <div class="flex_row T1 center botao" style="width: 200px; height: 25px; font-size: 12pt; font-style: italic; margin-top: 5px;" onclick="popup_descricao(${item_i}, ${n_idi}, ${col_2})">${alterar_ou_adicionar}</div>
                  </div>
                </div>

              `
              col_2++

            }
          }
        }
      }
      return string_palavras_idi_2
    }


  } else {

    col_1 = 0
    col_2 = 0
    // Agora é dividir criar inputs, de cada lado, de acordo com a qtd de sistemas de escritas que cada um dos idiomas tem.
    let string = `
    <div id="recip_linha_${cap_i}_${item_i}" class="flex_col T1 center menu_palavra_inativo">
      <div id="linha_${cap_i}_${item_i}" class="flex_row T1" style="overflow-x: auto; border-radius: 10px;">`

    // Aqui rodamos pelos alfabetos. Se tiver ativo, coloca o i dele em uma das classes, pra colorir certinho.

    string += `<div id="linha_${cap_i}_${item_i}_idi_1" class="flex_row T1 div_deslizavel" style="height: 70px; position: relative; overflow-x: auto; overflow-y: hidden;">`

    for (let i = 0; i < soma_1.sistemas.length; i++) {
      if (soma_1.sistemas[i].situacao === 'ativo') {

        for (let k = 0; k < itens_idioma_1.length; k++) {

          if (soma_1.sistemas[i].sistema === itens_idioma_1[k].sistema_escrita) {
            if (itens_idioma_1[k].tipo === 'palavra') {

              const descricao = (itens_idioma_1[k].descricao) ? itens_idioma_1[k].descricao : ''

              // <div id="recip_idi1_cap${cap_i}_item${item_i}_col${col_1}" style="width: calc(100% - 10px); margin: 2px;">

              let alterar_ou_adicionar = (itens_idioma_1[k].descricao) ? 'Alterar descricao' : 'Adicionar descrição'

              string += `
                <div class="t${soma_1.ativos}_recip_palavra">
                  
                  <div id="recip_idi1_cap${cap_i}_item${item_i}_col${col_1}" class="flex_row T1 center">
                     <div id="input_idi1_cap${cap_i}_item${item_i}_col${col_1}" type="text" class="cria_palavra item_cap_${cap_i} item_idioma_1 t${soma_1.ativos}_palavra sist_escri_${i + 1} cria_item_idi_1" placeholder="Palavra em Idioma 1" onchange="altera_palavra (this.value, ${cap_i}, ${item_i}, 'idioma_1', ${i}, ${col_1}, 'palavra')" onclick="alterna_edita_div(1, ${item_i}, ${col_1}, ${i + 1}, 'palavra')">
                      <span>${itens_idioma_1[k].item}</span><span class="dom_descricao">${descricao}</span>
                    </div>
                  </div>
                 
                
                  <div class="flex_row T1 center recip_bot_add_desc_${cap_i}_${item_i} sumido">
                    <div id="div_botao_add_descricao_idi1_cap${cap_i}_item${item_i}_col${col_1}" class="flex_row T1 center  botao_add_descricao" onclick="popup_descricao(${item_i}, 1, ${col_1})">
                      ${alterar_ou_adicionar}
                    </div>
                  </div>
                
                </div>
              `
              col_1++
            }
            
          }
        }
      }
    }

    string += `</div><div id="linha_${cap_i}_${item_i}_idi_2" class="flex_row T1" style="height: 70px; position: relative; overflow-x: auto; overflow-y: hidden;">`

    for (let i = 0; i < soma_2.sistemas.length; i++) {
      if (soma_2.sistemas[i].situacao === 'ativo') {
        for (let k = 0; k < itens_idioma_2.length; k++) {

          if (soma_2.sistemas[i].sistema === itens_idioma_2[k].sistema_escrita) {
            if (itens_idioma_2[k].tipo === 'palavra') {

              const descricao = (itens_idioma_2[k].descricao) ? itens_idioma_2[k].descricao : ''

              let alterar_ou_adicionar = (itens_idioma_2[k].descricao) ? 'Alterar descricao' : 'Adicionar descrição'

              string += `
                <div class="t${soma_2.ativos}_recip_palavra" style="">

                  <div id="recip_idi2_cap${cap_i}_item${item_i}_col${col_2}" class="flex_row T1 center">
                    <div id="input_idi2_cap${cap_i}_item${item_i}_col${col_2}" type="text" class="cria_palavra item_cap_${cap_i} item_idioma_2 t${soma_2.ativos}_palavra sist_escri_${i + 1} cria_item_idi_2" placeholder="Palavra em Idioma 2" onchange="altera_palavra (this.value, ${cap_i}, ${item_i}, 'idioma_2', ${i}, ${col_2}, 'palavra')" onclick="alterna_edita_div(2, ${item_i}, ${col_2}, ${i + 1}, 'palavra')">
                      <span>${itens_idioma_2[k].item}</span><span class="dom_descricao">${descricao}</span>
                    </div>
                  </div>

                  <div class="flex_row T1 center recip_bot_add_desc_${cap_i}_${item_i} sumido">
                    <div id="div_botao_add_descricao_idi2_cap${cap_i}_item${item_i}_col${col_2}" class="flex_row T1 center botao_add_descricao" onclick="popup_descricao(${item_i}, 2, ${col_2})">${alterar_ou_adicionar}</div>
                    </div>
                </div>
              `
              col_2++
            }

          }
        }
      }
    }

    string += '</div>'
   
     string += `<i id="icone_menu_linha_cap${cap_i}_item${item_i}" class="flex_row center x_fechar_ativo icon-th-thumb-empty" onclick="cria_faz_menu_palavra(${cap_i}, ${item_i})"></i></div>

       <div id="linha_termos_${cap_i}_${item_i}" class="flex_col T1 center sumido" style="height: auto;"> 
          
       </div>

       <div id="linha_bot_termo_${cap_i}_${item_i}" class="flex_row T1 center sumido" style="height: 200px;"> 
          
       </div>
     </div>`
    //  string += `<i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_palavra(${cap_i}, ${item_i})"></i></div>`
    return string
  }
  
}
