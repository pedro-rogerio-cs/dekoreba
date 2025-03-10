var mongoose = require('mongoose')

const Schema = mongoose.Schema

const arquivo_mp3 = new Schema({
  nome_arquivo: String,
  palavra: String,
  numero: Number
})

const hud_site = new Schema({
  index: Array,
  home: Array,
  perfil: Array,
  mostra: Array,
  jogo: Array
})

const lista_mp3 = new Schema({
  idioma: String,
  arquivos: [arquivo_mp3]
})

const lista_verbos = new Schema ({
  letra: String,
  verbos: Array
})

const listas_verbos_idiomas = new Schema({
  idioma: String,
  lista: [lista_verbos]
})

const verbo_conjugacoes_pt = new Schema({
  conjugado: String
})

const verbo_conj_pt = new Schema({
  tempo: String,
  conjugacoes: Array,
})

const verbo_trabalhos_pt = new Schema({
  modo: String,
  conj: [verbo_conj_pt]
})

const verbo_pt = new Schema({
  verbo: String,
  trabalhos: [verbo_trabalhos_pt]
})

const tempos = new Schema({
  tempo: String,
  conjugacoes: Array,
  audios: Array
})

const modos = new Schema({
  modo: String,
  tempos: [tempos]
})

const verbos = new Schema({
  infinitivo: String,
  traducao_pt: String,
  gerundio: String,
  participio: String,
  modos: [modos]
})


const verbos_antigos = new Schema({
  eml_1: String,
  elm_1_condicao: String,
  elm_2: String,
  elm_2_condicao: String,
  elm_3: String,
  elm_3_condicao: String,
  elm_4: String,
  elm_4_condicao: String,
  elm_5: String,
  elm_5_condicao: String
})

const vocabulario_idioma = new Schema({
  id_recente: String,
  item: String,
  sistema_escrita: String,
  arquivo: String,
  descricao: String,
  tipo: String // Esse tipo pode ser palavra, outro_termo_1, outro_termo_2...
})

const vocabularioSchema = new Schema({
  arabe: String,
  portugues: String,
  id_recente: String,

  item_idioma_1: String,
  item_idioma_2: String,

  idioma_1: [vocabulario_idioma],
  idioma_2: [vocabulario_idioma]
})

const capitulosSchema = new Schema({
  id_recente: String,
  titulo: String,
  informacoes: String,
  tipo: String,
  classe: String,
  vocabulario: [vocabularioSchema]
})

const marcacoes = new Schema({
  marcacao: String
})

const quem_curtiu = new Schema({
  id_perfil: String
})

const sist_escrita_idioma = new Schema({
  sistema: String
})

const sistema_escrita = new Schema({
  idioma_1: [sist_escrita_idioma],
  idioma_2: [sist_escrita_idioma]
})

const cursosSchema = new Schema({  
  titulo: String,
  endereco: String,
  criador_id: String,
  criador_nome: String,
  criador_avatar: String,
  informacoes: String,
  imagem_fundo: String,
  cor: String,
  cor_letras: String,
  idioma_1: String,
  idioma_1_simples: String,
  idioma_1_falado: String,
  idioma_2: String,
  idioma_2_simples: String,
  idioma_2_falado: String,
  idioma_1_outro: String, // Esse só é utilizado se no idioma_1 for "Outro"
  idioma_2_outro: String, // Esse só é utilizado se no idioma_2 for "Outro"
  idioma_1_sigla_som: String,
  idioma_2_sigla_som: String,
  sistemas_escrita: [sistema_escrita],
  idioma_1_sistemas_escrita: [sist_escrita_idioma],
  idioma_2_sistemas_escrita: [sist_escrita_idioma],
  estrelas: Number,
  data_criacao: { type: Date, required: true, default: Date.now },
  capitulos: [capitulosSchema],
  qtd_palavras: Number, // Esse campo aqui terá que ser atualizado toda vez que novas palavras forem add.
  marcacoes: [marcacoes],
  quem_curtiu: [quem_curtiu]
})

// Primeiro conta-se as acertos. Depois o número de erros
// 50 acertos e 3 erros é melhor que 25 acertos e nenhum erro.
// Depois que se tem os 50 acertos e 3 erros por exemplo, ai sim o melhor sera 50 acertos e 2 erros.
// Para cada comprimento, um novo dado é marcado, podendo ter 3 dados em cada decoreba praticada
// Um para cada compriento, curto, medio e longo.

const dificultosas = new Schema({
  id_palavra: String,
  qtd_erros: Number
})

const facilimas = new Schema({
  id_palavra: String,
  qtd_acertos: Number
})

const dominio_palavras = new Schema({
  id_palavra: String,
  tipo_incidencia: String, // pode ser errou ou acertou.
  qtd_incidencias: Number // aqui varia de -4 a 4.
})

const cap_praticados_dados = new Schema({
  id_capitulo: String,
  max_acertos: Number,
  orientacao: String,
  dificultosas: [dificultosas],
  facilimas: [facilimas],
  dominio_palavras: [dominio_palavras]
})

const capitulos_praticados = new Schema({
  
  capitulo: Number, // Começa no 0
  id_capitulo: String,

  max_curta__1_2: Number,
  max_media__1_2: Number,
  max_longa__1_2: Number,

  max_curta__2_1: Number,
  max_media__2_1: Number,
  max_longa__2_1: Number
})

