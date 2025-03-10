// As variáveis globais também ficam poragah.
// Cuspindo ou não os htmls, as funções de apoio deveriam ficar por aqui.
// Aqui podem ficar as funções de auxilio das funções de preparação.
// Podem ou não serem usadas em mais de uma função preparação, mas a princípio são individuais.

// Esta cria_cabecalho_rapido() retorna um html.
// Não está 100% modularizada, mas digamos que meio que sim. Ela retorna um html pronto, funções modularizadas devem retornar dados, um objeto no máximo.
// Funções modularizadas não devem alterar o DOM, muito menos retornar um html. Devem receber dados e retornar dados.
// Ai a função que chamou que saberá o que fará com os dados obtidos.
// Dito isto, as funções auxiliares mudam o DOM, retornam dados ou html. Um verdadeiro caos na Terra.
// Dividamos as auxiliares então por gerais e específicas.
// O desafio aqui é modularizar o máximo de funções auxiliares para genéricas, diminuindo assim também as variáveis globais.
// E auxiliares gerais são as que podem ser usadas apenas no dekoreba. No genéricas daria para utilizar em outros sistemas.

var mexidos = []

var stri = ''
var pre_jogo

var glob_tela
var glob_obj

let arr_respostas = [] // Let global que só é usada nessa função abaixo.
var orientacao_idiomas_global
var distancia_global
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
var meta_corretas = 25
var meta_erradas = 5
var orientacao = 'arabe-portugues'

let ico_explorar = 'icon-explorar_vazio'
let ico_settings = 'icon-engrenagem_vazio'
let ico_home = 'icon-casa_vazio'
let perfil_borda = 'box-sizing: border-box; border: solid 3px white;'

let cap_i_ativo = 0

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
  { 'sigla_som': 'de', 'idioma': 'Alemão', 'alfabetos': ['latino'] },
  { 'sigla_som': 'ar', 'idioma': 'Árabe', 'alfabetos': ['latino', 'arabe'] },
  { 'sigla_som': 'ca', 'idioma': 'Catalão', 'alfabetos': ['latino'] },
  { 'sigla_som': 'zh', 'idioma': 'Chinês', 'alfabetos': ['latino', 'kanji'] },
  { 'sigla_som': 'ko', 'idioma': 'Coreano', 'alfabetos': ['latino', 'hangul'] },
  { 'sigla_som': 'es', 'idioma': 'Espanhol', 'alfabetos': ['latino'] },
  { 'sigla_som': 'eo', 'idioma': 'Esperanto', 'alfabetos': ['latino'] },
  { 'sigla_som': 'fr', 'idioma': 'Francês', 'alfabetos': ['latino'] },
  { 'sigla_som': 'el', 'idioma': 'Grego', 'alfabetos': ['latino', 'grego'] },
  { 'sigla_som': 'hi', 'idioma': 'Indiano', 'alfabetos': ['latino', 'devanagari'] },
  { 'sigla_som': 'en', 'idioma': 'Inglês', 'alfabetos': ['latino'] },
  { 'sigla_som': 'it', 'idioma': 'Italiano', 'alfabetos': ['latino'] },
  { 'sigla_som': 'ja', 'idioma': 'Japonês', 'alfabetos': ['latino', 'hiragana', 'katakana', 'kanji'] },
  { 'sigla_som': 'la', 'idioma': 'Latim', 'alfabetos': ['latino'] },
  { 'sigla_som': 'pt-br', 'idioma': 'Português', 'alfabetos': ['latino'] },
  { 'sigla_som': 'ru', 'idioma': 'Russo', 'alfabetos': ['latino', 'cirilico_russo'] },
  { 'sigla_som': 'pt-br', 'idioma': 'Outro', 'alfabetos': ['latino'] }
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



/* GERAIS */

async function curtir_decoreba(id_decoreba, elemento, id_qtd) {

  const obj_vai = {
    id_decoreba: id_decoreba
  }

  const dados = await vai_filhao_2('curtir_decoreba', JSON.stringify(obj_vai))

  if (dados.acao === 'curtir') {

    elemento.classList.remove("icon-estrela_vazio")
    elemento.classList.add("icon-estrela_cheio")

    const qtd_estrelas = document.getElementById(`${id_qtd}`).innerHTML
    document.getElementById(`${id_qtd}`).innerHTML = Number(qtd_estrelas) + 1
  }

  if (dados.acao === 'descurtir') {

    elemento.classList.remove("icon-estrela_cheio")
    elemento.classList.add("icon-estrela_vazio")

    const qtd_estrelas = document.getElementById(`${id_qtd}`).innerHTML
    document.getElementById(`${id_qtd}`).innerHTML = Number(qtd_estrelas) - 1
  }
}

function checa_online() {
  var condition = navigator.onLine ? "online" : "offline";

  if (condition === "online") {
    document.getElementById('faixa_offline').style.display = 'none'
  }
  if (condition === "offline") {
    document.getElementById('faixa_offline').style.display = 'flex'
  }
}

const cabecalho_deslogado = `
  <div class="flex_row T1 center cabecalho cabecalho_deslogado">
    <div class="flex_row T1 largura_interna" style="height: 100%;">
      <div class="flex_row T1" style="align-items: center; cursor: pointer;">

        <!-- <i class="icon-simbolo_decoreba" onclick="monta_index()" style="font-size: 25pt;"></i> -->
        </div>

        <div class="flex_row" style="align-items: center;">
          <button class="botao bot_cabecalho" onclick="monta_login()">Entrar</button>
          <button class="botao bot_cabecalho" onclick="monta_cadastro()">Cadastrar</button>
        </div>
      
      </div>
    </div>
`
// Esse aqui ainda funciona mas não deve por muito tempo. O certo é só o cabeçalho rápido, para excelente navegação off.
const cria_cabecalho = (tela, avatar_50, id_usuario) => {

  let end_logo = ''

  if (tela === 'home') {
    ico_home = 'icon-casa_cheio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = ''

    end_logo = 'imagens/logo_dekoreba.png'
  }

  if (tela === 'explorar') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_cheio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = ''

    end_logo = '../imagens/logo_dekoreba.png'
  }

  if (tela === 'opcoes') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_cheio'
    perfil_borda = ''

    end_logo = 'imagens/logo_dekoreba.png'
  }

  if (tela === 'perfil') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = 'box-sizing: border-box; border: solid 2px var(--cinza_meio_escuro);'

    end_logo = '../imagens/logo_dekoreba.png'
  }

  if (tela === 'cria' || tela === 'mostra' || tela === 'jogo') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = ''

    end_logo = '../imagens/logo_dekoreba.png'
  }

  return /* html */`
    <div id="div_cabecalho_lento" class="flex_row T1 center cabecalho">
      <div class="flex_row T1 center largura_interna">
        
        <div class="flex_row cabecalho_recip_logo exclusivo_pc">
          
          <i class="icon-logotipo" style="width: 135px; background: radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-left: 10px; font-size: 22px;" onclick="monta_home();"></i>
          

        </div>
        
        <div class="flex_row T1 exclusivo_pc">
          
        </div>

        <div class="flex_row T1_m cabecalho_recip_botoes" style="">
          <i class="${ico_home}" onclick="monta_home()"></i>
          <i class="${ico_explorar}" onclick="monta_explorar()"></i>
          <i class="${ico_settings}" onclick="monta_opcoes()"></i>
          

          <img id="avatar_50" src="${avatar_50}" style="${perfil_borda} width: 40px; height: 40px;"  onclick="monta_perfil('${id_usuario}');">
        </div>
      
      </div>
    </div>
  `
}

const cria_cabecalho_rapido = (tela) => {
  let avatar_50 = ''
  let funcao_onclick = ''
  if (sessionStorage.getItem("avatar_50")) {
    avatar_50 = sessionStorage.getItem("avatar_50")
    funcao_onclick = `onclick="monta_perfil('${sessionStorage.getItem("id_usuario")}');"`
  } else {
    avatar_50 = '../imagens/avatar-default.jpg'
  }

  let end_logo = ''

  if (tela === 'home') {
    ico_home = 'icon-casa_cheio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = ''

    end_logo = 'imagens/logo_dekoreba.png'
  }

  if (tela === 'explorar') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_cheio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = ''

    end_logo = '../imagens/logo_dekoreba.png'
  }

  if (tela === 'opcoes') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_cheio'
    perfil_borda = ''

    end_logo = 'imagens/logo_dekoreba.png'
  }

  if (tela === 'perfil') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = 'box-sizing: border-box; border: solid 2px var(--cinza_meio_escuro);'

    end_logo = '../imagens/logo_dekoreba.png'
  }

  if (tela === 'cria' || tela === 'mostra' || tela === 'jogo') {
    ico_home = 'icon-casa_vazio'
    ico_explorar = 'icon-bussola_vazio'
    ico_settings = 'icon-engrenagem_vazio'
    perfil_borda = ''

    end_logo = '../imagens/logo_dekoreba.png'
  }

  return `
    <div id="recip_cabecalho" class="flex_row T1 center cabecalho">
      <div class="flex_row T1 center largura_interna">
        
        <div class="flex_row cabecalho_recip_logo exclusivo_pc">
            
          <i class="icon-logotipo estilo_insta" style="width: 135px; margin-left: 10px; font-size: 22px;" onclick="monta_home();"></i>

        </div>
        
        <div class="flex_row T1 exclusivo_pc">
          
        </div>

        <div class="flex_row T1_m cabecalho_recip_botoes" style="">
          <i class="${ico_home} icone_cabecalho" onclick="monta_home()"></i>
          <i class="${ico_explorar}" onclick="monta_explorar()"></i>
          <i class="${ico_settings}" onclick="monta_opcoes()"></i>
          
          <img id="avatar_50" src="${avatar_50}" style="${perfil_borda} width: 40px; height: 40px;" ${funcao_onclick}>

        </div>
      
      </div>
    </div>
  `
}

function verifica_url(obj) {

  // Essa função não está pŕopria para ser utilizada em qualquer lugar, tem que modularizar a bichona.
  // Aqui abaixo pegamos o endereço atual. Se veio do decoreba_mostra, volta um no diretório do endereço. Meio estranho mas funciona.

  const dec_cria = obj.endereco.search("decoreba_cria")
  const dec_mostra = obj.endereco.search("decoreba_mostra")
  const perfil = obj.endereco.search("perfil")
  const explorar = obj.endereco.search("explorar")
  
  let pagina
  if (dec_cria != -1 || dec_mostra != -1 || perfil != -1 || explorar != -1) pagina = `../${obj.stateObj.tela_ativa}`
  if (dec_cria === -1 && dec_mostra === -1 && perfil === -1 && explorar === -1) pagina = `${obj.stateObj.tela_ativa}`

  if (obj.stateObj.tela_ativa === 'perfil') pagina = '' + pagina + `/${obj.id_perfil}`
  if (obj.stateObj.tela_ativa === 'explorar') pagina = '' + pagina + `/${obj.termo_busca}`
  if (obj.stateObj.tela_ativa === 'decoreba_mostra') pagina = '' + pagina + `/${obj.id_decoreba}`
  if (obj.stateObj.tela_ativa === 'decoreba_cria') pagina = '' + pagina + `/${obj.id_decoreba}`


  if (obj.veio_de_onde) history.replaceState(obj.stateObj, '', `${pagina}`)
  if (!obj.veio_de_onde) history.pushState(obj.stateObj, '', `${pagina}`)
}

