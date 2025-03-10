const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


async function getGroqChatCompletion (idioma, frase) {

  const msg = `I need a translation to this phrase, word by word, from ${idioma} to portuguese. Send an object like this:
    {
      "frase_traduzida": "the complete phrase in portuguese",
      "palavras": [
        {
          "original": "word 1",
          "traduzida": "word 1 translated"
        },...
      ]
    }
    . I just need this object in your response, nothing besides this object. The phrase to be translated is this: ${frase}
  ` 
   
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: msg,
      },
    ],
    model: "llama3-8b-8192",
  })

}


module.exports = async function (idioma, frase) {
  const chatCompletion = await getGroqChatCompletion(idioma, frase)
  return chatCompletion.choices[0]?.message?.content
}