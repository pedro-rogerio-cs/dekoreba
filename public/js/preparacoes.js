// Aqui ficam as funções de preparação, que alimentam os modelos da funcoes_montadores.js

async function prepara_index (modo_de_vinda, dados_servidor) {
  // Aqui, se for flex, funcionará muito bem. E precisa mesmo ter esse display flex aqui, não lembro pq.
  document.getElementById('div_altera_idioma_index').style.display = 'none'

  let hud_index

  if (localStorage.getItem('hud_index')) {
    hud_index = JSON.parse(localStorage.getItem('hud_index'))
  } else {
    hud_index = dados_servidor.hud.index
  }

  if (!dados_servidor) {
    hud_index = JSON.parse(localStorage.getItem('hud_index'))
  }

  // Aqui, corre o risco do servidor não enviar o dados_servidor, pq não é necessário.
  // Se não enviar, é pq o cliente já o tem.

  // Esse span de Idioma da Página só tem na versão PC.
  document.getElementsByClassName('span_idioma_da_pagina')[0].innerHTML = hud_index.idioma_da_pagina

  // Aqui, só tem esse for abaixo pq, nesse index, eu dupliquei os elementos.
  // Tem os da versão PC e os da versão MOBILE.
  // Dupliquei tudo, é certo? Não. Funciona? Sim. Pronto.

  for (let i = 0; i < 2; i++) {
    document.getElementsByClassName('span_frase_principal')[i].innerHTML = hud_index.frase_principal
    document.getElementsByClassName('span_aviso_beta')[i].innerHTML = hud_index.aviso_beta
    document.getElementsByClassName('span_termos_uso')[i].innerHTML = hud_index.termos_uso
    document.getElementsByClassName('span_polit_priv')[i].innerHTML = hud_index.politica_privacidade

    document.getElementById('altera_idioma_index').value = hud_index.idioma
  }

  document.getElementById('botao_cadastrar').innerHTML = hud_index.cadastro
  document.getElementById('botao_login').innerHTML = hud_index.login

  // Aqui, deveria gravar o dados_servidor.hud no cache
  localStorage.setItem('hud_index', JSON.stringify(dados_servidor.hud.index))
  localStorage.setItem('hud_cadastro', JSON.stringify(dados_servidor.hud.cadastro))
  localStorage.setItem('hud_login', JSON.stringify(dados_servidor.hud.login))

  window.scrollTo(0, 0)
}

async function prepara_login (obj, modo_de_vinda) {

  let hud_login
  if (localStorage.getItem('hud_login')) {
    hud_login = JSON.parse(localStorage.getItem('hud_login'))
  } else {
    // hud_cadastro = dados_servidor.hud.hud_cadastro
  }


  document.getElementById('div_altera_idioma_index').style.display = 'none'

  document.getElementById('span_login').innerHTML = hud_login.login
  document.getElementById('login_email').placeholder = hud_login.email
  document.getElementById('login_senha').placeholder = hud_login.senha

  document.getElementById('esqueceu_senha').innerHTML = hud_login.esqueceu_senha

  document.getElementById('botao_entrar').innerHTML = hud_login.entrar

  document.getElementById('msg_sistema_esqueceu_foi').innerHTML = hud_login.te_enviamos

  window.scrollTo(0, 0)
}

async function prepara_cadastro (obj, modo_de_vinda) {
    let hud_cadastro 
  if (localStorage.getItem('hud_cadastro')) {
    hud_cadastro = JSON.parse(localStorage.getItem('hud_cadastro'))
  } else {
    // hud_cadastro = dados_servidor.hud.hud_cadastro
  }

  window.scrollTo(0, 0)

  document.getElementById('div_altera_idioma_index').style.display = 'none'
  document.getElementById('span_cadastro').innerHTML = hud_cadastro.cadastro
  
  document.getElementById('cadastro_nome').placeholder = hud_cadastro.nome
  document.getElementById('cadastro_email').placeholder = hud_cadastro.email
  document.getElementById('cadastro_senha').placeholder = hud_cadastro.digite_senha

  document.getElementById('span_senha_fraca').innerHTML = hud_cadastro.fraca
  document.getElementById('span_senha_media').innerHTML = hud_cadastro.media
  document.getElementById('span_senha_forte').innerHTML = hud_cadastro.forte

  document.getElementById('cond_1').innerHTML = hud_cadastro.condicao_1
  document.getElementById('cond_2').innerHTML = hud_cadastro.condicao_2
  document.getElementById('cond_3').innerHTML = hud_cadastro.condicao_3
  document.getElementById('cond_4').innerHTML = hud_cadastro.condicao_4
  document.getElementById('cond_5').innerHTML = hud_cadastro.condicao_5

  document.getElementById('cadastro_repete_senha').placeholder = hud_cadastro.repita_senha
  
  document.getElementById('botao_cadastrar').innerHTML = hud_cadastro.cadastrar



  // Função para validar nome de usuário
  function validarNomeUsuario(nome) {
      const regras = /^[a-zA-Z0-9_-]{3,20}$/; // Letras, números, hífen, underline, 3-20 caracteres
      return regras.test(nome);
  }

  // Exemplo de uso
  const nomeUsuario = "usuario_valido123";
  if (validarNomeUsuario(nomeUsuario)) {
      console.log("Nome de usuário válido.");
  } else {
      console.log("Nome de usuário inválido.");
  }

  // Feedback visual (exemplo simplificado)
  document.getElementById("cadastro_username").addEventListener("input", (e) => {

      const input = e.target.value;
      const feedback = document.getElementById("username-feedback");

      if (validarNomeUsuario(input)) {
          feedback.textContent = "Nome válido!";
          feedback.style.color = "green";
      } else {
          feedback.textContent = "Nome inválido (use 3-20 caracteres, letras, números, _ ou -).";
          feedback.style.color = "red";
      }
  });



}

async function prepara_home (modo_de_vinda) {

  checa_online()

  const dados = await vai_filhao_2('home')
  const usuario = dados.usuario

  
  if (usuario.primeiro_acesso === true) {
    // Isso aqui funciona, mas tá comentado pq estou testando o Dekoreba sem os testes iniciais.
    // document.getElementById('home_recip_teste').style.display = 'flex'
    // document.getElementById('home_teste_dentro').innerHTML = faz_dentro_escolhe_teste_inicial(usuario.nome)
    mostra_ajuda('home')
  }

  altera_diurno_noturno (usuario.configuracoes[0].modo_tela)

  sessionStorage.setItem("avatar_50", usuario.avatar_50)
  sessionStorage.setItem("id_usuario", usuario._id)
  
  // Temos que setar aqui pq o botão para o perfil não funfava quando a página vem direto do login.
  let avatar = (sessionStorage.getItem("avatar_50")) ? sessionStorage.getItem("avatar_50") : 'sem_avatar'

  let dos = () => {
    monta_perfil(`${sessionStorage.getItem("id_usuario")}`);
  }

  document.getElementById('avatar_50').onclick = dos
  document.getElementById('avatar_50').src = avatar

  document.body.style.overflow = 'auto'
}