function carta(obj) {

  let cor_dekoreba = '#ffffff'
  if (obj.cor != "#ffffff") cor_dekoreba = obj.cor

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

    let div_alfabeto_vez = `<div class="flex_row center" style="font-size: 13pt; padding: 5px; margin: 5px; border-radius: 10px;">${alfabeto_da_vez}</div>`
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

    let div_alfabeto_vez = `<div class="flex_row center" style="font-size: 13pt; padding: 5px; margin: 5px; border-radius: 10px;">${alfabeto_da_vez}</div>`
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
          <div class="flex_row center T2" style="flex-wrap: wrap;">${string_idi_sis_1}</div>
          <div class="flex_row center T2" style="flex-wrap: wrap;">${string_idi_sis_2}</div>
        </div>

        <div class="flex_row carta_titulos_capitulos">
          ${obj.string_titulos_capitulos}
        </div>

            
        <div class="flex_row T1 carta_titulos_capitulos">
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

          <div class="flex_col center">
            <i id="estrela_${obj.id_decoreba}" class="${obj.ico_estrela} carta_estrela" onclick="curtir_decoreba('${obj.id_decoreba}', this, 'qtd_estrelas_${obj.id_decoreba}')"></i>
            <span id="qtd_estrelas_${obj.id_decoreba}" class="carta_estrela_qtd" id="qtd_estrelas_${obj.id_decoreba}">${obj.estrelas}</span>
          </div>

        </div>


      </div>

      

    </div>
    
    

    

  </div>
        `
  /*
  return `<!-- Recip das decorebas praticadas -->

        <div class="flex_col T2 center carta_decoreba" style="">
          

          <div class="flex_row T1" style="">
            <img src="${obj.avatar_criador}" class="carta_avatar_criador" onclick="monta_perfil('${obj.id_criador}')">
            
            <div class="flex_col T1 carta_infos_criador">
              <div class="carta_nome_criador" onclick="monta_perfil('${obj.id_criador}')">
                ${obj.nome_criador}
              </div>
              <div class="carta_data">
                ${obj.data_carta}
              </div>
            </div>


            <div class="flex_col center">
              <i id="estrela_${obj.id_decoreba}" class="${obj.ico_estrela} carta_estrela" onclick="curtir_decoreba('${obj.id_decoreba}', this, 'qtd_estrelas_${obj.id_decoreba}')"></i>
              <span id="qtd_estrelas_${obj.id_decoreba}" class="carta_estrela_qtd" id="qtd_estrelas_${obj.id_decoreba}">${obj.estrelas}</span>


            </div>

          </div>

          <div style="background: orange;   width: 100%;  height: 100%; border-radius: 5px"></div>


          <div class="flex_row T1 carta_titulo" onclick="monta_decoreba_mostra('${obj.id_decoreba}')">
            ${obj.titulo}
          </div>
        
          <div class="flex_row T1 carta_orientacao">
            ${obj.idioma_1} <i class="icon-setas_cheio carta_orientacao_ico"></i>${obj.idioma_2}
          </div>

          <div class="flex_row T1 carta_orientacao" style="color: grey; align-items: center;">
            <span>${string_idi_sis_1}</span> <span style="margin-left: 35px;">${string_idi_sis_2}</span>
          </div>

          <div class="flex_row T1 carta_titulos_capitulos">
            ${obj.string_titulos_capitulos}
          </div>
          
          <div class="flex_row T1 carta_titulos_capitulos">
            <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_0}</span>
            <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_1}</span>
            <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_2}</span>
            <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_3}</span>
            <span class="carta_tag" onclick="carta_clica_tag(this.innerHTML)">${obj.marcacao_4}</span>
          </div> 
          
          ${botao_editar}
          
        
        </div>



        <!-- Por enquanto não está mostrando a porcentagem da decoreba praticada. Preciso ver isso depois. -->
        <!--
        <div class="flex_col center carta_recip_porcentagem">

          <i class="icon-right carta_porcentagem_ico"></i>
          {porcentagem__1_2} %

          <i class="icon-left carta_porcentagem_ico"></i>
          {porcentagem__2_1} %

        </div>
        -->

      `
      */
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
  let e_mail = prompt("Digite seu e-mail para a recuperação de senha:", "")

  if (e_mail == null || e_mail == "") {
    // text = "User cancelled the prompt.";
  } else {
    document.getElementById('msg_sistema_esqueceu_foi').style.display = 'flex'
    await vai_filhao_2('solicita_troca_senha', e_mail)
  }
}


// CADASTRAR //

async function cadastrar(metodo) {

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

          <select id="afazer_categoria_edita" class="${classe_categoria}" style="width: 200px; font-size: 13pt; margin-right: 15px;">
            <option value="" disabled>Categoria</option>
            <option value="bug" ${select_bug}>Bug</option>
            <option value="funcionalidade" ${select_fun}>Funcionalidade</option>
            <option value="design" ${select_des}>Design</option>
            <option value="codigo" ${select_cod}>Código</option>
          </select>

          <select id="afazer_prioridade_edita" style="width: 200px; font-size: 13pt;">
            <option value="" disabled>Prioridade</option>
            <option value="1" ${select_prio_1}>Suave</option>
            <option value="2" ${select_prio_2}>Importante</option>
            <option value="3" ${select_prio_3}>Urgente</option>
          </select>
        </div>

        <div class="flex_row T2" style="justify-content: flex-end;">
          <div style="padding: 5px; border-radius: 5px; margin-right: 15px;">
           <select id="afazer_estado_edita" class="${classe_categoria}" style="width: 200px; font-size: 13pt; margin-right: 15px;">
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

/*
  const list = document.getElementById("myList");
list.removeChild(list.firstElementChild);
*/
// palco.appendChild(janelinha)html
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

function adiciona_capitulo () {

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

  xeca_mexido('capitulo', 'cria', id_provisorio)
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
  
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()"></i> 
      </div>

      <div id="recip_palavras" class="flex_col T1 center">
        ${palavras}
      </div>
      
    </div>
  `
  document.getElementById('recip_capitulo').innerHTML = recip_capitulo
  
  const id_capitulo = obj_teste.capitulos[cap_i_ativo]._id
  xeca_mexido('capitulo', 'exclui', id_capitulo)
}


function insere_palavra (tipo, item_i, idi, apagou) {

  // O tipo pode ser: 'nova_palavra', 'outro_termo'

  const soma_1 = conta_sist_escr (1)
  const soma_2 = conta_sist_escr (2)
  const soma = (idi === 'idi_1') ? soma_1 : soma_2

  valida_nova_palavra (tipo, idioma_1, idioma_2)
  
  const tipo_de_item = (tipo === 'nova_palavra') ? 'palavra' : ''
  const numero_arquivo = define_numero_arquivo (idi)

  let qtd_outros_termos = 0

  // Estas lets abaixo só servem para saber se é o primeiro termo ou não.
  let qtd_outros_termos_idi_1 = 0
  let qtd_outros_termos_idi_2 = 0

  const rand = gera_id_randomico ()
  const id_provisorio = `recem_criado__${rand}`

  if (tipo === 'outro_termo' & !apagou) {

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

    obj_teste.capitulos[cap_i_ativo].vocabulario.push({ _id: id_provisorio, idioma_1: itens_idi_1, idioma_2: itens_idi_2 })
 
    cria_faz_input_palavra ()
  }

  // Aqui temos que re escrever todos os negófios os inputs, pois o innerHTML apaga tudo essa bagaça.
  const n_idi = (idi === 'idi_1') ? 1 : 2
  const vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario
  
  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_1.length; j++) {
      document.getElementById(`input_idi1_cap${cap_i_ativo}_item${i}_col${j}`).value = vocabulario[i].idioma_1[j].item
    }
  }

  for (let i = 0; i < vocabulario.length; i++) {
    for (let j = 0; j < vocabulario[i].idioma_2.length; j++) {
      document.getElementById(`input_idi2_cap${cap_i_ativo}_item${i}_col${j}`).value = vocabulario[i].idioma_2[j].item
    }
  }

  // mexios

  // Faltou alterar o mexidos
}

function altera_palavra (valor, cap_i, item_j, idioma, n_item, coluna_palavras, tipo) {
  // Essa função é ativada quando se altera o conteúdo do input de alguma palavra.
  // Primeiro há de se ver, quantos alfabetos estão ativos.

  const botoes_sist_escrita = (idioma === 'idioma_1') ? document.getElementsByClassName("idi_1") : document.getElementsByClassName("idi_2")
  
  const alfabeto_da_vez = reconhece_sist_escrita(botoes_sist_escrita[n_item].innerHTML)

  if (idioma === 'idioma_1') {
    obj_teste.capitulos[cap_i].vocabulario[item_j].idioma_1[coluna_palavras].item = valor
    obj_teste.capitulos[cap_i].vocabulario[item_j].idioma_1[coluna_palavras].sistema_escrita = alfabeto_da_vez
  }

  if (idioma === 'idioma_2') {
    obj_teste.capitulos[cap_i].vocabulario[item_j].idioma_2[coluna_palavras].item = valor
    obj_teste.capitulos[cap_i].vocabulario[item_j].idioma_2[coluna_palavras].sistema_escrita = alfabeto_da_vez
  }

  const id_deste_cap = obj_teste.capitulos[cap_i]._id
  const id_deste_item = obj_teste.capitulos[cap_i].vocabulario[item_j]._id

  xeca_mexido(tipo, 'modifica', id_deste_cap, id_deste_item)
}

function elimina_palavra (cap_i, item_i, col) {

  // valida_elimina_palavra (item_i)

  obj_teste.capitulos[cap_i].vocabulario.splice(item_i, 1)

  let palavras = ''
  for (let i = 0; i < obj_teste.capitulos[cap_i].vocabulario.length; i++) {
    palavras += html_palavras(cap_i, i)
  }
  document.getElementById('recip_palavras').innerHTML = palavras
  
  fecha_popup_excluir_palavras()

  const id_deste_cap = obj_teste.capitulos[cap_i]._id
  const id_deste_item = obj_teste.capitulos[cap_i].vocabulario[item_i]._id
  xeca_mexido('palavra', 'exclui', id_deste_cap, id_deste_item)
}


