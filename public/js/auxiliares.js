/*

  * Decorar a palavra a cada 2 ou 3 acertos em cada orientação, isso, se for sem erros.

  * Alguns verbos italianos não estão sendo falados corretamente.
  * Rotatividade das imagens de fundo das dekorebas.
  * Uma busca por outros usuários.
  * Melhorar o texto da ajuda na tela de mostrar a dekoreba.
  * Fazer um bom texto na ajuda da tela de perfil.
  * Falta configurar a porcentagem de aparição das palavras novas.

  * Deve haver apenas um palavras liberadas. O maior, sempre. Logo, no menor, devemos utilizar uma frequencia de uns 90% para as liberadas naquela modalidade e uns 10% nas modalidades posteriores. O cara poderá liberar todas, só no multipla escolha? Sim! Mas para dekorar, há que se acertar muito na múltipla escolha e na escrita. Logo, terá apenas um liberadas e apenas 1 dekoradas.

  // Agora seria bom ter uma tela, depois do completar, mostrando todas as palavras e o número exato de
  // vezes ela acertada. Para podermos esperar ela a chegar a 16 e ver o código funcionando perfeitamente.
  // Depois, dá para usar essa tela nova como a tela da liberação estilo FIFA.

  * No Start, o jogador poderá escolher entre múltipla escolha e escrita, ou os dois. Já no ...

  // Então, para liberar palavras, você não precisa dekorar ela nas duas modalidades, escrita e mult, precisa apenas decorar a palavra em uma das modaldiades. Logo, daria para liberar todas as palavras jogando apenas na escrita, por exemplo.
  // Ou então jogando apenas na multipla escolha. Isso é bom, pois o cabra não necessitaria digitar palavra alguma
  // para completar tudo as paradas.
  // Mas para isso funcionar 100%, ele teria que poder escolher a modalidade antes do jogo normal.
  // Escolher a modalidade, creio que seja bom.

*/

// Essa parada do capitulo 0 ser verbo tá me deixando injuriado. Tá errado isso mas funciona.

// Então quer dizer que ao navegar pelo site não há qualquer requisição GET ou POST.
// Apenas mostra as interfaces já desenhadas no JS cliente.
// Então há que se ter uma requisição POST a cada clique de navegação feita.

// Se recarregamos a página, aí há trocentas requisições GET, tudo pelo index do offline.

// A primeira, monta_index não precisa de nada disso.
// A segunda, entrar, tampouco.
// A terceira, cadastrar, idem.

// Mas ao enviar o login e a senha, é uma requisição POST.

var mexidos = []
var info_dekoreba_toda // Usa no dekoreba_mostra.

// Aqui nas letras, nos testes só teremos a letra A, para não causar pane no sistema.
// Para o alfabeto normal funcionar, há de se ter ao menos um verbo para cada letra.

var stri = ''
var pre_jogo

var glob_tela
var glob_obj

var aba_mostra_dekoreba = 'palavras'
let arr_respostas = [] // Let global que só é usada nessa função abaixo.
var orientacao_idiomas_global
var distancia_global

// Mais uma var global. Essa vai_joga_treina serve para armazenar informações passadas ao clicar no símbolo de jogar
// em cada um dos capítulos. É uma arraya que armazena as informações de cada capítulo. Eu tentei passar por
// parâmetros, mas com string literals fica mto compricado.
var vai_joga_treina = [] 

var escolhas_dec = {
  modalidade: '',
  mult_escolha_orientacao: '',
  mult_escolha_alfabetos_perg: [],
  mult_escolha_alfabetos_resp: [],
  escrita_orientacao: '',
  escrita_alfabetos_perg: [],
  escrita_alfabeto_resp: [],
  falada_orientacao: '',
  falada_alfabetos_perg: []
}

var escolhas_dek = {
  joga_ou_treina: '',
  modalidade: '',
  orientacao: '',
  alfabetos_perg: [],
  alfabetos_resp: []
}

let x
const idiomas = ['espanhol', 'esperanto', 'japonês', 'georgiano', 'pesquiseaqui']
var jasao_temp = []
var respostas_corretas = 0
var respostas_erradas = 0
var resps_corretas_escritas = 0
var resps_erradas_escritas = 0
var meta_corretas = 15 // o correto é 15, mas...
var meta_erradas = 5
var orientacao = 'arabe-portugues'

let ico_explorar = 'icon-explorar_vazio'
let ico_settings = 'icon-engrenagem_vazio'
let ico_home = 'icon-casa_vazio'
let perfil_borda = 'box-sizing: border-box; border: solid 3px white;'

let cap_i_ativo = 0

let estado_menu_termo = {ultimo_i_item: 0, estado_do_menu: 'fechado'}

var eh_teste_global = 'nao'
var teste_inicial_idioma = 'nao'
var lista_respostas_teste = []
var cont_teste_erradas = 0

var cap_teste_global = 1

var obj_teste = {
  _id: "nova",
  titulo: "",
  idioma_1: "",
  idioma_2: "",
  cor: "",
  cor_letras: "",
  capitulos: [
    {
      titulo: "",
      informacoes: "",
      vocabulario: [
        {
          idioma_1: [
            {
              sistema_escrita: "",
              item: ""
            }
          ],
          idioma_2: [
            {
              sistema_escrita: "",
              item: ""
            }
          ]
        },
        {
          idioma_1: [
            {
              sistema_escrita: "",
              item: ""
            }
          ],
          idioma_2: [
            {
              sistema_escrita: "",
              item: ""
            }
          ]
        },
        {
          idioma_1: [
            {
              sistema_escrita: "",
              item: ""
            }
          ],
          idioma_2: [
            {
              sistema_escrita: "",
              item: ""
            }
          ]
        }
      ]
    }
  ],
  marcacoes: [
    { marcacao: "" },
    { marcacao: "" },
    { marcacao: "" },
    { marcacao: "" },
    { marcacao: "" }
  ]
}

var orientacao_idiomas = ''

var obj_idiomas_alfabetos = [
  { 'sigla_som': 'de', 'idioma': 'Alemão', 'alfabetos': ['latino'], 'ordem_prioridade': [0] },
  { 'sigla_som': 'ar', 'idioma': 'Árabe', 'alfabetos': ['latino', 'arabe'], 'ordem_prioridade': [1, 0]},
  { 'sigla_som': 'ca', 'idioma': 'Catalão', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'zh', 'idioma': 'Chinês', 'alfabetos': ['latino', 'kanji'], 'ordem_prioridade': [1, 0]},
  { 'sigla_som': 'ko', 'idioma': 'Coreano', 'alfabetos': ['latino', 'hangul'], 'ordem_prioridade': [1, 0]},
  { 'sigla_som': 'es', 'idioma': 'Espanhol', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'eo', 'idioma': 'Esperanto', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'fr', 'idioma': 'Francês', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'el', 'idioma': 'Grego', 'alfabetos': ['latino', 'grego'], 'ordem_prioridade': [1, 0]},
  { 'sigla_som': 'hi', 'idioma': 'Indiano', 'alfabetos': ['latino', 'devanagari'], 'ordem_prioridade': [1, 0]},
  { 'sigla_som': 'en', 'idioma': 'Inglês', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'it', 'idioma': 'Italiano', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'ja', 'idioma': 'Japonês', 'alfabetos': ['latino', 'hiragana', 'katakana', 'kanji'], 'ordem_prioridade': [1, 3, 0, 2]},
  { 'sigla_som': 'la', 'idioma': 'Latim', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'pt-br', 'idioma': 'Português', 'alfabetos': ['latino'], 'ordem_prioridade': [0]},
  { 'sigla_som': 'ru', 'idioma': 'Russo', 'alfabetos': ['latino', 'cirilico_russo'], 'ordem_prioridade': [1, 0]},
  { 'sigla_som': 'pt-br', 'idioma': 'Outro', 'alfabetos': ['latino'], 'ordem_prioridade': [0]}
]

var alfabetos = {
  'latino': 'Abc',
  'arabe': 'عربية',
  'alef-beit': 'אלפבית',
  'grego': 'Αβγ',
  'katakana': 'カタカナ',
  'hiragana': '平仮名',
  'kanji': '漢字',
  'hangul': '한글',
  'devanagari': 'देवनागरी',
  'mkhedruli': 'მხედრული',
  'cirilico_russo': 'алфави́т'
}

function altera_idioma_index (idioma_selecionado) {
  // Envia uma requisição GET pro servidor
  vai_filhao_2('altera_idioma_index', idioma_selecionado)
  window.location.replace(`https://${idioma_selecionado}.dekoreba.local:3004/`) // Simulate an HTTP redirect:
}

const cabecalho_deslogado = `
  <div class="flex_row T1 center cabecalho cabecalho_deslogado" style="">

    <div class="flex_row T1 largura_interna" style="height: 100%; padding-right: 50px; padding-top: 15px;">
      <div class="flex_row T1" style="align-items: center; cursor: pointer;">

        <i class="icon-imagotipo index_logo_mobile estilo_insta" onclick="monta_index()" style="margin-left: 0px;> </i>

        <i class="icon-simbolo_decoreba sumido" onclick="monta_index()" style="font-size: 33px;"></i>
        </div>

        <div id="div_altera_idioma_index" class="flex_row T1" style="align-items: center; justify-content: flex-end; color: grey; font-size: 18px;">
          <span class="span_idioma_da_pagina exclusivo_pc">Idioma da página:</span>

          <div class="custom-select" style="">
            <select id="altera_idioma_index" onchange="altera_idioma_index(this.value)">
              <option value="pt">Português</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="it">Italiano</option>
              <option value="de">Deutsch</option>
             </select>
           </div>
        </div>
      
      </div>
    </div>
`

/* GERAIS */

function checa_online() {
  document.getElementById('faixa_offline').style.display = (navigator.onLine) ? 'none' : 'flex'
}

const cria_cabecalho_rapido = (tela) => {

  let avatar_50 = (sessionStorage.getItem("avatar_50")) ? sessionStorage.getItem("avatar_50") : 'sem_avatar'
  let funcao_onclick = (sessionStorage.getItem("avatar_50")) ? `onclick="monta_perfil('${sessionStorage.getItem("id_usuario")}');"` : ''
  
  let end_logo = ''

  if (tela === 'home') {
    ico_home = 'icon-casa_cheio'
    perfil_borda = ''
    end_logo = 'imagens/logo_dekoreba.png'
  }


  if (tela === 'perfil' || tela === 'busca_usuario') {
    ico_home = 'icon-casa_vazio'
    perfil_borda = 'box-sizing: border-box; border: solid 3px var(--color_site);'
    end_logo = '../imagens/logo_dekoreba.png'
  }

  if (tela === 'cria' || tela === 'mostra' || tela === 'jogo') {
    ico_home = 'icon-casa_vazio'
    perfil_borda = ''
    end_logo = '../imagens/logo_dekoreba.png'
  }

  return `
    <div id="recip_cabecalho" class="flex_row T1 center cabecalho" style="">
      <div class="flex_row T1 center largura_interna" style="padding: 0px;">
        
        <div class="flex_row cabecalho_recip_logo exclusivo_pc">
            
          <i class="icon-logotipo estilo_insta" style="width: 139px; margin-left: 10px; font-size: 24px; cursor: pointer;" onclick="monta_home();"></i>

        </div>
        
        <div class="flex_row T1 exclusivo_pc">
          
        </div>

        <div class="flex_row T1_m cabecalho_recip_botoes" style="">

          <i class="icone_casinha ${ico_home} icone_cabecalho" style="" onclick="monta_home()"></i>

          <img id="avatar_50" src="${avatar_50}" class="icone_cabecalho_avatar" style="${perfil_borda}" ${funcao_onclick}>

          <i class="icon-help icone_cabecalho icone_interrogacao" onclick="mostra_ajuda('${tela}')" style="color: var(--cinza_meio_escuro); color: red; margin-left: 25px; position: absolute; right: 0;"></i>

        </div>
      
      </div>
    </div>
  `
}

function popup_joga_ou_treina (i) {

  // apertou_startao('${id_decoreba}')

  // Aqui tem que ser -1 pq o i conta todos os capítulos, e o primeiro é o tipo === 'verbos', logo, não conta.
  const parametros_treino = vai_joga_treina[i - 1]

    pre_jogo.i = parametros_treino.i
    pre_jogo.titulo_capitulo = stri[pre_jogo.i].titulo
    pre_jogo.i_capitulo = parametros_treino.i
  



  document.getElementById('recip_joga_ou_treina').style.display = 'flex'
  document.getElementById('recip_joga_ou_treina_dentro').innerHTML = `<div class="flex_row center botao bot_modalidades" onclick='apertou_startao("${parametros_treino.id_decoreba}");' style="width: 250px;">
            Pra Valer
          </div>

          <div class="flex_row center botao bot_modalidades" style="width: 250px;" onclick='fecha_popup_joga_ou_treina(); monta_decoreba_jogo(${parametros_treino.item}, ${parametros_treino.i}, "${parametros_treino.id_decoreba}", ${parametros_treino.i}, "${parametros_treino.criador_id}", "${parametros_treino.avatar_50_usuario}", "${parametros_treino.idioma_1}", "${parametros_treino.idioma_2}", "${parametros_treino.titulo}", "${parametros_treino.decoreba_foi_praticada}")'>
            Treinar
          </div>
`
  
}

function fecha_popup_joga_ou_treina () {
  document.getElementById('recip_joga_ou_treina').style.display = 'none'

}

function verifica_url (obj) {

  // Essa função não está pŕopria para ser utilizada em qualquer lugar, tem que modularizar a bichona.
  // Aqui abaixo pegamos o endereço atual. Se veio do decoreba_mostra, volta um no diretório do endereço. Meio estranho mas funciona.

  const dec_cria = obj.endereco.search("decoreba_cria")
  const dec_mostra = obj.endereco.search("decoreba_mostra")
  const perfil = obj.endereco.search("perfil")
  
  let pagina
  if (dec_cria != -1 || dec_mostra != -1 || perfil != -1) pagina = `../${obj.stateObj.tela_ativa}`
  if (dec_cria === -1 && dec_mostra === -1 && perfil === -1) pagina = `${obj.stateObj.tela_ativa}`
  
  // alert(`tela_ativa: ${obj.stateObj.tela_ativa} -- pagina: ${pagina} -- modo_de_vinda: ${obj.modo_de_vinda}`)

  if (obj.stateObj.tela_ativa === 'perfil') pagina = '' + pagina + `/${obj.id_perfil}`
  if (obj.stateObj.tela_ativa === 'decoreba_mostra') pagina = '' + pagina + `/${obj.id_decoreba}`
  if (obj.stateObj.tela_ativa === 'decoreba_cria') pagina = '' + pagina + `/${obj.id_decoreba}`


    history.pushState(obj.stateObj, '', `${pagina}`)
/*
  if (obj.modo_de_vinda)  {
    alert("vai replace")
    history.replaceState(obj.stateObj, '', `${pagina}`)
  }
  if (!obj.modo_de_vinda) {
    alert("vai push")
    history.pushState(obj.stateObj, '', `${pagina}`)
  }
  */
}

async function prepara_remexe (id_decoreba) {

  const valor_select = document.getElementById(`select_remexe_${id_decoreba}`).value
  
  const dados = { acao: valor_select, id_decoreba: id_decoreba }
  loading('loading...')

  await vai_filhao_2('prepara_remexe', dados)
}

function altera_diurno_noturno (modo) {

  diurno_noturno = modo // essa var diurno_noturno é grobal.

  // Esse if abaixo é só para ver se o botão de seleção do modo está lá. Se estiver, estamos escolhendo as opções.
  // Se não estiver, estamos recarregando a home.
  if (modo === 'noturno') {
    if (document.getElementById('bot_diurno')) {
      let bot_diurno = document.getElementById('bot_diurno')
      let bot_noturno = document.getElementById('bot_noturno')

      troca_classe (bot_diurno, 'bot_padrao_ativo', 'bot_padrao_inativo')
      troca_classe (bot_noturno, 'bot_padrao_inativo', 'bot_padrao_ativo')
    }
    

    document.documentElement.style.setProperty('--background_site', '#1f1f1f')
    document.documentElement.style.setProperty('--fundo_bot_ativo', 'white')
    document.documentElement.style.setProperty('--fundo_bot_inativo', '#1f1f1f')

    document.documentElement.style.setProperty('--color_site', 'white')
    document.documentElement.style.setProperty('--cor_bot_ativo', '#3b3b3b')
    document.documentElement.style.setProperty('--cor_bot_inativo', 'white')

    document.documentElement.style.setProperty('--sombra', '#0a0a0a')
    document.documentElement.style.setProperty('--fundo_carta', '#1a1a1a')


    document.documentElement.style.setProperty('--fundo_ativo', '#383838')
    document.documentElement.style.setProperty('--fundo_inativo', '#292929')
  }

  if (modo === 'diurno') {

    if (document.getElementById('bot_diurno')) {
      let bot_diurno = document.getElementById('bot_diurno')
    let bot_noturno = document.getElementById('bot_noturno')

        troca_classe (bot_noturno, 'bot_padrao_ativo', 'bot_padrao_inativo')
        troca_classe (bot_diurno, 'bot_padrao_inativo', 'bot_padrao_ativo')
    }
    

    document.documentElement.style.setProperty('--background_site', 'white')
    document.documentElement.style.setProperty('--fundo_bot_ativo', '#1f1f1f')
    document.documentElement.style.setProperty('--fundo_bot_inativo', 'white')

    document.documentElement.style.setProperty('--color_site', '#3b3b3b')
    document.documentElement.style.setProperty('--cor_bot_ativo', 'white')
    document.documentElement.style.setProperty('--cor_bot_inativo', '#3b3b3b')

    document.documentElement.style.setProperty('--sombra', '#d1d1d1')
    document.documentElement.style.setProperty('--fundo_carta', '#f7f7f7')

    document.documentElement.style.setProperty('--fundo_ativo', '#d1cfcf')
    document.documentElement.style.setProperty('--fundo_inativo', '#e0e0e0')

  }

}

function carta (obj) {

  let cor_dekoreba = '#ffffff'
  if (obj.cor != "#ffffff") cor_dekoreba = obj.cor

  console.log(obj.editavel)

  const botao_editar = (obj.editavel === 'sim') ? perfil_botao_editar({ perfil_propriedade: 'proprio', id_decoreba: obj.id_decoreba }) : ''

  // PROVAVELENTE, ESSAS DUAS FUNÇÕES ABAIXO DEVERIAM ESTAR ONDE SE CHAMA A carta(), NÃO AQUI, PQ TODOS OS OUTROS ELEMENTOS VÊM EM FORMA D ESTRING
  // TÁ DESTOANDO.
  let string_idi_sis_1 = ''
  for (let k = 0; k < obj.idioma_1_sistemas_escrita.length; k++) {

    let alfabeto_da_vez = ''
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'latino') alfabeto_da_vez = 'Abc'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'arabe') alfabeto_da_vez = 'عربية'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'alef-beit') alfabeto_da_vez = 'אלפבית'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'grego') alfabeto_da_vez = 'Αβγ'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'katakana') alfabeto_da_vez = 'カタカナ'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'hiragana') alfabeto_da_vez = '平仮名'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'kanji') alfabeto_da_vez = '漢字'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'hangul') alfabeto_da_vez = '한글'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'devanagari') alfabeto_da_vez = 'देवनागरी'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'mkhedruli') alfabeto_da_vez = 'მხედრული'
    if (obj.idioma_1_sistemas_escrita[k].sistema === 'cirilico_russo') alfabeto_da_vez = 'алфави́т'

    let div_alfabeto_vez = `<div class="flex_row center" style="font-size: 17px; padding: 5px; margin: 5px; border-radius: 10px;">${alfabeto_da_vez}</div>`
    if (k === 0) string_idi_sis_1 += div_alfabeto_vez
    if (k != 0) string_idi_sis_1 += ' ' + div_alfabeto_vez
  }

  let string_idi_sis_2 = ''
  for (let k = 0; k < obj.idioma_2_sistemas_escrita.length; k++) {

    let alfabeto_da_vez = ''
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'latino') alfabeto_da_vez = 'Abc'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'arabe') alfabeto_da_vez = 'عربية'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'alef-beit') alfabeto_da_vez = 'אלפבית'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'grego') alfabeto_da_vez = 'Αβγ'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'katakana') alfabeto_da_vez = 'カタカナ'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'hiragana') alfabeto_da_vez = '平仮名'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'kanji') alfabeto_da_vez = '漢字'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'hangul') alfabeto_da_vez = '한글'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'devanagari') alfabeto_da_vez = 'देवनागरी'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'mkhedruli') alfabeto_da_vez = 'მხედრული'
    if (obj.idioma_2_sistemas_escrita[k].sistema === 'cirilico_russo') alfabeto_da_vez = 'алфави́т'

    let div_alfabeto_vez = `<div class="flex_row center" style="font-size: 17px; padding: 5px; margin: 5px; border-radius: 10px;">${alfabeto_da_vez}</div>`
    if (k === 0) string_idi_sis_2 += div_alfabeto_vez
    if (k != 0) string_idi_sis_2 += ' - ' + div_alfabeto_vez
  }

  return `
  <div class="flex_row T1_m center carta_decoreba_2" style="align-items: flex-start; flex-wrap: wrap;">

    <div class="flex_row T1" style="padding: 10px; background: ${cor_dekoreba}; color: ${obj.cor_letras}; border-top-left-radius: 10px; border-top-right-radius: 10px; overflow: hidden;">
      <img src="${obj.avatar_criador}" class="carta_avatar_criador" onclick="monta_perfil('${obj.id_criador}')">

      <div class="flex_col T1" style="margin-top: -5px; margin-left: 1px;">
        <div class="carta_nome_criador" onclick="monta_perfil('${obj.id_criador}')">
          ${obj.nome_criador}
        </div>
        <div class="carta_data">
          ${obj.data_carta}
        </div>
      </div>          
    </div>

    <div class="flex_row T1" style=" border-top-left-radius: 10px; border-top-right-radius: 10px; background: var(--fundo_carta); margin-top: -5px;">

      <div class="flex_col T1 carta_infos_criador">
          
        <div class="flex_row T1 carta_titulo center" onclick="monta_decoreba_mostra('${obj.id_decoreba}')" style="margin-bottom: 12px; ">
          ${obj.titulo}
        </div>
          
        <div class="flex_row T1 carta_orientacao center">
          <div class="flex_row T2 center" style="border-bottom: 2px solid ${cor_dekoreba};">
            ${obj.idioma_1}
          </div>
          <i class="icon-setas_cheio carta_orientacao_ico"></i>

          <div class="flex_row T2 center" style="border-bottom: 2px solid ${cor_dekoreba};">
            ${obj.idioma_2}
          </div>
        </div>

        <div class="flex_row T1 carta_orientacao" style="color: grey; align-items: center;">
          <div class="flex_row center T2" style="flex-wrap: wrap; line-height: 5px;">${string_idi_sis_1}</div>
          <div class="flex_row center T2" style="flex-wrap: wrap;">${string_idi_sis_2}</div>
        </div>

        <!-- tá sumido nessa nova atualização, pra Domis mexer de boas no sistema. -->
        <div class="flex_row carta_titulos_capitulos sumido">
          ${obj.string_titulos_capitulos}
        </div>

        <!-- Aqui também. Está lendo isso Dominique?? -->
        <div class="flex_row T1 carta_titulos_capitulos sumido">
          <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_0}</span>
          <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_1}</span>
          <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_2}</span>
          <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_3}</span>
          <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_4}&nbsp;</span>
        </div> 
            
        <div class="flex_row" style="margin: 0px; padding: 0px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; justify-content: flex-end; align-items: flex-end;">
          
          <div class="flex_row T1 carta_titulos_capitulos">
            ${botao_editar}
          </div>

          <div class="flex_row T1 center">
          
          <select id="select_remexe_${obj.id_decoreba}">
            <option disabled selected>---</option>
            <option value="reinserir_verbos">Reinserir verbos</option>
            <option value="regravar_som_verbos">Regravar som verbos</option>
            <option value="regravar_som_palavras">Regravar som palavras</option>
          </select>

          <button class="flex_col center botao" onclick="prepara_remexe('${obj.id_decoreba}')">Remexe</button>
          </div>
            
          <!-- E aqui tb. -->
          <div class="flex_col center sumido">
            <i id="estrela_${obj.id_decoreba}" class="${obj.ico_estrela} carta_estrela" onclick="curtir_decoreba('${obj.id_decoreba}', this, 'qtd_estrelas_${obj.id_decoreba}')"></i>
            <span id="qtd_estrelas_${obj.id_decoreba}" class="carta_estrela_qtd" id="qtd_estrelas_${obj.id_decoreba}">${obj.estrelas}</span>
          </div>

        </div>

      </div>

    </div>
    
  </div>`
 
}

// A função carta_clica_tag() é auxiliar da carta(). Só funciona nela.
function carta_clica_tag(termo) {

  termo = termo.substring(1) // Tira a hashtag do termo
  monta_explorar(termo)
}

function fecha_popup () {
  document.getElementById('popup_externo').style.display = 'none'
}

function loading(parametro) {
  if (parametro == "loading...") {
    document.getElementById("container_loading").style.display = "flex"
  }
  if (parametro == "carregou") {
    document.getElementById("container_loading").style.display = "none"
  }
}

function reconhece_sist_escrita(inner_html) {

  let alfabeto_da_vez = ''
  
  if (inner_html === 'Abc') alfabeto_da_vez = 'latino'
  if (inner_html === 'عربية') alfabeto_da_vez = 'arabe'
  if (inner_html === 'אלפבית') alfabeto_da_vez = 'alef-beit'
  if (inner_html === 'Αβγ') alfabeto_da_vez = 'grego'
  if (inner_html === 'カタカナ') alfabeto_da_vez = 'katakana'
  if (inner_html === '平仮名') alfabeto_da_vez = 'hiragana'
  if (inner_html === '漢字') alfabeto_da_vez = 'kanji'
  if (inner_html === '한글') alfabeto_da_vez = 'hangul'
  if (inner_html === 'देवनागरी') alfabeto_da_vez = 'devanagari'
  if (inner_html === 'მხედრული') alfabeto_da_vez = 'mkhedruli'
  if (inner_html === 'алфави́т') alfabeto_da_vez = 'cirilico_russo'

  return alfabeto_da_vez
}

function sistema_principal (idioma) {

    if (idioma === 'Alemão') return 'latino'
    if (idioma === 'Árabe') return 'arabe'
    if (idioma === 'Catalão') return 'latino'
    if (idioma === 'Chinês') return 'kanji'
    if (idioma === 'Coreano') return 'hangul'
    if (idioma === 'Espanhol') return 'latino'
    if (idioma === 'Esperanto') return 'latino'
    if (idioma === 'Francês') return 'latino'
    if (idioma === 'Grego') return 'grego'
    if (idioma === 'Indiano') return 'devanagari'
    if (idioma === 'Inglês') return 'latino'
    if (idioma === 'Italiano') return 'latino'
    // if (idioma_complexo === 'Japonês') return 'japones'
    if (idioma === 'Latim') return 'latino'
    if (idioma === 'Português') return 'latino'
    if (idioma === 'Russo') return 'cirilico_russo'
}

function innerHTML_sist_escr(sist_escrita) {

  let innerHTML_do_sistema = ''

  if (sist_escrita === 'latino') innerHTML_do_sistema = 'Abc'
  if (sist_escrita === 'arabe') innerHTML_do_sistema = 'عربية'
  if (sist_escrita === 'alef-beit') innerHTML_do_sistema = 'אלפבית'
  if (sist_escrita === 'grego') innerHTML_do_sistema = 'Αβγ'
  if (sist_escrita === 'katakana') innerHTML_do_sistema = 'カタカナ'
  if (sist_escrita === 'hiragana') innerHTML_do_sistema = '平仮名'
  if (sist_escrita === 'kanji') innerHTML_do_sistema = '漢字'
  if (sist_escrita === 'hangul') innerHTML_do_sistema = '한글'
  if (sist_escrita === 'devanagari') innerHTML_do_sistema = 'देवनागरी'
  if (sist_escrita === 'mkhedruli') innerHTML_do_sistema = 'მხედრული'
  if (sist_escrita === 'cirilico_russo') innerHTML_do_sistema = 'алфави́т'

  return innerHTML_do_sistema
}

/* ESPECÍFICAS */

// LOGIN //

async function esqueceu_senha () {

  const hud_login = JSON.parse(localStorage.getItem('hud_login'))
  let e_mail = prompt(hud_login.digite_email_recup, "")

  if (e_mail == null || e_mail == "") {
    // text = "User cancelled the prompt.";
  } else {
    document.getElementById('msg_sistema_esqueceu_foi').style.display = 'flex'
    await vai_filhao_2('solicita_troca_senha', e_mail)
  }
}

// CADASTRAR //
function valida_novo_cadastro () {

  const cadastro_senha = document.getElementById('cadastro_senha').value
  const cadastro_repete_senha = document.getElementById('cadastro_repete_senha').value

  let msg_sistema_cadastro = document.getElementById('msg_sistema_cadastro')
  msg_sistema_cadastro.style.display = 'flex'

  const hud_cadastro = JSON.parse(localStorage.getItem('hud_cadastro'))

  if (document.getElementById('cadastro_nome').value == '') {
    msg_sistema_cadastro.innerHTML = hud_cadastro.sem_nome
    return false
  }

  if (document.getElementById('cadastro_email').value === '') {
    msg_sistema_cadastro.innerHTML =  hud_cadastro.email_invalido
    return false
  }

  else if (valida_forca_senha === 'nao') {
    msg_sistema_cadastro.innerHTML = hud_cadastro.senha_fraca
    return false
  }

  else if (cadastro_senha != cadastro_repete_senha) {
    msg_sistema_cadastro.innerHTML = hud_cadastro.senhas_diferentes
    return false
  }

  return true
}

async function cadastrar(metodo) {

  if (valida_novo_cadastro() === false) return

  if (metodo === 'cadastro') {

    const dados_cadastro = {
      nome: document.getElementById('cadastro_nome').value,
      login: document.getElementById('cadastro_email').value,
      senha: document.getElementById('cadastro_senha').value
    }

    const cadastro = await vai_filhao_2('cadastro', dados_cadastro)

    if (cadastro.msg === 'cadastro__usuario_ja_existe') {
      document.getElementById('msg_sistema_cadastro').style.display = 'flex'
      document.getElementById('msg_sistema_cadastro').innerHTML = '! Este usuário já existe!'
    }
    if (cadastro.msg === 'cadastro__erro_catastrofico') {
      document.getElementById('msg_sistema_cadastro').style.display = 'flex'
      document.getElementById('msg_sistema_cadastro').innerHTML = '! Ocorreu uma falha no sistema. Desculpe!'
    }
    if (cadastro.msg === 'cadastro__concluido') {
      document.getElementById('recip_cadastro').style.display = 'none'
      document.getElementById('recip_cadastro_enviado').style.display = 'flex'
    }

  }
}

function checa_enter(event, pagina) {

  // Verifica se a tecla pressionada foi a tecla Enter (código 13)
  if (event.key === 'Enter' || event.keyCode === 13) {
                
    if (pagina === 'cadastro') cadastrar('cadastro')
    if (pagina === 'login') vai_filhao_2('login')
  }
}

// AFAZERES //

// Função retornadora de html.
function monta_mini_afazer (item, tipo) {

  // O punhado de lets abaixo servem para três coisas.
  //  1 - Selecionarmos a class certa para cada campo.
  //  2 - Selecionarmos o texto correto para cada campo. - Útil para o lista
  //  3 - Selecionarmos o select correto para cada campo - Útil para o edita

  let prioridade = ''
  let select_prio_1 = ''
  let select_prio_2 = ''
  let select_prio_3 = ''

  if (item.prioridade === 1) {
    classe_prioridade = 'prio_1'
    prioridade = 'Suave'
    select_prio_1 = 'selected'
  }
  if (item.prioridade === 2) {
    classe_prioridade = 'prio_2'
    prioridade = 'Importante'
    select_prio_2 = 'selected'
  }
  if (item.prioridade === 3) {
    classe_prioridade = 'prio_3'
    prioridade = 'Urgente'
    select_prio_3 = 'selected'
  }

  let categoria = ''
  let classe_categoria = ''
  let select_bug = ''
  let select_fun = ''
  let select_cod = ''
  let select_des = ''

  if (item.categoria === 'bug') {
    select_bug = 'selected'
    categoria = 'Bug'
    classe_categoria = 'cat_bug'
  }
  if (item.categoria === 'funcionalidade') {
    select_fun = 'selected'
    categoria = 'Funcionalidade'
    classe_categoria = 'cat_fun'
  }
  if (item.categoria === 'codigo') {
    select_cod = 'selected'
    categoria = 'Código'
    classe_categoria = 'cat_cod'
  }
  if (item.categoria === 'design') {
    select_des = 'selected'
    categoria = 'Design'
    classe_categoria = 'cat_des'
  }

  let select_est_completo = ''
  let select_est_incompleto = ''
  if (item.estado === 'completo') select_est_completo = 'selected'
  if (item.estado === 'incompleto') select_est_incompleto = 'selected'

  let estado = ''
  if (item.estado === 'completo') estado = 'Completo'
  if (item.estado === 'incompleto') estado = 'Incompleto'

  let afazer = ''
  if (tipo === 'listar') {
    afazer = `
    <div class="flex_col T1 center recip_afazer" onclick='afazer_clica_editar(${JSON.stringify(item)})'>
      <div class="flex_row T1">

        <div class="flex_row T2">
          <div class="afazer_tipo ${classe_categoria}">${categoria}</div>
          <div class="afazer_tipo ${classe_prioridade}">${prioridade}</div>
        </div>

        <div class="flex_row T2" style="justify-content: flex-end;">
          <div style="padding: 5px; border-radius: 5px; margin-right: 15px;">${estado}</div>
        </div>          
    
      </div>

      <div class="afazer_descricao">
        ${item.descricao}
      </div>

    </div>
    `
  }

  if (tipo === 'editar') {

    // Pequena conversão do formato da data que vem do Mongoose para o input do nosso querido html.
    const data_criacao_html = data_mongodb_html (item.data_criacao)
    const data_conclusao_html = (item.data_conclusao) ? data_mongodb_html(item.data_conclusao) : null

    afazer = `
    <div class="flex_col T1 center recip_afazer" onclick=''>
      
      <div class="flex_row T1">
        <div class="flex_col T2">
          <div class="flex_row T1">Data de criação:</div>
          <input id="afazer_data_criacao_edita" type="date" value="${data_criacao_html}" />
        </div>
        <div class="flex_col T2">
          <div class="flex_row T1">Data de conclusão:</div>
          <input id="afazer_data_conclusao_edita" type="date" value="${data_conclusao_html}" />
        </div>
      </div>
      
      <div class="flex_row T1">
        
      </div>

      <div class="flex_row T1" style="margin-top: 25px;">

        <div class="flex_row T2">

          <select id="afazer_categoria_edita" class="${classe_categoria}" style="width: 200px; font-size: 17px; margin-right: 15px;">
            <option value="" disabled>Categoria</option>
            <option value="bug" ${select_bug}>Bug</option>
            <option value="funcionalidade" ${select_fun}>Funcionalidade</option>
            <option value="design" ${select_des}>Design</option>
            <option value="codigo" ${select_cod}>Código</option>
          </select>

          <select id="afazer_prioridade_edita" style="width: 200px; font-size: 17px;">
            <option value="" disabled>Prioridade</option>
            <option value="1" ${select_prio_1}>Suave</option>
            <option value="2" ${select_prio_2}>Importante</option>
            <option value="3" ${select_prio_3}>Urgente</option>
          </select>
        </div>

        <div class="flex_row T2" style="justify-content: flex-end;">
          <div style="padding: 5px; border-radius: 5px; margin-right: 15px;">
           <select id="afazer_estado_edita" class="${classe_categoria}" style="width: 200px; font-size: 17px; margin-right: 15px;">
            <option value="" disabled>Estado</option>
            <option value="completo" ${select_est_completo}>Completo</option>
            <option value="incompleto" ${select_est_incompleto}>Incompleto</option>
          </select>
          </div>
        </div>          
      </div>

      <textarea id="afazer_descricao_edita" class="afazer_descricao">${item.descricao}</textarea>

      <div class="flex_row T1 center">

        <button class="flex_row center botao" onclick='afazeres("deleta", ${JSON.stringify(item)})' style="background: red; color: white;">Deletar</button>
        <button class="flex_row center botao" onclick='afazeres("edita", ${JSON.stringify(item)})'>Salvar</button>

      </div>
    </div>
  `
  }

  return afazer
}

function popup () {
  const palco = document.getElementById('div_palco_index')

  const conteudo = 'dkdk'
  const janelinha = `
  <div id="dks" class="flex_col T1 center" style="width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); position: fixed;">
    <div id="popup_externo" class="flex_col T1 center mostra_recip_info">   
      <div id="popup_interno" class="flex_col T1 mostra_info_caixinha">
        
        <div class="flex_row T1 popup_barra_superior">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup()"></i> 
        </div>
        <br>
      
        <div class="flex_col T1 caixa_info_texto" style="margin-top: 70px; padding: 15px;">
          ${conteudo}
        </div>


      </div>
    </div>
  </div>
  
  `

  palco.innerHTML += janelinha

}

// Gerenciamento de um CRUDzinho simprão.
async function afazeres (acao, item) {

  if (acao === 'puxa') {

    const json = await vai_filhao_2('afazeres', { acao: 'puxa' }) // Baixa todos os afazers do banco.
    const afazeres = json.afazeres

    // Montamos todos, um embaixo do outro, concatenando tudo em uma variável.
    let afazeres_html = ''
    for (let i = 0; i < afazeres.length; i++) {

      const afazer = monta_mini_afazer(afazeres[i], 'listar')
      afazeres_html += afazer
    }
    
    // Mostramos esta lista de tarefas.
    document.getElementById('recip_lista_afazeres').innerHTML = afazeres_html
    return
  }
  
  loading('loading...')

  let obj = {}
  if (acao === 'upa') {
    valida_afazeres(acao)

    obj = {
      acao: 'upa',
      descricao: document.getElementById('afazer_descricao').value,
      categoria: document.getElementById('afazer_categoria').value,
      prioridade: document.getElementById('afazer_prioridade').value
    }
  }

  if (acao === 'edita') {
    obj = {
      acao: 'edita',
      _id: item._id,
      data_criacao: document.getElementById('afazer_data_criacao_edita').value,
      data_conclusao: document.getElementById('afazer_data_conclusao_edita').value,
      descricao: document.getElementById('afazer_descricao_edita').value,
      categoria: document.getElementById('afazer_categoria_edita').value,
      prioridade: document.getElementById('afazer_prioridade_edita').value,
      estado: document.getElementById('afazer_estado_edita').value
    }
  }

  if (acao === 'deleta') {
    obj = {
      acao: 'deleta',
      _id: item._id
    }
  }

  // Esse vai filhão funciona para o upa, edita e deleta.
  vai_filhao_2('afazeres', obj)
}

function afazer_clica_editar (item) {
  
  let fundo_preto = document.getElementById('afazeres_fundo_preto')
  const afazer = monta_mini_afazer(item, 'editar')
  fundo_preto.innerHTML = afazer
  fundo_preto.style.display = 'flex'
}

function valida_afazeres (acao) {
  if (acao === 'upa') {

    const categoria = document.getElementById('afazer_categoria').value
    const prioridade = document.getElementById('afazer_prioridade').value
    const descricao = document.getElementById('afazer_descricao').value

    if (!categoria) {
      alert("Faltou preencher o campo da categoria.")
      return false
    }
    
    if (!prioridade) {
      alert("Faltou preencher o campo da prioridade.")
      return false
    }

    if (!descricao) {
      alert("Faltou preencher o campo da descricao.")
      return false
    }

  }
}

// CRIA //

function valida_coisas (acao) {
  // Adicionar palavra

  // A dekoreba deve ter um nome, os dois idiomas devem estar preenchidos e o capitulo deve ter um nome.
  if (acao === 'adicionar_palavras' || acao === 'adicionar_capitulo' || acao === 'salvar_dekoreba') {

    if (document.getElementById('titulo_nova_decoreba').value == '') {
      alert("Sua dekoreba precisa de um título.")
      return 'faltou_titulo_dekoreba'
    }
    
    if (document.getElementById('idioma_1').value == '') {
      alert("Faltou escolher o primeiro idioma de sua dekoreba.")
      return 'faltou_idioma_1'
    }

    if (document.getElementById('idioma_2').value == '') {
      alert("Faltou escolher o segundo idioma de sua dekoreba.")
      return 'faltou_idioma_2'
    }

    if (document.getElementById('capitulos_decoreba').style.display === 'none') {
      alert("É necessário nomear este capítulo da dekoreba.")
      return 'faltou_idioma_2'
    }

  }

  if (acao === 'adicionar_capitulo' || acao === 'salvar_dekoreba') {

    // Não pode ter menos de três linhas totalmente preenchidas (item_idioma_1 e item_idioma_2)
    let linhas_preenchidas = 0
    for (let i = 0; i < obj_teste.capitulos[cap_i_ativo].vocabulario.length; i++) {

      if ((obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_1.length & obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_1[0].item != '') && (obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_2.length & obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_2[0].item != '')) {

        linhas_preenchidas++
      }
    }

    /*
    if (linhas_preenchidas < 3) {
      alert("O capítulo recém criado não pode ficar com menos de 3 palavras em cada um dos dois idiomas.")
      return 'menos_de_3_palavras'
    }
    */
  }
}

function cria_input_digita (n_idi, cap_i_ativo, item_i, coluna_i, i_cor, tipo) {

  let item = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]

  let item_idi = (n_idi === 1) ? item.idioma_1 : item.idioma_2

  let qtd_itens_idi = item_idi.length

  // Passa para o próximo input do mesmo idioma

  if (n_idi === 1) {
    if (coluna_i < qtd_itens_idi - 1) {
      alterna_edita_div (n_idi, item_i, coluna_i+1, i_cor, tipo)
    }
    if (coluna_i == qtd_itens_idi - 1) {
      alterna_edita_div (n_idi + 1, item_i, 0, i_cor, tipo)
    }
  }
  
  if (n_idi === 2) {
    if (coluna_i < qtd_itens_idi - 1) {
      alterna_edita_div (n_idi, item_i, coluna_i+1, i_cor, tipo)
    }

    if (coluna_i == qtd_itens_idi - 1) {
      alterna_edita_div (n_idi - 1, item_i + 1, 0, i_cor, tipo)
    }
  }
  
}

function adiciona_verbo () {

  // Aqui deverá reconhecer o idioma que o verbo será inserido.
  // Deve-se abrir um popup com os dois idiomas, cada um em um botão estilo checkbox.
  // Ele pode adicionar apenas um idioma ou os dois. Se forem dois, eles devem ser equivalentes.
  // Deve-se ter também a opção de adicionar mais de um verbo para ser equivalente de outro.
  // Pergunta-se ao usuário qual idioma ele gostaria de adicionar.

  document.getElementById('recip_popup_verbo').style.display = 'flex'
}

function adiciona_capitulo () {

  const resultado_valida = valida_coisas ('adicionar_capitulo')
  if (resultado_valida === 'faltou_titulo_dekoreba' || resultado_valida === 'faltou_idioma_1' || resultado_valida === 'faltou_idioma_2' || resultado_valida === 'menos_de_3_palavras') {
    return 
  }

  valida_add_capitulo()

  add_capitulo_select() // Adicionamos mais um elemento no select.

  // Limpamos tudo.
  document.getElementById('recip_capitulo').innerHTML = `
    <div id="recip_capitulo" class="flex_col T1 center" style="">

      <div class="flex_row T1 center cria_recip_titulo_cap">
        
        <input id="titulo_capitulo" type="text" class="input_texto cria_titulo_cap" placeholder="Título do Capítulo" onkeyup="digita_titulo_capitulo(this.value)" onchange="muda_titulo_capitulo()" value="">
  
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()"></i> 
      </div>

      <div id="recip_palavras" class="flex_col T1 center">
        <!-- {palavras} -->
      </div>

    </div>
  `
  document.getElementById('text-input').innerHTML = ""
  elimina_info('add_capitulo') // Limpa a info para o novo capítulo

  // Atualizamos o obj_teste e o mexidos.
  const rand = gera_id_randomico()
  const id_provisorio = `recem_criado__${rand}`

  obj_teste.capitulos.push({
    _id: id_provisorio,
    id_recente: "",
    titulo: "",
    informacoes: "",
    vocabulario: []
  })

  xeca_mexido({tipo: 'capitulo', acao: 'cria', id_cap: id_provisorio})
}

function elimina_capitulo() {

  const ultimo_item = obj_teste.capitulos.length - 1
  if (ultimo_item === 0) {
    alert("Este é o único capítulo desta Decoreba.")
    return
  }

  obj_teste.capitulos.splice(cap_i_ativo, 1)

  let capitulos_select = document.getElementById('capitulos_decoreba')
  capitulos_select.remove(cap_i_ativo)

  for (let i = 0; i < capitulos_select.length; i++) {
    capitulos_select.options[i].value = i
  }

  cap_i_ativo = 0

  let palavras = ''
  for (let j = 0; j < obj_teste.capitulos[cap_i_ativo].vocabulario.length; j++) {
    palavras += html_palavras(cap_i_ativo, j)
  }

  let recip_capitulo = `
    <div id="recip_capitulo" class="flex_col T1 center" style="">

      <div class="flex_row T1 center cria_recip_titulo_cap">
        
        <input id="titulo_capitulo" type="text" class="input_texto cria_titulo_cap" placeholder="Título do Capítulo" onkeyup="digita_titulo_capitulo(this.value)" onchange="muda_titulo_capitulo()" value="${obj_teste.capitulos[cap_i_ativo].titulo}">
  
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()" style="margin-top: 10px;"></i> 
      </div>

      <div id="recip_palavras" class="flex_col T1 center">
        ${palavras}
      </div>
      
    </div>
  `
  document.getElementById('recip_capitulo').innerHTML = recip_capitulo
  
  const id_capitulo = obj_teste.capitulos[cap_i_ativo]._id
  xeca_mexido({tipo: 'captlulo', acao: 'exclui', id_cap: id_capitulo})
}


function insere_palavra (tipo, item_i, idi, apagou) {

  // O tipo pode ser: 'nova_palavra', 'outro_termo'
  const resultado_valida = valida_coisas ('adicionar_palavras')
  if (resultado_valida === 'faltou_titulo_dekoreba' || resultado_valida === 'faltou_idioma_1' || resultado_valida === 'faltou_idioma_2' ) {
    return 
  }

  const soma_1 = conta_sist_escr (1)
  const soma_2 = conta_sist_escr (2)

  valida_nova_palavra (tipo)
  
  const tipo_de_item = (tipo === 'nova_palavra') ? 'palavra' : ''
  const numero_arquivo = define_numero_arquivo (idi)

  let qtd_outros_termos = 0

  // Estas lets abaixo só servem para saber se é o primeiro termo ou não.
  let qtd_outros_termos_idi_1 = 0
  let qtd_outros_termos_idi_2 = 0

  if (tipo === 'outro_termo' & !apagou) {
    
    const soma = (idi === 'idi_1') ? soma_1 : soma_2

    const tipo_de_item = define_tipo_item (idi, soma, item_i, apagou)    
    const itens = cria_item (soma, tipo_de_item, numero_arquivo, apagou)

    // implantamos os itens no obj_teste
    for (let i = 0; i < itens.length; i++) {
      if (idi === 'idi_1') obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_1.push(itens[i])
      if (idi === 'idi_2') obj_teste.capitulos[cap_i_ativo].vocabulario[item_i].idioma_2.push(itens[i])
    }

    cria_faz_input_termo (idi, item_i, tipo_de_item, 'novo_termo')
  }

  if (tipo === 'nova_palavra') {

    const itens_idi_1 = cria_item (soma_1, tipo_de_item, numero_arquivo)
    const itens_idi_2 = cria_item (soma_2, tipo_de_item, numero_arquivo)

    const rand = gera_id_randomico ()
    const id_provisorio_palavra_e_termos = `recem_criado__${rand}`

    obj_teste.capitulos[cap_i_ativo].vocabulario.push({
      _id: id_provisorio_palavra_e_termos,
      idioma_1: itens_idi_1,
      idioma_2: itens_idi_2
    })
 
    cria_faz_input_palavra ()
  }

  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.

  const n_idi = (idi === 'idi_1') ? 1 : 2
  const vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario
  
  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {
      console.log(`input_idi1_cap${cap_i_ativo}_item${i}_col${j}`)
      document.getElementById(`input_idi1_cap${cap_i_ativo}_item${i}_col${j}`).value = vocabulario[i].idioma_1[j].item
    }
  }

  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {
      document.getElementById(`input_idi2_cap${cap_i_ativo}_item${i}_col${j}`).value = vocabulario[i].idioma_2[j].item
    }
  }

  const id_deste_cap = obj_teste.capitulos[cap_i_ativo]._id

  const idioma_1 = document.getElementById('idioma_1')
  const idioma_2 = document.getElementById('idioma_2')

  let idioma = (n_idi === 1) ? obj_teste.idioma_1 : obj_teste.idioma_2
  let i_alfabeto_principal = 0

  // Primeiro verificamos qual é o alfabeto mais importante em ordem de prioridade, ativos pelo usuário.
  const alfabeto_principal_1 = determina_alfabeto_principal(1)
  const alfabeto_principal_2 = determina_alfabeto_principal(2) 

  // Aqui não se altera o mexidos, só se altera quando se modifica uma palavra pois o usuário pode criar uma palavra.
  // e deixar ela em branco, aí não alteraria nada no banco de dados.
}

function altera_palavra (valor, cap_i, item_j, idioma, n_item, coluna_palavras, tipo) {
  // Essa função é ativada quando se altera o conteúdo do input de alguma palavra.
  // Primeiro há de se ver, quantos alfabetos estão ativos.

  const botoes_sist_escrita = (idioma === 'idioma_1') ? document.getElementsByClassName("idi_1") : document.getElementsByClassName("idi_2")
  
  const alfabeto_da_vez = reconhece_sist_escrita(botoes_sist_escrita[n_item].innerHTML)

  let item_idioma
  if (idioma === 'idioma_1') item_idioma = obj_teste.capitulos[cap_i].vocabulario[item_j].idioma_1[coluna_palavras]
  if (idioma === 'idioma_2') item_idioma = obj_teste.capitulos[cap_i].vocabulario[item_j].idioma_2[coluna_palavras]

  item_idioma.item = valor
  item_idioma.sistema_escrita = alfabeto_da_vez

  const id_deste_cap = obj_teste.capitulos[cap_i]._id
  const id_deste_item = obj_teste.capitulos[cap_i].vocabulario[item_j]._id

  const n_idi = (idioma === 'idioma_1') ? 1 : 2
  const alfabeto_principal = determina_alfabeto_principal(n_idi)
    
  // Aqui temos que ver se a palavra modificada foi a palavra do alfabeto principal.
  if (alfabeto_da_vez === alfabeto_principal) {

    let obj_mexidos = {
      tipo: tipo,
      acao: 'modifica',
      id_cap: id_deste_cap,
      id_item: id_deste_item,
      idioma: idioma,
      valor: valor
    }

    if (tipo === 'outro_termo') obj_mexidos["id_palavra"] = item_j
    xeca_mexido(obj_mexidos)
  }

}

function elimina_palavra (cap_i, item_i, col) {

  // valida_elimina_palavra (item_i)

  const id_deste_cap = obj_teste.capitulos[cap_i]._id
  const id_deste_item = obj_teste.capitulos[cap_i].vocabulario[item_i]._id

  obj_teste.capitulos[cap_i].vocabulario.splice(item_i, 1)

  let palavras = ''
  for (let i = 0; i < obj_teste.capitulos[cap_i].vocabulario.length; i++) {
    palavras += html_palavras(cap_i, i)
  }

  document.getElementById('recip_palavras').innerHTML = palavras

  cria_termos_ocultos ()
  fecha_popup_excluir_palavras()

  xeca_mexido({tipo: 'palavra_e_termos', acao: 'exclui', id_cap: id_deste_cap, id_item: id_deste_item})
}

function altera_sist_escrita (botao) {
  // Se o cabra apertar o botão de inserir ou tirar um alfabeto

  const botoes_sist_escrita_1 = document.getElementsByClassName("idi_1")
  const botoes_sist_escrita_2 = document.getElementsByClassName("idi_2")

  let somatoria_alfabetos_inativos = 0

  // Se o sujeito retirou um alfabeto.
  if (botao.classList.contains("alfabeto_ativo")) {
    
    const botoes = (botao.classList.contains("idi_1")) ? botoes_sist_escrita_1 : botoes_sist_escrita_2

    for (let i = 0; i < botoes.length; i++) {
      if (botoes[i].classList.contains('alfabeto_inativo')) somatoria_alfabetos_inativos++

      if (somatoria_alfabetos_inativos == botoes.length - 1) {
        alert("Sua dekoreba precisa ter pelo menos um sistema de escrita ativo, pequeno gafanhoto.")
        return
      }
    }

    let alfabeto_da_vez = reconhece_sist_escrita(botao.innerHTML)

    // Ranca fora no obj_teste.capitulo
    for (let i = 0; i < obj_teste.capitulos[cap_i_ativo].vocabulario.length; i++) {

      let obj_palavras
      if (botao.classList.contains("idi_1")) obj_palavras = obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_1
      if (botao.classList.contains("idi_2")) obj_palavras = obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_2

      for (let j = 0; j < obj_palavras.length; j++) {
        if (obj_palavras[j].sistema_escrita === alfabeto_da_vez) {
          obj_palavras.splice(j, 1)
          j--
        }
      }
    }

    troca_classe (botao, 'alfabeto_ativo', 'alfabeto_inativo')
    for (let k = 1; k < 7; k++) {
      troca_classe (botao, `sist_escri_${k}_ativo`, `sist_escri_${k}_inativo`)
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

  // Se o sujeito colocou um alfabeto a mais.
  } else {

    // Altera a classe do botão
    troca_classe (botao, 'alfabeto_inativo', 'alfabeto_ativo')
    for (let k = 1; k < 7; k++) {
      troca_classe (botao, `sist_escri_${k}_inativo`, `sist_escri_${k}_ativo`)
    }
  
    const n_idioma = (botao.classList.contains("idi_1")) ? 1 : 2
    const soma = conta_sist_escr(n_idioma)

    const botoes_posto = (botao.classList.contains("idi_1")) ? botoes_sist_escrita_1 : botoes_sist_escrita_2
    const alfabeto = reconhece_sist_escrita(botao.innerHTML)

    if (botao.classList.contains("idi_1")) {
      obj_teste.idioma_1_sistemas_escrita.push({ sistema: alfabeto })
      insere_termos_obj_muda_alfabeto(1, alfabeto)
    }
    if (botao.classList.contains("idi_2")) {
      obj_teste.idioma_2_sistemas_escrita.push({ sistema: alfabeto })
      insere_termos_obj_muda_alfabeto(2, alfabeto)
    }

    // if (botao.classList.contains("idi_2")) obj_teste.capitulos[i].vocabulario[j].idioma_2.push({ item: "", sistema_escrita: alfabeto })
  }

  // console.log(obj_teste.capitulos[cap_i_ativo])

  const soma_1 = conta_sist_escr (1)
  const soma_2 = conta_sist_escr (2)

  let itens = obj_teste.capitulos[cap_i_ativo].vocabulario[estado_menu_termo.ultimo_i_item]

  // Manipula o DOM
  let palavras = ''
  for (let j = 0; j < obj_teste.capitulos[cap_i_ativo].vocabulario.length; j++) {
    palavras += html_palavras(cap_i_ativo, j)
  }

  document.getElementById('recip_palavras').innerHTML = palavras

  cria_faz_menu_palavra (cap_i_ativo, estado_menu_termo.ultimo_i_item, 'excluiu_s_sera') // cria a parada do menu, mas vazio
  document.getElementById(`linha_termos_${cap_i_ativo}_${estado_menu_termo.ultimo_i_item}`).style.display = 'flex'

  // Fazemos os inputs dos termos.
  if (itens.idioma_1) {
    for (let i = 0; i < itens.idioma_1.length; i++) {

      if (itens.idioma_1[i].tipo != "palavra") {

        // console.log("i: " + i)
        if (botao.classList.contains("alfabeto_ativo")) {
          console.log("ta indo: cria_faz_input_termo()")
        }

        cria_faz_input_termo ('idi_1', estado_menu_termo.ultimo_i_item, itens.idioma_1[i].tipo, 'trocou_alfabeto')
        i = i + soma_1.ativos
        if (!botao.classList.contains("alfabeto_ativo")) i--

      }
    }
  }

  if (itens.idioma_2) {
    for (let i = 0; i < itens.idioma_2.length; i++) {

      if (itens.idioma_2[i].tipo != "palavra") {
    
        cria_faz_input_termo ('idi_2', estado_menu_termo.ultimo_i_item, itens.idioma_2[i].tipo, 'trocou_alfabeto')
        i = i + soma_2.ativos
        i--
      }
    }
  }


  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.  
  for (let j = 0; j < obj_teste.capitulos[cap_i_ativo].vocabulario.length; j++) {
    for (let k = 0; k < obj_teste.capitulos[cap_i_ativo].vocabulario[j].idioma_1.length; k++) {
      document.getElementById(`input_idi1_cap${cap_i_ativo}_item${j}_col${k}`).value = obj_teste.capitulos[cap_i_ativo].vocabulario[j].idioma_1[k].item
    }
  }

  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.  
  for (let j = 0; j < obj_teste.capitulos[cap_i_ativo].vocabulario.length; j++) {
    for (let k = 0; k < obj_teste.capitulos[cap_i_ativo].vocabulario[j].idioma_2.length; k++) {
      document.getElementById(`input_idi2_cap${cap_i_ativo}_item${j}_col${k}`).value = obj_teste.capitulos[cap_i_ativo].vocabulario[j].idioma_2[k].item
    }
  }
  
}

function seleciona_idioma (valor, n_idioma, inicio) {

  // Se for o carregamento de uma dekoreba já criada, vem o parametro inicio, senão, não.

  // Se for outro, põe de cara o Alfabeto Latino. Se não for outro o idioma, põe o respectivo.
  if (valor === 'Outro') {

    /*
    document.getElementById(`recip_sist_escrita_${n_idioma}`).innerHTML = `
        <div class="flex_row center botao" style="border: 2px solid orange; height: 50px; border-radius: 15px; background: white; color: black; min-width: 150px; margin: 5px;">Abc</div>
    `
    */

    document.getElementById(`outro_idioma_${n_idioma}`).style.display = 'flex'
    document.getElementById(`outro_idioma_${n_idioma}`).value = prompt('Diga-nos. Em que idioma irás escrever.')
  
  } else {

    obj_idiomas_alfabetos.map( el => {
      if (el.idioma === valor) {
        const str_alfabetos = (inicio) ? faz_alfabetos_inicio(el.alfabetos, n_idioma) : faz_alfabetos(el.alfabetos, n_idioma)
        document.getElementById(`recip_sist_escrita_${n_idioma}`).innerHTML = str_alfabetos
      }
    })

    document.getElementById(`outro_idioma_${n_idioma}`).style.display = 'none'
    document.getElementById(`outro_idioma_${n_idioma}`).value = ''
  }

  // Implementamos a sigla_som no obj_teste
  if (n_idioma === 1) {
    insere_sigla_som(document.getElementById('idioma_1').value, n_idioma)
  }
  if (n_idioma === 2) {
    insere_sigla_som(document.getElementById('idioma_2').value, n_idioma)
  }


  if (!inicio) {

    limpa_sistemas_escritas_obj_teste (n_idioma)

    const botoes_sist_escrita_1 = document.getElementsByClassName("idi_1")
    const botoes_sist_escrita_2 = document.getElementsByClassName("idi_2")

    let botoes = (n_idioma === 1) ? botoes_sist_escrita_1 : botoes_sist_escrita_2
    insere_sist_esc_obj_teste (botoes, n_idioma)
    
    if (obj_teste.capitulos[0].vocabulario.length) {
      alert("Você trocou de idioma, logo, toda a sua dekoreba será resetada. Eita!")
      limpa_tudo_troca_idioma ()
    }
  }
}


function elimina_info (acao) {

  const text_input = document.getElementById("text-input")

  const botao_info = document.getElementById('cria_botao_info')
  const x_excluir_info = document.getElementById('x_excluir_info')
  
  if (acao) {

    if (acao === 'clicou_x_apaga_info' || acao === 'add_capitulo') {

      text_input.innerHTML = ''

      troca_classe (botao_info, 'bot_ativo', 'bot_inativo')
      troca_classe (x_excluir_info, 'x_fechar_ativo', 'x_fechar_inativo')
    }

    if (acao === 'muda_capitulo') {

      if (obj_teste.capitulos[cap_i_ativo].informacoes != '') {
        document.getElementById('text-input').innerHTML = obj_teste.capitulos[cap_i_ativo].informacoes

        troca_classe (botao_info, 'bot_inativo', 'bot_ativo')
        troca_classe (x_excluir_info, 'x_fechar_inativo', 'x_fechar_ativo')
      }

      if (obj_teste.capitulos[cap_i_ativo].informacoes === '') {

        text_input.innerHTML = ''

        troca_classe (botao_info, 'bot_ativo', 'bot_inativo')
        troca_classe (x_excluir_info, 'x_fechar_ativo', 'x_fechar_inativo')
      }
    }
  }

  document.getElementById('recip_insere_info').style.display = 'none'
}

function muda_capitulos(valor) {

  cap_i_ativo = document.getElementById('capitulos_decoreba').value

  let palavras = ''
  for (let j = 0; j < obj_teste.capitulos[cap_i_ativo].vocabulario.length; j++) {
    palavras += html_palavras(cap_i_ativo, j)
  }

  const recip_capitulo = `
    <div id="recip_capitulo" class="flex_col T1 center" style="">

      <div class="flex_row T1 center cria_recip_titulo_cap">
        
        <input id="titulo_capitulo" type="text" class="input_texto cria_titulo_cap" placeholder="Título do Capítulo" onkeyup="digita_titulo_capitulo(this.value)" onchange="muda_titulo_capitulo()" value="${obj_teste.capitulos[cap_i_ativo].titulo}">
  
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()" style="margin-top: 10px;"></i> 
      </div>

      <div id="recip_palavras" class="flex_col T1 center">
        ${palavras}
      </div>
      
    </div>
  `
  document.getElementById('recip_capitulo').innerHTML = recip_capitulo

  elimina_info('muda_capitulo')
}

async function elimina_decoreba (id_decoreba) {

  if (window.confirm("Você realmente quer excluir esta Decoreba inteira?")) {
    
    // Exclui a decoreba. Nova ou antiga, o servidor lida com as duas, apaga o que precisa apagar e tchau.
    loading('loading...')
    const json = await vai_filhao_2('decoreba_deleta', id_decoreba)
    window.location.replace(`${servidor}/perfil/${json.id_usuario}`) // Simulate an HTTP redirect:
  }
}


function conta_sist_escr(n_sis) {
  // Primeiro há de se ver, quantos alfabetos estão ativos em cada um dos dois idiomas.
  const botoes_sist_escrita_1 = document.getElementsByClassName("idi_1")
  const botoes_sist_escrita_2 = document.getElementsByClassName("idi_2")

  let total_alfabetos
  let somatoria_alfabetos_inativos = 0

  // As funções abaixo rodam, vem quais os alfabetos ativos de cada idioma e, coloca na soma_sist a situação do alfabeto, se ta ativo ou inativo.
  let soma_sist_escri_1_ativos = 0
  let soma_sist_1 = []
  for (let i = 0; i < botoes_sist_escrita_1.length; i++) {

    const alfabeto_da_vez = reconhece_sist_escrita(botoes_sist_escrita_1[i].innerHTML)

    if (botoes_sist_escrita_1[i].classList.contains('alfabeto_ativo')) {
      soma_sist_escri_1_ativos++
      soma_sist_1.push({ 'sistema': alfabeto_da_vez, 'situacao': 'ativo' })
    } else {
      soma_sist_1.push({ 'sistema': alfabeto_da_vez, 'situacao': 'inativo' })
    }
  }

  let soma_sist_2 = []
  let soma_sist_escri_2_ativos = 0
  for (let i = 0; i < botoes_sist_escrita_2.length; i++) {

    const alfabeto_da_vez = reconhece_sist_escrita(botoes_sist_escrita_2[i].innerHTML)

    if (botoes_sist_escrita_2[i].classList.contains('alfabeto_ativo')) {
      soma_sist_escri_2_ativos++
      soma_sist_2.push({ 'sistema': alfabeto_da_vez, 'situacao': 'ativo' })
    } else {
      soma_sist_2.push({ 'sistema': alfabeto_da_vez, 'situacao': 'inativo' })
    }
  }

  if (n_sis === 1) return { sistemas: soma_sist_1, ativos: soma_sist_escri_1_ativos }
  if (n_sis === 2) return { sistemas: soma_sist_2, ativos: soma_sist_escri_2_ativos }
}


function cria_faz_menu_palavra (cap_i, item_i, excluiu_termo) {

  // Primeiramente temos que verificar se já há algum menu ativado. Se tiver, desativar todos.
  estado_menu_termo.ultimo_i_item = item_i

  // Se este menu está ativado. Fecha só ele.
  let div_recip_linha = document.getElementById(`recip_linha_${cap_i}_${item_i}`)

  if (div_recip_linha) {

    estado_menu_termo.estado_do_menu = 'fechado' // Atualizar o a let global estado_menu_termo.

    if (div_recip_linha.classList.contains('menu_palavra_ativo')) {

      document.getElementById(`linha_bot_termo_${cap_i}_${item_i}`).style.display = 'none'

      troca_classe(div_recip_linha, 'menu_palavra_ativo', 'menu_palavra_inativo')

      document.getElementById(`linha_${cap_i}_${item_i}_idi_1`).style.height = '70px'
      document.getElementById(`linha_${cap_i}_${item_i}_idi_2`).style.height = '70px'

      document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).style.display = 'none' // Mostra algum div ai
  
      const botoes_add_desc = document.getElementsByClassName(`recip_bot_add_desc_${cap_i}_${item_i}`) // desc == descrição
      for (let i = 0; i < botoes_add_desc.length; i++) botoes_add_desc[i].style.display = 'none'

      if (!excluiu_termo) some_aparece_inputs_termos (item_i, 'some')

    // Se o menu estiver desativado, abre só esse e fecha todos os otros bem fechado.
    } else {

      let menu_ativo = document.getElementsByClassName('menu_palavra_ativo')
      if (menu_ativo.length) {
        troca_classe(menu_ativo[0], 'menu_palavra_ativo', 'menu_palavra_inativo')
      }

      estado_menu_termo.ultimo_i_item = item_i
      estado_menu_termo.estado_do_menu = 'aberto'

      document.getElementById(`linha_${cap_i_ativo}_${item_i}`).style.display = 'flex'

      document.getElementById(`linha_bot_termo_${cap_i}_${item_i}`).style.display = 'flex'

      troca_classe(div_recip_linha, 'menu_palavra_inativo', 'menu_palavra_ativo')

      document.getElementById(`linha_${cap_i}_${item_i}_idi_1`).style.height = '120px'
      document.getElementById(`linha_${cap_i}_${item_i}_idi_2`).style.height = '120px'

      document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).style.display = 'flex' // Mostra algum div ai

      document.getElementById(`linha_${cap_i}_${item_i}_idi_1`).style.height = '120px'

      const botoes_add_desc = document.getElementsByClassName(`recip_bot_add_desc_${cap_i}_${item_i}`) // desc == descrição
      for (let i = 0; i < botoes_add_desc.length; i++) botoes_add_desc[i].style.display = 'flex'


      if (!excluiu_termo) some_aparece_inputs_termos (item_i, 'aparece')

      // Criamos os "botões" Inserir outro termo.
      document.getElementById(`linha_bot_termo_${cap_i}_${item_i}`).style.display = 'flex'
      document.getElementById(`linha_bot_termo_${cap_i}_${item_i}`).innerHTML = `
        <div class="flex_col T1 center">
          <div class="flex_row T1 center" style="margin-top: 55px; ">
            <div id="linha_bot_termo_${cap_i}_${item_i}_idi_1" class="flex_row T2 center" style="">
              <div class="flex_row T1 center" style="color: blue;"><span style="cursor: pointer;" onclick="insere_palavra('outro_termo', ${item_i}, 'idi_1')">Inserir outro termo</span>
              </div>
            </div>
            <div id="linha_bot_termo_${cap_i}_${item_i}_idi_2" class="flex_row T2 center">
              <div class="flex_row T1 center" style="color: blue;"><span style="cursor: pointer;" onclick="insere_palavra('outro_termo', ${item_i}, 'idi_2')">Inserir outro termo</span>
              </div>
            </div>
          </div>

          <div class="flex_row center botao" style="margin-top: 50px;" onclick="abre_popup_excluir_palavras(${cap_i}, ${item_i})">
            Excluir alguma destas palavras
          </div>
        </div>
      `
    }
  }

  const qtd_vocs = obj_teste.capitulos[cap_i].vocabulario.length
  for (let i = 0; i < qtd_vocs; i++) {
    if (i != item_i) {
      if (div_recip_linha) {
        // document.getElementById(`linha_${cap_i_ativo}_${item_i}`).style.display = 'none'
        document.getElementById(`linha_bot_termo_${cap_i}_${i}`).style.display = 'none'

        // troca_classe(div_recip_linha, 'menu_palavra_ativo', 'menu_palavra_inativo')

        document.getElementById(`linha_${cap_i}_${i}_idi_1`).style.height = '70px'
        document.getElementById(`linha_${cap_i}_${i}_idi_2`).style.height = '70px'

        document.getElementById(`linha_termos_${cap_i_ativo}_${i}`).style.display = 'none' // Mostra algum div ai
    
        const botoes_add_desc = document.getElementsByClassName(`recip_bot_add_desc_${cap_i}_${i}`) // desc == descrição
        for (let j = 0; j < botoes_add_desc.length; j++) botoes_add_desc[j].style.display = 'none'

        if (!excluiu_termo) some_aparece_inputs_termos (i, 'some')
      }
    }
  }

}

function popup_palavra (cap_i, item_i) {
  cria_faz_menu_palavra(cap_i, item_i)
  /*
  document.getElementById('recip_popup_palavra').style.display = 'flex'
  // Aqui é necessário preencher o popup com botões com onclicks com parametros específicos.
  document.getElementById('recip_interno_popup_palavras').innerHTML = `
    <div class="flex_row botao center" style="min-width: 200px;" onclick="cria_faz_menu_palavra(${cap_i}, ${item_i});">Menu Palavra</div>
    <div class="flex_row botao center" style="min-width: 200px;">Excluir Palavra</div>

  `
  */
}

function fecha_pop_palavra () {
  // Esse não funfa mais
  document.getElementById('recip_popup_palavra').style.display = 'none'
}

function fecha_popup_excluir_palavras () {
  // Esse funfa que é uma bezeluuura
  
  document.getElementById('recip_popup_excluir_palavras').style.display = 'none'

}




function define_cor_letras() {
  const cor = document.getElementById('cor_dekoreba').value
  const cor_letras = (tinycolor(cor).isLight()) ? "#2b2b2b" : "#ededed"
  return cor_letras
}

function adicionar_alfabeto(n_idioma) {
  // Essa função será boa só para idiomas novos.
  const idioma_ativo = document.getElementById(`idioma_${n_idioma}`).value

  for (let i = 0; i < obj_idiomas_alfabetos.length; i++) {
    if (obj_idiomas_alfabetos[i].idioma === idioma_ativo) {
    }
  }
}

// Esse valida aqui é só da decoreba_cria()
function valida (nome_formulario) {

  // Fazer aqui nesse valida um negócio pra transformars as aspas simples e duplas em simbolos. Aí cabou-se o pobrema. Depois é só alegria.

  if (nome_formulario === 'decoreba_salva') {

    const titulo_nova_decoreba = document.getElementById('titulo_nova_decoreba').value
    const idioma_1 = document.getElementById('idioma_1').value
    const idioma_2 = document.getElementById('idioma_2').value

    if (!titulo_nova_decoreba) {
      alert("Faltou preencher o campo de título da nova decoreba.")
      return false
    }

    if (!idioma_1) {
      alert("Faltou preencher o campo do idioma 1.")
      return false
    }

    if (!idioma_2) {
      alert("Faltou preencher o campo do idioma 2.")
      return false
    }

    // Neste valida, trabalhamos os campos do obj_teste e convertemos todos os valores com aspas duplas e simples para codigos html. Importantíssimo pra rodar palavras com aspas simples e duplas, tipo caixa d'água.

    let titulo_dec = titulo_nova_decoreba.split('"').join("&quot;")
    titulo_dec = titulo_dec.split("'").join("&apos;")
    obj_teste.titulo = titulo_dec
    document.getElementById('titulo_nova_decoreba').value = titulo_dec

    let idioma_1_obj = idioma_1.split('"').join("&quot;")
    idioma_1_obj = idioma_1_obj.split("'").join("&apos;")
    document.getElementById('idioma_1').value = idioma_1_obj

    let idioma_2_obj = idioma_2.split('"').join("&quot;")
    idioma_2_obj = idioma_2_obj.split("'").join("&apos;")
    document.getElementById('idioma_2').value = idioma_2_obj

    for (let i = 0; i < obj_teste.capitulos.length; i++) {

      if (obj_teste.capitulos[i].titulo === '') {
        alert("Faltou preencher o campo de título de algum dos capítulos.")
        return false
      }

      let titulo_cap = obj_teste.capitulos[i].titulo.split('"').join("&quot;")
      titulo_cap = titulo_cap.split("'").join("&apos;")
      obj_teste.capitulos[i].titulo = titulo_cap

      let informacoes = obj_teste.capitulos[i].informacoes.split('"').join("")
      obj_teste.capitulos[i].informacoes = informacoes

      for (let j = 0; j < obj_teste.capitulos[i].vocabulario.length; j++) {

        for (let k = 0; k < obj_teste.capitulos[i].vocabulario[j].idioma_1.length; k++) {

          const item = obj_teste.capitulos[i].vocabulario[j].idioma_1[k].item
          const mexeu = obj_teste.capitulos[i].vocabulario[j].idioma_1[k].mexeu

          // Valida para item em branco no idioma 1.
          if (item === '') {
            alert(`Faltou preencher algum item do capítulo ${obj_teste.capitulos[i].titulo}, na parte do idioma ${idioma_1_obj}. Veje bem.`)
            return false
          }

          obj_teste.capitulos[i].vocabulario[j].idioma_1[k].item = item.split('"').join("&quot;")
        }

        for (let k = 0; k < obj_teste.capitulos[i].vocabulario[j].idioma_2.length; k++) {
          const item = obj_teste.capitulos[i].vocabulario[j].idioma_2[k].item

          // Valida para item em branco no idioma 2.
          if (item === '') {
            alert(`Faltou preencher algum item do capítulo ${obj_teste.capitulos[i].titulo}, na parte do idioma ${idioma_1_obj}. Veje bem.`)
            return false
          }

          obj_teste.capitulos[i].vocabulario[j].idioma_2[k].item = item.split('"').join("&quot;")
        }

        /*

        obj_teste.capitulos[i].vocabulario[j].item_idioma_1 = item_idioma_1.split('"').join("&quot;")
        obj_teste.capitulos[i].vocabulario[j].item_idioma_1 = item_idioma_1.split("'").join("&apos;")
        
        obj_teste.capitulos[i].vocabulario[j].item_idioma_2 = item_idioma_2.split('"').join("&quot;")
        obj_teste.capitulos[i].vocabulario[j].item_idioma_2 = item_idioma_2.split("'").join("&apos;")
        
        
        if (obj_teste.capitulos[i].vocabulario[j].item_idioma_1 === '' || obj_teste.capitulos[i].vocabulario[j].item_idioma_2 === '') {
          alert("Faltou preencher palavras de algum dos capítulos.")
          return false
        }
        */
      }

    }
  }
}



function zera_obj_teste () {
  
  obj_teste = {
    _id: "nova",
    titulo: "",
    idioma_1: "",
    idioma_2: "",
    cor: "",
    cor_letras: "",
    idioma_1_sistemas_escrita: [],
    idioma_2_sistemas_escrita: [],
    sistemas_escrita: {
      idioma_1: [],
      idioma_2: []
    },
    capitulos: [
      {
        _id: "",
        titulo: "",
        informacoes: "",
        vocabulario: []
      }
    ],
    marcacoes: [
      { marcacao: "" },
      { marcacao: "" },
      { marcacao: "" },
      { marcacao: "" },
      { marcacao: "" }
    ]
  }
}

function cria_faz_pagina_nao_disponivel () {
  return `
      <div id="recip_decoreba_cria" class="flex_col T1 center recip">
        <h2>Esta página não está disponível.</h2>
        Parece que o link que você acessou está quebrado ou então a página foi removida. <span class="cria_link" onclick="monta_home();">Voltar para o Decoreba.</span>
      </div>
    `
}

function cria_faz_recip_capitulo (titulo) {
  return `
  <div id="recip_capitulo" class="flex_col T1 center"">

    <div class="flex_row T1 center cria_recip_titulo_cap">
    
      <input id="titulo_capitulo" type="text" class="input_texto cria_titulo_cap" placeholder="Título do Capítulo" onkeyup="digita_titulo_capitulo(this.value)" onchange="muda_titulo_capitulo()" value="${titulo}">
      
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()" style="margin-top: 10px;"></i> 
    </div>

    <div id="recip_palavras" class="flex_col T1 center">
      
    </div>
  `
}

function cria_faz_select_capitulos () {
  const select_cap_display = (obj_teste._id === 'nova') ? 'none' : 'flex'

  let selected = ''
  let select = `<select id="capitulos_decoreba" class="T1 largura_interna input_texto cria_select" style="display: ${select_cap_display};" onchange="muda_capitulos(this.value)">`

  for (let i = 0; i < obj_teste.capitulos.length; i++) {

    // Selecionamos automaticamente o primeiro capítulo no select
    selected = (i === 0) ? 'selected' : ''
    select += `<option value="${i}" ${selected}>${obj_teste.capitulos[i].titulo}</option>`
  }

  select += '</select>'

  return select
}

function cria_faz_select_idi (n_idioma) {
  
  const obj_teste_idioma = (n_idioma === 1) ? obj_teste.idioma_1 : obj_teste.idioma_2

  let select_idi = `<select id="idioma_${n_idioma}" class="T1 largura_interna input_texto cria_select" style="padding-left: 10px; margin-right: 5px;" onchange="seleciona_idioma(this.value, ${n_idioma})">`

  const idioma_nao_selecionado = obj_teste_idioma == null ? '' : 'selected'
  select_idi += `<option value="" ${idioma_nao_selecionado} disabled>Idioma ${n_idioma}</option>`

  for (let i = 0; i < obj_idiomas_alfabetos.length; i++) {

    const idioma_selecionado = obj_idiomas_alfabetos[i].idioma === obj_teste_idioma ? 'selected' : ''
    select_idi += `<option value="${obj_idiomas_alfabetos[i].idioma}" ${idioma_selecionado}>${obj_idiomas_alfabetos[i].idioma}</option>`
  }

  select_idi += '</select>'

  return select_idi

}

// Esta função está se repetindo, mas sem este nome, dentro do elimina_info(), nas funcoes_gerais.js. Preciso ver isso ai.
function limpa_input_text() {
    const text_input = document.getElementById("text-input")

    const botao_info = document.getElementById('cria_botao_info')
    const x_excluir_info = document.getElementById('x_excluir_info')



    if (text_input.innerHTML == '<br><div></div>' || text_input.innerHTML == '<br>' || text_input.innerHTML == '<div></div>' || text_input.innerHTML == '') {

      if (botao_info.classList.contains("bot_ativo")) {
        botao_info.classList.remove("bot_ativo")
        botao_info.classList.add("bot_inativo")
        document.getElementById('cria_span_inserir').innerHTML = 'Inserir informações sobre o capítulo'
      }

      if (x_excluir_info.classList.contains("x_fechar_ativo")) {
        x_excluir_info.classList.remove("x_fechar_ativo")
        x_excluir_info.classList.add("x_fechar_inativo")
        document.getElementById('cria_span_inserir').innerHTML = 'Alterar informações sobre o capítulo'
      }

    } else {
      if (botao_info.classList.contains("bot_inativo")) {
        botao_info.classList.remove("bot_inativo")
        botao_info.classList.add("bot_ativo")
        document.getElementById('cria_span_inserir').innerHTML = 'Inserir informações sobre o capítulo'
      }

      if (x_excluir_info.classList.contains("x_fechar_inativo")) {
        x_excluir_info.classList.remove("x_fechar_inativo")
        x_excluir_info.classList.add("x_fechar_ativo")
        document.getElementById('cria_span_inserir').innerHTML = 'Alterar informações sobre o capítulo'
      }
    }
  }

// HOME //

function fecha_popup_tempo_info () {

  document.body.style.overflow = 'auto'

  document.getElementById('recip_popup_tempo_info').style.display = 'none'
  // document.getElementById('h2_tempo').innerHTML = ''
  document.getElementById('informacoes_tempo_verbal').innerHTML = ''
}


function confere_se_completou_verbo () {
  // Aqui rola um negócio pro cursor voltar pro primeiro input vazio possível.

  const inputs_verbos = document.getElementsByClassName('input_texto_verbo')
  let achou = 'nao'
  for (let i = 0; i < inputs_verbos.length; i++) {
    if (inputs_verbos[i].value === '' & achou === 'nao') {
      inputs_verbos[i].focus()
      achou = 'sim'
    }
  }

  // Se achou, é pq não completou corretamente todos os campos.
  if (achou === 'sim') {
    popup_aberto = 'nenhum'
    document.getElementById('recip_popup_verbo_confere').style.display = 'none'
    document.body.style.overflow = 'auto'
  }

  // Se não achou, é pq completou.
  if (achou === 'nao') {
    popup_aberto = 'verbo_parabens'
    document.getElementById('recip_popup_verbo_confere').style.display = 'none'
    document.getElementById('recip_popup_verbo_parabens').style.display = 'flex'

  }
}

function fecha_popup_verbo_parabens () {
  popup_aberto = 'nenhum'
  document.getElementById('recip_popup_verbo_parabens').style.display = 'none'
  document.body.style.overflow = 'auto'
}



function enter_busca_verbo (event, idioma, palavra) {

  // Verifica se a tecla pressionada é o Enter (código 13)
  if (event.keyCode === 13 || event.which === 13) {
    // Execute ação desejada aqui
    buscar_verbo (`${idioma}`, `${palavra}`)
  }
}

async function puxa_lista_palavras (idioma, letra) {

  const obj_vai = {
    idioma: idioma,
    letra: letra
  }

  console.log(idioma)
  console.log(letra)

  const dados = await vai_filhao_2('listar_verbo', JSON.stringify(obj_vai))

  return dados.lista.verbos
}

async function listar_verbo (idioma, letra) {
    // busca no bánco.
  const obj_vai = {
    idioma: idioma,
    letra: letra
  }

  const dados = await vai_filhao_2('listar_verbo', JSON.stringify(obj_vai))

  if (dados.lista != null) {

    let string_lista = ''
    for (let i = 0; i < dados.lista.verbos.length; i++) {
      string_lista += `<div class="palavra_lista" onclick="buscar_verbo_clique('${idioma}', '${dados.lista.verbos[i]}')">${dados.lista.verbos[i]}</div>`
    }

    document.getElementById('recip_componente').innerHTML = string_lista

    return
  }
}

async function buscar_verbo_clique (idioma, palavra) {

  // document.getElementById('input_verbo_infinitivo').value = palavra
  // Verifica se a tecla pressionada é o Enter (código 13)
    // Execute ação desejada aqui
    buscar_verbo (`${idioma}`, palavra)
  
}

function seleciona_checkbox_verbos (checkbox, idioma, tipo, i_modo) {

  if (tipo === 'tudo') {
    let checkboxes = document.getElementsByClassName(`checkbox_${idioma}`)
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = checkbox.checked
    }
  }

  if (tipo === 'modo') {
    // Primeiro há de se verificar se todos do mesmo modo estao ativos com a nova ativaçao...
    let checkboxes_tempos = document.getElementsByClassName(`checkbox_${idioma} checkbox_do_modo_${i_modo}`)
    for (let i = 0; i < checkboxes_tempos.length; i++) {
      checkboxes_tempos[i].checked = checkbox.checked
    }

    let checkboxes_modos = document.getElementsByClassName('checkbox_modo')

    let todas_checadas_modos = 'sim'
    for (let i = 0; i < checkboxes_modos.length; i++) {
      if (checkboxes_modos[i].checked === false) todas_checadas_modos = 'nao'
    }

    if (todas_checadas_modos === 'sim') document.getElementById('checkbox_completa_tudo').checked = true
    if (todas_checadas_modos === 'nao') document.getElementById('checkbox_completa_tudo').checked = false
  }

  if (tipo === 'tempo') {
    // Verifica se ta tudo checado ou deschecado, possibilitando alterar a geral deste modo.

    let checkboxes_tempos = document.getElementsByClassName(`checkbox_${idioma} checkbox_do_modo_${i_modo}`)

    let todas_checadas  = 'sim'
    for (let i = 0; i < checkboxes_tempos.length; i++) {
      if (!checkboxes_tempos[i].checked) todas_checadas = 'nao'
    }

    if (todas_checadas === 'sim') document.getElementById(`checkbox_geral_do_modo_${i_modo}`).checked = true  
    if (todas_checadas === 'nao') document.getElementById(`checkbox_geral_do_modo_${i_modo}`).checked = false


    // Essa parte do código tá repedita logo acima. Dá pra deixar mais organizado e limpo. Só fazer.
    // Só lembrando que, do jeito que está, funciona.
    let checkboxes_modos = document.getElementsByClassName('checkbox_modo')

    let todas_checadas_modos = 'sim'
    for (let i = 0; i < checkboxes_modos.length; i++) {
      if (checkboxes_modos[i].checked === false) todas_checadas_modos = 'nao'
    }

    if (todas_checadas_modos === 'sim') document.getElementById('checkbox_completa_tudo').checked = true
    if (todas_checadas_modos === 'nao') document.getElementById('checkbox_completa_tudo').checked = false
  }

  // Aqui, pode-se fazer uma checagem de todas as checkboxes checadas.
  checagem_de_checkboxes()
}

var verbo_checkboxes = {
  pessoas: '',
  conjugacao: '',
  complementos_auxs: '',
  completa_tudo: '',
  modos: []
}

function checagem_de_checkboxes () {
  verbo_checkboxes = {
  pessoas: '',
  conjugacao: '',
  complementos_auxs: '',
  completa_tudo: '',
  modos: []
}
  verbo_checkboxes.pessoas = (document.getElementById('checkbox_pessoas').checked) ? 'sim' : 'nao'
  verbo_checkboxes.conjugacao = (document.getElementById('checkbox_conjugacao').checked) ? 'sim' : 'nao'
  verbo_checkboxes.complementos_auxs=(document.getElementById('checkbox_complementos_auxs').checked)?'sim':'nao'
  verbo_checkboxes.completa_tudo = (document.getElementById('checkbox_completa_tudo').checked) ? 'sim' : 'nao'

  alert(verbo_checkboxes.conjugacao)
  for (let i = 0; i < regras_geral.modos.length; i++) {

    const sim_ou_nao = (document.getElementById(`checkbox_geral_do_modo_${i}`).checked) ? 'sim' : 'nao'
    verbo_checkboxes.modos.push({i: i, completa_modo: sim_ou_nao, tempos: []})

    for (let j = 0; j < regras_geral.modos[i].ordem_tempos.length; j++) {
      const sim_ou_nao = (document.querySelector(`.checkbox_do_modo_${i}.checkbox_do_tempo_${j}`).checked) ? 'sim' : 'nao'
      verbo_checkboxes.modos[i].tempos.push({i: j, selecionado: sim_ou_nao})
    }
  }

    console.log(regras_geral)
  console.log("Acima, regras_geral")

console.log(verbo_checkboxes)
console.log("Acima, verbo_checkboxes")
}


function verifica_ativo_inativo_verbo (botao) {

  let startinho = document.getElementById('start_verbos')
  startinho.onClick = ''

  troca_classe(startinho, 'bot_start_ativo', 'bot_start_inativo')

  let botoes = document.getElementsByClassName('bot_opc_busca_verbo')

  for (let i = 0; i < botoes.length; i++) {
    if (botoes[i].classList.contains('bot_ativo')) {
      botoes[i].classList.remove('bot_ativo')
      botoes[i].classList.add('bot_inativo')
    }
  }

  botao.classList.remove('bot_inativo')
  botao.classList.add('bot_ativo')
}


function expande_cap_verbos (i_verbos) {

  let recips_verbos = document.getElementsByClassName('recip_cap_verbos')
  let botoezinhos = document.getElementsByClassName('botaozinho')

  for (let i = 0; i < botoezinhos.length; i++) {
    if (i != i_verbos) {
      if (botoezinhos[i].classList.contains('bot_ativo')) {
        botoezinhos[i].classList.remove('bot_ativo')
        botoezinhos[i].classList.add('bot_inativo')

        botoezinhos[i].innerHTML = '<i class="icon-down-open"></i>'

        recips_verbos[i].style.display = 'none'
      }
    } else if (i === i_verbos) {
      if (botoezinhos[i].classList.contains('bot_inativo')) {
        botoezinhos[i].classList.remove('bot_inativo')
        botoezinhos[i].classList.add('bot_ativo')

        botoezinhos[i].innerHTML = '<i class="icon-up-open"></i>'

        recips_verbos[i].style.display = 'flex'

      } else if (botoezinhos[i].classList.contains('bot_ativo')) {
        botoezinhos[i].classList.remove('bot_ativo')
        botoezinhos[i].classList.add('bot_inativo')

        botoezinhos[i].innerHTML = '<i class="icon-down-open"></i>'

        recips_verbos[i].style.display = 'none'

      }
    }
  }
}

function fecha_popup_verbo () {
  document.getElementById('recip_verbo_popup').style.display = 'none'
}

var navegacao_verbo = {
  tela_1: "",
  tela_2: "",
  tela_3: {
    auxiliar: "",
    cojugacao: "",
    tempos: {

    }
  }
}

function altera_navegacao_verbo (acao) {

  // Tela 1
  if (acao === 'pra_valer') {
    navegacao_verbo.tela_1 = acao
  }
  if (acao === 'treinar') {
    navegacao_verbo.tela_1 = acao
  }

  // Tela 2
  if (acao === 'pra_valer__1') {
    navegacao_verbo.tela_2 = acao
  }
  if (acao === 'pra_valer__1_2') {
    navegacao_verbo.tela_2 = acao
  }
  if (acao === 'treinar__1') {
    navegacao_verbo.tela_2 = acao
  }
  if (acao === 'treinar__1_2') {
    navegacao_verbo.tela_2 = acao
  }

  // Tela 3

}

function navega_popup_verbo (acao) {
  
  altera_navegacao_verbo(acao)

  // id_dekoreba_corrente
  if (acao === 'pra_valer_ou_treinar') {

    document.getElementById('recip_verbo_popup').style.display = 'flex'

    let onclick_vai = ""
    let atividade_botao_vai = "vai_vem_inativo"

    if (navegacao_verbo.tela_1 === "pra_valer" || navegacao_verbo.tela_1 === "treinar") {
      atividade_botao_vai = "vai_vem_ativo"
      onclick_vai = `onclick="navega_popup_verbo('${navegacao_verbo.tela_1}');"`
    }

    const atividade_pra_valer = (navegacao_verbo.tela_1 === "pra_valer") ? "bot_ativo" : "bot_inativo"
    const atividade_treinar = (navegacao_verbo.tela_1 === "treinar") ? "bot_ativo" : "bot_inativo"

    const botao_vem = ''
    const botao_vai = `<i class="icon-right-open-1 ${atividade_botao_vai}" ${onclick_vai})"></i>`
    const botoes_vem_vai = faz_botoes_vem_vai(botao_vem, botao_vai)

    document.getElementById('verbo_popup_dentro').innerHTML = `
      <div class="flex_row center botao bot_joga_treina ${atividade_pra_valer}" style="width: 250px;" onclick="navega_popup_verbo('pra_valer');">
        Pra valer
      </div>

      <div class="flex_row center botao bot_joga_treina ${atividade_treinar}" style="width: 250px;" onclick="navega_popup_verbo('treinar');">
        Treinar
      </div>

      ${botoes_vem_vai}
    `

  }

  if (acao === 'pra_valer') {

    let atividade_treinar

    if (navegacao_verbo.tela_2 === 'pra_valer__1') {

    }



    const bandeira_1 = volta_bandeira(pre_jogo.idioma_1, 35, 1)
    const bandeira_2 = volta_bandeira(pre_jogo.idioma_2, 35, 1)

    const botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='navega_popup_verbo("pra_valer_ou_treinar")'></i>`
    const botao_vai = `<div id="start_verbos" class="flex_row center botao_start bot_start_inativo" onclick="monta_decoreba_verbo()"><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
    
    const botoes_vem_vai = faz_botoes_vem_vai(botao_vem, botao_vai)

    document.getElementById('verbo_popup_dentro').innerHTML = `
      <div id="bot_pra_valer__1" class="flex_row center botao bot_joga_treina bot_inativo" style="width: 250px;" onclick="navega_popup_verbo('pra_valer__1');">
        ${bandeira_1}
      </div>

      <div id="bot_pra_valer__1_2" class="flex_row center botao bot_joga_treina bot_inativo" style="width: 250px;" onclick="navega_popup_verbo('pra_valer__1_2');">
        ${bandeira_1} <span style="margin-left: 15px; margin-right: 15px;">/</span> ${bandeira_2}
      </div>

      ${botoes_vem_vai}
    `
  }

  if (acao === 'pra_valer__1') {
    troca_classe(document.getElementById('start_verbos'), "bot_start_inativo", "bot_start_ativo")
    troca_classe(document.getElementById('bot_pra_valer__1_2'), "bot_ativo", "bot_inativo")
    troca_classe(document.getElementById('bot_pra_valer__1'), "bot_inativo", "bot_ativo")

  }

  if (acao === 'pra_valer__1_2') {
    troca_classe(document.getElementById('start_verbos'), "bot_start_inativo", "bot_start_ativo")
    troca_classe(document.getElementById('bot_pra_valer__1'), "bot_ativo", "bot_inativo")
    troca_classe(document.getElementById('bot_pra_valer__1_2'), "bot_inativo", "bot_ativo")
  }



  if (acao === 'treinar') {

    const bandeira_1 = volta_bandeira(pre_jogo.idioma_1, 35, 1)
    const bandeira_2 = volta_bandeira(pre_jogo.idioma_2, 35, 1)

    const botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='navega_popup_verbo("pra_valer_ou_treinar")'></i>`
    const botao_vai = `<i class='icon-right-open-1 vai_vem_ativo' onclick='navega_popup_verbo("pra_valer_ou_treinar")'></i>`
    
    const botoes_vem_vai = faz_botoes_vem_vai(botao_vem, botao_vai)

    document.getElementById('verbo_popup_dentro').innerHTML = `
      <div id="bot_pra_valer__1" class="flex_row center botao bot_joga_treina bot_inativo" style="width: 250px;" onclick="navega_popup_verbo('treinar__1');">
        ${bandeira_1}
      </div>

      <div id="bot_pra_valer__1_2" class="flex_row center botao bot_joga_treina bot_inativo" style="width: 250px;" onclick="navega_popup_verbo('treinar__1_2');">
        ${bandeira_1} <span style="margin-left: 15px; margin-right: 15px;">/</span> ${bandeira_2}
      </div>

      ${botoes_vem_vai}
    `
  }

  if (acao === 'treinar__1') {

    const botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='navega_popup_verbo("pra_valer_ou_treinar")'></i>`
    const botao_vai = `<i class='icon-right-open-1 vai_vem_ativo' onclick='navega_popup_verbo("treinar__1__opcoes_1")'></i>`
    
    const botoes_vem_vai = faz_botoes_vem_vai(botao_vem, botao_vai)

    document.getElementById('verbo_popup_dentro').innerHTML = variavel_treino_verbo_1
    document.getElementById('verbo_popup_dentro').innerHTML += botoes_vem_vai
  }

  if (acao === 'treinar__1__opcoes_1') {

    const botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='navega_popup_verbo("treinar__1")'></i>`
    const botao_vai = `<div id="start_verbos" class="flex_row center botao_start bot_start_inativo" onclick="monta_decoreba_verbo();"><i class="icon-play" style="margin-right: 5px;"></i> START</div>`

    
    const botoes_vem_vai = faz_botoes_vem_vai(botao_vem, botao_vai)

    document.getElementById('verbo_popup_dentro').innerHTML = variavel_treino_verbo_2
    document.getElementById('verbo_popup_dentro').innerHTML += botoes_vem_vai

  }



}

var regras_geral // Gambiarra, mas não tem como.
async function mostra_verbo (idioma) {

  if (!idioma) return // Essa linha é para o idioma alemão, que tá vindo em branco.

  let regras
  let idioma_completo = ''

  if (idioma === 'pt') {
    idioma_completo = 'Português'
    regras = regras_pt
  }
  
  if (idioma === 'es') {
    idioma_completo = 'Espanhol'
    regras = regras_es
  }
  
  if (idioma === 'it') {
    idioma_completo = 'Italiano'
    regras = regras_it
  }
  
  if (idioma === 'fr') {
    idioma_completo = 'Francês'
    regras = regras_fr
  }
  
  if (idioma === 'en') {
    idioma_completo = 'Inglês'
    regras = regras_en
  }

  regras_geral = regras

  let string = ''
  for (let i = 0; i < regras.modos.length; i++) {
    string += `<div class="flex_col" style="margin: 10px; margin-left: 25px; margin-right: 25px; min-width: calc(50% - 65px);">
      <div style="font-size: 24px; margin-top: 20px; margin-bottom: 5px;">
        <input id="checkbox_geral_do_modo_${i}" type="checkbox" class="checkbox_${idioma} checkbox_modo" style="margin-right: 10px;" onclick="seleciona_checkbox_verbos(this, '${idioma}', 'modo', ${i})" checked>${regras.modos[i].modo}
      </div>
    `
    
    for (let j = 0; j < regras.modos[i].ordem_tempos.length; j++) {
      string += `<div><input type="checkbox" class="checkbox_${idioma} checkbox_tempo checkbox_do_tempo_${j} checkbox_do_modo_${i}" style="margin-right: 10px; margin-left: 15px;" onclick="seleciona_checkbox_verbos(this, '${idioma}', 'tempo', ${i})" checked>${regras.modos[i].ordem_tempos[j]}</div>`
      if (j === regras.modos[i].ordem_tempos.length - 1) {
        string += '</div>'
      }
    }
  }

  let string_capitulos_verbos = ''
  for (let i = 0; i < regras.modos.length; i++) {

    string_capitulos_verbos += `

    <div class="flex_row T1">

      <!-- tinha titulo_cap bot_ativo na class abaixo -->
      <div class='flex_col T1 largura_interna titulo_cap_treino' style="align-items: center; background: none; ">
        <div class="flex_row T1">
          <div class="flex_row T1">
            ${regras.modos[i].modo}
          </div>
          <button id="botaozinho_cap_verbo_${i}" class="flex_row center botaozinho bot_inativo" onclick="expande_cap_verbos(${i});">
            <i class="icon-down-open"></i>
          </button>

        </div>
        <br>
        <div  class="flex_row T1 listra_porcentagem listra_porc_inativa">
          <span id="porcentagem_cap_${i}" class="interior_listra_porcentagem" style="width: 50%; background: yellow; min-height: 5px; border-radius: 7px;"></span>
        </div>
      </div>


      <div class="flex_row center titulo_cap sumido" style="margin-left: 10px; font-size: 20px;" onclick="aparece_popup('joga_ou_treina', ${i});">
        <!-- Treinar -->
        <i class="icon-play" style="font-size: 25pt;"></i>
      </div>

    </div>

    <div id="recip_cap_verbos_${i}" class="flex_col T1 recip_cap_verbos" style="display: none;">
    `

    for (let j = 0; j < regras.modos[i].ordem_tempos.length; j++) {

      string_capitulos_verbos += `

         <div class="flex_row T1">

      <!-- tinha titulo_cap bot_ativo na class abaixo -->
      <div class='flex_col T1 largura_interna titulo_cap_treino' style="align-items: center; background: none; padding-left: 50px;">
        <div class="flex_row T1">
            ${regras.modos[i].ordem_tempos[j]}
        </div>
        <br>
        <div class="flex_row T1 listrinha_porcentagem listra_porc_inativa">
          <span id="porcentagem_cap_${i}" class="interior_listra_porcentagem" style="width: 50%; background: yellow; min-height: 4px; border-radius: 6px;"></span>
        </div>
      </div>


      <div class="flex_row center titulo_cap sumido" style="margin-left: 10px; font-size: 20px;" onclick="aparece_popup('joga_ou_treina', ${i});">
        <!-- Treinar -->
        <i class="icon-play" style="font-size: 25pt;"></i>
      </div>

    </div>

    `
    }

    string_capitulos_verbos += '</div>'
  }

  variavel_treino_verbo_1 = `

    <div class="flex_col T1 center" style="max-width: 600px; margin-top: 0px;">
      <div class="flex_row T1 center sumido" style="margin-bottom: 30px; margin-top: 10px; font-size: 33px;">${idioma_completo}</div>

        <div style="display: none;">
          <input id="checkbox_pessoas" type="checkbox" name="categoria_jogo" value="tudo">
          Pessoas
        </div>

        <div class="flex_col T1 center" style="max-width: 600px; border: 1px solid var(--botao_ativo); padding: 25px; border-radius: 25px;">

          <div class="T1" style="">
          Quais campos você gostaria de preencher?
          <div style="margin-top: 10px;">
            <input id="checkbox_complementos_auxs" type="checkbox" name="categoria_jogo" value="tudo" onclick="checagem_de_checkboxes()">
            Auxiliar
          </div>
          <div>
            <input id="checkbox_conjugacao" type="checkbox" name="categoria_jogo" value="tudo" onclick="checagem_de_checkboxes()">
            Conjugação
          </div>
        
        
          <div style="margin-top: 40px;">Quais tempos verbais você gostaria de praticar?</div>

          <!-- A classe sumido aqui desse div recip_completa_tudo acho que serve para a função, por isso -->
          <!-- msm ele deve ter tabé o display: flex ali nos estilos -->

          <div id="recip_completa_tudo" class="flex_row T1 sumido" style="margin-top: 10px; display: flex; padding: 0px; background: var(--background_site); color: var(--color_site); border-radius: 10px;">

            <div class="flex_row T1" style="align-items: center; margin: 0px;">
              <input id="checkbox_completa_tudo" type="checkbox" name="categoria_jogo_verbo" value="tudo" onclick="seleciona_checkbox_verbos(this, '${idioma}', 'tudo')" style="margin-right: 10px; margin-left: 15px;" checked>
              Completa tudo
            </div>

            <div id="recip_botaozin_sobe_desce_verbos" class="flex_col botao center bot_ativo" style="margin: 0px;" onclick="sobe_desce_tempos_verbais();"><i class="icon-down-open"></i></div>
          </div>
          
          <div id="recip_tempos_verbais" class="flex_row T1 sumido" style="flex-wrap: wrap; background: var(--background_site); color: var(--color_site); border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">

            ${string}
          </div>
        </div>
      </div>
    `

  variavel_treino_verbo_2 = `
    <div class="flex_row T1 center" style="margin-top: 50px;">

      <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="margin: 0px; margin-right: 10px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); abre_pesquisar('${idioma}')">
        Pesquisar
      </div>
            
      <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="margin: 0px; margin-right: 10px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); abre_lista('${idioma}')">
        Lista
      </div>

      <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="padding-left: 0px; padding-right: 0px; font-size: 17px; margin: 0px; margin-right: 10px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); sorteia_verbo('${idioma}')">
        Sorteia verbo
      </div>

      <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="padding-left: 0px; padding-right: 0px; font-size: 17px; margin: 0px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); sorteia_verbo('${idioma}', 'aleatorio')">
        Sorteia tempo
      </div>

    </div>


      <div id="recip_pre_componente" class="flex_row T1 center" style="margin-top: -50px; margin-bottom: 25px;">
      </div>

      <div id="recip_componente" class="flex_row T1 center" style="flex-wrap: wrap;">
      </div>
  `


  document.getElementById('recip_verbos').innerHTML = `<div class="flex_col T1 center" style="max-width: 600px; margin-top: 0px;">
      <div class="flex_row T1 center sumido" style="margin-bottom: 30px; margin-top: 10px; font-size: 33px;">${idioma_completo}</div>

<div class="flex_row center titulo_cap" style="margin-left: 10px; font-size: 20px;" onclick="navega_popup_verbo('pra_valer_ou_treinar');">

        <i class="icon-play" style="font-size: 25pt;"></i><span style="margin-left: 10px;">START</span>
      </div>

      <div class="flex_col T1 center">

          ${string_capitulos_verbos}
        </div>

        <div id="gambiarra_opcoes_verbos" class="sumido">

        </div>
        </div>
      `
  /*    
  document.getElementById('recip_verbos').innerHTML = `

    <div class="flex_col T1 center sumido" style="max-width: 600px; margin-top: 0px;">
      <div class="flex_row T1 center sumido" style="margin-bottom: 30px; margin-top: 10px; font-size: 33px;">${idioma_completo}</div>

        <div style="display: none;">
          <input id="checkbox_pessoas" type="checkbox" name="categoria_jogo" value="tudo">
          Pessoas
        </div>


         <div class="flex_row center titulo_cap" style="margin-left: 10px; font-size: 20px;" onclick="navega_popup_verbo('pra_valer_ou_treinar');">

        <i class="icon-play" style="font-size: 25pt;"></i><span style="margin-left: 10px;">START</span>
      </div>

        <div class="flex_col T1 center sumido">

          ${string_capitulos_verbos}
        </div>

        <div class="flex_col T1 center" style="max-width: 600px; border: 1px solid var(--botao_ativo); padding: 25px; border-radius: 25px; margin-top: 900px;">

          <div class="T1" style="">
          Quais campos você gostaria de preencher?
          <div style="margin-top: 10px;">
            <input id="checkbox_complementos_auxs" type="checkbox" name="categoria_jogo" value="tudo">
            Auxiliar
          </div>
          <div>
            <input id="checkbox_conjugacao" type="checkbox" name="categoria_jogo" value="tudo">
            Conjugação
          </div>
        
        
          <div style="margin-top: 40px;">Quais tempos verbais você gostaria de praticar?</div>

          <!-- A classe sumido aqui desse div recip_completa_tudo acho que serve para a função, por isso -->
          <!-- msm ele deve ter tabé o display: flex ali nos estilos -->

          <div id="recip_completa_tudo" class="flex_row T1 sumido" style="margin-top: 10px; display: flex; padding: 0px; background: var(--background_site); color: var(--color_site); border-radius: 10px;">

            <div class="flex_row T1" style="align-items: center; margin: 0px;">
              <input id="checkbox_completa_tudo" type="checkbox" name="categoria_jogo_verbo" value="tudo" onclick="seleciona_checkbox_verbos(this, '${idioma}', 'tudo')" style="margin-right: 10px; margin-left: 15px;" checked>
              Completa tudo
            </div>

            <div id="recip_botaozin_sobe_desce_verbos" class="flex_col botao center bot_ativo" style="margin: 0px;" onclick="sobe_desce_tempos_verbais();"><i class="icon-down-open"></i></div>
          </div>
          
          <div id="recip_tempos_verbais" class="flex_row T1 sumido" style="flex-wrap: wrap; background: var(--background_site); color: var(--color_site); border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">

            ${string}
          </div>
        </div>
      </div>

          <div class="flex_row T1 center" style="margin-top: 50px;">

            <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="margin: 0px; margin-right: 10px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); abre_pesquisar('${idioma}')">
              Pesquisar
            </div>
            
            <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="margin: 0px; margin-right: 10px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); abre_lista('${idioma}')">
              Lista
            </div>

            <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="margin: 0px; margin-right: 10px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); sorteia_verbo('${idioma}')">
              Sorteia 1 Verbo
            </div>

            <div class="flex_row center T3 T1_m botao bot_inativo bot_opc_busca_verbo" style="margin: 0px; margin-bottom: 50px;" onclick="verifica_ativo_inativo_verbo(this); sorteia_verbo('${idioma}', 'aleatorio')">
              Aleatório
            </div>

          </div>

      </div>

      <div id="recip_pre_componente" class="flex_row T1 center" style="margin-top: -50px; margin-bottom: 25px;">
      </div>

      <div id="recip_componente" class="flex_row T1 center" style="flex-wrap: wrap;">
      </div>
  `
  */
}

var variavel_treino_verbo_1 = ''

function option_link(id) {
  loading('loading...')
  monta_decoreba_mostra(id, 'home')
}

function jogo_verbo () {

}

async function prepara_teste (id_decoreba, id_capitulo, veio_da_lista) {
  
  const stateObj = { tela_ativa: 'teste' }
  
  verifica_url({
    stateObj: stateObj,
    endereco: document.location.href,
    modo_de_vinda: 'clique'
  })
  
  if (!id_decoreba) {
    window.location.href = 'https://192.168.0.127:3004/home';
    return
  }


  const obj_vai = {
    id_decoreba: id_decoreba,
    id_capitulo: id_capitulo
  }

  const obj_vai_str = JSON.stringify(obj_vai)
  const json = await vai_filhao_2('prepara_teste', obj_vai_str)

  pre_jogo = {
    i: 1,
    titulo: json.titulo,
    titulo_capitulo: json.titulo_capitulo,
    orientacao_idiomas_global: '1-2',
    id_decoreba: id_decoreba,
    i_capitulo: json.i_capitulo,
    id_usuario: json.id_usuario,
    avatar: 'https://i.pinimg.com/736x/98/da/68/98da68d5583a98dac656c98265e5f3d2.jpg',
    distancia_global: 'distancia_curta',
    idioma_1: json.idioma_1,
    idioma_2: json.idioma_2,
    idioma_falado_mult: json.idioma_2,
    sistemas_escrita_1: json.sistemas_escrita_1,
    sistemas_escrita_2: json.sistemas_escrita_2
  }

  cap_teste_global = pre_jogo.i_capitulo // Essa var é uma gambiarra sem-vergonha. Preciso ver isso ai.

  const obj_str = JSON.stringify(pre_jogo)
  stri = json.capitulos

  escolhas_dek["alfabetos_perg"] = ["Abc"]
  escolhas_dek["alfabetos_resp"] = ["Abc"]

  escolhas_dek["escrita_alfabeto_resp"] = []
  escolhas_dek["escrita_alfabeto_perg"] = []

  escolhas_dek["falada_alfabetos_perg"] = []
  escolhas_dek["modalidade"] = "escrita"

  escolhas_dek["mult_escolha_alfabetos_perg"] = []
  escolhas_dek["mult_escolha_alfabetos_resp"] = []

  escolhas_dek["orientacao"] = "2-1"


  let raiz_css = document.querySelector(':root')
  raiz_css.style.setProperty('--botao_ativo', json.cor)

  // Essa função abaixo, tinycolor, é de terceiros. 
  // Ela devolve tons mais claros ou mais escuros, dependendo da cor que passamos para ela. Uma velezura.
  const cor_dekoreba_clara = tinycolor(json.cor).lighten(35).desaturate(35).toString()
  const cor_dekoreba_escura = tinycolor(json.cor).darken(10).toString()

  // GAMBIARRA ALERT!
  // Esse cor_bot_ativo_desaturada vai estar ativo por padrão pois o sistema ainda não reconhece se a dekoreba está em modo de treinamento e em modo pra valer. Por enquanto tá sempre em treinamento primeiro.
  let cor_bot_ativo_desaturada = tinycolor(json.cor).lighten(20).desaturate(20).toString()

  // E utilizamos estes novos valores entregues pela tinycolor nos botões deste dekoreba.
  raiz_css.style.setProperty('--letras_dekorebas', json.cor_letras)
  raiz_css.style.setProperty('--botao_ativo_claro', cor_dekoreba_clara)
  raiz_css.style.setProperty('--botao_ativo_escuro', cor_dekoreba_escura)

  // eh_teste_global e teste_inicial_idioma são variáveis globais.
  // Não gosto dessa estratégia de ter tantas variáveis globais, mas, por enquanto, é o que funciona.
  // Terminemos o MVP, depois melhore-mos-lo.
  eh_teste_global = 'sim'
  teste_inicial_idioma = (veio_da_lista) ? 'sim' : 'nao'

 carrega_pergunta_escrita("treino" ,"2-1", pre_jogo, "primeira_pergunta", "teste") 
}

async function option_link_teste_home (id_decoreba, nome) {

  let idioma_inicial = ''
  if (id_decoreba === '65ca2cd951ade1d3d14bb7d2') idioma_inicial = 'Inglês'
  if (id_decoreba === '665c75a07438e2afd86f4e5a') idioma_inicial = 'Italiano'
  if (id_decoreba === '660051302d44ae34507589d9') idioma_inicial = 'Francês'
  if (id_decoreba === '65c919ec3501a7b1de3e20bf') idioma_inicial = 'Espanhol'
  if (id_decoreba === '6516e1694ec552a43b95deb6') idioma_inicial = 'Alemão'

  let home_teste_dentro = document.getElementById('home_teste_dentro')
  

  const obj_vai = {
    id_decoreba: id_decoreba,
    id_capitulo: 'id_capitulo_teste_inicial'
  }

  const obj_vai_str = JSON.stringify(obj_vai)

  // const json = await vai_filhao_2('prepara_teste', id)
  const json = await vai_filhao_2('prepara_teste', obj_vai_str)

  pre_jogo = {
    i: 1,
    titulo: json.titulo,
    titulo_capitulo: json.titulo_capitulo,
    orientacao_idiomas_global: '2-1',
    id_decoreba: id_decoreba,
    i_capitulo: 1,
    id_usuario: json.id_usuario,
    avatar: 'https://i.pinimg.com/736x/98/da/68/98da68d5583a98dac656c98265e5f3d2.jpg',
    distancia_global: 'distancia_curta',
    idioma_1: json.idioma_1,
    idioma_2: json.idioma_2,
    idioma_falado_mult: json.idioma_2,
    sistemas_escrita_1: json.sistemas_escrita_1,
    sistemas_escrita_2: json.sistemas_escrita_2
  }
  
  const obj_str = JSON.stringify(pre_jogo)
  stri = json.capitulos


  escolhas_dek["alfabetos_perg"] = ["Abc"]
  escolhas_dek["alfabetos_resp"] = ["Abc"]

  escolhas_dek["escrita_alfabeto_resp"] = []
  escolhas_dek["escrita_alfabeto_perg"] = []

  escolhas_dek["falada_alfabetos_perg"] = []
  escolhas_dek["modalidade"] = "escrita"

  escolhas_dek["mult_escolha_alfabetos_perg"] = []
  escolhas_dek["mult_escolha_alfabetos_resp"] = []

  escolhas_dek["orientacao"] = "2-1"


  let raiz_css = document.querySelector(':root')
  raiz_css.style.setProperty('--botao_ativo', json.cor)

  if (diurno_noturno === 'noturno') {

  }

  // Essa função abaixo, tinycolor, é de terceiros. 
  // Ela devolve tons mais claros ou mais escuros, dependendo da cor que passamos para ela. Uma velezura.
  const cor_dekoreba_clara = tinycolor(json.cor).lighten(35).desaturate(35).toString()
  const cor_dekoreba_escura = tinycolor(json.cor).darken(10).toString()

  // GAMBIARRA ALERT!
  // Esse cor_bot_ativo_desaturada vai estar ativo por padrão pois o sistema ainda não reconhece se a dekoreba está em modo de treinamento e em modo pra valer. Por enquanto tá sempre em treinamento primeiro.
  let cor_bot_ativo_desaturada = tinycolor(json.cor).lighten(20).desaturate(20).toString()

  // E utilizamos estes novos valores entregues pela tinycolor nos botões deste dekoreba.
  raiz_css.style.setProperty('--letras_dekorebas', json.cor_letras)
  raiz_css.style.setProperty('--botao_ativo_claro', cor_dekoreba_clara)
  raiz_css.style.setProperty('--botao_ativo_escuro', cor_dekoreba_escura)

  // eh_teste_global e teste_inicial_idioma são variáveis globais.
  // Não gosto dessa estratégia de ter tantas variáveis globais, mas, por enquanto, é o que funciona.
  // Terminemos o MVP, depois melhore-mos-lo.
  eh_teste_global = 'sim'
  teste_inicial_idioma = 'sim'
  
  home_teste_dentro.innerHTML = `
    <button class="botao" onclick="volta_teste_escolha('${nome}')">Escolher outro idioma</button>

    <span style="margin-top: 15px;">Excelente! Agora, você terá que escrever algumas palavras em ${idioma_inicial}. Esse teste pode levar um certo tempo, por isso se aconchegue bem e let's Go!</span>

    <div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_ativo" onclick='carrega_pergunta_escrita("treino" ,"2-1", ${obj_str}, "primeira_pergunta", "teste");'><i class="icon-play" style="margin-right: 5px;"></i> INICIAR TESTE</div>
  `
}

// Função abaixo só funciona pra dar certo a função acima.
function volta_teste_escolha (nome) {

  const dentro = faz_dentro_escolhe_teste_inicial(nome)
  document.getElementById('home_teste_dentro').innerHTML = dentro
}


function iniciar_teste () {
  alert("inicio dos testos")

  vai_filhao_2('prepara_teste')
  // <div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_ativo" onclick='carrega_pergunta_escrita("treino" ,"${escolhas_dek.orientacao}", ${obj_str}, "primeira_pergunta");'><i class="icon-play" style="margin-right: 5px;"></i> START</div>
}

function sobe_desce_tempos_verbais () {

  let recip_botaozin = document.getElementById('recip_botaozin_sobe_desce_verbos')
  let recip_tempos_verbais = document.getElementById('recip_tempos_verbais')
  let recip_completa_tudo = document.getElementById('recip_completa_tudo')

  if (recip_tempos_verbais.classList.contains('sumido')) {
    recip_tempos_verbais.classList.remove('sumido')

    recip_completa_tudo.style.borderBottomLeftRadius = '0px'
    recip_completa_tudo.style.borderBottomRightRadius = '0px'

    recip_botaozin.innerHTML = '<i class="icon-up-open"></i>'
  } else if (!recip_tempos_verbais.classList.contains('sumido')) {
    recip_tempos_verbais.classList.add('sumido')

    recip_completa_tudo.style.borderBottomLeftRadius = '10px'
    recip_completa_tudo.style.borderBottomRightRadius = '10px'
        recip_botaozin.innerHTML = '<i class="icon-down-open"></i>'

  }
}

async function sorteia_verbo (idioma, aleatorio) {

  console.log("Sorteará 1 verbáculo.")
  document.getElementById('recip_pre_componente').innerHTML = ''
  document.getElementById('recip_componente').innerHTML = ''

  // baixa a lista de palavras e escolhe uma.

  let letras = []

  let n_letra_aleatoria = 0
  let letra_aleatoria = ''

  if (idioma === 'pt') letras = letras_pt

  // Esses do e while existem pois alguns idiomas não há verbos gravados no nosso banco de dados começando com
    // determinadas letras, pois nós só temos os verbos mais populares.

  // Apesar disso, ainda há verbos que comecem com essas letras, com escessão do J no italiano, ai não tem msm.
    // Daria para apenas diminuir a incidência de vezes que se sorteia as letras com verbos impopulares.
    // Pode ser melhor que não mostrar nenhum verbo com essa letra, sendo que tem alguns
    // e uns são bem interessantes, como o 'wasapear' no espanhol.

  // Além disso, todos esses dos e whiles poderiam ser modularizados, com certezza.
  if (idioma === 'pt') {
    letras = letras_pt

    do {
      n_letra_aleatoria = Math.floor(Math.random() * letras.length)
      letra_aleatoria = letras[n_letra_aleatoria]
    } while (letra_aleatoria === 'k' || letra_aleatoria === 'x' || letra_aleatoria === 'y')
  }


  if (idioma === 'es') {
    letras = letras_es

    do {
      n_letra_aleatoria = Math.floor(Math.random() * letras.length)
      letra_aleatoria = letras[n_letra_aleatoria]
    } while (letra_aleatoria === 'f' || letra_aleatoria === 'ñ' || letra_aleatoria === 'w' || letra_aleatoria === 'x' || letra_aleatoria === 'y' || letra_aleatoria === 'z' )
  }

  if (idioma === 'it') {
    letras = letras_it

    do {
      n_letra_aleatoria = Math.floor(Math.random() * letras.length)
      letra_aleatoria = letras[n_letra_aleatoria]
    } while (letra_aleatoria === 'h' ||  letra_aleatoria === 'j' || letra_aleatoria === 'k' || letra_aleatoria === 'q' || letra_aleatoria === 'w' || letra_aleatoria === 'x' || letra_aleatoria === 'y')
  }

  if (idioma === 'fr') {
    letras = letras_fr

    do {
      n_letra_aleatoria = Math.floor(Math.random() * letras.length)
      letra_aleatoria = letras[n_letra_aleatoria]
    } while (letra_aleatoria === 'h' || letra_aleatoria === 'k' || letra_aleatoria === 'w' || letra_aleatoria === 'x' || letra_aleatoria === 'y' || letra_aleatoria === 'z')
  }

  if (idioma === 'en') {
    letras = letras_en

    do {
      n_letra_aleatoria = Math.floor(Math.random() * letras.length)
      letra_aleatoria = letras[n_letra_aleatoria]
    } while (letra_aleatoria === 'q' || letra_aleatoria === 'x' || letra_aleatoria === 'y' || letra_aleatoria === 'z')
  }


  const lista_verbos = await puxa_lista_palavras(`${idioma}`, `${letra_aleatoria}`)

  const n_verbo_aleatorio = Math.floor(Math.random() * lista_verbos.length)
  const verbo_aleatorio = lista_verbos[n_verbo_aleatorio]

  // alert(letra_aleatoria)
  buscar_verbo(`${idioma}`, `${verbo_aleatorio}`, aleatorio)
}

var verbo_infinitivo = ''
var verbo_gerundio = ''
var verbo_participio = ''

function confere_verbo (idioma) {

  // Aqui temos que desabilitar a edição dos inputs corretos.

  // Tem que abrir um popup com a conjugacao que foi feita.
  // Os verbos acertados, em verde. Os errados, em vermelho com a conjugação certa do lado.
  // Um tempo embaixo do outro, ou, quando der, pode ser do lado também.
  // Dá pra mostrar uma porcentagem também, ou não. Sei lár.

  // Temos aqui que fazer um lupão com o respostas_verbo e a partir dalí refazer o verbetes e corrigí-los e blablabla.
  const conjugacao = document.getElementById('checkbox_conjugacao').checked
  const complementos_auxs = document.getElementById('checkbox_complementos_auxs').checked

  const classe_conjugacao = (conjugacao) ? 'preenchimento_ativo' : 'preenchimento_inativo'
  const classe_complemento = (complementos_auxs) ? 'preenchimento_ativo' : 'preenchimento_inativo'

  let regras
  if (idioma === 'pt') regras = regras_pt
  if (idioma === 'es') regras = regras_es
  if (idioma === 'it') regras = regras_it
  if (idioma === 'fr') regras = regras_fr
  if (idioma === 'en') regras = regras_en

  let i_modo = 0 // Esse é o i dos modos da regra.
  let i_ordenacao // i da ordenação da regra
  let i_tempo // i do tempo dentro da ordenacao da regra

  let string_corretas = ''
  let string_usuario = ''
  let string_correcao = ''

  let divisao_dos_divs = `
    <div class="flex_row T1" style=""><span class="${classe_complemento}" style="margin-left: 10px">Complemento</span><span class="${classe_conjugacao}" style="margin-left: 10px">Conjugação</span></div>
    <div class="flex_row T1 center">
      <div id="recip_verbo_confere_usuario" class="flex_col T1" style="justify-content: flex-start;"></div>
      <div id="recip_verbo_confere_correcao" class="flex_col T1 sumido" style="justify-content: flex-start; max-width: 100px;"></div>
      <div id="recip_verbo_confere_correto" class="flex_col T1 sumido" style="justify-content: flex-start;"></div>
    </div>
  `

  document.getElementById('recip_popup_verbo_confere_dentro').innerHTML = divisao_dos_divs

  for (let i = 0; i < respostas_verbos.length; i++) {

    string_corretas += `<div class="flex_row T1" style="font-size: 27px; margin-top: 15px;">${respostas_verbos[i].modo_escrito}</div>`
    string_correcao += `<div class="flex_row T1" style="font-size: 27px; margin-top: 15px;">&emsp;</div>`

    string_usuario += `<div class="flex_row T1 center" style="font-size: 27px; margin-top: 15px; ">${respostas_verbos[i].modo_escrito}</div>`

    for (let j = 0; j < respostas_verbos[i].tempos.length; j++) {

      string_corretas += `<div class="flex_row T1" style="font-size: 22px; margin-top:10px; margin-bottom: 5px;">${respostas_verbos[i].tempos[j].tempo_escrito}</div>`

      string_correcao += `<div class="flex_row T1" style="font-size: 22px; margin-top:10px; margin-bottom: 5px;">&emsp;</div>`

      string_usuario += `<div class="flex_row T1" style="font-size: 22px; margin-top:10px; margin-bottom: 5px;">${respostas_verbos[i].tempos[j].tempo_escrito}</div>`

      for (let k = 0; k < respostas_verbos[i].tempos[j].pessoas.length; k++) {

        let linha_correcao = ''
        for (let l = 0; l < regras.modos.length; l++) {

          if (regras.modos[l].modo === respostas_verbos[i].modo_escrito) {

            for (let m = 0; m < regras.modos[l].ordenacao.length; m++) {

              for (let n = 0; n < regras.modos[l].ordenacao[m].tempos.length; n++) {
                if (regras.modos[l].ordenacao[m].tempos[n] === respostas_verbos[i].tempos[j].tempo_escrito) {

                  // Aqui achou o i da ordenação.

                  let str_valores_usuario = ''
                  let str_valores_correcao = ''
                  let str_valores_corretas = ''

                  let valor_correcao_complemento = (complementos_auxs === true) ? 'C' : '-'
                  let valor_correcao_conjugacao = (conjugacao === true) ? 'C' : '-'

                  let tem_complemento = 'nao'
                  for (let o = 0; o < regras.modos[l].ordenacao[m].elementos.length; o++) {

                    const elemento = regras.modos[l].ordenacao[m].elementos[o]

                    let valor_usuario = respostas_verbos[i].tempos[j].pessoas[k].respostas_usuario[elemento]
                    let valor_correto = respostas_verbos[i].tempos[j].pessoas[k].respostas_corretas[elemento]

                    if (conjugacao === true) {
                    if (elemento != 'pessoas' & elemento != 'verb_auxs') {
                        if (valor_usuario === valor_correto) valor_correcao_conjugacao = 'C'
                        if (valor_usuario != valor_correto) valor_correcao_conjugacao = 'X'
                      }
                    }

                    if (complementos_auxs === true) {
                      if (elemento != 'pessoas' & elemento != 'conjugado') {

                        if (valor_usuario != valor_correto) valor_correcao_complemento = 'X'
                      }
                    }

                    if (elemento != 'pessoas' & elemento != 'conjugado') tem_complemento = 'sim'
                    
                    // O if abaixo é só pq o usuário não está preenchendo o campo "pessoa",
                    // aí a respostas_usuario dessa parte vem em branco.
                    if (elemento === "pessoas") {
                      valor_usuario = respostas_verbos[i].tempos[j].pessoas[k].respostas_corretas[elemento]
                    }

                    let fundo_span = ''
                    let correcao = ''
                    let cor_letra = 'white'
                    if (valor_correto != valor_usuario) {
                      cor_letra = '#3b3b3b'
                      fundo_span = 'pink'
                      const barra = (valor_usuario != '') ? '/' : ''

                      if (valor_usuario === '') {
                        fundo_span = '#fcf5f5'
                      }

                      correcao = `${barra}<span style="font-size: 18px; font-style: italic;">${valor_correto}</span>`

                      if (elemento != 'pessoas') {

                        const iii = respostas_verbos[i].modo
                        const jjj = respostas_verbos[i].tempos[j].tempo

                        // Se o valor da vez for editável e estiver errado, apagamos o dito cujo.
                        if (document.getElementById(`modo_${iii}_tempo_${jjj}_pessoa_${k}_elm_${elemento}`)) {
                          document.getElementById(`modo_${iii}_tempo_${jjj}_pessoa_${k}_elm_${elemento}`).value = ''
                        }
                      }

                    }
                    if (valor_correto === valor_usuario) {
                      cor_letra = '#3b3b3b'

                      fundo_span = 'lightgreen'
                        
                      // Aqui precisa ignorar o elemento pessoas pq o sistema acredita que analiza a grafia das pessoas do verbo, mas como colocamos as pessoas hardwritten no código, não está analizando.
                      if (elemento != 'pessoas') {
                        // Aqui, tem que mudar o tempo e o modo, para considerar os tempos e modos que 
                        // não foram selecionados nesta rodada pelo usuário.
                        console.log(`desabilitaraá modo_${i}_tempo_${j}_pessoa_${k}_elm_${elemento}`)

                        const iii = respostas_verbos[i].modo
                        const jjj = respostas_verbos[i].tempos[j].tempo

                        console.log(`desabilitaraá modo_${iii}_tempo_${jjj}_pessoa_${k}_elm_${elemento}`)
                        document.getElementById(`modo_${iii}_tempo_${jjj}_pessoa_${k}_elm_${elemento}`).disabled = true

                        // Deixa cinza
                        document.getElementById(`modo_${iii}_tempo_${jjj}_pessoa_${k}_elm_${elemento}`).style.color = 'grey'
                      }
                      
                    }

                    if (elemento === 'pessoas') {
                      fundo_span = ''
                      cor_letra = 'grey'
                    }

                    str_valores_usuario += `<span style="margin-right: 2px; color: ${cor_letra}; background: ${fundo_span}; padding-left: 5px; padding-right: 5px; border-radius: 5px;">${valor_usuario}${correcao}</span>`

                    str_valores_corretas += `<span style="margin-right: 2px;">${valor_correto}</span>`
         
                  }

                  if (tem_complemento === 'nao') valor_correcao_complemento = '&emsp;'

                  string_usuario += `<div class="flex_row T1" style="font-size: 19px;">${str_valores_usuario}</div>`
                  string_corretas += `<div class="flex_row T1" style="font-size: 19px;">${str_valores_corretas}</div>`
                  string_correcao += `<div class="flex_row T1" style="font-size: 19px;">${valor_correcao_complemento}&emsp;${valor_correcao_conjugacao}</div>`


                }
              }
            }
          }
        }
      }
    }
  }

  document.getElementById('recip_verbo_confere_usuario').innerHTML = string_usuario
  document.getElementById('recip_verbo_confere_correcao').innerHTML = string_correcao
  document.getElementById('recip_verbo_confere_correto').innerHTML = string_corretas
  document.getElementById('recip_popup_verbo_confere').style.display = 'flex'

  popup_aberto = 'verbo_confere'
  document.body.style.overflow = 'hidden'
  
}

var respostas_verbos = []


function cria_var_verbo_confere (modos, i_modos_tempos, dados) {
  
  /*
  respostas_verbos = []

  for (let j = 0; j < modos.length; j++) {
    respostas_verbos.push({ modo: modos[j], tempos: []})
  }

  for (let j = 0; j < i_modos_tempos.length; j++) {

    let verbo_modo_vez = respostas_verbos.find((a) => { return a.modo === i_modos_tempos[j].modo })
    verbo_modo_vez.tempos.push({
      tempo: i_modos_tempos[j].tempo,
      pessoas: [
        // coloca cada uma das pessoas, com todas as informações corretas e o espaço para as info que o usuário responder.
      ]
    })
  }
  */
}

function reconhece_comandos_verbo (event, idioma, i, j, k, elemento, valor, input) {

  // Primeiramente, temos que finalizar de alterar o campo input no qual o usuário estava editando
  // quando apertou o ctrl+enter.

  // talvez aqui, se tiver um reconhecimento de ctrl+enter.
  if (event.key === 'Enter') {


        // Verifica se a tecla "Ctrl" também está pressionada
        if (event.ctrlKey || event.metaKey) { // event.metaKey para o caso de MacOS
            // Executar ação desejada aqui
            escreve_input_verbo(i, j, k, elemento, valor, input)
            confere_verbo(idioma)
        }
    }

}

function escreve_input_verbo (i_modo, i_tempo, i_pessoa, elemento, valor, input) {

 

  // Achamos o i_modo e o i_tempo no respostas_verbos.

  // Como não dá, ainda, para alterar o número de pessoas por tempo verbal,
  // sempre o i_pessoa terá um espacinho reservado na no respostas_verbos.

  for (let i = 0; i < respostas_verbos.length; i++) {
    if (respostas_verbos[i].modo === i_modo) {
      for (let j = 0; j < respostas_verbos[i].tempos.length; j++) {
        if (respostas_verbos[i].tempos[j].tempo === i_tempo) {
          // Hadouuuuken!!
          respostas_verbos[i].tempos[j].pessoas[i_pessoa].respostas_usuario[elemento] = valor.toLowerCase()
        }
      }
    }
  }
  
  // Transforma o que o usuario escreveu tudo em minúscula, bom para smartphone que teima em deixar a primeira letra sempre em maiúscula.
  input.value = input.value.toLowerCase()
}

function tabela_bela (arrays) {

  let html = '<div class="flex_row center T1" style="margin-top: 15px;">' // Abre a tabela.

  // Cada i será uma coluna.
  for (let i = 0; i < arrays.length; i++) {

    // Arredondamento de cantos das colunas.
    let canto_cima_coluna = ''
    let canto_baixo_coluna = ''

    if (i === 0) {
      canto_cima_coluna = 'tabela_top_left'
      canto_baixo_coluna = 'tabela_bottom_left'
    }

    if (i === arrays.length - 1) {
      canto_cima_coluna = 'tabela_top_right'
      canto_baixo_coluna = 'tabela_bottom_right'
    }

    // Abre a coluna.
    html += `<div class="recip_col_tabellinha ${canto_cima_coluna} ${canto_baixo_coluna}">`

    for (let j = 0; j < arrays[i].length; j++) {

      // Cores das células
      let classe_celula = 'tab_pessoa'
      if (j === 0) classe_celula = 'tabelinha_titulo'
      if (j != 0 & i != 0) classe_celula = 'tabelinha_celula_extr'

      // Arredondamento de arestas.
      let canto_cima_celula = ''
      let canto_baixo_celula = ''

      if (j === 0 & i === 0) canto_cima_celula = 'tabela_top_left'
      if (j === 0 & i === arrays.length - 1) canto_baixo_celula = 'tabela_top_right'
      if (j === arrays[i].length - 1 & i === 0) canto_baixo_celula = 'tabela_bottom_left'
      if (j === arrays[i].length - 1 & i === arrays.length - 1) canto_baixo_celula = 'tabela_bottom_right'

      // Forma a célula.
      html += `<div class="${classe_celula} ${canto_cima_celula} ${canto_baixo_celula}">${arrays[i][j]}</div>`
    }


    html += '</div>' // Fecha a coluna.
  }
  
  html += '</div>' // Fecha a tabela.

  return html
}

function info_tempo_verbal (idioma, modo, tempo) {

  let recip = document.getElementById('recip_popup_tempo_info')
  let recip_informacoes = document.getElementById('informacoes_tempo_verbal')


  document.body.style.overflow = 'hidden'

  document.getElementById('h2_modo').innerHTML = modo
  document.getElementById('h3_tempo').innerHTML = tempo

  if (idioma === 'en') {
    const coluna_1 = ['Pessoas', 'I', 'you', 'he/she/it', 'we', 'you', 'they']
    if (modo === 'indicative') {

      if (tempo === 'simple present') {

        const coluna_2 = ['Conjugation', '-', '-', '-s', '-', '-', '-']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de conjugações.</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'present continuous') {

        const coluna_2 = ['Conjugation', '-ing', '-ing', '-ing', '-ing', '-ing', '-ing']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'simple past') {

        const coluna_2 = ['Conjugation', '-ed', '-ed', '-ed', '-ed', '-ed', '-ed']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'past continuous') {

        const coluna_2 = ['Auxiliar', 'was', 'were', 'was', 'were', 'were', 'were']
        const coluna_3 = ['Sufixo', '-ed', '-ed', '-ed', '-ed', '-ed', '-ed']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'present perfect') {

        const coluna_2 = ['Auxiliar', 'have', 'have', 'has', 'have', 'have', 'have']
        const coluna_3 = ['Sufixo', '-ed', '-ed', '-ed', '-ed', '-ed', '-ed']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'present perfect continuous') {

        const coluna_2 = ['Auxiliar', 'have been', 'have been', 'has been', 'have been', 'have been', 'have been']
        const coluna_3 = ['Sufixo', '-ing', '-ing', '-ing', '-ing', '-ing', '-ing']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'past perfect') {

        const coluna_2 = ['Auxiliar', 'had', 'had', 'had', 'had', 'had', 'had']
        const coluna_3 = ['Sufixo', '-ed', '-ed', '-ed', '-ed', '-ed', '-ed']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'past perfect continuous') {

        const coluna_2 = ['Auxiliar', 'had been', 'had been', 'had been', 'had been', 'had been', 'had been']
        const coluna_3 = ['Sufixo', '-ing', '-ing', '-ing', '-ing', '-ing', '-ing']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'future') {

        const coluna_2 = ['Auxiliar', 'will', 'will', 'will', 'will', 'will', 'will']
        const coluna_3 = ['Sufixo', '-', '-', '-', '-', '-', '-']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'future continuous') {

        const coluna_2 = ['Auxiliar', 'will be', 'will be', 'will be', 'will be', 'will be', 'will be']
        const coluna_3 = ['Sufixo', '-ing', '-ing', '-ing', '-ing', '-ing', '-ing']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'future perfect') {

        const coluna_2 = ['Auxiliar', 'will have', 'will have', 'will have', 'will have', 'will have', 'will have']
        const coluna_3 = ['Sufixo', '-ed', '-ed', '-ed', '-ed', '-ed', '-ed']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }


      if (tempo === 'future perfect continuous') {

        const coluna_2 = ['Auxiliar', 'will have been', 'will have been', 'will have been', 'will have been', 'will have been', 'will have been']
        const coluna_3 = ['Sufixo', '-ing', '-ing', '-ing', '-ing', '-ing', '-ing']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de auxiliares e terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }



    }
  }

  if (idioma === 'it') {

    const coluna_1 = ['Pessoas', 'io', 'tu', 'lui/lei', 'noi', 'voi', 'loro']

    if (modo === 'indicativo') {

      if (tempo === 'presente') {

        const coluna_2 = ['1º coniugazione', '-o', '-i', '-a', '-iamo', '-ate', '-ano']
        const coluna_3 = ['2º coniugazione', '-o', '-i', '-e', '-iamo', '-ete', '-ono']
        const coluna_4 = ['3º coniugazione', '-o', '-i', '-e', '-iamo', '-ite', '-ono']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'passato prossimo') {

        const coluna_2 = ['Avere', 'ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno']
        const coluna_3 = ['Essere', 'sono', 'sei', 'è', 'siamo', 'siete', 'sono']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }


      if (tempo === 'imperfetto') {

        const coluna_2 = ['1º coniugazione', '-avo', '-avi', '-ava', '-avamo', '-avate', '-avano']
        const coluna_3 = ['2º coniugazione', '-evo', '-evi', '-eva', '-evamo', '-evate', '-evano']
        const coluna_4 = ['3º coniugazione', '-ivo', '-ivi', '-iva', '-ivamo', '-ivate', '-ivano']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'trapassato prossimo') {

        const coluna_2 = ['Avere', 'avevo', 'avevi', 'aveva', 'avevamo', 'avevate', 'avevano']
        const coluna_3 = ['Essere', 'ero', 'eri', 'era', 'eravamo', 'eravate', 'erano']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }


      if (tempo === 'passato remoto') {

        const coluna_2 = ['1º coniugazione', '-ai', '-asti', '-ò', '-ammo', '-aste', '-arono']
        const coluna_3 = ['2º coniugazione', '-etti', '-esti', '-ette', '-emmo', '-este', '-erono']
        const coluna_4 = ['3º coniugazione', '-ii', '-iisti', '-i', '-immo', '-iste', '-irono']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'trapassato remoto') {

        const coluna_2 = ['Avere', 'ebbi', 'avesti', 'ebbe', 'avemmo', 'aveste', 'ebbero']
        const coluna_3 = ['Essere', 'fui', 'fosti', 'fu', 'fummo', 'foste', 'furono']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }


      if (tempo === 'futuro semplice') {

        const coluna_2 = ['1º coniugazione', '-erò', '-erai', '-erà', '-eremo', '-erete', '-eranno']
        const coluna_3 = ['2º coniugazione', '-erò', '-erai', '-erà', '-eremo', '-erete', '-eranno']
        const coluna_4 = ['3º coniugazione', '-irò', '-irai', '-irà', '-iremo', '-irete', '-iranno']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'Futuro anteriore') {

        const coluna_2 = ['Avere', 'avrò', 'avrai', 'avrà', 'avremo', 'avrete', 'avranno']
        const coluna_3 = ['Essere', 'sarò', 'sarai', 'sarà', 'saremo', 'sarete', 'saranno']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }
    }

    if (modo === 'congiuntivo') {
      
      if (tempo === 'presente') {

        const coluna_2 = ['1º coniugazione', '-i', '-i', '-i', '-iamo', '-iate', '-ino']
        const coluna_3 = ['2º coniugazione', '-a', '-a', '-a', '-iamo', '-iate', '-ano']
        const coluna_4 = ['3º coniugazione', '-a', '-a', '-a', '-iamo', '-iate', '-ano']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'passato') {

        const coluna_2 = ['Avere', 'abbia', 'abbia', 'abbia', 'abbiamo', 'abbiate', 'abbiano']
        const coluna_3 = ['Essere', 'sia', 'sia', 'sia', 'siamo', 'siate', 'siano']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }

      if (tempo === 'imperfetto') {

        const coluna_2 = ['1º coniugazione', '-assi', '-assi', '-asse', '-assimo', '-aste', '-assero']
        const coluna_3 = ['2º coniugazione', '-essi', '-essi', '-esse', '-essimo', '-este', '-essero']
        const coluna_4 = ['3º coniugazione', '-isso', '-issi', '-isse', '-issimo', '-iste', '-issero']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'trapassato') {

        const coluna_2 = ['Avere', 'avessi', 'avessi', 'avesse', 'avessimo', 'aveste', 'avessero']
        const coluna_3 = ['Essere', 'fossi', 'fossi', 'fosse', 'fossimo', 'foste', 'fossero']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }



    }

    if (modo === 'condizionale') {
      
      if (tempo === 'presente') {

        const coluna_2 = ['1º coniugazione', '-erei', '-eresti', '-erebbe', '-eremmo', '-ereste', '-erebbero']
        const coluna_3 = ['2º coniugazione', '-erei', '-eresti', '-erebbe', '-eremmo', '-ereste', '-erebbero']
        const coluna_4 = ['3º coniugazione', '-irei', '-iresti', '-irebbe', '-iremmo', '-ireste', '-irebbero']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'passato') {

        const coluna_2 = ['Avere', 'avrei', 'avresti', 'avrebbe', 'avremmo', 'avreste', 'avrebbero']
        const coluna_3 = ['Essere', 'sarei', 'saresti', 'sarebbe', 'saremmo', 'sareste', 'sarebbero']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos em verbos auxiliares.</span>'
        recip_informacoes.innerHTML += complementos
      }

    }

    if (modo === 'imperativo') {
      
      if (tempo === 'imperativo') {

        const coluna__imperativo = ['Pessoas', 'tu', 'voi']

        const coluna_2 = ['1º coniugazione', '-a', '-ate']
        const coluna_3 = ['2º coniugazione', '-i', '-ete']
        const coluna_4 = ['3º coniugazione', '-i', '-ite']

        const tabela_terminacoes = tabela_bela([coluna__imperativo, coluna_2, coluna_3, coluna_4])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }
    }
  }

  if (idioma === 'fr') {
    
    const coluna_1 = ['Pessoas', 'je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles']

    if (modo === 'indicatif') {

      // No francês, a coluna um sempre será igual.
      if (tempo === 'présent') {

        const coluna_2 = ['1º grupo', '-e', '-es', '-e', '-ons', '-ez', '-ent']
        const coluna_3 = ['2º grupo', '-s', '-s', '-t', '-ons', '-ez', '-ent']
        
        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
        
      }

      if (tempo === 'passé composé') {

        const coluna_2 = ['Auxiliar', 'ai', 'as', 'a', 'avons', 'avez', 'ont']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos

      }

      if (tempo === 'imparfait') {

        const coluna_2 = ['1º grupo', '-ais', '-ais', '-ait', '-ions', '-iez', '-aient']
        const coluna_3 = ['2º grupo', '-issais', '-issais', '-issait', '-issaions', '-issiez', '-issaient']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'plus-que-parfait') {

        const coluna_2 = ['Auxiliar', 'avais', 'avais', 'avait', 'avions', 'aviez', 'avaient']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos
      }

      if (tempo === 'passé simple') {

        const coluna_2 = ['1º grupo', '-ai', '-as', '-a', '-âmes', '-âtes', '-èrent']
        const coluna_3 = ['2º grupo', '-is', '-is', '-it', '-îmes', '-îtes', '-irent']

        const complementos = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += complementos
      }

      if (tempo === 'passé antérieur') {

        const coluna_2 = ['Auxiliar', 'eus', 'eus', 'eut', 'eûmes', 'eûtes', 'eurent']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos
      }

      if (tempo === 'futur simple') {

        const coluna_2 = ['1º grupo', '-erais', '-eras', '-era', '-erons', '-erez', '-eront']
        const coluna_3 = ['2º grupo', '-irai', '-iras', '-ira', '-irons', '-irez', '-iront']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'futur antérieur') {

        const coluna_2 = ['Auxiliar', 'aurais', 'auras', 'aura', 'aurons', 'aurez', 'auront']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos
      }

    }

    if (modo === 'subjonctif') {
      if (tempo == 'présent') {

        const coluna_2 = ['1º grupo', '-e', '-es', '-e', '-ions', '-iez', '-ent']
        const coluna_3 = ['2º grupo', '-isse', '-isses', '-isse', '-issions', '-issiez', '-issent']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'passé') {

        const coluna_2 = ['Auxiliar', 'aie', 'aies', 'ait', 'ayons', 'ayez', 'aient']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos
      }

      if (tempo === 'imparfait') {

        const coluna_2 = ['1º grupo', '-asse', '-asses', '-ât', '-assions', '-assiez', '-assent']
        const coluna_3 = ['2º grupo', '-isse', '-isses', '-ît', '-issions', '-issiez', '-issent']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'plus-que-parfait') {

        const coluna_2 = ['Auxiliar', 'eusse', 'eusses', 'eût', 'eussions', 'eussiez', 'eussent']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos
      }
    }

    if (modo === 'conditionnel') {

      if (tempo === 'présent') {

        const coluna_2 = ['1º grupo', '-erais', '-erais', '-erait', '-erions', '-eriez', '-eraient']
        const coluna_3 = ['2º grupo', '-irais', '-irais', '-irait', '-irions', '-iriez', '-iraient']

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }

      if (tempo === 'passé 1ère forme') {

        const coluna_2 = ['Auxiliar', 'aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient']

        const complementos = tabela_bela([coluna_1, coluna_2])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de complementos.</span>'
        recip_informacoes.innerHTML += complementos
      }
    }

    if (modo === 'impératif') {
      if (tempo === 'présent') {

        const coluna_1_imperatif = ['Pessoas', 'tu', 'nous', 'vous']
        const coluna_2 = ['1º grupo', '-e', '-ons', '-ez']
        const coluna_3 = ['2º grupo', '-is', '-issons', '-issez']

        const tabela_terminacoes = tabela_bela([coluna_1_imperatif, coluna_2, coluna_3])

        recip_informacoes.innerHTML = '<span class="paragrafo">Tabelas de terminações (sufixos).</span>'
        recip_informacoes.innerHTML += tabela_terminacoes
      }
    }
  }

  if (idioma === 'pt') {
    if (modo === 'indicativo') {
      if (tempo === 'presente') {
        recip_informacoes.innerHTML = "Trata-se de uma ação que ocorre no momento da comunicação.<br>Por exemplo, o verbo <b>cantar</b>:<br>EU - canto<br>TÚ - cantas<br>ELE/ELA - cantas<br>NÓS - cantamos<br>VÓS - cantas<br>ELES/ELAS - cantam<br>"
      }
      if (tempo === 'pretérito imperfeito') {
        recip_informacoes.innerHTML = "Ação que ocorria frequentemente no passado e que não foi finalizada por completo.<br>Por exemplo, o verbo <b>cantar</b>:<br>EU - cantava<br>TÚ - cantavas<br>ELE/ELA - cantava<br>NÓS - cantavamos<br>VÓS - cantáveis<br>ELES/ELAS - cantavam<br>"
      }
      if (tempo === 'pretérito perfeito') {
        recip_informacoes.innerHTML = "Ação que ocorreu no passado e, diferente do pretérito <strong>imperfeito</strong>, esta foi sim completamente finalizada.<br>Por exemplo, o verbo <b>cantar</b>:<br>EU - cantei<br>TÚ - cantaste<br>ELE/ELA - cantou<br>NÓS - cantamos<br>VÓS - cantastes<br>ELES/ELAS - cantaram<br>"
      }
      if (tempo === 'pretérito mais-que-perfeito') {
        recip_informacoes.innerHTML = "Geralmente utilizado em textos literários, o pretérito mais-que-perfeito sugere uma ação que ocorreu antes de uma outra ação.<br>Umas frases de exemplo:<br>Quando pintei a parede, a tinta azul já acabara.<br>Quando chutei a bola, o goleiro já pulara, então foi gol.<br><br>Conjugação: <b>cantar</b>:<br>EU - cantara<br>TÚ - cantaras<br>ELE/ELA - cantara<br>NÓS - cantáramos<br>VÓS - cantáreis<br>ELES/ELAS - cantaram<br>"
      }
      if (tempo === 'futuro do presente') {
        recip_informacoes.innerHTML = "Aqui temos uma ação que vai sim, se realizar.<br><br>Conjugação: <b>cantar</b>:<br>EU - cantarei<br>TÚ - cantarás<br>ELE/ELA - cantará<br>NÓS - cantaremos<br>VÓS - cantareis<br>ELES/ELAS - cantarão<br>"
      }
      if (tempo === 'futuro do pretérito') {
        recip_informacoes.innerHTML = "O futuro do pretérito indica algo que pode acontecer, após alguma outra ação. Geralmente é algo que <b>ia</b> acontecer <b>se</b> não fosse alguma outra circunstância.<br><br>Conjugação: Eu<br><br>Conjugação: <b>cantar</b>:<br>EU - cantaria<br>TÚ - cantarias<br>ELE/ELA - cantaria<br>NÓS - cantaríamos<br>VÓS - cantaríeis<br>ELES/ELAS - cantariam<br>"
      }  
    }

    if (modo === 'subjuntivo') {
      if (tempo === 'presente') {
        recip_informacoes.innerHTML = "Indica algo que pode ou não acontecer, uma incerteza.<br>Conjugação: <b>cantar</b>:<br>QUE EU - cante<br>QUE TÚ - cantes<br>QUE ELE/ELA - cante<br>QUE NÓS - cantemos<br>QUE VÓS - canteis<br>QUE ELES/ELAS - cantem<br>"
      }  
      if (tempo === 'pretérito imperfeito') {
        recip_informacoes.innerHTML = "Indica algo que poderia ter acontecido se uma outra ação também tivesse ocorrido. <br>Conjugação: <b>cantar</b>:<br>SE EU - cantasse<br>SE TÚ - cantasses<br>SE ELE/ELA - cantasse<br>SE NÓS - cantássemos<br>SE VÓS - cantásseis<br>SE ELES/ELAS - cantassem<br>"
      }  
      if (tempo === 'futuro') {
        recip_informacoes.innerHTML = "Indica algo que vai acontecer mas depende de uma outra ação. <br>Conjugação: <b>cantar</b>:<br>QUANDO EU - cantar<br>QUANDO TÚ - cantares<br>QUANDO ELE/ELA - cantar<br>QUANDO NÓS - cantarmos<br>QUANDO VÓS - cantardes<br>QUANDO ELES/ELAS - cantarem<br>"
      }
    }

    if (modo === 'imperativo') {
      if (tempo === 'afirmativo') {
        recip_informacoes.innerHTML = "Indica uma ordem, positivamente. Não conta com a primeira pessoa do singular pois ninguém dá uma ordem à si mesmo e a terceira pessoa, ao invés de ele/ela e eles/elas vira você e vocês, respectivamente.<br>Conjugação: <b>cantar</b>:<br>canta - TU<br>cante - VOCÊ<br>cantemos - NÓS<br>cantai - VÓS<br>cantem - VOCÊS<br>"
      }  
      if (tempo === 'negativo') {
        recip_informacoes.innerHTML = "Indica uma ordem, negativamente. Como no tempo afirmativo, também não conta com a primeira pessoa do singular e também temos você e vocês como terceiras pessoas do singular e plural, respectivamente.<br>Conjugação: <b>cantar</b>:<br>NÃO cantes - TU<br>NÃO cantes - VOCÊ<br>NÃO cantemos - NÓS<br>NÃO canteis - VÓS<br>NÃO cantem - VOCÊS<br>"
      }  
    }


  }
 

  recip.style.display = 'flex'

}

 function abre_pdf_guia_verbos (idioma_sem_acento) {

    if (idioma_sem_acento === 'frances') window.open(`https://drive.google.com/file/d/1HVqXZEI8tzhbTufMDk9lAp1rRAfVm1tB/view?usp=sharing`,'_blank');
    if (idioma_sem_acento === 'italiano') window.open(`https://drive.google.com/file/d/1qU1vYUtpuz0fndgbrLdpdeaUNVZdYR9F/view?usp=sharing`,'_blank');

  }

// Dá pra melhorar muito esse código aqui abaixo, mâs...
async function buscar_verbo (idioma, palavra, aleatorio) {

  // busca no bánco.
  const obj_vai = {
    idioma: idioma,
    verbo_inf: palavra
  }

  const dados = await vai_filhao_2('buscar_verbo', JSON.stringify(obj_vai))

  if (dados === null) {
    document.getElementById('recip_componente').innerHTML = "<span style='margin-top: 25px;'>Não achou nada.</span>"


    let startinho = document.getElementById('start_verbos')
    startinho.onClick = ''
    troca_classe(startinho, 'bot_start_ativo', 'bot_start_inativo')

    return
  }

  // Deixa o botão start ativo
  let startinho = document.getElementById('start_verbos')
  startinho.onClick = 'monta_decoreba_verbo();'
  troca_classe(startinho, 'bot_start_inativo', 'bot_start_ativo')

  let regras
  let idioma_sem_acento = ''
  if (idioma === 'pt') {
    regras = regras_pt
    idioma_sem_acento = 'portugues'
  }
  if (idioma === 'es') {
    regras = regras_es
    idioma_sem_acento = 'espanhol'
  }
  if (idioma === 'it') {
    regras = regras_it
    idioma_sem_acento = 'italiano'
  }
  if (idioma === 'fr') {
    regras = regras_fr
    idioma_sem_acento = 'frances'
  }
  if (idioma === 'en') {
    regras = regras_en
    idioma_sem_acento = 'ingles'
  }

 

  if (dados.infinitivo) {

    respostas_verbos = [] // var gloval

    let cartao = ''
    cartao += `
      <div id="botao_guia_con_verbal" class="flex_row center botao" onclick="abre_pdf_guia_verbos('${idioma_sem_acento}')" style="margin-top: 15px; background: var(--background_site); color: var(--color_site); font-size: 20pt;">
        <span style="font-size: 16pt; margin-right: 10px;">Guia de Conjugação Verbal</span> <i class="icon-print"></i>
      </div>

      <div class="flex_row center botao" style="background: var(--background_site); color: var(--color_site); font-size: 20pt;" onclick="manda_pro_vai_filhao('${idioma}', '${dados.infinitivo}', 'gera_pdf_verbo')">
        <span style="font-size: 16pt; margin-right: 10px;">Verbo ${dados.infinitivo}</span> <i class="icon-print"></i>
      </div>

    

      <div class="flex_row T1 center" style="margin-top: 35px; margin-bottom: 10px; font-size: 53px;">
        ${dados.infinitivo}
      </div>

      <div class="flex_row T1 center" style="font-size: 30px; margin-top: -15px; font-style: italic; color: green;">
        ${dados.traducao_pt}
      </div>

    `

    // Esses três aqui, usam variáveis globais que não deveriam existir.
    // Cedo ou tarde é de bom tom eliminá-las e deixar tudo mais funcional. Mas por enquanto tá quebrando um galhão.
    verbo_infinitivo = dados.infinitivo
    verbo_gerundio = dados.gerundio
    verbo_participio = dados.participio

    // const pessoas = (document.getElementById('checkbox_pessoas').checked) ? 'input' : 'span'
    const pessoas = (verbo_checkboxes.pessoas === 'sim') ? 'input' : 'span'

    // const conjugacao = (document.getElementById('checkbox_conjugacao').checked) ? 'input' : 'span'
    const conjugacao = (verbo_checkboxes.conjugacao === 'sim') ? 'input' : 'span'

    // const complementos_auxs = (document.getElementById('checkbox_complementos_auxs').checked) ? 'input' : 'span'
    const complementos_auxs = (verbo_checkboxes.complementos_auxs === 'sim') ? 'input' : 'span'

    // Aqui verificamos quais os tempos selecionados.
    let checkboxes_tempos = document.getElementsByClassName(`checkbox_${idioma} checkbox_tempo`)
    let checkboxes_modos = document.getElementsByClassName(`checkbox_${idioma} checkbox_modo`)

    let i_modos_ativos = []
    let i_modos_tempos = []

    // Se tiver esse argumento aleatório, é pq o camarada quiz uma conjugação aleatória, dentre todas.
    if (aleatorio) {

      // document.getElementById('checkbox_completa_tudo').checked = false
      verbo_checkboxes.completa_tudo = 'nao'

      for (let i = 0; i < verbo_checkboxes.modos.length; i++) {
        // checkboxes_modos[i].checked = false
        verbo_checkboxes.modos[i].completa_modo = 'nao'
        for (let j = 0; j < verbo_checkboxes.modos[i].tempos; j++) {
          // checkboxes_tempos[i].checked = false
          verbo_checkboxes.modos[i].tempos[j].selecionado = 'nao'
          // i_modos_tempos.push({modo: i, tempo: j})
        }
      }
      
      let i_aleatorio = Math.floor(Math.random() * checkboxes_tempos.length)
      checkboxes_tempos[i_aleatorio].checked = true
    }


    for (let i = 0; i < verbo_checkboxes.modos.length; i++) {
      i_modos_ativos.push(i)
      for (let j = 0; j < verbo_checkboxes.modos[i].tempos.length; j++) {
        console.log(verbo_checkboxes.modos[i].tempos[j])
        if (verbo_checkboxes.modos[i].tempos[j].selecionado === 'sim') i_modos_tempos.push({modo: i, tempo: j})
      }
    }

    /*
    for (let i = 0; i < checkboxes_tempos.length; i++) {
      if (checkboxes_tempos[i].checked === true) {

        // Funciona, não me julgue.
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_0")) i_modos_ativos.push(0)
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_1")) i_modos_ativos.push(1)
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_2")) i_modos_ativos.push(2)
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_3")) i_modos_ativos.push(3)
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_4")) i_modos_ativos.push(4)
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_5")) i_modos_ativos.push(5)
        if (checkboxes_tempos[i].classList.contains("checkbox_do_modo_6")) i_modos_ativos.push(6)

        let tempo_checkbox = 0
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_0")) tempo_checkbox = 0
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_1")) tempo_checkbox = 1
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_2")) tempo_checkbox = 2
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_3")) tempo_checkbox = 3
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_4")) tempo_checkbox = 4
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_5")) tempo_checkbox = 5
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_6")) tempo_checkbox = 6
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_7")) tempo_checkbox = 7
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_8")) tempo_checkbox = 8
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_9")) tempo_checkbox = 9
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_10")) tempo_checkbox = 10
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_11")) tempo_checkbox = 11
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_12")) tempo_checkbox = 12
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_13")) tempo_checkbox = 13
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_14")) tempo_checkbox = 14
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_15")) tempo_checkbox = 15
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_16")) tempo_checkbox = 16
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_17")) tempo_checkbox = 17
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_18")) tempo_checkbox = 18
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_19")) tempo_checkbox = 19
        if (checkboxes_tempos[i].classList.contains("checkbox_do_tempo_20")) tempo_checkbox = 20

        i_modos_tempos.push({modo: i_modos_ativos[i_modos_ativos.length - 1], tempo: tempo_checkbox})
      }
    }
    */

    console.log(i_modos_tempos)
    /*
    i_modos_tempos = [
      {modo: 0, tempo: 0},
      {modo: 0, tempo: 1},
      {modo: 1, tempo: 0} // ...
    ]
    */

    i_modos_ativos = [... new Set(i_modos_ativos.sort())]

    // Essa aqui é uma maneira mais organizada de se criar o respostas_verbo
    // Mas por enquanto, vai ser criado nesse codigozão junto aqui msm.
    // cria_var_verbo_confere(JSON.stringify(i_modos_ativos), JSON.stringify(i_modos_tempos), JSON.stringify(dados))

    // Dai tem que pegar a qtd de modos no idioma
    // Depois ver em quais modos tem tempos ativos

    const primeira_letra = dados.infinitivo[0]

    // console.log(`dados.modos.length: ${dados.modos.length} // i_modos_ativos.length: ${i_modos_ativos.length}`)
    for (let i = 0; i < dados.modos.length; i++) {

      let achou_o_modo = 'nao'
      for (let h = 0; h < i_modos_ativos.length; h++) {
        // console.log(`i: ${i} // i_modos_ativos[h]: ${i_modos_ativos[h]}`)
        if (i === i_modos_ativos[h]) achou_o_modo = 'sim'
      }

      let string_conjugados = ''
      let dados_modo = dados.modos[i].modo

      if (achou_o_modo === 'sim') {
        cartao += `<div class="flex_row T1 center" style="margin-top: 50px; margin-bottom: 20px; font-size: 33px;">${dados.modos[i].modo}</div>`

        // Primeira mexida no respostas_verbos. Adicionamos o modo.
        respostas_verbos.push({ modo: i, modo_escrito: dados.modos[i].modo, tempos: []}) 
        // console.table(respostas_verbos)
      


      for (let j = 0; j < dados.modos[i].tempos.length; j++) {

        // GAMBIARRA!
        // aqui, o achou_o_tempo é nao, mas como estamos mostrando todos os tempos no momento, fica sim.
        // No espanhol, quando colocamos não aqui, alguns tempos ficam sem mostrar. Não sei ainda o pq.
        let achou_o_tempo = 'nao'

        for (let k = 0; k < i_modos_tempos.length; k++) {
          if (i_modos_tempos[k].modo === i & i_modos_tempos[k].tempo === j) achou_o_tempo = 'sim'
        }

        string_conjugados = ''

        const dados_tempo = dados.modos[i].tempos[j].tempo

        if (achou_o_tempo === 'sim') {


          let exemplo = ''
          for (let k = 0; k < regras.modos.length; k++) {
            if (regras.modos[k].modo === dados.modos[i].modo) {
              for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
                for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
                  if (regras.modos[k].ordenacao[l].tempos[m] === dados.modos[i].tempos[j].tempo) {
                    if (regras.modos[k].ordenacao[l].exemplos) {
                      if (regras.modos[k].ordenacao[l].exemplos[m]) {
                        exemplo = regras.modos[k].ordenacao[l].exemplos[m] // Hadouuuken!!
                      }
                    }
                  }
                }
              }
            }
          }

          cartao += `
            <div class="flex_col center recip_verbo fundo_prancheta" style="padding: 10px; border-radius: 10px;">
              <div class="flex_row center T1 botao_tempo_verbal" onclick="info_tempo_verbal('${idioma}', '${dados.modos[i].modo}','${dados.modos[i].tempos[j].tempo}')">${dados.modos[i].tempos[j].tempo}</div>
              <div>
                <div class="flex_row T1 center div_exemplo_verbo">${exemplo}</div>
              </div>`

          // Segunda mexida no respostas_verbos. Adicionamos o tempo e o espaço para as pessoas.
          respostas_verbos[respostas_verbos.length - 1].tempos.push({ tempo: j, tempo_escrito: `${dados.modos[i].tempos[j].tempo}`, pessoas: [] })
        }
            
        let encontrou = 'nao'

        let i_modo = 0 // Esse é o i dos modos da regra.
        let i_ordenacao // i da ordenação da regra
        let i_tempo // i do tempo dentro da ordenacao da regra


        for (let k = 0; k < regras.modos.length; k++) {

          if (regras.modos[k].modo === dados.modos[i].modo) {
            i_modo = k
                
            for (let l = 0; l < regras.modos[k].ordenacao.length; l++) {
              for (let m = 0; m < regras.modos[k].ordenacao[l].tempos.length; m++) {
                if (dados_tempo === regras.modos[k].ordenacao[l].tempos[m] & encontrou === 'nao') {
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
          if (achou_o_modo === 'sim' & achou_o_tempo === 'sim') {

            let obj_resps_usuario = {}
            let obj_resps_corretas = {}

            for (let l = 0; l < regras.modos[i_modo].ordenacao[i_ordenacao].elementos.length; l++) {
              
              const elemento = regras.modos[i_modo].ordenacao[i_ordenacao].elementos[l]

              obj_resps_usuario[`${elemento}`] = ''
              obj_resps_corretas[`${elemento}`] = ''
            }

            let objetao = {
              respostas_usuario: obj_resps_usuario,
              respostas_corretas: obj_resps_corretas
            }

            const ultimo_modo = Number(respostas_verbos.length - 1)
            const ultimo_tempo = Number(respostas_verbos[ultimo_modo].tempos.length - 1)

            // Tudo essa parada de cima nesse if serve pra essa linha. Gravar este objetão no lugar certo,
            // esta é a terceira mexida no respostas_verbos.
            respostas_verbos[ultimo_modo].tempos[ultimo_tempo].pessoas.push(objetao)
          }
  
          // Ordena os elementos
          let elemento_1 = ''
          let elemento_2 = ''
          let elemento_3 = ''
          let elemento_4 = ''

          const conjugacao_tem = (verbo_checkboxes.conjugacao === 'sim') ? true : false
          const complementos_auxs_tem = (verbo_checkboxes.complementos_auxs === 'sim') ? true : false
            
          // const conjugacao_tem = document.getElementById('checkbox_conjugacao').checked
          // const complementos_auxs_tem = document.getElementById('checkbox_complementos_auxs').checked

          for (let l = 0; l < regras.modos[i_modo].ordenacao[i_ordenacao].elementos.length; l++) {

            const elemento = regras.modos[i_modo].ordenacao[i_ordenacao].elementos[l]
            const ordenacao = regras.modos[i_modo].ordenacao[i_ordenacao]

            let valor = ''
            let valor_pessoa = ''
            

            let style_span = ''

            if (conjugacao_tem === true || complementos_auxs_tem === true) {
              style_span = 'margin-right: 0px;'
            }

            if (elemento === 'conjugado') {

              valor = dados.modos[i].tempos[j].conjugacoes[k]

              const str_input = `<input id="modo_${i}_tempo_${j}_pessoa_${k}_elm_${elemento}" type="text" class="input_texto_verbo elm_${elemento}" onkeydown="reconhece_comandos_verbo(event, '${idioma}', ${i}, ${j}, ${k}, '${elemento}', this.value, this)" onchange="escreve_input_verbo(${i}, ${j}, ${k}, '${elemento}', this.value, this)"></input>`

              const str_span = `<div style="${style_span}">${valor}</div>`

              if (l == 0) elemento_1 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 1) elemento_2 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 2) elemento_3 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 3) elemento_4 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`            

            } else if (elemento === 'infinitivo') {
              valor = dados.infinitivo
              const str_input = `<input id="modo_${i}_tempo_${j}_pessoa_${k}_elm_${elemento}" type="text" class="input_texto_verbo" onkeydown="reconhece_comandos_verbo(event, '${idioma}', ${i}, ${j}, ${k}, '${elemento}', this.value, this)" onchange="escreve_input_verbo(${i}, ${j}, ${k}, '${elemento}', this.value, this)"></input>`
              const str_span = `<div style="${style_span}">${valor}</div>`

              if (l == 0) elemento_1 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 1) elemento_2 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 2) elemento_3 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 3) elemento_4 = (conjugacao === 'input') ? `${str_input}` : `${str_span}` 

            } else if (elemento === 'gerundio') {
              valor = dados.gerundio
              const str_input = `<input id="modo_${i}_tempo_${j}_pessoa_${k}_elm_${elemento}" type="text" class="input_texto_verbo" onkeydown="reconhece_comandos_verbo(event, '${idioma}', ${i}, ${j}, ${k}, '${elemento}', this.value, this)" onchange="escreve_input_verbo(${i}, ${j}, ${k}, '${elemento}', this.value, this)"></input>`
              const str_span = `<div style="${style_span}">${valor}</div>`

              if (l == 0) elemento_1 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 1) elemento_2 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 2) elemento_3 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 3) elemento_4 = (conjugacao === 'input') ? `${str_input}` : `${str_span}` 

            } else if (elemento === 'participio') {
              valor = dados.participio
              const str_input = `<input type="text" id="modo_${i}_tempo_${j}_pessoa_${k}_elm_${elemento}" class="input_texto_verbo" onkeydown="reconhece_comandos_verbo(event, '${idioma}', ${i}, ${j}, ${k}, '${elemento}', this.value, this)" onchange="escreve_input_verbo(${i}, ${j}, ${k}, '${elemento}', this.value, this)"></input>`
              const str_span = `<div style="${style_span}">${valor}</div>`

              if (l == 0) elemento_1 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 1) elemento_2 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 2) elemento_3 = (conjugacao === 'input') ? `${str_input}` : `${str_span}`
              if (l == 3) elemento_4 = (conjugacao === 'input') ? `${str_input}` : `${str_span}` 

            } else if ( elemento === 'pessoas') {

              let complemento_pessoa = '' // geralmente é um "que"

              if (idioma === 'fr' & i_modo === 1) complemento_pessoa = 'que '

              // O valor quando é 'pessoas' no elemento, ele vai com tags html.
              // Não queremos guardar estas tags na respostas_verbos pois nós é organizado.
              valor = `<div style="color: grey; ${style_span}">${complemento_pessoa}${regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k]}</div>`
              
              valor_pessoa = regras.modos[i_modo].ordenacao[i_ordenacao].pessoas[k]

              if (l == 0) elemento_1 = valor
              if (l == 1) elemento_2 = valor
              if (l == 2) elemento_3 = valor
              if (l == 3) elemento_4 = valor
                
            } else  {

              valor = (elemento.length > 1) ? ordenacao[elemento][k] : ordenacao[elemento][0]
              const str_input = `<input type="text" id="modo_${i}_tempo_${j}_pessoa_${k}_elm_${elemento}" class="input_texto_verbo" onkeydown="reconhece_comandos_verbo(event, '${idioma}', ${i}, ${j}, ${k}, '${elemento}', this.value, this)" onchange="escreve_input_verbo(${i}, ${j}, ${k}, '${elemento}', this.value, this)"></input>`
              const str_span = `<div style="color: green; ${style_span}">${valor}</div>`

              if (l == 0) elemento_1 = (complementos_auxs === 'input') ? `${str_input}` : `${str_span}`
              if (l == 1) elemento_2 = (complementos_auxs === 'input') ? `${str_input}` : `${str_span}`
              if (l == 2) elemento_3 = (complementos_auxs === 'input') ? `${str_input}` : `${str_span}`
              if (l == 3) elemento_4 = (complementos_auxs === 'input') ? `${str_input}` : `${str_span}`


              if (idioma === 'fr') {
                if (dados.modos[i].tempos[j].tempo === 'présent' || dados.modos[i].tempos[j].tempo === 'imparfait' || dados.modos[i].tempos[j].tempo === 'passé composé' || dados.modos[i].tempos[j].tempo === 'plus-que-parfait' || dados.modos[i].tempos[j].tempo === 'passé antérieur' || dados.modos[i].tempos[j].tempo === 'futur antérieur' || dados.modos[i].tempos[j].tempo === 'passé' || dados.modos[i].tempos[j].tempo === 'passé 1ère forme') {

                  if (k === 0) {
                    if (valor[0] === 'a' || valor[0] === 'e') {

                      // respostas_verbos.push({ modo: i, modo_escrito: dados.modos[i].modo, tempos: []}) 

                      const ultimo_modo = respostas_verbos.length - 1
                      const ultimo_tempo = respostas_verbos[ultimo_modo].tempos.length - 1

                      // O valor pessoa é diferentão.
                      const valor_a_inserir = (elemento === 'pessoas') ? valor_pessoa : valor 

                      // Esse ultimo_tempo != -1 aqui é para evitar um erro que dá no francês
                      // quando se escolhe apenas alguns tempos verbais.
                      // Não sei bem o pq mas funciona lindamente.
                      if (ultimo_tempo != -1) {
                        respostas_verbos[ultimo_modo].tempos[ultimo_tempo].pessoas[k].respostas_corretas['pessoas'] = 'j&#39;'
                      }


                      let complemento_pessoa = '' // geralmente é um "que"

                      if (i_modo === 1) complemento_pessoa = 'que '

                      // Quarta e última mexida no respostas_verbos.
                      // Colocamos a resposta correta para futura comparação com a resposta do usuário.
                      elemento_1 = `<div style="color: grey; margin-right: -5px; ${style_span}">${complemento_pessoa}j'</div>`
                    }
                  }
                }
              }
            }

            // If exclusivo para a quarta e última modificação no respostas_verbos.
            if (achou_o_tempo === 'sim' & achou_o_modo === 'sim') {

              const ultimo_modo = respostas_verbos.length - 1
              const ultimo_tempo = respostas_verbos[ultimo_modo].tempos.length - 1

              // O valor pessoa é diferentão.
              const valor_a_inserir = (elemento === 'pessoas') ? valor_pessoa : valor 

              // Quarta e última mexida no respostas_verbos.
              // Colocamos a resposta correta para futura comparação com a resposta do usuário.
              respostas_verbos[ultimo_modo].tempos[ultimo_tempo].pessoas[k].respostas_corretas[elemento] = valor_a_inserir
            }
            
          }
          
          // Se, o usuário não for preencher nada, dará para ouvir os áudios dos verbos.
          const arquivo = dados.modos[i].tempos[j].audios[k]
          const fonte_mp3 = `../mp3/${idioma_sem_acento}/verbos/${primeira_letra}/${arquivo}.mp3`
          
          let alto_falante = ''
          let audio_verbo = ''
          // Só entra no if se o usuário for só ver o verbo, sem preencher nada.
          if (!complementos_auxs_tem & !conjugacao_tem) {

            audio_verbo = `<audio id="verbo_modo_${i}__tempo_${j}__pessoa_${k}">
              <source src="${fonte_mp3}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>`

            alto_falante = `<div class="" style="float: left;"><i class="icon-volume-up" style="cursor: pointer;" onclick="document.getElementById('verbo_modo_${i}__tempo_${j}__pessoa_${k}').play();"></i></div>`
          }

          // Aqui ajeita a contração com apóstrofo na primeira pessoa de alguns tempos verbais.
          

          string_conjugados += `${audio_verbo}<div class="flex_row T1" style="display: inline-block; ">${alto_falante}<div style="margin-left: 8px; float: left;">${elemento_1}</div><div style="margin-left: 8px; float: left;">${elemento_2}</div><div style="margin-left: 8px; float: left;">${elemento_3}</div><div style="margin-left: 8px; float: left;">${elemento_4}</div></div>`

          

          // string_conjugados += `${audio_verbo}<div class="flex_row T1"><span style="margin-left: 8px;">${elemento_1}</span><span style="margin-left: 8px;">${elemento_2}</span><span style="margin-left: 8px;">${elemento_3}</span><span style="margin-left: 8px;">${elemento_4}</span>${alto_falante}</div>`

        }

        if (achou_o_tempo === 'sim') cartao += `${string_conjugados}</div>`
      }

    }
    }

    let botao_confere = ''
    alert(`conjugacao: ${conjugacao} / complementos_auxs: ${complementos_auxs}`)
    if (conjugacao === 'input' || complementos_auxs === 'input') {
      botao_confere = `<button class="flex_row center botao bot_ativo" onclick="confere_verbo('${idioma}')">Confere</button>`
    } else {

      botao_confere = `<div class="flex_row center botao bot_inativo">Confere</div>`
    }

    cartao += `<div class="flex_row T1 center">${botao_confere}</div></div>`



    document.getElementById('recip_componente').innerHTML = cartao
    verbo_cartao = cartao
  }

}

var verbo_cartao = ''
function fala_verbo (idioma, letra, arquivo) {


}

function abre_pesquisar (idioma) {

  document.getElementById('recip_pre_componente').innerHTML = ''
  document.getElementById('recip_componente').innerHTML = ''

  document.getElementById('recip_pre_componente').innerHTML = `
    <div class="flex_row T1" style="max-width: 600px;">
      <input id="input_verbo_infinitivo" type="text" placeholder="Verbo no infinitivo" class="input_texto" style="border: solid 1px grey; margin: 0px; margin-top: 30px;" onkeypress="enter_busca_verbo(event, '${idioma}', this.value)">
          
      <div class="flex_row T1 botao center bot_ativo" style="margin: 0px; margin-top: 30px; max-width: 150px; margin-left: 20px;" onclick="buscar_verbo('${idioma}', document.getElementById('input_verbo_infinitivo').value)">
        Pesquisar
      </div>
    </div>
  `
}

function abre_lista (idioma) {
  
  document.getElementById('recip_pre_componente').innerHTML = ''
  document.getElementById('recip_componente').innerHTML = ''

  let string_letras = ''
  let letras = []

  if (idioma === 'pt') letras = letras_pt
  if (idioma === 'es') letras = letras_es
  if (idioma === 'it') letras = letras_it
  if (idioma === 'fr') letras = letras_fr
  if (idioma === 'en') letras = letras_en

  // Aqui deveria ter um jeito do sistema reconhecer se têm verbos na letra indicada.
  for (let i = 0; i < letras.length; i++) {
    const maiuscula = letras[i].toUpperCase()
    string_letras += `<span class="letra_lista" onclick="listar_verbo('${idioma}', '${letras[i]}')">${maiuscula}</span>`
  }

  document.getElementById('recip_pre_componente').innerHTML = `
    <div class="flex_row T1 center" style="flex-wrap: wrap; padding-left: 15px; padding-right: 15px;">
      ${string_letras}
    </div>
    `

  document.getElementById('recip_componente').innerHTML = `
    <div class="flex_row T1" style="flex-wrap: wrap; height: 100%;" id="recip_interno_componente">
    </div>
  `
}

// PERFIL //

async function seguir_perfil(id_perfil) {

  const obj_vai = {
    id_perfil: id_perfil
  }

  const dados = await vai_filhao_2('seguir', JSON.stringify(obj_vai))

  let cor_botao
  let escrito
  if (dados.acao === 'desseguir') {
    cor_botao = 'background: red; color: white;'
    escrito = 'Seguir'
  }
  if (dados.acao === 'seguir') {
    cor_botao = 'background: grey; color: white;'
    escrito = 'Desseguir'
  }

  document.getElementById('div_botao_seguir').innerHTML = `
    <button class="botao" style="${cor_botao} margin: 0px;" onclick="seguir_perfil('${id_perfil}')">${escrito}</button>
  `

  document.getElementById('seguidores_numero').innerHTML = dados.n_seguidores
}

function perfil_seguidores() {
  const recip = document.getElementById('perfil_recip_seguidores')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
  }
}

function perfil_seguidos() {
  const recip = document.getElementById('perfil_recip_seguidos')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
  }
}

function perfil_segue(obj) {

  for (let i = 0, length = obj.perfis_seguidos.length; i < length; i++) {
    if (obj.perfis_seguidos[i].id_perfil === obj.id_perfil) {
      segue_este_perfil = 'sim'
      return 'sim'
    }
  }

  return 'nao'
}

function perfil_botao_seguir(obj) {

  if (obj.perfil_propriedade === 'proprio') {
    return ''
  }

  if (obj.perfil_propriedade === 'alheio') {
    let cor_botao
    let escrito

    if (obj.segue_este_perfil === 'nao') {
      cor_botao = 'background: red; color: white;'
      escrito = 'Seguir'
    }
    if (obj.segue_este_perfil === 'sim') {
      cor_botao = 'background: grey; color: white;'
      escrito = 'Desseguir'
    }

    return `<button class="botao perfil_botao_seguir" style="${cor_botao}" onclick="seguir_perfil('${obj.id_perfil}')">${escrito}</button>`
  }
}

function perfil_botao_editar(obj) {

  // alert(obj.perfil_propriedade)
  
  if (obj.perfil_propriedade === 'proprio') {
    return `

      <a href="${servidor}/decoreba_cria/${obj.id_decoreba}">
        <button class="botao"><i class="icon-editar_vazio perfil_botao_editar"></i></button>
      </a>
    `
  }

  if (obj.perfil_propriedade === 'alheio') {
    return ''
  }
}

function perfil_botao_criar(obj) {
  if (obj.perfil_propriedade === 'proprio') {
    return `
        <button class="botao" onclick="monta_decoreba_cria()" style="margin-top: 50px;">Crie suas próprias decorebas</button>
      `
  }

  if (obj.perfil_propriedade === 'alheio') {
    return ''
  }
}

function perfil_ico_estrela(obj) {

  if (obj.decorebas_curtidas.length) {
    for (let j = 0, length = obj.decorebas_curtidas.length; j < length; j++) {
      if (obj.decorebas_curtidas[j].id_decoreba == obj.id_decoreba) return 'icon-estrela_cheio'
    }
  }

  return 'icon-estrela_vazio'
}

function perfil_sociais(obj) {

  const facebook = (obj.configuracoes[0].facebook && obj.configuracoes[0].facebook != 'nao_tem') ? `
      <a href="${obj.configuracoes[0].facebook}" target="_blank" style="color: blue;">
        <i class="icon-facebook-squared"></i>
      </a>
  ` : ''

  const instagram = (obj.configuracoes[0].instagram && obj.configuracoes[0].instagram != 'nao_tem') ? `
      <a href="${obj.configuracoes[0].instagram}" target="_blank" style="background: radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        <i class="icon-instagram"></i>
      </a>
    ` : ''

  const youtube = (obj.configuracoes[0].youtube && obj.configuracoes[0].youtube != 'nao_tem') ? `
      <a href="${obj.configuracoes[0].youtube}" target="_blank" style="color: red;">
        <i class="icon-youtube-play"></i>
      </a>
    ` : ''

  const twitter = (obj.configuracoes[0].twitter && obj.configuracoes[0].twitter != 'nao_tem') ? `
      <a href="${obj.configuracoes[0].twitter}" target="_blank" style="color: #12a2c9;">
        <i class="icon-twitter-1"></i>
      </a>
    ` : ''

  const linkedin = (obj.configuracoes[0].linkedin && obj.configuracoes[0].linkedin != 'nao_tem') ? `
      <a href="${obj.configuracoes[0].linkedin}" target="_blank" style="color: #1187ba;">
        <i class="icon-linkedin-1"></i>
      </a>
    ` : ''

  // Aqui vai ter que abrir um link para enviar o email pro cabra.
  const email = (obj.login && obj.login != 'nao_tem') ? `
      <i class="icon-email-1" onclick="window.open('mailto:test@example.com');"></i>
    ` : ''


  return {
    facebook: facebook,
    instagram: instagram,
    youtube: youtube,
    twitter: twitter,
    linkedin: linkedin,
    email: email
  }
}

// JOGO //
function simplifica_idioma (idioma_complexo) {
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
}

async function mostrar_resultado (resultado, id_decoreba, modalidade) {

  const msg = (resultado === 'ganhou') ? 'Meus parabéanss!!!' : "Xíiii!!"
  document.getElementById('finalizou_msg').innerHTML = msg

  document.getElementById('recip_progresso_pal_mult').innerHTML = dominadas_str_mult
  document.getElementById('recip_progresso_pal_escr').innerHTML = dominadas_str_escr


  let novas_palavras_liberadas_string = ''

  let cor_barrinha_progresso_resultado = 'var(--botao_ativo)'
  let listra_porc_atividade_resultado = 'listra_porc_ativa'
  let largura_porc_palavra_resultado = 50;

  if (novas_palavras_no_mult.length) {
        
    for (let i = 0; i < novas_palavras_no_mult.length; i++) {

      // novas_palavras_liberadas_string += faz_palavras_trabalhadas (novas_palavras_no_mult[i].idioma_1, novas_palavras_no_mult[i].idioma_2, largura_porc_palavra_resultado, 'var(--botao_ativo)')

      // O i tb vai de parametro no faz_palavras_liberadas() para linkar o audio com o botãozinho do áudio. 
      novas_palavras_liberadas_string += faz_palavras_liberadas (i, novas_palavras_no_mult[i].idioma_1, novas_palavras_no_mult[i].idioma_1_mp3, novas_palavras_no_mult[i].idioma_2, novas_palavras_no_mult[i].idioma_2_mp3, pre_jogo.idioma_1)
    }
  }

  if (novas_palavras_no_escr.length) {
        
    for (let i = 0; i < novas_palavras_no_escr.length; i++) {

      novas_palavras_liberadas_string += faz_palavras_liberadas (i, novas_palavras_no_escr[i].idioma_1, novas_palavras_no_escr[i].idioma_1_mp3, novas_palavras_no_escr[i].idioma_2, novas_palavras_no_escr[i].idioma_2_mp3, pre_jogo.idioma_1)

    }
  }

  // alert(str_palavras_liberadas)
  if (novas_palavras_liberadas_string != '') {
    document.getElementById('recip_palavras_liberadas').style.display = 'flex'
  }
  if (novas_palavras_liberadas_string === '') {
    document.getElementById('recip_palavras_liberadas').style.display = 'none'
  }

  if (modalidade === 'mult_esc') {
    document.getElementById('recip_recip_resu_escr').style.display = 'none'
    document.getElementById('recip_recip_resu_mult').style.display = 'flex'
  }

  if (modalidade === 'escrita') {
    document.getElementById('recip_recip_resu_mult').style.display = 'none'
    document.getElementById('recip_recip_resu_escr').style.display = 'flex'
  }

  document.getElementById('div_interno_palavras_liberadas').innerHTML = novas_palavras_liberadas_string
  document.getElementById('div_palavras_pontuacoes').innerHTML = str_palavras_liberadas

  document.getElementById('div_finalizou').style.display = 'flex'
  novas_palavras_no_mult = []
  novas_palavras_no_escr = []
  novas_palavras_liberadas_string = ''
}

async function completar_dekoreba (id_decoreba) {

  document.getElementById('div_finalizou').style.display = 'none'
  monta_decoreba_mostra(`${id_decoreba}`)
}

function preenche_curso_escr (cap_curso, cap_praticado) {

  curso_escr = []
  for (let i = 0; i < cap_curso.vocabulario.length; i++) {

    // agora temos que ver quais, desse capítulo, foram liberadas.
    for (let j = 0; j < cap_praticado.palavras_liberadas_escr.length; j++) {

      if (cap_curso.vocabulario[i]._id == cap_praticado.palavras_liberadas_escr[j].id_palavra) {

        // Aqui seta se for treino.
        curso_escr.push({
          id_capitulo: cap_curso._id,
          vocabulario: cap_curso.vocabulario[i]
        })
      }
    }
  }


  return curso_escr
}

function soma_acertos (liberadas, id_pergunta) {


  let acertos = 0
  for (let j = 0; j < liberadas.length; j++) {
    if (liberadas[j].id_palavra == id_pergunta) {

      for (let k = 0; k < liberadas[j].acertos_e_erros.length; k++) {

        acertos += liberadas[j].acertos_e_erros[k].n_acertos_erros
      }
    }
  }

  return acertos
}


function acha_alfabeto_principal (idioma, palavra) {

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
}

// Estas 3 lets aqui servem de gambiarra apenas para a carrega_pergunta_escrita funcionar.
// Dá pra passar elas por argumentos tb, mas melhor ver isso quando o código ficar mais limpo.
// Por enquanto elas só tão declaradas. Talvez nem use.
let id_decoreba_escr = ''
let id_capitulo_pergunta_escr = ''
let id_palavra_pergunta_escr = ''
var treino_valer_escrita = ''

let cor_decoreba_jogo = ''

// var palavras_escr_teste = {"id_palavra": "", "acertou_ou_errou": ""}
var palavras_escr_teste = []

var id_pergunta_teste = ''
var id_capitulo_pergunta_escrita = '' // GAMBIERRR. gAMBiarra utilizada somente nessa funçã carrega_pergunta_escrita
async function carrega_pergunta_escrita (treino_ou_para_valer, orient, obj, primeira_pergunta, eh_teste) {

  if (eh_teste_global === 'sim') orient = '2-1'

  orientacao_global = orient // Var global, gambz mas funfa.

  const voltar_ou_encerrar_teste = (eh_teste_global === 'sim') ? 'Cancelar Teste' : 'Voltar'

  // o argumento primeira_pergunta só existe quando é, de fato, a primeira pergunta, logo...
  let obj_veio

  // Temos aqui 3 variáveis com o nome super parecido.
  // Absolutamente errado isso aqui. Dá para melhorar demais.
  treino_ou_pra_valer_gam = treino_ou_para_valer
  treino_ou_pra_valer = treino_ou_para_valer

  let liberadas_escr = []
  if (primeira_pergunta) {

    // Se eh_teste...

    
    i_sequencia = 0

    orientacao_global = orient // Var global, gambz mas funfa.
    orientacao_idiomas_global = orient  // GAMBIARRA!!! Essa var, creio, nem deveria mais existir.

    if (orientacao_global === 'aleatoria') orient = '2-1' // A primeira do aleatória sempre é 2-1.
    orientacao_global = orient // Var global, gambz mas funfa.


    // A primeira sempre é 2-1.


    // Talvez nem precise zerar essas aqui mas vai que.
    resps_corretas_escritas = 0
    resps_erradas_escritas = 0

    document.body.style.overflow = 'auto' // Destrava a tela travada das opções popup de antes do jogo.]

    // Aqui temos que atualizar as opções do pré-jogo do usuário no banco de dados, nas decorebas_praticadas.
    // Acredito que o ideal aqui é ter um pré-processador antes de vir pra cá, pra salvar lá as paradas, carregar o que tiver que carregar, talvez uma configuração com as palavras mais erradas pro usuário, pra ele treinar mais elas, sei lár.
    // Mas por enquanto, tá valendo.

    const obj_vai = {
      id_decoreba: obj.id_decoreba,
      i_capitulo: pre_jogo.i_capitulo,
      modalidade: 'escrita',
      orientacao: orient
    }


    obj_veio = await vai_filhao_2('escolhas_decoreba', JSON.stringify(obj_vai))
    id_capitulo_pergunta_escrita = obj_veio.cap_curso._id

    cor_decoreba_jogo = obj_veio.cor_decoreba

    const cap_praticado = obj_veio.cap_praticado
    const cap_curso = obj_veio.cap_curso

    palavras_mult = forma_palavras_mult(cap_praticado, cap_curso, 'escrita') // Função meio grande.
    sequencia_aleatoria = forma_sequencia_aleatoria(palavras_mult) // Array com i's liberados do palavras_mult.
  }

  // Essa parada tem que vir com os alfabetos tb.
  // i, opcao, id_decoreba, i_capitulo, id_usuario, avatar, distancia,
  // Escolhemos um i aleatório do capítulo todo.

  // Primeiramente, verificamos qual é o idioma da pergunta.
  const idioma_falado = orient === '1-1' || orient === '1-2' ? `${obj.idioma_1}` : `${obj.idioma_2}`
  const idioma_falado_simples = simplifica_idioma(idioma_falado)

  let i_aleatorio = sequencia_aleatoria[i_sequencia]
  i_sequencia++

  const palavra = palavras_mult[i_aleatorio].vocabulario

  id_decoreba_escr = obj.id_decoreba
  id_capitulo_pergunta_escr = id_capitulo_pergunta_escrita
  id_palavra_pergunta_escr = palavra._id

  let id_pergunta = id_palavra_pergunta_escr

  if (eh_teste_global === 'sim') id_pergunta_teste = id_pergunta // Gambiarara, funcioan,.
  
  let pergunta_max_acertos = 8

  // Se o idioma da pergunta tem apenas o alfabeto latino, o pergunta_max_acertos deverá ser 16
  // pois seriam 4 acertos para cada modalidade. Ou seja...

  // 4 para italiano -> portugues: multipla escolha
  // 4 para portugues -> italiano: multipla escolha
  // 4 para italiano -> portugues: escrita
  // 4 para portugues -> italiano: escrita

  // 16 no total.

  // Aqui tinha uma funcao chamada soma_acertos(); Acho que ela só funcionava aqui, somar as pontuações.
  // Tem que ver isso aí.

  // 16 no total.
  let perguntas_atuais_acertos = 0

  for (let k = 0; k < palavras_mult[i_aleatorio].pontuacoes.length; k++) {
    perguntas_atuais_acertos += palavras_mult[i_aleatorio].pontuacoes[k].n_acertos_erros
  }

  let largura_porc_palavra = perguntas_atuais_acertos * 100 / 8

  obj["qtd_incidencias_previas"] = perguntas_atuais_acertos // Rodará o código

  let pergunta = ''
  let resposta = ''
  let respostas = []

  let respostas_escritas = ''

  let arquivo_audio
  let alfabetos_rodada_perg = []
  let alfabetos_rodada_resp = []

  let modalidade = ''

  console.log(escolhas_dek)
  console.log("Escolhas ddek logo enrriba.")

  if (escolhas_dek.modalidade === 'multipla_escolha') modalidade = 'Múltipla Escolha <i class="icon-multiplas_escolhas"></i>'
  if (escolhas_dek.modalidade === 'escrita') modalidade = 'Escrita'
  if (escolhas_dek.modalidade === 'falada') modalidade = 'Falada'

    /*
  const qtd_alfabetos_perg = (orient === '2-1') ? escolhas_dek.alfabetos_resp.length : escolhas_dek.alfabetos_perg.length

  for (let i = 0; i < qtd_alfabetos_perg; i++) {

      if (opcao != '2-1') {
        const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_perg[i])
        alfabetos_rodada_perg.push(sis_esc)
      } else {
        const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_resp[i])
        alfabetos_rodada_perg.push(sis_esc)
      }    
    }
    */






  if (escolhas_dek.alfabetos_perg.length) {
    for (let i = 0; i < escolhas_dek.alfabetos_perg.length; i++) {
      const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_perg[i])
      alfabetos_rodada_perg.push(sis_esc)
    }
  }

  // Ainda não tem um para o 2-2.
  if (orient === '2-1' || orient === '1-1' || orient === '2-1') {

    const alfabeto_resposta = sistema_principal(pre_jogo.idioma_1)
    alfabetos_rodada_resp.push(alfabeto_resposta)
  } else {
    const alfabeto_resposta = sistema_principal(pre_jogo.idioma_2)
    alfabetos_rodada_resp.push(alfabeto_resposta)
  }

  // Acha o i ideal das colunas de cada idioma, com a pronúncia correcta para a ocasião.
  const palavra_vai = orient == '1-1' || orient === '1-2' ? palavra.idioma_1 : palavra.idioma_2

  const i_certo = acha_alfabeto_principal(idioma_falado, palavra_vai)

  let string_orientacao = ''
  let palavra_pergunta

  if (orient == '1-1') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_1

    for (let i = 0; i < palavra.idioma_1.length; i++) {
      if (palavra.idioma_1[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_1[i].item
        respostas.push(palavra.idioma_1[i])
      }
    }

    arquivo_audio = palavra.idioma_1[i_certo].arquivo
  }

  if (orient == '2-2') {
    string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_2}`
    palavra_pergunta = palavra.idioma_2
    for (let i = 0; i < palavra.idioma_2.length; i++) {
      if (palavra.idioma_2[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_2[i].item
        respostas.push(palavra.idioma_2[i])
      }
    }

    arquivo_audio = palavra.idioma_2[i_certo].arquivo
  }

  if (orient == '1-2') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_2}`
    palavra_pergunta = palavra.idioma_1

    pergunta = palavra.idioma_1[0].item
    for (let i = 0; i < palavra.idioma_2.length; i++) {
      if (palavra.idioma_2[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_2[i].item
        respostas.push(palavra.idioma_2[i])
      }
    }

    arquivo_audio = palavra.idioma_1[i_certo].arquivo
  }

  if (orient == '2-1') {
    string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_2

    pergunta = palavra.idioma_2[0].item
    for (let i = 0; i < palavra.idioma_1.length; i++) {
      if (palavra.idioma_1[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_1[i].item
        respostas.push(palavra.idioma_1[i])
      }
    }
    arquivo_audio = palavra.idioma_2[i_certo].arquivo
  }

  let bandeira = volta_bandeira(idioma_falado, 35, 0)

  let recip_perguntas = ''
  if (alfabetos_rodada_perg.length) {
    for (let i = 0; i < alfabetos_rodada_perg.length; i++) {
      for (let j = 0; j < palavra_pergunta.length; j++) {
        if (alfabetos_rodada_perg[i] === palavra_pergunta[j].sistema_escrita & palavra_pergunta[j].tipo === 'palavra') {

          const descricao = (palavra_pergunta[j].descricao) ? palavra_pergunta[j].descricao : ''
          const pergunta = `<span>${palavra_pergunta[j].item}</span><span style="margin-left: 15px;">${bandeira}</span><span style="margin-left: 15px; color: grey; font-style: italic; font-size: 18px;">${descricao}</span>`

          recip_perguntas += `<div class="flex_row center" style="margin: 5px;">${pergunta}</div>`
        }
      }
    }
  }

  const fonte_mp3 = `./mp3/${idioma_falado_simples}/${arquivo_audio}.mp3`

  const classe_treino_valer_pontos_escrita = (treino_ou_para_valer === 'treino') ? 'sumido' : ''

  // diurno_noturno é uma var grobal.
  let cor_dekoreba_inativa = ''
  if (diurno_noturno === 'diurno') {
    cor_dekoreba_inativa = tinycolor(cor_decoreba_jogo).lighten(20).desaturate(35).toString()
  }
  if (diurno_noturno === 'noturno') {
    cor_dekoreba_inativa = tinycolor(cor_decoreba_jogo).darken(20).desaturate(35).toString()
  }

  let cor_barrinha_progresso = (treino_ou_para_valer === 'treino') ? cor_dekoreba_inativa : 'var(--botao_ativo)'
  let listra_porc_atividade = (treino_ou_para_valer === 'treino') ? 'listra_porc_inativa' : 'listra_porc_ativa'

  const orororo = faz_palavras_trabalhadas ('dog', 'catioro', 3, '<i class="icon-up-open" style="margin-right: 10px;"></i>', 3, 'var(--botao_ativo)')

  const ore = faz_palavras_testadas ('dog', 'catioro', 'acertou')
  // const ora = faz_palavras_testadas ('cat', 'gatinto', 'errou')
  const ori = faz_palavras_testadas ('car', 'carrito', 'acertou')

  document.getElementById('div_palco_index').innerHTML =  `
    <audio id="audio_palavra" autoplay>
      <source src="${fonte_mp3}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>

     <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div> 


    <div id="jogo_recip_checkpoint" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_checkpoint('escrita')"></i> 
        </div>

        <div class="flex_col T1 center caixinha_dentro" style="">
          CHECKPOINT!<br>
          Seu progresso foi salvo.<br>

        </div>

      </div>
      
    </div> 
    



    <div id="popup_resposta_escrita" class="flex_row T1 center sumido " style="height: 100vh; position: fixed; z-index: 99999;">
      <div id="popup_resposta_escrita_interno" class="flex_col center" style="width: 400px; height: 200px; background: white; border-radius: 15px; font-size: 66px; ">
        ${resposta}
      </div>
    </div>


        
    <div id="div_fundo_respondeu" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5); z-index: 100;">
    </div>

    
    <div id="div_finalizou" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5); z-index: 101; padding: 15px;">

      <div class="flex_col T1 largura_interna" style="padding: 15px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background: var(--fundo_carta); box-shadow: 0px 0px 2px #adadad; overflow-y: auto; max-height: 100%; ">

        <!-- Estamos na Escrita -->
        <div id="finalizou_msg" class="flex_row T1 center" style="margin-top: 10px; margin-bottom: 20px;"></div>

        <div id="recip_palavras_liberadas" class="flex_col T1 fundo_nivel_resultados_lib sumido">

          <div class="flex_row T1 center" style="margin-bottom: 10px; font-weight: bold; margin-top: 15px;">Palavras Liberadas</div>

          <div id="div_interno_palavras_liberadas" class="flex_col T1 center">
           
      

          </div>

        </div>


        <div class="flex_row flex_col_m T1" style="">

          <div id="recip_recip_resu_mult" class="flex_col T1 fundo_nivel_resultados sumido">
            <div style="margin-bottom: 10px; font-weight: bold;">Múltipla Escolha</div>

            <div id="recip_progresso_pal_mult" class="flex_col T1">


            </div>

          </div>

          <div id="recip_recip_resu_escr" class="flex_col T1 fundo_nivel_resultados sumido">
            <div style="margin-bottom: 10px; font-weight: bold;">Escrita</div>
            
            <div id="recip_progresso_pal_escr" class="flex_col T1">

            </div>
            
          </div>
        </div>



        <div class="flex_col T1 sumido" style="">
          <div style="margin-bottom: 10px; font-weight: bold;">PONTUAÇÃO DAS PALAVRAS</div>

          <div id="div_palavras_pontuacoes" class="flex_col T1">
            <div><span style="margin-right: 10px;">5</span>Vish</div>
            <div><span style="margin-right: 10px;">10</span>Maria</div>
          </div>
          

        </div>

        
        <div class="flex_row T1 sumido" style="margin-top: 25px; font-size: 15pt;">
          Nível 7
        </div>
        <div class="flex_row T1 sumido" style="background: #e0e0e0; min-height: 5px; padding: 4px; border-radius: 10px; margin-top: 5px;">
          <span id="span_porcentagem__1_2" style="background: #b44efc; min-height: 7px; border-radius: 7px; width: 40%;"></span>
        </div>

        <div class="flex_row T1 sumido" style="margin-top: 25px; font-size: 15pt; justify-content: flex-end;">
          15/200
        </div>

        <div class="flex_row T1 center">
          <button class="flex_row center botao bot_ativo" style="max-width: 200px; height: 50px;" onclick="completar_dekoreba('${obj.id_decoreba}')">Completar</button>
        </div>
        
      </div>
    </div>


    <div id="home_recip_fim_teste" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div id="home_info_fim_teste" class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra sumido">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_fim_teste_inicial()"></i>
        </div>

        <div id="home_fim_teste_dentro" class="flex_col T1 center caixinha_dentro">

          <div id="home_fim_teste_dentro_palavras_liberadas" class="flex_col T1 fundo_nivel_resultados_lib sumido">

            <div class="flex_row T1 center" style="margin-bottom: 10px; font-weight: bold; margin-top: 15px;">NOVAS PALAVRAS LIBERADAS</div>

            <div id="div_interno_home_fim_teste_palavras_liberadas" class="flex_col T1 center">
             
            </div>

          </div>

          <div id="home_fim_teste_dentro_palavras" class="flex_col T1 center caixinha_dentro"></div>

          <div id="home_fim_teste_botoes" class="flex_row T1 center"></div>

        </div>

      </div>
    </div> 

    <div id="home_recip_outros_testes" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div id="home_info_outros_testes" class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_fim_teste_inicial()"></i>
        </div>

        <div id="home_outros_testes_dentro" class="flex_col T1 center caixinha_dentro">

        </div>

      </div>
    </div> 




    <div id="div_protecao" class="flex_row T1 sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.3); z-index: 100;">
    </div>

    <div id="recip_pergunta" class="flex_col center T1 decoreba_jogo_recip">

      <div class="flex_row T1 largura_interna sumido" style="margin-bottom: 10px; margin-top: -15px; color: grey; ">
        <i>
          <span>${modalidade}</span>
          <span style="margin-left: 20px;">${string_orientacao}</span>
        </i>
      </div>
      
      <div class="flex_col T1 center largura_interna fundo_prancheta" style="padding: 0px; background: var(--fundo_carta);">

        <div class="flex_row flex_col_m T1 largura_interna mostra_topo_decoreba center" style="max-height: 100px; align-items: center; align-text: center; margin-bottom: 0px; z-index: 0; background: var(--botao_ativo); color: var(--letras_dekorebas);">
          <h2 class="exclusivo_pc" style="margin-left: 50px; margin-top: 43px;">${obj.titulo}</h2>
          <h2 class="exclusivo_mobile" style="margin-bottom: 15px; margin-top: 17px;">${obj.titulo}</h2>

          <h3 class="exclusivo_pc" style="margin-left: 40px; margin-top: 43px;">${obj.titulo_capitulo}</h3>
          <h3 class="exclusivo_mobile" style="margin-top: -10px;">${obj.titulo_capitulo}</h3>

        </div>


        <div class="flex_row T1 center" style="max-width: 300px; margin-top: 25px; margin-bottom: 15px;">
          <!-- eoeoeoo -->
          <!-- escrita -->
          <div id="jogo_div_listra_progresso_escr" class="flex_row T1 listra_porcentagem ${listra_porc_atividade}">

           <span id="jogo_lista_progresso_escr" class="interior_listra_porcentagem" style="width: ${largura_porc_palavra}%; height: 10px; background: ${cor_barrinha_progresso}; min-height: 5px; border-radius: 7px;"></span>
           </div>
        </div>

        <div class="flex_row center">
          <div class="flex_row center" style="font-size: 33px; margin: 15px; flex-wrap: wrap;">
            ${recip_perguntas}
            <br>
          </div>
          <br>
          <div class="flex_row center botao" style='color: var(--color_site); margin-left: 15px;' onclick="document.getElementById('audio_palavra').play();">
            <i class="icon-volume"></i>
          </div>
        </div>

        <input id="input_resposta_escrita" type="text" style="width: 75%; max-width: 600px; padding: 10px; font-size: 27px; border: 1px solid grey; border-radius: 7px;" autofocus onkeypress='if(event.keyCode == 13) envia_resp_escrita("${resposta}", "${orient}", ${JSON.stringify(respostas)}, "${eh_teste}")'>

        <br><br>
        <button class="flex_row center botao bot_ativo" onclick='envia_resp_escrita("${resposta}", "${orient}", ${JSON.stringify(respostas)}, "${eh_teste}")'>Enviar</button>


      <div class="flex_row T1" style="border-radius: 15px; margin-top: 25px;  min-width: 200px; border-radius: 0px; border-bottom-right-radius: 30px; border-bottom-left-radius: 30px; padding: 0px; background: var(--botao_ativo); ">

        <div class="flex_row T1 center" style="background: var(--background_site); color: var(--color_site); margin-top: 15px; margin-bottom: 30px; padding: 0px;">

          <div style="font-size: 22px; margin-right: 5px;"><i class="icon-ok" style="color: green;"></i>: <span id="span_resp_corretas">${resps_corretas_escritas}</span> <span class="${classe_treino_valer_pontos_escrita}">/ ${meta_corretas}</span>
          </div>

          <div style="font-size: 22px; margin-left: 5px;"><i class="icon-cancel" style="color: red;"></i>: <span id="span_resp_erradas">${resps_erradas_escritas}</span> <span class="${classe_treino_valer_pontos_escrita}">/ ${meta_erradas}</span>
          </div>

        <div>

      </div>
         
      <button class="botao bot_ativo" style="margin: 5px; margin-left: 25px;" onclick='monta_decoreba_mostra("${obj.id_decoreba}")'>${voltar_ou_encerrar_teste}</button>

    </div>      



        <button class="flex_row center botao bot_ativo sumido" onclick='monta_decoreba_mostra("${obj.id_decoreba}")'>Voltar</button>

      </div>
    </div>
  `

  document.getElementById('input_resposta_escrita').focus()

  // Ao apertar Enter, tb tem que ir essa parada.
  window.scrollTo(0, 0)
}

function geral_ou_verbo (qual) {

  let botao_alfabeto = document.getElementById('botao_decoreba_alfabeto')
  let botao_geral = document.getElementById('botao_decoreba_geral')
  let botao_verbos = document.getElementById('botao_decoreba_verbos')
  let botao_frases = document.getElementById('botao_decoreba_frases')

  aba_mostra_dekoreba = qual

  troca_classe (botao_alfabeto, 'bot_ativo', 'bot_inativo')
  troca_classe (botao_geral, 'bot_ativo', 'bot_inativo')
  troca_classe (botao_verbos, 'bot_ativo', 'bot_inativo')
  troca_classe (botao_frases, 'bot_ativo', 'bot_inativo')

  document.getElementById('recip_verbos').classList.add('sumido')
  document.getElementById('div_recip_string_capitulos').innerHTML = ''

  if (qual === 'alfabeto') {
    document.getElementById('div_recip_string_capitulos').innerHTML = string_capitulos_sist_escr
    troca_classe (botao_alfabeto, 'bot_inativo', 'bot_ativo')
  }

  if (qual === 'geral') {
    document.getElementById('div_recip_string_capitulos').innerHTML = string_capitulos
    troca_classe (botao_geral, 'bot_inativo', 'bot_ativo')
  }

  if (qual === 'verbo') {
    document.getElementById('recip_verbos').classList.remove('sumido')
    troca_classe (botao_verbos, 'bot_inativo', 'bot_ativo')
  }

  if (qual === 'frases') {
    troca_classe (botao_frases, 'bot_inativo', 'bot_ativo')
  }
}

var acertadas = []
var erradas = []
var dominadas_vai = []

// Ao carregar a dekoreba, o sistema deve carregar também as palavras dificultosas.
// Facílimas

var qtd_max_acertos_erros = 4
// Pois assim ele poderá fazer as contas matemáticas e inserir estas palavras com maior frequencia durante a jogada.
// Parece que aqui não importa a direção, ainda.
function altera_dominadas (id_dekoreba, id_capitulo, id_palavra, resultado, orientacao, qtd_incidencias_previas) {

  // Toda vez que se responde algo, essa parada muda. Ezelente.
  // Aqui altera o dominadas_vai. Poderia colocar também o geral de acertos e erros.

  let n_incidencia = (resultado === 'acertou') ? 1 : -1

  if (dominadas_vai.length) {

    let achou = 'nao'
    for (let i = 0; i < dominadas_vai.length; i++) {
      if (dominadas_vai[i].id_palavra == id_palavra & dominadas_vai[i].orientacao === orientacao) {

        achou = 'sim'

        if (resultado === 'acertou') dominadas_vai[i].qtd_incidencias++
        if (resultado === 'errou') dominadas_vai[i].qtd_incidencias--

        /*
        if (resultado === 'acertou' & dominadas_vai[i].qtd_incidencias < qtd_max_acertos_erros) dominadas_vai[i].qtd_incidencias++
        if (resultado === 'errou' & dominadas_vai[i].qtd_incidencias > -qtd_max_acertos_erros) dominadas_vai[i].qtd_incidencias--
        */
      }
    }

    if (achou === 'nao') dominadas_vai.push({id_dekoreba: id_dekoreba, id_capitulo: id_capitulo, id_palavra: id_palavra, qtd_incidencias: n_incidencia, orientacao: orientacao, qtd_incidencias_previas: qtd_incidencias_previas})
  }
  
  if (!dominadas_vai.length) dominadas_vai.push({id_dekoreba: id_dekoreba, id_capitulo: id_capitulo, id_palavra: id_palavra, qtd_incidencias: n_incidencia, orientacao: orientacao, qtd_incidencias_previas: qtd_incidencias_previas})


  // Aqui deve-se comparar a palavra recém respondida com o palavras_mult.
    // Quando a palavra alcançou 8 pontos no pontos_mult, uma outra palavra é liberada no palavras mult.

    for (let i = 0; i < palavras_mult.length; i++) {
      if (palavras_mult[i].id_palavra == id_palavra) {

      }
    }


}

// Função gera_dominadas_str() funciona perfeitamente, mas todas as chamadas para ela estão destivadas pois
// agora, as palavras são liberadas durante a partida, e não mais ao final.
function gera_dominadas_str (tipo) {

  let palavras_curso = (tipo === 'mult') ? curso_mult : curso_escr

  let string = ''

  let qtd_inci = 0 // Máx. de 4 e mín. de -4.

  // Aí, quando a palavra atinge 4 (pela primeira vez), há de se ter alguma animação, pois liberará uma nova palavra.
  // Temos que saber em qual das orientações a palavra teve o acerto.
  // Creio eu que pode-se colocar aqui o número.

  console.log(dominadas_vai)
  console.log("dominadas_vai logo acima!!!!")
  // Aqui ordenamos nessa dominadas_ordem, para mostrar certinho. Sò isso.
  let dominadas_ordem = []
  for (let i = 0; i < dominadas_vai.length; i++) {
    if (dominadas_vai[i].qtd_incidencias > 0) {
      dominadas_ordem.push(dominadas_vai[i])
    }
  }

  for (let i = 0; i < dominadas_vai.length; i++) {
    if (dominadas_vai[i].qtd_incidencias === 0) {
      dominadas_ordem.push(dominadas_vai[i])
    }
  }

  for (let i = 0; i < dominadas_vai.length; i++) {
    if (dominadas_vai[i].qtd_incidencias < 0) {
      dominadas_ordem.push(dominadas_vai[i])
    }
  }

  // Aqui, se o usuário encontrou a msm palavra mas em orientações diferentes, o dominadas_vai estará com 2
  // palavras de msm id, com orientações e incidências diferentes.
  
  // Então, eliminaremos uma das palavras repetidas mas, antes de eliminarmos, copiamos as incidências dela
  // para a palavra que ficar.

  // Fazemos isso pois na hora de mostrar pro usuário, não precisa mostrar a orientação,
  // mas sim quantas vezes ele errou ou acertou.

  // Isso é para mostrarmos o mínimo de informações ao usuário, pra não confundir ele.
  // O sistema sim, depois, computará se ele acertou ou errou e em qual orientação.

  // Eliminaremos as palavras repetidas no dominadas_ordem, array que só serve para mostrarmos o resultado aqui
  // na página de término da rodada.

  for (let i = 0; i < dominadas_vai.length; i++) {

    let vezes_encontrou = 0 // Se encontrou mais de 1.
    let array_j_repeticao = []

    for (let j = 0; j < dominadas_ordem.length; j++) {
      if (dominadas_vai[i].id_palavra === dominadas_ordem[j].id_palavra) {
        vezes_encontrou++
        array_j_repeticao.push(j)
      }
    }

    if (vezes_encontrou > 1) {
      dominadas_ordem[array_j_repeticao[0]].qtd_incidencias += Number(dominadas_ordem[array_j_repeticao[1]].qtd_incidencias)
      dominadas_ordem.splice(array_j_repeticao[1], 1)
    }
  }

  // Aqui teríamos que ver também se a palavra acabou de ser dekorada, somando os acertos da rodada com
  // os acertos anteriores, do banco de dados.

  // Se foi a primeira vez, 

  // Agora, aqui abaixo mostraremos as palavras acertadas e erradas ao usuário.
  
  for (let j = 0; j < dominadas_ordem.length; j++) {
    for (let k = 0; k < palavras_curso.length; k++) {
      if (dominadas_ordem[j].id_capitulo == palavras_curso[k].id_capitulo) {
        if (dominadas_ordem[j].id_palavra == palavras_curso[k].vocabulario._id) {

          let qtd_1_2 = 0
          let qtd_2_1 = 0

          let palavra_idioma_1 = ''
          let palavra_idioma_2 = ''

          let simbolo = ''

          if (dominadas_ordem[j].qtd_incidencias > 0) simbolo = `<i class="icon-up-open" style="margin-right: 10px;"></i>`
          if (dominadas_ordem[j].qtd_incidencias < 0) simbolo = `<i class="icon-down-open" style="margin-right: 10px;"></i>`
          // PRecisa de um simbolo neutro aqui, talvez um traço.
          if (dominadas_ordem[j].qtd_incidencias === 0) simbolo = '0'

          let qtd = dominadas_ordem[j].qtd_incidencias
                  
          for (let m = 0; m < palavras_curso[k].vocabulario.idioma_1.length; m++) {
            if (palavras_curso[k].vocabulario.idioma_1[m].tipo === 'palavra') {
              palavra_idioma_1 = palavras_curso[k].vocabulario.idioma_1[m].item
            }
          }

          for (let m = 0; m < palavras_curso[k].vocabulario.idioma_2.length; m++) {
            if (palavras_curso[k].vocabulario.idioma_2[m].tipo === 'palavra') {
              palavra_idioma_2 = palavras_curso[k].vocabulario.idioma_2[m].item
            }
          }

          string += faz_palavras_trabalhadas (palavra_idioma_1, palavra_idioma_2, dominadas_ordem[j].qtd_incidencias, simbolo, dominadas_ordem[j].qtd_incidencias_previas, 'var(--botao_ativo)')

        }
      }
    }
  }
  
  return string
}


let novas_palavras_no_mult = []
async function clicou_resposta (resp_dada, resp_certa, opcao, id_decoreba, id_capitulo_pergunta, id_palavra_pergunta, distancia, avatar, alternativa_clicada, alternativa_correta, idioma_falado, id_usuario, qtd_incidencias_previas) {

  let resp_a = document.getElementById('resp_a').innerHTML
  let resp_b = document.getElementById('resp_b').innerHTML
  let resp_c = document.getElementById('resp_c').innerHTML


  if (resp_dada === resp_certa) {

    respostas_corretas++ // Variável global.

    altera_dominadas (id_decoreba, id_capitulo_pergunta, id_palavra_pergunta, 'acertou', opcao, qtd_incidencias_previas)

    document.getElementById('div_protecao').style.display = 'flex'

    document.getElementById(`resp_${alternativa_clicada}`).style.background = "green"
    document.getElementById(`resp_${alternativa_clicada}`).style.color = "white"
    document.getElementById('span_resp_corretas').innerHTML = respostas_corretas

    if (treino_ou_pra_valer === 'pra_valer') move_barra_progresso_jogo(id_palavra_pergunta, 'mult_esc', 'acertou')

    if (respostas_corretas != meta_corretas || treino_ou_pra_valer === 'treino') {
      
      const certou = new Audio('/mp3/correct-choice-43861.mp3')
      certou.play()

      // Aqui, teria que ver se o recip de alguma palavra recém liberada está sendo mostrado.
      // Se sim, pausa tudo e, só roda o eurekaAleatória quando o usuário fechar a janelinha.
      // Se não, segue o setTimeOut normalmente.

      if (document.getElementById('jogo_recip_palavra_liberada').style.display === 'flex') {

      } else {
        setTimeout(() => {

          const obj_vai = {
            i_capitulo: 1, // 3 é aleatório, gambiarra.
            opcao: opcao,
            id_decoreba: id_decoreba,
            i_capitulo: 1, // 3 é aleatório, gambiarra.,
            id_usuario: id_usuario,
            avatar: avatar,
            distancia: distancia,
            idioma_falado: idioma_falado
          }

          eurekaAleatória(obj_vai, 'mult_esc')

        }, "500")
      }
    }

    if (respostas_corretas === meta_corretas & treino_ou_pra_valer === 'pra_valer') {

      const obj = {
        'id_decoreba': `${id_decoreba}`,
        'id_capitulo': `${id_capitulo_pergunta}`,
        'modalidade': 'multipla_escolha',
        'dominadas_vai' : dominadas_vai,
        'palavras': palavras_mult,
      }
      alert(id_capitulo_pergunta)
      const objeto_veio = await vai_filhao_2 ('atualiza_pontos', JSON.stringify(obj))

      // Aqui deveria vir todas as palavras acertadas na rodada, e caso tenha liberado alguma,
      // deveria vir aqui também.
      // Se alguma foi dekorada nessa rodada, o servidor já faz essa conta, logo, poderia vir para cá.
      // Assim, as palavras dekoradas agora receberiam um efeitozinho especial e, em seguida,
      // o jogo poderia mostrar as palavras novas liberadas, como as cartas do FIFA.

      novas_palavras_no_mult = objeto_veio.novas_palavras_liberadas // Esse novas palavras_no_mult vai pro ...

      // dominadas_str_mult = gera_dominadas_str('mult')
      // dominadas_vai = []

      const audio_venceu_mult = new Audio('/mp3/DFS35BL-win-sound.mp3')
      audio_venceu_mult.play()

      const sim_ou_nao = 'sim'
      setTimeout(async () => {

        // É smartphone. Provavelmente não tem teclado.


        // A linha de baixo está comentada pq estou testando no pc, emulando com as dimensões da janela um smartphone. A linha de baixo é para reconhecer smartphones, não importa o tamanho da janela.

        // if (/Mobi|Android/i.test(navigator.userAgent)) {
        // No não, nunca mostra.
        if (sim_ou_nao === 'nao') {

          document.getElementById('div_protecao').style.display = 'none'
          document.getElementById('jogo_recip_teclado').style.display = 'flex'

        // É notebook ou PC. Provavelmente tem teclado.
        } else {
          respostas_corretas = 0
          if (respostas_erradas > 0) respostas_erradas--
          document.getElementById('div_protecao').style.display = 'none'

          document.getElementById('jogo_recip_checkpoint').style.display = 'flex'

          // Aqui, provavelmente deveria ficar a chamada para o checkpoint.
          // mostrar_resultado('ganhou', id_decoreba, 'mult_esc')
        }

      }, "500")

    }
  }

  if (resp_dada != resp_certa) {
    
    respostas_erradas++

    if (treino_ou_pra_valer === 'pra_valer') move_barra_progresso_jogo(id_palavra_pergunta, 'mult_esc', 'errou')



    altera_dominadas (id_decoreba, id_capitulo_pergunta, id_palavra_pergunta, 'errou', opcao, qtd_incidencias_previas)

    // Altera o DOM.
    document.getElementById('div_protecao').style.display = 'flex'
    document.getElementById(`resp_${alternativa_clicada}`).style.background = "red"
    document.getElementById(`resp_${alternativa_clicada}`).style.color = "white"
    document.getElementById(`resp_${alternativa_correta}`).style.background = "green"
    document.getElementById(`resp_${alternativa_correta}`).style.color = "white"
    document.getElementById('span_resp_erradas').innerHTML = respostas_erradas


    if (respostas_erradas != meta_erradas || treino_ou_pra_valer === 'treino') {

      const audio_errou = new Audio('/mp3/sadwhisle-91469.mp3')
      audio_errou.play()

      setTimeout(() => {

        const obj_vai = {
          i_capitulo: 1, // 3 é aleatório, gambiarra.,
          opcao: opcao,
          id_decoreba: id_decoreba,
          i_capitulo: 1, // 3 é aleatório, gambiarra.,
          id_usuario: id_usuario,
          avatar: avatar,
          distancia: distancia,
          idioma_falado: idioma_falado
        }

        eurekaAleatória(obj_vai, 'mult_esc')

      }, "500")
    }

    if (respostas_erradas === meta_erradas & treino_ou_pra_valer === 'pra_valer') {

      // Grava a decoreba nas decorebas praticadas
      // Calcula o desempenho e compara se foi o melhor, se foi, grava lá.
      // Se completou o capítulo, tem que marcar como 100%. Não precisa pintar agora, só depois quando a parada já estiver funcionando.

      const obj = {
        'id_decoreba': `${id_decoreba}`,
        'modalidade': 'multipla_escolha',
        'dominadas_vai' : dominadas_vai,
        'palavras': palavras_mult
      }

      // Quando a respostas é errada, aí nem precisa atualizar nada, só volta.
      // await vai_filhao_2 ('atualiza_pontos', JSON.stringify(obj))

      // dominadas_str_mult = gera_dominadas_str('mult')
      // dominadas_vai = []

      const audio_perdeu = new Audio('/mp3/wah-wah-sad-trombone-6347.mp3')
      audio_perdeu.play()

      setTimeout(async () => {

        document.getElementById('div_protecao').style.display = 'none'
        completar_dekoreba(`${id_decoreba}`)

        // Aqui mostra a tela de fim de sessão. Mesmo na derrota.
        // mostrar_resultado ('perdeu', id_decoreba, 'mult_esc')

      }, "500")

    }
  }
}

function apertou_startao (id_decoreba) {

  const stateObj = { tela_ativa: 'decoreba_jogo' }

  verifica_url({
    stateObj: stateObj,
    endereco: document.location.href,
    modo_de_vinda: 'mostra_decoreba' // Esse modo_de_vinda tá meio gambiárrico.
  })
  
  /*
  console.log('apertou o stanrtaoaaaaao, abaixo está o pre_jogo')
  console.log(pre_jogo)
  console.log(escolhas_dek)
  console.log("fechou os dois.")
  */


  if (escolhas_dek.modalidade === 'multipla_escolha') {

    console.log("COnfigurações")
    console.log(pre_jogo.i)
    console.log(id_decoreba)
    console.log(pre_jogo.i)
    console.log(pre_jogo.idioma_2)

    const valer_ou_treino = (frase_traduzida === 'sim') ? 'treino' : 'pra_valer'
    carrega_pergunta(`${valer_ou_treino}`, pre_jogo.i, 'aleatoria', `${id_decoreba}`, pre_jogo.i, '66929cac249dc5faa7da9bb5', `${servidor}/imagens/avatar-default.jpg`, 'distancia_curta', pre_jogo.idioma_2, 'primeira_pergunta')
  }

  if (escolhas_dek.modalidade === 'escrita') {
    
    orientacao_idiomas_global = 'aleatoria'
    treino_ou_para_valer = 'pra_valer'
    escolhas_dek.orientacao = 'aleatoria'

    // Gambiarra alert!
    // Essa escolha de alfabetos está setada para alfabetos latinos apenas.
    // Para idiomas com mais de um alfabeto, tem que ver isso aí.
    escolhas_dek["alfabetos_perg"] = ["Abc"]
    escolhas_dek["alfabetos_resp"] = ["Abc"]

    carrega_pergunta_escrita ('pra_valer', 'aleatoria', pre_jogo, 'primeira_pergunta')
  }
  // Sempre o pra_valer será com orientação aleatoria, e o primeiro idioma falado será sempre o 2.
}


// A eurekaAleatória NÃO é ativada na primeira pergunta. Nem na múltipla escolha e nem na escrita.
// Ao responder a primeira pergunta, já ativada em todas as outras.
function eurekaAleatória (obj, modalidade, eh_primeira) {

  // Por enquanto temos apenas 2 orientações.
  const sorteadorDeOrientacoes = Math.floor(Math.random() * 2); // Sorteia entre 0 e 1


  let orientacao
  let idioma_fal

  // Se for treino, continua sempre a msm orientação.
  if (orientacao_idiomas_global != 'aleatoria') {

    // Aqui é uma gambiarra. Quando a modalidade é múltipla escolha, o obj.opcao vem com a orientação,
    // mas quando é escrita, não há esse objeto. Porém, na carrega_pergunta_escrita, setamos a
    // var gloval orientacao_idiomas_global com a orientação da parada, logo, podemos usar essa variável aqui.
    orientacao = (obj.opcao) ? obj.opcao : orientacao_idiomas_global

    if (obj.opcao === '1-2') idioma_fal = pre_jogo.idioma_1
    if (obj.opcao === '2-1') idioma_fal = pre_jogo.idioma_2
    if (obj.opcao === '1-1') idioma_fal = pre_jogo.idioma_1
    if (obj.opcao === '2-2') idioma_fal = pre_jogo.idioma_2

    // Se for pra valer, ai randomiza a orientação manioloo. Coisa linda.
  } else {

    if (sorteadorDeOrientacoes === 0) {
      orientacao = '1-2'
      idioma_fal = pre_jogo.idioma_1
    }
    if (sorteadorDeOrientacoes === 1) {
      orientacao = '2-1'
      idioma_fal = pre_jogo.idioma_2
    }
  }
        
  if (modalidade === 'mult_esc') {

    carrega_pergunta(treino_ou_pra_valer_gam, obj.i_capitulo, orientacao, obj.id_decoreba, obj.i_capitulo, obj.id_usuario, obj.avatar, obj.distancia, idioma_fal)
  }

  if (modalidade === 'escrita') {

    pre_jogo.orientacao_idiomas_global = orientacao
    pre_jogo.idioma_falado_mult = idioma_fal

    if (eh_primeira) carrega_pergunta_escrita(treino_ou_pra_valer_gam, orientacao, obj, 'primeira_pergunta')
    if (!eh_primeira) carrega_pergunta_escrita(treino_ou_pra_valer_gam, orientacao, obj)
  }
}


function calcula_probabilidade (pontuacao) {

  let probabilidade
  if (pontuacao > -9 & pontuacao < -4) probabilidade = 0.9 // de -4 à -3
  if (pontuacao > -5 & pontuacao < 0) probabilidade = 0.7 // de -2 à -1
  if (pontuacao === 0) probabilidade = 0.5 // 0
  if (pontuacao > 0 & pontuacao < 5) probabilidade = 0.3 // de 1 à 2
  if (pontuacao > 4 & pontuacao < 9) probabilidade = 0.1 // de 3 à 4
      
  return probabilidade
}
var obj_veio_cap_praticado = {}
var sequencia_aleatoria = []

var i_sequencia = 0
// Essa função é exclusiva do múltipla escolha.

var curso_mult
var curso_escr

var palavras = []
var titulo_cap_treino_mult = ''
var treino_ou_pra_valer_gam = '' // gam de gambiarra.

var liberadas_mult_global
var liberadas_escr_global

var curso_mult_progr = [] // gambiarra
var curso_escr_progr = [] // gambiarra

var pontuacao_liberadas_rodada = []
var pontuacao_liberadas_escr_rodada = []

var palavras_mult = []

function forma_palavras_mult (cap_praticado, cap_curso, modalidade) {

  const liberada = (frase_traduzida === 'sim') ? 'sim' : 'nao'
  let palavras = []

  const situacao_teste = (eh_teste_global === 'sim') ? 'era_teste_e_nao_testada' : 'nao_era_teste'

  console.log(situacao_teste)
  console.log('situacao_teste acima')

  for (let i = 0; i < cap_curso.vocabulario.length; i++) {

      let encontrou = 'nao'
      let j_encontrado = 0      

      // Aqui é necessário tambémm ver a quantidade de alfabetos que tem a palavra.
      const qtd_sistemas_idioma_1 = pre_jogo.sistemas_escrita_1.length
      const qtd_sistemas_idioma_2 = pre_jogo.sistemas_escrita_2.length

      const orientacoes = ['1-2', '2-1']
      if (qtd_sistemas_idioma_1 > 1) orientacoes.push ('1-1')
      if (qtd_sistemas_idioma_2 > 1) orientacoes.push('2-2') // Idioma 2 sempre será o português, ao menos por enquanto, logo, nunca existirá a orientação 2-2, ao menos por enquanto.

      let pontuacoes_mult = []
      let pontuacoes_escr = []

      for (let j = 0; j < orientacoes.length; j++) {
        pontuacoes_mult.push({ orientacao: orientacoes[j], n_acertos_erros: 0 })
      }

      let palavras_liberadas = (modalidade === 'escrita') ? cap_praticado.palavras_liberadas_escr : cap_praticado.palavras_liberadas_mult 
      for (let j = 0; j < palavras_liberadas.length; j++) {

        if (palavras_liberadas[j].id_palavra == cap_curso.vocabulario[i]._id) {

          encontrou = 'sim'

          pontuacoes_mult = []

          let acertos_mult = 0
          for (let k = 0; k < palavras_liberadas[j].acertos_e_erros.length; k++) {
            pontuacoes_mult.push(palavras_liberadas[j].acertos_e_erros[k])
            acertos_mult += palavras_liberadas[j].acertos_e_erros[k].n_acertos_erros
          }

          let acertos_escr = 0
          for (let k = 0; k < palavras_liberadas[j].acertos_e_erros.length; k++) {
            acertos_escr += palavras_liberadas[j].acertos_e_erros[k].n_acertos_erros
          }

          console.log(`${cap_curso.vocabulario[i].idioma_1[0].item} == ${acertos_escr}`)

          palavras.push({

            situacao_teste: situacao_teste,
            modalidade: modalidade,
            orientacoes: orientacoes,
            pontuacoes: pontuacoes_mult,

            id_palavra: cap_curso.vocabulario[i]._id,
            liberada: 'sim',
            masterizou: cap_praticado.palavras_liberadas_mult[j].masterizou,
            previamente_decorada: 'nao',

            pontuacao_mult_inicio: acertos_mult, // talvez nem precise dessa.
            pontuacao_escr_inicio: acertos_escr,

            probabilidade: calcula_probabilidade(acertos_mult),
            vocabulario: cap_curso.vocabulario[i]
          })
        }
      }

      if (encontrou === 'nao') {

        palavras.push({
          situacao_teste: situacao_teste,

          modalidade: modalidade,
          orientacoes: orientacoes,
          pontuacoes: pontuacoes_mult,

          id_palavra: cap_curso.vocabulario[i]._id,
          liberada: liberada,
          masterizou: 'nao',
          previamente_decorada: 'nao',
          pontuacao_mult_inicio: 0,
          pontuacao_escr_inicio: 0,     

          probabilidade: calcula_probabilidade(0),
          vocabulario: cap_curso.vocabulario[i]
        })
      }
    }

    return palavras
}

function forma_sequencia_aleatoria (palavras_mult) {

  let sequencia_liberadas = []

  for (let i = 0; i < palavras_mult.length; i++) {
    
    // Se for teste, jogamos só não foram testadas ainda, nessa prova.
    if (eh_teste_global === 'sim') {
      if (palavras_mult[i].situacao_teste === 'era_teste_e_nao_testada') sequencia_liberadas.push(i)
    }

    // Se não for teste, somente as liberadas.
    if (eh_teste_global === 'nao') {
      if (palavras_mult[i].liberada === 'sim') sequencia_liberadas.push(i)
    }
  }
  

  let sequencia_aleatoria = []
  let qtd_jah_decoradas = 0 // Para não ir várias vezes seguidas palavras já quase decoradas ou decoradas.

  // Se o sistema tentar umas 15 vezes e não sair uma menor que 7, vai qualquer uma msm.
  let qtd_tentativas_menor_7 = 0
  let qtd_tentativas_prob_maior = 0

  console.log(eh_teste_global)
  console.log("eh_reste cglobal acima")
  console.log(sequencia_liberadas.length)
  console.log("sequencia_liberadas,lenf acima")
  do {

    const i_aleatorio_seq_lib = Math.floor(Math.random() * sequencia_liberadas.length)

    const i_aleatorio = sequencia_liberadas[i_aleatorio_seq_lib]

    const probabilidade_aleatoria = Math.random()

    console.log(palavras_mult)
    console.log('palavras_mult acima')
    let probabilidade_da_sorteada = palavras_mult[i_aleatorio].probabilidade

    const prox_elemento = (probabilidade_da_sorteada > probabilidade_aleatoria) ? palavras_mult[i_aleatorio] : null

   // alert(`${probabilidade_da_sorteada} > ${probabilidade_aleatoria}`)
    if (prox_elemento === null) qtd_tentativas_prob_maior++

    if (prox_elemento != null) {

      // Se for acima de 6, somamos 1 no qtd_jah_decoradas e vida que segue.
      if (palavras_mult[i_aleatorio].pontuacao > 6) qtd_jah_decoradas++


      if (qtd_jah_decoradas < 2) {
        sequencia_aleatoria.push(i_aleatorio)
      } else {

        qtd_tentativas_menor_7 = 0
        qtd_jah_decoradas = 0
        sequencia_aleatoria.push(i_aleatorio)
          
        // ... Tentemos 15 vezes sair uma com pontuação menor que 7 e não conseguirmos. Aí então vai qualquer uma.
        if (qtd_tentativas_menor_7 === 15) sequencia_aleatoria.push(i_aleatorio)
          
      }
    }

    if (qtd_tentativas_prob_maior === 15) sequencia_aleatoria.push(i_aleatorio)
      
  } while (sequencia_aleatoria.length < 125) // Assim que a sequencia_aleatoria tiver 125 elementos, ela estará pronta.
  

  return sequencia_aleatoria
}

function forma_respostas_erradas (i_resposta_certa) {
  // esse do while é importante pq o do no começo já lança um valor pro i_resposta_errada.
    // E o while vê, se o i_resposta_errada for igual à resposta certa, tenta outro i.

    let is_liberadas = []
    for (let i = 0; i < palavras_mult.length; i++) {
      if (palavras_mult[i].liberada === 'sim') is_liberadas.push(i)
    }


    do {
      const i_aleatorio = Math.floor(Math.random() * is_liberadas.length)
      i_resposta_errada_1 = is_liberadas[i_aleatorio]  
    }
    while (i_resposta_errada_1 == i_resposta_certa)

    // Aqui msm coisa, lança um valor aleatorio pro i_resposta_2.
    // Se o i lançado for o mesmo da resposta errada anterior ou o da resposta correta, tenta outro i.
    do {
      const i_aleatorio = Math.floor(Math.random() * is_liberadas.length)
      i_resposta_errada_2 = is_liberadas[i_aleatorio]
    }
    while (i_resposta_errada_2 == i_resposta_certa || i_resposta_errada_2 == i_resposta_errada_1)

    return {
      i_resposta_errada_1: i_resposta_errada_1,
      i_resposta_errada_2: i_resposta_errada_2
    }
}

function forma_embaralha_respostas (arr_respostas) {

  // Criamos mais lets, agora para embaralhar a ordem das respostas.
  // O primeiro recebe um número aleatório dentro do length das respostas.
  // Se forem 3 respostas, de 0 a 2.
  let j_resposta_1 = Math.floor(Math.random() * arr_respostas.length)
  let j_resposta_2 = null
  let j_resposta_3 = null

  // Mesma coisa que nos do whiles anteriores. Se a resposta 2 for igual à primeira, tenta outro i.
  do {
    j_resposta_2 = Math.floor(Math.random() * arr_respostas.length)
  }
  while (j_resposta_2 == j_resposta_1)

  // Aqui denovo, mesma coisa.
  do {
    j_resposta_3 = Math.floor(Math.random() * arr_respostas.length)
  }
  while (j_resposta_3 == j_resposta_2 || j_resposta_3 == j_resposta_1)

  return {
    j_resposta_1: j_resposta_1,
    j_resposta_2: j_resposta_2,
    j_resposta_3: j_resposta_3
  }
}

function forma_recip_resposta (alfabetos_rodada_resp, palavra_resp, idioma_falado_resp) {

  let arquivo_resp, resposta_string = ''

  console.log("Qtd alfabetos das respostas: " + alfabetos_rodada_resp.length)
  console.log("Sendo eles: ")
  console.log(alfabetos_rodada_resp)

  console.log("palavra_resp abaixo")
  console.log(palavra_resp)
  for (let i = 0; i < alfabetos_rodada_resp.length; i++) {
       for (let k = 0; k < palavra_resp.length; k++) {
      if (alfabetos_rodada_resp[i] === palavra_resp[k].sistema_escrita & palavra_resp[k].tipo === 'palavra') {

          // O hífen só vai ser mostrado se os termos forem mostrados também, ou algo assim.
          const hifen = (k > 0 & k < palavra_resp.length - 1) ? " - " : ""

          const descricao = (palavra_resp[k].descricao) ? palavra_resp[k].descricao : ''
          const pergunta = `<span>${palavra_resp[k].item}</span><span class="span_desc_jogo">${descricao}</span>`

          let i_resp_certo = acha_alfabeto_principal(idioma_falado_resp, palavra_resp)

          arquivo_resp = palavra_resp[i_resp_certo].arquivo
          resposta_string += '' + pergunta
      }
    }
    
  }

  return { arquivo_resp: arquivo_resp, resposta_string: resposta_string }
}

var frase_traduzida = 'nao'
var cap_praticado_frase = null
var cap_curso_frase = null
var id_capitulo_jogado // Gambiarra safada.

async function carrega_pergunta (tipo_rodada, i, opcao, id_decoreba, i_capitulo, id_usuario, avatar, distancia, idioma_falado, primeira_pergunta) {

  orientacao_global = opcao // Var global, gambz mas funfa.
  eh_teste_global = 'nao' // Reseta essa var global pq, múltipla escolha nunca é teste.

  let id_capitulo_pergunta = ''
  let id_palavra_pergunta = ''

  // o argumento primeira_pergunta só existe quando é, de fato, a primeira pergunta, logo...
  if (primeira_pergunta) {


    orientacao_idiomas_global = opcao  // GAMBIARRA!!! Essa var, creio, nem deveria mais existir.
    if (orientacao_idiomas_global === 'aleatoria') opcao = '2-1' // A primeira do aleatória sempre é 2-1.
    if (orientacao_idiomas_global === 'aleatoria') idioma_falado = pre_jogo.idioma_2 // Tem que ser o 2, pois na linha acima, a opção virou 2-1.

    orientacao_global = opcao // Essa aqui menos ainda.

    // Meio gambiarra pq já devia estar tudo zerada aqui, mas quando sai do treino de multiplas
    // parece que elas não zeram automaticamente. Waréva.
    respostas_corretas = 0
    respostas_erradas = 0
    i_sequencia = 0
    treino_ou_pra_valer_gam = tipo_rodada
    
    document.body.style.overflow = 'auto' // Destrava a tela travada das opções popup de antes do jogo.]

    // Aqui temos que atualizar as opções do pré-jogo do usuário no banco de dados, nas decorebas_praticadas.
    // Acredito que o ideal aqui é ter um pré-processador antes de vir pra cá, pra salvar lá as paradas, carregar o que tiver que carregar, talvez uma configuração com as palavras mais erradas pro usuário, pra ele treinar mais elas, sei lár.
    // Mas por enquanto, tá valendo.

    /*
    if (frase_traduzida === 'sim') {
      
    }
    */
    const obj = {
      id_decoreba: id_decoreba,
      i_capitulo: pre_jogo.i_capitulo,
      modalidade: 'multipla_escolha',
      orientacao: opcao
    }

    obj_veio_cap_praticado = await vai_filhao_2('escolhas_decoreba', JSON.stringify(obj))

    cor_decoreba_jogo = obj_veio_cap_praticado.cor_decoreba

    const cap_praticado = (frase_traduzida === 'sim') ? cap_praticado_frase : obj_veio_cap_praticado.cap_praticado
    const cap_curso = (frase_traduzida === 'sim') ? cap_curso_frase : obj_veio_cap_praticado.cap_curso
    
    id_capitulo_jogado = obj_veio_cap_praticado.cap_curso._id
    palavras_mult = forma_palavras_mult(cap_praticado, cap_curso, 'mult_esc') // Função meio grande.

    sequencia_aleatoria = forma_sequencia_aleatoria(palavras_mult) // Array com i's liberados do palavras_mult.
  }

  // escolhas_dek.alfabetos_perg sempre estará associado ao pre_jogo.idioma_1
  // escolhas_dek.alfabetos_resp sempre estará associado ao pre_jogo.idioma_2
  // Temos então a opção '1-2', '2-1', '1-1', '2-2'

  // perg e resp serão sempre para 1-2, ou 1-1. Para 2-1 teríamos que inverter

  // Escolhemos um 1 aleatório do capítulo todo.
  let i_aleatorio = sequencia_aleatoria[i_sequencia]
  i_sequencia++ // 

  let pergunta = '' // Parece que a pergunta vai sempre vir do idioma_1. Não entendi.
  for (let j = 0; j < palavras_mult[i_aleatorio].vocabulario.idioma_1.length; j++) {

    if (palavras_mult[i_aleatorio].vocabulario.idioma_1[j].tipo === 'palavra') {

      id_capitulo_pergunta = id_capitulo_jogado // NÃO TEM ESSA PARADA.
      id_palavra_pergunta = palavras_mult[i_aleatorio].vocabulario._id
      pergunta = palavras_mult[i_aleatorio].vocabulario.idioma_1[j].item
    }
  }

  const palavra = palavras_mult[i_aleatorio].vocabulario

  // Precisamos agora saber quanto falta para completarmos as respostas certas para essa pergunta.

  // Enviamos o i_aleatório pois ele é o i da resposta certa, já que é o msm i da pergunta.
  const retorna_respostas_erradas = forma_respostas_erradas(i_aleatorio) // Volta 2 Is de respostas erradas.

  const i_resposta_certa = i_aleatorio
  const i_resposta_errada_1 = retorna_respostas_erradas.i_resposta_errada_1
  const i_resposta_errada_2 = retorna_respostas_erradas.i_resposta_errada_2

  // Criamos essa arraya e colocamos os is anteriores aqui, para depois embaralharmos-lhos.
  const array_respostas = [i_resposta_certa, i_resposta_errada_1, i_resposta_errada_2]
  arr_respostas = array_respostas

  const respostas_embaralhadas = forma_embaralha_respostas(array_respostas)

  // Criamos mais lets, agora para embaralhar a ordem das respostas.
  const j_resposta_1 = respostas_embaralhadas.j_resposta_1
  const j_resposta_2 = respostas_embaralhadas.j_resposta_2
  const j_resposta_3 = respostas_embaralhadas.j_resposta_3


  let id_pergunta = palavras_mult[i_aleatorio].vocabulario._id
  
  // Se o idioma da pergunta tem apenas o alfabeto latino, o pergunta_max_acertos deverá ser 16
  // pois seriam 4 acertos para cada modalidade. Ou seja...
  const qtd_incidencias_previas_perg = palavras_mult[i_aleatorio].pontuacao_mult // essa const vai rodar o código.

  let perguntas_atuais_acertos = 0

  for (let k = 0; k < palavras_mult[i_aleatorio].pontuacoes.length; k++) {
    perguntas_atuais_acertos += palavras_mult[i_aleatorio].pontuacoes[k].n_acertos_erros
  }

  let largura_porc_palavra = perguntas_atuais_acertos * 100 / 8

  let modalidade = ''
  if (escolhas_dek.modalidade === 'multipla_escolha') modalidade = 'Múltipla Escolha <i class="icon-multiplas_escolhas"></i>'
  if (escolhas_dek.modalidade === 'escrita') modalidade = 'Escrita'

  let string_orientacao, palavra_pergunta, palavra_resp_1, palavra_resp_2, palavra_resp_3 = null

  if (opcao == '1-1') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_1

    palavra_resp_1 = palavras_mult[arr_respostas[j_resposta_1]].vocabulario.idioma_1
    palavra_resp_2 = palavras_mult[arr_respostas[j_resposta_2]].vocabulario.idioma_1
    palavra_resp_3 = palavras_mult[arr_respostas[j_resposta_3]].vocabulario.idioma_1
  }

    if (opcao == '2-2') {
      string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_2}`
      palavra_pergunta = palavra.idioma_2

      palavra_resp_1 = palavras_mult[arr_respostas[j_resposta_1]].vocabulario.idioma_2
      palavra_resp_2 = palavras_mult[arr_respostas[j_resposta_2]].vocabulario.idioma_2
      palavra_resp_3 = palavras_mult[arr_respostas[j_resposta_3]].vocabulario.idioma_2
    }

    if (opcao == '1-2') {
      string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_2}`
      palavra_pergunta = palavra.idioma_1

      palavra_resp_1 = palavras_mult[arr_respostas[j_resposta_1]].vocabulario.idioma_2
      palavra_resp_2 = palavras_mult[arr_respostas[j_resposta_2]].vocabulario.idioma_2
      palavra_resp_3 = palavras_mult[arr_respostas[j_resposta_3]].vocabulario.idioma_2
    }

    if (opcao == '2-1') {
      string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_1}`
      palavra_pergunta = palavra.idioma_2

      palavra_resp_1 = palavras_mult[arr_respostas[j_resposta_1]].vocabulario.idioma_1
      palavra_resp_2 = palavras_mult[arr_respostas[j_resposta_2]].vocabulario.idioma_1
      palavra_resp_3 = palavras_mult[arr_respostas[j_resposta_3]].vocabulario.idioma_1
    }
    
    // A palavra em todos os alfabetos contém o mesmo arquivo de áudio, logo, o 0 serve para todos.

    const idioma_falado_simples = simplifica_idioma(idioma_falado)
    const idioma_falado_resp = (pre_jogo.idioma_1 === idioma_falado) ? pre_jogo.idioma_2 : pre_jogo.idioma_1
    const idioma_falado_resp_simples = simplifica_idioma(idioma_falado_resp)

    console.log(palavra_resp_1)


    const i_certo = acha_alfabeto_principal(idioma_falado, palavra_pergunta)
    const arquivo_audio = palavra_pergunta[i_certo].arquivo

    // Aqui vamos de gambiarra!
    // Não era para ser assim, mas como tá bugando e por agora só teremos um alfabeto mesmo, dá bom.
    
    if (!escolhas_dek.alfabetos_perg.length) {
      escolhas_dek.alfabetos_perg.push('Abc')
      escolhas_dek.alfabetos_resp.push('Abc')
    }


    // Não sei bem pq aqui inverte as paradas, mas funciona.
    // Essa parada do treino ser com escolhas_dek e o pra_valer com pre_jogo tá uma bagunça.
    let alfas_perg = (tipo_rodada === 'pra_valer') ? pre_jogo.sistemas_escrita_1 : escolhas_dek.alfabetos_resp
    let alfas_resp = (tipo_rodada === 'pra_valer') ? pre_jogo.sistemas_escrita_2 : escolhas_dek.alfabetos_perg

    const qtd_alfabetos_perg = (opcao === '2-1') ? alfas_resp.length : alfas_perg.length
    let alfabetos_rodada_perg = []
    for (let i = 0; i < qtd_alfabetos_perg; i++) {

      if (opcao != '2-1') {

        if (tipo_rodada === 'pra_valer') alfabetos_rodada_perg.push(alfas_perg[i].sistema)
        if (tipo_rodada === 'treino') {
          const sis_esc = reconhece_sist_escrita(alfas_perg[i])
          alfabetos_rodada_perg.push(sis_esc)
        }

      } else {
        if (tipo_rodada === 'pra_valer') alfabetos_rodada_perg.push(alfas_resp[i].sistema)
        if (tipo_rodada === 'treino') {
          const sis_esc = reconhece_sist_escrita(alfas_resp[i])
          alfabetos_rodada_perg.push(sis_esc)
        }
      }    
    }

    let alfabetos_rodada_resp = []
    const qtd_alfabetos_resp = (opcao === '2-1') ? alfas_perg.length : alfas_resp.length
    for (let i = 0; i < qtd_alfabetos_resp; i++) {

      if (opcao != '2-1') {

        if (tipo_rodada === 'pra_valer') alfabetos_rodada_resp.push(alfas_resp[i].sistema)
        if (tipo_rodada === 'treino') {
          const sis_esc = reconhece_sist_escrita(alfas_resp[i])
          alfabetos_rodada_resp.push(sis_esc)
        }
      } else {

        if (tipo_rodada === 'pra_valer') alfabetos_rodada_resp.push(alfas_perg[i].sistema)
        if (tipo_rodada === 'treino') {
          const sis_esc = reconhece_sist_escrita(alfas_perg[i])
          alfabetos_rodada_resp.push(sis_esc)
        }
      }
    }
    


    let recip_perguntas = ''
    let bandeira = volta_bandeira(idioma_falado, 35, 0) // talvez dê pra tirar esse aqui.


    for (let i = 0; i < alfabetos_rodada_perg.length; i++) {
        bandeira = (i != alfabetos_rodada_perg.length - 1) ? '' : volta_bandeira(idioma_falado, 35, 0)

        for (let j = 0; j < palavra_pergunta.length; j++) {
          console.log(`${alfabetos_rodada_perg[i]} === ${palavra_pergunta[j].sistema_escrita} // ${palavra_pergunta[j].tipo}`)
          if (alfabetos_rodada_perg[i] === palavra_pergunta[j].sistema_escrita & palavra_pergunta[j].tipo === 'palavra') {

            let estilo_palavra = ''
            if (palavra_pergunta[j].sistema_escrita === 'arabe') estilo_palavra = 'style="font-size: 30pt;"'

            const descricao = (palavra_pergunta[j].descricao) ? palavra_pergunta[j].descricao : ''
            const pergunta = `<span ${estilo_palavra}>${palavra_pergunta[j].item}</span><span style="margin-left: 15px; color: grey; font-style: italic; font-size: 18px;">${descricao}</span>`

            recip_perguntas += `<div class="flex_row center" class="span_desc_jogo">${pergunta}</div><div style="margin-left: 10px;">${bandeira}</div>`
          }
        }
      }
    

    pergunta_escrita = recip_perguntas
   

    const respostas_1_resultados = forma_recip_resposta(alfabetos_rodada_resp, palavra_resp_1, idioma_falado_resp)
    const resposta_string_1 = respostas_1_resultados.resposta_string
    const arquivo_resp_1 = respostas_1_resultados.arquivo_resp

    const respostas_2_resultados = forma_recip_resposta(alfabetos_rodada_resp, palavra_resp_2, idioma_falado_resp)
    const resposta_string_2 = respostas_2_resultados.resposta_string
    const arquivo_resp_2 = respostas_2_resultados.arquivo_resp

    const respostas_3_resultados = forma_recip_resposta(alfabetos_rodada_resp, palavra_resp_3, idioma_falado_resp)
    const resposta_string_3 = respostas_3_resultados.resposta_string
    const arquivo_resp_3 = respostas_3_resultados.arquivo_resp



    let letra_certa
    if (arr_respostas[j_resposta_1] === i_resposta_certa) letra_certa = "a"
    if (arr_respostas[j_resposta_2] === i_resposta_certa) letra_certa = "b"
    if (arr_respostas[j_resposta_3] === i_resposta_certa) letra_certa = "c"

    // Desenhamos a pergunta, os botões das respostas, o placar e o botão Voltar.
    // Botamos tudo isso em uma constante.

    const fonte_mp3 = `./mp3/${idioma_falado_simples}/${arquivo_audio}.mp3`

    const fonte_mp3_resp_1 = `./mp3/${idioma_falado_resp_simples}/${arquivo_resp_1}.mp3`
    const fonte_mp3_resp_2 = `./mp3/${idioma_falado_resp_simples}/${arquivo_resp_2}.mp3`
    const fonte_mp3_resp_3 = `./mp3/${idioma_falado_resp_simples}/${arquivo_resp_3}.mp3`

    treino_ou_pra_valer = tipo_rodada
    const classe_treino_valer_pontos_mult = (treino_ou_pra_valer === 'treino') ? 'sumido' : ''

    // diurno_noturno é uma var grobal.
    // Essa mudança de cor_barrinha_progresso e listra_porc_atividade se repetem no mult_esc e na escrita.
    // Dá pra modularizar isso em uma funçãozinha.
    let cor_dekoreba_inativa = ''
    if (diurno_noturno === 'diurno') {
      cor_dekoreba_inativa = tinycolor(cor_decoreba_jogo).lighten(20).desaturate(35).toString()
    }
    if (diurno_noturno === 'noturno') {
      cor_dekoreba_inativa = tinycolor(cor_decoreba_jogo).darken(20).desaturate(35).toString()
    }

    let cor_barrinha_progresso = (treino_ou_pra_valer === 'treino') ? cor_dekoreba_inativa : 'var(--botao_ativo)'
    let listra_porc_atividade = (treino_ou_pra_valer === 'treino') ? 'listra_porc_inativa' : 'listra_porc_ativa'

    const funcao_abre_perguntas = () => { eurekaAleatória(pre_jogo, 'escrita', 'primeira_sim') }

    i = pre_jogo.i_capitulo
    titulo_cap_treino_mult = stri[i].titulo

    // Devemos enviar também a qtd prévia da barrinha de progresso da palavra em questã.
    const string_exercicio = `
      <audio id="audio_palavra" autoplay>
        <source src="${fonte_mp3}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

      <audio id="audio_resp_1">
        <source src="${fonte_mp3_resp_1}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

      <audio id="audio_resp_2">
        <source src="${fonte_mp3_resp_2}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

      <audio id="audio_resp_3">
        <source src="${fonte_mp3_resp_3}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

      <audio id="blop">
        <source src="./mp3/Blop-Mark_DiAngelo-79054334.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>


      <div id="div_finalizou" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5); z-index: 101; padding: 15px;">

        <div class="flex_col T1 largura_interna" style="padding: 15px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background: var(--fundo_carta); box-shadow: 0px 0px 2px #adadad; overflow-y: auto; max-height: 100%; ">

          <!-- Estamos na Múltipla Escolha -->
          <div id="finalizou_msg" class="flex_row T1 center" style="margin-top: 10px; margin-bottom: 20px;"></div>

          <div id="recip_palavras_liberadas" class="flex_col T1 fundo_nivel_resultados_lib sumido">

            <div class="flex_row T1 center" style="margin-bottom: 10px; font-weight: bold; margin-top: 15px;">NOVAS PALAVRAS LIBERADAS</div>

            <div id="div_interno_palavras_liberadas" class="flex_col T1 center">
             
            </div>

          </div>

          <div class="flex_row flex_col_m T1" style="">

            <div id="recip_recip_resu_mult" class="flex_col T1 fundo_nivel_resultados sumido">
              <div style="margin-bottom: 10px; font-weight: bold;">Múltipla Escolha</div>

              <div id="recip_progresso_pal_mult" class="flex_col T1 center">


              </div>

            </div>

            <div id="recip_recip_resu_escr" class="flex_col T1 fundo_nivel_resultados sumido">
              <div style="margin-bottom: 10px; font-weight: bold;">Escrita</div>
              
              <div id="recip_progresso_pal_escr" class="flex_col T1">

              </div>
              
            </div>
          </div>



          <div class="flex_col T1 sumido" style="">
            <div style="margin-bottom: 10px; font-weight: bold;">PONTUAÇÃO DAS PALAVRAS</div>

            <div id="div_palavras_pontuacoes" class="flex_col T1">
              <div><span style="margin-right: 10px;">5</span>Vish</div>
              <div><span style="margin-right: 10px;">10</span>Maria</div>
            </div>
            

          </div>

          
          <div class="flex_row T1 sumido" style="margin-top: 25px; font-size: 15pt;">
            Nível 7
          </div>
          <div class="flex_row T1 sumido" style="background: #e0e0e0; min-height: 5px; padding: 4px; border-radius: 10px; margin-top: 5px;">
            <span id="span_porcentagem__1_2" style="background: #b44efc; min-height: 7px; border-radius: 7px; width: 40%;"></span>
          </div>

          <div class="flex_row T1 sumido" style="margin-top: 25px; font-size: 15pt; justify-content: flex-end;">
            15/200
          </div>

          <div class="flex_row T1 center">
            <button class="flex_row center botao bot_ativo" style="max-width: 200px; height: 50px;" onclick="completar_dekoreba('${id_decoreba}')">Parar Por Aqui</button>

            <button class="flex_row center botao bot_ativo" style="max-width: 200px; height: 50px;" onclick="(${funcao_abre_perguntas.toString()})()">Modo Escrita</button>
          </div>


        </div>
      </div>


      
      <div class="flex_col T1 center largura_interna fundo_prancheta cartinha_jogo" style="padding: 0px; max-width: 900px; background: var(--fundo_carta);">

        <div class="flex_col T1 largura_interna mostra_topo_decoreba center" style="">

          <span class="exclusivo_pc" style="font-size: 40px; margin-top: 30px; margin-left: 30px;">${pre_jogo.titulo}</span>
          <span class="exclusivo_pc" style="font-size: 20px; margin-left: 30px; margin-top: 5px;">${pre_jogo.titulo_capitulo}</span>

        </div>

        <div class="flex_row T1 center" style="max-width: 300px;">
          <!-- eoeoeoo -->
          <!-- mult_esc -->
          <div id="jogo_div_listra_progresso_mult" class="flex_row T1 listra_porcentagem ${listra_porc_atividade}" style="cursor: pointer;">

           <span id="jogo_lista_progresso_mult" class="interior_listra_porcentagem" style="width: ${largura_porc_palavra}%; height: 10px; background: ${cor_barrinha_progresso}; min-height: 5px; border-radius: 7px;"></span>
           </div>
           
        </div>


        <div class="flex_row center">
          <div class="flex_row center" style="font-size: 30px; margin: 15px; flex-wrap: wrap;">
            ${pergunta_escrita}
          </div>
          <br>
          <div class="flex_row center botao" style='color: var(--color_site); background: var(--background_site); margin-left: 15px;' onclick="document.getElementById('audio_palavra').play();"><i class="icon-volume"></i></div>
          </div>

          <div class="flex_row T1 center">
            <button id="resp_a" class="botao T1 botao_resposta bot_inativo botao_mult botao_descelecionado" style="flex-wrap: wrap;" onclick='clicou_resposta(${arr_respostas[j_resposta_1]}, ${i_resposta_certa}, "${opcao}", "${id_decoreba}", "${id_capitulo_pergunta}", "${id_palavra_pergunta}", "${distancia}", "${avatar}", "a", "${letra_certa}", "${idioma_falado}", "${id_usuario}", ${qtd_incidencias_previas_perg})'>${resposta_string_1}</button>
            <div class="flex_row center botao" style='color: var(--color_site); background: var(--background_site); margin-left: 0px;' onclick="document.getElementById('audio_resp_1').play();"><i class="icon-volume"></i>
            </div>
          </div>

          <div class="flex_row T1 center">
            <button id="resp_b" class="botao T1 botao_resposta bot_inativo botao_mult botao_descelecionado" style="flex-wrap: wrap;" onclick='clicou_resposta(${arr_respostas[j_resposta_2]}, ${i_resposta_certa}, "${opcao}", "${id_decoreba}", "${id_capitulo_pergunta}", "${id_palavra_pergunta}", "${distancia}", "${avatar}", "b", "${letra_certa}", "${idioma_falado}", "${id_usuario}",  ${qtd_incidencias_previas_perg})'>${resposta_string_2}</button>
            <div class="flex_row center botao" style='color: var(--color_site); background: var(--background_site); margin-left: 0px;' onclick="document.getElementById('audio_resp_2').play();"><i class="icon-volume"></i>
            </div>
          </div>

          <div class="flex_row T1 center">
            <button id="resp_c" class="botao T1 botao_resposta bot_inativo botao_mult botao_descelecionado" style="flex-wrap: wrap;" onclick='clicou_resposta(${arr_respostas[j_resposta_3]}, ${i_resposta_certa}, "${opcao}", "${id_decoreba}", "${id_capitulo_pergunta}", "${id_palavra_pergunta}", "${distancia}", "${avatar}", "c", "${letra_certa}", "${idioma_falado}", "${id_usuario}",  ${qtd_incidencias_previas_perg})'>${resposta_string_3}</button>
            <div class="flex_row center botao" style='color: var(--color_site); background: var(--background_site); margin-left: 0px;' onclick="document.getElementById('audio_resp_3').play();"><i class="icon-volume"></i>
            </div>
          </div>

          <div class="flex_row sumido" style="position: fixed; right: 0;">
       
            <div class="flex_col center" style="height: 200px;">

            <i class="fa-solid fa-volume-high" style="font-size: 20px; margin-bottom: 50px; color: grey;"></i> 
            <input type="range" class="slider" style="margin-top: 0px;"/>

            <i class="fa-solid fa-volume-xmark" style="font-size: 20px; margin-top: 50px; color: grey;"></i> 
          </div>

        </div>


        <div class="flex_row T1" style="max-width: 900px; border-radius: 15px; margin-top: 25px;  min-width: 200px; border-radius: 0px; border-bottom-right-radius: 30px; border-bottom-left-radius: 30px; padding: 0px; ">

          <div class="flex_row T1 center" style="color: var(--color_site); margin-top: 15px; margin-bottom: 30px; padding: 0px;">

            <div style="font-size: 22px; margin-right: 5px;"><i class="icon-ok" style="color: green;"></i>: <span id="span_resp_corretas">${respostas_corretas}</span> <span class="${classe_treino_valer_pontos_mult}">/ ${meta_corretas}</span>
            </div>

            <div style="font-size: 22px; margin-left: 5px;"><i class="icon-cancel" style="color: red;"></i>: <span id="span_resp_erradas">${respostas_erradas}</span> <span class="${classe_treino_valer_pontos_mult}">/ ${meta_erradas}</span>
            </div>

          <div>

        </div>
           
        <button class="botao bot_ativo" style="margin: 5px; margin-left: 25px;" onclick='monta_decoreba_mostra("${id_decoreba}")'>Voltar</button>

      </div>      

    </div>
      
  </div>
  `

  const sem_teclado_png = (diurno_noturno === 'diurno') ? 'sem_teclado_preto.png' : 'sem_teclado_branco.png'
  // alert(sem_teclado_png)
  // Inserimos a variável no palco meu.
  const palco = document.getElementById('div_palco_index')

  const eur = () => { eurekaAleatória(pre_jogo, 'escrita', 'primeira_sim') }

  let cor_barrinha_progresso_resultado = 'var(--botao_ativo)'
  let listra_porc_atividade_resultado = 'listra_porc_ativa'
  let largura_porc_palavra_resultado = 50;

  palco.innerHTML = `

    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div>

    <div id="jogo_recip_checkpoint" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_checkpoint('mult_esc')"></i> 
        </div>

        <div class="flex_col T1 center caixinha_dentro" style="">
          CHECKPOINT!<br>
          Seu progresso foi salvo.<br>

        </div>

      </div>
      
    </div> 
    

    <div id="jogo_recip_palavra_liberada" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_palavra_liberada()"></i> 
        </div>

        <div id="jogo_palavra_liberada_dentro" class="flex_col T1 center caixinha_dentro" style="">

        </div>

      </div>
      
    </div> 

    <div id="jogo_recip_teclado" class="flex_col T1 center mostra_recip_info sumido" style="">

      <div id="jogo_info_teclado" class="flex_col T1 mostra_info_caixinha_2">

        <div class="flex_col T1 center" style="padding: 15px;">

          <img src="../imagens/${sem_teclado_png}" style="max-width: 200px; margin-top: 25px;">
          
          <div class="flex_row T1" style="margin-top: 25px;">Para completar a próxima etapa será preciso escrever.</div>
          <div class="flex_row T1" style="margin-top: 10px;">Recomendamos violentamente realizar o restante do exercício em um teclado de computador, mas se você acha que dá conta com a telinha do celular/tablet... </div>

          <span style="margin-top: 25px; font-weight: bold;">Deseja continuar pelo celular/tablet?</span>
          
          <div class="flex_row T1 center">
            <div class="flex_row center botao bot_ativo" onclick="mostrar_resultado('ganhou', '${id_decoreba}', 'mult_esc')">Parar</div>
            <div class="flex_row center botao bot_ativo" onclick="(${eur.toString()})()">Continuar</div>
          </div>
          
        </div>

      </div>
    </div>


    <div id="div_protecao" class="flex_row T1 sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.0); z-index: 100;">
    </div>

    <div id="jogo_recip_info_palavra" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div id="jogo_info_palavra" class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_info_palavra()"></i> 
        </div>

        <div id="jogo_info_palavra_dentro" class="flex_col T1 center caixinha_dentro" style="">

        </div>

      </div>
      
    </div> 


    <div id="recip_pergunta" class="flex_col center T1 decoreba_jogo_recip" style="background: var(--background_site); background-position: center; position: relative; padding: 20px;">

      <div class="flex_row T1 largura_interna sumido" style="margin-top: -15px; padding-left: 15px; color: grey;">
        <i>
          <span>${modalidade}</span>
          <span style="margin-left: 20px;">${string_orientacao}</span>
        </i>
      </div>
      
      ${string_exercicio}

      <div style="flex_row T1 center" style="font-size: 17px; background: red; margin-top: 25px; margin-bottom: -25px;">
      </div>

    </div>
  `
  window.scrollTo(0, 0)

  if (avatar === 'sem_avatar_pois_usuario_nao_esta_logado') {

    document.getElementById('div_cabecalho_lento').innerHTML = cabecalho_deslogado
    document.getElementById('recip_pergunta').style.marginTop = '50px'

  }
  checa_online()

    const buttons = document.querySelectorAll(".botao_mult");

    let currentIndex = (currentIndex_global != 0) ? currentIndex_global : 0

    // Adiciona um foco inicial ao primeiro botão
    buttons[currentIndex].focus();

    // Sempre clicar ou pra cima ou pra baixo, para ativar o brilho em volta do selecionado.
    

    // Trocamos as classes.
    if (jogo_nav_teclado === 'sim') {
      for (let j = 0; j < buttons.length; j++) {
          if (j != currentIndex) {
            buttons[j]
            troca_classe (buttons[j], 'botao_selecionado', 'botao_descelecionado')
          }
          if (j === currentIndex) {
            troca_classe (buttons[j], 'botao_descelecionado', 'botao_selecionado')
          }
        }
    }


   

// Adicione um event listener para o clique no botão
document.addEventListener('click', function (event) {
    const button = document.querySelector('#meuBotao');

    // Verifica se o botão clicado foi o alvo e se não foi um clique simulado
    if (event.target === button && !button.classList.contains('simulated-click')) {
        console.log('Clique manual detectado');
        // Lógica adicional para o clique manual (se necessário)
    }

    // Remove a classe de clique simulado após qualquer clique
    if (button) {
        button.classList.remove('simulated-click');
    }
});


// Começa no não. Se o usuário clica 8, 5 ou 2, essa let muda para 'sim', assim, o sistema
// reconhece apenas um clique, e não trocentos, um seguido do outro.
let clicou_nos_number = 'nao'
document.addEventListener("keydown", (event) => {

if (event.key === 'Enter' || event.key === ' ') {

  if (clicou_nos_number === 'nao') {


          clicou_nos_number = 'sim'

        const activeElement = document.activeElement;

        // Verifica se o elemento ativo é um botão
        if (activeElement && activeElement.tagName === 'BUTTON') {
            event.preventDefault(); // Impede o clique automático do Enter
     let button
          if (currentIndex === 0) button = document.querySelector('#resp_a'); // Substitua pelo seletor do seu botão
          if (currentIndex === 1) button = document.querySelector('#resp_b'); // Substitua pelo seletor do seu botão
          if (currentIndex === 2) button = document.querySelector('#resp_c'); // Substitua pelo seletor do seu botão
          

              if (button) button.click(); // Simula o clique no botão 

        }


            // Simula um clique no botão atualmente focado
           // buttons[currentIndex].click(); // Se descomentar essa linha, ao clicar o enter, clica um monte de respostas seguidas.


     

          // const button = document.querySelector('#resp_c'); // Substitua pelo seletor do seu botão
          // if (button) button.click(); // Simula o clique no botão 
        }
      }
  if (event.key === '8' & clicou_nos_number === 'nao') {
    clicou_nos_number = 'sim' 
    const button = document.querySelector('#resp_a'); // Substitua pelo seletor do seu botão
    if (button) button.click(); // Simula o clique no botão

  }
        
  if (event.key === '5' & clicou_nos_number === 'nao') {
    clicou_nos_number = 'sim'
    const button = document.querySelector('#resp_b'); // Substitua pelo seletor do seu botão
    if (button) button.click(); // Simula o clique no botão
  }
    
  if (event.key === '2' & clicou_nos_number === 'nao') {
    clicou_nos_number = 'sim'
    const button = document.querySelector('#resp_c'); // Substitua pelo seletor do seu botão
    if (button) button.click(); // Simula o clique no botão 
  }


  if (event.key === "ArrowDown") {

        jogo_nav_teclado = 'sim' // var global

        // Mover para o próximo botão
        currentIndex = (currentIndex + 1) % buttons.length;
        buttons[currentIndex].focus();

        // Trocamos as classes.
        for (let j = 0; j < buttons.length; j++) {
          if (j != currentIndex) {
            buttons[j]
            troca_classe (buttons[j], 'botao_selecionado', 'botao_descelecionado')
          }
          if (j === currentIndex) {
            troca_classe (buttons[j], 'botao_descelecionado', 'botao_selecionado')
          }
        }

      } else if (event.key === "ArrowUp") {

        jogo_nav_teclado = 'sim' // var global

            // Mover para o botão anterior
            currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[currentIndex].focus();

            // Trocamos as classes.
            for (let j = 0; j < buttons.length; j++) {
              if (j != currentIndex) {
                buttons[j]
                troca_classe (buttons[j], 'botao_selecionado', 'botao_descelecionado')
              }
              if (j === currentIndex) {
                troca_classe (buttons[j], 'botao_descelecionado', 'botao_selecionado')
              }
            }
            
        } 

        currentIndex_global = currentIndex
    });



    // Seleciona o botão
    let listra_progresso = document.getElementById("jogo_div_listra_progresso_mult");

    // Adiciona o evento de clique passando o objeto corretamente
    listra_progresso.addEventListener("click", function() {
      // Por enquanto tá comentada, mas a função abaixo funciona.
        // mostra_info_palavra(palavra, idioma_falado);  // Passa o objeto diretamente
    });
}


var dominadas_str_mult = ''
var dominadas_str_escr = ''
let str_palavras_liberadas = ''

var palavras_totais_liberadas = []
var str_palavras_novas_liberadas = ''

var novas_palavras_no_escr = []


async function encerra_teste (id_decoreba, id_capitulo) {

        const objeto = {
          'id_decoreba': `${id_decoreba}`,
          'id_capitulo': `${id_capitulo}`,
          'modalidade': 'escrita',
          'dominadas_vai' : dominadas_vai,
          'palavras': palavras_mult
        }
        
        const objeto_veio = await vai_filhao_2 ('atualiza_pontos', JSON.stringify(objeto))

/*

  // Aqui temos que upar todas as palavras, acertadas e erradas, para o servidor.
  const objeto_vai = {
    'id_decoreba': id_decoreba,
    'id_capitulo': id_capitulo,
    'lista_respostas_teste' : lista_respostas_teste
  }

  const objeto_veio = await vai_filhao_2 ('encerrar_teste', JSON.stringify(objeto_vai))
  const palavras_liberadas = objeto_veio.palavras_liberadas
  */

  let string_fim_teste = ''
            
  for (let j = 0; j < lista_respostas_teste.length; j++) {
         
    string_fim_teste += faz_palavras_testadas (lista_respostas_teste[j].palavra_idioma_1, lista_respostas_teste[j].palavra_idioma_2, lista_respostas_teste[j].resultado)
  }

  document.getElementById('popup_resposta_escrita').style.display ="none"
  document.getElementById('div_fundo_respondeu').style.display = 'none'

  document.getElementById('home_recip_fim_teste').style.display = 'flex'
  document.getElementById('home_fim_teste_dentro_palavras').innerHTML = string_fim_teste

  /*

  let novas_palavras_liberadas_string = ''
  if (palavras_liberadas.length) {

    for (let i = 0; i < palavras_liberadas.length; i++) {
      novas_palavras_liberadas_string += faz_palavras_liberadas (i, palavras_liberadas[i].idioma_1, palavras_liberadas[i].idioma_1_mp3, palavras_liberadas[i].idioma_2, palavras_liberadas[i].idioma_2_mp3, pre_jogo.idioma_1)
    }

    document.getElementById('home_fim_teste_dentro_palavras_liberadas').style.display = 'flex'
    document.getElementById('div_interno_home_fim_teste_palavras_liberadas').innerHTML = novas_palavras_liberadas_string
  }


  
  if (teste_inicial_idioma === 'sim') {
    alert("Oem")


    // Se chegar ao final sem perder.
    if (cont_teste_erradas != 5 & teste_inicial_idioma === 'sim') {
      document.getElementById('home_fim_teste_botoes').innerHTML += `<button class="botao" onclick="outro_capitulo_teste('${id_decoreba}', '${id_capitulo}')">Testar mais palavras</button>`
    }
  }

  */

    document.getElementById('home_fim_teste_botoes').innerHTML = `
      <button class="botao" onclick="monta_decoreba_mostra('${id_decoreba}')">Encerrar teste</button>
    `
}

async function outro_capitulo_teste (id_decoreba, id_capitulo_finalizado) {

  // Aparece o recip
  document.getElementById('home_recip_outros_testes').style.display = 'flex'

  lista_respostas_teste = [] // Limpamos a lista de respostas para o próximo teste.

  loading('loading...')
  const capitulos_para_teste = await vai_filhao_2('puxa_quais_capitulos_teste', id_decoreba)

  let select_capitulos = '<select id="select_capitulos_pro_teste" style="font-size: 17pt;">'
  for (let i = 0; i < capitulos_para_teste.length; i++) {
    select_capitulos += `<option onclick="prepara_teste('${id_decoreba}', '${capitulos_para_teste[i].id_capitulo}', 'veio_da_lista')" value="${capitulos_para_teste[i].id_capitulo}">${capitulos_para_teste[i].titulo_capitulo}</option>`
  }

  select_capitulos += '</select>'

  // Coloca um select com os capítulos que ainda tem palavras a serem dekoradas.
  document.getElementById('home_outros_testes_dentro').innerHTML = `Escolha um novo capítulo para testar suas habilidades e tentar liberar mais palavras.<br>` + select_capitulos

  // O de baixo funciona.
  
  // prepara_teste (id_decoreba, id_capitulo)
  
  /*
  let id_proximo_capitulo = ''
  for (let i = 0; i < stri.length; i++) {

    // Se achar o capítulo de id_capitulo_finalizado, e se esse não for o último capítulo.
    if (stri[i]._id == id_capitulo_finalizado & i != stri.length-1) {
      id_proximo_capitulo = stri[i+1]._id
    }
  }

  if (id_proximo_capitulo != '') {
    prepara_teste (id_decoreba, id_proximo_capitulo)
  } else {
    alert('Esse foi o último capítulo. Parabéns, através de testes você completou toda a dekoreba desse idioma. Já tá craque nas conjugações verbais também? Se sim, bah, você é o bixão mesmo hein doido.')
    window.location.reload(true)
  }
  */

}

function mostra_info_palavra (palavra, idioma_falado) {
  
  // Primeiro mostra o div da palvra
  document.getElementById('jogo_recip_info_palavra').style.display = 'flex'
  const bandeira_idi_1 = volta_bandeira('Português', 30, 0)
  const bandeira_idi_2 = volta_bandeira(idioma_falado, 30, 0)
  
  const palavra_pergunda = (idioma_falado != 'Português') ? palavra.idioma_1 : palavra.idioma_2
  let mult__1_2
  let mult__2_1
  let escr__1_2
  let escr__2_1

  for (let i = 0; i < liberadas_mult_global.length; i++) {

    if (liberadas_mult_global[i].id_palavra == palavra._id) {

      const acertos_e_erros_mult = liberadas_mult_global[i].acertos_e_erros // Simplifica.

      for (let j = 0; j < acertos_e_erros_mult.length; j++) {

        if (acertos_e_erros_mult[j].orientacao === '1-2') mult__1_2 = acertos_e_erros_mult[j].n_acertos_erros
        if (acertos_e_erros_mult[j].orientacao === '2-1') mult__2_1 = acertos_e_erros_mult[j].n_acertos_erros
      }
    }
  }

  for (let i = 0; i < liberadas_escr_global.length; i++) {

    if (liberadas_escr_global[i].id_palavra == palavra._id) {

      const acertos_e_erros_escr = liberadas_escr_global[i].acertos_e_erros // Simplifica.

      for (let j = 0; j < acertos_e_erros_escr.length; j++) {
        if (acertos_e_erros_escr[j].orientacao === '1-2') escr__1_2 = acertos_e_erros_escr[j].n_acertos_erros
        if (acertos_e_erros_escr[j].orientacao === '2-1') escr__2_1 = acertos_e_erros_escr[j].n_acertos_erros
      }
    }
  }

    const coluna_1 = ['Modalidade', 'Múltipla Escolha', 'Escrita']
        const coluna_2 = [`${bandeira_idi_1}<i class="icon-setas_cheio"></i>${bandeira_idi_2}`, `8/${mult__1_2}`, `8/${mult__2_1}`]
        const coluna_3 = [`${bandeira_idi_1}<i class="icon-setas_cheio"></i>${bandeira_idi_2}`, `8/${escr__1_2}`, `8/${mult__2_1}`]

        const tabela_terminacoes = tabela_bela([coluna_1, coluna_2, coluna_3])

  document.getElementById('jogo_info_palavra_dentro').innerHTML = `<h2>${palavra_pergunda[0].item}</h2><br><br>${tabela_terminacoes}`
  
}

function barrinha_cresce_e_volta (modalidade) {

  const id_barra = (modalidade == 'mult_esc') ? 'jogo_div_listra_progresso_mult' : 'jogo_div_listra_progresso_escr'
  let barra = document.getElementById(id_barra)

  barra.classList.add("jogo_barra_progresso_crescer") // Adiciona a classe que faz o div crescer

  // Remove a classe após 250ms para que ele volte ao tamanho original
  setTimeout(function() {
    barra.classList.remove("jogo_barra_progresso_crescer")
  }, 250)
}

var orientacao_global = ''

function move_barra_progresso_jogo (id_palavra, modalidade, resultado) {

  const id_barra = (modalidade === 'mult_esc') ? 'jogo_lista_progresso_mult' : 'jogo_lista_progresso_escr'
  
  let pontuacao_antes = 0
  let pontuacao_depois = 0
  let masterizou

  let pontuacao_antes_outra_modalidade = 0

  for (let i = 0; i < palavras_mult.length; i++) {

    if (palavras_mult[i].id_palavra == id_palavra) {

      if (modalidade === 'mult_esc') pontuacao_antes_outra_modalidade = palavras_mult[i].pontuacao_escr_inicio
      if (modalidade === 'escrita') pontuacao_antes_outra_modalidade = palavras_mult[i].pontuacao_mult_inicio

      masterizou = palavras_mult[i].masterizou

      for (let j = 0; j < palavras_mult[i].pontuacoes.length; j++) {

        pontuacao_antes += palavras_mult[i].pontuacoes[j].n_acertos_erros

        if (palavras_mult[i].pontuacoes[j].orientacao === orientacao_global) {

          // Pontuação máxima é 4, para cada orientação em cada modalidade.
          if (palavras_mult[i].pontuacoes[j].n_acertos_erros < 4) {
            if (resultado === 'acertou') palavras_mult[i].pontuacoes[j].n_acertos_erros++
          }

          // Pontuação máxima é -4.
          if (palavras_mult[i].pontuacoes[j].n_acertos_erros > -4) {
            if (resultado === 'errou') palavras_mult[i].pontuacoes[j].n_acertos_erros--
          }
          
        }

        pontuacao_depois += palavras_mult[i].pontuacoes[j].n_acertos_erros

      }
    }
  }




  // Se já atingiu o limite de progresso nessa modalidade e msm assim o usuário acertou.
  if (modalidade === 'mult_esc') {
    if (pontuacao_antes === 8 & pontuacao_depois === 8) barrinha_cresce_e_volta(modalidade)

    // Masterizou a palavra no Múltipla Escolha. Liberará uma outra palavra, se tiver alguma para liberar.
    // alert('masterizou: ' + masterizou)
    if (pontuacao_antes === 7 & pontuacao_depois === 8 & masterizou === 'nao') {

      masterizou = 'sim'

      // Primeiro vê se tem mais alguma para liberar.
      let encontrou = 'nao'

      // Esse primeiro_i_na_fila_dos_ainda_nao_liberados aqui será usado apenas se ainda tiver alguma palavra
      // a ser liberada e, se o sistema tentar várias vezes, de forma aleatória, e não conseguir setar
      // um i de palavra a ser liberada.
      let primeiro_i_a_ser_liberado
      for (let i = 0; i < palavras_mult.length; i++) {
        if (palavras_mult[i].liberada === 'nao') {
          encontrou = 'sim'
          primeiro_i_na_fila_dos_ainda_nao_liberados = i

        }
      }

      // Se tiver...
      if (encontrou === 'sim') {

        // Tenta achar a que falta liberar
        let i_aleat
        let tentativas = 0
        do {

          i_aleat = Math.floor(Math.random() * palavras_mult.length)
          tentativas++
        }
        while (palavras_mult[i_aleat].liberada === 'sim' || tentativas < 50)


        if (palavras_mult[i_aleat].liberada === 'sim') i_aleat = primeiro_i_na_fila_dos_ainda_nao_liberados

        palavras_mult[i_aleat].liberada = 'sim'

        document.getElementById('jogo_recip_palavra_liberada').style.display = 'flex'
        document.getElementById('div_protecao').style.display = 'none'

        const idioma_1_minusculas = pre_jogo.idioma_1.toLowerCase()
        const idioma_1_sem_acento = removeAcento(idioma_1_minusculas)

        const idioma_2_minusculas = pre_jogo.idioma_2.toLowerCase()
        const idioma_2_sem_acento = removeAcento(idioma_2_minusculas)
       
        const mp3_1 = palavras_mult[i_aleat].vocabulario.idioma_1[0].arquivo
        const mp3_2 = palavras_mult[i_aleat].vocabulario.idioma_2[0].arquivo

        const dentro = `

          Nova palavra liberada!<br>
          <div class="flex_row T1 center dominio_recem_liberado" style="max-width: 400px;">
          <div class="flex_row T2" style="overflow-x: scroll; overflow-y: hidden; border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding-left: 5px;">
      
            <audio id="pri_89" crossorigin="anonymous">
                <source src="../mp3/${idioma_1_sem_acento}/${mp3_1}.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <div class="flex_row center botao" style="margin: 5px; margin-left: 5px; height: 35px; " onclick="document.getElementById('pri_89').play();">
                <i class="icon-volume"></i>
              </div>


                <div class="" style="display: inline-block; margin: 5px; white-space: nowrap; align-text: left;">
                  ${palavras_mult[i_aleat].vocabulario.idioma_1[0].item}
                </div>
              </div>

              <div class="flex_row T2" style="overflow-x: scroll; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right: 5px;">
                <div style="margin: 5px; margin-left: 20px; display: inline-block; margin: 5px; white-space: nowrap; margin-left: auto;">
                  ${palavras_mult[i_aleat].vocabulario.idioma_2[0].item}

                </div>
              </div>

              
              <audio id="seg_89" crossorigin="anonymous">
                <source src="../mp3/${idioma_2_sem_acento}/${mp3_2}.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <div class="flex_row center botao" style="margin: 5px; margin-left: 5px; height: 35px; " onclick="document.getElementById('seg_89').play();">
                <i class="icon-volume"></i>
              </div>
              

            </div>
        
`
        document.getElementById('jogo_palavra_liberada_dentro').innerHTML = dentro
        sequencia_aleatoria = []
        // Aqui, temos que recalcular a sequencia_aleatoria.
        sequencia_aleatoria = forma_sequencia_aleatoria(palavras_mult)
        i_sequencia = 0
      }

    }
  }


  if (modalidade === 'escr') {
    if (pontuacao_antes === 8 & pontuacao_antes === 8) barrinha_cresce_e_volta(modalidade)

     if (pontuacao_antes === 7 & pontuacao_depois === 8 & masterizou === 'nao') {
        masterizou = 'sim'
     }
  }

  // Se chegou agora no limite total, ou seja, 16. Decorou a palavra

  const pontuacao_total_antes = pontuacao_antes_outra_modalidade + pontuacao_antes
  const pontuacao_total_depois = pontuacao_antes_outra_modalidade + pontuacao_depois
  if (pontuacao_total_antes === 15 & pontuacao_total_depois === 16) {
    // barrinha_brilha(modalidade)
    // Faz alguma coisa massa pq decorou a palavra.
  }


  const largura_porc_palavra = pontuacao_depois * 100 / 8
  document.getElementById(id_barra).style.width = largura_porc_palavra + '%'
}

async function envia_resp_escrita (resposta_correta, orient, respostas, eh_teste) {
  let obj = pre_jogo
  // if (eh_teste === true) é pq é teste.

  // As 2 consts abaixo só usamos para o teste das palavras.
  const id_decoreba_para_teste = obj.id_decoreba
  const titulo_capitulo_para_teste = obj.titulo_capitulo

  str_palavras_liberadas = ''
  // Tem que ter um valida que impede de ir se o campo da resposta estiver vazio.

  // Fundo preto, que impede do usuário clicar enquanto a reposta é mostrada.
  document.getElementById('div_fundo_respondeu').style.display = 'flex'

  const resposta_usuario = document.getElementById('input_resposta_escrita').value
  const recip_resp_escrita = document.getElementById('popup_resposta_escrita_interno')

  let palavra_1_teste = ''
  let palavra_2_teste = ''

  let i_palavras_mult_testada
  if (eh_teste_global === 'sim') {
    for (let i = 0; i < palavras_mult.length; i++) {

      if (palavras_mult[i].vocabulario._id === id_pergunta_teste) {

        i_palavras_mult_testada = i

        for (let j = 0; j < palavras_mult[i].vocabulario.idioma_1.length; j++) {
          if (palavras_mult[i].vocabulario.idioma_1[j].tipo === 'palavra') {
            palavra_1_teste = palavras_mult[i].vocabulario.idioma_1[j].item
          }
        }

        for (let j = 0; j < palavras_mult[i].vocabulario.idioma_2.length; j++) {
          if (palavras_mult[i].vocabulario.idioma_2[j].tipo === 'palavra') {
            palavra_2_teste = palavras_mult[i].vocabulario.idioma_2[j].item
          }
        }
      }
    }
  }

  for (let i = 0; i < respostas.length; i++) {

    // Primeiro, deixa as duas respostas com todas as letras minúsculas, para depois compará-las.
    const resposta_usuario_min = resposta_usuario.toLowerCase()
    const resposta_certa_min = respostas[i].item.toLowerCase()

    // Se acertou.
    if (resposta_usuario_min == resposta_certa_min) {

      if (treino_ou_pra_valer === 'pra_valer') move_barra_progresso_jogo(id_palavra_pergunta_escr, 'escr', 'acertou')

      if (eh_teste_global === 'sim') {
        palavras_mult[i_palavras_mult_testada].situacao_teste = 'testada_e_acertou'
        sequencia_aleatoria = forma_sequencia_aleatoria(palavras_mult)
        i_sequencia = 0
      }

      resps_corretas_escritas++

      // Altera o DOM.
      recip_resp_escrita.innerHTML = respostas[i].item
      document.getElementById('span_resp_corretas').innerHTML = resps_corretas_escritas

      // Se acertou todas
      if (resps_corretas_escritas === meta_corretas & treino_ou_pra_valer === 'pra_valer') {

        recip_resp_escrita.style.color = 'green' // Cor da resposta

        altera_dominadas (id_decoreba_escr, id_capitulo_pergunta_escr, id_palavra_pergunta_escr, 'acertou', orient, obj.qtd_incidencias_previas)

        const objeto = {
          'id_decoreba': `${id_decoreba_escr}`,
          'id_capitulo': `${id_capitulo_pergunta_escr}`,
          'modalidade': 'escrita',
          'dominadas_vai' : dominadas_vai,
          'palavras': palavras_mult
        }
        
        const objeto_veio = await vai_filhao_2 ('atualiza_pontos', JSON.stringify(objeto))

        /*
        const palavras_liberadas = objeto_veio.palavras_liberadas
       
        novas_palavras_no_escr = objeto_veio.novas_palavras_liberadas
        

        for (let i = 0; i < palavras_liberadas.length; i++) {
          str_palavras_liberadas += `<div><span style="margin-right: 25px; font-size: 20pt;">${palavras_liberadas[i].pontos}</span><span style="margin-right: 15px;">${palavras_liberadas[i].pontos_mult}</span><span style="margin-right: 15px;">${palavras_liberadas[i].pontos_escr}</span>${palavras_liberadas[i].palavra_str}</div>`
        }

        // Esse for de preenchimento da dominadas_str se repete na vitoria e na derrota da
        // dominadas_str_escr = gera_dominadas_str('escr')
        // dominadas_vai = []
        */

        const audio_ganhou = new Audio('/mp3/success-fanfare-trumpets-6185.mp3')
        audio_ganhou.play()        




        const sim_ou_nao = 'sim'
      setTimeout(async () => {

        // É smartphone. Provavelmente não tem teclado.


        // A linha de baixo está comentada pq estou testando no pc, emulando com as dimensões da janela um smartphone. A linha de baixo é para reconhecer smartphones, não importa o tamanho da janela.

        // if (/Mobi|Android/i.test(navigator.userAgent)) {
        // No não, nunca mostra.
        if (sim_ou_nao === 'nao') {

          document.getElementById('popup_resposta_escrita').style.display ="none"

          document.getElementById('div_protecao').style.display = 'none'

        // É notebook ou PC. Provavelmente tem teclado.
        } else {

          resps_corretas_escritas = 0
          if (resps_erradas_escritas > 0) resps_erradas_escritas--
          document.getElementById('popup_resposta_escrita').style.display ="none"
          document.getElementById('div_fundo_respondeu').style.display = 'none'

          document.getElementById('div_protecao').style.display = 'none'

          document.getElementById('jogo_recip_checkpoint').style.display = 'flex'

          // Aqui, provavelmente deveria ficar a chamada para o checkpoint.
          // mostrar_resultado('ganhou', id_decoreba, 'mult_esc')
        }

      }, "500")

      }

      // Se acertou mas ainda tem respostas pela frente
      if (resps_corretas_escritas != meta_corretas || treino_ou_pra_valer === 'treino') {

        recip_resp_escrita.style.color = 'green' // Cor da resposta

        altera_dominadas (id_decoreba_escr, id_capitulo_pergunta_escr, id_palavra_pergunta_escr, 'acertou', orient, obj.qtd_incidencias_previas)

        document.getElementById('finalizou_msg').innerHTML = "Meus parabéns!!!!3!"        

        const certou = new Audio('/mp3/correct-choice-43861.mp3')
        certou.play()
        document.getElementById('popup_resposta_escrita').style.display ="flex"

        document.getElementById('input_resposta_escrita').style.border ="3px solid green"
        document.getElementById('input_resposta_escrita').style.color ="green"

        if (eh_teste_global === 'sim') {

          lista_respostas_teste.push({id_palavra: id_pergunta_teste, resultado: "acertou", palavra_idioma_1: palavra_1_teste, palavra_idioma_2: palavra_2_teste})

          // Se não há mais palavras a serem testadas, encerramos o teste.
          let qtd_nao_testadas = 0
          for (let k = 0; k < palavras_mult.length; k++) {
            if (palavras_mult[k].situacao_teste === 'era_teste_e_nao_testada') qtd_nao_testadas++
          }

          if (qtd_nao_testadas === 0) encerra_teste(id_decoreba_para_teste, id_capitulo_pergunta_escr)
        }
        
        setTimeout(() => {

          document.getElementById('popup_resposta_escrita').style.display ="none"

          if (eh_teste_global === 'sim') {
           
            carrega_pergunta_escrita('treino', '1-2', obj)
          } else {
            eurekaAleatória(obj, 'escrita')
          }

          document.getElementById('div_fundo_respondeu').style.display = 'none'

        }, "500")
      }
      return
    } else {
      if (treino_ou_pra_valer === 'pra_valer') {
        
        move_barra_progresso_jogo(id_palavra_pergunta_escr, 'escr', 'errou')
      }
    }
  }

  // Se a função rodou até aqui, sem passar por um return, é porque o usuário erroooou.
  if (eh_teste_global === 'sim') {

    palavras_mult[i_palavras_mult_testada].situacao_teste = 'testada_e_errou'
    sequencia_aleatoria = forma_sequencia_aleatoria(palavras_mult)
    i_sequencia = 0
  }

  resps_erradas_escritas++
  document.getElementById('span_resp_erradas').innerHTML = resps_erradas_escritas

  recip_resp_escrita.innerHTML = resposta_correta

  // Se errou todas
  if (resps_erradas_escritas === meta_erradas & treino_ou_pra_valer === 'pra_valer') {

    recip_resp_escrita.style.color = 'red' // Cor da resposta

    altera_dominadas (id_decoreba_escr, id_capitulo_pergunta_escr, id_palavra_pergunta_escr, 'errou', orient, obj.qtd_incidencias_previas)

    const resps_corretas = resps_corretas_escritas

    const objeto = {
        'id_decoreba': `${id_decoreba_escr}`,
        'modalidade': 'escrita',
        'dominadas_vai' : dominadas_vai,
        'palavras': palavras_mult
      }
      
      /*
      const objeto_veio = await vai_filhao_2 ('atualiza_pontos', JSON.stringify(objeto))
      const decoreba_praticada = objeto_veio.decoreba_praticada

      console.log(decoreba_praticada)
      console.log("aciam terá a decoreba_praticada")
      let lib_mult = ''
      for (let i = 0; i < decoreba_praticada.caps_praticados.length; i++) {

        for (let j = 0; j < decoreba_praticada.caps_praticados[i].palavras_liberadas_mult.length; j++) {
          let id_pal = decoreba_praticada.caps_praticados[i].palavras_liberadas_mult[j].id_palavra
        }
      }
      */

      // dominadas_str_escr = gera_dominadas_str('escr')
      // dominadas_vai = []

      // Aqui pode ter uma variavel array global também, com todas as palavras liberadas e as pontuações.
      // Podemos ordenar essa arraya com a mais pontuosa primeiro.

      palavras_totais_liberadas = []

      const audio_perdeu = new Audio('/mp3/wah-wah-sad-trombone-6347.mp3')
      audio_perdeu.play()

      setTimeout(async () => {

        document.getElementById('div_protecao').style.display = 'none'
        completar_dekoreba(`${id_decoreba}`)


        // mostrar_resultado ('perdeu', id_decoreba_escr, 'escrita')
      }, "500")

    }

  if (resps_erradas_escritas != meta_erradas || treino_ou_pra_valer === 'treino') {

    recip_resp_escrita.style.color = 'red' // Cor da resposta

    altera_dominadas (id_decoreba_escr, id_capitulo_pergunta_escr, id_palavra_pergunta_escr, 'errou', orient, obj.qtd_incidencias_previas)

    const erro = new Audio('/mp3/sadwhisle-91469.mp3')
    erro.play()

    document.getElementById('input_resposta_escrita').style.border ="3px solid red"
    document.getElementById('input_resposta_escrita').style.color ="red"

    document.getElementById('popup_resposta_escrita').style.display ="flex"

    if (eh_teste_global === 'sim') {

      lista_respostas_teste.push({id_palavra: id_pergunta_teste, resultado: "errou", palavra_idioma_1: palavra_1_teste, palavra_idioma_2: palavra_2_teste})

      // Se não há mais palavras a serem testadas, encerramos o teste.
      let qtd_nao_testadas = 0
      for (let k = 0; k < palavras_mult.length; k++) {
        if (palavras_mult[k].situacao_teste === 'era_teste_e_nao_testada') qtd_nao_testadas++
      }

      if (qtd_nao_testadas === 0) encerra_teste(id_decoreba_para_teste, id_capitulo_pergunta_escr)

      cont_teste_erradas++
        
      if (cont_teste_erradas === 5) {
        // Aqui encerramos o teste, mostramos a tela final. As 5 erradas serão as novas liberadas e as 
        // acertadas deverão serem marcadas como dekoradas especiais.

        encerra_teste(id_decoreba_para_teste, id_capitulo_pergunta_escr)
      }
    }


    if ((eh_teste_global === 'sim' && cont_teste_erradas < 5) || eh_teste_global === 'nao') {
      setTimeout(() => {

        document.getElementById('popup_resposta_escrita').style.display ="none"
        eurekaAleatória(obj, 'escrita')

        document.getElementById('div_fundo_respondeu').style.display = 'none'

      }, "250")
    }

    }

}


// OPCOES //

async function alterar_senha (email) {

  if (navigator.onLine) {
    if (window.confirm("Quer mesmo trocar sua senha?")) {
      loading('loading...')
      await vai_filhao_2('solicita_troca_senha', email)
    }
  }

  if (!navigator.onLine) {
    alert("É necessário estar online para solicitar a troca da senha.")
  }
}

function checkbox_opcoes(rede_social) {
  const checkbox = document.getElementById(`opc_${rede_social}_checkbox`)
  const endereco = document.getElementById(`opc_${rede_social}_recip`)
  if (checkbox.checked == true) {
    endereco.style.display = 'flex'
  }
  if (checkbox.checked == false) {
    endereco.style.display = 'none'
  }
}

async function alterar_email (email) {

  if (navigator.onLine) {

    let e_mail = prompt("Digite seu novo e-mail:", "")

    if (e_mail == null || e_mail == "") {
      // text = "User cancelled the prompt.";
    } else {
      loading('loading...')
      const json = await vai_filhao_2('troca_email', e_mail)

      if (json.msg === 'troca_email__ja_cadastrado') {
        alert("Este e-mail já está cadastrado aqui no Dekoreba. Please, use outro, gracias!")
      }

      if (json.msg === 'troca_email__sucesso') {
        document.getElementById('opc_email').value = json.email_novo
        alert("E-mail alterado como sucesso.")

      }
    }
  }
}


async function buscar_usuario (input, pagina) {

  loading('loading...')
  const objeto = {
    pagina: pagina,
    input: input
  }
  const busca = await vai_filhao_2('buscar_usuario', objeto)
  monta_busca_usuario(busca)
}


function valida_email (id_input_email, valor) {

  // Regex para verificar formato de e-mail
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const resultado = regex.test(valor)

  if (!resultado) {
    setTimeout(() => {
  
      document.getElementById('msg_sistema_cadastro').style.display = 'flex'
      document.getElementById('msg_sistema_cadastro').innerHTML = 'E-mail inválido'

      document.getElementById(id_input_email).value = ''
      document.getElementById(id_input_email).style.border = '1px solid red'
      document.getElementById(id_input_email).focus()

    }, 0);  // Executa imediatamente após o evento
            
  } else {
    document.getElementById(id_input_email).style.border = `1px solid var(--color_site)`

    document.getElementById('msg_sistema_cadastro').style.display = 'none'
    document.getElementById('msg_sistema_cadastro').innerHTML = ''
  }
}


// Função para alternar a visibilidade da senha e o ícone
function togglePassword(tela) {

  if (tela === 'cadastro') {
    const passwordInput = document.getElementById("cadastro_senha");
    const passwordInputRepete = document.getElementById("cadastro_repete_senha");
    const icon = document.getElementById("toggle-icon");

    // Verifica se o input está no modo "password" ou "text"
    if (passwordInput.type === "password") {
      passwordInput.type = "text"; // Mostra os caracteres
      passwordInputRepete.type = "text"
      icon.classList.remove("icon-olho_fechado");
      icon.classList.add("icon-olho_aberto"); // Muda o ícone para olho aberto
    } else {
      passwordInput.type = "password"; // Esconde os caracteres
      passwordInputRepete.type = "password"; // Mostra os caracteres

      icon.classList.remove("icon-olho_aberto");
      icon.classList.add("icon-olho_fechado"); // Muda o ícone para olho fechado
    }
  }

  if (tela === 'login') {

    const passwordInput = document.getElementById("login_senha");
    const icon = document.getElementById("toggle-icon");

    // Verifica se o input está no modo "password" ou "text"
    if (passwordInput.type === "password") {

      passwordInput.type = "text"; // Mostra os caracteres
      icon.classList.remove("icon-olho_fechado");
      icon.classList.add("icon-olho_aberto"); // Muda o ícone para olho aberto
    } else {
      passwordInput.type = "password"; // Esconde os caracteres

      icon.classList.remove("icon-olho_aberto");
      icon.classList.add("icon-olho_fechado"); // Muda o ícone para olho fechado
    }
  }
}

var valida_forca_senha = 'nao'
function checkPasswordStrength() {
  
  const password = document.getElementById("cadastro_senha").value;
  const strengthMeter = document.getElementById("strength-meter");

  const span_senha_fraca = document.getElementById('span_senha_fraca')
  const span_senha_media = document.getElementById('span_senha_media')
  const span_senha_forte = document.getElementById('span_senha_forte')

  let strength = 0;

  if (password.length > 6) {
    strength += 1;

    document.getElementById('i_cadastro_condicao_senha_seis').style.color = 'green'
    document.getElementById('cadastro_condicao_senha_seis').style.color = 'var(--color_site)'
  } else {
    document.getElementById('i_cadastro_condicao_senha_seis').style.color = 'gray'
    document.getElementById('cadastro_condicao_senha_seis').style.color = 'gray'
  }

  if (/[A-Z]/.test(password)) {
    strength += 1;

    document.getElementById('i_cadastro_condicao_senha_maiuscula').style.color = 'green'
    document.getElementById('cadastro_condicao_senha_maiuscula').style.color = 'var(--color_site)'
  } else {
    document.getElementById('i_cadastro_condicao_senha_maiuscula').style.color = 'gray'
    document.getElementById('cadastro_condicao_senha_maiuscula').style.color = 'gray'
  }

  if (/[a-z]/.test(password)) {
    strength += 1;

    document.getElementById('i_cadastro_condicao_senha_minuscula').style.color = 'green'
    document.getElementById('cadastro_condicao_senha_minuscula').style.color = 'var(--color_site)'
  } else {
    document.getElementById('i_cadastro_condicao_senha_minuscula').style.color = 'gray'
    document.getElementById('cadastro_condicao_senha_minuscula').style.color = 'gray'
  }

  if (/[0-9]/.test(password)) {
    strength += 1;

    document.getElementById('i_cadastro_condicao_senha_numero').style.color = 'green'
    document.getElementById('cadastro_condicao_senha_numero').style.color = 'var(--color_site)'
  } else {

    document.getElementById('i_cadastro_condicao_senha_numero').style.color = 'gray'
    document.getElementById('cadastro_condicao_senha_numero').style.color = 'gray'
  }

  if (/[@#$!%*?&]/.test(password)) {
    strength += 1;

    document.getElementById('i_cadastro_condicao_senha_especial').style.color = 'green'
    document.getElementById('cadastro_condicao_senha_especial').style.color = 'var(--color_site)'
  } else {
    document.getElementById('i_cadastro_condicao_senha_especial').style.color = 'gray'
    document.getElementById('cadastro_condicao_senha_especial').style.color = 'gray'
  }

  switch (strength) {
    case 0:                    

                case 1:
                    strengthMeter.style.width = "20%";
                    strengthMeter.className = "strength-bar";
                    strengthMeter.classList.add("strength-weak");

                    span_senha_fraca.style.display = 'flex'
                    span_senha_media.style.display = 'none'
                    span_senha_forte.style.display = 'none'
                    break;
                case 2:
                case 3:
                    strengthMeter.style.width = "60%";
                    strengthMeter.className = "strength-bar";
                    strengthMeter.classList.add("strength-medium");
                                        span_senha_fraca.style.display = 'none'
                    span_senha_media.style.display = 'flex'
                    span_senha_forte.style.display = 'none'
                    break;
                case 4:
                case 5:
                    strengthMeter.style.width = "100%";
                    strengthMeter.className = "strength-bar";
                    strengthMeter.classList.add("strength-strong");
                    
                    span_senha_fraca.style.display = 'none'
                    span_senha_media.style.display = 'none'
                    span_senha_forte.style.display = 'flex'

                    valida_forca_senha = 'sim'
                    break;
            }
        }


function opcoes_popup_troca(acao) {

  const recip = document.getElementById('opcoes_recip_troca_foto')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
  }

  document.getElementById('opcoes_avatar_placeholder').src = `imagens/placeholder_image.svg`
}

async function opcoes_carrega_temp() {

  const json = await vai_filhao_3 ('avatar_temporario')

  const opcoes_recip_troca_foto = document.getElementById('opcoes_recip_troca_foto')
  if (opcoes_recip_troca_foto.classList.contains("sumido")) {
    opcoes_recip_troca_foto.classList.remove("sumido")
  }

  document.getElementById('opcoes_avatar_placeholder').src = `../imagens/avatares/temporarios/${json.nome_arquivo}`
  opcoes_troca_avatar()
}

async function opcoes_troca_avatar(acao) {
  // loading("loading...")

  const json = await vai_filhao_3('troca_avatar')

  document.getElementById('opcoes_avatar_placeholder').src = `../imagens/avatares/temporarios/400_400/${json.nome_arquivo}`
  document.getElementById('opcoes_avatar_400').src = `../imagens/avatares/400_400/${json.nome_arquivo}`

  // opcoes_popup_troca()
}

// TESTES //

function grava_audio() {
  // navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);

  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then(async function (stream) {
    let recorder = RecordRTC(stream, {
      type: 'audio',

      mimeType: 'audio/wav',
      desiredSampRate: 16000, // accepted sample rate by Azure

      recorderType: StereoAudioRecorder,
      numberOfAudioChannels: 1
    });
    recorder.startRecording();

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(async function () {
      let blob = recorder.getBlob();
      invokeSaveAsDialog(blob);
      const door = URL.createObjectURL(blob);
      const audio_2 = new Audio(door);

      audio_2.play();


      const resposta = await vai_filhao_2('usuario_falou', blob)
      alert(resposta.transcricao)

    });
  });
}


// EXPLORAR //

function limpa_busca(id_elm) {
  let s = document.getElementById(id_elm)

  let badValues = /["'`,.; ]/gi;
  s.value = s.value.replace(badValues, '')
  const sem_espaco = s.value.replace(' ', '')
  s.value = sem_espaco
  if (s.value[0] != '#') s.value = `#${s.value}`
}

function explorar_titulos(obj) {
  let string_titulos_capitulos = ''
  let virgula_final = ''
  for (let j = 0, length_2 = obj.capitulos.length; j < length_2; j++) {

    if (j === obj.capitulos.length - 1) {
      virgula_final = ''
    } else {
      virgula_final = ', '
    }
    string_titulos_capitulos += `${obj.capitulos[j].titulo}${virgula_final}`
  }

  return string_titulos_capitulos
}

function explorar_estrela(obj) {
  let ico_estrela = 'icon-estrela_vazio'
  if (obj.decorebas_curtidas.length) {
    for (let j = 0, length_3 = obj.decorebas_curtidas.length; j < length_3; j++) {
      if (obj.decorebas_curtidas[j].id_decoreba == obj.id_decoreba) {
        ico_estrela = 'icon-estrela_cheio'
      }
    }
  }

  return ico_estrela
}



// MOSTRA //

function pontos_ou_porcento (qual) {



  let botao_pontos = document.getElementById('botao_pontos')
  let botao_porcento = document.getElementById('botao_porcento')

  let mostra_pontos = document.getElementsByClassName('mostra_pontos')
  let mostra_porcento = document.getElementsByClassName('mostra_porcento')



  if (qual === 'pontos') {

    troca_classe(botao_pontos, 'bot_inativo', 'bot_ativo')
    troca_classe(botao_porcento, 'bot_ativo', 'bot_inativo')

    for (let i = 0; i < mostra_pontos.length; i++) {
      mostra_pontos[i].classList.remove('sumido')
      mostra_porcento[i].classList.add('sumido')
    }
  }

  if (qual === 'porcento') {

    troca_classe(botao_porcento, 'bot_inativo', 'bot_ativo')
    troca_classe(botao_pontos, 'bot_ativo', 'bot_inativo')

    for (let i = 0; i < mostra_porcento.length; i++) {
      mostra_porcento[i].classList.remove('sumido')
      mostra_pontos[i].classList.add('sumido')
    }
  }

}

// Essa var nem deveria existir mais, pois agora, se não for pelo startão, tudo será treino.
var treino_ou_pra_valer = 'treino'


function botoes_dominio_papiro (modo, i, vocabulario, orientacao, primeiro_idioma, segundo_idioma, titulo_captitulo, informacoes, id_decoreba, id_capitulo) {

  let botao_dominio_mult_esc = document.getElementById('bot_dom_papiro_mult_esc')
  let botao_dominio_escrita = document.getElementById('bot_dom_papiro_escrita')

  if (modo === 'mult_esc') {
    troca_classe (botao_dominio_mult_esc, 'bot_treino_valer_desativado', 'bot_treino_valer_ativado')
    troca_classe (botao_dominio_escrita, 'bot_treino_valer_ativado', 'bot_treino_valer_desativado')
  }

  if (modo === 'escrita') {

    troca_classe (botao_dominio_escrita, 'bot_treino_valer_desativado', 'bot_treino_valer_ativado')
    troca_classe (botao_dominio_mult_esc, 'bot_treino_valer_ativado', 'bot_treino_valer_desativado')
  }

  // Esse vocabulario não tá stringifado pq ele já veio stringifado da função anterior e nem foi modificado aqui.
  mostra_lista_palavras(i, vocabulario, orientacao, primeiro_idioma, segundo_idioma, titulo_captitulo, informacoes, id_decoreba, id_capitulo, modo)
}


function fecha_popup_mostra(telinha) {

  if (telinha === 'joga_ou_treina') document.getElementById('recip_joga_ou_treina').style.display = 'none'
  if (telinha === 'modalidades') document.getElementById('recip_modos_jogo').style.display = 'none'
  if (telinha === 'orientacao') document.getElementById('recip_orientacao_escrita').style.display = 'none'
  if (telinha === 'alfabetos') document.getElementById('recip_alfabetos_escrita').style.display = 'none'
  
  document.body.style.overflow = 'auto'
}

function vai_vem_mostra (direcao, telinha) {
  // Antes de mais nada, é necessário fazer um apanhado de todos os botões selecionaveis e seus estados.
  // Botões estes, claro, referentes ao popup pré-jogo, no caso.

  // Os botões:
  //  * Múltipla escolha, escrita, fala.
  //  * 1-2, 2-1, 1-1, 2-2
  //  * Sistemas Escrita

  const botoes_modalidades = document.getElementsByClassName("bot_modalidades")

  let bot_ativo_modalidades
  for (let i = 0; i < botoes_modalidades.length; i++) {
    if (botoes_modalidades[i].classList.contains('bot_ativo')) {
      bot_ativo_modalidades = botoes_modalidades[i]
    }
  }

  let bot_ativo_orientacao
  for (let i = 0; i < botoes_orientacao.length; i++) {
    if (botoes_orientacao[i].classList.contains('bot_ativo')) {
      bot_ativo_orientacao = botoes_orientacao[i]
    }
  }

  if (telinha === 'modalidades') {
    if (direcao === 'vai') {
      if (bot_ativo_modalidades.id == 'bot_mult_esco') {

        // Vai pro jogo
        carrega_pergunta("treino", pre_jogo.i, pre_jogo.orientacao_idiomas_global, pre_jogo.id_decoreba, pre_jogo.i_capitulo, pre_jogo.id_usuario, pre_jogo.avatar, pre_jogo.distancia_global, pre_jogo.idioma_falado_mult, "primeira_pergunta")
      }

      if (bot_ativo_modalidades.id == 'bot_escrita') {
        aparece_popup('orientacao', pre_jogo)
      }

      if (bot_ativo_modalidades.id == 'bot_fala') {

      }
    }
  }

  if (telinha === 'orientacao') {
    if (bot_ativo_orientacao.id == 'bot_mult_esco') {

    if (direcao === 'vem') {
      aparece_popup('modalidades', pre_jogo)
    }
    if (direcao === 'vai') {

    }
  }}
}

function fecha_popup_tabela () {
  document.getElementById('recip_popup_tabela').style.display = 'none'
}


let tabela_correta = []
let tabela_usuario = []

function abre_popup_tabela (i_que_veio, modo) {
  
  tabela_correta = []
  tabela_usuario = []
  if (!modo) modo = 'padrao'
  document.getElementById('recip_popup_tabela').style.display = 'flex'

  // Essa var vai_joga_treina, sei lá em onde mais ela é usada.
  const item = JSON.parse(vai_joga_treina[vai_joga_treina.length - 1].item)
  const vocabulario = item.capitulos[i_que_veio].vocabulario

  let string = `<div class="flex_row flex_col_m T1 center" style="">

    <button class="botao T1_m botao_tabela_palavras" onclick="abre_popup_tabela(${i_que_veio}, 'padrao');">Padrão</button>
    <button class="botao T1_m botao_tabela_palavras" onclick="abre_popup_tabela(${i_que_veio}, 'idioma_1');">Idioma 1</button>
    <button class="botao T1_m botao_tabela_palavras" onclick="abre_popup_tabela(${i_que_veio}, 'idioma_2');">Idioma 2</button>
    <button class="botao T1_m botao_tabela_palavras" onclick="abre_popup_tabela(${i_que_veio}, 'misto');">Misto</button>

  </div>
  `

  if (modo === 'padrao') {
    for (let i = 0; i < vocabulario.length; i++) {

      string += `
        <div class="flex_row T1">
          <input type="text" class="T4 input_texto palavra_da_tabela" value="${vocabulario[i].idioma_1[0].item}" disabled/>
          <input type="text" class="T4 input_texto palavra_da_tabela" value="${vocabulario[i].idioma_2[0].item}" disabled/>
        </div>
      `
    }
  }

  if (modo === 'idioma_1') {

    const shuffledArray = vocabulario.sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledArray.length; i++) {

      tabela_correta.push({
        idioma_1: shuffledArray[i].idioma_1[0].item,
        idioma_2: shuffledArray[i].idioma_2[0].item
      })

      tabela_usuario.push({
        idioma_1: shuffledArray[i].idioma_1[0].item,
        idioma_2: ''
      })
      
      string += `
        <div class="flex_row T1">
          <input id="tabela_1__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="${shuffledArray[i].idioma_1[0].item}" disabled/>
          <input id="tabela_2__${i}" type="text" class="T2 input_texto palavra_da_tabela" onchange="altera_tabela_usuario(2, ${i});" value="" />
        </div>
      `
    }
  }

  if (modo === 'idioma_2') {

    const shuffledArray = vocabulario.sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledArray.length; i++) {

      tabela_correta.push({
        idioma_1: shuffledArray[i].idioma_1[0].item,
        idioma_2: shuffledArray[i].idioma_2[0].item
      })

      tabela_usuario.push({
        idioma_1: '',
        idioma_2: shuffledArray[i].idioma_2[0].item
      })

      string += `
        <div class="flex_row T1">
          <input id="tabela_1__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="" onchange="altera_tabela_usuario(1, ${i});" />
          <input id="tabela_2__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="${shuffledArray[i].idioma_2[0].item}" disabled/>
        </div>
      `
    }
  }

  if (modo === 'misto') {
    const shuffledArray = vocabulario.sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledArray.length; i++) {

      const zero_ou_um = Math.round(Math.random())

      tabela_correta.push({
        idioma_1: shuffledArray[i].idioma_1[0].item,
        idioma_2: shuffledArray[i].idioma_2[0].item
      })


      if (zero_ou_um === 0) {
        tabela_usuario.push({
          idioma_1: shuffledArray[i].idioma_1[0].item,
          idioma_2: ''
        })

        string += `
          <div class="flex_row T1">
            <input id="tabela_1__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="${shuffledArray[i].idioma_1[0].item}" disabled/>
            <input id="tabela_2__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="" onchange="altera_tabela_usuario(2, ${i});"/>
          </div>
        `
      }

      if (zero_ou_um === 1) {

        tabela_usuario.push({
          idioma_1: '',
          idioma_2: shuffledArray[i].idioma_2[0].item
        })

        string += `
          <div class="flex_row T1">
            <input id="tabela_1__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="" onchange="altera_tabela_usuario(1, ${i});" />
            <input id="tabela_2__${i}" type="text" class="T2 input_texto palavra_da_tabela" value="${shuffledArray[i].idioma_2[0].item}" disabled/>
          </div>
        `
      }
      
    }
  }
  

  string += `<div class="flex_row T1 center">
          <button class="botao" onclick="confere_tabela_palavras()">Confere</button>
        </div> <div onclick="mostra_dica_tabela()">fe</div>
  `

  document.getElementById('recip_popup_tabela_dentro').innerHTML = string

/*

    const inputs_tabela_palavras = document.querySelectorAll('.palavra_da_tabela');

  inputs_tabela_palavras.forEach(input => {
    inputs_tabela_palavras.addEventListener('keydown', (event) => {
      if (event.ctrlKey) {
        alert("ie")
        mostra_dica_tabela();
      }
    });
  });

*/

}


function altera_tabela_usuario (n_idioma, i) {
  if (n_idioma === 1) tabela_usuario[i].idioma_1 = document.getElementById(`tabela_1__${i}`).value
  if (n_idioma === 2) tabela_usuario[i].idioma_2 = document.getElementById(`tabela_2__${i}`).value

}

function mostra_dica_tabela () {

  for (let i = 0; i < tabela_correta.length; i++) {

    let elemento_1 = document.getElementById(`tabela_1__${i}`)
    let elemento_2 = document.getElementById(`tabela_2__${i}`)


    if (elemento_1.value === '') elemento_1.placeholder = tabela_correta[i].idioma_1
    if (elemento_2.value === '') elemento_2.placeholder = tabela_correta[i].idioma_2
  }

}

function some_dica_tabela () {
  for (let i = 0; i < tabela_correta.length; i++) {

    let elemento_1 = document.getElementById(`tabela_1__${i}`)
    let elemento_2 = document.getElementById(`tabela_2__${i}`)


    if (elemento_1.value === '') elemento_1.placeholder = ''
    if (elemento_2.value === '') elemento_2.placeholder = ''
  }
}

function confere_tabela_palavras () {

  let errou = 'nao'
  for (let i = 0; i < tabela_correta.length; i++) {
    if (tabela_correta[i].idioma_1 != tabela_usuario[i].idioma_1) {
      // alert(`${tabela_correta[0].idioma_1} != ${tabela_usuario[0].idioma_1}`)
      document.getElementById(`tabela_1__${i}`).value = ''
      errou = 'sim'
    } else {
      document.getElementById(`tabela_1__${i}`).disabled = true
    }

    if (tabela_correta[i].idioma_2 != tabela_usuario[i].idioma_2) {
      document.getElementById(`tabela_2__${i}`).value = ''
      errou = 'sim'
    } else {
      document.getElementById(`tabela_2__${i}`).disabled = true
    }

  }

  if (errou === 'nao') {
    alert("Meus parabéans, acertastes tudos.")
  }



}

// Múltipla escolha e escrita podem ter os mesmos sisemas de escrita.
// A falada, não terá nenhum sistema de escrita na respostas. As escolhas serão referentes apenas aos sistemas de escrita das perguntas.
// Na modalidade Falada, as orientações também serão apenas entre idiomas diferentes. Ou não.
// O cara pode treinar a própria pronúncia, mas aí apareceria apenas a palavra escrita e o camarada teria de falar com o sotaque e a pronúncia correcta.
// Então, sempre na falada as 4 opções de orientação deverão aparecer.

function aparece_popup (telinha, i_capitulo) {

  pre_jogo.i = i_capitulo


  // Zera tudo, nem sei se isso é necessário msm.
  respostas_corretas = 0
  respostas_erradas = 0

  resps_corretas_escritas = 0
  resps_erradas_escritas = 0
  
  meta_corretas = 25
  meta_erradas = 5

  acertadas = []
  erradas = []

  // Aqui tá setando o stateObj como decoreba_jogo. Não sei se é a melhor abordagem mas funciona.
  const stateObj = { tela_ativa: 'decoreba_jogo' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: 'mostra_decoreba' })

  document.body.style.overflow = 'hidden' // Travamos o fundo.

  // TALVEZ UMA GAMBIARRA.
  // Não sem bem pq mas o pre_jogo.idioma_falado_mult precisa ser atualizado bem aqui pra coisa funcionar direito.
  const dek_orientacao = escolhas_dek.orientacao
  if (dek_orientacao === '1-1' || dek_orientacao === '1-2') pre_jogo.idioma_falado_mult = pre_jogo.idioma_1
  if (dek_orientacao === '2-1' || dek_orientacao === '2-2') pre_jogo.idioma_falado_mult = pre_jogo.idioma_2

  // Primeiro desaparecemos com todas as telas popup dessa parada.
  document.getElementById('recip_joga_ou_treina').style.display = 'none'
  document.getElementById('recip_modos_jogo').style.display = 'none'
  document.getElementById('recip_orientacao_escrita').style.display = 'none'
  document.getElementById('recip_alfabetos_escrita').style.display = 'none'

  let botao_vem = '', botao_vai = ''

  if (telinha === 'joga_ou_treina') {

    // Aqui não tem botão vem.
    if (escolhas_dek.joga_ou_treina === '') botao_vai = "<i class='icon-right-open-1 vai_vem_inativo'></i>"
    if (escolhas_dek.joga_ou_treina != '') botao_vai = `<i class='icon-right-open-1 vai_vem_ativo' onclick='aparece_popup("modalidades")'></i>`
  }

  if (telinha === 'modalidades') {

    botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='aparece_popup("joga_ou_treina")'></i>`

    // No treino, podemos escolher a orientação. No joga, sempre é aleatória.

    if (escolhas_dek.joga_ou_treina === 'joga') {

      const esta_ativado = (escolhas_dek.modalidade === '') ? 'bot_start_inativo' : 'bot_start_ativo'

      botao_vai = `<div id="recip_bot_modalidades_start" class="flex_row center botao_start ${esta_ativado}" onclick="apertou_startao('${pre_jogo.id_decoreba}');"><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
    }

    if (escolhas_dek.joga_ou_treina === 'treina') {

      if (escolhas_dek.modalidade === '') botao_vai = "<i class='icon-right-open-1 vai_vem_inativo'></i>"
      if (escolhas_dek.modalidade != '') botao_vai = `<i class='icon-right-open-1 vai_vem_ativo' onclick='aparece_popup("orientacao")'></i>`
    }
    
  }

  if (telinha === 'orientacao') {

    botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='aparece_popup("modalidades")'></i>`
    
    if (pre_jogo.sistemas_escrita_1.length != 1 || pre_jogo.sistemas_escrita_2.length != 1) {

      if (escolhas_dek.orientacao === '') botao_vai = `<i class='icon-right-open-1 vai_vem_inativo'></i>`
      if (escolhas_dek.orientacao != '') botao_vai = `<i class='icon-right-open-1 vai_vem_ativo' onclick='aparece_popup("alfabetos");'></i>`
    }

    // Se a dekoreba só tem um alfabeto em cada um dos idiomas e já tem alguma orientação previamente escolhida...
    if (pre_jogo.sistemas_escrita_1.length === 1 & pre_jogo.sistemas_escrita_2.length === 1 & escolhas_dek.orientacao != '') {

      if (escolhas_dek.modalidade === 'multipla_escolha') {
        botao_vai = `<div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_ativo" onclick='carrega_pergunta("treino", ${pre_jogo.i}, "${escolhas_dek.orientacao}", "${pre_jogo.id_decoreba}", ${pre_jogo.i_capitulo}, "${pre_jogo.id_usuario}", "${pre_jogo.avatar}", "${pre_jogo.distancia_global}", "${pre_jogo.idioma_falado_mult}", "primeira_pergunta");'><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
      }

      if (escolhas_dek.modalidade === 'escrita') {
        const obj_str = JSON.stringify(pre_jogo)
        botao_vai = `<div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_ativo" onclick='carrega_pergunta_escrita("treino" ,"${escolhas_dek.orientacao}", ${obj_str}, "primeira_pergunta");'><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
      }
    }
    
    // Se a dekoreba só tem um alfabeto em cada um dos idiomas e não tem nenhuma orientação ainda escolhida...
    if (pre_jogo.sistemas_escrita_1.length === 1 & pre_jogo.sistemas_escrita_2.length === 1 & escolhas_dek.orientacao === '') {
      botao_vai = `<div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_inativo"><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
    }

  }

  // Se mostra essa tela, é pq existe mais de um alfabeto na dekoreba.
  if (telinha === 'alfabetos') {

    botao_vem = `<i class='icon-left-open-1 vai_vem_ativo' onclick='aparece_popup("orientacao")'></i>`

    if (!escolhas_dek.alfabetos_perg.length || !escolhas_dek.alfabetos_resp.length) {

      botao_vai = `<div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_inativo"><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
    }

    // Se tem um length nas escolhas abaixo é pq já dá pra jogar.
    if (escolhas_dek.alfabetos_perg.length && escolhas_dek.alfabetos_resp.length) {

      // Esses códigos do botão_vai tão repetindo alí em cima. dá pra melhorar isso.
      if (escolhas_dek.modalidade === 'multipla_escolha') {

        botao_vai = `<div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_ativo" onclick='carrega_pergunta("treino", ${pre_jogo.i}, "${escolhas_dek.orientacao}", "${pre_jogo.id_decoreba}", ${pre_jogo.i_capitulo}, "${pre_jogo.id_usuario}", "${pre_jogo.avatar}", "${pre_jogo.distancia_global}", "${pre_jogo.idioma_falado_mult}", "primeira_pergunta");'><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
      }

      if (escolhas_dek.modalidade === 'escrita') {

        const obj_str = JSON.stringify(pre_jogo)
        botao_vai = `<div id="recip_bot_orient_vai" class="flex_row center botao_start bot_start_ativo" onclick='carrega_pergunta_escrita("treino","${escolhas_dek.orientacao}", ${obj_str}, "primeira_pergunta");'><i class="icon-play" style="margin-right: 5px;"></i> START</div>`
      }
    }
  }


  const botoes_vem_vai = faz_botoes_vem_vai(botao_vem, botao_vai) // Fazemos esse html no faz_html_aux...

  // Aqui criará todos os botões da telinha.
  // Se tiver algum botão selecionado, seleciona-o.

  if (telinha === 'joga_ou_treina') {

    const i = pre_jogo.i
    // Aqui tem que ser -1 pq o i conta todos os capítulos, e o primeiro é o tipo === 'verbos', logo, não conta.
    const parametros_treino = vai_joga_treina[i - 1]

    pre_jogo.i = parametros_treino.i
    pre_jogo.titulo_capitulo = stri[pre_jogo.i].titulo
    pre_jogo.i_capitulo = parametros_treino.i
  
    const atividade_joga = (escolhas_dek.joga_ou_treina === 'joga') ? 'bot_ativo' : 'bot_inativo'
    const atividade_treina = (escolhas_dek.joga_ou_treina === 'treina') ? 'bot_ativo' : 'bot_inativo'

    const bot_joga = faz_botao_popup_joga_treina('joga', 'Pra Valer', atividade_joga)    
    const bot_treina = faz_botao_popup_joga_treina('treina', 'Treinar', atividade_treina)

    document.getElementById('recip_joga_ou_treina_dentro').innerHTML = `
      ${bot_joga}
      ${bot_treina}
      ${botoes_vem_vai}
    `
    document.getElementById('recip_joga_ou_treina').style.display = 'flex'
  }

  if (telinha === 'modalidades') {

    const atividade_mult_esc = (escolhas_dek.modalidade === 'multipla_escolha') ? 'bot_ativo': 'bot_inativo'
    const atividade_escrita = (escolhas_dek.modalidade === 'escrita') ? 'bot_ativo': 'bot_inativo'

    const bot_mult = faz_botao_popup_modalidade('bot_multipla_escolha', atividade_mult_esc, 'multipla_escolha', 'Múltipla Escolha', 'icon-multiplas_escolhas')
    const bot_escr = faz_botao_popup_modalidade('bot_escrita', atividade_escrita, 'escrita', 'Escrita', 'icon-escrever')

    document.getElementById('recip_modos_jogo_dentro').innerHTML = `
      ${bot_mult}
      ${bot_escr}
      ${botoes_vem_vai}
    `
   
    document.getElementById('recip_modos_jogo').style.display = 'flex'
  }

  if (telinha === 'orientacao') {

    // Aqui nesta tela devemos ver qts alfabetos são possíveis na dekoreba.
    // Se tem só um em cada um dos idiomas e se tem orientação já escolhida, aparecer o START.

    const atividade_bot_1_2 = (escolhas_dek.orientacao === '1-2') ? 'bot_ativo' : 'bot_inativo'
    const atividade_bot_2_1 = (escolhas_dek.orientacao === '2-1') ? 'bot_ativo' : 'bot_inativo'
    const atividade_bot_1_1 = (escolhas_dek.orientacao === '1-1') ? 'bot_ativo' : 'bot_inativo'
    const atividade_bot_2_2 = (escolhas_dek.orientacao === '2-2') ? 'bot_ativo' : 'bot_inativo'
    const atividade_aleatoria = (escolhas_dek.orientacao === 'aleatoria') ? 'bot_ativo' : 'bot_inativo'

    // Bandeiras
    const bandeira_idi_1 = volta_bandeira(pre_jogo.idioma_1, 35, 0)
    const bandeira_idi_2 = volta_bandeira(pre_jogo.idioma_2, 35, 0)

    let botao_1_2 = faz_botao_popup_orientacao('bot_1-2', atividade_bot_1_2, '1-2', bandeira_idi_1, bandeira_idi_2)
    let botao_2_1 = faz_botao_popup_orientacao('bot_2-1', atividade_bot_2_1, '2-1', bandeira_idi_2, bandeira_idi_1)
    let botao_aleatoria = faz_botao_popup_orientacao('bot_aleatoria', atividade_aleatoria, 'aleatoria', '', '')


    // Agora criamos os botões de idiomas iguais e vemos se é o caso de mostrá-los ou não.
    // Mostramos eles apenas em caso de prática de alfabetos diferentes no mesmo idioma ou se a modalidade for falada,
    // Assim o camarada pode praticar a pronúncia.

    let botao_1_1 = ''
    let botao_2_2 = ''

    if (pre_jogo.sistemas_escrita_1.length > 1 || escolhas_dek.modalidade === 'falada') {

      botao_1_1 = faz_botao_popup_orientacao('bot_1-1', atividade_bot_1_1, '1-1', bandeira_idi_1, bandeira_idi_1)
    }

    if (pre_jogo.sistemas_escrita_2.length > 1 || escolhas_dek.modalidade === 'falada') {

      botao_1_1 = faz_botao_popup_orientacao('bot_2-2', atividade_bot_2_2, '2-2', bandeira_idi_2, bandeira_idi_2)
    }

    document.getElementById('recip_orientacao_escrita_dentro').innerHTML = `
      <div class="flex_row T1 center" style="margin-top: 5px; margin-bottom: 10px; color: grey; font-size: 19px;">Pergunta / Resposta</div>
      <br>

      <div class="flex_col T1 center">
        ${botao_1_2}
        ${botao_2_1}
        ${botao_1_1}
        ${botao_2_2}
        ${botao_aleatoria}

      </div>

      ${botoes_vem_vai}
    `

    document.getElementById('recip_orientacao_escrita').style.display = 'flex'
  }

  if (telinha === 'alfabetos') {

    // No multipla escolha pode tudo. Idiomas iguais, alfabetos diferentes entre perguntas e respostas.
    // Na escrita só pode haver um único alfabeto nas respostas, não podendo ele conter nas perguntas
    // Na fala, sem alfabetos nas respostas.

    // Definimos os sistemas de escrita das perguntas e o das respostas.
    let sis_escr_perg
    let sis_escr_resp

    let bandeira_1
    let bandeira_2

    const orientacao = escolhas_dek.orientacao

    // Descobre o sistema de escrita das perguntas
    if (orientacao == '1-2' || orientacao == '1-1') {
      sis_escr_perg = pre_jogo.sistemas_escrita_1

      bandeira_1 = volta_bandeira(pre_jogo.idioma_1, 35, 0)
      bandeira_2 = volta_bandeira(pre_jogo.idioma_2, 35, 0)

      // Correção para o caso de 1-1.
      if (orientacao == '1-1') bandeira_2 = volta_bandeira(pre_jogo.idioma_1, 35, 0)
    }

    if (orientacao == '2-1' || orientacao == '2-2') {
      sis_escr_perg = pre_jogo.sistemas_escrita_2

      bandeira_1 = volta_bandeira(pre_jogo.idioma_2, 35, 0)
      bandeira_2 = volta_bandeira(pre_jogo.idioma_1, 35, 0)

      // Correção para o caso de 2-2. Por enquanto não tem mas vai que...
      if (orientacao == '2-2') bandeira_2 = volta_bandeira(pre_jogo.idioma_2, 35, 0)
    }

    // Descobre o sistema de escrita das respostas
    if (orientacao == '2-1' || orientacao == '1-1') {

      sis_escr_resp = pre_jogo.sistemas_escrita_1
    }
    if (orientacao == '1-2' || orientacao == '2-2') {

      sis_escr_resp = pre_jogo.sistemas_escrita_2
    }

    // Gambsz que nem funfz
    if (orientacao === 'aleatoria') {

      // Aqui, pre_jogo.sistemas_escrita_2 sempre será o do português, logo...


      sis_escr_perg = pre_jogo.sistemas_escrita_1
      sis_escr_resp = pre_jogo.sistemas_escrita_2

      bandeira_1 = volta_bandeira(pre_jogo.idioma_1, 35, 0)
      bandeira_2 = volta_bandeira(pre_jogo.idioma_2, 35, 0)
    }

    let botoes_alfas_perg = ''
    let botoes_alfas_resp = ''


    for (let i = 0; i < sis_escr_perg.length; i++) {

      const innerHTML_do_sistema = innerHTML_sist_escr(sis_escr_perg[i].sistema) // Sistema de escrita.

      let classe_ativacao = 'bot_inativo'
      if (escolhas_dek.alfabetos_perg.length) {
        for (let j = 0; j < escolhas_dek.alfabetos_perg.length; j++) {
          if (escolhas_dek.alfabetos_perg[j] === innerHTML_do_sistema) {

            classe_ativacao = 'bot_ativo'
          }
        }
      }

      const id_botao = `bot_perg_${escolhas_dek.orientacao}_${sis_escr_perg[i].sistema}`
      botoes_alfas_perg += faz_botao_popup_alfas(id_botao, classe_ativacao, "perg", "alfabetos_perg", innerHTML_do_sistema)

    }

    for (let i = 0; i < sis_escr_resp.length; i++) {

      const innerHTML_do_sistema = innerHTML_sist_escr(sis_escr_resp[i].sistema)

      let classe_ativacao = 'bot_inativo'
        if (escolhas_dek.alfabetos_resp.length) {
          for (let j = 0; j < escolhas_dek.alfabetos_resp.length; j++) {
          if (escolhas_dek.alfabetos_resp[j] === innerHTML_do_sistema) {

            classe_ativacao = 'bot_ativo'
          }
        }
      }


      const id_botao = `bot_resp_${escolhas_dek.orientacao}_${sis_escr_resp[i].sistema}`
      botoes_alfas_resp += faz_botao_popup_alfas(id_botao, classe_ativacao, "resp", "alfabetos_resp", innerHTML_do_sistema)

    }




    // let enunciado_sist_1 = `${bandeira_1}<span style="margin-top: 20px; font-size: 19px; color: grey;">Sistema(s) de escrita da pergunta</span>`
    let enunciado_sist_1 = bandeira_1
    let enunciado_sist_2 = bandeira_2


    document.getElementById('recip_botoes_alfa_escr').innerHTML = `
        
        ${enunciado_sist_1}
        <div id="recip_bots_pergs" class="flex_row T1 center" style="margin-bottom: 25px;">
          ${botoes_alfas_perg}
        </div>
        
        ${enunciado_sist_2}
        <div id="recip_bots_resps" class="flex_row T1 center">
          ${botoes_alfas_resp}
        </div>

        ${botoes_vem_vai}
    `
    
    document.getElementById('recip_orientacao_escrita').style.display = 'none'
    document.getElementById('recip_alfabetos_escrita').style.display = 'flex'
  }

}

function valida_ativacao_alfabeto (botao, categoria, alfabeto, sis_escr_perg, sis_escr_resp) {
  
  // Primeiro verificamos para não deixarmos apenas um único alfabeto na pergunta ou resposta.

  let qtd_alfas_perg = escolhas_dek.alfabetos_perg.length
  let qtd_alfas_resp = escolhas_dek.alfabetos_resp.length

  // console.log(`Qtd alfabetos na pergunta (antes do click): ${qtd_alfas_perg}`)

  // Mexeu nos alfabetos das perguntas
  if (categoria === 'perg') {

    if (escolhas_dek.orientacao === '1-2' || escolhas_dek.orientacao === '2-1') {

    }
    if (escolhas_dek.orientacao === '1-1' || escolhas_dek.orientacao === '2-2') {

      if (botao.classList.contains("bot_inativo")) {

        if (qtd_alfas_perg == 0 || qtd_alfas_perg == 1) {
          botao.classList.remove("bot_inativo")
          botao.classList.add("bot_ativo")
          return
        } else {
          // Aqui temos que impedir do alfabeto da resposta ser o mesmo do das perguntas.

          // Primeiro pegar todos os alfabetos ativos das perguntas.
          // Depois os da respostas

        }
      }

      if (botao.classList.contains("bot_ativo")) escolhas_dek.alfabetos_perg
    }

    if (botao.classList.contains("bot_inativo")) {

      if (qtd_alfas_perg == 0 || qtd_alfas_perg == 1) {
        botao.classList.remove("bot_inativo")
        botao.classList.add("bot_ativo")
        return
      }
    }

    // Foi ativado um novo alfabeto na pergunta.
    /*
    if (botao.classList.contains("bot_ativo")) {

      // Aqui temos que verificar se, perguntas e respostas forem no mesmo idioma, algum alfabeto da pergunta
      // não se repetir na resposta.

      // Se perguntas e respostas tiverem idiomas iguais.
      if (escolhas_dek.orientacao === "1-1" || escolhas_dek.orientacao === "2-2") {

        // Vemos se já tem algum idioma na resposta escolhido

        // Se tiver
        if (escolhas_dek.alfabetos_perg.length) {

          // Fazemos um loop por todos os alfabetos ativos na resposta.
          for (let i = 0; i < escolhas_dek.alfabetos_resp.length; i++) {
            if (escolhas_dek.alfabetos_resp[i] === alfabeto) {

              // Aqui temos que desativar o alfabeto da resposta e ativar este alfabeto na pergunta.
              // Depois retornar
            }
          }
        }
      }
    }
    */
  }

  // Aqui tem que ver a orientação
  // Se for 1-1 ou 2-2. Não se pode ter o mesmo alfabeto na pergunta e na resposta.

}

// Ao iniciar o popup pré-jogo em uma dekoreba nunca dantes praticada, todos os botões selecionáveis devem
// estar com a classe bot_inativo, para não influenciarmos o jogador a escolher uma modalidade específica.

// Se tiver alguma monta_seleciona_sis_esc() quebrada, é só substituir a chamada dela por  ativa_desativa_botao()
// que é a msm coisa.
function ativa_desativa_botao (botao) {

  if (botao.classList.contains('bot_ativo')) {

    botao.classList.remove("bot_ativo")
    botao.classList.add("bot_inativo")
  } else if (botao.classList.contains('bot_inativo')) {

    botao.classList.remove("bot_inativo")
    botao.classList.add("bot_ativo")
  }
}

function ativa_botao (botao) {
  if (botao.classList.contains('bot_inativo')) {

    botao.classList.remove("bot_inativo")
    botao.classList.add("bot_ativo")
  }
}
// É aqui que ficará toda a ciência dos popups.
// É aqui nessa função que o sistema saberá o que fazer. Se aparece o botão jogar, se vai pra próxima popup e pans.

var gambiarra_orientacao_treino = ''
function atualiza_escolhas (tipo, complemento) {

  console.log(complemento)

  if (tipo === 'joga_ou_treina' & escolhas_dek.joga_ou_treina != complemento) {

    escolhas_dek.joga_ou_treina = complemento
      
    escolhas_dek.modalidade = ''
    escolhas_dek.orientacao = ''
    escolhas_dek.alfabetos_perg = []
    escolhas_dek.alfabetos_resp = []
  }


  if (tipo === 'modalidade' & escolhas_dek.modalidade != complemento) {

    if (escolhas_dek.modalidade != '') {
      const id_bot = `bot_${escolhas_dek.modalidade}`
      const botao_resp = document.getElementById(id_bot)
      ativa_desativa_botao(botao_resp)
    }
    
    escolhas_dek.modalidade = complemento
    escolhas_dek.orientacao = ''
    escolhas_dek.alfabetos_perg = []
    escolhas_dek.alfabetos_resp = []  
  }

  if (tipo === 'modalidade' & escolhas_dek.joga_ou_treina === 'joga') {
      let recip_bot_modalidades_start = document.getElementById('recip_bot_modalidades_start') 
      troca_classe(recip_bot_modalidades_start, "bot_start_inativo", "bot_start_ativo")
  }

  if (tipo === 'orientacao') {

    if (complemento === '1-1' || complemento === '1-2') pre_jogo.idioma_falado_mult = pre_jogo.idioma_1
    if (complemento === '2-1' || complemento === '2-2') pre_jogo.idioma_falado_mult = pre_jogo.idioma_2


    // Caso o camarada escolha uma outra orientação, apagamos os alfabetos previamente escolhidos.
    // Se for a primeira vez que ele escolhe uma orientação, salvamos ela e segue o baile.
    if (!escolhas_dek.orientacao) {
      escolhas_dek.orientacao = complemento
    } else if (escolhas_dek.orientacao) {
              
      const id_bot = `bot_${escolhas_dek.orientacao}`
      const botao_resp = document.getElementById(id_bot)
      ativa_desativa_botao(botao_resp)

      if (escolhas_dek.orientacao != complemento) {
        // Apagar as outras escolhidas
        escolhas_dek.orientacao = complemento
        escolhas_dek.alfabetos_perg = []
        escolhas_dek.alfabetos_resp = []
      }
    }

    // Aqui serve para as três modalidades.
    if (pre_jogo.sistemas_escrita_1.length === 1 & pre_jogo.sistemas_escrita_2.length === 1) {

      // Aqui zeramos estas benditas arrayas pra não dar duplicidade mais pra frente, quando o cabra clicar
      // em uma orientação várias vezes, pra não dar vários pushs cumulativos nessa parada.
      escolhas_dek.alfabetos_perg = []
      escolhas_dek.alfabetos_resp = []

      const sist_esc_per = (complemento === '1-1' || complemento === '1-2') ? pre_jogo.sistemas_escrita_1 : pre_jogo.sistemas_escrita_2

      const sist_esc_resp = (complemento === '1-2' || complemento === '2-2') ? pre_jogo.sistemas_escrita_2 : pre_jogo.sistemas_escrita_1

      const innerHTML_perg = innerHTML_sist_escr(sist_esc_per[0].sistema)
      const innerHTML_resp = innerHTML_sist_escr(sist_esc_resp[0].sistema)

      escolhas_dek.alfabetos_perg.push(innerHTML_perg)
      escolhas_dek.alfabetos_resp.push(innerHTML_resp)

      // Essa let recip_bot_vai está sendo declarada duas vezes nessa função, tem que ver isso ai.
      let recip_bot_vai = document.getElementById('recip_bot_orient_vai') 
      troca_classe(recip_bot_vai, "bot_start_inativo", "bot_start_ativo")

      // Aqui já deve aparecer o botão jogar.
      if (escolhas_dek.modalidade === 'multipla_escolha') {

        document.getElementById('recip_bot_orient_vai').onclick = function () { carrega_pergunta("treino", pre_jogo.i_capitulo, complemento, pre_jogo.id_decoreba, pre_jogo.i_capitulo, pre_jogo.id_usuario, pre_jogo.avatar, pre_jogo.distancia_global, pre_jogo.idioma_falado_mult, "primeira_pergunta")}
      }

      if (escolhas_dek.modalidade === 'escrita') {

        document.getElementById('recip_bot_orient_vai').onclick = function () {

          carrega_pergunta_escrita("treino", escolhas_dek.orientacao, pre_jogo, "primeira_pergunta")
        }
      }

      if (escolhas_dek.modalidade === 'falada') { }

    } else {
      aparece_popup("alfabetos", pre_jogo)
    }
  }

  // Testeamm.
  let esc_alfabetos_perg = escolhas_dek.alfabetos_perg
  let esc_alfabetos_resp = escolhas_dek.alfabetos_resp



  // Escolheu um alfabeto pras perguntas
  if (tipo === 'alfabetos_perg') {

    // Se não tem nenhum alfabeto nas perguntas da escolhas_dek, botemo-lo.
     // aqui, o complemento é o nome do alfabeto.
    if (!esc_alfabetos_perg.length) { esc_alfabetos_perg.push(complemento) }
    else if (esc_alfabetos_perg.length) {

      let alfabeto_ja_foi_escolhido = 'nao'

      for (let i = 0; i < esc_alfabetos_perg.length; i++) {
        
        if (esc_alfabetos_perg[i] == complemento) {

          alfabeto_ja_foi_escolhido = 'sim'

          // O if abaixo impede de ficar sem alfabetos nas perguntas
          if (esc_alfabetos_perg.length != 1 & esc_alfabetos_perg.length != 0) esc_alfabetos_perg.splice(i, 1)
        }
      }

      if (alfabeto_ja_foi_escolhido === 'nao') esc_alfabetos_perg.push(complemento)
    }

    // Agora, para idiomas iguais, precisamos impedir dois alfabetos igualmente iguais no jogo desta dekoreba.
    if (escolhas_dek.orientacao === '1-1' || escolhas_dek.orientacao === '2-2') {
      const alfabeto_pergunta_clicado = complemento

      if (esc_alfabetos_resp.length) {

        for (let i = 0; i < esc_alfabetos_resp.length; i++) {

          if (esc_alfabetos_resp[i] == alfabeto_pergunta_clicado) {

            escolhas_dek.alfabetos_resp.splice(i, 1)
              
            // Aqui precisa simular um clique no botão específico.
            const sis_es = reconhece_sist_escrita(complemento) // complemento aqui é o inner_html
            const id_bot = `bot_resp_${escolhas_dek.orientacao}_${sis_es}`
            const botao_resp = document.getElementById(id_bot)
            ativa_desativa_botao(botao_resp)
          }
        }
      }
    }
  }

  if (tipo === 'alfabetos_resp') {

    if (!esc_alfabetos_resp.length) {

      esc_alfabetos_resp.push(complemento)
    } else if (esc_alfabetos_resp.length) {

      // Se for modalidade escrita, somente um alfabeto temos que ter nas respostas.
      if (escolhas_dek.modalidade === 'escrita') {

        if (esc_alfabetos_resp.length === 1) {

          for (let i = 0; i < esc_alfabetos_resp.length; i++) {

            const sis_es = reconhece_sist_escrita(esc_alfabetos_resp[i])
            const id_bot = `bot_resp_${escolhas_dek.orientacao}_${sis_es}`
            const botao_resp = document.getElementById(id_bot)

            esc_alfabetos_resp.splice(i, 1)

            ativa_desativa_botao(botao_resp)
          }
        }

        esc_alfabetos_resp.push(complemento)
      }

      let alfabeto_ja_foi_escolhido = 'nao'
      for (let i = 0; i < esc_alfabetos_resp.length; i++) {
        
        if (esc_alfabetos_resp[i] == complemento) {

          alfabeto_ja_foi_escolhido = 'sim'

          if (esc_alfabetos_resp.length != 1 & esc_alfabetos_resp.length != 0) esc_alfabetos_resp.splice(i, 1)

        }
      }

      if (alfabeto_ja_foi_escolhido === 'nao') esc_alfabetos_resp.push(complemento)
    }

    // Agora, para idiomas iguais, precisamos impedir dois alfabetos igualmente iguais no jogo desta dekoreba.
    if (escolhas_dek.orientacao === '1-1' || escolhas_dek.orientacao === '2-2') {
      const alfabeto_resposta_clicado = complemento

      if (escolhas_dek.alfabetos_perg.length) {

        for (let i = 0; i < escolhas_dek.alfabetos_perg.length; i++) {
          if (escolhas_dek.alfabetos_perg[i] == alfabeto_resposta_clicado) {

            escolhas_dek.alfabetos_perg.splice(i, 1)

            const sis_es = reconhece_sist_escrita(complemento)
            const id_bot = `bot_perg_${escolhas_dek.orientacao}_${sis_es}`
            const botao_perg = document.getElementById(id_bot)
            ativa_desativa_botao(botao_perg)
          }
        }
      }
    }
  }

  pre_jogo.orientacao_idiomas_global = escolhas_dek.orientacao


  // Aqui embaixo vemos se aparecerá ou sumirá o botão jogar da tela popup de escolha de alfabetos.
  if (tipo === 'alfabetos_perg' || tipo === 'alfabetos_resp') {

    let recip_bot_vai = document.getElementById('recip_bot_orient_vai')

    // Se tem um alfabeto na pergunta e um na resposta, pelo menos.

    if (escolhas_dek.alfabetos_perg.length >= 1 & escolhas_dek.alfabetos_resp.length >= 1) {

      troca_classe(recip_bot_vai, "bot_start_inativo", "bot_start_ativo")


      // Aqui já deve aparecer o botão jogar.
      if (escolhas_dek.modalidade === 'multipla_escolha') {
        recip_bot_vai.onclick = function () {carrega_pergunta("treino", pre_jogo.i, pre_jogo.orientacao_idiomas_global, pre_jogo.id_decoreba, pre_jogo.i_capitulo, pre_jogo.id_usuario, pre_jogo.avatar, pre_jogo.distancia_global, pre_jogo.idioma_falado_mult, "primeira_pergunta")}
      }

      if (escolhas_dek.modalidade === 'escrita') {
        recip_bot_vai.onclick = function () {
          carrega_pergunta_escrita("treino", escolhas_dek.orientacao, pre_jogo, "primeira_pergunta")
        }
      }
    } else {

      troca_classe(recip_bot_vai, "bot_start_ativo", "bot_start_inativo")
      recip_bot_vai.onclick = ''
    }
  }
}

function mostra_pontuacao() {
   const recip = document.getElementById('mostra_recip_pontuacao')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
    document.body.style.overflow = 'hidden'

  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
    document.body.style.overflow = 'auto'

  }
}

function mostra_pontos () {
  let recip = document.getElementById('recip_pontos')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
    document.body.style.overflow = 'hidden'

  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
    document.body.style.overflow = 'auto'

  }
}

var tamanho_frase_var = ''
function tamanho_frase (tipo) {

  let bot_frase_curta = document.getElementById('bot_frase_curta')
  let bot_frase_longa = document.getElementById('bot_frase_longa')
  let bot_paragrafo = document.getElementById('bot_paragrafo')


  if (bot_frase_curta.classList.contains('bot_ativo')) {
    bot_frase_curta.classList.remove("bot_ativo")
    bot_frase_curta.classList.add("bot_inativo")
  }

  if (bot_frase_longa.classList.contains('bot_ativo')) {
    bot_frase_longa.classList.remove("bot_ativo")
    bot_frase_longa.classList.add("bot_inativo")
  }

  if (bot_paragrafo.classList.contains('bot_ativo')) {
    bot_paragrafo.classList.remove("bot_ativo")
    bot_paragrafo.classList.add("bot_inativo")
  }


  if (tipo === 'frase_curta') {
    bot_frase_curta.classList.remove("bot_inativo")
    bot_frase_curta.classList.add("bot_ativo")
  }

  if (tipo === 'frase_longa') {
    bot_frase_longa.classList.remove("bot_inativo")
    bot_frase_longa.classList.add("bot_ativo")
  }

  if (tipo === 'paragrafo') {
    bot_paragrafo.classList.remove("bot_inativo")
    bot_paragrafo.classList.add("bot_ativo")
  }

  tamanho_frase_var = tipo
}

function mostra_ajuda (tela) {

  const recip = document.getElementById('mostra_recip_info')
  const caixinha_dentro = document.getElementById('mostra_info')

  let info_ajuda = ''

  if (tela === 'perfil') {
    info_ajuda = `
    <span class="paragrafo">Eu sei, eu sei. Essa página de perfil está mais vazia que minha carteira.</span>
    <span class="paragrafo">Mas em breve, se tudo correr bem, deverá ter bem mais coisas, como um sistema de recompensas, busca por outros usuários e diversas outras paradinhas da hora.</span>
    <span class="paragrafo">Na verdade eu pensei só nessas duas mesmo, mas se você tiver alguma sugestão, falai.</span>`
  }

  if (tela === 'sobre_dekoreba') {

    info_ajuda = `
      
      <span class="paragrafo">Você pode até achar que decorar é coisa do passado, e na verdade é mesmo, mas convenhamos que, antigamente, o estudo era bem mais eficaz.</span>

      <span class="paragrafo">Decorar faz parte do nosso aprendizado. É assim que aprendemos as coisas como, por exemplo, algum novo golpe de artes marciais. Para aprendê-lo, você deverá executar o movimento correto inúmeras vezes até o seu cérebro <b>decorar</b> como se se faz, somente assim você será capaz de aplicar este golpe instantaneamente, no mesmo momento em que pensar nele.</span>

      <div class="flex_col T1 center" style="margin-top: 30px; margin-bottom: 30px;">
        <img src="./imagens/home_interrogacao/bruce_2.png" style="width: 400px;">
        <span class="legenda_img">Watchaooo!!!</span>
      </div>

      <span class="paragrafo">Um outro bom exemplo de como aprendemos é o ato de digirir um carro. No começo, você troca as marchas movimentando a embreagem, aciona os freios e acelera, tudo com o máximo de atenção possível. Uma vez que você <b>decora</b> esses movimentos, o ato de dirigir se torna automático. Você simplesmente se senta em frente ao volante, liga o carro e vai. Quando menos perceber, você já vai estar estacionando em seu destino.
      </span>

      <div class="flex_col T1 center" style="margin-top: 30px; margin-bottom: 30px;">
        <img src="./imagens/home_interrogacao/carro.jpg" style="width: 100%; max-width: 600px;">
        <span class="legenda_img">Dirigindo.</span>
      </div>

      <span class="paragrafo">Isso acontece por que somos assim. Nosso cérebro aprende coisas novas ligando uns neurônios nos outros. Estas ligações nós chamamos de <b>sinapses</b>.</span>

      <span class="paragrafo">E toda vez que nós repetimos cada nova habilidade aprendida, nós reforçamos esta sinapse, automatizando ainda mais esta ação.</span>

      <div class="flex_col T1 center" style="margin-top: 30px; margin-bottom: 30px;">
        <img src="./imagens/home_interrogacao/cerebro.jpeg" style="width: 100%;">
        <span class="legenda_img">Ferramenta fantástica, capaz de coisas do arco da véia.</span>
      </div>

      <span class="paragrafo">Monges budistas utilizam muito esta técnica da "decoreba" para gravar na mente livros inteiros. Antigamente, em nossas escolas, nós decorávamos a tabuada, o que facilitava absurdamente nossa vida durante toda a futura trajetória pela matemática. Quem aí se lembra da datilografia? Pois é, quem passou por este método de <b>decorar</b> a posição dos dedos na máquina de escrever, hoje tecla com a velocidade de uma lebre (e a força bruta de um cavalo, mas enfim).</span>

      <div class="flex_col T1 center" style="margin-top: 30px; margin-bottom: 30px;">
        <img src="./imagens/home_interrogacao/monge_budista_estudando.jpg" style="width: 400px;">
        <span class="legenda_img">O hábito faz o monge.</span>
      </div>

      <span class="paragrafo">Talvez hoje, <b>decorar</b> inúmeras datas e dados menores não seja realmente de grande proveito, dado a quantidade absurda de informações que temos ao alcance imediato dos dedos, mas tem coisas que ainda vale muito a pena <b>decorar</b>, e o vocabulário de novos idiomas é uma delas. Quando aprendemos uma nova língua, desculpem o trocadilho, a gente precisa ter as palavras na ponta da língua.</span>

      <span class="paragrafo">Resumindo, a "decoreba" não é um método completo de aprendizado, ela é apenas uma <b>ferramenta</b>. E convenhamos, uma baita de uma ferramenta. Então, se quiser <b>decorar</b> algum vocabulário de alguma língua extrangeira, é só clicar neste menuzinho no meio da tela e ser feliz.</span>

      <div class="flex_col T1 center" style="margin-top: 30px; margin-bottom: 0px;">
        <img src="./imagens/home_interrogacao/jesuita_estudando_2.png" style="width: 300px;">
      </div>

      <div class="flex_col T1 center" style="flex-wrap; wrap; margin-bottom: 50px; font-size: 33px; align-text: center;">
        <div class="flex_row T1 center" style="margin-top: 15px; margin-bottom: 15px;">Repetitio est mater studiorum.</div>
        <div style="font-size: 22px; align-text: center;">A repetição é a mãe dos estudos.</div>
      </div>
    `
  }

  if (tela === 'home') {

    info_ajuda = `

      <div class="flex_row T1 center" style="margin-bottom: 25px; margin-top: 25px;">

        <i class="icon-imagotipo index_logotipo_pc estilo_insta exclusivo_pc" style="width: 505px; margin-left: 50px; margin-bottom: 50px; margin-top: 50px;"></i>
        <i class="icon-isotipo index_logotipo_mobile estilo_insta exclusivo_mobile" style="font-size: 120px; width: 200px; margin-left: 100px;"></i>

      </div>

      <span class="paragrafo">Este é o Dekoreba!</span>
      <span class="paragrafo">Treinamento para memorização de palavras e conjugação verbal em vários idiomas.</span>

      <span class="paragrafo">Você pode <button class="botao bot_cabecalho" onclick="mostra_ajuda('sobre_dekoreba')">clicar aqui</button> para entender um pouco mais sobre como esse treinamento funciona.</span>

      <span class="paragrafo">Mas, se quiser pular logo para a ação, feche essa janela e clique em "Escolha um idioma", e então, escolha um idioma.</span>

      <span class="paragrafo">Precisando de ajuda, é só clicar neste símbolo <i class="icon-help icone_cabecalho icone_interrogacao" style="color: var(--cinza_meio_escuro); color: red; margin: 0px;"></i> que estará no cantinho da tela.</span>

      <span class="paragrafo">Bons estudos/treinos.</span>

      <div class="flex_row T1 center">
        <button class="botao" onclick="mostra_informacoes()">Fechar</button>
      </div>
    `
  }
  if (tela === 'mostra') {

    info_ajuda = `
      <span class="paragrafo">Essa é a tela de uma dekoreba. Não tem mistério, aqui você poderá praticar o vocabulário de vários idiomas diferentes até ficar craque.</span>

      <span class="paragrafo">Temos abaixo duas modalidades, <b>Palavras</b> e <b>Conjugação Verbal</b>.</span>

      <span class="paragrafo">Na modalidade, <b>Palavras</b>, você tem o modo <b>Múltipla Escolha</b>, que é onde você libera novas palavras para praticar, e também o modo <b>Escrita</b>, que é onde você pratica escrevendo. Detalhe, você pode treinar aqui utilizando a tela do celular, mas um teclado é super recomendado. No múltipla escolha, você também pode utilizar as teclas 8, 5 e 2 do teclado.</span>

      <span class="paragrafo">Essas duas modalidades estão presentes nas opções <b>Pra Valer</b> e <b>Treino</b>. Em Pra Valer, você libera novas palavras no Múltipla Escolha para praticá-las também no modo Escrita. Na opção Treino, você apenas treina as palavras já liberadas.</span>

      <span class="paragrafo">Temos também uma modalidade de <b>Conjugação Verbal</b>. Aqui. ainda não temos um sistema de pontuação, para liberar novas conjugações, sendo apenas uma modalidade para treino. Temos lá um campo para você imprimir a conjugação que desejar, para praticas offline.</span>

      <span class="paragrafo">Naquele botão de pergaminho, você encontra uma lista com as palavras liberadas, um botão para <b>imprimir</b> sua lista, e um outro que te leva à um <b>teste</b>, onde você pode marcar coo decoradas, palavras que você já saiba, dependendo do seu nível de fluência no idioma praticado.</span>

      <span class="paragrafo">Basicamente é isso aí mesmo! Qualquer coisa, tamo djúnto.</span> 
    `

  }

  caixinha_dentro.innerHTML = `
    <div class="flex_row T1 barra_superior_popup_sombra">
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_informacoes()"></i> 
    </div>

    <div class="flex_col T1 caixinha_dentro">
    ${info_ajuda}
    </div>`

  if (tela != 'sobre_dekoreba') {
    if (recip.classList.contains("sumido")) {
      recip.classList.remove("sumido")
      document.body.style.overflow = 'hidden'

    } else if (!recip.classList.contains("sumido")) {
      recip.classList.add("sumido")
      document.body.style.overflow = 'auto'
    }
  }

  if (tela === 'sobre_dekoreba') {

  }
  

}
function fecha_checkpoint (modalidade) {
  document.getElementById('jogo_recip_checkpoint').style.display = 'none'
  document.body.style.overflow = 'auto'
  eurekaAleatória(pre_jogo, modalidade)
}


function fecha_palavra_liberada () {
    document.getElementById('jogo_recip_palavra_liberada').style.display = 'none'
      document.body.style.overflow = 'auto'

  // Segue aqui o eurekaAleat

          const obj_vai = {
            i_capitulo: 1, // 3 é aleatório, gambiarra.
            opcao: orientacao_global,
            id_decoreba: pre_jogo.id_decoreba,
            i_capitulo: 1, // 3 é aleatório, gambiarra.,
            id_usuario: pre_jogo.id_usuario,
            avatar: pre_jogo.avatar,
            distancia: pre_jogo.distancia,
            idioma_falado: pre_jogo.idioma_falado
          }

          eurekaAleatória(obj_vai, 'mult_esc')
}

function fecha_info_palavra () {
  document.getElementById('jogo_recip_info_palavra').style.display = 'none'
  document.body.style.overflow = 'auto'
}

function fecha_teste_inicial () {

  document.getElementById('home_recip_teste').style.display = 'none'
  document.body.style.overflow = 'auto'
}

function mostra_opcoes () {
  const recip = document.getElementById('mostra_recip_info_opc')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
        document.body.style.overflow = 'hidden'

  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
        document.body.style.overflow = 'auto'

  }
}

function mostra_info_dekoreba_toda () {
  const recip = document.getElementById('mostra_recip_info')
  const caixinha_dentro = document.getElementById('mostra_info')

  caixinha_dentro.innerHTML = `
    <div class="flex_row T1 barra_superior_popup_sombra">
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_informacoes()"></i> 
    </div>

    <div class="flex_col T1 caixinha_dentro">
    ${info_dekoreba_toda}
    </div>`

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
        document.body.style.overflow = 'hidden'

  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
        document.body.style.overflow = 'auto'

  }

}


function mostra_informacoes(i) {

  const recip = document.getElementById('mostra_recip_info')
  const caixinha_dentro = document.getElementById('mostra_info')
  if (i >= 0) {
    caixinha_dentro.innerHTML = `
    <div class="flex_row T1 barra_superior_popup_sombra">
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_informacoes()"></i> 
    </div>

    <br>
    <div class="flex_col T1 caixa_info_texto" style="margin-top: 70px; padding: 15px;">
    ${jasao_temp[i]}
    </div>`
  }

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
        document.body.style.overflow = 'hidden'

  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
        document.body.style.overflow = 'auto'

  }
}

async function mostra_lista_palavras (i, vocabulario, orientacao, primeiro_idioma, segundo_idioma, titulo_captitulo, informacoes, id_decoreba, id_capitulo, modalidade, palavras_liberadas_mult, palavras_liberadas_escr) {


  const recip = document.getElementById('mostra_recip_info')
  let caixinha_dentro = document.getElementById('mostra_info')

  // Se fechou, já retorna o código e nem prossegue.
  if (i === 'fecha') {

    recip.innerHTML = '<div id="mostra_info" class="flex_col T1 mostra_info_caixinha"></div>'

    if (recip.classList.contains("sumido")) {
      recip.classList.remove("sumido")

      document.body.style.overflow = 'hidden'
    } else if (!recip.classList.contains("sumido")) {
      recip.classList.add("sumido")
      
      caixinha_dentro.style.maxWidth = "1000px"
      
      document.body.style.overflow = 'auto'
    }

    return
  } else {
    if (recip.classList.contains("sumido")) {
      recip.classList.remove("sumido")
      if (modalidade) caixinha_dentro.style.maxWidth = "600px"
      document.body.style.overflow = 'hidden'
    }
  }


  // Aqui trataremos o vocabulario com relacao às aspas
  // Quando mandamos o vocabulario pelo JSON.strinfigy, ele modifica os &#39; gravados no banco por aspas simples,
  // o que ferra totalmente o esquema aqui. Logo temos que, recolocar os códigos no lugar das aspas.
  for (let j = 0; j < vocabulario.length; j++) {

    for (let n_idioma = 1; n_idioma < 3; n_idioma++) {

      let idioma = (n_idioma === 1) ? vocabulario[j].idioma_1 : vocabulario[j].idioma_2

      for (let k = 0; k < idioma.length; k++) {
        idioma[k].item = idioma[k].item.replace("'", "&#39;")
        idioma[k].item = idioma[k].item.replace('"', "&#34;")
      }
    }
  }
  
  
  const obj_vai = {
    id_decoreba: id_decoreba,
    id_capitulo: id_capitulo,
    modalidade: modalidade,
    orientacao: orientacao
  }

  loading('loading...')
  const puxa_dominio_palavras = await vai_filhao_2('puxa_dominio_palavras_capitulo', JSON.stringify(obj_vai))
  const cor = puxa_dominio_palavras.cor

  if (!puxa_dominio_palavras) {
    console.log("ta dando erro aqui")
    console.table(puxa_dominio_palavras)
  }

  const obj_mult_vai = puxa_dominio_palavras.obj_mult_vai
  const obj_escr_vai = puxa_dominio_palavras.obj_escr_vai

  
  let primeira_fileira
  let segunda_fileira 

  let string_palavras = ''

  let array_dominio_mult = []
  let array_dominio_escr = []


  if (obj_mult_vai) {
    if (obj_mult_vai.length) {
      for (let j = 0; j < obj_mult_vai.length; j++) {

        const orientacao_corrigida = orientacao.replace("_", "-")

        if (obj_mult_vai[j].dominio_palavras.length) {
          if (obj_mult_vai[j].orientacao === orientacao_corrigida) {

            for (let k = 0; k < obj_mult_vai[j].dominio_palavras.length; k++) {

              array_dominio_mult.push(obj_mult_vai[j].dominio_palavras[k])
            }
          }
        } 
      }
    }
  }

    /*
    if (obj_escr_vai.length) {
      for (let j = 0; j < obj_escr_vai.length; j++) {

        const orientacao_corrigida = orientacao.replace("_", "-")

        if (obj_escr_vai[j].orientacao === orientacao_corrigida & obj_escr_vai[j].dominio_palavras.length) {
          for (let k = 0; k < obj_escr_vai[j].dominio_palavras.length; k++) {
            array_dominio_escr.push(obj_escr_vai[j].dominio_palavras[k])
          }
        }
      }
    }
    */

  liberadas_mult = palavras_liberadas_mult
  liberadas_escr = palavras_liberadas_escr

  // Se for só treino, não mostra as paradas dos domínios.
  const classe_div_dominios = (aba_mostra_dekoreba === 'outros') ? 'sumido' : ''

  for (let i = 0; i < vocabulario.length; i++) {

    if (orientacao === '1_2') {
      primeira_fileira = vocabulario[i].idioma_1
      segunda_fileira = vocabulario[i].idioma_2
    }

    if (orientacao === '2_1') {
      primeira_fileira = vocabulario[i].idioma_2
      segunda_fileira = vocabulario[i].idioma_1
    }

    let achou_mult = 'nao'
    let achou_escr = 'nao'

    // Primeiro vemos se a palavra está liberada ou não.
    // Aqui, a qtd de incidências será apenas em idiomas com 1 alfabeto.
    // Muito importante isso aqui. Quando tiver mais de 1 alfabeto, precisa mudar.
    let qtd_incidencias_mult = 0
    for (let j = 0; j < liberadas_mult.length; j++) {
      if (vocabulario[i]._id == liberadas_mult[j].id_palavra) {
        achou_mult = 'sim'
        for (let k = 0; k < liberadas_mult[j].acertos_e_erros.length; k++) {
          qtd_incidencias_mult += liberadas_mult[j].acertos_e_erros[k].n_acertos_erros
        }
      }
    }

    let qtd_incidencias_escr = 0
    for (let j = 0; j < liberadas_escr.length; j++) {
      if (vocabulario[i]._id == liberadas_escr[j].id_palavra) {
        achou_escr = 'sim'
        for (let k = 0; k < liberadas_escr[j].acertos_e_erros.length; k++) {
          qtd_incidencias_escr += liberadas_escr[j].acertos_e_erros[k].n_acertos_erros
        }
      }
    }

    const largura_mult = qtd_incidencias_mult * 100 / 8
    const largura_escr = qtd_incidencias_escr * 100 / 8

    /*
    for (let j = 0; j < liberadas_mult.length; j++) {
      if (vocabulario[i]._id == liberadas_mult)
    }
    */

    const i_1 = acha_alfabeto_principal(primeiro_idioma, primeira_fileira)
    const idioma_1_falado_simples = simplifica_idioma(primeiro_idioma)
    const fonte_1_mp3 = `../mp3/${idioma_1_falado_simples}/${primeira_fileira[i_1].arquivo}.mp3`

    const i_2 = acha_alfabeto_principal(segundo_idioma, segunda_fileira)
    const idioma_2_falado_simples = simplifica_idioma(segundo_idioma)
    const fonte_2_mp3 = `../mp3/${idioma_2_falado_simples}/${segunda_fileira[i_2].arquivo}.mp3`

    // Agora precisamos achar criar o audio com o arquivo correto.

    // Depois criamos o botão, linkando ele com o áudio.
    // Inserimos ele no início da primeira palavra, no loop abaixo.

    // let fundo_palavra = 'background: #3b3b3b;'
    let fundo_palavra = 'background: var(--fundo_carta);'
    let cor_letras = 'color: var(--fundo_carta);'

    if (aba_mostra_dekoreba === 'outros') {
      achou_mult = 'sim'
      achou_mult = 'sim'
    }

      let botao_som_estilo = 'visibility: hidden;'
      if (achou_mult === 'sim' || achou_escr === 'sim') {
        fundo_palavra = ''
        cor_letras = ''
        botao_som_estilo = ''
      }

    // Por enquanto, 4 é o acerto e erro máximo de cada modalidade, logo,
    // 16 é o númer de qtd_incidencias_geral para se ter dekorebado.
    const qtd_incidencias_geral = qtd_incidencias_mult + qtd_incidencias_escr

    let classe_dominio = 'dominio_neutro'

    if (qtd_incidencias_geral === -9 || qtd_incidencias_geral === -10 || qtd_incidencias_geral === -11 || qtd_incidencias_geral === -12 || qtd_incidencias_geral === -13 || qtd_incidencias_geral === -14 || qtd_incidencias_geral === -15 || qtd_incidencias_geral === -16) classe_dominio = 'dominio_muito_ruim'

    if (qtd_incidencias_geral === -1 || qtd_incidencias_geral === -2 || qtd_incidencias_geral === -3 || qtd_incidencias_geral === -4 || qtd_incidencias_geral === -5 || qtd_incidencias_geral === -6 || qtd_incidencias_geral === -7 || qtd_incidencias_geral === -8) classe_dominio = 'dominio_ruim'
    
    if (qtd_incidencias_geral === 1 || qtd_incidencias_geral === 2 || qtd_incidencias_geral === 3 || qtd_incidencias_geral === 4 || qtd_incidencias_geral === 5 || qtd_incidencias_geral === 6 || qtd_incidencias_geral === 7 || qtd_incidencias_geral === 8) classe_dominio = 'dominio_bom'
    
    if (qtd_incidencias_geral === 9 || qtd_incidencias_geral === 10 || qtd_incidencias_geral === 11 || qtd_incidencias_geral === 12 || qtd_incidencias_geral === 13 || qtd_incidencias_geral === 14 || qtd_incidencias_geral === 15) classe_dominio = 'dominio_muito_bom'



    // Por enquanto, quando se tem 16 acertos, ou seja, dekorou a palavra por todos os métodos e orientações
    // ainda pinta de muito_bom, mas em breve pode-se fazer uma coloração super especial para uma palavra
    // 100% dekorada.

    classe_dominio = 'dominio_neutro'
    if (qtd_incidencias_geral === 16) classe_dominio = 'dominio_excelen'

    // if (qtd_incidencias_geral === 16) classe_dominio = 'dominio_excelente'

   // if (qtd_incidencias_geral === 9 || qtd_incidencias_geral === 10 || qtd_incidencias_geral === 11 || qtd_incidencias_geral === 12 || qtd_incidencias_geral === 13 || qtd_incidencias_geral === 14 || qtd_incidencias_geral === 15) classe_dominio = 'dominio_excelente'


    // Talvez essa linha abaixo nem precise, já que as palavras que só são de treino não somam acertos ou erros.
    if (aba_mostra_dekoreba === 'outros') classe_dominio = 'dominio_neutro'
    let fechou_primeira_fileira_com_termos = 'nao' // Serve pra isso, fechar a linha com termos da primeira coluna.

    for (let j = 0; j < primeira_fileira.length; j++) {

      /*
      let n_inc = 0
      let classe_dominio = 'dominio_neutro'

      
      if (array_dominio_mult.length) {
        for (let k = 0; k < array_dominio_mult.length; k++) {
          if (array_dominio_mult[k].id_palavra === vocabulario[i]._id) {
            n_inc = array_dominio_mult[k].qtd_incidencias

            const qtd_incidencias = array_dominio_mult[k].qtd_incidencias

            if (qtd_incidencias === -4 || qtd_incidencias === -3) classe_dominio = 'dominio_muito_ruim'
            if (qtd_incidencias === -2 || qtd_incidencias === -1) classe_dominio = 'dominio_ruim'
            if (qtd_incidencias === 1 || qtd_incidencias === 2) classe_dominio = 'dominio_bom'
            if (qtd_incidencias === 3 || qtd_incidencias === 4) classe_dominio = 'dominio_muito_bom'

          }
        }
      }
      */ 

      if (primeira_fileira[j].tipo === 'palavra') {

        if (j === 0) string_palavras += `<div class="flex_row T1 center" style="max-width: 500px; margin-top: 25px;">

          <audio id="pri_${i}_${j}">
            <source src="${fonte_1_mp3}" type="audio/mpeg"> Your browser does not support the audio element.
          </audio>

          <div class="flex_row center botao" style='margin: 5px; margin-left: 5px; height: 35px; ${botao_som_estilo}' onclick="document.getElementById('pri_${i}_${j}').play();">
            <i class="icon-volume"></i>
          </div>

          <div class="flex_row T2 ${classe_dominio}" style="overflow-x: scroll; overflow-y: hidden; border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding-left: 5px; ${fundo_palavra} ${cor_letras}"><span style="margin-right: 10px; display: none;">${qtd_incidencias_geral}</span>
        `
        // Dá pra escrever a ${qtd_incidencias_geral} na string abaixo, para saber quantos pontos a palavra
        // em questão já tem.

        if (primeira_fileira[j].tipo === 'palavra') string_palavras += `
            <div class="" style="display: inline-block; margin: 5px; white-space: nowrap; align-text: left;">${primeira_fileira[j].item}</div>
          `
        if (j === primeira_fileira.length - 1 & primeira_fileira[j].tipo === 'palavra') string_palavras += `</div>`

      }

      if (primeira_fileira[j].tipo != 'palavra' && fechou_primeira_fileira_com_termos === 'nao') {
        string_palavras += `</div>`
        fechou_primeira_fileira_com_termos = 'sim'
      }
    }

    for (let j = 0; j < segunda_fileira.length; j++) {

      /*
      let classe_dominio = 'dominio_neutro'
      if (array_dominio_mult.length) {
        for (let k = 0; k < array_dominio_mult.length; k++) {
          if (array_dominio_mult[k].id_palavra === vocabulario[i]._id) {
            n_inc = array_dominio_mult[k].qtd_incidencias

            const qtd_incidencias = array_dominio_mult[k].qtd_incidencias

            if (qtd_incidencias === -4 || qtd_incidencias === -3) classe_dominio = 'dominio_muito_ruim'
            if (qtd_incidencias === -2 || qtd_incidencias === -1) classe_dominio = 'dominio_ruim'
            if (qtd_incidencias === 1 || qtd_incidencias === 2) classe_dominio = 'dominio_bom'
            if (qtd_incidencias === 3 || qtd_incidencias === 4) classe_dominio = 'dominio_muito_bom'

          }
        }
      }
      */


      let estilo_margin_left = (j === 0) ? 'margin-left: 20px;' : '' // Não sei pra que essa parada serve.

      // Aqui, o certo seria colocar este div que recebe a classe_dominio como justify-content: flex-end; mas quando
      // faço isso, não aparece a barrinha de rolagem em listras grandes, com palavras de vários alfabetos, por exemplo.
      // Não sei pq mas waréva, ai por enquanto tá esse margin-left: auto; no item de dentro. Não fica muito belo quando,
      // tem vários alfabetos na segunda fileira mas tá valendo, ao menos por enquanto.
      
      // string_palavras += `<div class="flex_row T1 center">Todo</div>`

      if (j === 0) string_palavras += `<div class="flex_row T2 ${classe_dominio}" style="overflow-x: scroll; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right: 5px; ${fundo_palavra} ${cor_letras}">`

      if (segunda_fileira[j].tipo === 'palavra') string_palavras += `
          <div style="margin: 5px; ${estilo_margin_left} display: inline-block; margin: 5px; white-space: nowrap; margin-left: auto;">${segunda_fileira[j].item}</div>`

      if (j === segunda_fileira.length - 1) string_palavras += `</div><audio id="seg_${i}_${j}">
            <source src="${fonte_2_mp3}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
            <div class="flex_row center botao" style='margin: 5px; margin-left: 5px; height: 35px; ${botao_som_estilo}' onclick="document.getElementById('seg_${i}_${j}').play();">
              <i class="icon-volume"></i>
            </div>
          </div>
        `
    }

    if (botao_som_estilo != "visibility: hidden;") {
      string_palavras += `
        <div class="flex_row T1 center" style="max-width: calc(40% + 147px); margin-top: -15px; margin-bottom: 15px;">

          <div class="flex_row T1 center" style="padding: 10px;">
            <div class="flex_row T1 listra_porcentagem listra_porc_inativa largura_interna" style="margin: 0px;">

              <span id="" class="interior_listra_porcentagem" style="width: ${largura_mult}%; background: ${cor}; min-height: 5px; border-radius: 7px;">
              </span>

            </div>
          </div>


          <div class="flex_row T1 center" style="padding: 10px;">
            <div class="flex_row T1 listra_porcentagem listra_porc_inativa largura_interna" style="margin: 0px;">

              <span id="" class="interior_listra_porcentagem" style="width: ${largura_escr}%; background: ${cor}; min-height: 5px; border-radius: 7px;">
              </span>

            </div>
          </div>

        </div>
        `
    }

    
  }

  let primeiro_idioma_vai = ''
  let segundo_idioma_vai = ''

  if (orientacao === '1_2') {
    primeiro_idioma_vai = primeiro_idioma
    segundo_idioma_vai = segundo_idioma
  }

  if (orientacao === '2_1') {
    primeiro_idioma_vai = segundo_idioma
    segundo_idioma_vai = primeiro_idioma
  }

  let classe_ativo_1_2 = (orientacao === '1_2') ? 'bot_ativo' : 'bot_inativo'
  let classe_ativo_2_1 = (orientacao === '2_1') ? 'bot_ativo' : 'bot_inativo'
  
  const classe_bot_mult_esc = (modalidade === 'mult_esc') ? 'bot_treino_valer_ativado' : 'bot_treino_valer_desativado'
  const classe_bot_escrita = (modalidade === 'escrita') ? 'bot_treino_valer_ativado' : 'bot_treino_valer_desativado'

  if (i >= 0) {
    caixinha_dentro.innerHTML = `

    <div class="flex_row T1 barra_superior_popup_sombra">
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_lista_palavras('fecha')"></i> 
    </div>

    <div class="flex_col T1 center caixinha_dentro">
      <div class="flex_col T1 center" style="">

        <div class="flex_row center T1">

          <div class="flex_row T1 center">
            <h2>${titulo_captitulo}</h2>
          </div>
          

          <!-- ${informacoes} -->

          <!-- <h3>${primeiro_idioma_vai} / ${segundo_idioma_vai}</h3> -->
        </div>

        <div class="flex_row T1 center">
          <div class="flex_col center botao bot_ativo" style="font-size: 20pt; margin-right: 10px;" onclick="manda_pro_vai_filhao('${id_decoreba}', '${id_capitulo}', 'gera_pdf_lista')">
            <i class="icon-print"></i>
          </div>

          <div class="flex_col center botao bot_ativo" style="font-size: 20pt; margin-right: 10px;" onclick="prepara_teste('${id_decoreba}', '${id_capitulo}', 'ta_indo_da_lista')">
            <i class="icon-graduation-cap"></i>
          </div>
        </div>

      </div>

      <!-- Botões abaixo funcionam, só estão sumidos. -->
      <div class="flex_row T1 flex_col_m center sumido">

        <div class="flex_row center T2 T1_m botao ${classe_ativo_1_2}" onclick='mostra_lista_palavras(${i}, ${JSON.stringify(vocabulario)}, "1_2", "${primeiro_idioma_vai}", "${segundo_idioma_vai}", "${titulo_captitulo}", "${informacoes}", "${id_decoreba}", "${id_capitulo}", "${modalidade}");' style="max-width: 250px;">
          ${primeiro_idioma_vai} / ${segundo_idioma_vai}
        </div>

        <div class="flex_row center T2 T1_m botao ${classe_ativo_2_1} bot_segundo_idioma_lista" onclick='mostra_lista_palavras(${i}, ${JSON.stringify(vocabulario)}, "2_1", "${segundo_idioma_vai}", "${primeiro_idioma_vai}", "${titulo_captitulo}", "${informacoes}", "${id_decoreba}", "${id_capitulo}", "${modalidade}");' style="max-width: 250px;">
          ${segundo_idioma_vai} / ${primeiro_idioma_vai}
        </div>
      
      </div>


      <!-- Ativar palavras dificultosas -->

      <div class="flex_row T1 center sumido">
        <div id="bot_dom_papiro_mult_esc" class="flex_row T2 center bot_treino_valer ${classe_bot_mult_esc}" style="margin: 10px; max-width: 250px;" onclick='botoes_dominio_papiro("mult_esc", ${i}, ${JSON.stringify(vocabulario)}, "${orientacao}", "${primeiro_idioma}", "${segundo_idioma}", "${titulo_captitulo}", "${informacoes}", "${id_decoreba}", "${id_capitulo}");'>Múlt. Escolha</div>

        <div id="bot_dom_papiro_escrita" class="flex_row T2 center bot_treino_valer ${classe_bot_escrita}" style="margin: 10px; max-width: 250px;" onclick='botoes_dominio_papiro("escrita", ${i}, ${JSON.stringify(vocabulario)}, "${orientacao}", "${primeiro_idioma}", "${segundo_idioma}", "${titulo_captitulo}", "${informacoes}", "${id_decoreba}", "${id_capitulo}");'>Escrita</div>
      </div>
        
      <div class="flex_col T1 ${classe_div_dominios} sumido" style="margin-top: 25px; margin-bottom: 25px; max-width: 500px;">

        <div class="flex_row T1 center" style="justify-content: space-between;">
          
          <div class="flex_row dominio_muito_ruim" style="width: 50px; height: 50px; border-radius: 50px; margin: 10px;">&nbsp;</div>
          <div class="flex_row dominio_ruim" style="width: 50px; height: 50px; border-radius: 50px; margin: 10px;">&nbsp;</div>
          <div class="flex_row dominio_neutro" style="width: 50px; height: 50px; border-radius: 50px; margin: 10px;">&nbsp;</div>
          <div class="flex_row dominio_bom" style="width: 50px; height: 50px; border-radius: 50px; margin: 10px;">&nbsp;</div>
          <div class="flex_row dominio_muito_bom" style="width: 50px; height: 50px; border-radius: 50px; margin: 10px; ">&nbsp;</div>

          
        </div>
        
        <div class="flex_row T1 center" style="font-size: 16px; margin-top: -10px; max-width: 500px;">
          <div class="flex_row" style="min-width: 150px;">
            Muitos erros
          </div>
          <div class="flex_row T1 center">
          </div>
          <div class="flex_row center" style="min-width: 150px; justify-content: flex-end;">
            Muitos acertos
          </div>
        </div>
      </div>
      ${string_palavras}
    </div>
    `
  }



}

  function manda_pro_vai_filhao (dado_1, dado_2, gera_o_que) {
    if (gera_o_que === 'gera_pdf_lista') {
      const dados_ids = JSON.stringify({id_decoreba: dado_1, id_capitulo: dado_2, gera_o_que: gera_o_que})
      vai_filhao_2('gera_pdf_lista', dados_ids)
    }

    if (gera_o_que === 'gera_pdf_verbo') {
      const dados_ids = JSON.stringify({idioma: dado_1, infinitivo: dado_2, gera_o_que: gera_o_que})
      vai_filhao_2('gera_pdf_verbo', dados_ids)
    }
      
  }

function acha_alfabeto_principal (idioma, palavra) {

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
}



/// GERALDOS ///

function troca_classe (item, classe_antiga, classe_nova) {
  if (item.classList.contains(classe_antiga)) {
    item.classList.remove(classe_antiga)
    item.classList.add(classe_nova)
  }
}

// Detect offline/online mode in simple way.
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
  checa_online()
}


//// verbo ////
let arr_verbos = [] // Let global que só é usada nessa função abaixo.
function carrega_verbo(obj) {
  glob_tela = 'nao_eh_modal'

  arr_verbos = []
  let obj_stringify = JSON.stringify(obj)

  // Definimos o i do verbo a ser trabalhado.
  let i_aleatorio = Math.floor(Math.random() * obj.conjugacao.length)

  const verbo = obj.conjugacao[i_aleatorio].verbo

  let j_aleatorio = Math.floor(Math.random() * obj.conjugacao[i_aleatorio].tempos.length)
  const pronome = obj.conjugacao[i_aleatorio].tempos[j_aleatorio].pronome

  // A constante tempo_verbal_correta pega a resposta certa do verbo, assim dá para comparar...
  // ... caso alguma terminação verbal seja a mesma que a da resposta correta, já que o sistema...
  // ... compara os i e não a string escrita da resposta.
  const tempo_verbal_correta = obj.conjugacao[i_aleatorio].tempos[j_aleatorio].verbo

  let j_resposta_1 = j_aleatorio
  let j_resposta_2
  let j_resposta_3

  do {
    j_resposta_2 = Math.floor(Math.random() * obj.conjugacao[i_aleatorio].tempos.length)
  }
  while (j_resposta_2 == j_resposta_1 || tempo_verbal_correta == obj.conjugacao[i_aleatorio].tempos[j_resposta_2].verbo)

  do {
    j_resposta_3 = Math.floor(Math.random() * obj.conjugacao[i_aleatorio].tempos.length)
  }
  while (j_resposta_3 == j_resposta_2 || j_resposta_3 == j_resposta_1 || tempo_verbal_correta == obj.conjugacao[i_aleatorio].tempos[j_resposta_3].verbo)


  arr_verbos.push(j_resposta_1)
  arr_verbos.push(j_resposta_2)
  arr_verbos.push(j_resposta_3)

  let k_resposta_1 = Math.floor(Math.random() * arr_verbos.length)
  let k_resposta_2
  let k_resposta_3

  // Mesma coisa que nos do whiles anteriores. Se a resposta 2 for igual à primeira, tenta outro k.
  do {
    k_resposta_2 = Math.floor(Math.random() * arr_verbos.length)
  }
  while (k_resposta_2 == k_resposta_1)

  // Aqui denovo, mesma coisa.
  do {
    k_resposta_3 = Math.floor(Math.random() * arr_verbos.length)
  }
  while (k_resposta_3 == k_resposta_2 || k_resposta_3 == k_resposta_1)


  // Botamos tudo isso em uma constante.
  const string_exercicio = `

  <div id="modal_verbo" class="flex_col center T1" style="height: 100vh;  display: none; background-color: rgba(0, 0, 0, 0.5); position: fixed; top: 0;">

  </div>


    <div style="font-size: 33px; margin: 15px;">${verbo}</div>
    <div style="font-size: 27px; margin: 5px;">${pronome}</div>

    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_1]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_1]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_2]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_2]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_3]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_3]].verbo}</button>

    
    <div style="font-size: 22px; margin-top: 25px;">Respostas Corretas: <span id="span_resp_corretas">${respostas_corretas}</span> / ${meta_corretas}</div>
    <div style="font-size: 22px; margin-bottom: 25px;">Respostas Erradas: <span id="span_resp_erradas">${respostas_erradas}</span> / ${meta_erradas}</div>
    
    <button class="titulo_cap" onclick='monta_index()'>Voltar</button>

  `
  // Inserimos a variável no palco meu.
  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `
    <div class="flex_col center T1" style="height: 100%; padding: 0; margin-bottom: 25px; padding-bottom: 25px;">
      <h2>${obj.titulo}</h2>
      ${string_exercicio}
    </div>
  `
}

function clicou_resp_verbo (i_verbo, resp_dada, resp_certa, obj) {

  if (resp_dada === resp_certa) {
    /*
    alert("Acertou, parabéns!")
    respostas_corretas++
    carrega_verbo(obj)
    */
    const obj_novo = {
      resultado: 'acertou'
    }
    monta_modal_resposta(obj_novo, obj)

  } else {

    let pronome = obj.conjugacao[i_verbo].tempos[resp_certa].pronome
    let verbo = obj.conjugacao[i_verbo].tempos[resp_certa].verbo

    const obj_novo = {
      resultado: 'errou',
      pronome: pronome,
      verbo: verbo
    }

    monta_modal_resposta(obj_novo, obj)
  }

  if (respostas_erradas === meta_erradas) {
    alert("Game Over")
    monta_index()
  } else if (respostas_corretas === meta_corretas) {
    alert("Parabéanss!!")
    monta_index()
  }
}
function monta_modal_resposta(obj_novo, obj) {
  glob_tela = 'modal'
  glob_obj = obj
  if (obj_novo.resultado === 'errou') {
    respostas_erradas++

    const resp_correta = `${obj_novo.pronome}&nbsp;${obj_novo.verbo}`

    let obj_stringify = JSON.stringify(obj)

    document.getElementById('modal_verbo').style.display = 'flex'
    document.getElementById('modal_verbo').innerHTML = `
      <div class="flex_col center" style="border-radius: 10px; width: 300px; height: 200px; background: white;">
        <span>Errooou! O correto é:</span>
        <div class="flex_row T1 center" style="font-size: 22px;">
          ${resp_correta}
        </div>
        <button class="botao clicavel" onclick='proxima("errou", ${obj_stringify})'>Próxima</button>
      </div>
    `
  } else if (obj_novo.resultado === 'acertou') {

    let obj_stringify = JSON.stringify(obj)

    document.getElementById('modal_verbo').style.display = 'flex'
    document.getElementById('modal_verbo').innerHTML = `
      <div class="flex_col center" style="border-radius: 10px; width: 300px; height: 200px; background: white;">
        <span>Acertou, meus parabéns!!</span>
        
        <button class="botao clicavel" onclick='proxima("acertou", ${obj_stringify})'>Próxima</button>
      </div>
    `
  }
}
function proxima(resultado, obj) {

  if (resultado === 'acertou') {
    respostas_corretas++
    carrega_verbo(obj)
  }
  if (resultado === 'errou') {
    carrega_verbo(obj)
  }
}
function carrega_verbo(obj) {
  glob_tela = 'nao_eh_modal'

  arr_verbos = []
  let obj_stringify = JSON.stringify(obj)

  // Definimos o i do verbo a ser trabalhado.
  let i_aleatorio = Math.floor(Math.random() * obj.conjugacao.length)

  const verbo = obj.conjugacao[i_aleatorio].verbo

  let j_aleatorio = Math.floor(Math.random() * obj.conjugacao[i_aleatorio].tempos.length)
  const pronome = obj.conjugacao[i_aleatorio].tempos[j_aleatorio].pronome

  // A constante tempo_verbal_correta pega a resposta certa do verbo, assim dá para comparar...
  // ... caso alguma terminação verbal seja a mesma que a da resposta correta, já que o sistema...
  // ... compara os i e não a string escrita da resposta.
  const tempo_verbal_correta = obj.conjugacao[i_aleatorio].tempos[j_aleatorio].verbo

  let j_resposta_1 = j_aleatorio
  let j_resposta_2
  let j_resposta_3

  do {
    j_resposta_2 = Math.floor(Math.random() * obj.conjugacao[i_aleatorio].tempos.length)
  }
  while (j_resposta_2 == j_resposta_1 || tempo_verbal_correta == obj.conjugacao[i_aleatorio].tempos[j_resposta_2].verbo)

  do {
    j_resposta_3 = Math.floor(Math.random() * obj.conjugacao[i_aleatorio].tempos.length)
  }
  while (j_resposta_3 == j_resposta_2 || j_resposta_3 == j_resposta_1 || tempo_verbal_correta == obj.conjugacao[i_aleatorio].tempos[j_resposta_3].verbo)

  arr_verbos.push(j_resposta_1)
  arr_verbos.push(j_resposta_2)
  arr_verbos.push(j_resposta_3)

  let k_resposta_1 = Math.floor(Math.random() * arr_verbos.length)
  let k_resposta_2
  let k_resposta_3

  // Mesma coisa que nos do whiles anteriores. Se a resposta 2 for igual à primeira, tenta outro k.
  do {
    k_resposta_2 = Math.floor(Math.random() * arr_verbos.length)
  }
  while (k_resposta_2 == k_resposta_1)

  // Aqui denovo, mesma coisa.
  do {
    k_resposta_3 = Math.floor(Math.random() * arr_verbos.length)
  }
  while (k_resposta_3 == k_resposta_2 || k_resposta_3 == k_resposta_1)

  // Botamos tudo isso em uma constante.
  const string_exercicio = `

    <div id="modal_verbo" class="flex_col center T1" style="height: 100vh;  display: none; background-color: rgba(0, 0, 0, 0.5); position: fixed; top: 0;"></div>

    <div style="font-size: 33px; margin: 15px;">${verbo}</div>
    <div style="font-size: 27px; margin: 5px;">${pronome}</div>

    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_1]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_1]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_2]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_2]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_3]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_3]].verbo}</button>
    
    <div style="font-size: 22px; margin-top: 25px;">Respostas Corretas: <span id="span_resp_corretas">${respostas_corretas}</span> / ${meta_corretas}</div>
    <div style="font-size: 22px; margin-bottom: 25px;">Respostas Erradas: <span id="span_resp_erradas">${respostas_erradas}</span> / ${meta_erradas}</div>
    
    <button class="botao clicavel" onclick='monta_index()'>Voltar</button>
  `
  // Inserimos a variável no palco meu.
  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `
    <div class="flex_col center T1" style="height: 100%; padding: 0; margin-bottom: 25px; padding-bottom: 25px;">
      <h2>${obj.titulo}</h2>
      ${string_exercicio}
    </div>
  `
}


function traducao_frases () {
  document.getElementById('recip_popup_cria_frase').style.display = 'flex'
}

function fecha_popup_cria_frase () {
  document.getElementById('recip_popup_cria_frase').style.display = 'none'
}

async function analiza_traducao (idioma) {
  const traducao = document.getElementById('traducao_a_analizar').value

  const dados = { idioma: idioma, traducao: traducao }
  loading('loading...')
  const volta = await vai_filhao_2('analiza_traducao', dados)
  const json_traducao = volta.json_da_traducao

  console.log(json_traducao)
  // alert(json_traducao.esta_correto)
  let resposta = (json_traducao.esta_correto === 'sim') ? "Sua tradução está correta! Mios parabênes!!" : json_traducao.traducao_correta
  document.getElementById('span_resposta_traducao').innerHTML = resposta

  document.getElementById('traducao_a_analizar').disabled = true
}