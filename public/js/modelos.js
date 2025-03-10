//onpopstate é a navegação pelas setas do navegador
var id_dekoreba_corrente = ''

window.onpopstate = (event) => {

  // Se o event.state não for nulo, ou seja, se não for um click num link de rolagem.
  if (event.state) {
    if (event.state.tela_ativa === 'index') monta_index('popstate')
    if (event.state.tela_ativa === 'termos_uso') monta_termos_uso('popstate')
    if (event.state.tela_ativa === 'politica_privacidade') monta_politica_privacidade('popstate')

    if (event.state.tela_ativa === 'decoreba_jogo') monta_decoreba_jogo('popstate')
    if (event.state.tela_ativa === 'login') monta_login('popstate')
    if (event.state.tela_ativa === 'cadastro') monta_cadastro('popstate')
    if (event.state.tela_ativa === 'perfil') monta_perfil('teste', 'popstate')
    if (event.state.tela_ativa === 'busca_usuario') monta_busca_usuario('popstate')


    if (event.state.tela_ativa === 'decoreba_cria') monta_decoreba_cria('popstate')
    if (event.state.tela_ativa === 'decoreba_mostra') monta_decoreba_mostra(id_dekoreba_corrente, 'popstate')
    if (event.state.tela_ativa === 'home') monta_home('popstate', 'sem_id_usuario')
    if (event.state.tela_ativa === 'opcoes') monta_opcoes('popstate')
    if (event.state.tela_ativa === '404') monta_404('popstate')
    if (event.state.tela_ativa === 'altera_senha') { monta_altera_senha('popstate') }
    if (event.state.tela_ativa === 'testes') testes ('popstate')   
  }
}

var diurno_noturno = 'diurno'

function inicio(dados) {
  
  if (diurno_noturno === 'noturno') {
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


  dados = JSON.parse(dados)
  if (dados.tela === 'index') monta_index('get', dados)
  if (dados.tela === 'termos_uso') monta_termos_uso()
  if (dados.tela === 'politica_privacidade') monta_politica_privacidade()
  if (dados.tela === 'decoreba_jogo') monta_decoreba_jogo()
  if (dados.tela === 'login') monta_login()
  if (dados.tela === 'cadastro') monta_cadastro()
  if (dados.tela === 'perfil') monta_perfil(`${dados.id_perfil}`)
  if (dados.tela === 'busca_usuario') monta_busca_usuario()
  if (dados.tela === 'decoreba_cria') monta_decoreba_cria(dados.decoreba, dados.msg)
  if (dados.tela === 'decoreba_mostra') monta_decoreba_mostra(dados.id_decoreba)
  if (dados.tela === 'home') monta_home('get', dados.id_usuario, dados.avatar_50, dados.nome)
  if (dados.tela === 'opcoes') monta_opcoes()
  if (dados.tela === 'altera_senha') monta_altera_senha(dados.token_que_chfaixa_offlinegegou)
  if (dados.tela === '404') monta_404()
  if (dados.tela === 'testes') testes()
  if (dados.tela === 'afazeres') monta_afazeres()
}

/* Telas deslogadas */

function monta_index (modo_de_vinda, dados_servidor) {
    
  /*
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 600;
    canvas.style.display = "block";
    canvas.style.margin = "0 auto"; // Centraliza horizontalmente

    let notes = [];
    const keys = { "ArrowLeft": 100, "ArrowDown": 200, "ArrowRight": 300, "Numpad4": 100, "Numpad5": 200, "Numpad6": 300 };
    const speed = 3;

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let audioElement = new Audio("mp3/goukisan.mp3"); // Substitua pelo caminho do seu arquivo de áudio
    let source = audioContext.createMediaElementSource(audioElement);
    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    let lastPeakTime = 0;
    let threshold = 80; // Sensibilidade da detecção de batidas
    let startTime = 0;

    function spawnNote(key) {
        notes.push({ x: keys[key], y: 0, key });
    }

    function update() {
        notes.forEach(note => note.y += speed);
        notes = notes.filter(note => note.y < canvas.height);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, canvas.height - 100, canvas.width, 10);
        notes.forEach(note => {
            ctx.fillStyle = "blue";
            ctx.fillRect(note.x - 25, note.y, 50, 10);
        });
    }

    function detectBeats() {
        analyser.getByteFrequencyData(dataArray);
        let average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
        let currentTime = audioElement.currentTime;

        if (average > threshold && currentTime - lastPeakTime > 0.1) { // Evita notas muito próximas
            let keyOptions = ["ArrowLeft", "ArrowDown", "ArrowRight"];
            let key = keyOptions[Math.floor(Math.random() * keyOptions.length)];
            spawnNote(key);
            lastPeakTime = currentTime;
        }
    }

    function gameLoop() {
        update();
        draw();
        detectBeats();
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener("keydown", (event) => {
        notes.forEach((note, index) => {
            if ((event.key === note.key || event.code === note.key) && note.y > canvas.height - 120 && note.y < canvas.height - 80) {
                notes.splice(index, 1);
                console.log("Hit!");
            }
        });
    });

    document.getElementById("startButton").addEventListener("click", async function () {
        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }
        startTime = audioElement.currentTime;
        audioElement.play();
        gameLoop();
    });
  */

  const stateObj = { tela_ativa: '' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda })

  altera_diurno_noturno ('diurno')

  document.getElementById('div_palco_index').innerHTML = `${cabecalho_deslogado}
    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div>
    <div class="flex_row flex_col_m T1" style="height: 100vh;">

      <div class="flex_col T2 A1 T1_m center exclusivo_pc" style="height: auto; align-items: flex-end;">

        <!-- O 512 do max-width abaixo significa meia largura_interna (que é 1024px). -->
        <div class="flex_col T1 A1" style="max-width: 512px; justify-content: center;">
          
          <i class="icon-isotipo sumido" style="font-size: 100px;"></i>

          <div class="flex_row T1" style="max-width: 512px; margin-bottom: 15px; align-items: flex-end; bottom: 0; height: auto; align-items: flex-end; margin-top: 35px;">

            <img src="imagens/bandeiras/estados-unidos.png" width="40" style="margin: 10px; margin-left: 0px;">
            <img src="imagens/bandeiras/espanha.png" width="40" style="margin: 10px;">

            <img src="imagens/bandeiras/franca.png" width="40" style="margin: 10px;">
            <img src="imagens/bandeiras/alemanha.png" width="40" style="margin: 10px;">

            <img src="imagens/bandeiras/italia.png" width="40" style="margin: 10px;">

          </div>

          <div class="T1 span_frase_principal" style="font-size: 40px; font-weight: 700; font-family: 'Quicksand', sans-serif;"> fe<span style="color: darkorange;">brincando</span>!</div>

          <span class="span_aviso_beta" style="margin-top: 10px;">Versãode beta</span>
          
          <hr class="sumido" style="width: 100%; height: 1px; color: #cfcfcf; background: #cfcfcf;"></hr>

          <button id="botao_cadastrar" class="flex_row T1 botao center" style="border: 2px solid var(--color_site); max-width: 350px; margin-left: 0px; margin-top: 60px;" onclick="monta_cadastro()">
            Cadastrar com Google
          </button>

          <button id="botao_login" class="flex_row T1 botao center" style="border: 2px solid var(--color_site); max-width: 350px; margin-left: 0px; margin-top: 0px;" onclick="monta_login()">
            Login com Google
          </button>

        </div>
        
        <div class="flex_row T1" style="font-size: 14px; max-width: 512px; margin-bottom: 10px; align-items: flex-end; height: auto; align-items: flex-end;">
          © 2025 Dekoreba <span class="span_termos_uso" style="cursor: pointer; margin-left: 15px;" onclick="monta_termos_uso();">Termos de Uso</span> <span class="span_polit_priv" style="cursor: pointer; margin-left: 15px;" onclick="monta_politica_privacidade();">Política de Privacidade</span>
        </div>
      </div>

      <div class="flex_col T2 A1 T1_m center exclusivo_pc" style="">

        <div class="flex_row T1" style="height: 100%; background-image: url('./imagens/mulher_index.png'); background-size: cover; background-position: center; margin-top: 60px;border-top-left-radius: 30px; border-bottom-left-radius: 30px; transition: background-image 1s ease-in-out, opacity 1s ease-in-out;">
          
        </div>
      </div>

      <div class="flex_col T1 A1 exclusivo_mobile" style="align-items: center;">

        <div class="flex_row T1 center" style="margin-top: 100px; margin-bottom: 15px; align-items: flex-end; height: auto; align-items: flex-end;">

          <img src="imagens/bandeiras/estados-unidos.png" width="40" style="margin: 10px; margin-left: 0px;">
          <img src="imagens/bandeiras/espanha.png" width="40" style="margin: 10px;">

          <img src="imagens/bandeiras/franca.png" width="40" style="margin: 10px;">
          <img src="imagens/bandeiras/alemanha.png" width="40" style="margin: 10px;">

          <img src="imagens/bandeiras/italia.png" width="40" style="margin: 10px;">

        </div>

        <div class="T1 span_frase_principal" style="font-size: 25px; font-weight: 700; font-family: 'Quicksand', sans-serif; text-align: center;">Expanda seu vocabulário<br>e memorize palavras <span style="color: darkorange;">brincando</span>!
        </div>
        
        <span class="span_aviso_beta" style="margin-top: 20px;">Versão beta</span>

        <hr class="sumido" style="width: 100%; height: 1px; color: #cfcfcf; background: #cfcfcf;"></hr>

        <button class="flex_row T1 botao center" style="min-height: 50px; border: 2px solid var(--color_site); max-width: 350px; margin: 0px; margin-top: 60px; margin-bottom: 20px;" onclick="monta_cadastro()">
          Começar agora
        </button>

        <button class="flex_row T1 botao center" style="min-height: 50px; border: 2px solid var(--color_site); max-width: 350px; margin: 0px; margin-top: 0px;" onclick="monta_login()">
          Já tenho uma conta
        </button>

        <img src="./imagens/mulher_index.png" style="margin-top: 25px; width: 100%;">
        <div class="flex_row T1" style="font-size: 14px; margin-bottom: 10px; align-items: flex-end; height: auto; align-items: flex-end; background: orange;">

          <div class="flex_col T1" style="height: auto; padding-left: 25px; padding: 25px; background: #a468ba;   background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white;">

            <span class="span_termos_uso span_index_creditos_mobile" onclick="monta_termos_uso();">Termos de Uso</span>
            <span class="span_polit_priv span_index_creditos_mobile" onclick="monta_politica_privacidade();">Declaração de Privacidade</span>

            <span class="span_index_creditos_mobile" style="margin-bottom: 10px; font-weight: bold;">© 2025 Dekoreba</span>
          </div>
        </div>
              
      </div>
        
    </div>
    `
  
  prepara_index(modo_de_vinda, dados_servidor)
}

function monta_politica_privacidade () {

  const stateObj = { tela_ativa: 'politica_privacidade' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href })


  document.getElementById('div_palco_index').innerHTML = `<i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 50px; margin-top: 100px; cursor: pointer;" onclick="monta_index();"></i>

  <div class="flex_col T1 largura_interna" style="padding: 15px; font-size: 16px; padding-bottom: 50px;">
  <h2><span style="color: rgb(68, 68, 68);">Política Privacidade</span></h2><p><span style="color: rgb(68, 68, 68);">A sua privacidade é importante para nós. É política do Dekoreba respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://www.dekoreba.com.br">Dekoreba</a>, e outros sites que possuímos e operamos.</span></p><p><span style="color: rgb(68, 68, 68);">Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</span></p><p><span style="color: rgb(68, 68, 68);">Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</span></p><p><span style="color: rgb(68, 68, 68);">Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</span></p><p><span style="color: rgb(68, 68, 68);">O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas&nbsp;</span><a href="https://politicaprivacidade.com/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(68, 68, 68);">políticas de privacidade</a><span style="color: rgb(68, 68, 68);">.</span></p><p><span style="color: rgb(68, 68, 68);">Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</span></p><p><span style="color: rgb(68, 68, 68);">O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.</span></p><p><span style="color: rgb(68, 68, 68);"><ul><li><span style="color: rgb(68, 68, 68);">O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</span></li><li><span style="color: rgb(68, 68, 68);">Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</span></li><li><span style="color: rgb(68, 68, 68);">Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.</span></li><li><span style="color: rgb(68, 68, 68);">Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.</span></li></ul><p><br></p></span></p><h3><span style="color: rgb(68, 68, 68);">Compromisso do Usuário</span></h3><p><span style="color: rgb(68, 68, 68);">O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Dekoreba oferece no site e com caráter enunciativo, mas não limitativo:</span></p><ul><li><span style="color: rgb(68, 68, 68);">A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</span></li><li><span style="color: rgb(68, 68, 68);">B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, </span><span style="color: rgb(33, 37, 41);"><a href='https://bbebbet.br.com' style='color:inherit !important; text-decoration: none !important; font-size: inherit !important;'>bbebbet</a></span><span style="color: rgb(68, 68, 68);"> ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</span></li><li><span style="color: rgb(68, 68, 68);">C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Dekoreba, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</span></li></ul><h3><span style="color: rgb(68, 68, 68);">Mais informações</span></h3><p><span style="color: rgb(68, 68, 68);">Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</span></p><p><span style="color: rgb(68, 68, 68);">Esta política é efetiva a partir de&nbsp;28 October 2024 16:09</span></p>
  </div>`

  document.body.style.overflow = 'auto'
  window.scrollTo(0, 0)
}