function altera_sist_escrita(botao) {
  // Se o cabra aperter o botão de inserir ou tirar um alfabeto

  const botoes_sist_escrita_1 = document.getElementsByClassName("idi_1")
  const botoes_sist_escrita_2 = document.getElementsByClassName("idi_2")
  let somatoria_alfabetos_inativos = 0

  // Se o sujeito retirou um alfabeto.
  if (botao.classList.contains("alfabeto_ativo")) {
    
    const botos = (botao.classList.contains("idi_1")) ? botoes_sist_escrita_1 : botoes_sist_escrita_2

    for (let i = 0; i < botos.length; i++) {
      if (botos[i].classList.contains('alfabeto_inativo')) somatoria_alfabetos_inativos++

      if (somatoria_alfabetos_inativos == botos.length - 1) {
        alert("Sua dekoreba precisa ter pelo menos um sistema de escrita ativo, pequeno gafanhoto.")
        return
      }
    }

    let alfabeto_da_vez = reconhece_sist_escrita(botao.innerHTML)

    // Ranca fora no obj_teste.sistemas_escrita
    if (botao.classList.contains("idi_1")) {
      for (let i = 0; i < obj_teste.idioma_1_sistemas_escrita.length; i++) {
        if (obj_teste.idioma_1_sistemas_escrita[i].sistema === alfabeto_da_vez) {
          obj_teste.idioma_1_sistemas_escrita.splice(i, 1)
        }
      }
    }

    if (botao.classList.contains("idi_2")) {
      for (let i = 0; i < obj_teste.idioma_2_sistemas_escrita.length; i++) {
        if (obj_teste.idioma_2_sistemas_escrita[i].sistema === alfabeto_da_vez) {
          obj_teste.idioma_2_sistemas_escrita.splice(i, 1)
        }
      }
    }

    // Ranca fora no obj_teste.capitulo
    for (let i = 0; i < obj_teste.capitulos[cap_i_ativo].vocabulario.length; i++) {

      let obj_palavras
      if (botao.classList.contains("idi_1")) obj_palavras = obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_1
      if (botao.classList.contains("idi_2")) obj_palavras = obj_teste.capitulos[cap_i_ativo].vocabulario[i].idioma_2

      for (let j = 0; j < obj_palavras.length; j++) {
        if (obj_palavras[j].sistema_escrita === alfabeto_da_vez) obj_palavras.splice(j, 1)
      }
    }

    troca_classe (botao, 'alfabeto_ativo', 'alfabeto_inativo')

    for (let k = 1; k < 7; k++) {
      troca_classe (botao, `sist_escri_${k}_ativo`, `sist_escri_${k}_inativo`)
    }

    // Se o sujeito colocou um alfabeto a mais.
  } else {

    const n_idioma = (botao.classList.contains("idi_1")) ? 1 : 2
    const soma = conta_sist_escr(n_idioma)

    const botoes_posto = (botao.classList.contains("idi_1")) ? botoes_sist_escrita_1 : botoes_sist_escrita_2
    const alfabeto_posto = reconhece_sist_escrita(botao.innerHTML)

    if (botao.classList.contains("idi_1")) obj_teste.idioma_1_sistemas_escrita.push({ sistema: alfabeto_posto })
    if (botao.classList.contains("idi_2")) obj_teste.idioma_2_sistemas_escrita.push({ sistema: alfabeto_posto })

    // Até aqui o sistema já deve ter reconhecido quais os alfabetos ativos neste idioma.
    // Hora de colocar um campo em branco para o alfabeto novo.

    for (let i = 0; i < obj_teste.capitulos.length; i++) {
      for (let j = 0; j < obj_teste.capitulos[i].vocabulario.length; j++) {

        if (botao.classList.contains("idi_1")) obj_teste.capitulos[i].vocabulario[j].idioma_1.push({ item: "", sistema_escrita: alfabeto_posto })
        if (botao.classList.contains("idi_2")) obj_teste.capitulos[i].vocabulario[j].idioma_2.push({ item: "", sistema_escrita: alfabeto_posto })

      }
    }

    // Altera a classe do botão
    troca_classe (botao, 'alfabeto_inativo', 'alfabeto_ativo')

    for (let k = 1; k < 7; k++) {
      troca_classe (botao, `sist_escri_${k}_inativo`, `sist_escri_${k}_ativo`)
    }

  }

  // Manipula o DOM
  let palavras = ''
  for (let j = 0; j < obj_teste.capitulos[cap_i_ativo].vocabulario.length; j++) {
    palavras += html_palavras(cap_i_ativo, j)
  }
  document.getElementById('recip_palavras').innerHTML = palavras
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
  insere_sigla_som(document.getElementById('idioma_1').value, n_idioma)
  insere_sigla_som(document.getElementById('idioma_2').value, n_idioma)

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
  
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()"></i> 
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
    
    // Exclui a decoreba
    if (id_decoreba != 'nova') {
      loading('loading...')
      const json = await vai_filhao_2('decoreba_deleta', id_decoreba)
       
      window.location.replace(`${servidor}/perfil/${json.id_usuario}`) // Simulate an HTTP redirect:
    }
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


function cria_faz_menu_palavra (cap_i, item_i) {

  const botoes_add_desc = document.getElementsByClassName(`recip_bot_add_desc_${cap_i}_${item_i}`) // desc == descrição

  // Se as opções deste menu já estão abertas
  if (document.getElementById(`recip_linha_${cap_i}_${item_i}`).classList.contains('menu_palavra_ativo')) {

    document.getElementById(`recip_linha_${cap_i}_${item_i}`).classList.remove('menu_palavra_ativo')
    document.getElementById(`recip_linha_${cap_i}_${item_i}`).classList.add('menu_palavra_inativo')

    document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).style.display = 'none'

    document.getElementById(`linha_${cap_i}_${item_i}_idi_1`).style.height = '70px'
    document.getElementById(`linha_${cap_i}_${item_i}_idi_2`).style.height = '70px'
    document.getElementById(`linha_bot_termo_${cap_i}_${item_i}`).style.display = 'none'
    for (let i = 0; i < botoes_add_desc.length; i++) botoes_add_desc[i].style.display = 'none'

    const soma_1 = conta_sist_escr (1)
    const soma_2 = conta_sist_escr (2)

    let vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
    if (vocabulario.idioma_1.length) {
      for (let i = 0; i < vocabulario.idioma_1.length; i++) {
        if (vocabulario.idioma_1[i].tipo != 'palavra') {
          const col_somada = soma_1.ativos + i
          document.getElementById(`recip_idi1_cap${cap_i_ativo}_item${item_i}_col${i}`).style.display = 'none'
        }
        
      }
    }

    if (vocabulario.idioma_2.length) {
      for (let i = 0; i < vocabulario.idioma_2.length; i++) {
        if (vocabulario.idioma_2[i].tipo != 'palavra') {
          const col_somada = soma_2 + i
          document.getElementById(`recip_idi1_cap${cap_i_ativo}_item${item_i}_col${i}`).style.display = 'none'
        }
      }
    }

  } else {

    if (!document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`)) {
      document.getElementById(`linha_termos_${cap_i_ativo}_${item_i}`).style.display = 'flex'
    }

    document.getElementById(`linha_${cap_i}_${item_i}_idi_1`).style.height = '120px'
    document.getElementById(`linha_${cap_i}_${item_i}_idi_2`).style.height = '120px'
    document.getElementById(`linha_bot_termo_${cap_i}_${item_i}`).style.display = 'flex'

    for (let i = 0; i < botoes_add_desc.length; i++) botoes_add_desc[i].style.display = 'flex'


    const soma_1 = conta_sist_escr (1)
    const soma_2 = conta_sist_escr (2)

    let vocabulario = obj_teste.capitulos[cap_i_ativo].vocabulario[item_i]
    if (vocabulario.idioma_1.length) {
      for (let i = 0; i < vocabulario.idioma_1.length; i++) {
        if (vocabulario.idioma_1[i].tipo != 'palavra') {
          const col_somada = soma_1.ativos + i
          document.getElementById(`recip_idi1_cap${cap_i_ativo}_item${item_i}_col${i}`).style.display = 'inline'
        }
        
      }
    }

    if (vocabulario.idioma_2.length) {
      for (let i = 0; i < vocabulario.idioma_2.length; i++) {
        if (vocabulario.idioma_2[i].tipo != 'palavra') {
          const col_somada = soma_2 + i
          document.getElementById(`recip_idi1_cap${cap_i_ativo}_item${item_i}_col${i}`).style.display = 'inline'
        }
      }
    }

  }



  document.getElementById(`recip_linha_${cap_i}_${item_i}`).classList.add('recip_tudo_insere_termos')



  // Criamos os "botões" Inserir outro termo.
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

  // Precisa-se alterar a forma do ícone lá. Ou não.


  // Criamos dois div e dois botões, cada um pra adicionar uma palavra no idioma do lado.
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
      
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="elimina_capitulo()"></i> 
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

async function completar_dekoreba(resultado, id_decoreba) {
  monta_decoreba_mostra(`${id_decoreba}`)
}

function carrega_pergunta_escrita (orient, obj) {

  const cabecalho = cria_cabecalho('jogo', `${obj.avatar}`, `${obj.id_usuario}`)

  // Essa parada tem que vir com os alfabetos tb.
  // i, opcao, id_decoreba, i_capitulo, id_usuario, avatar, distancia,
  // Escolhemos um i aleatório do capítulo todo.


  // Primeiramente, verificamos qual é o idioma da pergunta.
  const idioma_falado = orient == '1-1' || orient === '1-2' ? `${obj.idioma_1}` : `${obj.idioma_2}`

  let i_aleatorio = Math.floor(Math.random() * stri[obj.i].vocabulario.length)

  const palavra = stri[obj.i].vocabulario[i_aleatorio]

  let pergunta = ''
  let resposta = ''
  let arquivo_audio
  let alfabetos_rodada_perg = []
  let alfabetos_rodada_resp = []

  let modalidade = ''
  if (escolhas_dek.modalidade === 'multipla_escolha') modalidade = 'múltipla escolha'
  if (escolhas_dek.modalidade === 'escrita') modalidade = 'escrita'
  if (escolhas_dek.modalidade === 'falada') modalidade = 'falada'


  if (escolhas_dek.alfabetos_perg.length) {
    for (let i = 0; i < escolhas_dek.alfabetos_perg.length; i++) {
      const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_perg[i])
      alfabetos_rodada_perg.push(sis_esc)
    }
  }

  if (escolhas_dek.alfabetos_resp.length) {
    for (let i = 0; i < escolhas_dek.alfabetos_resp.length; i++) {
      const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_resp[i])
      alfabetos_rodada_resp.push(sis_esc)
    }
  }


  let string_orientacao = ''
  let palavra_pergunta
  if (orient == '1-1') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_1

    for (let i = 0; i < palavra.idioma_1.length; i++) {
      if (palavra.idioma_1[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_1[i].item
      }
    }
    arquivo_audio = palavra.idioma_1[0].arquivo

  }
  if (orient == '2-2') {
    string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_2}`
    palavra_pergunta = palavra.idioma_2
    for (let i = 0; i < palavra.idioma_2.length; i++) {
      if (palavra.idioma_2[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_2[i].item
      }
    }    arquivo_audio = palavra.idioma_2[0].arquivo

  }

  if (orient == '1-2') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_2}`
    palavra_pergunta = palavra.idioma_1

    pergunta = palavra.idioma_1[0].item
    for (let i = 0; i < palavra.idioma_2.length; i++) {
      if (palavra.idioma_2[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_2[i].item
      }
    }
    arquivo_audio = palavra.idioma_1[0].arquivo
  }
  if (orient == '2-1') {
    string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_2

    pergunta = palavra.idioma_2[0].item
    for (let i = 0; i < palavra.idioma_1.length; i++) {
      if (palavra.idioma_1[i].sistema_escrita === alfabetos_rodada_resp[0]) {
        resposta = palavra.idioma_1[i].item
      }
    }
    arquivo_audio = palavra.idioma_2[0].arquivo
  }


  let recip_perguntas = ''
  if (alfabetos_rodada_perg.length) {
    for (let i = 0; i < alfabetos_rodada_perg.length; i++) {
      for (let j = 0; j < palavra_pergunta.length; j++) {
        if (alfabetos_rodada_perg[i] === palavra_pergunta[j].sistema_escrita) {
          recip_perguntas += `<div class="flex_row center" style="padding-left: 20px; padding-right: 20px; border: 1px solid green; border-radius: 10px; margin: 5px;">${palavra_pergunta[j].item}</div>`
        }
      }
    }
  }


  document.getElementById('div_palco_index').innerHTML =  `
    <audio id="audio_palavra" autoplay>
      <source src="./mp3/${obj.id_usuario}/${obj.id_decoreba}/${stri[obj.i]._id}/${idioma_falado}/${arquivo_audio}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>

     <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div> 


    <div id="popup_resposta_escrita" class="flex_row T1 center sumido " style="height: 100vh; position: fixed; z-index: 99999;">
      <div class="flex_col center" style="width: 400px; height: 200px; background: white; border-radius: 15px; font-size: 50pt; ">
        ${resposta}
      </div>
    </div>
        


    <div id="div_fundo_respondeu" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);">


    </div>

 

    <div id="div_finalizou_ganhou" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);">
      <div class="flex_col center" style="width: 300px; height: 150px; background: purple; position: absolute; padding: 15px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background: var(--fundo_carta);  box-shadow: 0px 0px 2px #adadad;">
        Parabéns!!
        <br>
        <button class="botao" onclick="completar_dekoreba('ganhou', '${obj.id_decoreba}')">Completar</button>
      </div>
    </div>

    <div id="div_finalizou_perdeu" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);">
      <div class="flex_col center" style="width: 300px; height: 150px; background: purple; position: absolute; padding: 15px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background: var(--fundo_carta);  box-shadow: 0px 0px 2px #adadad;">
        Game Over
        <br>
        <button class="botao" onclick="completar_dekoreba('perdeu', '${obj.id_decoreba}')">Finalizar</button>
      </div>
    </div>

    <div id="div_protecao" class="flex_row T1 sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.1);">
    </div>

    ${cabecalho}


    <div id="recip_pergunta" class="flex_col center T1 decoreba_jogo_recip" style="margin-top: 25px;">
      
      <div style="flex_row T1 center" style="font-size: 13pt; background: red; margin-bottom: -25px;">
        Orientação: ${string_orientacao}  <span style="margin-left: 25px;">Modalidade: ${modalidade}</div>
      </div>
      <div class="flex_col T1 center">
        <h2>${obj.titulo}</h2>
        <h3 style="margin-top: -25px;">${obj.titulo_capitulo}</h3>
      </div>
      
      <div class="flex_col T1 center largura_interna fundo_prancheta" style="">
        <div class="flex_row center">
          <div class="flex_row center" style="font-size: 25pt; margin: 15px; flex-wrap: wrap;">
            ${recip_perguntas}
            <br>
          </div>
          <br>
          <div class="flex_row center botao" style='color: green; margin-left: 15px;' onclick="document.getElementById('audio_palavra').play();">
            <img src='../imagens/auto_falante.png' style="width: 25px; color: pink;">
          </div>
        </div>

        <input id="input_resposta_escrita" type="text" style="width: 50%; padding: 10px; font-size: 20pt; border: 1px solid grey; border-radius: 7px;" autofocus>

        <br><br>
        <button class="flex_row center botao" onclick='envia_resp_escrita("${resposta}", "${orient}", ${JSON.stringify(obj)})'>Enviar</button>


        <div style="font-size: 17pt; margin-top: 25px;">Respostas Corretas: <span id="span_resp_corretas">${resps_corretas_escritas}</span> / ${meta_corretas}</div>
        <div style="font-size: 17pt; margin-bottom: 25px;">Respostas Erradas: <span id="span_resp_erradas">${resps_erradas_escritas}</span> / ${meta_erradas}</div>

        <button class="botao" onclick='monta_decoreba_mostra("${obj.id_decoreba}")'>Voltar</button>

      </div>
    </div>
  `

  document.getElementById('input_resposta_escrita').focus()

  // Ao apertar Enter, tb tem que ir essa parada.
  window.scrollTo(0, 0)
}

async function clicou_resposta(resp_dada, resp_certa, opcao, id_decoreba, i_capitulo, distancia, avatar, alternativa_clicada, alternativa_correta, idioma_falado, id_usuario) {

  // obj, opcao, id_decoreba, i_capitulo, id_usuario, avatar, distancia
  let resp_a = document.getElementById('resp_a').innerHTML
  let resp_b = document.getElementById('resp_b').innerHTML
  let resp_c = document.getElementById('resp_c').innerHTML

  let resposta_certa

  if (opcao === '2-1') resposta_certa = stri[i_capitulo].vocabulario[resp_certa].item_idioma_1
  if (opcao === '1-2') resposta_certa = stri[i_capitulo].vocabulario[resp_certa].item_idioma_2

  if (resp_dada === resp_certa) {
    document.getElementById('div_protecao').style.display = 'flex'

    document.getElementById(`resp_${alternativa_clicada}`).style.background = "green"
    document.getElementById(`resp_${alternativa_clicada}`).style.color = "white"

    respostas_corretas++
    document.getElementById('span_resp_corretas').innerHTML = respostas_corretas

    if (respostas_corretas != meta_corretas) {
      const certou = new Audio('/mp3/correct-choice-43861.mp3')
      certou.play()

      setTimeout(() => {
        carrega_pergunta(i_capitulo, `${opcao}`, `${id_decoreba}`, i_capitulo, `${id_usuario}`, `${avatar}`, `${distancia}`, `${idioma_falado}`)
      }, "1000")
    }

    if (respostas_corretas === meta_corretas) {
      const obj_vai = {
        'distancia': `${distancia}`,
        'orientacao_idiomas': `${orientacao_idiomas_global}`,
        'id_capitulo': `${stri[i_capitulo]._id}`,
        'id_decoreba': `${id_decoreba}`,
        'i_capitulo': i_capitulo,
        'respostas_corretas': respostas_corretas,
        'respostas_erradas': respostas_erradas
      }

      await vai_filhao_2('atualiza_pontuacao', JSON.stringify(obj_vai))

      const erro_perdeu = new Audio('/mp3/success-fanfare-trumpets-6185.mp3')
      erro_perdeu.play()

      setTimeout(async () => {
        document.getElementById('div_protecao').style.display = 'none'
        document.getElementById('div_finalizou_ganhou').style.display = 'flex'
      }, "2000")

    }
  }

  if (resp_dada != resp_certa) {
    document.getElementById(`resp_${alternativa_clicada}`).style.background = "red"
    document.getElementById(`resp_${alternativa_clicada}`).style.color = "white"

    document.getElementById(`resp_${alternativa_correta}`).style.background = "green"
    document.getElementById(`resp_${alternativa_correta}`).style.color = "white"

    respostas_erradas++
    document.getElementById('span_resp_erradas').innerHTML = respostas_erradas

    if (respostas_erradas != meta_erradas) {
      const erro = new Audio('/mp3/sadwhisle-91469.mp3')
      erro.play()
      // alert("respostas_erradas: " + respostas_erradas + " - meta_erradas: " + meta_erradas)

      setTimeout(() => {
        carrega_pergunta(i_capitulo, `${opcao}`, `${id_decoreba}`, i_capitulo, `${id_usuario}`, `${avatar}`, `${distancia}`, `${idioma_falado}`)
      }, "1000")
    }

    if (respostas_erradas === meta_erradas) {

      // Grava a decoreba nas decorebas praticadas
      // Calcula o desempenho e compara se foi o melhor, se foi, grava lá.
      // Se completou o capítulo, tem que marcar como 100%. Não precisa pintar agora, só depois quando a parada já estiver funcionando.
      const obj_vai = {
        'distancia': `${distancia}`,
        'orientacao_idiomas': `${orientacao_idiomas_global}`,
        'id_capitulo': `${stri[i_capitulo]._id}`,
        'id_decoreba': `${id_decoreba}`,
        'i_capitulo': i_capitulo,
        'respostas_corretas': respostas_corretas,
        'respostas_erradas': respostas_erradas
      }


      await vai_filhao_2('atualiza_pontuacao', JSON.stringify(obj_vai))

      const erro_perdeu = new Audio('/mp3/wah-wah-sad-trombone-6347.mp3')
      erro_perdeu.play()

      setTimeout(async () => {

        document.getElementById('div_protecao').style.display = 'none'
        document.getElementById('div_finalizou_perdeu').style.display = 'flex'
      }, "500")

    }

  }
}

function carrega_pergunta (i, opcao, id_decoreba, i_capitulo, id_usuario, avatar, distancia, idioma_falado) {

  opcao = escolhas_dek.orientacao // Adapta pro modo novo de jogo múltipla escolha.

  arr_respostas = []

  let stri_stringify = JSON.stringify(stri[i])

  // Escolhemos um 1 aleatório do capítulo todo.
  let i_aleatorio = Math.floor(Math.random() * stri[i].vocabulario.length)

  let pergunta = stri[i].vocabulario[i_aleatorio].item_idioma_1 // Gravamos a pergunta.
  const palavra = stri[i].vocabulario[i_aleatorio]
  
  // A resposta certa é a do i_aleatório, que é o msm i da pergunta.
  let i_resposta_certa = i_aleatorio
  let i_resposta_errada_1 = null
  let i_resposta_errada_2 = null

  // esse do while é importante pq o do no começo já lança um valor pro i_resposta_errada.
  // E o while vê, se o i_resposta_errada for igual à resposta certa, tenta outro i.
  do {
    i_resposta_errada_1 = Math.floor(Math.random() * stri[i].vocabulario.length)
  }
  while (i_resposta_errada_1 == i_resposta_certa)

  // Aqui msm coisa, lança um valor aleatorio pro i_resposta_2.
  // Se o i lançado for o mesmo da resposta errada anterior ou o da resposta correta, tenta outro i.
  do {
    i_resposta_errada_2 = Math.floor(Math.random() * stri[i].vocabulario.length)
  }
  while (i_resposta_errada_2 == i_resposta_certa || i_resposta_errada_2 == i_resposta_errada_1)

  // Criamos essa arraya e colocamos os is anteriores aqui, um em cada espacinho, para depois embaralharmos entre estas 3.
  arr_respostas.push(i_resposta_certa)
  arr_respostas.push(i_resposta_errada_1)
  arr_respostas.push(i_resposta_errada_2)

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

  // Aqui criamos estas lets para caso a opção de orientação seja arabe-portugues,
  // mostrar a pergunta em árabe e as repostas em português e se a opção de orientação for
  // portugues-arabe, mostra a pergunta em português e as respostas em árabe.

  let id_pergunta = stri[i].vocabulario[i_aleatorio]._id

  let pergunta_escrita = ''

  let palavra_pergunta
  let palavra_resp_1 = ''
  let palavra_resp_2 = ''
  let palavra_resp_3 = ''

  let modalidade = ''
  if (escolhas_dek.modalidade === 'multipla_escolha') modalidade = 'múltipla escolha'
  if (escolhas_dek.modalidade === 'escrita') modalidade = 'escrita'
  if (escolhas_dek.modalidade === 'falada') modalidade = 'falada'

  let string_orientacao = ''
  if (opcao == '1-1') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_1

    palavra_resp_1 = stri[i].vocabulario[arr_respostas[j_resposta_1]].idioma_1
    palavra_resp_2 = stri[i].vocabulario[arr_respostas[j_resposta_2]].idioma_1
    palavra_resp_3 = stri[i].vocabulario[arr_respostas[j_resposta_3]].idioma_1
  }
  if (opcao == '2-2') {
    string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_2}`
    palavra_pergunta = palavra.idioma_2

    palavra_resp_1 = stri[i].vocabulario[arr_respostas[j_resposta_1]].idioma_2
    palavra_resp_2 = stri[i].vocabulario[arr_respostas[j_resposta_2]].idioma_2
    palavra_resp_3 = stri[i].vocabulario[arr_respostas[j_resposta_3]].idioma_2
  }
  if (opcao == '1-2') {
    string_orientacao = `${pre_jogo.idioma_1} - ${pre_jogo.idioma_2}`
    palavra_pergunta = palavra.idioma_1

    palavra_resp_1 = stri[i].vocabulario[arr_respostas[j_resposta_1]].idioma_2
    palavra_resp_2 = stri[i].vocabulario[arr_respostas[j_resposta_2]].idioma_2
    palavra_resp_3 = stri[i].vocabulario[arr_respostas[j_resposta_3]].idioma_2
  }
  if (opcao == '2-1') {
    string_orientacao = `${pre_jogo.idioma_2} - ${pre_jogo.idioma_1}`
    palavra_pergunta = palavra.idioma_2

    palavra_resp_1 = stri[i].vocabulario[arr_respostas[j_resposta_1]].idioma_1
    palavra_resp_2 = stri[i].vocabulario[arr_respostas[j_resposta_2]].idioma_1
    palavra_resp_3 = stri[i].vocabulario[arr_respostas[j_resposta_3]].idioma_1
  }
  
  // A palavra em todos os alfabetos contém o mesmo arquivo de áudio, logo, o 0 serve para todos.
  const arquivo_audio = palavra_pergunta[0].arquivo


  let alfabetos_rodada_perg = []
  if (escolhas_dek.alfabetos_perg.length) {
    for (let i = 0; i < escolhas_dek.alfabetos_perg.length; i++) {
      const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_perg[i])
      alfabetos_rodada_perg.push(sis_esc)
    }
  }

  let recip_perguntas = ''
  if (alfabetos_rodada_perg.length) {
    for (let i = 0; i < alfabetos_rodada_perg.length; i++) {
      for (let j = 0; j < palavra_pergunta.length; j++) {
        if (alfabetos_rodada_perg[i] === palavra_pergunta[j].sistema_escrita) {
          recip_perguntas += `<div class="flex_row center" style="padding-left: 20px; padding-right: 20px; border: 1px solid green; border-radius: 10px; margin: 5px;">${palavra_pergunta[j].item}</div>`
        }
      }
    }
  }
  pergunta_escrita = recip_perguntas

  let alfabetos_rodada_resp = []
  if (escolhas_dek.alfabetos_resp.length) {
    for (let i = 0; i < escolhas_dek.alfabetos_resp.length; i++) {
      const sis_esc = reconhece_sist_escrita(escolhas_dek.alfabetos_resp[i])
      alfabetos_rodada_resp.push(sis_esc)
    }
  }

  let resp_total_1 = ''
  if (escolhas_dek.alfabetos_resp.length) {
    for (let i = 0; i < alfabetos_rodada_resp.length; i++) {
      for (let k = 0; k < palavra_resp_1.length; k++) {
        if (alfabetos_rodada_resp[i] === palavra_resp_1[k].sistema_escrita) {
          const hifen = (k > 0 & k < palavra_resp_1.length - 1) ? " - " : ""
          resp_total_1 += '' + palavra_resp_1[k].item + hifen
        }
      }
    }
  }

  let resp_total_2 = ''
  if (escolhas_dek.alfabetos_resp.length) {
    for (let i = 0; i < alfabetos_rodada_resp.length; i++) {
      for (let k = 0; k < palavra_resp_2.length; k++) {
        const hifen = (k > 0 & k < palavra_resp_2.length - 1) ? ' - ' : ''
        if (alfabetos_rodada_resp[i] === palavra_resp_2[k].sistema_escrita) {
          resp_total_2 += '' + palavra_resp_2[k].item + hifen
        }
      }
    }
  }

  let resp_total_3 = ''
  if (escolhas_dek.alfabetos_resp.length) {
    for (let i = 0; i < alfabetos_rodada_resp.length; i++) {
      for (let k = 0; k < palavra_resp_3.length; k++) {
        const hifen = (k > 0 & k < palavra_resp_3.length - 1) ? ' - ' : ''
        if (alfabetos_rodada_resp[i] === palavra_resp_3[k].sistema_escrita) {
          resp_total_3 += '' + palavra_resp_3[k].item + hifen
        }
      }
    }
  }

  let resposta_1_escrita = resp_total_1
  let resposta_2_escrita = resp_total_2
  let resposta_3_escrita = resp_total_3


  let letra_certa
  if (arr_respostas[j_resposta_1] === i_resposta_certa) {
    letra_certa = "a"
  }
  if (arr_respostas[j_resposta_2] === i_resposta_certa) {
    letra_certa = "b"
  }
  if (arr_respostas[j_resposta_3] === i_resposta_certa) {
    letra_certa = "c"
  }

  // Desenhamos a pergunta, os botões das respostas, o placar e o botão Voltar.
  // Botamos tudo isso em uma constante.

  const string_exercicio = `
    <audio id="audio_palavra" autoplay>
      <source src="./mp3/${id_usuario}/${id_decoreba}/${stri[i]._id}/${idioma_falado}/${arquivo_audio}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>

    <audio id="blop">
      <source src="./mp3/Blop-Mark_DiAngelo-79054334.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    
    <div class="flex_col T1 center largura_interna fundo_prancheta" style="">
        <div class="flex_row center">
          <div class="flex_row center" style="font-size: 25pt; margin: 15px; flex-wrap: wrap;">${pergunta_escrita}</div><br><div class="flex_row center botao" style='color: green; margin-left: 15px;' onclick="document.getElementById('audio_palavra').play();"><img src='imagens/auto_falante.png' style="width: 25px; color: pink;"></div>
        </div>

        <button id="resp_a" class="botao T1 botao_resposta bot_inativo" style="flex-wrap: wrap;" onclick='clicou_resposta(${arr_respostas[j_resposta_1]}, ${i_resposta_certa}, "${opcao}", "${id_decoreba}", ${i_capitulo}, "${distancia}", "${avatar}", "a", "${letra_certa}", "${idioma_falado}", "${id_usuario}")'>${resposta_1_escrita}</button>
        <button id="resp_b" class="botao T1 botao_resposta bot_inativo" style="flex-wrap: wrap;" onclick='clicou_resposta(${arr_respostas[j_resposta_2]}, ${i_resposta_certa}, "${opcao}", "${id_decoreba}", ${i_capitulo}, "${distancia}", "${avatar}", "b", "${letra_certa}", "${idioma_falado}", "${id_usuario}")'>${resposta_2_escrita}</button>
        <button id="resp_c" class="botao T1 botao_resposta bot_inativo" style="flex-wrap: wrap;" onclick='clicou_resposta(${arr_respostas[j_resposta_3]}, ${i_resposta_certa}, "${opcao}", "${id_decoreba}", ${i_capitulo}, "${distancia}", "${avatar}", "c", "${letra_certa}", "${idioma_falado}", "${id_usuario}")'>${resposta_3_escrita}</button>

        <div style="font-size: 17pt; margin-top: 25px;">Respostas Corretas: <span id="span_resp_corretas">${respostas_corretas}</span> / ${meta_corretas}</div>
        <div style="font-size: 17pt; margin-bottom: 25px;">Respostas Erradas: <span id="span_resp_erradas">${respostas_erradas}</span> / ${meta_erradas}</div>

        <button class="botao" onclick='monta_decoreba_mostra("${id_decoreba}")'>Voltar</button>

        <div class="flex_row sumido" style="position: fixed; right: 0;">
     
          <div class="flex_col center" style="height: 200px;">

          <i class="fa-solid fa-volume-high" style="font-size: 20px; margin-bottom: 50px; color: grey;"></i> 
          <input type="range" class="slider" style="margin-top: 0px;"/>

          <i class="fa-solid fa-volume-xmark" style="font-size: 20px; margin-top: 50px; color: grey;"></i> 
        </div>

      </div>
    </div>
    </div>      
  </div>
  `
  const cabecalho = cria_cabecalho('jogo', `${avatar}`, `${id_usuario}`)
  // Inserimos a variável no palco meu.
  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `

    ${cabecalho}
  
    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div> 

    <div id="div_finalizou_ganhou" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);">
      <div class="flex_col center" style="width: 300px; height: 150px; background: purple; position: absolute; padding: 15px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background: var(--fundo_carta);  box-shadow: 0px 0px 2px #adadad;">
        Parabéns!!
        <br>
        <button class="botao" onclick="completar_dekoreba('ganhou', '${id_decoreba}')">Completar</button>
      </div>
    </div>

    <div id="div_finalizou_perdeu" class="flex_col T1 center sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.5);">
      <div class="flex_col center" style="width: 300px; height: 150px; background: purple; position: absolute; padding: 15px; padding-left: 20px; padding-right: 20px; border-radius: 10px; background: var(--fundo_carta);  box-shadow: 0px 0px 2px #adadad;">
        Game Over
        <br>
        <button class="botao" onclick="completar_dekoreba('perdeu', '${id_decoreba}')">Finalizar</button>
      </div>
    </div>

    <div id="div_protecao" class="flex_row T1 sumido" style="height: 100%; position: fixed; background-color: rgba(0, 0, 0, 0.1);">
    </div>
    <div id="recip_pergunta" class="flex_col center T1 decoreba_jogo_recip" style="margin-top: 25px;">

      <div style="flex_row T1 center" style="font-size: 13pt; background: red; margin-top: 25px; margin-bottom: -25px;">
        Orientação: ${string_orientacao}  <span style="margin-left: 25px;">Modalidade: ${modalidade}</div>
      </div>
      <div class="flex_col T1 center">
        <h2>${pre_jogo.titulo}</h2>
        <h3 style="margin-top: -25px;">${stri[i].titulo}</h3>
      </div>
      
      ${string_exercicio}

    </div>
  `
  window.scrollTo(0, 0)

  if (avatar === 'sem_avatar_pois_usuario_nao_esta_logado') {

    document.getElementById('div_cabecalho_lento').innerHTML = cabecalho_deslogado
    document.getElementById('recip_pergunta').style.marginTop = '50px'

  }
  checa_online()
}