async function preparacao_perfil (obj) {

  // body...
  // Aqui ou puxa do servidor, ou puxa do cache ou mostra com dados padrão, sem nada.

  // Nessa preparação, o programa vê da onde pegará os dados e exporta exatamente o que o montador irá utilizar. O montador não escolhe dentre os dados crus, ele pega só o que precisará, com o nome curto, o nome longo será diminuido aqui nessa função de preparação. Aí retornará uma porrada de dados. Sendo eles do servidor ou do cache, non impuerta.

  const dados = await vai_filhao_2('perfil', `${obj.id_perfil}`)

  let string_decorebas_praticadas = ''


    let bot_diurno_perfil = document.getElementById('bot_diurno')
    let bot_noturno_perfil = document.getElementById('bot_noturno')

  if (diurno_noturno === 'diurno') {

    troca_classe (bot_noturno, 'bot_padrao_ativo', 'bot_padrao_inativo')
    troca_classe (bot_diurno, 'bot_padrao_inativo', 'bot_padrao_ativo')
  }
  if (diurno_noturno === 'noturno') {

    troca_classe (bot_diurno, 'bot_padrao_ativo', 'bot_padrao_inativo')
    troca_classe (bot_noturno, 'bot_padrao_inativo', 'bot_padrao_ativo')
  }

  for (let i = 0; i < dados.usuario.decorebas_praticadas.length; i++) {

    for (let j = 0; j < dados.dados_decs.length; j++) {
      if (dados.usuario.decorebas_praticadas[i].id_decoreba == dados.dados_decs[j]._id & dados.usuario.decorebas_praticadas[i].praticou === 'sim') {
        
        /*

          let raiz_css = document.querySelector(':root')
          raiz_css.style.setProperty('--botao_ativo', dados.dados_decs[j].cor)

        */

        // Essa função abaixo, tinycolor, é de terceiros. 
        // Ela devolve tons mais claros ou mais escuros, dependendo da cor que passamos para ela. Uma velezura.
        const cor_dekoreba_clara = tinycolor(dados.dados_decs[j].cor).lighten(10).desaturate(10).toString()
        const cor_dekoreba_escura = tinycolor(dados.dados_decs[j].cor).darken(10).toString()

        // GAMBIARRA ALERT!
        // Esse cor_bot_ativo_desaturada vai estar ativo por padrão pois o sistema ainda não reconhece se a dekoreba está em modo de treinamento e em modo pra valer. Por enquanto tá sempre em treinamento primeiro.
        let cor_bot_ativo_desaturada = tinycolor(dados.dados_decs[j].cor).lighten(20).desaturate(20).toString()

        let somatoria_palavras = 0
        let somatoria_mult = 0
        let somatoria_escr = 0

        for (let k = 0; k < dados.usuario.decorebas_praticadas[i].caps_praticados.length; k++) {
          const cap_praticado = dados.usuario.decorebas_praticadas[i].caps_praticados[k]

          somatoria_mult += cap_praticado.qtd_masterizadas_mult
          somatoria_escr += cap_praticado.qtd_masterizadas_escr
          somatoria_palavras += cap_praticado.qtd_palavras

        }

        const largura_porcentagem_titulo = (somatoria_mult + somatoria_escr) * 100 / (somatoria_palavras * 2)
        const largura_porcentagem_mult = somatoria_mult * 100 / somatoria_palavras
        const largura_porcentagem_escr = somatoria_escr * 100 / somatoria_palavras

        string_decorebas_praticadas += `<div class="flex_row T1 fundo_nivel" style="background: (--cor_dekoreba); border-radius: 10px; padding: 0px; height: auto;">

            <div class="flex_col T2" style="background-image: url('../imagens/fundos_dekorebas/${dados.dados_decs[j].imagem_fundo}'); background-size: cover; background-position: center; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
              

            </div>

              <div class="flex_col T1" style="padding: 15px; padding-left: 15px; background: ">

                <div class="flex_row flex_col_m T1" style="align-items: center;">
                  <div class="flex_col T1">
                    <span style="font-size: 35px; font-weight: bold;">${dados.dados_decs[j].titulo}</span>
                    <div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: ${largura_porcentagem_titulo}%; background: ${dados.dados_decs[j].cor}; min-height: 5px; border-radius: 7px;"></span>
                    </div>
                  </div>



                  <div class="flex_row T2 T1_m recip_badges_perfil sumido" style="align-items: center;">
                    <img src="../imagens/badges/frances/palavras/le_baguete_1.png" style="width: 40px; height: 40px; margin: 5px; margin-left: 0px;">
                    <img src="../imagens/badges/frances/palavras/le_baguete_1.png" style="width: 40px; height: 40px; margin: 5px;">
                  </div>

                </div>
                
                <span style="font-size: 15pt; display: none;">Total de palavras: ${dados.dados_decs[j].qtd_palavras}</span>

                <div class="flex_row T1 center">
                  <div class="flex_col T2 center" style="font-size: 40px; padding: 15px;">
                                    <i class="icon-multiplas_escolhas"></i>
<div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: ${largura_porcentagem_mult}%; background: ${dados.dados_decs[j].cor}; min-height: 5px; border-radius: 7px;"></span>
                    </div>
                  </div>
                  
                  <div class="flex_col T2 center" style="font-size: 40px; padding: 15px;">
                                    <i class="icon-escrever"></i>

<div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: ${largura_porcentagem_escr}%; background: ${dados.dados_decs[j].cor}; min-height: 5px; border-radius: 7px;"></span>
                    </div>
                  </div>
                  
                </div>

                <div class="flex_row flex_col_m T1 sumido">
                  
                  <div class="flex_col T1 T1_m" style="padding-top: 25px;">

                    <span style="font-style: italic; margin-bottom: 5px;">Palavras</span>


                    <div>
                      <span style="margin-bottom: 5px; font-size: 14pt;">Substantivos 1</span>
                      <span style="margin-bottom: 5px; font-size: 14pt;">12</span>/
                      <span style="margin-bottom: 5px; font-size: 14pt;">51</span>
                    </div>
                    <div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: 40%; background: grey; min-height: 5px; border-radius: 7px;"></span>
                    </div>



                    <div>
                      <span style="margin-bottom: 5px; font-size: 14pt;">Substantivos 2</span>
                      <span style="margin-bottom: 5px; font-size: 14pt;">12</span>/
                      <span style="margin-bottom: 5px; font-size: 14pt;">51</span>
                    </div>
                                        <div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: 40%; background: grey; min-height: 5px; border-radius: 7px;"></span>
                    </div>

                    <div>
                      <span style="margin-bottom: 5px; font-size: 14pt;">Substantivos 3</span>
                      <span style="margin-bottom: 5px; font-size: 14pt;">12</span>/
                      <span style="margin-bottom: 5px; font-size: 14pt;">51</span>
                    </div>

                    <div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: 10%; background: grey; min-height: 5px; border-radius: 7px;"></span>
                    </div>

                    <div>
                      <span style="margin-bottom: 5px; font-size: 14pt;">Substantivos 4</span>
                      <span style="margin-bottom: 5px; font-size: 14pt;">12</span>/
                      <span style="margin-bottom: 5px; font-size: 14pt;">51</span>
                    </div>
                    <div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: 40%; background: grey; min-height: 5px; border-radius: 7px;"></span>
                    </div>

                    <div>
                      <span style="margin-bottom: 5px; font-size: 14pt;">Substantivos 5</span>
                      <span style="margin-bottom: 5px; font-size: 14pt;">12</span>/
                      <span style="margin-bottom: 5px; font-size: 14pt;">51</span>
                    </div>
                    <div class="flex_row T1 listra_porcentagem listra_porc_inativa" style="margin-top: 0px; margin-bottom: 7px;">
                      <span id="porcentagem_cap_1" class="interior_listra_porcentagem" style="width: 40%; background: grey; min-height: 5px; border-radius: 7px;"></span>
                    </div>


                    <div class="flex_col T1">
                      <span>Liberadas: 17 / 38</span>
                      <span>Decoradas: 2 / 38</span>
                    </div>

                  </div>

      

        
                </div>

              </div>
            
          </div>`
      }
    }



    
  }

  const qtd_colegas = (dados.usuario.colegas.length) ? dados.usuario.colegas.length : 0

  let string_seguidores = 'Este perfil ainda não tem seguidores. Seja o primeiro!!'
  if (dados.seguidores.length) {
    string_seguidores = ''

    for (let i = 0; i < dados.seguidores.length; i++) {

      string_seguidores += `<div class="flex_row T1" onclick="monta_perfil('${dados.seguidores[i]._id}')" style="cursor: pointer;"><img src="${dados.seguidores[i].avatar_50}" style="width: 25px; height: 25px; border-radius: 50%; margin-right: 15px;" /> ${dados.seguidores[i].nome} </div>`
    }
  }

  let string_seguidos = 'Este perfil ainda não segue ninguém, deve ser a Beyonce.'
  if (dados.seguidos.length) {
    string_seguidos = ''
    for (let i = 0; i < dados.seguidos.length; i++) {

      string_seguidos += `<div class="flex_row T1" onclick="monta_perfil('${dados.seguidos[i]._id}')" style="cursor: pointer;"><img src="${dados.seguidos[i].avatar_50}" style="width: 25px; height: 25px; border-radius: 50%; margin-right: 15px;" /> ${dados.seguidos[i].nome} </div>`
    }

  }

  const sociais = perfil_sociais({ configuracoes: dados.usuario.configuracoes })

  //const cabecalho = cria_cabecalho('perfil', `${dados.usuario.avatar_50}`, `${dados.usuario._id}`)
  const cabecalho = cria_cabecalho_rapido('perfil')

  const decorebas = dados.decorebas_proprias
  const perfil_propriedade = dados.perfil_propriedade

  const seguidor_seguidores = dados.usuario.seguidores == 1 ? 'seguidor' : 'seguidores'

  const usuario_proprio = dados.usuario_proprio
  const perfis_seguidores = dados.usuario.perfis_seguidores
  const perfis_seguidos = dados.usuario.perfis_seguidos

  const segue_este_perfil = perfil_segue({
    perfis_seguidos: dados.usuario_proprio.perfis_seguidos,
    id_perfil: obj.id_perfil
  })

  const botao_seguir = perfil_botao_seguir({
    perfil_propriedade: dados.perfil_propriedade,
    segue_este_perfil: segue_este_perfil,
    id_perfil: obj.id_perfil
  })

  const botao_criar = perfil_botao_criar({ perfil_propriedade: dados.perfil_propriedade })
  let bot_editar
  let string_decorebas_proprias = ''
  for (let i = 0, lenght = decorebas.length; i < lenght; i++) {

    const botao_editar = perfil_botao_editar({ perfil_propriedade: dados.perfil_propriedade, id_decoreba: decorebas[i]._id })
   
    const data_decoreba = data_mongodb_html ('mongodb_para_visualizacao', decorebas[i].data_criacao)

    let string_titulos_capitulos = ''
    let virgula_final = ''

    for (let j = 0; j < decorebas[i].capitulos.length; j++) {
      if (j === decorebas[i].capitulos.length - 1) {
        virgula_final = ''
      } else {
        virgula_final = ', '
      }
      string_titulos_capitulos += `${decorebas[i].capitulos[j].titulo}${virgula_final}`

    }

    const ico_estrela = perfil_ico_estrela({
      decorebas_curtidas: dados.usuario_proprio.decorebas_curtidas,
      id_decoreba: decorebas[i]._id
    })

    const marcacao_0 = (decorebas[i].marcacoes[0].marcacao != '') ? `#${decorebas[i].marcacoes[0].marcacao}` : ''
    const marcacao_1 = (decorebas[i].marcacoes[1].marcacao != '') ? `#${decorebas[i].marcacoes[1].marcacao}` : ''
    const marcacao_2 = (decorebas[i].marcacoes[2].marcacao != '') ? `#${decorebas[i].marcacoes[2].marcacao}` : ''
    const marcacao_3 = (decorebas[i].marcacoes[3].marcacao != '') ? `#${decorebas[i].marcacoes[0].marcacao}` : ''
    const marcacao_4 = (decorebas[i].marcacoes[4].marcacao != '') ? `#${decorebas[i].marcacoes[4].marcacao}` : ''

    const eh_editavel = (dados.usuario_proprio._id === obj.id_perfil) ? 'sim' : 'nao'

    string_decorebas_proprias += carta({
      editavel: `${eh_editavel}`,
      avatar_criador: `${dados.usuario_proprio.avatar_50}`,
      id_criador: `${dados.usuario_proprio._id}`,
      nome_criador: `${dados.usuario_proprio.nome}`,
      data_carta: `${data_decoreba}`,
      id_decoreba: `${decorebas[i]._id}`,
      ico_estrela: `${ico_estrela}`,
      estrelas: `${decorebas[i].quem_curtiu.length}`,
      cor: `${decorebas[i].cor}`,
      cor_letras: `${decorebas[i].cor_letras}`,
      titulo: `${decorebas[i].titulo}`,
      idioma_1: `${decorebas[i].idioma_1}`,
      idioma_2: `${decorebas[i].idioma_2}`,
      idioma_1_sistemas_escrita: decorebas[i].idioma_1_sistemas_escrita,
      idioma_2_sistemas_escrita: decorebas[i].idioma_2_sistemas_escrita,
      string_titulos_capitulos: `${string_titulos_capitulos}`,
      marcacao_0: `${marcacao_0}`,
      marcacao_1: `${marcacao_1}`,
      marcacao_2: `${marcacao_2}`,
      marcacao_3: `${marcacao_3}`,
      marcacao_4: `${marcacao_4}`
    })

  }

  return {
    cabecalho: cabecalho,
    dados: dados,
    segue_este_perfil: segue_este_perfil,

    string_decorebas_praticadas: string_decorebas_praticadas,

    string_seguidores: string_seguidores,
    string_seguidos: string_seguidos,

    avatar: dados.usuario.avatar,
    avatar_50: dados.usuario.avatar_50,
    avatar_400: dados.usuario.avatar_400,
    nome: dados.usuario.nome,
    login: dados.usuario.login,
    qtd_seguidores: dados.usuario.perfis_seguidores.length,
    seguidor_seguidores: seguidor_seguidores,

    qtd_seguidos: dados.usuario.perfis_seguidos.length,
    qtd_colegas: qtd_colegas,


    botao_seguir: botao_seguir,
    botao_criar: botao_criar,
    string_decorebas_proprias: string_decorebas_proprias,

    facebook: sociais.facebook,
    instagram: sociais.instagram,
    youtube: sociais.youtube,
    twitter: sociais.twitter,
    linkedin: sociais.linkedin,
    email: sociais.email
  }
}

async function  alimenta_perfil (id_perfil, modo_de_vinda) {
  
  const stateObj = { tela_ativa: 'perfil' }

  if (id_perfil == 'sem_id__estais_offline') {
    // AQUI DESENHAMOS A PÁGINA OFFLINE
    // Ou não fazemos nada.
    history.replaceState(stateObj, '', 'perfil')

  } else {

    await verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda, id_perfil: id_perfil })

    const objeto = await preparacao_perfil({ id_perfil: id_perfil })

    document.getElementById('recip_string_seguidores').innerHTML = objeto.string_seguidores
    document.getElementById('recip_string_seguidos').innerHTML = objeto.string_seguidos

    document.getElementById('span_nome').innerHTML = objeto.nome

    document.getElementById('opc_nome').value = objeto.nome
    document.getElementById('opc_email').value = objeto.login

    document.getElementById('img_perfil_avatar').src = objeto.avatar_400
    document.getElementById('qtd_colegas').innerHTML = objeto.qtd_colegas

    document.getElementById('recip_perfil_facebook').innerHTML = objeto.facebook
    document.getElementById('recip_perfil_instagram').innerHTML = objeto.instagram
    document.getElementById('recip_perfil_youtube').innerHTML = objeto.youtube
    document.getElementById('recip_perfil_twitter').innerHTML = objeto.twitter
    document.getElementById('recip_perfil_linkedin').innerHTML = objeto.linkedin
    document.getElementById('recip_perfil_email').innerHTML = objeto.email

    document.getElementById('div_botao_seguir').innerHTML = objeto.botao_seguir

    // id de exemplo.
    // id_faz_dekorebas tá cadastrado no env.js como a conta do Jamiro Kway.

    // if (id_perfil === '6655c6aac6da41188694eeb9') {
    if (id_perfil === '66bb452faa9c0ee6133fafb9') { // id hardcoded do Jamiro.

      // if (id_perfil === id_faz_dekorebas) {
      document.getElementById('botao_criar').innerHTML = objeto.botao_criar
    }

    document.getElementById('recip_decorebas_praticadas').innerHTML = objeto.string_decorebas_praticadas
    document.getElementById('perfil_recip_decorebas_proprias').innerHTML = objeto.string_decorebas_proprias
  }
}