function monta_termos_uso () {

  const stateObj = { tela_ativa: 'termos_uso' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href })

  document.getElementById('div_palco_index').innerHTML = `<i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 50px; margin-top: 100px; cursor: pointer;" onclick="monta_index();"></i>

  <div class="flex_col T1 largura_interna" style="padding: 15px; font-size: 16px; padding-bottom: 50px;">
  <h2><span style="color: rgb(68, 68, 68);">1. Termos</span></h2><p><span style="color: rgb(68, 68, 68);">Ao acessar ao site <a href="https://www.dekoreba.com.br">Dekoreba</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</span></p><h2><span style="color: rgb(68, 68, 68);">2. Uso de Licença</span></h2><p><span style="color: rgb(68, 68, 68);">É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Dekoreba , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:&nbsp;</span></p><ol><li><span style="color: rgb(68, 68, 68);">modificar ou copiar os materiais;&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Dekoreba;&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou&nbsp;</span></li><li><span style="color: rgb(68, 68, 68);">transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</span></li></ol><p><span style="color: rgb(68, 68, 68);">Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Dekoreba a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</span></p><h2><span style="color: rgb(68, 68, 68);">3. Isenção de responsabilidade</span></h2><ol><li><span style="color: rgb(68, 68, 68);">Os materiais no site da Dekoreba são fornecidos 'como estão'. Dekoreba não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</span></li><li><span style="color: rgb(68, 68, 68);">Além disso, o Dekoreba não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</span></li></ol><h2><span style="color: rgb(68, 68, 68);">4. Limitações</span></h2><p><span style="color: rgb(68, 68, 68);">Em nenhum caso o Dekoreba ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Dekoreba, mesmo que Dekoreba ou um representante autorizado da Dekoreba tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</span></p><h2><span style="color: rgb(68, 68, 68);">5. Precisão dos materiais</span></h2><p><span style="color: rgb(68, 68, 68);">Os materiais exibidos no site da Dekoreba podem incluir erros técnicos, tipográficos ou fotográficos. Dekoreba não garante que qualquer material em seu site seja preciso, completo ou atual. Dekoreba pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Dekoreba não se compromete a atualizar os materiais.</span></p><h2><span style="color: rgb(68, 68, 68);">6. Links</span></h2><p><span style="color: rgb(68, 68, 68);">O Dekoreba não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Dekoreba do site. O uso de qualquer site vinculado é por conta e risco do usuário.</span></p><p><br></p><h3><span style="color: rgb(68, 68, 68);">Modificações</span></h3><p><span style="color: rgb(68, 68, 68);">O Dekoreba pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</span></p><h3><span style="color: rgb(68, 68, 68);">Lei aplicável</span></h3><p><span style="color: rgb(68, 68, 68);">Estes termos e condições são regidos e interpretados de acordo com as leis do Dekoreba e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</span></p>
  </div>`

  document.body.style.overflow = 'auto'
  window.scrollTo(0, 0)
}

function monta_login(obj, modo_de_vinda) {

  const stateObj = { tela_ativa: 'login' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda })

  document.getElementById('div_palco_index').innerHTML = `

    ${cabecalho_deslogado}

    <div class="flex_col T1 center largura_interna recip_index_login" style="height: 92.3354vh;">

      <div id="msg_sistema_esqueceu_foi" class="opcoes_msg_cima" style="display: none; margin-bottom: 20px;">
        
      </div>
      

      <div id="msg_sistema_login" class="msg_sistema"></div>

      <div class="flex_col T1_m center fundo_cumprido" style="box-shadow: 0px 0px 6px var(--sombra);">

        
        <span id="span_login" class="T1" style="margin-left: 15px;">Login</span>
        
        <input id="login_email" type="text" class="input_texto T1" placeholder="E-mail" onkeyup="checa_enter(event, 'login')"> 

        <div class="password-container flex_col T1 center">
          <input type="password" id="login_senha" class="input_texto T1" placeholder="Digite sua senha" onkeyup="checa_enter(event, 'login')">
         
          <!-- Ícone que alterna entre olhos abertos e fechados -->
          <span class="toggle-password" onclick="togglePassword('login')">
            <i id="toggle-icon" class="icon-olho_fechado"></i>
          </span>
        </div>

        <!-- <input id="login_senha" type="password" class="input_texto T1" placeholder="Senha"> -->

        <span id="esqueceu_senha" class="link_texto T1" style="margin-left: 15px;" onclick="esqueceu_senha()">Esqueceu a senha?</span>
  
        <button id="botao_entrar" class="botao" onclick="vai_filhao_2('login')" style="margin-top: 25px; border: 1px solid var(--color_site); max-width: 350px; margin-left: 0px;">Entrar</button>

      </div>

    </div>
  `

  prepara_login(obj, modo_de_vinda)
}

async function monta_altera_senha (token) {

  const stateObj = { tela_ativa: 'altera_senha' }

  document.getElementById('div_palco_index').innerHTML = `
    <div id="recip_altera_senha" class="flex_col T1 center largura_interna" style="height: 92.3354vh;">

    <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 25px;"></i>

      <div id="msg_sistema_cadastro" class="msg_sistema"></div>

      <div class="flex_col T1_m center fundo_cumprido">
        <span class="T1" style="margin-left: 15px;">Alteração de senha</span>
        
        <input id="senha_nova_1" type="text" class="input_texto T1" placeholder="Nova senha">
        <input id="senha_nova_2" type="text" class="input_texto T1" placeholder="Repita a nova senha">

      </div>

      <button class="botao" onclick="vai_filhao_2('altera_senha', '${token}')" style="margin-top: -35px;">Alterar</button>

    </div>

    <div id="recip_nova_senha_enviada" class="flex_col T1 center sumido" style="height: 100vh;">
      
      <div class="flex_row T1 center exclusivo_pc">

        <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 25px;"></i>

      </div>

      <div class="flex_col T1 center exclusivo_mobile">

        <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 25px;"></i>

      </div>

      <div style="margin-top: 50px;">Sua senha foi alterada com sucesso.</div>

      <div class="cadastro_dizeres">
        Clique no botão abaixo e faça login com sua senha novinha em folha.
      </div>

      <button class="botao" onclick="monta_login()">Entrar</button>

    </div>
  `
  window.scrollTo(0, 0)
}

function monta_cadastro (obj, modo_de_vinda) {

  const stateObj = { tela_ativa: 'cadastro' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda })

  document.getElementById('div_palco_index').innerHTML =  /*html*/`
    ${cabecalho_deslogado}

    <div id="recip_cadastro" class="flex_col T1 center largura_interna recip_index_cadastro" style="padding-top: 100px;">
      <div id="msg_sistema_cadastro" class="msg_sistema"></div>

    <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta sumido" style="font-size: 133px;width: 285px; margin-bottom: 25px;"></i>

    <div id="msg_sistema_cadastro" class="msg_sistema"></div>

    <div class="flex_col T1_m center fundo_cumprido" style="box-shadow: 0px 0px 6px var(--sombra);">

      <span id="span_cadastro" class="T1 span_cadastro" style="margin-left: 15px;">Cadastro</span>
        
        <input id="cadastro_nome" type="text" class="input_texto T1" placeholder="Nome">
        <input id="cadastro_email" type="text" class="input_texto T1" onchange="valida_email('cadastro_email', this.value)" placeholder="E-mail">

        <input id="cadastro_username"  class="input_texto T1 sumido" pattern="[a-zA-Z0-9_-]+" title="Apenas letras, números, hífen (-) e underline (_) são permitidos" placeholder="Usfeuário">

   


        <div id="username-feedback" style="font-size: 15px;"></div>

        <div class="password-container flex_col T1 center" style="margin-top: 25px;">

          <input type="password" id="cadastro_senha" class="input_texto T1" placeholder="Digite sua senha" onkeyup="checkPasswordStrength()" >
         
          <!-- Ícone que alterna entre olhos abertos e fechados -->
          <span class="toggle-password" onclick="togglePassword('cadastro')">
              <i id="toggle-icon" class="icon-olho_fechado"></i>
          </span>

          <div class="strength-bar">
            <div id="strength-meter"></div>
          </div>

          <span id="span_senha_fraca" style="font-size: 12pt; color: red; display: none;">
            Senha fraca
          </span>
          <span id="span_senha_media" style="font-size: 12pt; color: orange; display: none;">
            Senha média
          </span>
          <span id="span_senha_forte" style="font-size: 12pt; color: green; display: none;">
            Senha forte
          </span>

        </div>

         <div class="flex_col T1" style="color: grey; font-size: 13pt;  margin-top: 10px; margin-bottom: 15px;">

            <span id="cadastro_condicao_senha_maiuscula"><i id="i_cadastro_condicao_senha_maiuscula" class="icon-ok"></i><span id="cond_1">Letra maiúscula</span></span>
            <span id="cadastro_condicao_senha_minuscula"><i id="i_cadastro_condicao_senha_minuscula" class="icon-ok"></i><span id="cond_2">Letra minúscula</span></span>
            <span id="cadastro_condicao_senha_numero"><i id="i_cadastro_condicao_senha_numero" class="icon-ok"></i><span id="cond_3">Número</span></span>
            <span id="cadastro_condicao_senha_especial"><i id="i_cadastro_condicao_senha_especial" class="icon-ok"></i><span id="cond_4">Caractére especial</span></span>
            <span id="cadastro_condicao_senha_seis"><i id="i_cadastro_condicao_senha_seis" class="icon-ok" style=""></i><span id="cond_5">Mínimo de 6 cacactéres</span></span>

          </div>
     
        <input id="cadastro_repete_senha" type="password" class="input_texto T1" placeholder="Repita a Senha" onkeyup="checa_enter(event, 'cadastro')">

        <button id="botao_cadastrar" class="botao" onclick="cadastrar('cadastro')" style="margin-top: 45px; border: 1px solid var(--color_site);">Cadastrar</button>

      </div>
      
    </div>

    <div id="recip_cadastro_enviado" class="flex_col T1 center sumido" style="height: 100vh;">
      
      <div class="flex_col T1_m center fundo_cumprido" style="box-shadow: 0px 0px 6px var(--sombra); margin-left: 25px; margin-right: 25px; padding-left: 25px; padding-right: 25px;">
      
      <div class="flex_row T1 center exclusivo_pc">

        <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 25px; margin-top: 25px;"></i>

      </div>

      <div class="flex_col T1 center exclusivo_mobile">

        <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px;width: 285px; margin-bottom: 25px; margin-top: 25px;"></i>

      </div>

      <div style="margin-top: 25px;">Seu cadastro foi realizado com sucesso.</div>

      <!-- Por enquanto, a confirmação do cadastro por e-mail está suspensa -->
      <div style="margin-top: 15px; display: none;">
        Não se esqueça de checar sua caixa de e-mail para confirmar o seu cadastro e utilizar o sistema a full.
      </div>

      <!-- <button class="botao" style="border: 1px solid var(--color_site); margin-top: 25px;" onclick="monta_login()">Entrar</button> -->
      
      <button class="botao" style="border: 1px solid var(--color_site); margin-top: 25px;" onclick="vai_filhao_2('login_do_cadastro')">Entrar</button>

      </div>
    </div>
  `

  prepara_cadastro(obj, modo_de_vinda)
}


/* Telas logadas */
async function monta_home (modo_de_vinda, id_usuario, avatar_50, nome) {

  const stateObj = { tela_ativa: 'home' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda })

  if (id_usuario != 'nao_logado' & sessionStorage.getItem('id_usuario') === null) {
  // if (sessionStorage.getItem('id_usuario') === null) {
    sessionStorage.setItem("id_usuario", id_usuario)
    sessionStorage.setItem("avatar_50", avatar_50)
  }
  

  const cabecalho_rapido = cria_cabecalho_rapido('home')

  document.getElementById('div_palco_index').innerHTML = `
  
    <div id="container_loading" class="flex_row center container_loading" style="display: none;">
      <div class="loader"></div>
    </div>

    ${cabecalho_rapido}

    <div id="mostra_recip_info" class="flex_col T1 center mostra_recip_info sumido">
      <div id="mostra_info" class="flex_col T1 mostra_info_caixinha">
          
      </div>
    </div>

    <div id="home_recip_teste" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div id="home_info_teste" class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_teste_inicial()"></i> 
        </div>

        <div id="home_teste_dentro" class="flex_col T1 center caixinha_dentro" style="">

        </div>

      </div>
      
    </div> 



    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div>
    
    <!--
    <div class="flex_col T1 center recip" style="padding-left: 15px; padding-right: 15px; height: 100vh; background-image: url('./imagens/fundos_dekorebas/anime_girl.jpg'); background-size: cover;   background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center; ">
  -->

    <div class="flex_col T1 center recip" style="padding-left: 15px; padding-right: 15px; height: 100vh;">

      <div class="flex_row T1 center exclusivo_pc" style="margin-bottom: 10px;">
        <i class="icon-imagotipo index_logotipo_pc estilo_insta" style="margin-left: 75px; width: 475px;"></i>
      </div>
            

        <div class="flex_col T1 center exclusivo_mobile" style="">
          <i class="icon-imagotipo_cima index_logotipo_pc estilo_insta" style="font-size: 133px; width: 275px; margin-right: 17px;"></i>
        </div>

      <span class="slogan_home" style="text-align: center;">Qual idioma você quer aprender hoje?</span>



      <select onchange="option_link(this.value)" class="flex_row T1 center" style="max-width: 600px; border-radius: 25px; height: 60px; font-size: 21px; padding: 5px; border: none;  box-shadow: 0px 0px 10px var(--sombra); background: var(--background_site); color: var(--color_site); padding-left: 25px; margin: 50px; cursor: pointer;">

        <!-- <option value="650c9cd84d7e12c8758729c5">🇧🇷&emsp; Português</option> -->

        <option value="6516e1eb4ec552a43b95eaaa" disabled selected>🌍&emsp; Escolha um idioma</option>

        <option value="65ca2cd951ade1d3d14bb7d2">Inglês</option>
        <option value="665c75a07438e2afd86f4e5a">Italiano</option>
        <option value="660051302d44ae34507589d9">Francês</option>
        <option value="65c919ec3501a7b1de3e20bf">Espanhol</option>
        <option value="6516e1694ec552a43b95deb6">Alemão</option>
        <option value="6516ea09c6fd2950eb4b416a">Árabe</option>
        <option value="67c34f43dfc38037037a844d">Português</option>


        <!-- <option value="665c75a07438e2afd86f4e5a">Italiano</option> -->
        <!-- <option value="660051302d44ae34507589d9">Francês</option> -->
        
        <!--
        <option value="65c919ec3501a7b1de3e20bf">🇪🇸&emsp; Espanhol</option>
        -->
        <!-- 
        <option value="65ca2cd951ade1d3d14bb7d2">🇺🇸&emsp; Inglês</option>
        <option value="6489e12c81cc6b467343de24">🇮🇳&emsp; Indiano</option>
        <option value="648920a489fa0bf325fbb3a3">🇯🇵&emsp; Japonês</option>
        
        <option value="648920a489fa0bf325fbb3a3">🇨🇳&emsp; Chinês</option>
        --><option value="6750b4f5be817c90ac1a61eb">Coreano</option>
        <option value="6750ce3e923d143fcbcefa60">Russo</option>
                <option value="6751bc4e5b541321319d9726">Grego</option>
<!--
        <option value="6516e1694ec552a43b95deb6">🇩🇪&emsp; Alemão</option>
        <option value="6516ea09c6fd2950eb4b416a">🇲🇦&emsp; Árabe</option>
        <option value="648920a489fa0bf325fbb3a3">🇮🇱&emsp; Hebraico</option> 
        <option value="6516e1eb4ec552a43b95eaaa">🌍&emsp; Esperanto</option>
        -->

      </select>

      <div class="sumido">
        <input class="input_texto" style="max-width: 600px; bottom: 0; position: fixed; margin-bottom: 15px;" placeholder="Ajude o Dekoreba e nos diga o que você achou."></input>
      </div>

    `

  prepara_home (modo_de_vinda)


