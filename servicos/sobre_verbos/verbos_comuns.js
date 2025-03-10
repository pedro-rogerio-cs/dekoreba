/*
const verbos_comuns = [
	{
		idioma: 'italiano',
		verbos: ['accogliere', 'affrettarsi', 'ammettere', 'partecipare', 'permettere', 'stabilire'],
		verbos_em_pt: ['bem-vindo', 'pressa', 'admitir', 'participar', 'permitir', 'estabelecer']
	},
	{
		idioma: 'ingles',
		verbos: ['accept', 'achieve', 'admit', 'affect'],
		verbos_em_pt: ['aceitar', 'alcançar', 'admitir', 'afetar']
	},
	{
		idioma: 'espanhol',
		verbos: ['abrir', 'aburrir', 'acabar', 'aceptar'],
		verbos_em_pt: ['abrir', 'aborrecer', 'terminar', 'aceitar']
	},
	{
		idioma: 'frances',
		verbos: ['être', 'avoir', 'aller', 'tenir'],
		verbos_em_pt: ['ser', 'ter', 'ir', 'ter']
	},
	{
		idioma: 'alemao',
		verbos: [],
		verbos_em_pt: []
	}
]
*/


const verbos_comuns = [
	{
		idioma: 'portugues',
		verbos: [
			'amar', 'aggiungere',
			'brigar', 'brilhar',
			'cantar', 'chamar',
			'decidir', 'deitar',
			'emagrecer', 'estar',
			'falar', 'fazer',
			'ganhar', 'girar', 
			'habitar', 'honrar',
			'iluminar', 'impor',
			'jantar', 'jejuar',
			'lançar', 'ler',
			'mijar', 'mudar',
			'nascer', 'notar',
			'obedecer', 'orar',
			'parar', 'progredir',
			'quebrar', 'questionar',
			'reagir', 'rezar',
			'saber', 'ser',
			'tentar', 'terminar',
			'uivar', 'unir',
			'viver', 'voar',
			'zapear', 'zelar'
		],
		verbos_em_pt: [
			'amar', 'adicionar',
			'brigar', 'brilhar',
			'cantar', 'chamar',
			'decidir', 'deitar',
			'emagrecer', 'estar',
			'falar', 'fazer',
			'ganhar', 'girar', 
			'habitar', 'honrar',
			'iluminar', 'impor',
			'jantar', 'jejuar',
			'lançar', 'ler',
			'mijar', 'mudar',
			'nascer', 'notar',
			'obedecer', 'orar',
			'parar', 'progredir',
			'quebrar', 'questionar',
			'reagir', 'rezar',
			'saber', 'ser',
			'tentar', 'terminar',
			'uivar', 'unir',
			'viver', 'voar',
			'zapear', 'zelar'
		]
	},
	{
		idioma: 'italiano',
		verbos: [
			'amare', 'aggiungere',
			'combattere', 'risplendere',
			'cantare', 'chiamare',
			'decidere', 'sdraiarsi',
			'dimagrire', 'essere',
			'parlare', 'fare',
			'vincere', 'ruotare',
			'abitare', 'onorare',
			'illuminare', 'imporre',
			'pranzare', 'digiunare',
			'lanciare', 'leggere',
			'pisciare', 'cambiare',
			'nascere', 'notare',
			'obbedire', 'pregare',
			'fermarsi', 'progredire',
			'rompere', 'questionare',
			'reagire',
			'sapere',
			'provare', 'terminare',
			'ululare', 'unire',
			'vivere', 'volare',
			'wappare', 'vegliare'
		],
		verbos_em_pt: [
			'acolher / receber', 'apressar', 'admitir', 'configurar', 'bater', 'mover', 'digerir', 'dirigir', 'implicar', 'invadir', 'prevalecer', 'ligar', 'desmaiar', 'tocar', 'traduzir', 'acalmar', 'agradar', 'gritar', 'usar', 'instruir', 'merecer', 'medir', 'mover', 'alcançar', 'repreender', 'ripetere', 'conseguir', 'suspender', 'enviar', 'tentar', 'enrolar', 'conceder', 'fingir', 'infligir', 'reclamar', 'manter', 'medicar', 'alimentar', 'obter', 'persuadir', 'prometer', 'sustentar', 'retornar', 'lamentar', 'casar', 'abandonar', 'bronzear', 'acostumar', 'pegar', 'presumir', 'comprar', 'fritar', 'gerenciar', 'ganhar', 'chover', 'reduzir', 'considerar', 'salvar', 'gritar', 'adicionar', 'aludir', 'dançar', 'comportar-se', 'cobrir', 'descrever', 'depender', 'garantir', 'enganar', 'entender / pretender', 'liquidar', 'alegar', 'saudar', 'subtrair', 'variar', 'entediar', 'corrigir', 'eleger', 'falhar', 'parar', 'assinar', 'incluir', 'obrigar', 'omitir', 'pesar', 'produzir', 'resignar-se', 'escrever', 'espalhar', 'votar', 'ligar', 'assistir', 'causar', 'celebrar', 'compor', 'conter', 'divertir-se', 'espremer', 'poluir', 'lutar', 'negociar', 'gastar', 'jogar', 'temer', 'ouvir', 'alçar / elevar', 'perguntar', 'depositar', 'defender', 'interpretar', 'encontrar', 'interromper', 'vincular', 'limitar', 'nadar', 'ocupar', 'respeitar', 'retornar', 'perturbar', 'valer', 'queimar', 'bloquear', 'andar', 'dirigir', 'distrair', 'incomodar', 'lançar', 'mostrar', 'navegar', 'negar', 'operar', 'prever', 'afogar', 'derrubar', 'sugerir', 'ditar', 'trabalhar', 'rodar', 'jurar', 'aproveitar', 'louvar', 'comer', 'modificar', 'falar', 'chorar', 'dar', 'resistir', 'espremer', 'remover', 'transferir', 'atribuir', 'lançar', 'chamar', 'convencer', 'cozinhar', 'destruir', 'festejar', 'indicar', 'organizar', 'parecer', 'penetrar', 'promover', 'qualificar', 'se acalmar', 'repetir (dizer denovo) / reclamar', 'supor', 'sair', 'abaixar', 'corresponder', 'confiar', 'fugir', 'imprimir', 'informar', 'insistir', 'intervir', 'notificar', 'odiar', 'participar', 'permitir', 'estabelecer', 'silenciar', 'acontecer', 'render', 'construir', 'examinar', 'enviar', 'ferir', 'preferir', 'recitar', 'descobrir', 'seguir', 'soluçar', 'sorrir', 'explicar', 'empurrar', 'torcer', 'angular', 'consumir', 'contradizer', 'definir', 'elevar / erguer', 'gerar', 'bajular', 'matar (do inglês "kill", linguagem informal)', 'hackear', 'fazer uma cópia xerográfica', 'enviar algo pelo WhatsApp (BEM informal)', 'adaptar um documento para o formato de uma wiki (contexto específico)']
	},
	{
		idioma: 'ingles',
		verbos: [
			'accept', 'achieve', 'admit', 'affect', 'afford', 'agree', 'allow', 'answer', 'apply', 'argue', 'arrange', 'arrive', 'ask', 'avoid', 'become', 'begin', 'believe', 'build', 'buy', 'call', 'care', 'carry', 'catch', 'cause', 'change', 'check', 'choose', 'clean', 'clear', 'collect', 'come', 'complain', 'complete', 'consist', 'contain', 'continue', 'contribute', 'control', 'correct', 'cost', 'could', 'create', 'cross', 'cut', 'damage', 'deal', 'deliver', 'deny', 'depend', 'describe', 'destroy', 'develop', 'disappear', 'discover', 'do', 'dress', 'drink', 'drive', 'eat', 'encourage', 'enjoy', 'exist', 'expect', 'experience', 'explain', 'express', 'face', 'fall', 'feel', 'find', 'finish', 'fly', 'follow', 'forget', 'forgive', 'form', 'get', 'give', 'go', 'grow', 'happen', 'have', 'hear', 'help', 'hide', 'hold', 'hope', 'identity', 'imagine', 'improve', 'increase', 'influence', 'inform', 'invite', 'involve', 'join', 'keep', 'know', 'last', 'laugh', 'learn', 'leave', 'lend', 'like', 'limit', 'listen', 'live', 'look', 'love', 'make', 'matter', 'mean', 'measure', 'meet', 'mention', 'mind', 'move', 'must', 'need', 'offer', 'open', 'order', 'own', 'pay', 'perform', 'play', 'point', 'prefer', 'prepare', 'press', 'prevent', 'produce', 'protect', 'provide', 'push', 'quote', 'reach', 'read', 'receive', 'record', 'reduce', 'regard', 'relate', 'release', 'remember', 'remove', 'repeat', 'replace', 'reply', 'report', 'result', 'return', 'reveal', 'rise', 'run', 'save', 'say', 'see', 'sell', 'send', 'set', 'share', 'shoot', 'show', 'sing', 'sit', 'sleep', 'smile', 'sound', 'speak', 'stand', 'start', 'state', 'study', 'succeed', 'suggest', 'supply', 'suppose', 'survive', 'take', 'talk', 'tell', 'tend', 'think', 'throw', 'touch', 'train', 'travel', 'treat', 'try', 'turn', 'understand', 'use', 'visit', 'wait', 'walk', 'want', 'watch', 'win', 'wonder', 'write', 'x-ray', 'yell', 'zoom'],
		verbos_em_pt: [
			'aceitar', 'alcançar', 'admitir', 'afetar', 'dispor', 'concordar', 'permitir', 'responder', 'aplicar', 'discutir', 'arranjo', 'chegar', 'perguntar', 'evitar', 'tornar-se', 'começar', 'acreditar', 'construir', 'comprar', 'chamar', 'cuidado', 'carregar', 'pegar', 'causa', 'mudar', 'verificar', 'escolher', 'limpar', 'claro', 'coletar', 'comer', 'reclamar', 'completo', 'consiste', 'conter', 'continuar', 'contribuir', 'ao controle', 'correto', 'custo', 'poderia', 'criar', 'cruzar', 'corte', 'dano', 'negócio', 'entregar', 'negar', 'depender', 'descrever', 'destruir', 'desenvolver', 'decepcionar', 'descobrir', 'fazer', 'vestir', 'bebida', 'dirigir', 'comer', 'encorajar', 'aproveitar', 'existir', 'esperar', 'experiência', 'explicar', 'expressar', 'face', 'cair', 'sentir', 'encontrar', 'terminar', 'voar', 'seguir', 'esquecer', 'perdoar', 'forma', 'pegar', 'dar', 'ir', 'crescer', 'acontecer', 'ter', 'ouvir', 'ajuda', 'esconder', 'segurar', 'ter esperança', 'identidade', 'imagine', 'melhorar', 'aumentar', 'influência', 'informar', 'convidar', 'envolver', 'juntar', 'manter', 'saber', 'durar', 'rir', 'aprender', 'deixar', 'emprestar', 'como', 'limite', 'ouvir', 'ao vivo', 'olhar', 'vê isso', 'fazer', 'matéria', 'significar', 'medir', 'encontrar', 'menção', 'mente', 'mover', 'deve', 'precisar', 'oferecer', 'abrir', 'ordem', 'ter', 'pagar', 'executar', 'jogar', 'apontar', 'preferir', 'preparar', 'imprensa', 'evitar', 'produz', 'proteger', 'fornece', 'empurrar', 'citar', 'alcançar', 'ler', 'receber', 'gravar', 'reduzir', 'dardard', 'relacionar', 'liberar', 'lembrar', 'remover', 'repetir', 'substituir', 'responder', 'relatório', 'resultado', 'retornar', 'revelar', 'ascender', 'correr', 'salvar', 'dizer', 'ver', 'vender', 'enviar', 'definir', 'compartir', 'atirar', 'mostrar', 'cantar', 'sentar', 'dormir', 'sorriso', 'som', 'falar', 'ficar', 'começar', 'estado', 'estudar', 'sucesso', 'sugerir', 'fornecer', 'suponha', 'sobreviver', 'pegar', 'falar', 'dizer', 'tratar', 'pensar', 'lançar', 'tocar', 'trem', 'viagem', 'tratar', 'tentar', 'vez', 'entender', 'usar', 'visita', 'espere', 'andar', 'querer', 'assistir', 'ganhar', 'maravilha', 'escrever', 'realizar um raio-x', 'gritar / berrar', 'dar zoom (aproximar a vista)']
	},
	{
		idioma: 'espanhol',
		verbos: ['abanderar/registrar', 'abrir', 'aburrir', 'acabar', 'aceptar', 'acordar', 'acostar', 'almorzar', 'amar', 'andar', 'apagar', 'aprender', 'asistir', 'ayudar', 'bailar', 'bajar', 'beber', 'buscar', 'caber', 'caer', 'cambiar', 'cantar', 'casar', 'cenar', 'cerrar', 'cocinar', 'coger', 'comenzar', 'comer', 'compartir', 'comprar', 'comprender', 'conducir', 'conocer', 'conseguir', 'construir', 'contar', 'corregir', 'correr', 'cortar', 'costar', 'crear', 'crecer', 'creer', 'cruzar', 'cubrir', 'dar', 'deber', 'decidir', 'decir', 'defender', 'dejar', 'desayunar', 'descubrir', 'desear', 'despedir', 'despertar', 'destruir', 'devolver', 'dirigir', 'divertir', 'doler', 'dormir', 'duchar', 'echar', 'elegir', 'empezar', 'encantar', 'encender', 'encontrar', 'entender', 'entrar', 'enviar', 'escoger', 'escribir', 'escuchar', 'esperar', 'estar', 'estudiar', 'exigir', 'explicar', 'ganar', 'gastar', 'gustar', 'haber', 'habilitar', 'habitar', 'habituar', 'hablar', 'ha	er', 'hackear', 'halagar', 'hartar', 'helar', 'henchir', 'herir', 'hervir', 'hinchar', 'hospedar', 'hostigar', 'huir', 'incluir', 'ir', 'jugar', 'lavar', 'leer', 'levantar', 'limpiar', 'llamar', 'llenar', 'llegar', 'llevar', 'llorar', 'llover', 'mandar', 'manejar', 'mantener', 'medir', 'mentir', 'mirar', 'morir', 'mostrar', 'mover', 'nacer', 'nadar', 'necesitar', 'obtener', 'ofrecer', 'oír', 'oler', 'olvidar', 'organizar', 'pagar', 'parar', 'parecer', 'pasar', 'pedir', 'pensar', 'perder', 'permitir', 'poder', 'poner', 'practicar', 'preferir', 'preguntar', 'preparar', 'prestar', 'probar', 'proteger', 'quedar', 'quejar', 'querer', 'quitar', 'recibir', 'recoger', 'recomendar', 'recordar', 'regresar', 'reír', 'repetir', 'resolver', 'rogar', 'romper', 'rezar', 'remar', 'saber', 'sacar', 'salir', 'secar', 'seguir', 'sentar', 'sentir', 'ser', 'servir', 'sofreír', 'soler', 'sonar', 'sonreír', 'subir', 'sugerir', 'sumergir', 'tener', 'terminar', 'tocar', 'tomar', 'trabajar', 'traducir', 'traer', 'tratar', 'usar', 'valer', 'velar', 'vender', 'venir', 'ver', 'vestir', 'viajar', 'visitar', 'vivir', 'volar', 'volver', 'filosofar', 'fotografiar', 'wasapear', 'xerocopiar', 'yermar', 'zafar', 'ñoñear'],
		
		verbos_em_pt: ['registrar', 'abrir', 'chatear / entedear', 'terminar', 'aceitar', 'concordar', 'deitar', 'almoçar', 'amar', 'andar', 'desligar', 'aprender', 'assistir', 'ajudar', 'dançar', 'baixar', 'beber', 'procurar', 'caber', 'cair', 'mudar', 'cantar', 'casar', 'jantar', 'fechar', 'cozinhar', 'pegar', 'começar', 'comer', 'compartilhar', 'comprar', 'compreender', 'dirigir', 'conhecer', 'conseguir', 'construir', 'contar', 'corrigir', 'correr', 'cortar', 'custar', 'criar', 'crescer', 'acreditar', 'cruzar', 'cobrir', 'dar', 'dever (obrigação)', 'decidir', 'dizer', 'defender', 'deixar', 'tomar café da manhã', 'descobrir', 'desejar', 'despedir', 'acordar', 'destruir', 'devolver', 'dirigir', 'divertir', 'magoar', 'dormir', 'tomar banho', 'lançar', 'escolher', 'começar', 'encantar', 'acender', 'encontrar', 'entender', 'entrar', 'enviar', 'escolher', 'escrever', 'escutar', 'esperar', 'estar', 'estudar', 'exigir', 'explicar', 'ganhar', 'gastar', 'gostar', 'haver', 'habilitar', 'habitar', 'habituar', 'falar', 'fazer', 'hackear', 'bajular', 'saciar', 'gelar', 'encher', 'ferir', 'ferver', 'inchar', 'hospedar', 'importunar', 'fugir', 'incluir', 'ir', 'jogar', 'lavar', 'ler', 'levantar', 'limpar', 'chamar', 'preencher', 'chegar', 'levar / carregar', 'chorar', 'chover', 'mandar', 'manusear', 'manter', 'medir', 'mentir', 'olhar', 'morrer', 'mostrar', 'mover', 'nascer', 'nadar', 'precisar', 'obter', 'oferecer', 'ouvir', 'cheirar', 'esquecer', 'organizar', 'pagar', 'parar', 'parecer', 'passar', 'perguntar', 'pensar', 'perder', 'permitir', 'poder', 'colocar', 'praticar', 'preferir', 'perguntar', 'preparar', 'emprestar', 'provar', 'proteger', 'ficar', 'reclamar', 'querer', 'remover', 'receber', 'recolher', 'recomendar', 'recordar', 'regressar', 'rir', 'repetir', 'resolver', 'implorar', 'quebrar', 'rezar', 'remar', 'saber', 'retirar', 'sair', 'secar', 'seguir', 'sentar', 'sentir', 'ser', 'servir', 'refogar', 'costumar', 'soar', 'sorrir', 'subir', 'sugerir', 'submergir', 'ter', 'terminar', 'tocar', 'pegar', 'trabalhar', 'traduzir', 'trazer', 'tratar', 'usar', 'valer', 'velar (guardar)', 'vender', 'vir', 'ver', 'vestir', 'viajar', 'visitar', 'viver', 'voar', 'voltar', 'filosofar', 'fotografar', 'zapear (conversar pelo WhatsApp)', 'xerocopiar', 'remover ervas daninhas de um terreno', 'soltar', 'ser chato']
	},
	{
			idioma: 'frances',
			verbos: ['être', 'avoir', 'aller', 'faire', 'dire', 'pouvoir', 'vouloir', 'savoir', 'voir', 'devoir', 'venir', 'suivre', 'parler', 'pendre' ,'croire' ,'aimer' ,'falloir' ,'passer' ,'penser' ,'attendre' ,'trouver' ,'laisser' ,'arriver' ,'donner' ,'regarder' ,'appeler' ,'partir' ,'mettre' ,'rester' ,'arrêter' ,'connaître' ,'demander' ,'comprendre' ,'sortir','entendre', 'chercher', 'aider', 'essayer', 'revenir', 'jouer', 'finir', 'perdre', 'sentir', 'rentrer', 'vivre', 'rendre', 'tenir', 'oublier', 'travailler', 'manger','entrer','devenir','commencer' ,'payer' ,'tirer' ,'ouvrir' ,'changer' ,'excuser' ,'dormir' ,'occuper' ,'marcher' ,'envoyer' ,'apprendre' ,'boire' ,'absorber' ,'garder' ,'montrer' ,'asseoir' ,'porter' ,'prier' ,'servir' ,'écrire' ,'retrouver' ,'gagner' ,'acheter' ,'rappeler', 'lire' ,'monter' ,'quitter' ,'emmener' ,'toucher' ,'continuer', 'raconter', 'répondre', 'sauver', 'recontrer', 'fermer', 'valoir', 'compter', 'bouger', 'apporter', 'décider', 'vendre', 'expliquer', 'agir', 'adorer', 'recevoir', 'utiliser', 'coucher', 'préférer', 'offrir', 'préparer', 'choisir', 'conduire', 'chanter', 'présenter', 'accepter', 'refuser', 'terminer', 'amuser', 'intéresser', 'rire' ,'pardonner' ,'embrasser' ,'danser' ,'détester' ,'maintenir' ,'supposer' ,'épouser' ,'approcher' ,'craindre' ,'crier', 'inviter', 'arranger', 'remercier', 'répéter', 'signer', 'accompagner', 'oser', 'permettre', 'annuler', 'laver', 'plaindre', 'épeler', 'traduire', 'étendre', 'allumer', 'réveiller', 'ajouter', 'goûter', 'coûter', 'cuire', 'décrire', 'effacer', 'enseigner', 'nettoyer', 'noter', 'reconnaître', 'remplacer', 'visiter', 'souhaiter', 'tomber', 'acclamer', 'accorder', 'accourir', 'accrocher', 'accueillir', 'acquérir', 'adjoindre', 'admirer', 'annoncer', 'arracher', 'augmenter', 'blaguer', 'causer', 'cheminer', 'confondre', 'conseiller', 'dépenser', 'emprunter', 'endormir', 'éviter', 'féliciter', 'geindre', 'informer', 'nommer', 'louer', 'ressentir', 'secouer', 'soutenir', 'jurer', 'méprendre', 'mélanger', 'apprendre', 'reconduire', 'rejeter', 'gérer', 'refléter', 'presser', 'répandre', 'frapper', 'remettre', 'revêtir', 'enregistrer', 'pêcher', 'rougir', 'tousser', 'pleurer', 'herbager', 'houper', 'kiffer', 'warranter', 'xylophoner', 'xylographier', 'youtser', 'yodiser', 'zieuter'],

			verbos_em_pt: ['ser', 'ter', 'ir', 'fazer', 'dizer', 'poder', 'querer', 'saber', 'ver', 'dever (obrigação)', 'vir', 'seguir', 'falar', 'pendurar', 'acreditar', 'gostar', 'precisar', 'passar', 'pensar', 'esperar por', 'encontrar', 'deixar', 'chegar', 'dar', 'olhar', 'chamar', 'deixar', 'colocar', 'ficar', 'parar', 'saber', 'pedir', 'compreender', 'sair', 'ouvir', 'procurar', 'ajuda', 'tentar', 'voltar', 'jogar', 'terminar', 'perder', 'sentir', 'retornar', 'viver', 'devolva', 'segurar', 'esquecer', 'trabalhar', 'comer', 'digitar', 'tornar-se', 'começar', 'pagar', 'puxar', 'abrir', 'mudar', 'excursor', 'dormir', 'ocupar', 'andar', 'enviar', 'aprender', 'beber (bebida alcoólica)', 'absorver', 'manter', 'mostrar', 'sentar', 'carregar', 'rezar', 'servir', 'escrever', 'encontrar', 'ganhar', 'comprar', 'lembrar', 'ler', 'ir para cima', 'deixar', 'remover', 'tocar', 'continuar', 'dizer', 'responder', 'salvar', 'reconhecer', 'fechar', 'valorizar', 'contar', 'mover', 'trazer', 'decidir', 'vender', 'explicar', 'agir', 'adorar', 'receber', 'usar', 'ir deitar-se (para dormir)', 'preferir', 'oferecer', 'preparar', 'escolher', 'dirigir', 'cantar', 'apresentar', 'aceitar', 'recusar', 'terminar', 'entreter', 'interessar', 'rir', 'perdoar', 'beijar', 'dançar', 'odiar', 'manter', 'presumir', 'casar', 'abordagem', 'temer', 'gritar', 'convidar', 'arranjo', 'agradecer', 'repita', 'sinal', 'acompanhar', 'desafiar', 'permitir', 'anular', 'lavar', 'reclamar', 'soletrar', 'traduzir', 'ampliar', 'acender', 'acordar', 'adicionar', 'provar', 'custar', 'cozinhar', 'descrever', 'apagar', 'ensinar', 'limpar', 'anotar', 'reconhecer', 'substituir', 'visitar', 'desejar', 'cair', 'aclamação', 'concordar', 'correr', 'pendurar', 'acolher', 'adquirir', 'adicionar', 'admirar', 'anunciar', 'arrancar', 'aumentar', 'zoar', 'causa', 'andar', 'confundir', 'aconselhar', 'gastar', 'emprestar', 'adormecer', 'evitar', 'felicitar', 'choramingar', 'informar', 'nomear', 'alugar', 'sentir', 'sacudir', 'sustentar', 'jurar', 'equivocar', 'misturar', 'aprender', 'renovar', 'liberar', 'gerenciar', 'refletir', 'espremer', 'espalhar', 'bater', 'recolocar', 'colocar', 'salvar', 'pescar', 'corar', 'tossir', 'chorar', 'transformar um terreno em pastagem', 'vaiar', 'gostar muito', 'oferecer uma garantia financeira (jargão técnico)', 'tocar xylophone', 'xilografar (gravar em madeira)', 'assistir vídeos no YouTube (gíria informal)', 'Mestre Yoda, falar como', 'dar uma olhada']
		},
		{
			idioma: 'alemao',
			verbos: ['sein', 'haben', 'werden', 'können', 'müssen', 'sagen', 'machen', 'geben', 'kommen', 'sollen', 'wollen', 'gehen', 'wissen', 'sehen', 'lassen', 'stehen', 'finden', 'bleiben', 'liegen', 'heißen', 'denken', 'nehmen', 'tun', 'dürfen', 'glauben', 'halten', 'nennen', 'mögen', 'zeigen', 'führen', 'sprechen', 'bringen', 'leben', 'fahren', 'meinen', 'fragen', 'kennen', 'gelten', 'stellen', 'spielen', 'arbeiten', 'brauchen', 'folgen', 'lernen', 'bestehen', 'verstehen', 'setzen', 'bekommen', 'beginnen', 'erzählen', 'versuchen', 'schreiben', 'laufen', 'erklären', 'entsprechen', 'sitzen', 'ziehen', 'scheinen', 'fallen', 'gehören', 'entstehen', 'erhalten', 'treffen', 'suchen', 'legen', 'vor·stellen', 'handeln', 'erreichen', 'tragen', 'schaffen', 'lesen', 'verlieren', 'dar stellen', 'erkennen', 'entwickeln', 'reden', 'aus·sehen', 'erscheinen', 'bilden', 'an fangen', 'erwarten', 'wohnen', 'betreffen', 'warten', 'vergehen', 'helfen', 'gewinnen', 'schließen', 'fühlen', 'bieten', 'interessierento', 'erinnern', 'ergeben', 'an bieten', 'studieren', 'verbinden', 'an sehen', 'fehlen', 'bedeuten', 'vergleichen'],
			verbos_em_pt: [
				'ser', 'ter', 'tornar-se', 'poder', 'dever', 'dizer', 'fazer', 'dar', 'vir', 'deve', 'querer', 'ir', 'conhecimento', 'ver', 'deixar', 'ficar', 'encontrar', 'permanecer', 'deitar', 'ser chamado', 'pensar', 'pegar', 'fazer', 'poderia', 'acreditar', 'segurar', 'nomear', 'gostar', 'mostrar', 'liderar', 'falar', 'trazer', 'vida', 'dirigir', 'significar', 'questões', 'saber', 'aplicar', 'lugar', 'jogar', 'trabalhar', 'precisar', 'consequências', 'aprender', 'consiste', 'entender', 'definir', 'receber', 'começar', 'dizer', 'tentar', 'escrever', 'correr', 'explicar', 'são equivalentes a', 'sentar', 'puxar', 'parecer', 'cair', 'pertencer', 'surgir', 'receber', 'encontrar', 'procurar', 'lugar', 'introduzir', 'agir', 'alcançar', 'carregar', 'criar', 'ler', 'perder', 'representar', 'reconhecer', 'desenvolver', 'falar', 'olhar', 'aparecer', 'forma', 'começar', 'esperar', 'residir', 'a respeito de', 'espere', 'passar', 'ajuda', 'ganhar', 'fechar', 'sentir', 'oferecer', 'interesse', 'lembrar', 'resultado', 'oferecer', 'estudar', 'conectar', 'visualizar', 'perder', 'significar', 'comparar'
			]
		}
	]


exports.verbos_comuns = verbos_comuns