async function envia_resp_escrita (resposta_correta, orient, obj) {


  // Tem que ter um valida que impede de ir se o campo da resposta estiver vazio.

  document.getElementById('div_fundo_respondeu').style.display = 'flex' // Fundo preto, que impede do usuário clicar enquanto a reposta é mostrada.
  const resposta_usuario = document.getElementById('input_resposta_escrita').value

  
  if (resposta_usuario == resposta_correta) {
    resps_corretas_escritas++
    document.getElementById('span_resp_corretas').innerHTML = resps_corretas_escritas

    // Se acertou todas
    if (resps_corretas_escritas === meta_corretas) {

      // Por enquanto não vai nada pro banco.

      // await vai_filhao_2('atualiza_pontuacao', JSON.stringify(obj_vai))

      const acerto_ganhou = new Audio('/mp3/success-fanfare-trumpets-6185.mp3')
      acerto_ganhou.play()

      setTimeout(async () => {
        document.getElementById('div_protecao').style.display = 'none'
        document.getElementById('div_finalizou_ganhou').style.display = 'flex'
      }, "2000")


    }

    // Se acertou mas ainda tem respostas pela frente
    if (resps_corretas_escritas != meta_corretas) {

      const certou = new Audio('/mp3/correct-choice-43861.mp3')
      certou.play()
      document.getElementById('input_resposta_escrita').style.border ="3px solid green"
      document.getElementById('input_resposta_escrita').style.color ="green"
      



      setTimeout(() => {

        carrega_pergunta_escrita(orient, obj)
        document.getElementById('div_fundo_respondeu').style.display = 'none'

      }, "1000")
    }

  } 

  if (resposta_usuario != resposta_correta) {
    resps_erradas_escritas++
    document.getElementById('span_resp_erradas').innerHTML = resps_erradas_escritas

    // Se acertou todas
    if (resps_erradas_escritas === meta_erradas) {

      // Por enquanto não vai nada pro banco.

      // await vai_filhao_2('atualiza_pontuacao', JSON.stringify(obj_vai))

      const erro_perdeu = new Audio('/mp3/wah-wah-sad-trombone-6347.mp3')
      erro_perdeu.play()

      setTimeout(async () => {
        document.getElementById('div_protecao').style.display = 'none'
        document.getElementById('div_finalizou_perdeu').style.display = 'flex'
      }, "2000")

    }

    if (resps_erradas_escritas != meta_erradas) {

      const erro = new Audio('/mp3/sadwhisle-91469.mp3')
      erro.play()
      document.getElementById('input_resposta_escrita').style.border ="3px solid red"
      document.getElementById('input_resposta_escrita').style.color ="red"

      document.getElementById('popup_resposta_escrita').style.display ="flex"

      setTimeout(() => {

        document.getElementById('popup_resposta_escrita').style.display ="none"
        carrega_pergunta_escrita(orient, obj)
        document.getElementById('div_fundo_respondeu').style.display = 'none'

      }, "1000")
    }
    
  }
}