/*
// Lógica para abrir/fechar o select customizado
document.querySelector('.selected').addEventListener('click', function() {
    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
});

// Lógica para selecionar uma opção e fechar o dropdown
document.querySelectorAll('.option').forEach(function(option) {
    option.addEventListener('click', function() {
        const selected = document.querySelector('.selected');
        selected.innerHTML = option.innerHTML; // Atualiza o valor do select
        document.querySelector('.options-container').style.display = 'none'; // Fecha o dropdown
    });
});

// Fecha o dropdown ao clicar fora
document.addEventListener('click', function(e) {
    const selectBox = document.querySelector('.select-box');
    alert("clocou")
    if (!selectBox.contains(e.target)) {
        document.querySelector('.options-container').style.display = 'none';
    }
});
*/

  const objeto = await preparacao_opcoes()
  // prepara_opcoes_3(objeto)
}

async function monta_opcoes(modo_de_vinda) {

  const stateObj = { tela_ativa: 'opcoes' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda })

  const cabecalho_rapido = cria_cabecalho_rapido('opcoes')

  document.getElementById('div_palco_index').innerHTML =  `
    
    ${cabecalho_rapido}

    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div> 

    <div id="container_loading" class="flex_row center container_loading" style="display: none;">
      <div class="loader"></div>
    </div>
      
    <div id="opcoes_recip_troca_foto" class="flex_col T1 center mostra_recip_pontuacao sumido" style="z-index: 1001;">

      <div class="flex_col mostra_pontuacao_caixinha" style="width: 500px; min-height: 5px; align-items: center; justify-content: center; padding: 10px;">

        <div class="flex_row T1" style="justify-content: flex-end; margin-bottom: 15px;">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="opcoes_popup_troca()"></i> 
        </div>


        <img id="opcoes_avatar_placeholder" src="imagens/placeholder_image.svg" class="mascara_circular" style="width: 400px;height: 400px; object-fit: cover;">

        <div class="flex_row T1 center">

 
          <label for="opcoes_carrega_avatar" class="botao opcoes_avatar_botao flex_row center" onclick="opcoes_carrega_temp()">
            Carregar Foto
          </label>

          <button class="botao opcoes_avatar_botao" onclick="opcoes_troca_avatar()">
            Confirmar
          </button>

        </div>
          
      </div>
    </div>


    <div class="flex_col T1 center recip">

      <div id="msg_sistema_opcoes" class="flex_row opcoes_msg_cima sumido" style="margin-bottom: 20px; display: none;">
        Para as alterações valerem, não se esqueça de apertar o botão Salvar Opções.
      </div>

      <div class="flex_row flex_col_m T1 largura_interna fundo_prancheta"> 

        <div class="flex_col T2 T1_m center sumido" style="padding-right: 15px;">

          <img id="opcoes_avatar_400" src="" alt="Foto de perfil" width="350" height="350px" class="opcoes_avatar">

          <form id="opcoes_formulario_avatar" action="/profile" method="post" enctype="multipart/form-data" class="flex_col T1 center">
          
            <input id="opcoes_carrega_avatar" type="file" name="avatar" class="sumido" onchange="opcoes_carrega_temp()" />

            <label for="opcoes_carrega_avatar" class="botao opcoes_avatar_botao flex_row center" style=" margin-top: 35px; width: 200px;">Carregar Foto</label>

          </form>
          
        </div>

        <div class="flex_col T1 T1_m">

          <div class="flex_row T1 center">
            <span class="flex_row T4 opcoes_titulo_input">Nome</span>
            <input id="opc_nome" type="text" class="input_texto_pequeno" value="">
          </div>

          <div class="flex_row T1 center">
            <span class="flex_row T4 opcoes_titulo_input">E-mail</span>
            <input id="opc_email" type="text" class="input_texto_pequeno" value="" readonly disabled>
          </div>



          <div class="flex_row T1 center">
            <button id="botao_alterar_email" class="botao bot_cabecalho opcoes_botao_senha">Alterar E-mail</button>
            <button id="botao_alterar_senha" class="botao bot_cabecalho opcoes_botao_senha">Alterar Senha</button>
          </div>

          

          <div class="flex_row T1 opcoes_recip_linha opcoes_separacao sumido">

            <i class="icon-facebook-squared"></i>
            <input id="opc_facebook_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('facebook')">

            <div id="opc_facebook_recip" class="T1">
              <input id="opc_facebook_input" type="text" value="" class="input_texto_pequeno" placeholder="facebook.com/usuario">
            </div>

          </div>
          <div class="flex_row T1 opcoes_recip_linha sumido">
            
            <i class="icon-instagram"></i>
            <input id="opc_instagram_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('instagram')">
            
            <div id="opc_instagram_recip" class="T1">
              <input id="opc_instagram_input" type="text" value="" class="input_texto_pequeno" placeholder="instagram.com/usuario">  
            </div>

          </div>
          
          <div class="flex_row T1 opcoes_recip_linha sumido">
          
            <i class="icon-youtube-play"></i>
            <input id="opc_youtube_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('youtube')">

            <div id="opc_youtube_recip" class="T1">
              <input id="opc_youtube_input" type="text" value="" class="input_texto_pequeno" placeholder="youtube.com/c/usuario">  
            </div>

          </div>

          <div class="flex_row T1 opcoes_recip_linha sumido">
            <i class="icon-twitter-1"></i>
            <input id="opc_twitter_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('twitter')">

            <div id="opc_twitter_recip" class="T1">
              <input id="opc_twitter_input" type="text" value="" class="input_texto_pequeno" placeholder="twitter.com/usuario">  
            </div>

          </div>


          <div class="flex_row T1 opcoes_recip_linha sumido">
            <i class="icon-linkedin-1"></i>
            <input id="opc_linkedin_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('linkedin')">
            
            <div id="opc_linkedin_recip" class="T1">
              <input id="opc_linkedin_input" type="text" value="" class="input_texto_pequeno" placeholder="linkedin.com/in/usuario">  
            </div>

          </div>


          <div class="flex_row T1 opcoes_recip_linha opcoes_separacao sumido">
            <i class="icon-sol_cheio" style="font-size: 33px; margin-right: -10px;"></i>
            <input type="radio" id="tema_diurno" name="diurno_noturno" class="opcoes_checkbox" value="diurno" onclick="">
            <span class="flex_row T1 opcoes_titulo_input">Modo Diurno</span>

          </div>

          <div class="flex_row T1 opcoes_recip_linha sumido">
            <i class="icon-lua_cheio" style="font-size: 33px; margin-right: -10px;"></i>
            <input type="radio" id="tema_noturno" name="diurno_noturno" class="opcoes_checkbox" value="noturno" onclick="">
            <span class="flex_row T1 opcoes_titulo_input">Modo Noturno</span>
          </div>


          <div class="flex_row T1 opcoes_recip_linha opcoes_separacao sumido">
            <input type="radio" id="distancia_curta" name="distancia" class="opcoes_checkbox" value="distancia_curta" onclick="test()">
            <span class="flex_row T1 opcoes_titulo_input">Bolt</span>
          </div>


          <div class="flex_row T1 opcoes_recip_linha sumido">
            <input type="radio" id="distancia_media" name="distancia" class="opcoes_checkbox" value="distancia_media" onclick="test()">
            <span class="flex_row T1 opcoes_titulo_input">5km</span>
          </div>


          <div class="flex_row T1 opcoes_recip_linha sumido">
            <input type="radio" id="distancia_longa" name="distancia" class="opcoes_checkbox" value="distancia_longa" onclick="test()">
            <span class="flex_row T1 opcoes_titulo_input">Maratona</span>
          </div>


          <div class="flex_row T1 center">
            <button class="botao bot_cabecalho opcoes_botao_senha" onclick="vai_filhao_2('logout');">
              <i class="icon-logout_cheio" style="font-size: 33px; margin-right: -10px;"></i> df Sair/logout </button>
          </div>

        </div>


        <div class="flex_row T1 center opcoes_recip_salvar sumido">
          <button class="botao" onclick="vai_filhao_2('opcoes_salva');">Salvar Opções</button>
        </div>

      </div>
    </div>

    <input id="input_email_invisivi" class="sumido" value="">
  `

  window.scrollTo(0, 0)
  checa_online()

  const objeto = await preparacao_opcoes()
  prepara_opcoes_2(objeto)
}

