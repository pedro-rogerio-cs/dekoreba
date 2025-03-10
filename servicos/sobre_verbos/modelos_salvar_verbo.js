const modelos_salvar_verbo = [
	{
		idioma: "frances",
		modelo: {
			infinitivo: "",
			participio: "",
			gerundio: "",
			modos: [
				{
					modo: "indicatif",
					tempos: [
						{ tempo: "présent", conjugacoes: [] },
						{ tempo: "passé composé", conjugacoes: [] },
						{ tempo: "imparfait", conjugacoes: [] },
						{ tempo: "plus-que-parfait", conjugacoes: [] },
						{ tempo: "passé simple", conjugacoes: [] },
						{ tempo: "passé antérieur", conjugacoes: [] },
						{ tempo: "futur simple", conjugacoes: [] },
						{ tempo: "futur antérieur", conjugacoes: [] }
					]	
				},
				{
					modo: "subjonctif",
					tempos: [
						{ tempo: "présent", conjugacoes: [] },
						{ tempo: "passé", conjugacoes: [] },
						{ tempo: "imparfait", conjugacoes: [] },
						{ tempo: "plus-que-parfait", conjugacoes: [] }
					]
				},
				{
					modo: "conditionnel",
					tempos: [
						{ tempo: "présent", conjugacoes: [] },
						{ tempo: "passé 1ère forme", conjugacoes: [] },
					]
				},
				{
					modo: "impératif",
					tempos: [
						{ tempo: "présent", conjugacoes: [] }
					]
				}
			] 
		}
	},
	{
		idioma: "ingles",
		modelo: {
			infinitivo: "",
			participio: "",
			gerundio: "",
			modos: [
				{
					modo: "indicative",
					tempos: [
						{ tempo: "simple present", conjugacoes: [] },
						{ tempo: "present continuous", conjugacoes: ["gerundio"] },
						{ tempo: "simple past", conjugacoes: [] },// imperfect
						{ tempo: "past continous", conjugacoes: ["gerundio"] },
						{ tempo: "present perfect", conjugacoes: ["participio"] },
						{ tempo: "present perfect continuous", conjugacoes: ["gerundio"] },
						{ tempo: "past perfect", conjugacoes: ["participio"] },
						{ tempo: "past perfect continuous", conjugacoes: ["gerundio"] },
						{ tempo: "future", conjugacoes: ["infinitivo"] },
						{ tempo: "future continuous", conjugacoes: ["gerundio"] },
						{ tempo: "future perfect", conjugacoes: ["participio"] },
						{ tempo: "future perfect continuous", conjugacoes: ["gerundio"] }
					]
				},
				{
					modo: "conditional",
					tempos: [
						{ tempo: "simple", conjugacoes: ["infinitivo"] },
						{ tempo: "progressive", conjugacoes: ["gerundio"] },
						{ tempo: "perfect", conjugacoes: ["participio"] },
						{ tempo: "perfect progressive", conjugacoes: ["gerundio"] }
					]
				}
			]
		}
	},
	{
		idioma: "espanhol",
		modelo: {
			infinitivo: "",
			gerundio: "",
			participio: "",
			modos: [
				{
					modo: "indicativo",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "pretérito perfecto compuesto", conjugacoes: ["participio"] },
						{ tempo: "pretérito imperfecto", conjugacoes: [] },
						{ tempo: "pretérito pluscuamperfecto", conjugacoes: ["participio"] },
						{ tempo: "pretérito perfecto simple", conjugacoes: [] },
						{ tempo: "pretérito anterior", conjugacoes: ["participio"] },
						{ tempo: "futuro", conjugacoes: [] },
						{ tempo: "futuro perfecto", conjugacoes: ["participio"] }
					]
				},
				{
					modo: "condicional",
					tempos: [
						{ tempo: "simple", conjugacoes: [] },
						{ tempo: "compuesto", conjugacoes: ["participio"] }
					]
				},
				{
					modo: "subjuntivo",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "pretérito perfecto", conjugacoes: ["participio"] },
						{ tempo: "pretérito imperfecto 1", conjugacoes: [] },
						{ tempo: "pretérito imperfecto 2", conjugacoes: [] },
						{ tempo: "pretérito pluscuamperfecto 1", conjugacoes: ["participio"] },
						{ tempo: "pretérito pluscuamperfecto 2", conjugacoes: ["participio"] },
						{ tempo: "futuro", conjugacoes: [] },
						{ tempo: "futuro perfecto", conjugacoes: ["participio"] }
					]
				},
				{
					modo: "imperativo",
					tempos: [
						{ tempo: "imperativo", conjugacoes: [] }
					]
				}
			]
		}
	},
	{
		idioma: "portugues",
		modelo: {
			infinitivo: "",
			gerundio: "",
			participio: "",
			modos: [
				{
					modo: "indicativo",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "pretérito imperfeito", conjugacoes: [] },
						{ tempo: "pretérito perfeito simples", conjugacoes: [] },
						{ tempo: "pretérito mais-que-perfeito simples", conjugacoes: [] },
						{ tempo: "futuro do presente", conjugacoes: [] },
						{ tempo: "futuro do pretérito", conjugacoes: [] }
					]
				},
				{
					modo: "subjuntivo",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "pretérito imperfeito", conjugacoes: [] },
						{ tempo: "futuro", conjugacoes: [] }
					]
				},
				{
					modo: "imperativo",
					tempos: [
						{ tempo: "afirmativo", conjugacoes: [] },
						{ tempo: "negativo", conjugacoes: [] }
					]
				}
			]
		}
	},
	{
		idioma: "italiano",
		modelo: {
			infinitivo: "",
			participio: "",
			gerundio: "",
			modos: [
				{
					modo: "indicativo",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "passato prossimo", conjugacoes: ["participio"] },
						{ tempo: "imperfetto", conjugacoes: [] },
						{ tempo: "trapassato prossimo", conjugacoes: ["participio"] },
						{ tempo: "passato remoto", conjugacoes: [] },
						{ tempo: "trapassato remoto", conjugacoes: ["participio"] },
						{ tempo: "futuro semplice", conjugacoes: [] },
						{ tempo: "futuro anteriore", conjugacoes: ["participio"] }
					]
				},
				{
					modo: "congiuntivo",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "passato", conjugacoes: ["participio"] },
						{ tempo: "imperfetto", conjugacoes: [] },
						{ tempo: "trapassato", conjugacoes: ["participio"] }
					]
				},
				{
					modo: "condizionale",
					tempos: [
						{ tempo: "presente", conjugacoes: [] },
						{ tempo: "passato", conjugacoes: ["participio"] }
					]
				},
				{
					modo: "imperativo",
					tempos: [
						{ tempo: "imperativo", conjugacoes: [] }
					]
				}
			]
		}
	},
	{
		idioma: "alemão",
		modelo: {
			infinitivo: "",
			participio: "",
			gerundio: "",
			modos: [
				{
					modo: "indicative_active",
					tempos: [
						{ tempo: "present", conjugacoes: [] },
						{ tempo: "imperfect", conjugacoes: ["participio"] },
						{ tempo: "perfect", conjugacoes: [] },
						{ tempo: "plusquamperfect", conjugacoes: ["participio"] },
						{ tempo: "future", conjugacoes: ["participio"] },
						{ tempo: "future_perfect", conjugacoes: ["participio"] }				
					]
				},
				{
						modo: "subjunctive_active",
						tempos: [
							{ tempo: "present", conjugacoes: [] },
							{ tempo: "imperfect", conjugacoes: [] },
							{ tempo: "perfect", conjugacoes: [] },
							{ tempo: "plusquamperfect", conjugacoes: [] },
							{ tempo: "future", conjugacoes: [] },
							{ tempo: "future_perfect", conjugacoes: [] }
						]
				},
				{
						modo: "conditional_active",
						tempos: [
							{ tempo: "imperfect", conjugacoes: [] },
							{ tempo: "plusquamperfect", conjugacoes: [] }
						]
				},
				{
						modo: "imperative_active",
						tempos: [
							{ tempo: "present", conjugacoes: [] },
						]
				}
			]
		}
	}
]

exports.modelos_salvar_verbo = modelos_salvar_verbo