const escolha_alfabetos = new Schema({
  alfabeto: String
})

const escolhas = new Schema({
  
  joga_ou_treina: String,
  modalidade: String,
  orientacao: String,

  alfabetos_perg: Array,
  alfabetos_resp: Array,

  mult_escolha_alfabetos_perg: [escolha_alfabetos],
  mult_escolha_alfabetos_resp: [escolha_alfabetos],
  
  escrita_alfabetos_perg: [escolha_alfabetos],
  escrita_alfabeto_resp: [escolha_alfabetos],

  falada_alfabetos_perg: [escolha_alfabetos]
})

const acertos_e_erros = new Schema({
  orientacao: String,
  n_acertos_erros: Number // Número de acertos e erros.
})

// Para cada uma das orientações possíveis, é necessário ter um n_acertos_erros.
const palavras_liberadas = new Schema({
  id_palavra: String,
  decorada: String, // Teve os 16 acertos.

  // Esse masterizou é se já atingiu a qtd máxima de acertos, no caso, 8.
  // Pois, se já atingiu, perdeu acertos e, atingiu denovo, não pode liberar outra palavra.
  // no múltipla escolha terá um masterizou, no escrita terá outro.
  masterizou: String, // Teve os 8 acertos dessa modalidade.

  acertos_e_erros: [acertos_e_erros],
})

const caps_praticados = new Schema({
  id_capitulo: String,

  qtd_palavras: Number,
  qtd_masterizadas_mult: Number,
  qtd_masterizadas_escr: Number,

  tipo: String, // Por enquanto, pode ser pra_valer (palavras) ou sistema_escrita (alfabeto).
  palavras_liberadas_mult: [palavras_liberadas], // Pra cada orientação, será um objeto novo.
  palavras_liberadas_escr: [palavras_liberadas]  // Aqui também será.
})

const decorebas_praticadas = new Schema({
  id_decoreba: String,
  praticou: String,
  caps_praticados: [caps_praticados],
  orientacao_recente: String,
  distancia_recente: String,
  escolhas: [escolhas],
  capitulos_praticados: [capitulos_praticados],
  cap_praticados_mult: [cap_praticados_dados],
  cap_praticados_escr: [cap_praticados_dados]
})

const afazeres = new Schema({
  data_criacao: { type: Date, required: true, default: Date.now },
  data_conclusao: Date,
  estado: String,
  prioridade: Number,
  categoria: String,
  descricao: String
})

const sugestoes = new Schema({
  sugestao: String
})

// 100m
// 5km
// Maratona

// Nas decorebas proprias, só vai ter os IDs delas mesmo.
const decorebas_proprias = new Schema({
  id_decoreba: String
})

const decorebas_curtidas = new Schema({
  id_decoreba: String
})

const usuario_configuracoes = new Schema({
  modo_tela: String,
  comprimento_jogo: String,
  distancia: String,

  facebook: String,
  instagram: String,
  youtube: String,
  twitter: String,
  linkedin: String
})

const perfis_seguidores = new Schema({
  id_perfil: String,
})

const perfis_seguidos = new Schema({
  id_perfil: String
})


const usuariosSchema = new Schema({
  login: { type: String, unique: true },
  nome: String,
  data_cadastro: { type: Date, required: true, default: Date.now },
  senha: { type: String, select: false },
  avatar: String,
  avatar_arquivo: String,
  avatar_50: String,
  avatar_400: String,
  seguidores: Number,
  perfis_seguidores: [perfis_seguidores],
  perfis_seguidos: [perfis_seguidos],
  colegas: Array,
  decorebas_praticadas: [decorebas_praticadas],
  decorebas_proprias: [decorebas_proprias],
  decorebas_curtidas: [decorebas_curtidas],
  configuracoes: [usuario_configuracoes],
  verificada: { type: Boolean, default: false },
  primeiro_acesso: { type: Boolean, default: true }
})
const tokensSchema = new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'usuarios' },
  tipo_token: String,
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})

module.exports = {
  modeloCursos: mongoose.model('cursos', cursosSchema),
  modelo_usuarios: mongoose.model('usuarios', usuariosSchema),
  modelo_tokens: mongoose.model('tokens', tokensSchema),
  modelo_lista_mp3: mongoose.model('listas_mp3', lista_mp3),
  modelo_lista_verbos: mongoose.model('listas_verbos', lista_verbos),
  modelo_lista_verbos_idiomas: mongoose.model('listas_verbos_idiomas', listas_verbos_idiomas),

  modelo_sugestao: mongoose.model('sugestoes', sugestoes),
  modelo_afazer: mongoose.model('afazeres', afazeres),

  modelo_verbo_pt: mongoose.model('verbos_pt', verbos),
  modelo_verbo_es: mongoose.model('verbos_es', verbos),
  modelo_verbo_it: mongoose.model('verbos_it', verbos),
  modelo_verbo_fr: mongoose.model('verbos_fr', verbos),
  modelo_verbo_en: mongoose.model('verbos_en', verbos),
  
  modelo_verbos: mongoose.model('verbos', verbos),
  modelo_hud: mongoose.model('hud_site', hud_site)
}