async function monta_perfil (id_perfil, modo_de_vinda) {

  if (id_perfil === 'teste') {
    // pega o id de uma var
    id_perfil = sessionStorage.getItem('id_usuario')
  }

  const cabecalho_rapido = cria_cabecalho_rapido('perfil')

  document.getElementById('div_palco_index').innerHTML = `

    ${cabecalho_rapido}

    <div id="mostra_recip_info" class="flex_col T1 center mostra_recip_info sumido">
      <div id="mostra_info" class="flex_col T1 mostra_info_caixinha">
          
      </div>
    </div>

    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">Estás offline, frô!</div>


    <div id="mostra_recip_info_opc" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div id="mostra_info_opc" class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_opcoes()"></i> 
        </div>


        <div class="flex_col T1 center caixinha_dentro" style="">

          <div class="flex_row flex_col_m T1 center" style="margin-top: 15px; margin-bottom: 25px;">

            <button id="bot_diurno" class="flex_row botao T2 T1_m center bot_padrao_inativo" onclick="altera_diurno_noturno('diurno')">
              <i class="icon-sol_cheio" style="font-size: 33px; margin-right: -10px;"></i> <span style="margin-left: 10px;">Modo Diurno</span>
            </button>

            <div id="bot_noturno" class="flex_row botao T2 T1_m center bot_padrao_ativo" onclick="altera_diurno_noturno('noturno')">
              <i class="icon-lua_cheio" style="font-size: 33px; margin-right: -10px;"></i> <span style="margin-left: 10px;">Modo Noturno</span>
            </div>
          </div>


          <div class="flex_row T1 center" style="margin-top: 35px;">
            <span class="flex_row T4 opcoes_titulo_input">Nome</span>
            <input id="opc_nome" type="text" class="input_texto_pequeno" value="">
          </div>

          <div class="flex_row T1 center">
            <span class="flex_row T4 opcoes_titulo_input">E-mail</span>
            <input id="opc_email" type="text" class="input_texto_pequeno" value="" readonly disabled>
          </div>


          <!-- Sumido mas parece que funciona bem, esse nomme de usuário. -->
          <div class="flex_row T1 center sumido">
            <span class="flex_row T4 opcoes_titulo_input">Usuário:</span>
            <input id="opc_email" type="text" class="input_texto_pequeno" value="" placeholder="Aparece na barra de endereço">
          </div>



          <div class="flex_row T1 center" style="margin-bottom: 35px;">
            <button id="botao_alterar_email" class="botao bot_cabecalho opcoes_botao_senha botao_engrenagem_home botao_sistema">Alterar E-mail</button>
            <button id="botao_alterar_senha" class="botao bot_cabecalho opcoes_botao_senha botao_engrenagem_home botao_sistema">Alterar Senha</button>
          </div>

          <div class="flex_row T1 opcoes_recip_linha opcoes_separacao" style="">

            <i class="icon-facebook-squared"></i>
            <input id="opc_facebook_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('facebook')">

            <div id="opc_facebook_recip" class="T1 sumido">
              <input id="opc_facebook_input" type="text" value="" class="input_texto_pequeno" placeholder="facebook.com/usuario">
            </div>

          </div>
          <div class="flex_row T1 opcoes_recip_linha">
            
            <i class="icon-instagram"></i>
            <input id="opc_instagram_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('instagram')">
            
            <div id="opc_instagram_recip" class="T1 sumido">
              <input id="opc_instagram_input" type="text" value="" class="input_texto_pequeno" placeholder="instagram.com/usuario">  
            </div>

          </div>
          
          <div class="flex_row T1 opcoes_recip_linha">
          
            <i class="icon-youtube-play"></i>
            <input id="opc_youtube_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('youtube')">

            <div id="opc_youtube_recip" class="T1 sumido">
              <input id="opc_youtube_input" type="text" value="" class="input_texto_pequeno" placeholder="youtube.com/c/usuario">  
            </div>

          </div>

          <div class="flex_row T1 opcoes_recip_linha">
            <i class="icon-twitter-1"></i>
            <input id="opc_twitter_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('twitter')">

            <div id="opc_twitter_recip" class="T1 sumido">
              <input id="opc_twitter_input" type="text" value="" class="input_texto_pequeno" placeholder="twitter.com/usuario">  
            </div>

          </div>


          <div class="flex_row T1 opcoes_recip_linha">
            <i class="icon-linkedin-1"></i>
            <input id="opc_linkedin_checkbox" type="checkbox" class="opcoes_checkbox" onclick="checkbox_opcoes('linkedin')">
            
            <div id="opc_linkedin_recip" class="T1 sumido">
              <input id="opc_linkedin_input" type="text" value="" class="input_texto_pequeno" placeholder="linkedin.com/in/usuario">  
            </div>

          </div>


        <div id="opcoes_recip_troca_foto" class="flex_col T1 center" style="z-index: 1001; margin-top: 35px;">

          <div class="flex_col T1" style="min-height: 5px; align-items: center; justify-content: center; padding: 10px;">

            <div class="flex_row T1 sumido" style="justify-content: flex-end; margin-bottom: 15px;">
              <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="opcoes_popup_troca()"></i> 
            </div>

            <img id="opcoes_avatar_400" src="" alt="Foto de perfil" width="250" height="250px" class="opcoes_avatar sumido">

            <img id="opcoes_avatar_placeholder" src="../imagens/placeholder_image.svg" class="mascara_circular T1 A1" style="max-width: 400px; max-height: 400px; object-fit: cover;">

            <div class="flex_row T1 center">
     
              <label for="opcoes_carrega_avatar" class="botao opcoes_avatar_botao flex_row center botao_sistema" onclick="opcoes_carrega_temp();">
                Carregar Foto
              </label>

              <!-- Talvez esse botão de Confirmar não precise mais, por isso está sumido,
              pois estamos carregando a opcoes_troca_avatar() ao final da função opcoes_carrega_temp() -->

              <button class="botao opcoes_avatar_botao sumido" onclick="opcoes_troca_avatar()">
                Confirmar
              </button>

            </div>
              
          </div>
        </div>
          <hr class="flex_row T1 center" style="background: grey; height: 2px; margin-bottom: 15px;" />

        <div class="flex_row T1 center opcoes_recip_salvar" style="margin: 0px;">
          <button class="botao T1 botao_sistema" onclick="vai_filhao_2('opcoes_salva'); mostra_opcoes(); ">Salvar Opções</button>
        </div>
          <hr class="flex_row T1 center" style="background: grey; height: 2px; margin-top: 15px; margin-bottom: 15px;" />


        <form id="opcoes_formulario_avatar" action="/profile" method="post" enctype="multipart/form-data" class="flex_col T1 center sumido">
              
          <input id="opcoes_carrega_avatar" type="file" name="avatar" class="sumido" onchange="opcoes_carrega_temp()" />
        
        </form>
          

          <div class="flex_row T1 center">
            <button class="botao botao_sistema" style="background: red; color: white; border-radius: 10px;" onclick="vai_filhao_2('logout');"><i class="icon-sai_cheio"></i> Sair / logout </button>
          </div>

        </div>

      </div>
    </div> 
    <input id="input_email_invisivi" class="sumido" value="">

    <!--
    <div id="perfil_recip_colegas" class="flex_col T1 center mostra_recip_info_2">

      <div class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_checkpoint('mult_esc')"></i> 
        </div>

        <div class="flex_col T1 center caixinha_dentro" style="">
          Seguidores<br>
          Seu progresso foi salvo.<br>

        </div>

      </div>
      
    </div> 
    -->

    <div id="perfil_recip_seguidores" class="flex_col T1 center mostra_recip_pontuacao sumido" style="z-index: 1001;">
      <div class="flex_row mostra_pontuacao_caixinha">

        <div class="flex_row T1" style="justify-content: flex-end; margin-bottom: 15px;">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="perfil_seguidores()"></i> 
        </div>

        <div class="flex_row T1 center" style="margin-bottom: 15px; margin-top: -10px; font-weight: bold;">Seguidores</div>
        <div id="recip_string_seguidores">
        </div>
        
      </div>
    </div>

    <div id="perfil_recip_seguidos" class="flex_col T1 center mostra_recip_pontuacao sumido" style="z-index: 1001;">
      <div class="flex_row mostra_pontuacao_caixinha">

        <div class="flex_row T1" style="justify-content: flex-end; margin-bottom: 15px;">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="perfil_seguidos()"></i> 
        </div>

        <div class="flex_row T1 center" style="margin-bottom: 15px; margin-top: -10px; font-weight: bold;">Seguindo</div>
        <div id="recip_string_seguidos">
        </div>
      </div>
    </div>

    <div class="flex_col T1 center recip" style="padding-left: 15px; padding-right: 15px;">

      <div class="flex_col T1 center largura_interna fundo_prancheta" style="padding: 0px;">
        
        <div class="flex_row T1" style="">

          <img id="img_perfil_avatar" src="../imagens/avatar-default.jpg" class="perfil_avatar" height="100" width="100">

          <div class="flex_col T1 perfil_nome" style="">

            <span id="span_nome" class="perfil_span_nome">&nbsp;</span>

            <div id="recip_redes_sociais_perfil" class="flex_row T1 perfil_redes_sociais">
              <div id="recip_perfil_facebook"><!-- {objeto.facebook} --></div>
              <div id="recip_perfil_instagram"><!-- {objeto.instagram} --></div>
              <div id="recip_perfil_youtube"><!-- {objeto.youtube} --></div>
              <div id="recip_perfil_twitter"><!-- {objeto.twitter} --></div>
              <div id="recip_perfil_linkedin"><!-- {objeto.linkedin} --></div>
              <div id="recip_perfil_email"><!-- {objeto.email} --></div>
            </div>

            <div class="flex_row T1 qtd_colegas" style="display: none;" onclick="aparece_popup_colegas();">
              <span id="qtd_colegas" class="perfil_qtd_seguidores"></span>
              <span id="colegas_escrito" class="perfil_seguidores_escrito">Colegas de Turma</span>
            </div>
            
          </div>

          <div class="flex_row center">
            <botao class="flex_row botao_engrenagem_home">
              <i class="icon-engrenagem_cheio" style="font-size: 40px;" onclick="mostra_opcoes()"></i>
            </botao>
          </div>
         
        

          

        </div>


        <div class="flex_row T1 center largura_interna" style="height: 45px; max-width: 750px; margin-top: 50px;">
          <input id="input_texto_busca_usuario" type="text" class="input_texto T1" style="margin: 0px;" placeholder="Buscar usuário" />
          <button id="botao_busca_usuario" class="botao" style="margin: 0px; margin-left: 15px; font-size: 30px;">
            <i class="icon-lupa_vazio"></i>
          </button>
        </div>


        <!-- Esse botão abaixo está sumido, mas funciona que é uma beleza. -->
        <div id="div_botao_seguir" class="flex_row T1 perfil_recip_bto_seguir sumido">
          <!-- {objeto.botao_seguir} -->
        </div>
        
        <div id="botao_criar">
          <!-- {objeto.botao_criar} -->
        </div>

        <div id="perfil_recip_decorebas_proprias" class="flex_row flex_col_m T1 center perfil_recip_decorebas">
          
          <!-- {objeto.string_decorebas_proprias} -->
        </div>


        <div id="recip_decorebas_praticadas" class="flex_col T1 center largura_interna">

          
          <!-- AQUI SERÃO AS DECS PRATICADAS -->

          <div class="flex_row T1 fundo_nivel" style="background: (--cor_dekoreba); border-radius: 10px; padding: 0px; height: auto;">

            <div class="flex_col T2" style="background-image: url('../imagens/fundos_dekorebas/arabe.jpg'); background-size: cover; background-position: center; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
              
            </div>

     
            
          </div>

        </div>

      </div>

    </div>
 `

  window.scrollTo(0, 0)

  checa_online()
  
  alimenta_perfil (id_perfil, modo_de_vinda)

  const objeto = await preparacao_opcoes()
  prepara_opcoes_2(objeto)
}

