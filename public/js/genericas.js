// Aqui podem ficar as funções modularizadas, que dá pra usar até em outros sistemas.

function data_mongodb_html (acao, data_mongodb) {
  if (acao === 'mongodb_para_input_html') {
    const data_js = new Date(data_mongodb)
    const data_boa = data_js.toISOString().substring(0, 10)

    return data_boa
  }

  if (acao === 'mongodb_para_visualizacao') {
    const data = new Date(data_mongodb)
    const dia = data.getDate() > 10 ? data.getDate() : '' + 0 + data.getDate()
    const numero_mes = data.getMonth() + 1
    const mes = numero_mes > 10 ? numero_mes : '' + 0 + numero_mes
    const ano = data.getFullYear()

    return `${dia}/${mes}/${ano}`
  }
}

function gera_menu_paginacao_2 (nome_buscado, pagina, qtd_total_resultados, total_paginas) {

  // Daqui pra baixo, só alegria
  const botao_volta = (pagina > 1) ? `<div class="flex_row center botao_paginacao" style="margin-right: 20px;" onclick="paginacao_vai('${nome_buscado}', ${pagina - 1})"><</div>` : ''

  const botao_vai = (pagina < total_paginas) ? `<div class="flex_row center botao_paginacao" style="margin-right: 20px;" onclick="paginacao_vai('${nome_buscado}', ${pagina + 1})">></div>` : ''



  // Primeiro pegamos a qtd de dekorebas e dividimos pela qtd que queremos mostrar na página.
  const max_decorebas = 4

  let qtd_geral_botoes = qtd_total_resultados / max_decorebas // Quantos botões de páginas existirão possíveis.
  qtd_geral_botoes = Math.ceil(qtd_geral_botoes) // Tiramos as virgolas.

  qtd_geral_botoes = Number(qtd_geral_botoes)

  // Queremos 5 botões, no máximo, mostrando por vez na paginação, logo...
  let qtd_botoes_visiveis = (qtd_geral_botoes > 5) ? 5 : qtd_geral_botoes
  

  let i_inicial = 0 // Setamos o 0 pq, nas 3 primeiras páginas, o primeiro i do loop será o zero.

  // A partir da página 3, o i_inicial tem que avançar em 1, para a página escolhida ficar sempre no meio, a não ser quando se aproximar no começo e no final do total de botões possíveis.
  if (pagina > 3 & qtd_botoes_visiveis == 5) i_inicial = pagina - 3

  // Setamos o i_final, que é o i_inicial mais o total de números visíveis na parada.
  let i_final = i_inicial + qtd_botoes_visiveis

  // Aqui, colocamos um limite para o i_final, além de, travar o i_inicial quando o i_final também estiver travado,
  // ou seja, quando a página escolhida estiver se aproximando das últimas páginas possíveis.

  // Lembrand que Number(qtd_geral_botoes) + 1 significa que ultrapassou o número de páginas possíveis. Ou seja, chegamos no limite.
  
  if (qtd_geral_botoes > 3) {
    if (Number(pagina) + 2 == qtd_geral_botoes + 1) {
      if (qtd_botoes_visiveis == 5) i_inicial = i_inicial - 1
      i_final = qtd_geral_botoes
    }
    if (Number(pagina) + 1 == qtd_geral_botoes + 1) {
      if (qtd_botoes_visiveis == 5) i_inicial = i_inicial - 2
      i_final = qtd_geral_botoes
    }
    if (Number(pagina) == qtd_geral_botoes + 1) {
      if (qtd_botoes_visiveis == 5) i_inicial = i_inicial - 3
      i_final = qtd_geral_botoes
    }
  }
  

  // Aqui colocamos reticências se tem coisa pra lá ou pra cá
  const reticencias_inicio = (i_inicial > 0) ? '...' : ''
  const reticencias_final = (qtd_geral_botoes > 5 & pagina + 2 < qtd_geral_botoes) ? '...' : ''

  console.log("qtd_geral_botoes: " + qtd_geral_botoes)
  // Agora sim rodamos o loop para mostrarmos os botões certinho na paginação.
  let botoes = ''

  for (let i = i_inicial; i < i_final; i++) {

    const i_verdadeiro = i + 1 // Número da página. O i começa no 0 mas a primeira página é a 1.

    // Setamos o botão da página escolhida como o com a classe bot_pag_ativo. Brilhoso e garboso.
    let bot_estado = (i == pagina - 1) ? 'bot_pag_ativo' : 'bot_pag_inativo'

    // Geremos os botões
    botoes += `<div class="flex_row center botao_paginacao ${bot_estado}" onClick="paginacao_vai('${nome_buscado}', ${i_verdadeiro})">${i_verdadeiro}</div>`
  }

  return {
    botao_volta: botao_volta,
    reticencias_inicio: reticencias_inicio,
    botoes: botoes,
    reticencias_final: reticencias_final,
    botao_vai: botao_vai
  }
}


