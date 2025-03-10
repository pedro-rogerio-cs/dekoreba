require('dotenv').config()
const util = require('util')

const bcrypt = require('bcrypt')
const pombo = require('./pombo')
var mongoose = require('mongoose')

const Schema = mongoose.Schema

const modelo_cursos = require('../modelos/modelos').modeloCursos
const modelo_usuarios = require('../modelos/modelos').modelo_usuarios
const modelo_tokens = require('../modelos/modelos').modelo_tokens

module.exports = {

  login: async function (req, res) {

    const { login, senha } = req.body
    
    // Primeiramente, procuramos se tem este usuário cadastrado em nosso banco de dados.
    const busca_usuario = await modelo_usuarios.findOne({login: login}).select('+senha')

    if (!busca_usuario) {
      // console.log("Não encontrou ninguém.")
      return res.send({msg:'login__nao_achou_ninguem'})
    }

    if (busca_usuario) {

      // console.log("encontrou e segue o jogo")

      const testa_senha = await this.testa_senha(busca_usuario, senha)
      if (testa_senha === 'senha_errada') return res.send({msg:'login__senha_errada'})
        
      if (testa_senha === 'senha_correta') {

        req.session.userId = busca_usuario._id
        req.session.usuario_nome = busca_usuario.nome
        req.session.usuario_email = busca_usuario.login
        req.session.usuario_verificada = busca_usuario.verificada
        req.session.usuario_avatar = busca_usuario.avatar
        req.session.avatar_50 = busca_usuario.avatar_50

        return res.send({ msg: 'login__senha_correta', nome: busca_usuario.nome, status_confirma: busca_usuario.verificada, email: busca_usuario.login })
      }
    }
  },

  testa_senha: async function (busca_usuario, senha_digitada) {
    // Senha bateu
    if (bcrypt.compareSync(senha_digitada, busca_usuario.senha)) {

      return 'senha_correta'
    } else {

      return 'senha_errada'
    }
  },

  cadastro: async function (req, res) {

    const { nome, login, senha } = req.body
    const hash = bcrypt.hashSync(senha, 10) // Hashamos a senha.
      
    try {
      const busca_usuario = await modelo_usuarios.findOne({login: login})
      if (busca_usuario) {
        console.log("Usuario ja cadastrado, voltará sem salvar nada.")
        return res.send({msg:'cadastro__usuario_ja_existe'})
      }
    } catch(e) {
      return res.send({msg:'cadastro__erro_catastrofico', e: e})
    }

    // Montamos o objeto e salvamos ele.

    // Aqui temos que baixar todas as dekorebas, ao menos o primeiro capítulo de substantivos/adjetivos delas.
    const todas_dekorebas = await modelo_cursos.find()

    /*
    let caps_praticados = {
      id_capitulo: '',
      palavras_liberadas_mult: [],
      palavras_liberadas_escr: []
    }
    */
    
    let decorebas_praticadas = []
    let todos_ids = []

    let ids_palavras_iniciais = []

    let qtd_palavras_iniciais

    for (let i = 0; i < todas_dekorebas.length; i++) {

      console.log("Rolará pela decoreba: " + i)

      decorebas_praticadas.push({
        id_decoreba: todas_dekorebas[i]._id,
        praticou: 'nao',
        escolhas: [{
          joga_ou_treina: '',
          modalidade: '',
          orientacao: ''
        }],
        caps_praticados: []
      })


      for (let j = 0; j < todas_dekorebas[i].capitulos.length; j++) {
        let caps_praticados_1 = decorebas_praticadas[decorebas_praticadas.length - 1].caps_praticados

        todos_ids = []

        if (todas_dekorebas[i].capitulos[j].tipo != 'verbos') {
          
          caps_praticados_1.push({
            id_capitulo: todas_dekorebas[i].capitulos[j]._id,
            tipo: todas_dekorebas[i].capitulos[j].tipo,

            qtd_palavras: todas_dekorebas[i].capitulos[j].vocabulario.length,
            qtd_masterizadas_mult: 0,
            qtd_masterizadas_escr: 0,

            palavras_liberadas_mult: [],
            palavras_liberadas_escr: []
          })

          const i_cap_prat = caps_praticados_1.length - 1
          console.log(caps_praticados_1[caps_praticados_1.length - 1].id_capitulo)

          for (let k = 0; k < todas_dekorebas[i].capitulos[j].vocabulario.length; k++) {
            todos_ids.push(todas_dekorebas[i].capitulos[j].vocabulario[k]._id)
          }
        
          // const qtd_palavras_iniciais = (todos_ids.length < 5) ? todos_ids.length : 5 // Libera só 5.
          const qtd_palavras_iniciais = todos_ids.length // Libera todas.
          
          for (let j = 0; j < qtd_palavras_iniciais; j++) {
            
            let id_ja_na_lista = 'nao'
            let x = 0
            do {        
              x++
              console.log(x)
              const index = Math.floor(Math.random() * todos_ids.length)
              id_ja_na_lista = 'nao'

              if (caps_praticados_1[i_cap_prat] && Array.isArray(caps_praticados_1[i_cap_prat].palavras_liberadas_mult)) {
                if (caps_praticados_1[i_cap_prat].palavras_liberadas_mult.length > 0) {
                  for (let k = 0; k < caps_praticados_1[i_cap_prat].palavras_liberadas_mult.length; k++) {

                    if (todos_ids[index] == caps_praticados_1[i_cap_prat].palavras_liberadas_mult[k].id_palavra) {
                      id_ja_na_lista = 'sim'
                    }
                  }
                }
              }
              
              if (id_ja_na_lista === 'nao') {
                // Aqui tem que ver a qtd de orientações que cada idioma terá.
                const qtd_sistemas_idioma_1 = todas_dekorebas[i].idioma_1_sistemas_escrita.length
                const qtd_sistemas_idioma_2 = todas_dekorebas[i].idioma_2_sistemas_escrita.length

                // A princípio serão um possível total de 4 orientações.
                // Aí, mais pra frente terá o japonês, por exemplo, que tem 4 (eita) alfabetos.
                let orientacoes = ['1-2', '2-1']
                if (qtd_sistemas_idioma_1 > 1) orientacoes.push ('1-1')
                if (qtd_sistemas_idioma_2 > 1) orientacoes.push('2-2') // Idioma 2 sempre será o português, ao menos por enquanto, logo, nunca existirá a orientação 2-2, ao menos por enquanto.

                caps_praticados_1[i_cap_prat].palavras_liberadas_mult.push({ id_palavra: todos_ids[index], decorada: "nao", masterizou: 'nao', acertos_e_erros: [] })
                caps_praticados_1[i_cap_prat].palavras_liberadas_escr.push({ id_palavra: todos_ids[index], decorada: "nao", masterizou: 'nao', acertos_e_erros: [] })


                for (let k = 0; k < orientacoes.length; k++) {

                  const obj_2 = { orientacao: orientacoes[k], n_acertos_erros: 0 }

                  caps_praticados_1[i_cap_prat].palavras_liberadas_mult[caps_praticados_1[i_cap_prat].palavras_liberadas_mult.length - 1].acertos_e_erros.push(obj_2)

                  caps_praticados_1[i_cap_prat].palavras_liberadas_escr[caps_praticados_1[i_cap_prat].palavras_liberadas_escr.length - 1].acertos_e_erros.push(obj_2)
                  }
                }

              } while (id_ja_na_lista === 'sim')
          }
        }
      }
    }
    
    // Aqui, o avatar_50 e o avatar_400 têm o mesmo negófio.
    const obj_salva_usuario = {
      nome: nome,
      login: login,
      senha: hash,
      
      avatar: `https://${process.env.SERVIDOR_IMG_AVATAR}/imagens/avatar-default.jpg`,
      avatar_arquivo: 'avatar-default.jpg',
      avatar_50: `https://${process.env.SERVIDOR_IMG_AVATAR}/imagens/avatar-default.jpg`,
      avatar_400: `https://${process.env.SERVIDOR_IMG_AVATAR}/imagens/avatar-default.jpg`,
      seguidores: 0,
      configuracoes: [
        {
          modo_tela: 'diurno',
          facebook: 'nao_tem',
          instagram: 'nao_tem',
          youtube: 'nao_tem',
          twitter: 'nao_tem',
          linkedin: 'nao_tem'
        }
      ],
      decorebas_praticadas: decorebas_praticadas
    }
    const salva_usuario = new modelo_usuarios(obj_salva_usuario)
    
    try {
      // Salva o novo usuário e já loga ele, lembrando que ainda faltará a verificação por e-mail.
      await salva_usuario.save( (err, item_usuario) => {

        req.session.userId = item_usuario._id
        req.session.usuario_nome = item_usuario.nome
        req.session.usuario_email = item_usuario.login
        req.session.usuario_verificada = item_usuario.verificada
      })
    } catch(e) {
      return res.send({msg:'cadastro__erro_catastrofico', e: e})
    }

    const token_email = this.makeid(16) // Criamos um token para confirmação.

    // Montamos um obj com o token recém criado e o id do usuário recém salvado.
    const obj_salva_token = {
      _userId: salva_usuario.id,
      token: token_email,
      tipo_token: 'confirma_cadastro'
    }
    const salvamento_token = new modelo_tokens(obj_salva_token)

    try {
      await salvamento_token.save()
    } catch (e) {
      return res.send({msg:'cadastro__erro_catastrofico', e: e})
    }

    // Montamos um obj para o pombo criar um e-mail com estas informações e enviar o token para o usuário.
    const obj_confirma = {
      nome: nome,
      email: login,
      token: token_email
    }

    // Por enquanto, o disparo de e-mail de confirmação de cadastro está suspenso.
    // Mas a linha abaixo funciona perfeitamente.
    
    // pombo.dispara_email('confirma_cadastro', obj_confirma)

   
    return res.send({msg:'cadastro__concluido'})
  },

  confirma_cadastro: async function (req, res) {

    const token_que_chegou = req.query.token

    const busca_token = await modelo_tokens.findOne({token: token_que_chegou})

    if (busca_token) {
      modelo_tokens.deleteOne({ token: token_que_chegou }, (err) => {
        if (err) return handleError(err);
        // deleted at most one document
      })
    } else {
      return res.send({ msg: 'token_nao_encontrado' })
    }
    
    /*
    const salvamento = new modelo_tokens(busca_usuario)
    await salvamento.save()
    */
    
    const busca_usuario = await modelo_usuarios.findOne({_id: busca_token._userId})

    busca_usuario.verificada = true

    if (salva_usuario.status == 'erro') res.render('sistema/cadastro_confirma', { msg: 'confirmacao_negada' })
    if (salva_usuario.status == 'sucesso') {
      const obj_coisas = {
        nome: busca_usuario.nome,
        email: busca_usuario.login
      }
      pombo.dispara_email('cadastro_confirmado_bem_vindo', obj_coisas)
      return res.render('sistema/cadastro_confirma', { msg: 'confirmacao_confirmada' })
    }
  },

  troca_email: async function (req, res) {
    const { email } = req.body

    console.log("eaill: " + email)
    const busca_usuario = await modelo_usuarios.findOne({login: email})
    const usuario = await modelo_usuarios.findOne({_id: req.session.userId})

    if (busca_usuario == null) {

      usuario.login = email
      const usuario_atualizado = await usuario.save()

      return res.send({ msg: 'troca_email__sucesso', email_novo: usuario_atualizado.login })
    } else {
      return res.send({ msg: 'troca_email__ja_cadastrado' })
    }

  },

  solicita_troca_senha: async function (req, res) {
    const { email } = req.body

    // Busca pelo usuário em questã.
    const busca_usuario = await modelo_usuarios.findOne({login: email})
    if (busca_usuario == null) return res.send({ msg: 'solicita_troca_senha__usuario_nao_encontrado' })

    // Criamos um token para a troca de senha.
    const token_senha = this.makeid(16)
    const obj_salva_token = {
      _userId: busca_usuario.id,
      token: token_senha,
      tipo_token: 'esqueceu_senha'
    }

    // Salvamos o token novíssimo.
    const salvamento = new modelo_tokens(obj_salva_token)
    await salvamento.save()

    // Mandamos um e-mail para o usuário, com o token criado para o usuário trocar a senha.
    const coisas = {
      nome: busca_usuario.nome,
      email: email,
      token_senha: token_senha
    }

    pombo.dispara_email('altera_senha', coisas)

    return res.send({ msg: 'solicita_troca_senha__sucesso' })
  },

  esqueceu_senha_v: async function (req, res) {
    const { email } = req.body

    // Busca pelo usuário em questã.
    const busca_usuario = await modelo_usuarios.findOne({login: email})
    if (busca_usuario == null) return res.send({ msg: 'troca_senha_nao_achou_ninguem' })

    // Criamos um token para a troca de senha.
    const token_senha = this.makeid(16)
    const obj_salva_token = {
      _userId: busca_usuario.id,
      token: token_senha,
      tipo_token: 'esqueceu_senha'
    }
    // Salvamos o token novíssimo.
    const salvamento = new modelo_tokens(obj_salva_token)
    await salvamento.save()

    // Mandamos um e-mail para o usuário, com o token criado para o usuário trocar a senha.
    const coisas = {
      nome: busca_usuario.nome,
      email: email,
      token_senha: token_senha
    }

    pombo.dispara_email('altera_senha', coisas)

    return res.send({ msg: 'troca_senha_token_enviado' })
  },

  altera_senha_get: async function (req, res) {

    let token_que_chegou = req.query.token
    const busca_token = await modelo_tokens.findOne({token: token_que_chegou})
    if (busca_token == null) return { msg: 'nao_achou_token' }

    const busca_usuario = await modelo_usuarios.findOne({_id: busca_token._userId})
    if (busca_usuario == null) return { msg: 'achou_token_mas_nao_achou_usuario' }

    console.log("tah chegando até agah")

    const dados = { tela: 'altera_senha', token_que_chegou: token_que_chegou }
    res.render('index', { 'dados': JSON.stringify(dados) })

    // return {msg: 'vai_alterar', id_usuario: busca_usuario._id, id_token: busca_token._id}
  },

  altera_senha_post_v: async function (nova_senha, id_usuario, id_token) {

    // Busca pelo usuário em questã.
    const busca_usuario = await modelo_usuarios.findOne({_id: id_usuario}).select('+senha')
    if (busca_usuario == null) return { msg: 'nao_achou_ninguem' }

    const hash = bcrypt.hashSync(nova_senha, 10)
    busca_usuario.senha = hash

    const salvamento = new modelo_usuarios(busca_usuario)
    await salvamento.save()

    modelo_tokens.deleteOne({ _id: id_token }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    })

    return {msg: 'nova_senha_criada'}
  },

  altera_senha_post: async function (req, res) {

    const { senha_nova, token_escondido } = req.body


    const busca_token = await modelo_tokens.findOne({ token: token_escondido })
    console.log(util.inspect(busca_token, false, null, true /* enable colors */))
    
    const busca_usuario = await modelo_usuarios.findOne({_id: busca_token._userId}).select('+senha')
    
    if (busca_usuario === null) {
      return res.send({ msg: 'altera_senha_post__nao_achou_ninguem' })
    }
    const hash = bcrypt.hashSync(senha_nova, 10)

    busca_usuario.senha = hash
    const salvamento = new modelo_usuarios(busca_usuario)
    await salvamento.save()

    modelo_tokens.deleteOne({ token: token_escondido }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    })


    return res.send({ msg: 'altera_senha_post__sucesso' })
  },

  reenvia_token: async function (req, res) {
    const { email } = req.body
    const busca_usuario = await modelo_usuarios.findOne({login: email})

    if (busca_usuario == null) return res.render('sistema/esqueceu_senha', { msg: 'reenvia_token__nao_achou_ninguem' })

    modelo_tokens.deleteOne({ _userId: busca_usuario._id, tipo_token: 'confirma_email' }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    })

    const token_email = this.makeid(16)
    const obj_salva_token = {
      _userId: busca_usuario.id,
      token: token_email,
      tipo_token: 'confirma_email'
    }

    const salvamento = new modelo_tokens(obj_salva_token)
    await salvamento.save()

    const obj_confirma = {
      nome: busca_usuario.nome,
      email: email,
      token: token_email
    }

    pombo.dispara_email('confirma_cadastro', obj_confirma)
    return res.render('sistema/reenviou_token_confirmacao', { nome: req.session.usuario_nome, msg: 'token_enviado' })
  },
  makeid: (length) => {

    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
  }
}