async function monta_decoreba_cria (obj, msg, modo_de_vinda) {

  // Tratamos o obj_teste. Dificilmente terá outra função monta com funções antes das paradas.
  // monta_decoreba_cria() é um caso especial.

  zera_obj_teste()  // Zeramos o obj_teste, aí, se vir um obj é pq veio do get, do servidor.
  obj_teste = (obj) ? obj : obj_teste // Se não veio o obj, é pq é uma dekoreba nova, então o deixamos o obj_teste zerado msm.

  const stateObj = { tela_ativa: 'decoreba_cria' }

  verifica_url({
    stateObj: stateObj,
    endereco: document.location.href,
    id_decoreba: obj_teste._id,
    modo_de_vinda: modo_de_vinda
  })

  const cabecalho_rapido = cria_cabecalho_rapido('cria')

  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = (msg === 'id_nao_valido') ? cria_faz_pagina_nao_disponivel() : `

    ${cabecalho_rapido}

    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div>

    <div id="recip_popup_verbo" class="flex_col T1 center mostra_recip_pontuacao" style="z-index: 1000; display: none;">
      <div class="flex_row T1 barra_x_popup largura_interna">
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_verbo()"></i> 
      </div>
      
      <div id="recip_popup_verbo_dentro" class="flex_col T1 largura_interna mostra_pontuacao_caixinha center" style="align-items: center; border-top-left-radius: 0px; border-top-right-radius: 0px; max-width: 1024px;">
        
        <div class="flex_row T1 center" style="">

          <div class="flex_col T2 center">
            <div class="flex_row center botao bot_inativo" style="">
              Português
            </div>

            <input class="input_texto" style="border: 1px solid lightgrey;" placeholder="Verbo no infinitivo. Ex: viver, andar.">
          </div>
          
          <div class="flex_col T2 center">
            <div class="flex_row center botao bot_inativo" style="">
              Guaraní
            </div>
          </div>

        </div>
      </div>
    </div>

    <div id="recip_popup_descricao_fora" class="flex_col T1 center mostra_recip_pontuacao" style="z-index: 1000; display: none;">
      <div class="flex_row T1 barra_x_popup sumido">
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_descricao()"></i> 
      </div>
      
      <div id="recip_popup_descricao_dentro" class="flex_col T1 mostra_pontuacao_caixinha center" style="align-items: center; border-top-left-radius: 0px; border-top-right-radius: 0px;">

      </div>

    </div>

    <div id="recip_popup_excluir_palavras" class="flex_col T1 center mostra_recip_pontuacao sumido" style="z-index: 1000; ">
      <div class="flex_row T1 barra_x_popup">
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_excluir_palavras()"></i> 
      </div>
      <div id="recip_interno_popup_excluir_palavras" class="flex_col T1 mostra_pontuacao_caixinha center" style="align-items: center; border-top-left-radius: 0px; border-top-right-radius: 0px;">
      </div>
    </div>

    <div id="recip_popup_palavra" class="flex_col T1 center mostra_recip_pontuacao sumido" style="z-index: 1000;">
      <div class="flex_row T1 barra_x_popup">
        <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_pop_palavra()"></i> 
      </div>
      <div id="recip_interno_popup_palavras" class="flex_col T1 mostra_pontuacao_caixinha center" style="align-items: center; border-top-left-radius: 0px; border-top-right-radius: 0px;">
      </div>
    </div>

    <div id="mostra_recip_pontuacao" class="flex_col T1 center mostra_recip_pontuacao sumido" style="z-index: 2000; background: orange;">
      
      <div class="flex_row T1 mostra_pontuacao_caixinha">

        <div class="flex_row T1" style="justify-content: flex-end; margin-bottom: 15px;">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_pontuacao()"></i> 
        </div>
        
        Escolha um alfabeto para adicionar à sua dekoreba.
        <br>
        <div class="flex_row center botao" style="border: 2px solid purple; height: 50px; border-radius: 15px; background: white; color: black; min-width: 150px; margin: 5px;">
          ربية
        </div>
      </div>
    
    </div>

    <div id="recip_decoreba_cria" class="flex_col T1 center recip" style="padding-bottom: 50px;">

      <div class="flex_col T1 center largura_interna fundo_prancheta" style="background: var(--background_site); color: var(--color_site);">

        <div class="flex_row T1 center cria_recip_input">

          <input id="titulo_nova_decoreba" class="input_texto" placeholder="Título da Nova Decoreba" value="">

          <!-- Esse margin-top nos x é pq o input_texto, do lado, tem um margin-top: 10px tb, não sei o porquê -->
          <i id="i_elimina_decoreba" class="flex_row center x_fechar_ativo icon-cancel-circled" style="margin-top: 10px;" onclick="elimina_decoreba('${obj_teste._id}')"></i>
          

        </div>

        <div id="idiomas_insere" class="flex_row T1 cria_recip_input">

          <div class="flex_col T2" style="margin-right: 5px;">
            <div id="recip_select_idi_1" class="flex_col T1">
            </div>
            
            <input id="outro_idioma_1" type="text" class="input_texto T1 cria_idi_1" style="margin-right: 10px; display: none;">
          </div>
          
          <div class="flex_col T2" style="margin-left: 5px;">
            <div id="recip_select_idi_2" class="flex_col T1">
            </div>
            
            <input id="outro_idioma_2" type="text" class="input_texto T1 cria_idi_1" style="margin-left: 10px; display: none;">
          </div>

        </div>
        
        <div style="margin-top: 15px; margin-bottom: 10px;">
          Sistemas de escrita
        </div>

        <div class="flex_row T1" style="height: 70px; position: relative; overflow-x: auto;">
        
        <div class="flex_row T2 div_deslizavel" style="overflow-x: auto; border-radius: 5px; margin-right: 5px;">
          
          <div id="recip_sist_escrita_1" class="flex_row center" style="flex-wrap: nowrap; scroll-behavior: smooth; position: relative;">

          </div>

        </div>
        
        <div class="flex_row T2 div_deslizavel" style="overflow-x: auto; border-radius: 5px; margin-left: 5px;">
          <div id="recip_sist_escrita_2" class="flex_row  center" style="flex-wrap: nowrap; scroll-behavior: smooth; position: relative;">
          </div>
        </div>

        </div>

        <div class="flex_row T1 center sumido" style="margin-top: 0px;">
          
          <div class="flex_row T2 center">
            <div class="flex_row center botao" style="border-radius: 100%; height: 40px; width: 40px;" onclick="adicionar_alfabeto(1)">+</div>
          </div>

          <div class="flex_row T2 center">
              <div class="flex_row center botao" style="border-radius: 100%; height: 40px; width: 40px;"onclick="adicionar_alfabeto(2)">+</div>
          </div>

        </div>
        
        <span class="hr_divisoria"></span>

        <div class="flex_row T1 center cria_recip_titulo_cap">

          <div id="cria_botao_info" class="flex_row T1 center botao" style="font-size: 27px; margin: 0px; margin-top: 10px; margin-left: 0px; margin-bottom: 10px;" onclick="aparece_insere_info()">

            <i class="icon-info-circled"></i> <span id="cria_span_inserir" style="font-size: 21px; margin-left: 10px;">Inserir informações sobre o capítulo</span>

          </div>

          <i id="x_excluir_info" class="icon-cancel-circled" style="font-size: 33px;" onclick="elimina_info('clicou_x_apaga_info')"></i>

        </div>

        <div id="recip_select" class="flex_row T1">
        </div>
          
        <div id="recip_recip_capitulo" class="flex_col T1">
        </div>
        
        <span class="hr_divisoria"></span>
        
        <div class="flex_row T1 center cria_recip_botoes">

          <button class="botao cria_botao" onclick="insere_palavra('nova_palavra')">Adicionar Palavra</button>
          <!-- <button class="botao cria_botao" onclick="mostra_mexidos()">Adicionar Capítulo</button> -->
          <button class="botao cria_botao" onclick="adiciona_capitulo()">Adicionar Capítulo</button>
          <button class="botao cria_botao" onclick="adiciona_verbo()">Adicionar Verbo</button>

          <!-- <button class="botao cria_botao" onclick="log_de_coisas()">Log de Coisas</button> -->

        </div>

        <div class="flex_row T1 center cria_recip_botoes">
        
          <input type="color" id="cor_dekoreba" name="cor_dekoreba" value="" onchange="define_cor_letras()">
          <label for="cor_dekoreba" style="margin-left: 15px;">Escolha uma cor para sua dekoreba</label>
          
        </div>


        <span class="cria_recip_botoes sumido">Marcações / Tags</span>
        
        <div id="recip_tags" class="flex_row flex_col_m T1 center" style="margin-top: 50px; ">

          <div class="flex_row center">
            <input id="marcacao_1" type="text" class="input_texto cria_marcacao" placeholder="#marcação1" value="" />
          </div>
          
          <div class="flex_row center">
            <input id="marcacao_2" type="text" class="input_texto cria_marcacao" placeholder="#marcação2" value="" />
          </div>
          
          <div class="flex_row center">
            <input id="marcacao_3" type="text" class="input_texto cria_marcacao" placeholder="#marcação3" value="" />
          </div>
          
          <div class="flex_row center">
            <input id="marcacao_4" type="text" class="input_texto cria_marcacao" placeholder="#marcação4" value="" />
          </div>
          
          <div class="flex_row center">
            <input id="marcacao_5" type="text" class="input_texto cria_marcacao" placeholder="#marcação5" value="" />
          </div>
        </div>

      </div>

      <button class="botao cria_botao" onclick="salva_dekoreba();" style="margin: 35px;">Salvar Dekoreba</button>
  
    </div>

    </div>
    
    </div>
  
    <div id="recip_decoreba_criada" class="flex_col T1 center recip sumido">

      <span class="cria_parabens">Meus mais sinceros parabéns.</span>
      <div id="recip_bot_decoreba_criada"></div>

    </div>

    <div id="recip_insere_info" class="flex_row T1 center" style="background: rgba(0, 0, 0, 0.3); z-index: 1000; height: 100vh; position: fixed; display: none; padding: 10px;">

      <div class="container">
        <div class="options">
          <!-- Text Format -->
          <button id="bold" class="option-button format">
            <i class="fa-solid fa-bold"></i>
          </button>
          <button id="italic" class="option-button format">
            <i class="fa-solid fa-italic"></i>
          </button>
          <button id="underline" class="option-button format">
            <i class="fa-solid fa-underline"></i>
          </button>
          <button id="insertUnorderedList" class="option-button">
            <i class="fa-solid fa-list"></i>
          </button>
          <!-- Undo/Redo -->
          <button id="undo" class="option-button">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button id="redo" class="option-button">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
          <!-- Alignment -->
          <button id="justifyLeft" class="option-button align">
            <i class="fa-solid fa-align-left"></i>
          </button>
          <button id="justifyCenter" class="option-button align">
            <i class="fa-solid fa-align-center"></i>
          </button>
          <button id="justifyRight" class="option-button align">
            <i class="fa-solid fa-align-right"></i>
          </button>
          <button id="justifyFull" class="option-button align">
            <i class="fa-solid fa-align-justify"></i>
          </button>
          <!-- Headings -->
          <select id="formatBlock" class="adv-option-button">
            <option value="p">Texto Normal</option>
            <option value="H1">Título</option>
            <option value="H2">Sub-título</option>
          </select>
          <!-- Font -->
          <i id="insere_imagem" class="fa-solid fa-image" class="adv-option-button"></i>
          <i id="insere_video" class="fa-solid fa-video" class="adv-option-button"></i>
          <!-- Color -->
          <div class="input-wrapper">
            <input type="color" id="foreColor" class="adv-option-button" />
          </div>
        </div>

        <div id="text-input" contenteditable="true" style="overflow-y: auto; font-size: 19px;">
          
        </div>
        
        <div class="flex_row T1 center" style="">

          <div id="cria_bot_salva_info" class="flex_row botao T2 center" onclick="some_insere_info()" style='display: flex;'>
            Salvar Informações
          </div>

        </div>
      </div>
       
    </div>
  `

  window.scrollTo(0, 0)
  checa_online()

  prepara_decoreba_cria()
}