async function prepara_busca_usuario (obj) {


  const input_busca = document.getElementById('input_texto_busca_usuario')
  input_busca.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      buscar_usuario(`${input_busca.value}`, 1)
    }
  });

  let botao_busca_usuario = document.getElementById('botao_busca_usuario')
  botao_busca_usuario.addEventListener("mousedown", () => {
    buscar_usuario(`${input_busca.value}`, 1)
  });


  let recip = document.getElementById('recip_busca_usuario')
  if (!obj.usuarios.length) {
    recip.innerHTML = 'Não há usuario'
  } else {

    for (let i = 0; i < obj.usuarios.length; i++) {

      const sociais = perfil_sociais({ configuracoes: obj.usuarios[i].configuracoes })

      recip.innerHTML += `
      <div class="flex_row T1 recip_usuario_encontrado" style="padding: 25px;" onclick="monta_perfil('${obj.usuarios[i]._id}')">
          <div class="flex_row">
            <img src="${obj.usuarios[i].avatar_400}" width="150px" style="border-radius: 25px; margin-right: 25px;" />
          </div>
          <div class="flex_col T1" style="justify-content: center; font-size: 18pt;">
            <span>${obj.usuarios[i].nome}</span>
            <div class="flex_row">${sociais.facebook}${sociais.instagram}${sociais.youtube}${sociais.twitter}${sociais.linkedin}${sociais.email}</div>
            
          </div>
        </div>
      `
    }

  }

  // const paginacao = gera_menu_paginacao(eita, 'longarina', obj.pagina, obj.qtd_total_resultados, total_paginas: obj.total_paginas)

  const paginacao = gera_menu_paginacao_2(obj.nome_buscado, obj.pagina, obj.qtd_total_resultados, obj.total_paginas)

  const string = `<div class="flex_row T1 center">${paginacao.botao_volta}${paginacao.reticencias_inicio}${paginacao.botoes}${paginacao.reticencias_final}${paginacao.botao_vai}</div>`
  recip.innerHTML += string
}

async function preparacao_opcoes (obj) {

  // const dados = await vai_filhao_2('logout')
  const dados = await vai_filhao_2('opcoes_puxa')

  // const cabecalho = cria_cabecalho('opcoes', `${dados.avatar_50}`, `${dados._id}`)

  const facebook_checado = dados.configuracoes.facebook === 'nao_tem' ? '' : 'checked'
  const facebook_classe = facebook_checado === "checked" ? '' : 'sumido'
  const facebook_valor = facebook_checado === "checked" ? `${dados.configuracoes.facebook}` : ''

  const instagram_checado = dados.configuracoes.instagram === 'nao_tem' ? '' : 'checked'
  const instagram_classe = instagram_checado === "checked" ? '' : 'sumido'
  const instagram_valor = instagram_checado === "checked" ? `${dados.configuracoes.instagram}` : ''

  const youtube_checado = dados.configuracoes.youtube === 'nao_tem' ? '' : 'checked'
  const youtube_classe = youtube_checado === "checked" ? '' : 'sumido'
  const youtube_valor = youtube_checado === "checked" ? `${dados.configuracoes.youtube}` : ''

  const twitter_checado = dados.configuracoes.twitter === 'nao_tem' ? '' : 'checked'
  const twitter_classe = twitter_checado === "checked" ? '' : 'sumido'
  const twitter_valor = twitter_checado === "checked" ? `${dados.configuracoes.twitter}` : ''

  const linkedin_checado = dados.configuracoes.linkedin === 'nao_tem' ? '' : 'checked'
  const linkedin_classe = linkedin_checado === "checked" ? '' : 'sumido'
  const linkedin_valor = linkedin_checado === "checked" ? `${dados.configuracoes.linkedin}` : ''

  const diurno_checado = dados.configuracoes.modo_tela === 'diurno' ? 'checked' : ''
  const noturno_checado = dados.configuracoes.modo_tela === 'noturno' ? 'checked' : ''

  const curta_checado = dados.configuracoes.distancia === 'distancia_curta' ? 'checked' : ''
  const media_checado = dados.configuracoes.distancia === 'distancia_media' ? 'checked' : ''
  const longa_checado = dados.configuracoes.distancia === 'distancia_longa' ? 'checked' : ''

  return {
    // cabecalho: cabecalho,

    nome: dados.nome,
    email: dados.email,
    avatar: dados.avatar,
    avatar_50: dados.avatar_50,
    avatar_400: dados.avatar_400,

    facebook_checado: facebook_checado,
    facebook_classe: facebook_classe,
    facebook_valor: facebook_valor,

    instagram_checado: instagram_checado,
    instagram_classe: instagram_classe,
    instagram_valor: instagram_valor,

    youtube_checado: youtube_checado,
    youtube_classe: youtube_classe,
    youtube_valor: youtube_valor,

    twitter_checado: twitter_checado,
    twitter_classe: twitter_classe,
    twitter_valor: twitter_valor,

    linkedin_checado: linkedin_checado,
    linkedin_classe: linkedin_classe,
    linkedin_valor: linkedin_valor,

    diurno_checado: diurno_checado,
    noturno_checado: noturno_checado,

    modo_tela: dados.configuracoes.modo_tela,

    curta_checado: curta_checado,
    media_checado: media_checado,
    longa_checado: longa_checado
  }
}

async function prepara_opcoes_3 (objeto) {

  // document.getElementById('opc_nome').value = objeto.nome
  document.getElementById('opc_email').value = objeto.email
  
  document.getElementById('botao_alterar_email').addEventListener("click", () => { alterar_email(objeto.email) })
  document.getElementById('botao_alterar_senha').addEventListener("click", () => { alterar_senha(objeto.email) })
}


async function prepara_opcoes_2 (objeto) {

  altera_diurno_noturno (objeto.modo_tela)

  const input_busca = document.getElementById('input_texto_busca_usuario')
  input_busca.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      buscar_usuario(`${input_busca.value}`, 1)
    }
  });

  let botao_busca_usuario = document.getElementById('botao_busca_usuario')
  botao_busca_usuario.addEventListener("mousedown", () => {
    buscar_usuario(`${input_busca.value}`, 1)
  });


  // document.getElementById('opcoes_avatar_400').src = objeto.avatar_400
  document.getElementById('opc_nome').value = objeto.nome
  document.getElementById('opc_email').value = objeto.email

  document.getElementById('input_email_invisivi').value = objeto.email

  document.getElementById('botao_alterar_email').addEventListener("click", () => { alterar_email(objeto.email) })
  document.getElementById('botao_alterar_senha').addEventListener("click", () => { alterar_senha(objeto.email) })

  document.getElementById('opcoes_avatar_placeholder').src = objeto.avatar_400

  if (objeto.facebook_checado == 'checked') {
    document.getElementById('opc_facebook_checkbox').checked = true
    document.getElementById('opc_facebook_recip').style.display = 'flex'
  }
  if (objeto.facebook_classe != '') document.getElementById('opc_facebook_recip').classList.add(`${objeto.facebook_classe}`)
  // Aqui, retiramos o https://www. dos inputs, para deixar tudo mais belo.
  if (objeto.facebook_valor) {
    if (objeto.facebook_valor.includes("https://www."))  {
      objeto.facebook_valor = objeto.facebook_valor.replace("https://www.", "")
    }
  }

  document.getElementById('opc_facebook_input').value = objeto.facebook_valor

  if (objeto.instagram_checado == 'checked') {
    document.getElementById('opc_instagram_checkbox').checked = true
    document.getElementById('opc_instagram_recip').style.display = 'flex'
  }
  if (objeto.instagram_classe != '') document.getElementById('opc_instagram_recip').classList.add(`${objeto.instagram_classe}`)
  if (objeto.instagram_valor) {
    if (objeto.instagram_valor.includes("https://www."))  {
      objeto.instagram_valor = objeto.instagram_valor.replace("https://www.", "")
    }
  }
  
  document.getElementById('opc_instagram_input').value = objeto.instagram_valor
  

  if (objeto.youtube_checado == 'checked') {
    document.getElementById('opc_youtube_checkbox').checked = true
    document.getElementById('opc_youtube_recip').style.display = 'flex'
  }
  if (objeto.youtube_classe != '') document.getElementById('opc_youtube_recip').classList.add(`${objeto.youtube_classe}`)
  if (objeto.youtube_valor) {
    if (objeto.youtube_valor.includes("https://www.")) {
      objeto.youtube_valor = objeto.youtube_valor.replace("https://www.", "")
    }
  }
  document.getElementById('opc_youtube_input').value = objeto.youtube_valor

  if (objeto.twitter_checado == 'checked') {
    document.getElementById('opc_twitter_checkbox').checked = true
    document.getElementById('opc_twitter_recip').style.display = 'flex'
  }
  if (objeto.twitter_classe != '') document.getElementById('opc_twitter_recip').classList.add(`${objeto.twitter_classe}`)
  if (objeto.twitter_valor) {
    if (objeto.twitter_valor.includes("https://www.")) {
      objeto.twitter_valor = objeto.twitter_valor.replace("https://www.", "")
    }
  }
  document.getElementById('opc_twitter_input').value = objeto.twitter_valor

  if (objeto.linkedin_checado == 'checked') {
    document.getElementById('opc_linkedin_checkbox').checked = true
    document.getElementById('opc_linkedin_recip').style.display = 'flex'
  }
  if (objeto.linkedin_classe != '') document.getElementById('opc_linkedin_recip').classList.add(`${objeto.linkedin_classe}`)

  if (objeto.linkedin_valor) {
    if (objeto.linkedin_valor.includes("https://www.")) {
      objeto.linkedin_valor = objeto.linkedin_valor.replace("https://www.", "")
    }
  }
  document.getElementById('opc_linkedin_input').value = objeto.linkedin_valor

  // if (objeto.diurno_checado == 'checked') document.getElementById('tema_diurno').checked = true
  // if (objeto.noturno_checado == 'checked') document.getElementById('tema_noturno').checked = true

}

let string_capitulos = '' // Aqui ficará um por um dos itens da lista de capítulos.
let string_capitulos_sist_escr = '' // Aqui ficará um por um dos itens da lista de capítulos.
let strings_capitulos_outros = ''
let string_capitulos_verbos = ''

var qtd_objetivo_acertos = 25
var currentIndex_global = 0
var jogo_nav_teclado = 'nao'