async function paginacao_vai (nome_buscado, pagina) {

  buscar_usuario(nome_buscado, pagina)
}

function volta_bandeira (idioma, diametro, volta_url) {

  // O volta_url pode ser 0 ou 1. Se for 1, temos que voltar um diretório no src da bandeira. Se for 0, não volta.
  const volta_url_string = (volta_url === 0) ? '' : '../'

  if (idioma === 'Português') return `<img src="${volta_url_string}imagens/bandeiras/brasil.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Espanhol') return `<img src="${volta_url_string}imagens/bandeiras/espanha.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Indiano') return '🇮🇳'
  if (idioma === 'Italiano') return `<img src="${volta_url_string}imagens/bandeiras/italia.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Francês') return `<img src="${volta_url_string}imagens/bandeiras/franca.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Inglês') return `<img src="${volta_url_string}imagens/bandeiras/estados-unidos.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Japonês') return '🇯🇵'
  if (idioma === 'Russo') return '🇷🇺'
  if (idioma === 'Chinês') return '🇨🇳'
  if (idioma === 'Coreano') return '🇰🇷'
  if (idioma === 'Alemão') return `<img src="${volta_url_string}imagens/bandeiras/alemanha.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Grego') return '🇬🇷'
  if (idioma === 'Árabe') return `<img src="${volta_url_string}imagens/bandeiras/marrocos.png" width="${diametro}" height="${diametro}">`
  if (idioma === 'Hebraico') return '🇮🇱'
  if (idioma === 'Esperanto') return '🌍'
}

function qtos_alfabetos_tem (idioma) {
  if (idioma === 'Português') return 1
  if (idioma === 'Espanhol') return 1
  if (idioma === 'Indiano') return 2
  if (idioma === 'Italiano') return 1
  if (idioma === 'Francês') return 1
  if (idioma === 'Inglês') return 1
  if (idioma === 'Japonês') return 3
  if (idioma === 'Russo') return 2
  if (idioma === 'Chinês') return 2
  if (idioma === 'Coreano') return 2
  if (idioma === 'Alemão') return 1
  if (idioma === 'Grego') return 2
  if (idioma === 'Árabe') return 2
  if (idioma === 'Hebraico') return 2
  if (idioma === 'Esperanto') return 1
}

function calcula_porcentagem(obj) {
  // return (100 / obj.total) * obj.somatoria
  return (obj.somatoria * 100) / obj.total
}

function calcula_porcento(somatoria, total) {
  let porcentagem = (100 / total) * somatoria
  let porcentagem_arredondada = porcentagem.toFixed(0)
  return porcentagem_arredondada
}

function removeAcento(text) {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  return text;
}

function gera_id_randomico() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}

// Aqui podem vir funções de popup. De botão radio estiloso. Até o vai_filhao. Mostra e escone senha. Paginação. Alguma maneira de adicionar e excluir itens de uma lista. Trabalhar com data.