async function monta_decoreba_mostra (id_decoreba, modo_de_vinda) {

  // GAMBIARRA! Essa id_dekoreba_corrente é uma var que nem deveria existir em uma programação funcional.
  id_dekoreba_corrente = id_decoreba

  escolhas_dec = {} // Zeramos essa var global pois ela carrega valores da última dekoreba praticada.

  const stateObj = { tela_ativa: 'decoreba_mostra' }

  verifica_url({
    stateObj: stateObj,
    endereco: document.location.href,
    modo_de_vinda: modo_de_vinda,
    id_decoreba: id_decoreba
  })

  const cabecalho_rapido = cria_cabecalho_rapido('mostra')
  /*
  const joga = (escolhas_dek.joga_ou_treina === 'joga') ? 'bot_ativo' : 'bot_inativo'
  const atividade_treina = (escolhas_dek.joga_ou_treina === 'treina') ? 'bot_ativo' : 'bot_inativo'
  */

  document.getElementById('div_palco_index').innerHTML = `
      
    ${cabecalho_rapido}

    <div id="recip_verbo_popup" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div id="info_verbo_popup" class="flex_col T1 mostra_info_caixinha_2" style="max-width: 600px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_verbo()"></i> 
        </div>

        <div id="verbo_popup_dentro" class="flex_col T1 center caixinha_dentro" style="">

          
        </div>

      </div>
      
    </div> 


    <div id="recip_popup_prepara_teste" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_tempo_info()"></i> 
        </div>

        <div id="recip_popup_prepara_teste_dentro" class="flex_col T1 center caixinha_dentro" style="">
          
          <span class="T1">Está preparado para fazer o teste?</span>
          <span class="T1">Lembre-se que você pode realizar apenas <strong>um</strong> teste por dia.</span>
          <span class="T1">Cada palavra acertada, é marcada como decorada.</span>

          <span class="T1">Boa sorte!</span>

          <button class="flex_row center botao">Iniciar o Teste</button>
        </div>
      </div>
  
    </div>

    <div id="recip_popup_cria_frase" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2 T1 largura_interna">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_cria_frase()"></i> 
        </div>

        <div id="recip_popup_cria_frase_dentro" class="flex_col T1 center caixinha_dentro" style="">
          
          <button id="botao_gera_frase" class="flex_row center botao">Gerar uma frase para traduzir</button>
          
          <div id="recip_capitulos_frase" class="flex_col T1 center">
            

          </div>

          <div id="recip_botoes_dificuldades" class="flex_row T1 center">
            <button id="bot_frase_curta" class="botao bot_ativo" onclick="tamanho_frase('frase_curta')">Frase curta</button>
            <button id="bot_frase_longa" class="botao bot_inativo" onclick="tamanho_frase('frase_longa')">Frase longa</button>
            <button id="bot_paragrafo" class="botao bot_inativo" onclick="tamanho_frase('paragrafo')">Parágrafo</button>

          </div>
          
          <div id="recip_traduzir_frase" class="flex_col T1 sumido">

            <span class="T1">Traduza a frase a seguir.</span>

            <span id="span_frase_a_traduzir" style="font-size: 20pt; margin: 15px;"></span>
            
            <input id="traducao_a_analizar" type="text" class="input_texto" maxlength="100"/>
            <div class="flex_row T1 sumido" style="justify-content: flex-end; font-size: 16px; margin-top: -10px;">
              <p id="contador">0/100</p>
            </div>

            <span id="span_resposta_traducao" type="text" class="" style="margin-top: 15px; font-size: 15pt;"></span>

            <div class="flex_row T1 center" style="font-size: 22px;">
              <span id="span_frase_traduzida"></span>
            </div>

            <div id="div_palavras_da_frase" class="flex_col T1 center">
            </div>

            <div class="flex_row T1 center">
            <button id="botao_analiza_traducao" class="flex_row center botao">Analizar Tradução</button>

            <button id="bot_cria_frase_start" class="flex_row center botao sumido" onclick="apertou_startao('${id_decoreba}');">Iniciar a Prática</button>
            </div>

          </div>
          

        </div>
      </div>  
    </div>


    <div id="recip_popup_tabela" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_tabela()"></i> 
        </div>

        <div id="recip_popup_tabela_dentro" class="flex_col T1 center caixinha_dentro" style="">
          

        </div>

        
      </div>
  
    </div>

    <div id="recip_popup_tempo_info" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_tempo_info()"></i> 
        </div>

        <div id="recip_popup_tempo_info_dentro" class="flex_col T1 center caixinha_dentro" style="">
          <div class="flex_col T1">
            <h2 id="h2_modo" style="margin-bottom: -15px;"></h2>
            <h3 id="h3_tempo" style="color: grey;"></h2>
          </div>

          <div id="informacoes_tempo_verbal"></div>
        </div>
      </div>
  
    </div>


    <div id="recip_joga_ou_treina" class="flex_col T1 center mostra_recip_info_2 sumido">

        <div class="flex_col mostra_info_caixinha_2">

          <div class="flex_row T1 barra_superior_popup_sombra">
            <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_mostra('joga_ou_treina')"></i> 
          </div>

          <div id="recip_joga_ou_treina_dentro" class="flex_col T1 center caixinha_dentro">

          </div>
        </div>
  
    </div>

    <div id="recip_modos_jogo" class="flex_col T1 center mostra_recip_info_2 sumido">

        <div class="flex_col mostra_info_caixinha_2">

          <div class="flex_row T1 barra_superior_popup_sombra">
            <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_mostra('modalidades')"></i> 
          </div>

          <div id="recip_modos_jogo_dentro" class="flex_col T1 center caixinha_dentro">

          </div>
        </div>
  
    </div>

    <div id="recip_popup_verbo_confere" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="confere_se_completou_verbo()"></i> 
        </div>

        <div id="recip_popup_verbo_confere_dentro" class="flex_col T1 center caixinha_dentro">
        </div>
      </div>  

    </div>

    <div id="recip_popup_verbo_parabens" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_verbo_parabens()"></i> 
        </div>

        <div id="recip_popup_verbo_parabens_dentro" class="flex_col T1 center caixinha_dentro">

          Meus mais sinceros parabéns!!<br>
          Você completou corretamente esse treinamento de conjugação verbal.<br>
          Tente novamente com outra conjugação, ou vá fazer outra coisa da vida!!<br>
          Forte abraço, meu chapa!
        </div>
      </div>  

    </div>

    <div id="recip_orientacao_escrita" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_mostra('orientacao')"></i> 
        </div>

        <div id="recip_orientacao_escrita_dentro" class="flex_col T1 center caixinha_dentro">
        </div>
      </div>  
    </div>

    <div id="recip_alfabetos_escrita" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_mostra('alfabetos')"></i> 
        </div>

        <div id="recip_botoes_alfa_escr" class="flex_col T1 center caixinha_dentro">
        </div>
      </div>
    </div>

    <div id="recip_pontos" class="flex_col T1 center mostra_recip_info_2 sumido" style="padding: 10px;">

      <div class="flex_col T1 mostra_info_caixinha_2" style="max-width: 500px;">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="mostra_pontos()"></i>
        </div>

        <div id="recip_pontos_dentro" class="flex_col T1 center caixinha_dentro">

          <div class="flex_row T1 center" style="margin-bottom: 20px;">

            <div id="botao_porcento" class="flex_row T2 center botao bot_ativo" onclick="pontos_ou_porcento('porcento')"><span style="font-size: 27px; font-weight: bold;">%</span></div>
            <div id="botao_pontos" class="flex_row T2 center botao bot_inativo" onclick="pontos_ou_porcento('pontos')"><i class="icon-ok" style="font-size: 27px;"></i>
            </div>

          </div>
          
          <div class="flex_row T1" style="margin-bottom: 10px;">
            <div class="flex_row T2">
              
            </div>
            <div class="flex_row T4 center">
              <i class="icon-multiplas_escolhas" style="font-size: 33px;"></i>
            </div>
            <div class="flex_row T4 center">
              <i class="icon-escrever" style="font-size: 33px;"></i>
            </div>
          </div>

          <div id="recip_capitulos_trofeus" class="flex_col T1 center">
          </div>

        </div>
      </div>

    </div>


    <div id="faixa_offline" class="flex_row T1 center aviso_offline sumido">
      Estás offline, frô!
    </div> 

    <div id="mostra_recip_info" class="flex_col T1 center mostra_recip_info sumido" style="">
      <div id="mostra_info" class="flex_col T1 mostra_info_caixinha">
          
      </div>
    </div>


    <!--
    <div id="recip_decoreba_mostra" class="flex_col T1 center recip" style="justify-content: flex-start; background-image: url('../imagens/fundos_dekorebas/anime_girl.jpg'); background-size: cover;  background-repeat: no-repeat; background-attachment: fixed; background-position: center; ">
    -->

    <div id="recip_decoreba_mostra" class="flex_col T1 center recip" style="justify-content: flex-start;">

      <div class="flex_col T1 center largura_interna fundo_prancheta" style="background: var(--fundo_carta); padding: 0px; padding-bottom: 25px; margin: 0px;">
        
        <div id="recip_img_fundo_dekoreba" class="flex_row T1 center mostra_topo_decoreba" style="height: 400px;">
        </div>
        
        <span id="span_titulo" style="font-size: 50px; font-weight: bold;  margin-top: 30px; margin-bottom: 5px;"></span>

        <div class="flex_row T1 center" style="padding: 10px; max-width: calc(60% + 147px);">
          <div class="flex_row T1 listra_porcentagem listra_porc_inativa largura_interna" style="margin: 0px; margin-bottom: 30px;">

            <span id="titulo_barra_progresso" class="interior_listra_porcentagem" style="width: 30%; background: grey; min-height: 5px; border-radius: 7px;">
            </span>

          </div>
        </div>
          
        

          <div class="flex_col T1 center largura_interna fundo_nivel sumido" style="max-width: calc(60% + 147px); height: auto; padding: 10px;">
              
            <div class="flex_col T1" style="padding: 10px;">


              <span style="font-size: 15pt; display: none;">Nível 7</span>

              
            </div>

            <div class="flex_row flex_col_m T1" style="align-items: flex-start; ">

              <div class="flex_col T2 T1_m" style="align-items: flex-end; padding: 10px;">

                <div class="flex_row T1 sumido" style="font-style: italic; margin-bottom: 10px;">Múltipla Escolha</div>

                <div class="flex_row T1 sumido">
                  <div class="flex_row T2" style="min-width: 225px;">
                    Liberadas
                  </div>
                  <div class="flex_row T4 center">
                    <span id="mostra_soma_liberadas_mult"></span>
                  </div>
                  <div>
                    /
                  </div>
                  <div class="flex_row T4 center">
                    <span id="mostra_total_palavras_mult"></span>
                  </div>
                </div>

                <div class="flex_row T1 sumido">

                  <div class="flex_row T2" style="min-width: 225px;">
                    <span>Decoradas</span>
                  </div>
                  <div class="flex_row T4 center">    
                    <span id="mostra_soma_decoradas_mult"></span>
                  </div>
                  <div>
                    /
                  </div>
                  <div class="flex_row T4 center">
                      <span id="mostra_total_decoradas_mult"></span>
                    </div>
                  </div>
                </div>

              <div class="flex_col T2 T1_m" style="align-items: flex-end; padding: 10px;">

                <div class="flex_row T1 sumido" style="font-style: italic; margin-bottom: 10px;">Escrita</div>

                <div class="flex_row T1 sumido">
                  <div class="flex_row T2" style="min-width: 225px;">
                    Liberadas
                  </div>
                  <div class="flex_row T4 center">
                    <span id="mostra_soma_liberadas_escr"></span>
                  </div>
                  <div>
                    /
                  </div>
                  <div class="flex_row T4 center">
                    <span id="mostra_total_palavras_escr"></span>
                  </div>
                </div>

                  <div class="flex_row T1 sumido">
                    <div class="flex_row T2" style="min-width: 225px;">
                      <span>Decoradas</span>
                    </div>
                    <div class="flex_row T4 center">
                      <span id="mostra_soma_decoradas_escr"></span>
                    </div>
                    <div>
                      /
                    </div>
                    <div class="flex_row T4 center">
                      <span id="mostra_total_decoradas_escr"></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>


            <div>
              
            </div>
        
            <div class="flex_row T1 center recip_bots_modos_decoreba" style="margin-bottom: 50px; max-width: calc(60% + 147px);">

              <div class="flex_row flex_col_m T1 center"  style="padding: 0px; height: 100%;">

                <div id="recip_bot_decoreba_alfabeto" class="flex_col T1 center mostra_botoes">
                  <div id="botao_decoreba_alfabeto" class="flex_row botao T1 center bot_ativo" style="font-size: 24px; height: 60px;" onclick="geral_ou_verbo('alfabeto')">
                    Alfabeto
                  </div>
                  
                  <div class="flex_row T1" style="background: #e0e0e0; min-height: 5px; padding: 2px; border-radius: 10px; margin-top: -10px; display: none;">
                    <span id="span_porcentagem_alfabeto" style="background: #b44efc; min-height: 5px; border-radius: 7px;"></span>
                  </div>
                </div>


                <div class="flex_col T1 center mostra_botoes">
                  <div id="botao_decoreba_geral" class="flex_row botao T1 center bot_inativo" style="font-size: 24px; height: 60px;" onclick="geral_ou_verbo('geral')">
                    Palavras
                  </div>
                  
                  <div class="flex_row T1" style="background: #e0e0e0; min-height: 5px; padding: 2px; border-radius: 10px; margin-top: -10px; display: none;">
                    <span id="span_porcentagem_geral" style="background: #b44efc; min-height: 5px; border-radius: 7px;"></span>
                  </div>
                </div>

                <div id="recip_bot_decoreba_verbos" class="flex_col T1 center mostra_botoes">
                  <div id="botao_decoreba_verbos" class="flex_row botao T1 center bot_inativo" style="font-size: 24px; height: 60px;" onclick="geral_ou_verbo('verbo')">
                    Conj. Verbal
                  </div>

                  <div class="flex_row T1" style="background: #e0e0e0; min-height: 5px; padding: 2px; border-radius: 10px; margin-top: -10px; display: none;">
                    <span id="span_porcentagem_verbos" style="background: #b44efc; min-height: 5px; border-radius: 7px;"></span>
                  </div>
                </div>

                <div class="flex_col T1 center mostra_botoes">
                  <div id="botao_decoreba_frases" class="flex_row botao T1 center bot_inativo" style="font-size: 24px; height: 60px;" onclick="geral_ou_verbo('frases'); traducao_frases();">
                    Frases
                  </div>
                </div>

                
              </div>
            </div>

            <!-- Esse recip_botoes_valer_treino tá sumido pq tamo vendo se tirar os só treino dá bão. -->
            <div id="recip_botoes_valer_treino" class="flex_row T1 center sumido" style="margin-bottom: 25px; margin-top: -50px; padding: 15px;">

              <div class="flex_col T4 T2_m center" style="margin-right: 25px;">
                <div id="botao_decoreba_pra_valer" class="flex_row botao T1 center bot_ativo" style="font-size: 20px; height: 40px;" onclick="geral_ou_verbo('pra_valer')">
                  Pra Valer
                </div>
              </div>

              <div class="flex_col T4 T2_m center">
                <div id="botao_decoreba_outros" class="flex_row botao T1 center bot_inativo" style="font-size: 20px; height: 40px;" onclick="geral_ou_verbo('outros')">
                  Outros Treinos
                </div>
              </div>

            </div>


            
          <div class="flex_col T1 center" style="max-width: calc(60% + 147px);">


            <div id="div_recip_string_capitulos" class="flex_col T1 center" style="margin-top: 0px;">

            </div>
              
          </div>
          
          <div id="recip_verbos" class="flex_col T1 center largura_interna sumido" style="padding: 10px;">

          </div>


      </div>
    `

  window.scrollTo(0, 0)
  checa_online()

  prepara_decoreba_mostra (id_decoreba)
}

async function monta_decoreba_jogo (item, i, id_decoreba, i_capitulo, id_usuario, avatar, idioma_1, idioma_2, titulo, decoreba_foi_praticada, modo_de_vinda) {

  const stateObj = { tela_ativa: 'decoreba_jogo' }
  
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: modo_de_vinda })
  
  if (!id_decoreba) {
    window.location.href = 'https://192.168.0.127:3004/home';
    return
  }

  loading('loading...')
  document.body.style.overflow = 'auto' // Destrava a tela travada das opções popup de antes do jogo.
  const dados = await vai_filhao_2('decoreba_jogo', `${id_decoreba}`)

  // Zeramos as respostas
  // Aqui zeramos ao carregar o index e ao carregar o monta_decoreba_jogo, acho que tá errado.
  // O bom seria carregar só uma vez, preciso ver isso aí.

  respostas_corretas = 0
  respostas_erradas = 0

  resps_corretas_escritas = 0
  resps_erradas_escritas = 0
  
  meta_corretas = 25
  meta_erradas = 5

  // Pegaremos as var orientacao_idiomas_global e distancia_global aqui mesmo. Não é muito belo mas waréva.

  if (distancia_global === 'distancia_curta') meta_corretas = 15
  if (distancia_global === 'distancia_media') meta_corretas = 50
  if (distancia_global === 'distancia_longa') meta_corretas = 125

  const idioma_falado = orientacao_idiomas_global == '1-2' ? `${idioma_1}` : `${idioma_2}`

  const enderecos_falados = orientacao_idiomas_global == '1-2' ? dados.enderecos_mp3_1 : dados.enderecos_mp3_2

  const idioma_1_simplificado = simplifica_idioma(idioma_1)
  const idioma_2_simplificado = simplifica_idioma(idioma_2)

  // Puxar os mp3 pro cache
  // Aqui carregar todos os audios mp3

  const sistemas_escrita_1 = item.idioma_1_sistemas_escrita
  const sistemas_escrita_2 = item.idioma_2_sistemas_escrita

  pre_jogo = {
    i: i,
    titulo: titulo,
    titulo_capitulo: stri[i_capitulo].titulo,
    orientacao_idiomas_global: orientacao_idiomas_global,
    id_decoreba: id_decoreba,
    i_capitulo: i_capitulo,
    id_usuario: id_usuario,
    avatar: avatar,
    distancia_global: distancia_global,
    idioma_1: idioma_1,
    idioma_2: idioma_2,
    idioma_falado_mult: idioma_falado,
    sistemas_escrita_1: sistemas_escrita_1,
    sistemas_escrita_2: sistemas_escrita_2
  }

  // Aqui tem que ver se não foi praticada essa dekoreba. Se não foi, tem que zerar as paradas.
  aparece_popup('modalidades', pre_jogo)

  // Se o idioma tem mais de 1 alfabeto, ter a opção de praticar o idioma só, com perguntas em um alfabeto e respostas em outro.
  // Se o idioma só tem 1 alfabeto msm, nem mostra esta opção.


  // Aqui criamos os botões de modalidades das orientações no jogo.
  // São 4 botões possíveis.
  //  botao_1_1
  //  botao_1_2
  //  botao_2_2
  //  botao_2_1

  // Os que indicam um treino no próprio idioma, 1_1 e 2_2 só aparecem quando algum idioma tem mais de um alfabeto,
  //'que é pro cabra treinar o aprendizado do outro idioma do alfabeto.'

  // Os outros dois módulos, 1_2 e 2_1 aparecem sempre.

 let botao_1_2 = `<div id="bot_1_2" class="flex_row T2 center botao bot_inativo" onclick='carrega_escolha_alfab("1-2", ${JSON.stringify(pre_jogo)}, ${JSON.stringify(sistemas_escrita_1)}, ${JSON.stringify(sistemas_escrita_2)})'>${idioma_1} / ${idioma_2}</div>`

  let botao_2_1 =`<div id="bot_2_1" class="flex_row T2 center botao bot_inativo" onclick='carrega_escolha_alfab("2-1", ${JSON.stringify(pre_jogo)}, ${JSON.stringify(sistemas_escrita_2)}, ${JSON.stringify(sistemas_escrita_1)})'>${idioma_2} / ${idioma_1}</div>`

  let botao_1_1 = ''
  let botao_2_2 = ''

  if (sistemas_escrita_1.length > 1) {
    botao_1_1 = `<div id="bot_1_1" class="flex_row T2 center botao bot_inativo" onclick='carrega_escolha_alfab("1-1", ${JSON.stringify(pre_jogo)}, ${JSON.stringify(sistemas_escrita_1)})'>${idioma_1} / ${idioma_1}</div>`
  }

  if (sistemas_escrita_2.length > 1) {
    botao_2_2 = `<div id="bot_2_2" class="flex_row T2 center botao bot_inativo" onclick='carrega_escolha_alfab("2-2", ${JSON.stringify(pre_jogo)}, ${JSON.stringify(sistemas_escrita_2)})'>${idioma_2} / ${idioma_2}</div>`
  }

  document.getElementById('recip_orientacao_escrita_dentro').innerHTML = `

    <span style="margin: 15px;">Escolha os idiomas que praticarás</span>
    <div class="flex_row T1 center" style="margin-top: 5px; margin-bottom: 25px; color: grey; font-size: 19px;">Idioma da pergunta / Idioma da resposta</div>
    <br><br>

    <div class="flex_row T1 center">
      ${botao_1_1}
      ${botao_2_2}
    </div>

    <div class="flex_row T1 center">
      ${botao_1_2}
      ${botao_2_1}
    </div>

    <div class="flex_row T1 center" style="font-size: 27px;">

      <i class="icon-left-open-1"></i>dd
      <i class="icon-right-open-1"></i>
    </div>

  `

  acertadas = []
  erradas = []

  // Aqui, o idioma das perguntas deve conter todos os alfabetos, sem questionamentos.
  // O sistema deve dispor à escolha apenas os alfabetos do idioma da resposta.
}

