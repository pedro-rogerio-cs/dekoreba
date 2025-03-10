require('dotenv').config()
const nodemailer = require('nodemailer')
  
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.EMAIL_ENDERECO,
    pass: process.env.EMAIL_SENHA
  }
})

module.exports = {
  dispara_email: function (tipo, coisas) {

    let html
    let texto
    let mailOptions

    if (tipo == 'altera_senha') {
      const link_token = `https://${process.env.SERVIDOR_COMPLETO}/altera_senha?token=${coisas.token_senha}`

      html = `<font size=4>
      <table width="600">
        <tr>
          <td width="100%" style="height: 75px;">
            <center><img src="https://dekoreba.ddns.net/imagens/cabecalho_email.png"></center>
          </td>
        </tr>
        <tr>
          <td width="100%">
            <br>Olá!
            <br>
            <br>Esqueceu a senha não é mesmo ${coisas.nome}?
            <br>
            <br>Calma calma, não criemos pânico. Clique neste link abaixo e crie outra senha novinha em folha.
            <br>https://dekoreba.ddns.net/altera_senha?token=${coisas.token_senha}
            <br>
            <br>Se não foi você quem pediu a alteração de senha, ignore totalmente esta mensagem!
          </td>
        </tr>
      </table>
      </font>
      `

      texto = `Olá ${coisas.nome}. Para trocar a senha, copie e cole o seguinte endereço na barra de endereço de seu navegador: https://dekoreba.ddns.net/altera_senha?token=${coisas.token_senha}`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: coisas.email,
        subject: 'Alteração de senha',
        text: texto,
        html: html
      }
      
    }

    if (tipo == 'confirma_cadastro') {
      console.log("mandará o pombow")
      const link_token = `https://${process.env.SERVIDOR_COMPLETO}/confirma?token=${coisas.token}`

      html = `
        <font size=4>
        <table width="100%">
          <tr>
            <td width="100%">
              <center><img src="https://dekoreba.ddns.net/imagens/cabecalho_email.png"></center>
            </td>
          </tr> 
          <tr>
            <td width="100%">
              <br>Olá ${coisas.nome}.<br><br>Confirme seu cadastro por gentileza, clicando no linkão abaixo!
              <br>
              <br>https://dekoreba.ddns.net/confirma?token=${coisas.token}
              <br>
              <br>Este link expirará em 12 horas, então seja veloz.
              <br>
              Gracias!!
            </td>
          </tr>
        </table>
        </font>
      `
      
      texto = `Olá ${coisas.nome}. copie e cole o link a seguir na barra de endereço de seu navegador para confirmar seu cadastro. O link só dura doze horas, então hurry up bróda: https://dekoreba.ddns.net/confirma?token=${coisas.token}  Muito obrigado!`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: coisas.email,
        subject: 'Confirmação de Cadastro',
        text: texto,
        html: html
      }
    }

    if (tipo == 'cadastro_confirmado_bem_vindo') {
      html = `<br>${coisas.nome}, obrigado por confirmar seu cadastro<br><br>A família Dekoreba te dá as boas vindas!!`
      texto = `Olá ${coisas.nome}, obrigado por confirmar seu cadastro<br><br>A família Dekoreba te dá as boas vindas!!`

      mailOptions = {
        from: process.env.EMAIL_ENDERECO,
        to: coisas.email,
        subject: 'Seja bem-vindo ao Dekoreba',
        text: texto,
        html: html
      }
    }
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email enviado: ' + info.response)
        return
      }
    })
  }

}