async function prepara_decoreba_mostra (id_decoreba) {

  // Resetamos essas duas variáveis globais acima declaradas, para resetar a navegação pelo teclado.
  frase_traduzida = 'nao' // var flobal
  jogo_nav_teclado = 'nao'
  currentIndex_global = 0
  // Primeiro limpamos as coisas.
  loading('carregou')

  /* Contador de caracteres da frase para traduzir */
  const input = document.getElementById("traducao_a_analizar");
  const contador = document.getElementById("contador");
  const maxLength = input.getAttribute("maxlength");

  input.addEventListener("input", () => {
    const currentLength = input.value.length;
    contador.textContent = `${currentLength}/${maxLength}`;
  });

  string_capitulos = ''
  string_capitulos_sist_escr = ''
  string_capitulos_verbos = ''
  strings_capitulos_outros = ''
  
  document.getElementById('div_recip_string_capitulos').innerHTML = ''
  document.getElementById('recip_verbos').innerHTML = ''
  
  const json = await vai_filhao_2('decoreba_mostra', id_decoreba)
  jasao_temp = []


  // Agora, o botao_envia_frase virou o botao_analiza_traducao
  document.getElementById('botao_analiza_traducao').onclick = () => {

    analiza_traducao(json.item.idioma_1)
  };


  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      analiza_traducao(json.item.idioma_1)
    }
  });

  document.getElementById('botao_gera_frase').onclick = async () => {
    // gerar_frase(json.item.idioma_1)

    // Aqui, temos que ativar a API da Llama para termos uma frase, em português, no caso, para ser
    // a próxima a ser traduzida na parte de Frases.

    loading('loading...')
    let frase = await vai_filhao_2('cria_frase', `${id_decoreba}`)
    if (frase.msg ===  'cria_frase__menos_tres_palavras') {
      alert("Você precisa de ao menos 3 palavras dekoradas, para treinar a formação de frases.")
      location.reload()
    }

    document.getElementById('span_frase_a_traduzir').innerHTML = frase.frase_portugues
    document.getElementById('recip_traduzir_frase').style.display = 'flex'

    document.getElementById('span_resposta_traducao').innerHTML = ''
    document.getElementById('traducao_a_analizar').value = ''

    document.getElementById('traducao_a_analizar').disabled = false
  }



  let decorebas_praticadas = []
  if (json.usuario) decorebas_praticadas = json.usuario.decorebas_praticadas
  
  // Parece que esse altera_diurno_noturno() tem que ter em todas as telas.
  // No entanto, é ele quem faz a tela escurecer quando recarrega.
  // O certo seria a tela já começar escura, ou clara, dependendo do modo já setado.
  altera_diurno_noturno (json.usuario.configuracoes[0].modo_tela)

  // Aqui precisamos separar as palavras liberadas do capítulo que será mostrada a lista.
  // Para mostrar apenas as palavras liberadas, e um borrão nas que faltam liberar.
  
  // SE FOR TREINO DE UM CAPÍTULO SOMENTE.
  // Passa por cada palavra do capitulo.
    
  let caps_praticados = []
    
  let palavras_liberadas_mult = [] // Todas as palavras liberadas no mult
  let palavras_liberadas_escr = [] // Todas as palavras liberaas no escr

  let palavras_decoradas = []
  let capitulos_com_palavras_decoradas = [] // aqui só irá o id do dito cujo do capítulo.

  for (let i = 0; i < decorebas_praticadas.length; i++) {

    // Achou esta dekoreba.
    if (decorebas_praticadas[i].id_decoreba === id_decoreba) {

      const dec_praticada = decorebas_praticadas[i]

      for (let j = 0; j < dec_praticada.caps_praticados.length; j++) {

        let decorou_algo_nesse_cap = 'nao'
        const caps_praticado = dec_praticada.caps_praticados[j]

        // Aqui, se decorou a palavra, estará marcado o campo decorada === 'sim' no liberadas_mult e no escr.
        for (let k = 0; k < caps_praticado.palavras_liberadas_mult.length; k++) {
          palavras_liberadas_mult.push(caps_praticado.palavras_liberadas_mult[k])

          if (caps_praticado.palavras_liberadas_mult[k].decorada === 'sim') decorou_algo_nesse_cap = 'sim'
        }
        for (let k = 0; k < caps_praticado.palavras_liberadas_escr.length; k++) {
          palavras_liberadas_escr.push(caps_praticado.palavras_liberadas_escr[k])
        }

        if (decorou_algo_nesse_cap === 'sim') {
          capitulos_com_palavras_decoradas.push(dec_praticada.caps_praticados[j].id_capitulo)
        }
        
      }
    }
  }


  let eit = ''
  let classe_tem_decorada = 'nao_tem_decorada'
  for (let i = 0; i < json.item.capitulos.length; i++) {

    const capitulo = json.item.capitulos[i]
    let cor = 'color: gray;'
    let input = 'disabled'
    for (let j = 0; j < capitulos_com_palavras_decoradas.length; j++) {
      if (capitulos_com_palavras_decoradas[j] == capitulo._id) {

        cor = ''
        input = ''
      }
    }

    eit += `<div style="${cor}">${capitulo.titulo} <input id="" type="text input_texto" style="width: 20px;" ${input}></div>`
  }

  // Funfa mais ou menos.
  // document.getElementById('recip_capitulos_frase').innerHTML = eit


  let dec_praticada
  let soma_liberadas_mult = 0
  let soma_liberadas_escr = 0

  let soma_decoradas_mult = 0
  let soma_decoradas_escr = 0

  const numero_maximo_acertos = 6 // 3 em orientação 1-2 e 3 em orientação 2-1.

  for (let i = 0; i < decorebas_praticadas.length; i++) {

    if (decorebas_praticadas[i].id_decoreba == id_decoreba) {
      dec_praticada = decorebas_praticadas[i]

      for (let j = 0; j < dec_praticada.caps_praticados.length; j++) {

        // Se tem alguma palavra liberada MULT, nesse capítulo...
        if (dec_praticada.caps_praticados[j].palavras_liberadas_mult.length) {
          for (let k = 0; k < dec_praticada.caps_praticados[j].palavras_liberadas_mult.length; k++) {
            
            soma_liberadas_mult++

            let pontuacao_da_palavra = 0
            const palavras_liberadas = dec_praticada.caps_praticados[j].palavras_liberadas_mult[k]
            for (let l = 0; l < palavras_liberadas.acertos_e_erros.length; l++) {
              pontuacao_da_palavra += palavras_liberadas.acertos_e_erros[l].n_acertos_erros
            }
            if (pontuacao_da_palavra === numero_maximo_acertos) soma_decoradas_mult++
          }
        }

        // Se tem alguma palavra liberada ESCR, nesse capítulo...
        if (dec_praticada.caps_praticados[j].palavras_liberadas_escr.length) {
          for (let k = 0; k < dec_praticada.caps_praticados[j].palavras_liberadas_escr.length; k++) {
            soma_liberadas_escr++


            let pontuacao_da_palavra = 0
            const palavras_liberadas = dec_praticada.caps_praticados[j].palavras_liberadas_escr[k]
            for (let l = 0; l < palavras_liberadas.acertos_e_erros.length; l++) {
              pontuacao_da_palavra += palavras_liberadas.acertos_e_erros[l].n_acertos_erros
            }
            if (pontuacao_da_palavra === numero_maximo_acertos) soma_decoradas_escr++

          }
        }
        
      }
    }
  }

  let obj // Essa let guardará o capítulo stringifado.

  // Bandeiras
  const bandeira_idi_1 = volta_bandeira(json.item.idioma_1, 50, 0)
  const bandeira_idi_2 = volta_bandeira(json.item.idioma_2, 50, 0)

  // GAMBIARRA!!!
  // Aqui só tem essa parada de bandeira extrangeira, idioma === 'Português' pq todo o sistema está esperando que...
  // ...um dos idiomas de cada dekoreba cadastrada seja o português.
  // Isso não é correto, mas está funcionando agora neste MVP, que só deve atuar em território brasileiro.
  // Quando ele for exportado para outras línguas, deverá ter dekorebas em indiano e chinês, por exemplo,
  // aí as paradas podem ficar diferenciadas, ou não, pois se o usuário for indiano, provavelmente ele não
  // precisará praticar os próprios alfabetos da língua dele, logo, teriam mesmo apenas 3 orientações possíveis.
  // chinês/indiano, indiano/chinês e chinês/chinês, para ele treinar o alfabeto chino.
  // Mas não sei bem direito, pra saber só mesmo utilizando esta funcionalidade e testando as possibilidades.
  let bandeira_extrangeira = ''

  let recip_capitulos_trofeus = document.getElementById('recip_capitulos_trofeus')

  let qtd_alfabetos_idioma_extrangeiro = 1

  // Primeiro temos que saber qual é o idioma extrangeiro, se o 1 ou o 2.
  let idioma_1 = json.item.idioma_1
  let idioma_2 = json.item.idioma_2

  let idioma_extrangeiro = ''
  if (idioma_1 === "Português") {
    if (idioma_2 != "Português") {
      idioma_extrangeiro = idioma_2
      bandeira_extrangeira = bandeira_idi_2
    }
  }

  if (idioma_2 === 'Português') {
    if (idioma_1 != 'Português') {
      idioma_extrangeiro = idioma_1
      bandeira_extrangeira = bandeira_idi_1
    }
  }

  if (idioma_1 === 'Português' & idioma_2 === 'Português') idioma_extrangeiro = 'nao_tem'

  // Essa parte de baixo aqui tb tá meio feia, cheia das lets, mas tá funfandoz
  let qtd_alfabetos_extrangeiros = qtos_alfabetos_tem(idioma_extrangeiro)
  
  let qtd_orientacoes = (qtd_alfabetos_extrangeiros > 1) ? 3 : 2

  let qtd_objetivo_capitulos = qtd_objetivo_acertos * qtd_orientacoes

  // esse for aqui debaixo é bem desnecessário, tem um la embaixo que faz algo parecido.
  // mas ele calcula se tem algum capitulo de verbo.
  // Lembrando que só pode ter um capitulo de verbo, senão trava tudo. Por enquanto tá valendo.
  let tem_verbos = 'nao'
  for (let i = 0; i < json.item.capitulos.length; i++) {
    if (json.item.capitulos[i].tipo === 'verbos') tem_verbos = 'sim'
  }
  
  let qtd_capitulos_nao_verbos = json.item.capitulos.length
  if (tem_verbos === 'sim') qtd_capitulos_nao_verbos--

  let qtd_objetivos_dekoreba = qtd_objetivo_capitulos * qtd_capitulos_nao_verbos

  // Html do título da própria dekoreba.
  recip_capitulos_trofeus.innerHTML += `<div class="flex_row T1" style="font-size: 24px;">
    <div class="flex_row T2" style="background: white; justify-content: flex-end; padding-right: 10px;">
      ${json.item.titulo}
    </div>

    <div class="flex_row T4 center mostra_porcento center" style="background: white;">
      <span id="porcento_dek_mult"></span>%
    </div>
    <div class="flex_row T4 center mostra_pontos sumido">
      <span id="acertos_dek_mult"></span>/${qtd_objetivos_dekoreba}
    </div>

    <div class="flex_row T4 center mostra_porcento center" style="background: white;">
      <span id="porcento_dek_escr"></span>%
    </div>
    <div class="flex_row T4 center mostra_pontos sumido">
      <span id="acertos_dek_escr"></span>/${qtd_objetivos_dekoreba}
    </div>
  
  </div>
  `

  let acertos_mult__1_2 = 0
  let acertos_mult__2_1 = 0
  let acertos_mult__treino_alfabeto = 0

  let acertos_escr__1_2 = 0
  let acertos_escr__2_1 = 0
  let acertos_escr__treino_alfabeto = 0
  
  // as lets acertos__1_1 e acertos__2_2 estão fora de ação agora pq o português está em todas as dekorebas.
  // Não me parece certo mas, por enquanto, está funcionando perfeitamente.

  let soma_capitulo_mult = 0
  let soma_capitulo_escr = 0

  let soma_acertos_dek_mult = 0
  let soma_acertos_dek_escr = 0

  let total_palavras = 0
  for (let i = 0; i < json.item.capitulos.length; i++) {
    if (json.item.capitulos[i].vocabulario.length) {
      for (let j = 0; j < json.item.capitulos[i].vocabulario.length; j++) {
        
        // Com esse === 'pra_valer', ignoramos as palavras dos treinos.
        if (json.item.capitulos[i].tipo === 'pra_valer' || json.item.capitulos[i].tipo === 'sistema_escrita') {
          total_palavras++
        }
      }
    }
  }

  for (let i = 0; i < json.item.capitulos.length; i++) {

    if (json.item.capitulos[i].tipo != 'verbos') {

      acertos_mult__1_2 = 0
      acertos_mult__2_1 = 0
      acertos_mult__treino_alfabeto = 0

      acertos_escr__1_2 = 0
      acertos_escr__2_1 = 0
      acertos_escr__treino_alfabeto = 0

      // Aqui nessa parte, verificamos se este capítulo [i] já foi praticado, em qual modalidade e em qual orientação.
      // Para logo em seguida, preenchermos as lets correspondentes e mostrarmos devidamente.
      if (decorebas_praticadas.length) {

        for (let j = 0; j < decorebas_praticadas.length; j++) {

          if (decorebas_praticadas[j].id_decoreba == id_decoreba) {

            for (let k = 0; k < decorebas_praticadas[j].cap_praticados_mult.length; k++) {

              if (decorebas_praticadas[j].cap_praticados_mult[k].id_capitulo == json.item.capitulos[i]._id) {
                // Aqui achou o capitulo praticado e tals, vejamos.
                cap_praticado = decorebas_praticadas[j].cap_praticados_mult[k]

                if (cap_praticado.orientacao === '1-2') acertos_mult__1_2 = cap_praticado.max_acertos
                if (cap_praticado.orientacao === '2-1') acertos_mult__2_1 = cap_praticado.max_acertos
                if (cap_praticado.orientacao === '1-1' || cap_praticado.orientacao === '2-2') {
                  acertos_mult__treino_alfabeto = cap_praticado.max_acertos
                }
              }
            }

            // Aqui já dá pra alimentar aquela var.

            for (let k = 0; k < decorebas_praticadas[j].cap_praticados_escr.length; k++) {

              if (decorebas_praticadas[j].cap_praticados_escr[k].id_capitulo == json.item.capitulos[i]._id) {

                // Aqui achou o capitulo praticado e tals, vejamos.
                cap_praticado = decorebas_praticadas[j].cap_praticados_escr[k]

                if (cap_praticado.orientacao === '1-2') acertos_escr__1_2 = cap_praticado.max_acertos
                if (cap_praticado.orientacao === '2-1') acertos_escr__2_1 = cap_praticado.max_acertos
                if (cap_praticado.orientacao === '1-1' || cap_praticado.orientacao === '2-2') {
                  acertos_escr__treino_alfabeto = cap_praticado.max_acertos
                }
              }
            }
          }
        }
      }

      soma_capitulo_mult = acertos_mult__1_2 + acertos_mult__2_1 + acertos_mult__treino_alfabeto
      soma_capitulo_escr = acertos_escr__1_2 + acertos_escr__2_1 + acertos_escr__treino_alfabeto
      
      const porcentagem_soma_capitulo_mult = calcula_porcento (soma_capitulo_mult, qtd_objetivo_capitulos)
      const porcentagem_soma_capitulo_escr = calcula_porcento (soma_capitulo_escr, qtd_objetivo_capitulos)

      const porcentagem_mult__1_2 = calcula_porcento (acertos_mult__1_2, qtd_objetivo_acertos)
      const porcentagem_mult__2_1 = calcula_porcento (acertos_mult__2_1, qtd_objetivo_acertos)
      const percentagem_mult__treino_alfabeto = calcula_porcento (acertos_mult__treino_alfabeto, qtd_objetivo_acertos)

      const porcentagem_escr__1_2 = calcula_porcento (acertos_escr__1_2, qtd_objetivo_acertos)
      const porcentagem_escr__2_1 = calcula_porcento (acertos_escr__2_1, qtd_objetivo_acertos)
      const percentagem_escr__treino_alfabeto = calcula_porcento (acertos_escr__treino_alfabeto, qtd_objetivo_acertos)

      recip_capitulos_trofeus.innerHTML += `<div class="flex_row T1 center" style="margin-top: 25px; font-size: 19px; margin-bottom: 5px;">

        <div class="flex_row T2" style="background: white; justify-content: flex-end; padding-right: 10px;">
          ${json.item.capitulos[i].titulo}
        </div>

        <div class="flex_row T2">

          <div class="flex_row T2 center" style="background: white;">
            <span class="mostra_porcento" style="">
              ${porcentagem_soma_capitulo_mult}%
            </span>
            <span class="mostra_pontos sumido">
              ${soma_capitulo_mult}/${qtd_objetivo_capitulos}
            </span>
          </div>
          
          <div class="flex_row T2 center">
            <span class="mostra_porcento" style="">
              ${porcentagem_soma_capitulo_escr}%
            </span>
            <span class="mostra_pontos sumido">
              ${soma_capitulo_escr}/${qtd_objetivo_capitulos}
            </span>
          </div>
            
        </div>
        </div>

          <div class="flex_row T1" style="font-size: 17px;">
            <div class="flex_row T2" style="padding-left: 20px; justify-content: flex-end; font-size: 27px; background: white; padding-right: 10px;">
              ${bandeira_idi_1} / ${bandeira_idi_2}
            </div>
            <div class="flex_row T2">
              <div class="flex_row T2 center" style="background: white;">
                <span class="mostra_porcento">${porcentagem_mult__1_2}%</span>
                <span class="mostra_pontos sumido">${acertos_mult__1_2}/${qtd_objetivo_acertos}</span>
              </div>
              <div class="flex_row T2 center">
                <span class="mostra_porcento">${porcentagem_escr__1_2}%</span>
                <span class="mostra_pontos sumido">${acertos_escr__1_2}/${qtd_objetivo_acertos}</span>
              </div>
            </div>
          </div>

          <div class="flex_row T1" style="font-size: 18px;">
            <div class="flex_row T2" style="padding-right: 10px; padding-left: 20px; justify-content: flex-end; font-size: 27px;">
              ${bandeira_idi_2} / ${bandeira_idi_1}
            </div>
            <div class="flex_row T2">
              <div class="flex_row T2 center" style="background: white;">
                <span class="mostra_porcento">${porcentagem_mult__2_1}%</span>
                <span class="mostra_pontos sumido">${acertos_mult__2_1}/${qtd_objetivo_acertos}</span>
              </div>
              <div class="flex_row T2 center">
                <span class="mostra_porcento">${porcentagem_escr__2_1}%</span>
                <span class="mostra_pontos sumido">${acertos_escr__2_1}/${qtd_objetivo_acertos}</span>
              </div>
            </div>
          </div>
        `

    if (qtd_orientacoes > 2) {
      recip_capitulos_trofeus.innerHTML += `

      <div class="flex_row T1" style="font-size: 18px;">
        <div class="flex_row T2" style="padding-right: 10px; padding-left: 20px; justify-content: flex-end; font-size: 27px;">
          ${bandeira_extrangeira} / ${bandeira_extrangeira}
        </div>
            <div class="flex_row T2">
              <div class="flex_row T2 center" style="background: white;">
                <span class="mostra_porcento">${percentagem_mult__treino_alfabeto}%</span>
                <span class="mostra_pontos sumido">${acertos_mult__treino_alfabeto}/${qtd_objetivo_acertos}</span>
              </div>
              <div class="flex_row T2 center">
                <span class="mostra_porcento">${percentagem_escr__treino_alfabeto}%</span>
                <span class="mostra_pontos sumido">${acertos_escr__treino_alfabeto}/${qtd_objetivo_acertos}</span>
              </div>
            </div>
          </div>
        `
    }
    

      soma_acertos_dek_mult += soma_capitulo_mult
      soma_acertos_dek_escr += soma_capitulo_escr
    }
    
  }


  const porcentagem_acertos_dek_mult = calcula_porcento (soma_acertos_dek_mult, qtd_objetivos_dekoreba)
  const porcentagem_acertos_dek_escr = calcula_porcento (soma_acertos_dek_escr, qtd_objetivos_dekoreba)

  document.getElementById('acertos_dek_mult').innerHTML = soma_acertos_dek_mult
  document.getElementById('acertos_dek_escr').innerHTML = soma_acertos_dek_escr

  document.getElementById('porcento_dek_mult').innerHTML = porcentagem_acertos_dek_mult
  document.getElementById('porcento_dek_escr').innerHTML = porcentagem_acertos_dek_escr

  // Aqui, alteramos na raíz do css os valores reefrentes as cores dos botões.
  // Definimos estes novos valores de acordo com a cor da dekoreba mostrada.

  let raiz_css = document.querySelector(':root')
  raiz_css.style.setProperty('--botao_ativo', json.item.cor)

  if (diurno_noturno === 'noturno') {

  }

  // Essa função abaixo, tinycolor, é de terceiros. 
  // Ela devolve tons mais claros ou mais escuros, dependendo da cor que passamos para ela. Uma velezura.
  const cor_dekoreba_clara = tinycolor(json.item.cor).lighten(10).desaturate(10).toString()
  const cor_dekoreba_escura = tinycolor(json.item.cor).darken(10).toString()

  // GAMBIARRA ALERT!
  // Esse cor_bot_ativo_desaturada vai estar ativo por padrão pois o sistema ainda não reconhece se a dekoreba está em modo de treinamento e em modo pra valer. Por enquanto tá sempre em treinamento primeiro.
  let cor_bot_ativo_desaturada = tinycolor(json.item.cor).lighten(20).desaturate(20).toString()

  // E utilizamos estes novos valores entregues pela tinycolor nos botões deste dekoreba.
  raiz_css.style.setProperty('--letras_dekorebas', json.item.cor_letras)
  raiz_css.style.setProperty('--botao_ativo_claro', cor_dekoreba_clara)
  raiz_css.style.setProperty('--botao_ativo_escuro', cor_dekoreba_escura)

  let data
  let dia
  let numero_mes
  let mes
  let ano

  let limite_corretas

  orientacao_idiomas = '1-2'
  orientacao_idiomas_global = orientacao_idiomas
  
  let decoreba_da_vez = []
  
  let decoreba_foi_praticada = 'nao'

  if (decorebas_praticadas.length) {

    for (let i = 0; i < decorebas_praticadas.length; i++) {

      if (decorebas_praticadas[i].id_decoreba == id_decoreba) {

        decoreba_foi_praticada = 'sim'

        escolhas_dek = decorebas_praticadas[i].escolhas[0]

        decoreba_da_vez = decorebas_praticadas[i]
        orientacao_idiomas = decoreba_da_vez.orientacao_recente
        orientacao_idiomas_global = orientacao_idiomas
        
        let tem_capitulos = 'nao'
        if (decoreba_da_vez.capitulos_praticados.length) {

          tem_capitulos = 'sim'
          const qtd_capitulos = decoreba_da_vez.capitulos_praticados.length

          for (let j = 0; j < qtd_capitulos; j++) {

            // Total dos acertos das fáceis, médias e difíceis. Orientação: 1-2

          }
        }
      }
    }
  }

  // Se já praticou-se esta decoreba, a distância será a última utilizada nela,
  // Se nunca praticou-se esta decoreba, entao a distância é a padrão do usuário msm.
  let distancia = 'distancia_curta'
  if (decoreba_da_vez) {
    if (decoreba_da_vez.distancia_recente) {
      distancia = decoreba_da_vez.distancia_recente
    }
  }

  // const distancia = (decoreba_da_vez) ? decoreba_da_vez.distancia_recente : json.usuario.configuracoes[0].distancia
  distancia_global = distancia

  stri = json.item.capitulos

  let sistemas_escrita_1 = json.item.idioma_1_sistemas_escrita
  let string_sis_esc_1 = ''

  let gamb_1_tipo = 'nao_foi_ainda'

  for (let i = 0; i < sistemas_escrita_1.length; i++) {

    let alfabeto_da_vez = ''
    if (sistemas_escrita_1[i].sistema === 'latino') alfabeto_da_vez = 'Abc'
    if (sistemas_escrita_1[i].sistema === 'arabe') alfabeto_da_vez = 'عربية'
    if (sistemas_escrita_1[i].sistema === 'alef-beit') alfabeto_da_vez = 'אלפבית'
    if (sistemas_escrita_1[i].sistema === 'grego') alfabeto_da_vez = 'Αβγ'
    if (sistemas_escrita_1[i].sistema === 'katakana') alfabeto_da_vez = 'カタカナ'
    if (sistemas_escrita_1[i].sistema === 'hiragana') alfabeto_da_vez = '平仮名'
    if (sistemas_escrita_1[i].sistema === 'kanji') alfabeto_da_vez = '漢字'
    if (sistemas_escrita_1[i].sistema === 'hangul') alfabeto_da_vez = '한글'
    if (sistemas_escrita_1[i].sistema === 'devanagari') alfabeto_da_vez = 'देवनागरी'
    if (sistemas_escrita_1[i].sistema === 'mkhedruli') alfabeto_da_vez = 'მხედრული'
    if (sistemas_escrita_1[i].sistema === 'cirilico_russo') alfabeto_da_vez = 'алфави́т'

    if (i < sistemas_escrita_1.length - 1) string_sis_esc_1 += `<span style="white-space: nowrap;">${alfabeto_da_vez}</span> &nbsp `
    if (i === sistemas_escrita_1.length - 1) string_sis_esc_1 += `<span style="white-space: nowrap;">${alfabeto_da_vez}</span>`
  }

  let sistemas_escrita_2 = json.item.idioma_2_sistemas_escrita
  let string_sis_esc_2 = ''

  for (let i = 0; i < sistemas_escrita_2.length; i++) {

    let alfabeto_da_vez = ''
    if (sistemas_escrita_2[i].sistema === 'latino') alfabeto_da_vez = 'Abc'
    if (sistemas_escrita_2[i].sistema === 'arabe') alfabeto_da_vez = 'عربية'
    if (sistemas_escrita_2[i].sistema === 'alef-beit') alfabeto_da_vez = 'אלפבית'
    if (sistemas_escrita_2[i].sistema === 'grego') alfabeto_da_vez = 'Αβγ'
    if (sistemas_escrita_2[i].sistema === 'katakana') alfabeto_da_vez = 'カタカナ'
    if (sistemas_escrita_2[i].sistema === 'hiragana') alfabeto_da_vez = '平仮名'
    if (sistemas_escrita_2[i].sistema === 'kanji') alfabeto_da_vez = '漢字'
    if (sistemas_escrita_2[i].sistema === 'hangul') alfabeto_da_vez = '한글'
    if (sistemas_escrita_2[i].sistema === 'devanagari') alfabeto_da_vez = 'देवनागरी'
    if (sistemas_escrita_2[i].sistema === 'mkhedruli') alfabeto_da_vez = 'მხედრული'
    if (sistemas_escrita_2[i].sistema === 'cirilico_russo') alfabeto_da_vez = 'алфави́т'

    if (i < sistemas_escrita_2.length - 1) string_sis_esc_2 += `<span style="white-space: nowrap;">${alfabeto_da_vez}</span> &nbsp `
    if (i === sistemas_escrita_2.length - 1) string_sis_esc_2 += `<span style="white-space: nowrap;">${alfabeto_da_vez}</span>`
  }

  let data_criacao

  info_dekoreba_toda = (json.item.informacoes) ? json.item.informacoes : 'Sem informações a respeito desta dekoreba.'

  let pontuacao_capitulos = []


  for (let i = 0; i < json.item.capitulos.length; i++) {



    data_criacao = data_mongodb_html ('mongodb_para_visualizacao', json.item.data_criacao)

    let max_corretas = 0
    let porcentagem_concluida
    let achou = 'nao'
    if (decoreba_da_vez) {

      if (decoreba_da_vez.capitulos_praticados) {
        if (decoreba_da_vez.capitulos_praticados.length) {
          const cap_praticados = decoreba_da_vez.capitulos_praticados
          for (let j = 0; j < decoreba_da_vez.capitulos_praticados.length; j++) {

            if (decoreba_da_vez.capitulos_praticados[j].id_capitulo == json.item.capitulos[i]._id & achou == 'nao') {
              achou = 'sim'

              if (orientacao_idiomas === '1-2' & distancia === 'distancia_curta') max_corretas = cap_praticados[j].max_curta__1_2
              if (orientacao_idiomas === '1-2' & distancia === 'distancia_media') max_corretas = cap_praticados[j].max_media__1_2
              if (orientacao_idiomas === '1-2' & distancia === 'distancia_longa') max_corretas = cap_praticados[j].max_longa__1_2

              if (orientacao_idiomas === '2-1' & distancia === 'distancia_curta') max_corretas = cap_praticados[j].max_curta__2_1
              if (orientacao_idiomas === '2-1' & distancia === 'distancia_media') max_corretas = cap_praticados[j].max_media__2_1
              if (orientacao_idiomas === '2-1' & distancia === 'distancia_longa') max_corretas = cap_praticados[j].max_longa__2_1
     
            }
          }
        }
      }
    }

    // Aqui temos que achar este capítulo, se tiver, nas decorebas praticadas.
    let largura_barrinha_cap = 0
    if (decorebas_praticadas.length) {

      for (let j = 0; j < decorebas_praticadas.length; j++) {

        // Esse if inteiro aqui em baixo engloba um único objetivo.
        // Saber a largura da barrinha de progresso do capítulo.

        if (decorebas_praticadas[j].id_decoreba == id_decoreba) {

          let acertos_mult
          let acertos_escr

          let masterizadas_mult = 0
          let masterizadas_escr = 0

          for (let k = 0; k < decorebas_praticadas[j].caps_praticados.length; k++) {

            if (decorebas_praticadas[j].caps_praticados[k].id_capitulo == json.item.capitulos[i]._id) {
              
              const palavras_liberadas_mult = decorebas_praticadas[j].caps_praticados[k].palavras_liberadas_mult
              const palavras_liberadas_escr = decorebas_praticadas[j].caps_praticados[k].palavras_liberadas_escr

              for (let l = 0; l < palavras_liberadas_mult.length; l++) {

                acertos_mult = 0
                for (let m = 0; m < palavras_liberadas_mult[l].acertos_e_erros.length; m++) {
                  acertos_mult += palavras_liberadas_mult[l].acertos_e_erros[m].n_acertos_erros
                }

                acertos_escr = 0
                for (let m = 0; m < palavras_liberadas_escr[l].acertos_e_erros.length; m++) {
                  acertos_escr += palavras_liberadas_escr[l].acertos_e_erros[m].n_acertos_erros
                }

                if (acertos_mult === 8) masterizadas_mult++
                if (acertos_escr === 8) masterizadas_escr++
              }
            }
          }

          largura_barrinha_cap = calcula_porcentagem({
            total: json.item.capitulos[i].vocabulario.length * 2,
            somatoria: masterizadas_mult
          })

          largura_barrinha_cap += calcula_porcentagem({
            total: json.item.capitulos[i].vocabulario.length * 2,
            somatoria: masterizadas_escr
          })
          
          pontuacao_capitulos.push({
            'masterizadas_escr': masterizadas_escr,
            'masterizadas_mult': masterizadas_mult,
            'total': json.item.capitulos[i].vocabulario.length
          })

          // alert(largura_barrinha_cap)
        }
      }
    }

    // Se achar, colocar a porcentagem da barrinha do capitulo concluida.
    // Se não achar, deixar zerada. Simpres assim.

    porcentagem_concluida = (100 / limite_corretas) * max_corretas
    porcentagem_concluida = porcentagem_concluida.toFixed(0)

    jasao_temp.push(json.item.capitulos[i].informacoes)

    // Aqui o estado_bot_info está sempre sumido pois estamos em fase de testes pra ver se fica melhor sem,
    // colocando as informações no papiro.
    // const estado_bot_info = (json.item.capitulos[i].informacoes === '') ? 'sumido' : ''
    const estado_bot_info = 'sumido'
    const style_cap = (json.item.capitulos[i].informacoes != '') ? 'max-width: calc(100% - 50px);' : ''

    const info_capitulo = (json.item.capitulos[i].informacoes) ? json.item.capitulos[i].informacoes : 'Sem informações a respeito deste capítulo.'

    const obj = JSON.stringify(json.item.capitulos[i])

    let id_usuario = 'visitante_id'
    let avatar_50_usuario = 'sem_avatar_pois_usuario_nao_esta_logado'

    if (json.usuario) {
      if (json.usuario._id) {
        id_usuario = json.usuario._id
      }
      if (json.usuario.avatar_50) {
        avatar_50_usuario = json.usuario.avatar_50
      }

    } else {
      document.getElementById('recip_cabecalho').innerHTML = cabecalho_deslogado
      document.getElementById('recip_decoreba_mostra').style.marginTop = '50px'
    }

    // Meio gambiarra aqui, mas por enquanto tá valendo.
    let sigla_verbo = ''
    if (json.item.idioma_1 != 'Português') {
      if (json.item.idioma_1 === 'Espanhol') sigla_verbo = 'es'
      if (json.item.idioma_1 === 'Francês') sigla_verbo = 'fr'
      if (json.item.idioma_1 === 'Italiano') sigla_verbo = 'it'
      if (json.item.idioma_1 === 'Inglês') sigla_verbo = 'en'
    }

    if (json.item.idioma_1 === 'Português') {
      if (json.item.idioma_2 === 'Português') sigla_verbo = 'pt'
      if (json.item.idioma_2 === 'Espanhol') sigla_verbo = 'es'
      if (json.item.idioma_2 === 'Francês') sigla_verbo = 'fr'
      if (json.item.idioma_2 === 'Italiano') sigla_verbo = 'it'
      if (json.item.idioma_2 === 'Inglês') sigla_verbo = 'en'
    }

    let palavras_liberadas_cap_mult = []
      for (let b = 0; b < palavras_liberadas_mult.length; b++) {
    
        for (let c = 0; c < json.item.capitulos[i].vocabulario.length; c++) {
            if (palavras_liberadas_mult[b].id_palavra == json.item.capitulos[i].vocabulario[c]._id) {
              palavras_liberadas_cap_mult.push(palavras_liberadas_mult[b])
            }
          }
        }

        let palavras_liberadas_cap_escr = []
        for (let b = 0; b < palavras_liberadas_escr.length; b++) {
      
          for (let c = 0; c < json.item.capitulos[i].vocabulario.length; c++) {
            if (palavras_liberadas_escr[b].id_palavra == json.item.capitulos[i].vocabulario[c]._id) {
              palavras_liberadas_cap_escr.push(palavras_liberadas_escr[b])
            }
          }
        }
    
    if (json.item.capitulos[i].tipo === 'verbos') {

      mostra_verbo(sigla_verbo)

    // } else if (json.item.capitulos[i].tipo === 'pra_valer' || json.item.capitulos[i].tipo === 'sistema_escrita') {
    } else if (json.item.capitulos[i].tipo === 'pra_valer' & gamb_1_tipo != json.item.capitulos[i].classe) {
      gamb_1_tipo = json.item.capitulos[i].classe
      // Aqui só deve mostrar se já tiver alguma palavra desse capitulo liberada. Ao menos umas 5, a principio.
      let capitulo_liberado = 'nao'
      for (let b = 0; b < dec_praticada.caps_praticados.length; b++) {
        if (json.item.capitulos[i]._id == dec_praticada.caps_praticados[b].id_capitulo) capitulo_liberado = 'sim'
      }

      let cor = 'color: #7d7d7d'
      let botao_treino_onclick = ''
      let classe_botao = 'titulo_cap_treino'
      let botao_lista_palavras_onclick = ''
      let botao_teste = ''

      vai_joga_treina.push({
        item: JSON.stringify(json.item),
        i: i,
        id_decoreba: id_decoreba,
        criador_id: json.item.criador_id,
        avatar_50_usuario: avatar_50_usuario,
        idioma_1: json.item.idioma_1,
        idioma_2: json.item.idioma_2,
        titulo: json.item.titulo,
        decoreba_foi_praticada: decoreba_foi_praticada
      })

      cor = ''
      classe_botao = 'titulo_cap'

      botao_treino_onclick = `onclick='monta_decoreba_jogo(${JSON.stringify(json.item)}, ${i}, "${id_decoreba}", ${i}, "${json.item.criador_id}", "${avatar_50_usuario}", "${json.item.idioma_1}", "${json.item.idioma_2}", "${json.item.titulo}", "${decoreba_foi_praticada}")'`

      botao_lista_palavras_onclick = `onclick='mostra_lista_palavras(${i}, ${JSON.stringify(json.item.capitulos[i].vocabulario)}, "1_2", "${json.item.idioma_1}", "${json.item.idioma_2}", "${json.item.capitulos[i].titulo}", "${info_capitulo}", "${id_decoreba}", "${json.item.capitulos[i]._id}", "mult_esc", ${JSON.stringify(palavras_liberadas_cap_mult)}, ${JSON.stringify(palavras_liberadas_cap_escr)})'`



      botao_abre_popup_tabela = `onclick=abre_popup_tabela(${i})`

      botao_teste = `onclick='prepara_teste("${json.item._id}", "${json.item.capitulos[i]._id}", "clicou_da_lista")'`

      string_capitulos = string_capitulos + `

          <div class='flex_row T1 mostra_recip_cap' style='padding: 5px; padding-right: 8px; margin-top: -15px; padding-bottom: 25px;'>

            <div class="flex_col T1">

              <div class="flex_row T1">

                <!-- tinha titulo_cap bot_ativo na class abaixo -->
                <div class='flex_col T1 largura_interna titulo_cap_treino' style="align-items: center; background: none; ${cor}">
                  ${json.item.capitulos[i].titulo}<br>
                  <div class="flex_row T1 listra_porcentagem listra_porc_inativa">
                    <span id="porcentagem_cap_${i}" class="interior_listra_porcentagem" style="width: ${largura_barrinha_cap}%; background: ${cor_bot_ativo_desaturada}; min-height: 5px; border-radius: 7px;"></span>
                  </div>
                </div>


                <div class="flex_row center ${classe_botao}" style="margin-left: 10px; font-size: 20px; ${cor}" onclick="aparece_popup('joga_ou_treina', ${i});">
                   <!-- Treinar -->
                    <i class="icon-play" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="margin-left: 10px; font-size: 20px; ${cor}" onclick="popup_joga_ou_treina(${i});">
                   <!-- Treinar -->
                    <i class="icon-multiplas_escolhas" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="margin-left: 10px; font-size: 20px; ${cor}" onclick="popup_joga_ou_treina(${i});">
                   <!-- Treinar -->
                    <i class="icon-escrever" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="margin-left: 10px; font-size: 20px; ${cor}" ${botao_treino_onclick}>
                   <!-- Treinar -->
                    <i class="icon-training" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao}" style="width: 50px; margin-left: 10px; font-size: 20pt; ${cor}" ${botao_lista_palavras_onclick}>
                    <i class="icon-papiro"></i>
                </div>

                <!-- Botão T funciona que é uma beleza, mas por enquanto, está sumido. -->
                <div class="flex_row center ${classe_botao} sumido" style="width: 50px; margin-left: 10px; font-size: 20pt; ${cor}" ${botao_abre_popup_tabela}>
                    T
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="width: 50px; margin-left: 10px; font-size: 20pt; ${cor}" ${botao_teste}>
                    <i class="icon-graduation-cap"></i>
                </div>
              </div>

            </div>

            <div class="flex_col center ${estado_bot_info}" style="padding: 10px; text-align: center; max-width: 40px; height: 58px; border: 0px; font-size: 33px; margin: 0px; margin-top: 10px; margin-left: 5px;" onclick='mostra_informacoes(${i});'>
              <i class="icon-info-circled mostra_i"></i>
            </div>
            
          </div>
      `

    } 

     else if (json.item.capitulos[i].tipo === 'sistema_escrita') {
// Aqui só deve mostrar se já tiver alguma palavra desse capitulo liberada. Ao menos umas 5, a principio.
      let capitulo_liberado = 'nao'
      for (let b = 0; b < dec_praticada.caps_praticados.length; b++) {
        if (json.item.capitulos[i]._id == dec_praticada.caps_praticados[b].id_capitulo) capitulo_liberado = 'sim'
      }

      let cor = 'color: #7d7d7d'
      let botao_treino_onclick = ''
      let classe_botao = 'titulo_cap_treino'
      let botao_lista_palavras_onclick = ''
      let botao_teste = ''

      vai_joga_treina.push({
        item: JSON.stringify(json.item),
        i: i,
        id_decoreba: id_decoreba,
        criador_id: json.item.criador_id,
        avatar_50_usuario: avatar_50_usuario,
        idioma_1: json.item.idioma_1,
        idioma_2: json.item.idioma_2,
        titulo: json.item.titulo,
        decoreba_foi_praticada: decoreba_foi_praticada
      })

      cor = ''
      classe_botao = 'titulo_cap'

      botao_treino_onclick = `onclick='monta_decoreba_jogo(${JSON.stringify(json.item)}, ${i}, "${id_decoreba}", ${i}, "${json.item.criador_id}", "${avatar_50_usuario}", "${json.item.idioma_1}", "${json.item.idioma_2}", "${json.item.titulo}", "${decoreba_foi_praticada}")'`

      botao_lista_palavras_onclick = `onclick='mostra_lista_palavras(${i}, ${JSON.stringify(json.item.capitulos[i].vocabulario)}, "1_2", "${json.item.idioma_1}", "${json.item.idioma_2}", "${json.item.capitulos[i].titulo}", "${info_capitulo}", "${id_decoreba}", "${json.item.capitulos[i]._id}", "mult_esc", ${JSON.stringify(palavras_liberadas_cap_mult)}, ${JSON.stringify(palavras_liberadas_cap_escr)})'`

      botao_teste = `onclick='prepara_teste("${json.item._id}", "${json.item.capitulos[i]._id}", "clicou_da_lista")'`

      string_capitulos_sist_escr = string_capitulos_sist_escr + `

          <div class='flex_row T1 mostra_recip_cap' style='padding: 5px; padding-right: 8px; margin-top: -15px; padding-bottom: 25px;'>

            <div class="flex_col T1">

              <div class="flex_row T1">

                <!-- tinha titulo_cap bot_ativo na class abaixo -->
                <div class='flex_col T1 largura_interna titulo_cap_treino' style="align-items: center; background: none; ${cor}">
                  ${json.item.capitulos[i].titulo}<br>
                  <div class="flex_row T1 listra_porcentagem listra_porc_inativa">
                    <span id="porcentagem_cap_${i}" class="interior_listra_porcentagem" style="width: ${largura_barrinha_cap}%; background: ${cor_bot_ativo_desaturada}; min-height: 5px; border-radius: 7px;"></span>
                  </div>
                </div>


                <div class="flex_row center ${classe_botao}" style="margin-left: 10px; font-size: 20px; ${cor}" onclick="aparece_popup('joga_ou_treina', ${i});">
                   <!-- Treinar -->
                    <i class="icon-play" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="margin-left: 10px; font-size: 20px; ${cor}" onclick="popup_joga_ou_treina(${i});">
                   <!-- Treinar -->
                    <i class="icon-multiplas_escolhas" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="margin-left: 10px; font-size: 20px; ${cor}" onclick="popup_joga_ou_treina(${i});">
                   <!-- Treinar -->
                    <i class="icon-escrever" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="margin-left: 10px; font-size: 20px; ${cor}" ${botao_treino_onclick}>
                   <!-- Treinar -->
                    <i class="icon-training" style="font-size: 25pt;"></i>
                </div>

                <div class="flex_row center ${classe_botao}" style="width: 50px; margin-left: 10px; font-size: 20pt; ${cor}" ${botao_lista_palavras_onclick}>
                    <i class="icon-papiro"></i>
                </div>

                <div class="flex_row center ${classe_botao} sumido" style="width: 50px; margin-left: 10px; font-size: 20pt; ${cor}" ${botao_teste}>
                    <i class="icon-graduation-cap"></i>
                </div>
              </div>

            </div>

            <div class="flex_col center ${estado_bot_info}" style="padding: 10px; text-align: center; max-width: 40px; height: 58px; border: 0px; font-size: 33px; margin: 0px; margin-top: 10px; margin-left: 5px;" onclick='mostra_informacoes(${i});'>
              <i class="icon-info-circled mostra_i"></i>
            </div>
            
          </div>
      `

     } else if (json.item.capitulos[i].tipo === 'treino') {


      // Aqui só deve mostrar se já tiver alguma palavra desse capitulo liberada. Ao menos umas 5, a principio.
      let capitulo_liberado = 'sim'

      let cor = 'color: #7d7d7d'
      let botao_treino_onclick = ''
      let classe_botao = 'titulo_cap_treino'
      let botao_lista_palavras_onclick = ''

        cor = ''
        classe_botao = 'titulo_cap'

        botao_treino_onclick = `onclick='monta_decoreba_jogo(${JSON.stringify(json.item)}, ${i}, "${id_decoreba}", ${i}, "${json.item.criador_id}", "${avatar_50_usuario}", "${json.item.idioma_1}", "${json.item.idioma_2}", "${json.item.titulo}", "${decoreba_foi_praticada}")'`


        botao_lista_palavras_onclick = `onclick='mostra_lista_palavras(${i}, ${JSON.stringify(json.item.capitulos[i].vocabulario)}, "1_2", "${json.item.idioma_1}", "${json.item.idioma_2}", "${json.item.capitulos[i].titulo}", "${info_capitulo}", "${id_decoreba}", "${json.item.capitulos[i]._id}", "mult_esc", ${JSON.stringify(palavras_liberadas_cap_mult)}, ${JSON.stringify(palavras_liberadas_cap_escr)});'`
      

      
        strings_capitulos_outros = strings_capitulos_outros + `

          <div class='flex_row T1 mostra_recip_cap' style='padding: 5px; padding-right: 8px; margin-top: -15px; padding-bottom: 25px;'>

            <div class="flex_col T1">

              <div class="flex_row T1">

                <!-- tinha titulo_cap bot_ativo na class abaixo -->
                <div class='flex_col T1 largura_interna titulo_cap_treino' style="align-items: center; background: none; ${cor}">
                  ${json.item.capitulos[i].titulo}<br>
                  <div class="flex_row T1 listra_porcentagem listra_porc_inativa">
                  <span id="porcentagem_cap_${i}" class="interior_listra_porcentagem" style="width: ${largura_barrinha_cap}%; background: ${cor_bot_ativo_desaturada}; min-height: 5px; border-radius: 7px;"></span>
                </div>
                </div>

                <div class="flex_row center ${classe_botao}" style="margin-left: 10px; font-size: 20px; ${cor}" ${botao_treino_onclick}>
                    Treinar
                </div>

                <div class="flex_row center ${classe_botao}" style="width: 50px; margin-left: 10px; font-size: 20pt; ${cor}" ${botao_lista_palavras_onclick}>
                    <i class="icon-papiro"></i>
                </div>
              </div>

            </div>

            <div class="flex_col center ${estado_bot_info}" style="padding: 10px; text-align: center; max-width: 40px; height: 58px; border: 0px; font-size: 33px; margin: 0px; margin-top: 10px; margin-left: 5px;" onclick='mostra_informacoes(${i});'>
              <i class="icon-info-circled mostra_i"></i>
            </div>
            
          </div>
        `
    }
  }


  // document.getElementById('span_frase_a_traduzir')

  document.getElementById('recip_img_fundo_dekoreba').style.background = `url('/imagens/fundos_dekorebas/${json.item.imagem_fundo}')`

  document.getElementById('recip_img_fundo_dekoreba').style.backgroundSize = 'cover'
  document.getElementById('recip_img_fundo_dekoreba').style.backgroundPosition = 'center'

  document.getElementById('span_titulo').innerHTML = json.item.titulo

  let listras_interior = document.getElementsByClassName('interior_listra_porcentagem')
  for (let ii = 0; ii < listras_interior.length; ii++) {
    listras_interior[ii].style.background = json.item.cor
  }

  let total_palavras_titulo = 0
  let total_acertos_titulo = 0
  for (let ii = 0; ii < pontuacao_capitulos.length; ii++) {

    /*
              pontuacao_capitulos.push({
            'masterizadas_escr': masterizadas_escr,
            'masterizadas_mult': masterizadas_mult,
            'total': json.item.capitulos[i].vocabulario.length
          })
    */
    total_palavras_titulo += pontuacao_capitulos[ii].total
    total_acertos_titulo += pontuacao_capitulos[ii].masterizadas_escr + pontuacao_capitulos[ii].masterizadas_mult
  }

  const porcentagem_barra_decoraba = total_acertos_titulo * 100 / (total_palavras_titulo * 2)


  document.getElementById('titulo_barra_progresso').style.width = `${porcentagem_barra_decoraba}%`

  document.getElementById('div_recip_string_capitulos').innerHTML = string_capitulos  

  document.getElementById('mostra_soma_liberadas_mult').innerHTML = soma_liberadas_mult
  document.getElementById('mostra_total_palavras_mult').innerHTML = total_palavras

  document.getElementById('mostra_soma_decoradas_mult').innerHTML = soma_decoradas_mult
  document.getElementById('mostra_total_decoradas_mult').innerHTML = total_palavras

  document.getElementById('mostra_soma_liberadas_escr').innerHTML = soma_liberadas_mult
  document.getElementById('mostra_total_palavras_escr').innerHTML = total_palavras

  document.getElementById('mostra_soma_decoradas_escr').innerHTML = soma_decoradas_escr
  document.getElementById('mostra_total_decoradas_escr').innerHTML = total_palavras

  // pre_jogo carrega para mult_esc e para escrita.

  pre_jogo = {
    i: 1,
    titulo: json.item.titulo,
    titulo_capitulo: json.item.capitulos[1].titulo,
    orientacao_idiomas_global: '1-2',
    id_decoreba: id_decoreba,
    i_capitulo: 1,
    id_usuario: json.item.capitulos[1]._id,
    avatar: 'https://i.pinimg.com/736x/98/da/68/98da68d5583a98dac656c98265e5f3d2.jpg',
    distancia_global: 'distancia_curta',
    idioma_1: idioma_1,
    idioma_2: idioma_2,
    idioma_falado_mult: idioma_2,
    sistemas_escrita_1: sistemas_escrita_1,
    sistemas_escrita_2: sistemas_escrita_2
  }

  document.body.style.overflow = 'auto'
  popup_aberto = 'nenhum'

  // Adiciona um ouvinte de eventos de teclado ao documentos, utilizado na parte dos verbos. 
  eventos_teclado_verbos()

  // Se tem mais de um alfabeto, mostra o botão do Alfabeto.
  if (string_capitulos_sist_escr === '') {
    document.getElementById('recip_bot_decoreba_alfabeto').style.display = 'none'
  } 
  // Se tem conjugações verbais para praticar, mostra o botão Conjugação Verbal.
  if (recip_verbos.innerHTML === '') {
    document.getElementById('recip_bot_decoreba_verbos').style.display = 'none'
  }

  // Agora, vemos qual será o botão ativo.
  if (string_capitulos_sist_escr != '') {
    geral_ou_verbo('alfabeto')
  }
  if (string_capitulos_sist_escr === '') {
    geral_ou_verbo('geral')
  }

  eventos_teclado_tabela()


}

