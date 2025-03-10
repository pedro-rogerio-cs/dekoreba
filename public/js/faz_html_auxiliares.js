// Decoreba_mostra. No popup.
function faz_botoes_vem_vai (botao_vem, botao_vai) {
  return `
    <div class="flex_row T1 center" style="font-size: 27px; margin-top: 20px;">
      <div class="flex_row T2" style="justify-content: flex-start;">
        &nbsp${botao_vem}
      </div>
      <div class="flex_row T2" style="justify-content: flex-end;">
        ${botao_vai}&nbsp
      </div>
    </div>
  `
}

function faz_botao_popup_joga_treina (tipo, escrito, atividade) {
  return `<div class="flex_row center botao ${atividade} bot_joga_treina" style="width: 250px;" onclick="atualiza_escolhas('joga_ou_treina', '${tipo}'); aparece_popup('modalidades');">
    ${escrito}
  </div>
  `
}

function faz_botao_popup_modalidade (id, atividade, modalidade, escrito, icone) {

  // Aqui, se for joga, precisa aparecer o botão start.
  const terceira_funcao = (escolhas_dek.joga_ou_treina === 'joga') ? `st();` : `aparece_popup('orientacao');`
  
  return `
    <div id="${id}" class="flex_row center botao ${atividade} bot_modalidades" style="width: 250px;" onclick="ativa_botao(this); atualiza_escolhas('modalidade', '${modalidade}'); ${terceira_funcao}">
      <div class="flex_row T1" style="">${escrito}
        <i class="${icone}" style="font-size: 36px;"></i>
      </div>
    </div>
  `
}

function st () {
  document.getElementById('recip_bot_modalidades_start').style.display = 'flex'
}
function faz_botao_popup_orientacao (id, atividade, orientacao, bandeira_idi_1, bandeira_idi_2) {

  let escrito = ''
  if (orientacao != 'aleatoria') {
    escrito = `
      <span style="font-size: 53px; margin-right: 20px;">${bandeira_idi_1}</span>
        /
      <span style="font-size: 53px; margin-left: 20px;">${bandeira_idi_2}</span>
    `
  } else { escrito = `Aleatória` }

  return `<div id="${id}" class="flex_row T1 center botao ${atividade}" style="height: 60px; width: 250px;" onclick="
      ativa_desativa_botao(this); atualiza_escolhas('orientacao', '${orientacao}');">
        ${escrito}
      </div>
  `
}

function faz_botao_popup_alfas (id, classe_ativacao, tipo_ativ, tipo, innerHTML_do_sistema) {

  return `<div id="${id}" class="flex_row center botao ${classe_ativacao}" onclick='ativa_desativa_botao(this); valida_ativacao_alfabeto(this, "${tipo_ativ}"); atualiza_escolhas("${tipo}", "${innerHTML_do_sistema}");'>
    ${innerHTML_do_sistema}
  </div>`
}

function faz_dentro_escolhe_teste_inicial (nome) {
  
  return `
    <span class="flex_row T1" style="margin-top: 15px;">Seja muito bem-vindo(a) ao Dekoreba, ${nome}.</span>

          <span style="margin-top: 15px;">Se quiser fazer um teste, para não precisar praticar as palavras extrangeiras que você já sabe, é só clicar no idioma desejado abaixo.</span>

          <span style="margin-top: 15px;">Agora, se quiser começar as práticas do zero absoluto, basta fechar essa janelinha no <strong>X</strong> alí em cima para, escolher um idioma e iniciar os trabalhos.</span>

          <span class="flex_row T1" style="margin-top: 15px;">Boa sorte!</span>


          <select onchange="option_link_teste_home(this.value, '${nome}')" class="flex_row T1 center" style="max-width: 400px; border-radius: 25px; height: 60px; font-size: 21px; padding: 5px; border: none;  box-shadow: 0px 0px 10px var(--sombra); background: var(--background_site); color: var(--color_site); padding-left: 25px; margin: 50px; cursor: pointer;">

            <!-- <option value="650c9cd84d7e12c8758729c5">🇧🇷&emsp; Português</option> -->

            <option value="6516e1eb4ec552a43b95eaaa" disabled selected>🌍&emsp; Idioma de teste</option>

            <option value="65ca2cd951ade1d3d14bb7d2">Inglês</option>
            <option value="665c75a07438e2afd86f4e5a">Italiano</option>
            <option value="660051302d44ae34507589d9">Francês</option>
            <option value="65c919ec3501a7b1de3e20bf">Espanhol</option>
            <option value="6516e1694ec552a43b95deb6">Alemão</option>


          </select>
  `
}