// OPCOES //

async function alterar_senha (email) {

  if (navigator.onLine) {
    if (window.confirm("Quer mesmo trocar sua senha?")) {
      loading('loading...')
      console.log(email)
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

  const json = await vai_filhao_3('avatar_temporario')

  const opcoes_recip_troca_foto = document.getElementById('opcoes_recip_troca_foto')
  if (opcoes_recip_troca_foto.classList.contains("sumido")) {
    opcoes_recip_troca_foto.classList.remove("sumido")
  }

  document.getElementById('opcoes_avatar_placeholder').src = `imagens/avatares/temporarios/${json.nome_arquivo}`
}

async function opcoes_troca_avatar(acao) {
  // loading("loading...")
  const json = await vai_filhao_3('troca_avatar')

  document.getElementById('opcoes_avatar_placeholder').src = `imagens/avatares/400_400/${json.nome_arquivo}`
  document.getElementById('opcoes_avatar_400').src = `imagens/avatares/400_400/${json.nome_arquivo}`

  opcoes_popup_troca()
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
function fecha_popup_mostra(telinha) {
  if (telinha === 'modalidades') {
    document.getElementById('recip_modos_jogo').style.display = 'none'
  }
  if (telinha === 'orientacao') {
    document.getElementById('recip_orientacao_escrita').style.display = 'none'
  }

  if (telinha === 'alfabetos') {
    document.getElementById('recip_alfabetos_escrita').style.display = 'none'
  }

  escolhas_dek = {
    modalidade: '',
    orientacao: '',
    alfabetos_perg: [],
    alfabetos_resp: []
  }
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
        carrega_pergunta(pre_jogo.i, pre_jogo.orientacao_idiomas_global, pre_jogo.id_decoreba, pre_jogo.i_capitulo, pre_jogo.id_usuario, pre_jogo.avatar, pre_jogo.distancia_global, pre_jogo.idioma_falado_mult)
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

// Múltipla escolha e escrita podem ter os mesmos sisemas de escrita.
// A falada, não terá nenhum sistema de escrita na respostas. As escolhas serão referentes apenas aos sistemas de escrita das perguntas.
// Na modalidade Falada, as orientações também serão apenas entre idiomas diferentes. Ou não.
// O cara pode treinar a própria pronúncia, mas aí apareceria apenas a palavra escrita e o camarada teria de falar com o sotaque e a pronúncia correcta.
// Então, sempre na falada as 4 opções de orientação deverão aparecer.

function aparece_popup (telinha, obj) {

  // Primeiro some todas as telas popup dessa parada
  document.getElementById('recip_modos_jogo').style.display = 'none'
  document.getElementById('recip_orientacao_escrita').style.display = 'none'
  document.getElementById('recip_alfabetos_escrita').style.display = 'none'

  // Precisa-se analizar também se o negócio de vai e volta está ativo e pra onde vai.
  let botao_vem = ''
  let botao_vai = ''

  if (telinha === 'modalidades') {
    botao_vem = ''
    if (escolhas_dek.modalidade != '') {
      botao_vai = `
        <i class='icon-right-open-1 vai_vem_ativo' onclick='aparece_popup("orientacao", ${JSON.stringify(obj)});'></i>
      `
    }
  }

  if (telinha === 'orientacao') {
    botao_vem = `
      <i class='icon-left-open-1 vai_vem_ativo' onclick='aparece_popup("modalidades", ${JSON.stringify(obj)});'></i>
    `

    if (escolhas_dek.orientacao === '') botao_vai = `<i class='icon-right-open-1 vai_vem_inativo'></i>`
    if (escolhas_dek.orientacao != '') {
      botao_vai = `
        <i class='icon-right-open-1 vai_vem_ativo' onclick='aparece_popup("alfabetos", ${JSON.stringify(obj)});'></i>
      `
    }
  }

  if (telinha === 'alfabetos') {

    botao_vem = `
      <i class='icon-left-open-1 vai_vem_ativo' onclick='aparece_popup("orientacao", ${JSON.stringify(obj)});'></i>
    `

    if (escolhas_dek.alfabetos === '') botao_vai = `<i class='icon-right-open-1 vai_vem_inativo'></i>`
    if (escolhas_dek.alfabetos != '') {
      // Esse botao_vai ainda não tem nada pq o sistema tem que reconhecer quando o camarada
      // escolheu multiplas escolhas, escrita ou falada, para direcionar ao jogo corretamente e quando os idiomas e a modalidade permitem escolhas de alfabetos ou não.
      // Xiiiii
      botao_vai = `
        <i class='icon-right-open-1 vai_vem_ativo'></i>
      `
    }
  }

  const botoes_vai_vem = `
    <div class="flex_row T1 center" style="font-size: 20pt;">
      <div class="flex_row T2 center">
        &nbsp${botao_vem}
      </div>
      <div class="flex_row T2 center">
        ${botao_vai}&nbsp
      </div>
    </div>
  `

  // Agora é necessário calcular pra ver se o botão jogar aparecerá nessa rodada.
  /*
  let botao_jogar = ''

  if (telinha === 'orientacao') {

    if (obj.sistemas_escrita_1.length === 1 & obj.sistemas_escrita_2.length === 1) {
      botao_jogar = `<div class="flex_row center botao">Jogar</div>`
    }
  }
  */

  // Aqui criará todos os botões da telinha.
  // Se tiver algum botão selecionado, seleciona-o.
  if (telinha === 'modalidades') {

    // Definimos qual botão ficará ativo nesta tela do popup

    let atividade_multipla_escolha = 'bot_inativo'
    let atividade_escrita = 'bot_inativo'
    let atividade_falada = 'bot_inativo'

    // Se não está definido nada na escolhas_dek referente à modalidade, não faz nada.
    // Por outro lado, escolhas_dek.modalidade não for uma string vazia, ai...
    if (escolhas_dek.modalidade != '') {
      if (escolhas_dek.modalidade === 'multipla_escolha') atividade_multipla_escolha = 'bot_ativo'
      if (escolhas_dek.modalidade === 'escrita') atividade_escrita = 'bot_ativo'
      if (escolhas_dek.modalidade === 'falada') atividade_falada = 'bot_ativo'
    }

    const bot_mult = `
      <div id="bot_mult_esco" class="flex_row center botao ${atividade_multipla_escolha} bot_modalidades" style="width: 250px;" onclick='
        ativa_desativa_botao(this);
        atualiza_escolhas(${JSON.stringify({tipo: "modalidade", modalidade: "multipla_escolha", pre_jogo: obj})});
        '>Múltipla Escolha</div>
    `

    const bot_escr = `
      <div class="flex_row center botao ${atividade_escrita} bot_modalidades" style="width: 250px;" onclick='
        ativa_desativa_botao(this);
        atualiza_escolhas(${JSON.stringify({tipo: "modalidade", modalidade: "escrita", pre_jogo: obj})});
      '>Escrever</div>
    `

    const bot_fala = `
      <div class="flex_row center botao ${atividade_falada} bot_modalidades" onclick='
        ativa_desativa_botao(this);
        atualiza_escolhas(${JSON.stringify({tipo: "modalidade", modalidade: "falada", pre_jogo: obj})});
        ' style="width: 250px;">
        Falada</div>
    `

    document.getElementById('recip_modos_jogo_dentro').innerHTML = `
      ${bot_mult}
      ${bot_escr}
      ${bot_fala}
      ${botoes_vai_vem}
    `

    document.getElementById('recip_modos_jogo').style.display = 'flex'

  }

  if (telinha === 'orientacao') {

    let atividade_bot_1_2 = 'bot_inativo'
    let atividade_bot_2_1 = 'bot_inativo'
    let atividade_bot_1_1 = 'bot_inativo'
    let atividade_bot_2_2 = 'bot_inativo'

    if (escolhas_dek.orientacao != '') {

      if (escolhas_dek.orientacao === '1-2') atividade_bot_1_2 = 'bot_ativo'
      if (escolhas_dek.orientacao === '2-1') atividade_bot_2_1 = 'bot_ativo'
      if (escolhas_dek.orientacao === '1-1') atividade_bot_1_1 = 'bot_ativo'
      if (escolhas_dek.orientacao === '2-2') atividade_bot_2_2 = 'bot_ativo'
    }

    //  aparece_popup("alfabetos", ${JSON.stringify(obj)});

    let botao_1_2 = `<div id="bot_1-2" class="flex_row T2 center botao ${atividade_bot_1_2}" style="height: 60px;" onclick='
      ativa_desativa_botao(this);
      atualiza_escolhas(${JSON.stringify({tipo: "orientacao", orientacao: "1-2", pre_jogo: obj})});'>
        ${obj.idioma_1} / ${obj.idioma_2}
      </div>`

    let botao_2_1 =`<div id="bot_2-1" class="flex_row T2 center botao ${atividade_bot_2_1}" style="height: 60px;" onclick='
      ativa_desativa_botao(this);
      atualiza_escolhas(${JSON.stringify({tipo: "orientacao", orientacao: "2-1", pre_jogo: obj})});'>
        ${obj.idioma_2} / ${obj.idioma_1}
      </div>`

    let botao_1_1 = ''
    let botao_2_2 = ''

    if (obj.sistemas_escrita_1.length > 1 || escolhas_dek.modalidade === 'falada') {

      botao_1_1 = `<div id="bot_1-1" class="flex_row T2 center botao ${atividade_bot_1_1}" style="height: 60px;" onclick='
        ativa_desativa_botao(this);
        atualiza_escolhas(${JSON.stringify({tipo: "orientacao", orientacao: "1-1", pre_jogo: obj})});'>
          ${obj.idioma_1} / ${obj.idioma_1}
        </div>`
    }

    if (obj.sistemas_escrita_2.length > 1 || escolhas_dek.modalidade === 'falada') {

      botao_2_2 = `<div id="bot_2-2" class="flex_row T2 center botao ${atividade_bot_2_2}" style="height: 60px;" onclick='
        ativa_desativa_botao(this);
        atualiza_escolhas(${JSON.stringify({tipo: "orientacao", orientacao: "2-2", pre_jogo: obj})});'>
          ${obj.idioma_2} / ${obj.idioma_2}
        </div>`
    }

    document.getElementById('recip_orientacao_escrita_dentro').innerHTML = `
      <!-- <span style="margin: 15px;">Escolha os idiomas que praticarás</span> -->
      <div class="flex_row T1 center" style="margin-top: 5px; margin-bottom: 25px; color: grey; font-size: 15pt;">Idioma da pergunta / Idioma da resposta</div>
      <br><br>

      <div class="flex_row T1 center">
        ${botao_1_1}
        ${botao_2_2}
      </div>

      <div class="flex_row T1 center">
        ${botao_1_2}
        ${botao_2_1}
      </div>

      ${botoes_vai_vem}
      <div id="recip_bot_jogar"></div>
    `

    document.getElementById('recip_orientacao_escrita').style.display = 'flex'
  }

  if (telinha === 'alfabetos') {

    // No multipla escolha pode tudo. Idiomas iguais, alfabetos diferentes entre perguntas e respostas.
    // Na escrita só pode haver um único alfabeto nas respostas, não podendo ele conter nas perguntas
    // Na fala, sem alfabetos nas respostas.

  const botoes_vai_vem = `
    <div class="flex_row T1 center" style="font-size: 20pt;">
      <div class="flex_row T2 center">
        <i class="icon-left-open-1 vai_vem_ativo" onclick='aparece_popup("orientacao", ${JSON.stringify(obj)});'></i>

      </div>
      <div class="flex_row T2 center">
        &nbsp
      </div>
    </div>
  `
    /*
    const botoes_vai_vem = `
        <div class="flex_row T1 center" style="font-size: 20pt;">
          <i class="icon-left-open-1 vai_vem_ativo" onclick='aparece_popup("orientacao", ${JSON.stringify(obj)});'></i>
          <!-- <i class="icon-right-open-1"></i> -->
        </div>
    `
    */

    // Definimos os sistemas de escrita das perguntas e o das respostas.
    let sis_escr_perg
    let sis_escr_resp

    const orientacao = escolhas_dek.orientacao
    // Descobre o sistema de escrita das perguntas
    if (orientacao == '1-2' || orientacao == '1-1') sis_escr_perg = obj.sistemas_escrita_1
    if (orientacao == '2-1' || orientacao == '2-2') sis_escr_perg = obj.sistemas_escrita_2

    // Descobre o sistema de escrita das respostas
    if (orientacao == '2-1' || orientacao == '1-1') sis_escr_resp = obj.sistemas_escrita_1
    if (orientacao == '1-2' || orientacao == '2-2') sis_escr_resp = obj.sistemas_escrita_2

    let botoes_alfas_perg = ''
    let botoes_alfas_resp = ''

    // Camarada quer praticar idiomas difententes.
    if (escolhas_dek.orientacao == '1-2' || escolhas_dek.orientacao == '2-1') {

      // Se só tiver um alfabeto, no idioma de pergunta e no de respost,
      // vai direto pro carrega_pergunta_escrita() e ignora todo o restante desta função
      if (sis_escr_perg.length == 1 & sis_escr_resp.length == 1) return carrega_pergunta_escrita(escolhas_dek.orientacao, obj)  

      // Daqui pra baixo, continua se a linha cima não for satisfeita.

      for (let i = 0; i < sis_escr_perg.length; i++) {

        const innerHTML_do_sistema = innerHTML_sist_escr(sis_escr_perg[i].sistema)

        botoes_alfas_perg += `<div id="bot_perg_${escolhas_dek.orientacao}_${sis_escr_perg[i].sistema}" class="flex_row center botao bot_inativo" onclick='
          ativa_desativa_botao(this);
          valida_ativacao_alfabeto(this, "perg");
          atualiza_escolhas(${JSON.stringify({tipo: "alfabetos_perg", alfabeto: innerHTML_do_sistema, pre_jogo: obj})});
          '>${innerHTML_do_sistema}</div>`
      }

      for (let i = 0; i < sis_escr_resp.length; i++) {

        const innerHTML_do_sistema = innerHTML_sist_escr(sis_escr_resp[i].sistema)

        botoes_alfas_resp += `<div id="bot_resp_${escolhas_dek.orientacao}_${sis_escr_resp[i].sistema}" class="flex_row center botao bot_inativo" onclick='
          ativa_desativa_botao(this);
          valida_ativacao_alfabeto(this, "resp");
          atualiza_escolhas(${JSON.stringify({tipo: "alfabetos_resp", alfabeto: innerHTML_do_sistema, pre_jogo: obj})});
          '>${innerHTML_do_sistema}</div>
        `
      }

    }

    if (escolhas_dek.orientacao == '1-1' || escolhas_dek.orientacao == '2-2') {

      for (let i = 0; i < sis_escr_perg.length; i++) {

        const innerHTML_do_sistema = innerHTML_sist_escr(sis_escr_perg[i].sistema)

        botoes_alfas_perg += `<div id="bot_perg_${escolhas_dek.orientacao}_${sis_escr_perg[i].sistema}"  class="flex_row center botao bot_inativo" onclick='
          ativa_desativa_botao(this);
          valida_ativacao_alfabeto(this, "perg");
          atualiza_escolhas(${JSON.stringify({tipo: "alfabetos_perg", alfabeto: innerHTML_do_sistema, pre_jogo: obj})});
          '>${innerHTML_do_sistema}</div>`

        botoes_alfas_resp += `<div id="bot_resp_${escolhas_dek.orientacao}_${sis_escr_resp[i].sistema}"  class="flex_row center botao bot_inativo" onclick='
          ativa_desativa_botao(this);
          valida_ativacao_alfabeto(this, "resp");
          atualiza_escolhas(${JSON.stringify({tipo: "alfabetos_resp", alfabeto: innerHTML_do_sistema, pre_jogo: obj})});
          '>${innerHTML_do_sistema}</div>`
      }

    }
    
    let recip_respostas = ''
    if (escolhas_dek.modalidade === 'multipla_escolha') {
      recip_respostas = `
      <span style="marign-top: 50px; font-size: 15pt; color: grey;">Sistema(s) de escrita da resposta</span>
        <div id="recip_bots_resps" class="flex_row T1 center">
          ${botoes_alfas_resp}
        </div>
      `
    }

    if (escolhas_dek.modalidade === 'escrita') {
      recip_respostas = `
        <span style="marign-top: 50px; font-size: 15pt; color: grey;">Sistema de escrita da resposta</span>
        <div id="recip_bots_resps" class="flex_row T1 center">
          ${botoes_alfas_resp}
        </div>
      `
    }
    
    // Na falada, não há sistemas de escrita nas respostas
    
    document.getElementById('recip_botoes_alfa_escr').innerHTML = `
        <span style="marign-top: 25px; font-size: 15pt; color: grey;">Sistema(s) de escrita da pergunta</span>
        <div id="recip_bots_pergs" class="flex_row T1 center">
          ${botoes_alfas_perg}
        </div>
        ${recip_respostas}
        ${botoes_vai_vem}
        <div id="recip_bot_jogar_alfas"></div>
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

function ativa_desativa_botao (botao) {

  if (botao.classList.contains('bot_ativo')) {

    botao.classList.remove("bot_ativo")
    botao.classList.add("bot_inativo")
  } else if (botao.classList.contains('bot_inativo')) {

    botao.classList.remove("bot_inativo")
    botao.classList.add("bot_ativo")
  }

}

function monta_seleciona_sis_esc (botao) {

  if (botao.classList.contains('bot_ativo')) {

    botao.classList.remove("bot_ativo")
    botao.classList.add("bot_inativo")
  } else if (botao.classList.contains('bot_inativo')) {
    botao.classList.remove("bot_inativo")
    botao.classList.add("bot_ativo")
  }
}

// É aqui que ficará toda a ciência dos popups.
// É aqui nessa função que o sistema saberá o que fazer. Se aparece o botão jogar, se vai pra próxima popup e pans.

function atualiza_escolhas (obj) {
  
  if (obj.tipo === 'modalidade') {
    
    if (!escolhas_dek.modalidade) {
      escolhas_dek.modalidade = obj.modalidade
    } else if (escolhas_dek.modalidade) {
        
      if (escolhas_dek.modalidade != obj.modalidade) {
        escolhas_dek.modalidade = obj.modalidade
        escolhas_dek.orientacao = ''
        escolhas_dek.alfabetos_perg = []
        escolhas_dek.alfabetos_resp = []
      }
    }

    // Agora temos que apagar todas as opções 
    aparece_popup("orientacao", obj.pre_jogo)
  }

  if (obj.tipo === 'orientacao') {
    console.log("ori:")
    console.log(pre_jogo)
    if (obj.orientacao === '1-1' || obj.orientacao === '1-2') pre_jogo.idioma_falado_mult = pre_jogo.idioma_1
    if (obj.orientacao === '2-1' || obj.orientacao === '2-2') pre_jogo.idioma_falado_mult = pre_jogo.idioma_2

    pre_jogo.idioma_falado_mult
    // Caso o camarada escolha uma outra orientação, apagamos os alfabetos previamente escolhidos.
    // Se for a primeira vez que ele escolhe uma orientação, salvamos ela e segue o baile.
    if (!escolhas_dek.orientacao) {
      escolhas_dek.orientacao = obj.orientacao
    } else if (escolhas_dek.orientacao) {
              
      const id_bot = `bot_${escolhas_dek.orientacao}`
      const botao_resp = document.getElementById(id_bot)
      ativa_desativa_botao(botao_resp)

      if (escolhas_dek.orientacao != obj.orientacao) {
        // Apagar as outras escolhidas
        escolhas_dek.orientacao = obj.orientacao
        escolhas_dek.alfabetos_perg = []
        escolhas_dek.alfabetos_resp = []
      }
    }

    // Aqui serve para as três modalidades.
    if (obj.pre_jogo.sistemas_escrita_1.length === 1 & obj.pre_jogo.sistemas_escrita_2.length === 1) {

      const sist_esc_per = (obj.orientacao === '1-1' || obj.orientacao === '1-2') ? obj.pre_jogo.sistemas_escrita_1 : obj.pre_jogo.sistemas_escrita_2

      const sist_esc_resp = (obj.orientacao === '1-2' || obj.orientacao === '2-2') ? obj.pre_jogo.sistemas_escrita_2 : obj.pre_jogo.sistemas_escrita_1

      const innerHTML_perg = innerHTML_sist_escr(sist_esc_per[0].sistema)
      const innerHTML_resp = innerHTML_sist_escr(sist_esc_resp[0].sistema)

      escolhas_dek.alfabetos_perg.push(innerHTML_perg)
      escolhas_dek.alfabetos_resp.push(innerHTML_resp)

      // Aqui já deve aparecer o botão jogar.
      let func_onclick = ''

      if (escolhas_dek.modalidade === 'multipla_escolha') {
        console.log("idioma que deveria falar, ta no mult: " + pre_jogo.idioma_falado_mult)
        func_onclick = `carrega_pergunta(${obj.pre_jogo.i}, "${obj.pre_jogo.orientacao_idiomas_global}", "${obj.pre_jogo.id_decoreba}", ${obj.pre_jogo.i_capitulo}, "${obj.pre_jogo.id_usuario}", "${obj.pre_jogo.avatar}", "${obj.pre_jogo.distancia_global}", "${pre_jogo.idioma_falado_mult}");`
      }

      if (escolhas_dek.modalidade === 'escrita') {   
        const sa = JSON.stringify(obj.pre_jogo)     
        func_onclick = `carrega_pergunta_escrita("${escolhas_dek.orientacao}", ${sa});`
      }

      if (escolhas_dek.modalidade === 'falada') {

      }

      document.getElementById('recip_bot_jogar').innerHTML = `
        <div class="flex_row center botao" onclick='${func_onclick}'>Jogar</div>
      `

    } else {
      aparece_popup("alfabetos", obj.pre_jogo)
    }
  }

  // Escolheu um alfabeto pras perguntas
  if (obj.tipo === 'alfabetos_perg') {

    // Se não tem nenhum alfabeto nas perguntas da escolhas_dek, botemo-lo.
    if (!escolhas_dek.alfabetos_perg.length) {
      escolhas_dek.alfabetos_perg.push(obj.alfabeto)

    // Vemos se já tem algum alfabeto escolhido.
    } else if (escolhas_dek.alfabetos_perg.length) {

      let alfabeto_ja_foi_escolhido = 'nao'
      // Vemos se o alfabeto clicado já está na lista de escolhidos.
      for (let i = 0; i < escolhas_dek.alfabetos_perg.length; i++) {
        
        // Se tiver
        if (escolhas_dek.alfabetos_perg[i] == obj.alfabeto) {

          alfabeto_ja_foi_escolhido = 'sim'
          // O if abaixo impede de ficar sem alfabetos nas perguntas
          if (escolhas_dek.alfabetos_perg.length != 1 & escolhas_dek.alfabetos_perg.length != 0) {
            escolhas_dek.alfabetos_perg.splice(i, 1)
          }
        }
      }

      // Se chegou até aqui e com a variável alfabeto_ja_foi_escolhido igual à 'nao' é pq não achou o alfabeto clicado, logo, não tinha, logo, coloquemo-lo. Fi-lo por que qui-lo.
      if (alfabeto_ja_foi_escolhido === 'nao') escolhas_dek.alfabetos_perg.push(obj.alfabeto)
    }

    // Agora, para idiomas iguais, precisamos impedir dois alfabetos igualmente iguais no jogo desta dekoreba.
    if (escolhas_dek.orientacao === '1-1' || escolhas_dek.orientacao === '2-2') {
      const alfabeto_pergunta_clicado = obj.alfabeto

      if (escolhas_dek.alfabetos_resp.length) {

        for (let i = 0; i < escolhas_dek.alfabetos_resp.length; i++) {
          if (escolhas_dek.alfabetos_resp[i] == alfabeto_pergunta_clicado) {

            escolhas_dek.alfabetos_resp.splice(i, 1)
              
            // Aqui precisa simular um clique no botão específico.
            const sis_es = reconhece_sist_escrita(obj.alfabeto)
            const id_bot = `bot_resp_${escolhas_dek.orientacao}_${sis_es}`
            const botao_resp = document.getElementById(id_bot)
            ativa_desativa_botao(botao_resp)
          }
        }
      }
    }
  }

  if (obj.tipo === 'alfabetos_resp') {

    if (!escolhas_dek.alfabetos_resp.length) {

      escolhas_dek.alfabetos_resp.push(obj.alfabeto)
    } else if (escolhas_dek.alfabetos_resp.length) {

      // Aqui temos também que fazer as paradas do negócio do treco do negócio.
      // Se for modalidade escrita, somente um alfabeto temos que ter nas respostas.
      if (escolhas_dek.modalidade === 'escrita') {

        if (escolhas_dek.alfabetos_resp.length === 1) {

          for (let i = 0; i < escolhas_dek.alfabetos_resp.length; i++) {

            const sis_es = reconhece_sist_escrita(escolhas_dek.alfabetos_resp[i])
            const id_bot = `bot_resp_${escolhas_dek.orientacao}_${sis_es}`
            const botao_resp = document.getElementById(id_bot)

            escolhas_dek.alfabetos_resp.splice(i, 1)

            ativa_desativa_botao(botao_resp)
          }
        }

        escolhas_dek.alfabetos_resp.push(obj.alfabeto)
      }



      let alfabeto_ja_foi_escolhido = 'nao'

      for (let i = 0; i < escolhas_dek.alfabetos_resp.length; i++) {
        
        if (escolhas_dek.alfabetos_resp[i] == obj.alfabeto) {

          alfabeto_ja_foi_escolhido = 'sim'

          if (escolhas_dek.alfabetos_resp.length != 1 & escolhas_dek.alfabetos_resp.length != 0) {
            escolhas_dek.alfabetos_resp.splice(i, 1)
          }
        }
      }

      if (alfabeto_ja_foi_escolhido === 'nao') escolhas_dek.alfabetos_resp.push(obj.alfabeto)
    }

    // Agora, para idiomas iguais, precisamos impedir dois alfabetos igualmente iguais no jogo desta dekoreba.
    if (escolhas_dek.orientacao === '1-1' || escolhas_dek.orientacao === '2-2') {
      const alfabeto_resposta_clicado = obj.alfabeto

      if (escolhas_dek.alfabetos_perg.length) {

        for (let i = 0; i < escolhas_dek.alfabetos_perg.length; i++) {
          if (escolhas_dek.alfabetos_perg[i] == alfabeto_resposta_clicado) {

            escolhas_dek.alfabetos_perg.splice(i, 1)

            const sis_es = reconhece_sist_escrita(obj.alfabeto)
            const id_bot = `bot_perg_${escolhas_dek.orientacao}_${sis_es}`
            const botao_perg = document.getElementById(id_bot)
            ativa_desativa_botao(botao_perg)
          }
        }
      }
    }
  }


  // Aqui embaixo vemos se aparecerá ou sumirá o botão jogar da tela popup de escolha de alfabetos.
  if (obj.tipo === 'alfabetos_perg' || obj.tipo === 'alfabetos_resp') {

      // Se tem um alfabeto na pergunta e um na resposta, pelo menos.
      console.log("escolhas_dek.alfabetos_perg.length: " + escolhas_dek.alfabetos_perg.length)
      console.log("escolhas_dek.alfabetos_resp.length: " + escolhas_dek.alfabetos_resp.length)
      console.log("escolhas_dek.orientacao: " + escolhas_dek.orientacao)

    // Inicialmente nenhum idioma ficará selecionado. Com o tempo de programação colocamos essa opção.
    let func_onclick = ''

    if (escolhas_dek.modalidade === 'falada') {
      if (escolhas_dek.alfabetos_perg.length) {
        if (escolhas_dek.alfabetos_perg.length >= 1) {
          func_onclick = `oe`
        }
      }      
    }



    if (escolhas_dek.orientacao === '1-1' || escolhas_dek.orientacao === '2-2') {
      

        if (escolhas_dek.modalidade === 'multipla_escolha') {
          if (escolhas_dek.alfabetos_perg.length & escolhas_dek.alfabetos_resp.length) {
            func_onclick = `carrega_pergunta(${obj.pre_jogo.i}, "${obj.pre_jogo.orientacao_idiomas_global}", "${obj.pre_jogo.id_decoreba}", ${obj.pre_jogo.i_capitulo}, "${obj.pre_jogo.id_usuario}", "${obj.pre_jogo.avatar}", "${obj.pre_jogo.distancia_global}", "${obj.pre_jogo.idioma_falado_mult}");`

          } else {
            func_onclick = ''
          }
        }

        if (escolhas_dek.modalidade === 'escrita') {  
          if (escolhas_dek.alfabetos_perg.length & escolhas_dek.alfabetos_resp.length) {
            const sa = JSON.stringify(obj.pre_jogo)
            func_onclick = `carrega_pergunta_escrita("${escolhas_dek.orientacao}", ${sa});`
          } else {
            func_onclick = ''
          }
        }

        // Aqui só precisa ter um alfabeto nas perguntas e já está.
        if (escolhas_dek.modalidade === 'falada') {
          if (escolhas_dek.alfabetos_perg.length) {
            if (escolhas_dek.alfabetos_perg.length >= 1) {
              console.log("tiaia")
              func_onclick = `carrega_pergunta(${obj.pre_jogo.i}, "${obj.pre_jogo.orientacao_idiomas_global}", "${obj.pre_jogo.id_decoreba}", ${obj.pre_jogo.i_capitulo}, "${obj.pre_jogo.id_usuario}", "${obj.pre_jogo.avatar}", "${obj.pre_jogo.distancia_global}", "${obj.pre_jogo.idioma_falado_mult}");`
            }
          }
          
        }
    }

    if (escolhas_dek.orientacao === '1-2' || escolhas_dek.orientacao === '2-1') {
      if (escolhas_dek.alfabetos_perg.length >= 1 & escolhas_dek.alfabetos_resp.length >= 1) {

        if (escolhas_dek.modalidade === 'multipla_escolha') {

          func_onclick = `carrega_pergunta(${obj.pre_jogo.i}, "${obj.pre_jogo.orientacao_idiomas_global}", "${obj.pre_jogo.id_decoreba}", ${obj.pre_jogo.i_capitulo}, "${obj.pre_jogo.id_usuario}", "${obj.pre_jogo.avatar}", "${obj.pre_jogo.distancia_global}", "${obj.pre_jogo.idioma_falado_mult}");`
        }

        if (escolhas_dek.modalidade === 'escrita') {   
          const sa = JSON.stringify(obj.pre_jogo)     
          func_onclick = `carrega_pergunta_escrita("${escolhas_dek.orientacao}", ${sa});`
        }

        if (escolhas_dek.modalidade === 'falada') {

        }


      }
    }

    if (func_onclick != '') {
          document.getElementById('recip_bot_jogar_alfas').innerHTML = `
      <div class="flex_row center botao" onclick='${func_onclick}'>Jogar</div>
    `
    }
    if (func_onclick === '') document.getElementById('recip_bot_jogar_alfas').innerHTML = ''


    // Se forem de idiomas diferenetes
    // Se os alfabetos estiverem satisfatórios, aparece o jogar

    // Vemos também, se chegar nessa tela e não tem os dois alfabetos definidos, não mostra nofing.
  }
}

// Nessa função tá repetindo coisas. Dá pra deixar melhor, mas tá funcionando então segue o jogo.
async function muda_orientacao_distancia(acao, valor, id_decoreba, porcentagens, capitulos, cap_praticados) {

  const botao_1_2 = document.getElementById('botao_1-2')
  const botao_2_1 = document.getElementById('botao_2-1')

  const botao_curta = document.getElementById('botao_decoreba_curta')
  const botao_media = document.getElementById('botao_decoreba_media')
  const botao_longa = document.getElementById('botao_decoreba_longa')

  let orientacao
  let distancia

  if (acao === 'orientacao') {

    orientacao = valor
    orientacao_idiomas_global = valor

    // Buscamos qual é a distância setada nos botões
    let limite_corretas
    if (botao_curta.classList.contains("bot_ativo")) {
      distancia = 'distancia_curta'
      limite_corretas = 15
    }
    if (botao_media.classList.contains("bot_ativo")) {
      distancia = 'distancia_media'
      limite_corretas = 50
    }
    if (botao_longa.classList.contains("bot_ativo")) {
      distancia = 'distancia_longa'
      limite_corretas = 125
    }

    // Limpamos todos os botões de orientação...
    if (botao_1_2.classList.contains("bot_ativo")) botao_1_2.classList.remove("bot_ativo")
    if (botao_2_1.classList.contains("bot_ativo")) botao_2_1.classList.remove("bot_ativo")
    if (botao_1_2.classList.contains("bot_inativo")) botao_1_2.classList.remove("bot_inativo")
    if (botao_2_1.classList.contains("bot_inativo")) botao_2_1.classList.remove("bot_inativo")

    // ...e depois setamos eles
    if (orientacao === '1-2') {

      botao_1_2.classList.add("bot_ativo")
      botao_2_1.classList.add("bot_inativo")

      document.getElementById('span_porcentagem_curta').style.width = `${porcentagens.curta__1_2}%`
      document.getElementById('span_porcentagem_media').style.width = `${porcentagens.media__1_2}%`
      document.getElementById('span_porcentagem_longa').style.width = `${porcentagens.longa__1_2}%`
    }

    if (orientacao === '2-1') {

      botao_1_2.classList.add("bot_inativo")
      botao_2_1.classList.add("bot_ativo")

      document.getElementById('span_porcentagem_curta').style.width = `${porcentagens.curta__2_1}%`
      document.getElementById('span_porcentagem_media').style.width = `${porcentagens.media__2_1}%`
      document.getElementById('span_porcentagem_longa').style.width = `${porcentagens.longa__2_1}%`
    }

    // Definimos a largura da barrinha de porcentagem dos capítulos.
    for (let i = 0; i < capitulos.length; i++) {

      document.getElementById(`porcentagem_cap_${i}`).style.width = '0px'

      if (cap_praticados) {
        for (let j = 0; j < cap_praticados.length; j++) {
          if (capitulos[i]._id == cap_praticados[j].id_capitulo) {            

              // return (100 / obj.total) * obj.somatoria
            let max
            if (orientacao === '1-2' & distancia === 'distancia_curta') max = cap_praticados[j].max_curta__1_2
            if (orientacao === '1-2' & distancia === 'distancia_media') max = cap_praticados[j].max_media__1_2
            if (orientacao === '1-2' & distancia === 'distancia_longa') max = cap_praticados[j].max_longa__1_2

            if (orientacao === '2-1' & distancia === 'distancia_curta') max = cap_praticados[j].max_curta__2_1
            if (orientacao === '2-1' & distancia === 'distancia_media') max = cap_praticados[j].max_media__2_1
            if (orientacao === '2-1' & distancia === 'distancia_longa') max = cap_praticados[j].max_longa__2_1

            let porcentagem_concluida = (100 / limite_corretas) * max
            porcentagem_concluida = porcentagem_concluida.toFixed(0)

            document.getElementById(`porcentagem_cap_${i}`).style.width = `${porcentagem_concluida}%`
            console.log("captlulo: " +  `${porcentagem_concluida}%`)
          }
        }
      }

      if (!cap_praticados) {
        document.getElementById(`porcentagem_cap_${i}`).style.width = '0%'
      }
      

    }
  }

  if (acao === 'distancia') {

    distancia = valor
    distancia_global = valor

    orientacao = orientacao_idiomas_global

    // Buscamos qual é a orientação setada nos botões
    if (botao_1_2.classList.contains("bot_ativo")) orientacao = '1-2'
    if (botao_2_1.classList.contains("bot_ativo")) orientacao = '2-1'

    // Limpamos todos os botões de distância...
    if (botao_curta.classList.contains("bot_ativo")) botao_curta.classList.remove("bot_ativo")
    if (botao_media.classList.contains("bot_ativo")) botao_media.classList.remove("bot_ativo")
    if (botao_longa.classList.contains("bot_ativo")) botao_longa.classList.remove("bot_ativo")
    if (botao_curta.classList.contains("bot_inativo")) botao_curta.classList.remove("bot_inativo")
    if (botao_media.classList.contains("bot_inativo")) botao_media.classList.remove("bot_inativo")
    if (botao_longa.classList.contains("bot_inativo")) botao_longa.classList.remove("bot_inativo")

    // ...e depois setamos eles
    if (distancia === 'distancia_curta') {
      botao_curta.classList.add("bot_ativo")
      botao_media.classList.add("bot_inativo")
      botao_longa.classList.add("bot_inativo")

      limite_corretas = 15
    }

    if (distancia === 'distancia_media') {
      botao_curta.classList.add("bot_inativo")
      botao_media.classList.add("bot_ativo")
      botao_longa.classList.add("bot_inativo")

      limite_corretas = 50
    }

    if (distancia === 'distancia_longa') {
      botao_curta.classList.add("bot_inativo")
      botao_media.classList.add("bot_inativo")
      botao_longa.classList.add("bot_ativo")

      limite_corretas = 125
    }


    // Definimos a largura da barrinha de porcentagem dos capítulos.
    for (let i = 0; i < capitulos.length; i++) {

      document.getElementById(`porcentagem_cap_${i}`).style.width = '0px'

      // 
      if (cap_praticados) {
        for (let j = 0; j < cap_praticados.length; j++) {
          if (capitulos[i]._id == cap_praticados[j].id_capitulo) {     
                    let max
            if (orientacao === '1-2' & distancia === 'distancia_curta') max = cap_praticados[j].max_curta__1_2
            if (orientacao === '1-2' & distancia === 'distancia_media') max = cap_praticados[j].max_media__1_2
            if (orientacao === '1-2' & distancia === 'distancia_longa') max = cap_praticados[j].max_longa__1_2

            if (orientacao === '2-1' & distancia === 'distancia_curta') max = cap_praticados[j].max_curta__2_1
            if (orientacao === '2-1' & distancia === 'distancia_media') max = cap_praticados[j].max_media__2_1
            if (orientacao === '2-1' & distancia === 'distancia_longa') max = cap_praticados[j].max_longa__2_1

            let porcentagem_concluida = (100 / limite_corretas) * max
            porcentagem_concluida = porcentagem_concluida.toFixed(0)       

            document.getElementById(`porcentagem_cap_${i}`).style.width = `${porcentagem_concluida}%`
          }
        }
      }
      if (!cap_praticados) {
        document.getElementById(`porcentagem_cap_${i}`).style.width = '0%'
      }
      

    }

  }

  // MUDAR ESSE DISTÂNCIA NENHUMA PARA ALGUM DADO ESPECÍFICO DE AÇÃO, POR EXEMPLO

  const dados = {
    id_decoreba: id_decoreba,
    orientacao: orientacao,
    distancia: distancia,
  }

  loading('loading...')

  const json = await vai_filhao_2('orientacao_distancia', JSON.stringify(dados))
}

function mostra_pontuacao() {
  const recip = document.getElementById('mostra_recip_pontuacao')

  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
  }
}

function mostra_informacoes(i) {

  const recip = document.getElementById('mostra_recip_info')
  const caixinha_dentro = document.getElementById('mostra_info')
  if (i >= 0) {
    caixinha_dentro.innerHTML = `
    <div class="flex_row T1" style="justify-content: flex-end; margin-bottom: 15px; margin-top: -5px; padding: 5px; padding-top: 10px; padding-bottom: 10px; background: white; position: fixed; max-width: 1000px; box-shadow: 0px 0px 4px var(--sombra_clara); border-top-left-radius: 10px; border-top-right-radius: 10px;">
      <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_informacoes()"></i> 
    </div>
    <br>
    <div class="flex_col T1 caixa_info_texto" style="margin-top: 70px; padding: 15px;">
    ${jasao_temp[i]}
    </div>`
  }


  if (recip.classList.contains("sumido")) {
    recip.classList.remove("sumido")
  } else if (!recip.classList.contains("sumido")) {
    recip.classList.add("sumido")
  }
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


    <div style="font-size: 25pt; margin: 15px;">${verbo}</div>
    <div style="font-size: 20pt; margin: 5px;">${pronome}</div>

    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_1]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_1]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_2]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_2]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_3]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_3]].verbo}</button>

    
    <div style="font-size: 17pt; margin-top: 25px;">Respostas Corretas: <span id="span_resp_corretas">${respostas_corretas}</span> / ${meta_corretas}</div>
    <div style="font-size: 17pt; margin-bottom: 25px;">Respostas Erradas: <span id="span_resp_erradas">${respostas_erradas}</span> / ${meta_erradas}</div>
    
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
function clicou_resp_verbo(i_verbo, resp_dada, resp_certa, obj) {

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
                <div class="flex_row T1 center" style="font-size: 17pt;">
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

  <div id="modal_verbo" class="flex_col center T1" style="height: 100vh;  display: none; background-color: rgba(0, 0, 0, 0.5); position: fixed; top: 0;">

  </div>


    <div style="font-size: 25pt; margin: 15px;">${verbo}</div>
    <div style="font-size: 20pt; margin: 5px;">${pronome}</div>

    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_1]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_1]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_2]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_2]].verbo}</button>
    <button class="botao clicavel" onclick='clicou_resp_verbo(${i_aleatorio}, ${arr_verbos[k_resposta_3]}, ${j_aleatorio}, ${obj_stringify},)'>${obj.conjugacao[i_aleatorio].tempos[arr_verbos[k_resposta_3]].verbo}</button>

    
    <div style="font-size: 17pt; margin-top: 25px;">Respostas Corretas: <span id="span_resp_corretas">${respostas_corretas}</span> / ${meta_corretas}</div>
    <div style="font-size: 17pt; margin-bottom: 25px;">Respostas Erradas: <span id="span_resp_erradas">${respostas_erradas}</span> / ${meta_erradas}</div>
    
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