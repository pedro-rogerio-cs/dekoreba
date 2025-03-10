const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const util = require('util')

const modeloCursos = require('./modelos').modeloCursos
const modelo_usuarios = require('./modelos').modelo_usuarios
const modelo_lista_mp3 = require('./modelos').modelo_lista_mp3

const modelo_lista_verbos = require('./modelos').modelo_lista_verbos

const modelo_afazer = require('./modelos').modelo_afazer
const modelo_sugestao = require('./modelos').modelo_sugestao

const modelo_verbo_pt = require('./modelos').modelo_verbo_pt
const modelo_verbo_es = require('./modelos').modelo_verbo_es
const modelo_verbo_it = require('./modelos').modelo_verbo_it
const modelo_verbo_fr = require('./modelos').modelo_verbo_fr
const modelo_verbo_en = require('./modelos').modelo_verbo_en

const modelo_verbos = require('./modelos').modelo_verbos

const modelo_hud = require('./modelos').modelo_hud

const modelo_lista_verbos_idiomas = require('./modelos').modelo_lista_verbos_idiomas

module.exports = {

	/* Buscas */

	busca_hud: async (idioma, pagina) => {
		try {
			return await modelo_hud.findOne({idioma: idioma})
		} catch (e) {
			return e
		}
	},

	busca_idioma_lista_verbos: async (idioma) => {
		try {
			return await modelo_lista_verbos_idiomas.findOne({idioma: idioma})
		} catch (e) {
			return e
		}
	},

	listar_verbo: async (idioma, letra) => {
		
		try {

			let idioma_completo_sem_acento
			if (idioma === 'pt') idioma_completo_sem_acento = 'portugues'
			if (idioma === 'es') idioma_completo_sem_acento = 'espanhol'
			if (idioma === 'it') idioma_completo_sem_acento = 'italiano'
			if (idioma === 'fr') idioma_completo_sem_acento = 'frances'
			if (idioma === 'en') idioma_completo_sem_acento = 'ingles'
			console.log(`Acesso`)
			console.log(`${idioma_completo_sem_acento} -- ${letra}`)

			const lista_verbos = await modelo_lista_verbos_idiomas.findOne({idioma: idioma_completo_sem_acento})
			
			for (let i = 0; i < lista_verbos.lista.length; i++) {
				if (lista_verbos.lista[i].letra === letra) return lista_verbos.lista[i]
			}
		
		} catch (e) {
			return e
		}

	},

	buscar_todos_verbos: async (idioma) => {
		try {

			let modelo
			console.log("pusÇ : " + idioma)
			if (idioma === 'portugues') modelo = modelo_verbo_pt
			if (idioma === 'espanhol') modelo = modelo_verbo_es
			if (idioma === 'italiano') modelo = modelo_verbo_it
			if (idioma === 'ingles') modelo = modelo_verbo_en
			if (idioma === 'frances') modelo = modelo_verbo_fr		

			return await modelo.find()
		} catch (e) {
			return e
		}
	},
	
	buscar_verbo: async (idioma, verbo_inf) => {
		try {
			
			let modelo
			if (idioma === 'pt') modelo = modelo_verbo_pt
			if (idioma === 'es') modelo = modelo_verbo_es
			if (idioma === 'it') modelo = modelo_verbo_it
			if (idioma === 'en') modelo = modelo_verbo_en
			if (idioma === 'fr') modelo = modelo_verbo_fr

			console.log(idioma)

			return await modelo.findOne({infinitivo: verbo_inf})
		} catch (e) {
			return e
		}
	},

	busca_todas_listas_mp3: async () => {
		try {
			return await modelo_lista_mp3.find()
		} catch (e) {
			console.log(util.inspect(e, false, null, true /* enable colors */))
	    	return e
		}
	},

	busca_lista_mp3: async (idioma_simples) => {
		try {

			console.log("vai buscar a lista " + idioma_simples)
			return await modelo_lista_mp3.findOne({ idioma: idioma_simples })
		} catch (e) {
			return e
		}
	},
  
 	busca_usuario: async (id_usuario) => {
  		try {
	  	return await modelo_usuarios.findById(id_usuario)
	  } catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
	  }
	},

	busca_dekoreba_por_idioma: async (idioma) => {
		try {

			return await modeloCursos.findOne({idioma_1: idioma})
		} catch (e) {
	    	console.log(util.inspect(e, false, null, true /* enable colors */))
			return e
		}
	},

	busca_todas_dekorebas: async () => {
		try {
			return await modeloCursos.find()
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
	  }
	},

	busca_todas_dekorebas_campos: async (campos) => {
		try {
			return await modeloCursos.find({}, campos)
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
	  }
	},

	busca_dekoreba: async (id_dekoreba) => {
		try {
			return await modeloCursos.findById(id_dekoreba)
	  } catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
	  }
	},

	busca_dekorebas: async (ids_dekorebas) => {
		try {
    	return await modeloCursos.find({ $or: ids_dekorebas }).sort({ data_criacao: -1 })
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	busca_seguidores: async (ids_seguidores) => {
		try {
    	return await await modelo_usuarios.find({ _id: { $in: ids_seguidores } }, { nome: 1, avatar: 1, avatar_50: 1 })
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	/* Atualiza */

	atualiza_lista_mp3: async (idioma_simples, obj_lista) => {
		try {
			console.log(`Atualizará a lista do ${idioma_simples}`)
			let lista_mp3 = await modelo_lista_mp3.findOne({ idioma: idioma_simples })
			lista_mp3.arquivos = obj_lista.arquivos
			return await lista_mp3.save()
		} catch (e) {
		    console.log(util.inspect(e, false, null, true /* enable colors */))
		    return e
		}
	},

	/* Salva */

	salva_verbos: async (idioma_sem_acento, array_verbos) => {
		try {

			console.log(array_verbos)

			let modelo
			if (idioma_sem_acento === 'portugues') modelo = modelo_verbo_pt
			if (idioma_sem_acento === 'espanhol') modelo = modelo_verbo_es
			if (idioma_sem_acento === 'italiano') modelo = modelo_verbo_it
			if (idioma_sem_acento === 'frances') modelo = modelo_verbo_fr
			if (idioma_sem_acento === 'ingles') modelo = modelo_verbo_en

			// const salvamento_verbos = new modelo_verbos(array_verbos)
			const salvamento_verbos = new modelo(array_verbos)
      		return await salvamento_verbos.save()
		} catch (e) {
		    console.log(util.inspect(e, false, null, true /* enable colors */))
		    return e
		}
	},
	salva_verbos_pt: async (array_verbos_pt) => {
		try {
			const salvamento_verbos = new modelo_verbo_pt(array_verbos_pt)

			// console.log(util.inspect(array_verbos_pt, false, null, true /* enable colors */))
		    // console.log(util.inspect(salvamento_verbos, false, null, true /* enable colors */))
      		return await salvamento_verbos.save()
		} catch (e) {
		    console.log(util.inspect(e, false, null, true /* enable colors */))
		    return e
		}
	},

	salva_lista_verbos_idiomas: async (obj_lista) => {
		try {

			const salvamento_lista = new modelo_lista_verbos_idiomas(obj_lista)
      		return await salvamento_lista.save()
		} catch (e) {
		    console.log(util.inspect(e, false, null, true /* enable colors */))
		    return e
		}
	},
	salva_lista_verbos: async (obj_lista) => {
		try {

			const salvamento_lista = new modelo_lista_verbos(obj_lista)

		    
      		return await salvamento_lista.save()
		} catch (e) {
		    console.log(util.inspect(e, false, null, true /* enable colors */))
		    return e
		}
	},

	salva_lista_mp3: async (obj_lista) => {
		try {
			console.log(`Salvará a lista vazia do ${obj_lista.idioma}`)
			const salvamento_lista = new modelo_lista_mp3(obj_lista)
			
      		return await salvamento_lista.save()
		} catch (e) {
		    console.log(util.inspect(e, false, null, true /* enable colors */))
		    return e
		}
	},

	salva_usuario: async (obj_usuario) => {
		try {
      return await obj_usuario.save()
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	salva_dekoreba: async (obj_dekoreba) => {
		try {
			const salvamento_decoreba = new modeloCursos(obj_dekoreba)
      		return await salvamento_decoreba.save()
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	salva_sugestao: async (sugestao) => {
		try {
			const salvamento_sugestao = new modelo_sugestao({ sugestao: sugestao })
      return await salvamento_sugestao.save()
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	salva_afazer: async (afazer) => {
		try {
			const salvamento_afazer = new modelo_afazer(afazer)
      return await salvamento_afazer.save()
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	/* Deleta */

	deleta_dekoreba: async (id_dekoreba) => {
		try {
      return await modeloCursos.findOneAndDelete( {_id: id_dekoreba})
		} catch (e) {
	    console.log(util.inspect(e, false, null, true /* enable colors */))
	    return e
		}
	},

	deleta_idioma_lista_verbos: async (idioma) => {
		try {
			return await modelo_lista_verbos_idiomas.findOneAndDelete({idioma: idioma})
		} catch (e) {
				return e
		}

	},

	deleta_todos_verbos: async (idioma) => {
		try {

			let modelo
			if (idioma === 'portugues') modelo = modelo_verbo_pt
			if (idioma === 'espanhol') modelo = modelo_verbo_es
			if (idioma === 'italiano') modelo = modelo_verbo_it
			if (idioma === 'ingles') modelo = modelo_verbo_en
			if (idioma === 'frances') modelo = modelo_verbo_fr		

			return await modelo.deleteMany()
		} catch (e) {
				return e
		}
	}


}