function faz_palavras_testadas (palavra_idioma_1, palavra_idioma_2, resultado) {

  const largura_res = resultado === 'acertou' ? 100 : 0

  const cima_ou_baixo = resultado === 'acertou' ? 'up' : 'down'
  const simbolo = `<i class="icon-${cima_ou_baixo}-open" style="margin-right: 10px;"></i>`

  const oereo = `
  <div class="flex_row T1 center">

    <div class="flex_row" style="height: 100%; margin-right: 5px;">
      ${simbolo}
    </div>

    <div class="flex_col T1">
                  
      <div class="flex_row T1 center">
                  
        <div class="flex_row T1" style="overflow-x: scroll; overflow-y: hidden; padding-left: 5px;">
          <div class="" style="display: inline-block; margin: 5px; white-space: nowrap; align-text: left; max-width: 50px;">
            ${palavra_idioma_1}
          </div>
        </div>

        <div class="flex_row T1" style="overflow-x: scroll; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right: 5px;">
          <div style="margin: 5px; margin-left: 20px; display: inline-block; margin: 5px; white-space: nowrap; margin-left: auto;">
            ${palavra_idioma_2}
          </div>
        </div>
      </div>

      <div class="flex_row T1 center" style="margin-top: -10px;">

        <!-- resultado -->
        <div class="flex_row T1 listrinha_porcentagem listrinha_porc_ativa">
          <span id="" class="interior_listra_porcentagem" style="width: ${largura_res}%; height: 5px; background: var(--botao_ativo); min-height: 5px; border-radius: 7px;"></span>
        </div>
      </div>
    </div>
  </div>
  `

  return oereo
}

function faz_palavras_trabalhadas (palavra_idioma_1, palavra_idioma_2, qtd_incidencias, simbolo, qtd_incidencias_previas, cor_res) {

  // qtd_incidencias_previas é a pontuação dessa palavra gravada no banco de dados, de jogadas anteiores.

  // Daria para fazer a qtd_incidencias de uma cor diferente na barrinha, para diferenciar o progresso
  // ou regresso, do usuário nessa jogada, em relação ao acumulado de todas as jogadas.
  
  let largura_res = (qtd_incidencias_previas + qtd_incidencias) * 100 / 16

  let eke = `<div class="flex_row T1 center">

    <div class="flex_row" style="width: 50px; height: 100%; margin-right: 5px;">
      <div style="min-width: 25px; text-align: right;">${qtd_incidencias}</div>
      ${simbolo}
    </div>

    <div class="flex_col T1">
                  
      <div class="flex_row T1 center">
                  
        <div class="flex_row T1" style="overflow-x: scroll; overflow-y: hidden; padding-left: 5px;">
          <div class="" style="display: inline-block; margin: 5px; white-space: nowrap; align-text: left; max-width: 50px;">
            ${palavra_idioma_1}
          </div>
        </div>

        <div class="flex_row T1" style="overflow-x: scroll; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right: 5px;">
          <div style="margin: 5px; margin-left: 20px; display: inline-block; margin: 5px; white-space: nowrap; margin-left: auto;">
            ${palavra_idioma_2}
          </div>
        </div>
      </div>

      <div class="flex_row T1 center" style="margin-top: -10px;">

        <!-- resultado -->
        <div class="flex_row T1 listrinha_porcentagem listrinha_porc_ativa">
          <span id="" class="interior_listra_porcentagem" style="width: ${largura_res}%; height: 5px; background: ${cor_res}; min-height: 5px; border-radius: 7px;"></span>
        </div>
      </div>
    </div>
  </div>
  `
  return eke
}

function faz_palavras_liberadas (i, palavra_idioma_1, palavra_idioma_1_mp3, palavra_idioma_2, palavra_idioma_2_mp3, idioma_1) {

  // Pra cada palavra nova, um i diferente.

  // Os nomes das pastas de mp3 estão em letras minúsculas, logo...
  const idioma_1_minusculas = idioma_1.toLowerCase()
  const idioma_1_sem_acento = removeAcento(idioma_1_minusculas)

  const pontos_antes = (frase_traduzida === 'sim') ? './../..' : '..'
  console.log(pontos_antes)
  const string = `<div class="flex_row T1 center dominio_recem_liberado" style="max-width: 400px;">
    <div class="flex_row T2" style="overflow-x: scroll; overflow-y: hidden; border-top-left-radius: 10px; border-bottom-left-radius: 10px; padding-left: 5px;">
      
      <audio id="pri_${i}" crossorigin="anonymous">
                <source src="${pontos_antes}/mp3/${idioma_1_sem_acento}/${palavra_idioma_1_mp3}.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <div class="flex_row center botao" style="margin: 5px; margin-left: 5px; height: 35px; " onclick="document.getElementById('pri_${i}').play();">
                <i class="icon-volume"></i>
              </div>


                <div class="" style="display: inline-block; margin: 5px; white-space: nowrap; align-text: left;">
                  ${palavra_idioma_1}
                </div>
              </div>

              <div class="flex_row T2" style="overflow-x: scroll; border-top-right-radius: 10px; border-bottom-right-radius: 10px; padding-right: 5px;">
                <div style="margin: 5px; margin-left: 20px; display: inline-block; margin: 5px; white-space: nowrap; margin-left: auto;">
                  ${palavra_idioma_2}
                </div>
              </div>

              
              <audio id="seg_${i}" crossorigin="anonymous">
                <source src="${pontos_antes}/mp3/portugues/${palavra_idioma_2_mp3}.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <div class="flex_row center botao" style="margin: 5px; margin-left: 5px; height: 35px; " onclick="document.getElementById('seg_${i}').play();">
                <i class="icon-volume"></i>
              </div>
              

            </div>`

  return string
}