function eventos_teclado_tabela () {
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
      mostra_dica_tabela()

    }
})

  document.addEventListener('keyup', function(e) {
                    if (e.key === 'Control') {
                        // Chame a função quando a tecla Ctrl for liberada
                        some_dica_tabela()
                    }
                });
}

function eventos_teclado_verbos () {
    document.addEventListener('keydown', function(event) {

      // Verifica se a tecla "Enter" foi pressionada
      if (event.key === 'Enter') {
        
        if (event.ctrlKey || event.metaKey) { // event.metaKey para o caso de MacOS

        } else {
          // console.log(`popup_aberto: ${popup_aberto}`)
          // Verifica se o div está visível

          var div_confere = document.getElementById('recip_popup_verbo_confere');
          var div_parabens = document.getElementById('recip_popup_verbo_parabens');
          
          if (div_confere) {
            if (div_confere.style.display === 'flex') {
              // Aqui precisa conferir se popup_aberto != 'nenhum', pois senão roda duas vezes a parada.
              if (popup_aberto != 'nenhum') {
                confere_se_completou_verbo()
              }
            }
          }

          if (div_parabens) {
            if (div_parabens.style.display === 'flex') {

              // A criação desse verbo_parabens_gambi é gambiarra da mais alta gabardância.
              // Se não tiver, aqui roda duas vezes e fecha a janela de parabéns assim que é aberta.
              if (popup_aberto === 'verbo_parabens') {
                popup_aberto = 'verbo_parabens_gambi'
              }
              else if (popup_aberto === 'verbo_parabens_gambi') {
                fecha_popup_verbo_parabens()
              }
            }
          }
        }
      }
  });
}