async function monta_decoreba_verbo () {

  
  document.getElementById('div_palco_index').innerHTML = `<div id="recip_popup_verbo_confere" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="confere_se_completou_verbo()"></i> 
        </div>

        <div id="recip_popup_verbo_confere_dentro" class="flex_col T1 center caixinha_dentro">
        </div>
      </div>  

    </div>

    <div id="recip_popup_verbo_parabens" class="flex_col T1 center mostra_recip_info_2 sumido">

      <div class="flex_col mostra_info_caixinha_2">

        <div class="flex_row T1 barra_superior_popup_sombra">
          <i class="flex_row center x_fechar_ativo icon-cancel-circled" onclick="fecha_popup_verbo_parabens()"></i> 
        </div>

        <div id="recip_popup_verbo_parabens_dentro" class="flex_col T1 center caixinha_dentro">

          Meus mais sinceros parabéns!!<br>
          Você completou corretamente esse treinamento de conjugação verbal.<br>
          Tente novamente com outra conjugação, ou vá fazer outra coisa da vida!!<br>
          Forte abraço, meu chapa!
        </div>
      </div>  

    </div>` + verbo_cartao
}

async function monta_busca_usuario (obj) {

  const stateObj = { tela_ativa: 'busca_usuario' }
  verifica_url({ stateObj: stateObj, endereco: document.location.href, modo_de_vinda: 'busca' })

  const cabecalho_rapido = cria_cabecalho_rapido('busca_usuarios')

  document.getElementById('div_palco_index').innerHTML = `
    ${cabecalho_rapido}

    <div id="recip_decoreba_mostra" class="flex_col T1 center recip" style="justify-content: flex-start; ">



      <div class="flex_col T1 center largura_interna fundo_prancheta" style="background: var(--fundo_carta); padding: 0px; padding-bottom: 25px; margin: 0px; min-height: 500px;">

        <div class="flex_row T1 center largura_interna" style="height: 45px; max-width: 750px; margin-top: 50px; margin-bottom: 50px;">
          <input id="input_texto_busca_usuario" type="text" class="input_texto T1" style="margin: 0px;" placeholder="Buscar usuário" />
          <button id="botao_busca_usuario" class="botao" style="margin: 0px; margin-left: 15px; font-size: 30px;">
            <i class="icon-lupa_vazio"></i>
          </button>
        </div>


      <div id="recip_busca_usuario" class="flex_col T1 center largura_interna">

      </div>

        
      </div>
      </div>

  `

  altera_diurno_noturno (diurno_noturno)

  prepara_busca_usuario(obj)
}

async function monta_404(modo_de_vinda) {
  const cabecalho_rapido = cria_cabecalho_rapido('home')
  document.getElementById('div_palco_index').innerHTML = `
  ${cabecalho_rapido}
  <div class="flex_col T1 center recip" style="text-align: center;">
    <h1>404</h1>
    Não fazemos idéia do que você colocou ali na barra de endereço.<br>
    <div class="flex_row T1 center">
    Mas não se desespere. <br><div class="flex_row botao center" onclick="monta_index()">Clique aqui</div> e volte para sua página inicial.
    </div>
  </div>
  `
}

function monta_afazeres () {

  document.getElementById('div_palco_index').innerHTML = `
    <div id="afazeres_fundo_preto" class="flex_col center" style="width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); position: fixed; display: none;">
    </div>

    <h1>Afazeres</h1>

    <div class="flex_row T1" style="max-width: 600px; padding: 25px;">
      
      <select id="afazer_categoria" style="width: 200px; font-size: 17px; margin-right: 15px;">

        <option value="">Categoria</option>
        <option value="bug">Bug</option>
        <option value="funcionalidade">Funcionalidade</option>
        <option value="design">Design</option>
        <option value="codigo">Código</option>

      </select>

      <select id="afazer_prioridade" style="width: 200px; font-size: 17px;">
        <option value="">Prioridade</option>
        <option value="1">Suave</option>
        <option value="2">Importante</option>
        <option value="3">Urgente</option>
      </select>
    </div>

    <textarea id="afazer_descricao" style="width: 600px; height: 100px; font-size: 19px;"></textarea>
    <button class="botao" onclick="afazeres('upa')">Inserir</button>

    Lista
    <div id="recip_lista_afazeres" class="flex_col T1 center">
    </div>

  </div>
  `



  afazeres('puxa')
}


async function vai_filhao_3(missao) {

  let destino
  let metodo = 'POST'
  let data


  if (missao === 'avatar_temporario') {
    destino = `${servidor}/${missao}`

    let formulario = document.getElementById('opcoes_formulario_avatar')
    let imagem = document.getElementById('opcoes_carrega_avatar')

    data = new FormData(formulario)

  }


  if (missao === 'troca_avatar') {
    destino = `${servidor}/${missao}`

    let formulario = document.getElementById('opcoes_formulario_avatar')
    let imagem = document.getElementById('opcoes_carrega_avatar')

    data = new FormData(formulario)

  }

  try {
    const resultado = await fetch(destino, {
      method: metodo,
      body: data
    })
    const json = await resultado.json()


    if (json.msg === 'avatar_temporario__sucesso') {
      return { nome_arquivo: json.nome_arquivo }
    }


    if (json.msg === 'troca_avatar__sucesso') {
      // Some o loading do avatar
      return { nome_arquivo: json.nome_arquivo }
    }

  } catch (e) { console.error(e) }
}