var popup_aberto = 'nenhum'
async function prepara_decoreba_cria (obj) {

  let dados_cabecalho = await vai_filhao_2('cria_puxa')
  
  document.getElementById('titulo_nova_decoreba').value = obj_teste.titulo
  document.getElementById("i_elimina_decoreba").onClick = () => { elimina_decoreba(obj_teste._id, obj_teste._id) }
  document.getElementById('recip_select_idi_1').innerHTML = cria_faz_select_idi(1)
  document.getElementById('recip_select_idi_2').innerHTML = cria_faz_select_idi(2)
  document.getElementById('recip_select').innerHTML = cria_faz_select_capitulos()
  document.getElementById('capitulos_decoreba').options[cap_i_ativo].innerHTML
  document.getElementById('recip_recip_capitulo').innerHTML = cria_faz_recip_capitulo(obj_teste.capitulos[0].titulo)
  document.getElementById('cor_dekoreba').value = obj_teste.cor

  // Configurações iniciais do popup de INFORMAÇÕES.
  const condicao_conteudo_info = (obj_teste.capitulos[0].informacoes == "<br><div></div>" || obj_teste.capitulos[0].informacoes == "<br>" || obj_teste.capitulos[0].informacoes == "<div></div>" || obj_teste.capitulos[0].informacoes == "")

  const x_fechar = (condicao_conteudo_info) ? 'x_fechar_inativo' : 'x_fechar_ativo'
  document.getElementById('x_excluir_info').classList.add(x_fechar)

  const class_informacoes = (condicao_conteudo_info) ? 'bot_inativo' : 'bot_ativo'
  document.getElementById('cria_botao_info').classList.add(class_informacoes)

  const text_input = document.getElementById("text-input")
  text_input.innerHTML = obj_teste.capitulos[0].informacoes
  text_input.addEventListener("input", inputEvt => {
    obj_teste.capitulos[cap_i_ativo].informacoes = document.getElementById('text-input').innerHTML
    limpa_input_text()
  }, false)

  if (obj_teste.idioma_1) seleciona_idioma(obj_teste.idioma_1, 1, 'inicio')
  if (obj_teste.idioma_2) seleciona_idioma(obj_teste.idioma_2, 2, 'inicio')


  if (obj_teste._id != 'nova') {

    let palavras_iniciais = ''
    for (let i = 0; i < obj_teste.capitulos[0].vocabulario.length; i++) {
      palavras_iniciais += html_palavras(0, i)
    }

    document.getElementById('recip_palavras').innerHTML = palavras_iniciais

  }

  document.getElementById('marcacao_1').value = obj_teste.marcacoes[0].marcacao
  document.getElementById('marcacao_2').value = obj_teste.marcacoes[1].marcacao
  document.getElementById('marcacao_3').value = obj_teste.marcacoes[2].marcacao
  document.getElementById('marcacao_4').value = obj_teste.marcacoes[3].marcacao
  document.getElementById('marcacao_5').value = obj_teste.marcacoes[4].marcacao

  cria_termos_ocultos ()

  // Esse forzinho abaixo é uma pequenina gambiarra.
  // Se ele não existir, ao carregar alguma dekoreba, as vezes ficam-se à mostra alguns termos.
  for (let i = 0; i < obj_teste.capitulos[0].vocabulario.length; i++) {

    if (document.getElementById(`linha_termos_${cap_i_ativo}_${i}`)) {
      document.getElementById(`linha_termos_${cap_i_ativo}_${i}`).style.display = 'none' // Mostra algum div ai
    }
  }


  // Ativa o tab

  document.addEventListener('keydown', event => {
    
    var charCode = event.which || event.keyCode
    if (charCode == 9) {
      event.preventDefault();
    }
  })
  
}