// Se os parâmetros chegarem aqui prontinhos, bastaria apenas enviá-los direto ao servidor.
async function vai_filhao_2 (missao, parametro) {
  let dados_vai
  let destino = `${servidor}/${missao}`
  let metodo = 'POST'
  
  // Afazeres  
  /* Essa função administra as requisições com:
      parametro.acao === 'upa', parametro.acao === 'puxa', parametro.acao === 'edita' e parametro.acao === 'deleta'
  */




  if (missao === 'altera_idioma_index') {
    metodo = 'GET'
    dados_vai = { idioma_selecionado: parametro } 
    destino = `${servidor}/`
  }

  if (missao === 'prepara_remexe') {
    dados_vai = {
      id_decoreba: parametro.id_decoreba,
      acao: parametro.acao
    }
  }


  if (missao === 'puxa_quais_capitulos_teste') {

    dados_vai = {
      id_decoreba: parametro
    }
  }


  if (missao === 'gera_pdf_lista') {

    const dados = JSON.parse(parametro)
    dados_vai = {
      id_decoreba: dados.id_decoreba,
      id_capitulo: dados.id_capitulo
    }
  }

  if (missao === 'gera_pdf_verbo') {

    const dados = JSON.parse(parametro)
    dados_vai = {
      idioma: dados.idioma,
      infinitivo: dados.infinitivo
    }
  }

  if (missao === 'afazeres') {
    dados_vai = parametro
  }

  // home
  if (missao === 'home') { }
  if (missao === 'listar_verbo') {
    const dados = JSON.parse(parametro)

    dados_vai = {
      idioma: dados.idioma,
      letra: dados.letra
    }
    
  }
  if (missao === 'buscar_verbo') {
    const dados = JSON.parse(parametro)

    dados_vai = {
      idioma: dados.idioma,
      verbo_inf: dados.verbo_inf
    }

  }

  if (missao === 'inicio') { }

  if (missao === 'cadastro') {
    dados_vai = parametro
  }



  // Alterar senha
  if (missao === 'altera_senha') {
    loading('loading...')
    dados_vai = {
      senha_nova: document.getElementById('senha_nova_1').value,
      token_escondido: `${parametro}`
    }
  }

  // Login
  if (missao === 'login') {
    dados_vai = {
      login: document.getElementById('login_email').value,
      senha: document.getElementById('login_senha').value
    }
  }

  // Esse login_do_cadastro é meio que uma gambiarra. Ele faz o usuário logar direto do login,
  // pulando uma possível verificação por e-mail.
  // Depois terei de ver esse troço aí.
  if (missao === 'login_do_cadastro') {

    dados_vai = {
      login: document.getElementById('cadastro_email').value,
      senha: document.getElementById('cadastro_senha').value
    }

    destino = `${servidor}/login`
  }


  if (missao === 'curtir_decoreba') {
    const obj = JSON.parse(parametro)
    dados_vai = {
      id_decoreba: obj.id_decoreba
    }
  }

  // Perfil
  if (missao === 'perfil') {
    dados_vai = {
      id_perfil: `${parametro}`
    }
  }

  if (missao === 'seguir') {
    const obj = JSON.parse(parametro)

    dados_vai = {
      id_perfil: obj.id_perfil
    }

  }

  // Explorar
  if (missao === 'explorar') {
  }

  // Decoreba_mostra
  if (missao === 'decoreba_mostra') {
    dados_vai = {
      id_decoreba: parametro
    }
  }

    // Testes
  if (missao === 'usuario_falou') {
    dados_vai = parametro
  }

  if (missao === 'orientacao_decoreba') {
    const dados = JSON.parse(parametro)

    dados_vai = {
      orientacao: dados.orientacao,
      id_decoreba: dados.id_decoreba,
    }
  }

  if (missao === 'distancia_decoreba') {
    const dados = JSON.parse(parametro)

    dados_vai = {
      distancia: dados.distancia,
      id_decoreba: dados.id_decoreba,
    }

  }


  if (missao === 'escolhas_decoreba') {

    const dados = JSON.parse(parametro)

    dados_vai = {
      id_decoreba: dados.id_decoreba,
      i_capitulo: dados.i_capitulo,
      escolhas_dek: escolhas_dek,
      modalidade: dados.modalidade
    }

  }

  // Opcoes
  if (missao === 'troca_email') {
    dados_vai = {
      email: parametro
    }
  }

  if (missao === 'solicita_troca_senha') {
    dados_vai = {
      email: parametro
    }
  }

  if (missao === 'puxa_capitulo') {
    const obj = JSON.parse(parametro)


    dados_vai = {
      id_decoreba: obj.id_decoreba,
      i_capitulo: obj.i_capitulo
    }
  }

  if (missao === 'opcoes_salva') {

    let facebook = document.getElementById('opc_facebook_checkbox').checked ? document.getElementById('opc_facebook_input').value : 'nao_tem'
    if (facebook === '') facebook = 'nao_tem'

    let instagram = document.getElementById('opc_instagram_checkbox').checked ? document.getElementById('opc_instagram_input').value : 'nao_tem'
    if (instagram === '') instagram = 'nao_tem'

    let youtube = document.getElementById('opc_youtube_checkbox').checked ? document.getElementById('opc_youtube_input').value : 'nao_tem'
    if (youtube === '') youtube = 'nao_tem'

    let twitter = document.getElementById('opc_twitter_checkbox').checked ? document.getElementById('opc_twitter_input').value : 'nao_tem'
    if (twitter === '') twitter = 'nao_tem'

    let linkedin = document.getElementById('opc_linkedin_checkbox').checked ? document.getElementById('opc_linkedin_input').value : 'nao_tem'
    if (linkedin === '') linkedin = 'nao_tem'


    let distancia = 'distancia_curta'

    /*
      if (document.getElementById('distancia_curta').checked) distancia = 'distancia_curta'
      if (document.getElementById('distancia_media').checked) distancia = 'distancia_media'
      if (document.getElementById('distancia_longa').checked) distancia = 'distancia_longa'
    */

    altera_diurno_noturno(diurno_noturno)

    dados_vai = {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
      twitter: twitter,
      linkedin: linkedin,
      modo_tela: diurno_noturno,
      distancia: distancia,
      nome: document.getElementById('opc_nome').value,
      e_mail: document.getElementById('opc_email').value
    }
  }

  if (missao === 'opcoes_puxa') {
  }


  if (missao == 'troca_avatar') {
    let formulario = document.getElementById('opcoes_formulario_avatar')
    let imagem = document.getElementById('opcoes_carrega_avatar')

    data = new FormData(formulario)
  }

  // Cria
  if (missao === 'cria_puxa') {
  }

  if (missao === 'decoreba_deleta') {
    dados_vai = {
      id_decoreba: parametro
    }
  }

  // Logout
  if (missao === 'logout') {
  }

  // Decoreba_jogo
  if (missao === 'decoreba_jogo') {

    dados_vai = {
      id_decoreba: parametro
    }
  }

  // Decoreba_jogo
  if (missao === 'atualiza_pontos') {
    const obj = JSON.parse(parametro)

    dados_vai = {
      orientacao: obj.orientacao,
      id_decoreba: `${obj.id_decoreba}`,
      id_capitulo: `${obj.id_capitulo}`,
      modalidade: `${obj.modalidade}`,
      respostas_corretas: `${obj.respostas_corretas}`,
      erradas: obj.erradas,
      dominadas_vai: obj.dominadas_vai,
      palavras: obj.palavras
    }

  }

  // Teste de palavras já decoradas.
  if (missao === 'encerrar_teste') {
    
    const obj = JSON.parse(parametro)
    
    dados_vai = {
      lista_respostas_teste: obj.lista_respostas_teste,
      id_decoreba: obj.id_decoreba,
      id_capitulo: obj.id_capitulo,
    }
  }

  if (missao === 'buscar_usuario') {
    const obj = parametro

    dados_vai = {
      input: obj.input,
      pagina: obj.pagina
    }
  }

  if (missao === 'troca_idioma_interface_usuario') {
    metodo = 'GET'
    dados_vai = {
      idioma: parametro 
    }
  }

  // Decoreba_cria
  if (missao === 'decoreba_salva') {
    valida('decoreba_salva')

    // Primeiro, define o valor da cor das letras, embasado no valor da cor da dekoreba.
    const cor_letras = define_cor_letras()

    dados_vai = {
      id_decoreba: obj_teste._id,
      titulo: document.getElementById('titulo_nova_decoreba').value,
      cor: document.getElementById('cor_dekoreba').value,
      cor_letras: cor_letras,
      idioma_1: document.getElementById('idioma_1').value,
      idioma_1_sigla_som: obj_teste.idioma_1_sigla_som,
      idioma_2: document.getElementById('idioma_2').value,
      idioma_2_sigla_som: obj_teste.idioma_2_sigla_som,

      idioma_1_sistemas_escrita: obj_teste.idioma_1_sistemas_escrita,
      idioma_2_sistemas_escrita: obj_teste.idioma_2_sistemas_escrita,

      sistemas_escrita: obj_teste.sistemas_escrita,
      capitulos: obj_teste.capitulos,
      marcacoes: [
        { marcacao: document.getElementById('marcacao_1').value },
        { marcacao: document.getElementById('marcacao_2').value },
        { marcacao: document.getElementById('marcacao_3').value },
        { marcacao: document.getElementById('marcacao_4').value },
        { marcacao: document.getElementById('marcacao_5').value }
      ],
      mexidos: mexidos
    }

    loading('loading...')
  }

  if (missao === 'decoreba_cria') {
  }

  if (missao === 'cria_frase') {
    dados_vai = {
      id_decoreba: parametro,
      tamanho_frase: tamanho_frase_var
    }
  }

  if (missao === 'buscar') {
    dados_vai = {
      termo_busca: parametro.termo_busca,
      pagina: parametro.pagina
    }
  }

  if (missao === 'puxa_dominio_palavras_capitulo') {
    const obj = JSON.parse(parametro)

    dados_vai = {
      id_decoreba: obj.id_decoreba,
      id_capitulo: obj.id_capitulo,
      modalidade: obj.modalidade,
      orientacao: obj.orientacao
    }
  }

  if (missao === 'prepara_teste') {
    const obj = JSON.parse(parametro)

    dados_vai = {
      id_decoreba: obj.id_decoreba,
      id_capitulo: obj.id_capitulo
    }
  }

  if (missao === 'analiza_traducao') {

    const obj = parametro

    dados_vai = {
      idioma: obj.idioma,
      traducao: obj.traducao
    }

  }

  try {

    const body_conteudo = (missao === 'usuario_falou') ? dados_vai : JSON.stringify(dados_vai)

    const resposta = await fetch(destino, {
      method: metodo,
      headers: {
        'Content-type': 'application/json'
      },
      body: body_conteudo
    })

    const contentType = resposta.headers.get('Content-Type')

    // Lógica para lidar com a resposta com base no tipo de conteúdo
    if (contentType.includes('application/pdf')) {

      const blob = await resposta.blob()
   
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
    
    } else {      

    const json = await resposta.json()
    // console.log(resposta.url)

    if (!resposta.ok) {

    }

    // Afazeres
    if (resposta.url === `${servidor}/afazeres`) {

      // Só quem não tem o acao é o upa. Logo, o upa não precisa recarregar a página nem o loading.
      if (!json.acao) {
        loading('carregou') // Esse carregou carrega até no início, no upa. Tem que ver isso aí.
        window.location.reload(true)
      } 

      if (json.acao) return json
    }

    if (json.msg === 'envia_frase__sucesso') {

      frase_traduzida = 'sim'
      eh_teste_global = 'nao'

      const obj = JSON.parse(json.obj);

      cap_praticado_frase = json.cap_praticado
      cap_curso_frase = json.cap_curso

      document.getElementById('span_frase_traduzida').innerHTML = obj.frase_traduzida
      document.getElementById('bot_cria_frase_start').style.display = 'flex'

      let string_palavras_frase = ''
      const vocab = cap_curso_frase.vocabulario

      for (let i = 0; i < vocab.length; i++) {
        string_palavras_frase += faz_palavras_liberadas (i, vocab[i].idioma_1[0].item, vocab[i].idioma_1[0].arquivo, vocab[i].idioma_2[0].item, vocab[i].idioma_2[0].arquivo, json.idioma)
      }



      document.getElementById('div_palavras_da_frase').innerHTML = string_palavras_frase
      
      console.log(cap_praticado_frase)
      console.log("cap_praticado_frase ACIMA")
      console.log(cap_curso_frase)
      console.log("cap_curso_frase ACIMA")


        pre_jogo.i = 1
        pre_jogo.titulo = 'Dekoreba'
        pre_jogo.titulo_capitulo = 'Capítulo'
        pre_jogo.orientacao_idiomas_global = 'aleatoria'
        pre_jogo.id_decoreba = '0'
        pre_jogo.i_capitulo = 1
        pre_jogo.id_usuario = '00'
        pre_jogo.avatar = 'https://i.pinimg.com/736x/98/da/68/98da68d5583a98dac656c98265e5f3d2.jpg'
        pre_jogo.distancia_global = 'distancia_curta'
        pre_jogo.idioma_1 = json.idioma // gamb
        pre_jogo.idioma_2 = 'Português'
        pre_jogo.idioma_falado_mult = 'Português'
        pre_jogo.sistemas_escrita_1 = [{sistema: 'latino'}]
        pre_jogo.sistemas_escrita_2 = [{sistema: 'latino'}]

        escolhas_dek.joga_ou_treina = 'treina'
        escolhas_dek.modalidade = 'multipla_escolha'

        // Não sei pq aqui, os escolhas_dek.alfabetos_perg tem uns 14 'Abc', enfim, zeremos.
        escolhas_dek.alfabetos_perg = []
        escolhas_dek.alfabetos_resp = []

        escolhas_dek.alfabetos_perg.push('Abc')
        escolhas_dek.alfabetos_resp.push('Abc')

        loading('carregou')

      // Aqui temos que ajeitar as palavas que chegaram.
      return json
    }

    if (resposta.url === `${servidor}/home`) return json
    if (resposta.url === `${servidor}/decoreba_mostra`) return json


    if (json.msg === 'gera_pdf_lista__sucesso') {
      window.open(json.endereco, '_blank')
    }

    if (json.msg === 'listar_verbo__sucesso') return json
    if (json.msg === 'buscar_verbo__sucesso') return json.verbo


    // Mostra
    if (json.msg === 'puxa_dominio_palavras_capitulo__sucesso') {


      let cache = await caches.open('cache-mp3')

      for (let i = 0; i < json.enderecos_mp3_1.length; i++) {
        console.log(`Loadando: ${json.enderecos_mp3_1[i].endereco}`)
        cache.add(`${json.enderecos_mp3_1[i].endereco}`)
        cache.add(`${json.enderecos_mp3_2[i].endereco}`)
      }
        
      loading('carregou')

      return json
    }

    // Teste
    if (json.msg === 'usuario_falou__sucesso') {
      return { transcricao: json.transcricao }
    }

    if (json.msg === 'puxa_capitulo__sucesso') {

      return json
    }

    // Cadastro
    if (json.msg === 'cadastro__usuario_ja_existe') {
      return { msg: json.msg }
    }
    if (json.msg === 'cadastro__concluido') {
      return { msg: json.msg }
    }
    if (json.msg === 'cadastro__erro_catastrofico') {
      return { msg: json.msg }
    }

    // Login
    if (json.msg === 'login__nao_achou_ninguem') {
      const hud_login = JSON.parse(localStorage.getItem('hud_login'))
      document.getElementById('msg_sistema_login').innerHTML = hud_login.usuario_nao_encontrado
      document.getElementById('msg_sistema_login').style.display = 'flex'
    }

    if (json.msg === 'login__senha_errada') {
      const hud_login = JSON.parse(localStorage.getItem('hud_login'))
      document.getElementById('msg_sistema_login').innerHTML = hud_login.senha_incorreta
      document.getElementById('msg_sistema_login').style.display = 'flex'
    }

    if (json.msg === 'login__senha_correta') {
      monta_home()
    }

    if (json.msg === 'home__sucesso') {
      alert("home__sucesso")
    }

    if (json.msg === 'home__erro_catastrofico') {

    }

    if (json.msg === 'buscar_usuario__sucesso') {
      loading('carregou')
      return json
    }

    if (json.msg === 'curtir_decoreba__sucesso') {
      // nada
      return json
    }

    if (json.msg === 'curtir_decoreba__deslogado') {
      return json
    }

    // Perfil
    if (json.msg === 'perfil__sucesso') {
      return {
        usuario: json.usuario,
        usuario_proprio: json.usuario_proprio,
        decorebas_proprias: json.decorebas_proprias,
        perfil_propriedade: json.perfil_propriedade,
        seguidores: json.seguidores,
        seguidos: json.seguidos,
        dados_decs: json.dados_decs
      }
    }

    if (json.msg === 'seguir__sucesso') return json

    if (json.msg === 'decoreba_cria__puxa') {
      return {
        decorebas_proprias: json.decorebas_proprias
      }
    }

    // Altera senha
    if (json.msg === 'altera_senha_post__sucesso') {
      loading('carregou')

      // Some tela de inserir senha
      // Mostra tela de parabéns, sua senha nova foi criada
      document.getElementById('recip_altera_senha').style.display = 'none'
      document.getElementById('recip_nova_senha_enviada').style.display = 'flex'
      

      return json
    }
    if (json.msg === 'altera_senha_post__nao_achou_ninguem') {
      loading('carregou')
      // Taca-lhe um alerta de que algo de errado não deu certo.
      alert("Algo de errado não deu certo com sua troca de senha.")
      return json
    }
    if (json.msg === 'altera_senha') {
      loading('carregou')
      return json
    }

    if (json.msg === 'puxa_quais_capitulos_teste__sucesso') {
      loading('carregou')
      return json.capitulos_para_teste
    }


    // Cria
    if (json.msg === 'cria_puxa__sucesso') {
      loading("carregou")
      return json
    }

    // Deleta
    if (json.msg === 'decoreba_deleta__sucesso') {
      loading('carregou')
      return json
    }

    // Decoreba_salva
    if (json.msg === 'decoreba_salva__nova_decoreba_salva_deslogado') {
      return {
        id_decoreba: json.id_decoreba
      }
    }

    if (json.msg === 'decoreba_salva__nova_decoreba_salva') {
      loading('carregou')

      return {
        msg: json.msg,
        id_decoreba: json.id_decoreba
      }

    }

    if (json.msg === 'decoreba_salva__decoreba_atualizada') {
      loading('carregou')

      return {
        msg: json.msg,
        id_decoreba: json.id_decoreba
      }
    }

    // decoreba_jogo
    if (json.msg === 'decoreba_jogo__sucesso') {

      console.log(json.enderecos_mp3_1)

      // Aqui carregar todos os audios mp3.

      caches.open('cache-mp3').then(
        async (cache) => {

          for (let i = 0; i < json.enderecos_mp3_1.length; i++) {
            console.log(`CARGANDO: ${json.enderecos_mp3_1[i].endereco}`)
            await cache.add(`${json.enderecos_mp3_1[i].endereco}`)
            await cache.add(`${json.enderecos_mp3_2[i].endereco}`)
          }

          cache.add("../mp3/correct-choice-43861.mp3")
          cache.add("../mp3/success-fanfare-trumpets-6185.mp3")
          cache.add("../mp3/sadwhisle-91469.mp3")
          cache.add("../mp3/wah-wah-sad-trombone-6347.mp3")
        }
      ).then(loading('carregou'))

      
      return {
        enderecos_mp3: json.enderecos_mp3
      }
    }

    if (json.msg === 'encerrar_teste__sucesso') {
      return json
    }

    if (json.msg === 'cria_frase__sucesso') {
      loading('carregou')
      return json
    }

    if (json.msg === 'cria_frase__menos_tres_palavras') {
      loading('carregou')
      return json
    }

    if (json.msg === 'analiza_traducao__sucesso') {
      loading('carregou')
      console.log(json)
      return json
    }

    // atualiza_pontos
    if (json.msg === 'atualiza_pontos__sucesso') {
      return json
    }

    if (json.msg === 'escolhas_decoreba__sucesso') {
      return json
    }

    // Opções
    if (json.msg === 'troca_email__sucesso') {
      loading('carregou')
      return json
    }

    if (json.msg === 'troca_email__ja_cadastrado') {
      loading('carregou')
      return json
    }

    if (json.msg === 'solicita_troca_senha__sucesso') {
      loading('carregou')
      alert("Enviamos um e-mail para você, com o link para sua troca de senha.")
      return json
    }

    if (json.msg === 'opcoes_puxa__sucesso') {

      return {
        configuracoes: json.configuracoes,
        email: json.email,
        nome: json.nome,
        avatar: json.avatar,
        avatar_50: json.avatar_50,
        avatar_400: json.avatar_400,
        _id: json._id
      }
    }

    if (json.msg === 'opcoes_salva__sucesso') {

      /*
      document.getElementById('msg_sistema_opcoes').style.display = 'flex'
      document.getElementById('msg_sistema_opcoes').innerHTML = '! Opções salvas com sucesso!'
      document.getElementById('avatar_50').src = json.avatar_50
      */
      // alert(json.avatar_400)
      sessionStorage.setItem("avatar_50", json.avatar_50)

      document.getElementById('avatar_50').src = `../imagens/avatares/temporarios/${json.avatar_arquivo}`

      window.scrollTo(0, 0)

      window.location.reload();
    }

    // Logout
    if (json.msg === 'saiu') {
      monta_index()
    }

    // Buscar
    if (json.msg === 'buscar__sucesso') {
      loading('carregou')
      return json
    }

    // Teste
    if (json.msg === 'prepara_teste__sucesso') {
      loading ('carregou')
      return json
    }

    // remexe
    if (json.msg === 'prepara_remexe__sucesso') {
      loading('carregou')
      return json
    }
  }
  } catch (e) { console.error(e) }
}