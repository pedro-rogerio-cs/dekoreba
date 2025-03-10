// Código abaixo deverá ser mais ou menos assim, na versão de produção.
// Por enquanto, está malacabado.

const BackblazeB2 = require('backblaze-b2');
const fs = require('fs-extra')

// Inicializa a conexão com a API
const b2 = new BackblazeB2({
  applicationKeyId: `${process.env.BACKBLAZE_APPLICATION_KEY_ID}`,
  applicationKey: `${process.env.BACKBLAZE_APPLICATION_KEY}`
});

async function authorizeB2() {
  try {
    const authResponse = await b2.authorize(); // Autentica na API
    // console.log('Autorizado com sucesso:', authResponse);
    console.log('Autorizado com sucesso!');
    // const resposta = await getUploadUrl(bucketId)

    // Parâmetros de exemplo
    const bucketId = 'eff563fa23bdd26b98380e1e'; // ID do seu bucket
    const filePath = './public/imagens/avatar-default.jpg';   // Caminho do arquivo local
    const fileName = 'uploads/avatar-default.jpg'; // Caminho no bucket

    uploadFile(bucketId, filePath, fileName);
  } catch (err) {
    console.error('Erro ao autenticar:', err);
  }
}

authorizeB2();

async function getUploadUrl(bucketId) {
  try {
    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
    console.log('URL de upload obtida:', uploadUrlResponse.data);
    return uploadUrlResponse.data;
  } catch (err) {
    console.error('Erro ao obter a URL de upload:', err);
  }
}

async function uploadFile(bucketId, filePath, fileName) {
  try {
    // Autenticar
    await b2.authorize();

    // Obter URL de upload

    const uploadUrlResponse = await b2.getUploadUrl({ bucketId })
    const uploadUrl = uploadUrlResponse.data.uploadUrl
    const authorizationToken = uploadUrlResponse.data.authorizationToken

    // Ler o arquivo
    const fileBuffer = fs.readFileSync(filePath)

    // Upload do arquivo
    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadUrl,
      uploadAuthToken: authorizationToken,
      fileName: fileName,          // Nome do arquivo no bucket
      data: fileBuffer,            // Buffer do arquivo
      contentType: 'image/jpeg'    // Tipo MIME do arquivo
    });

    console.log('Upload concluído:', uploadResponse.data);
  } catch (err) {
    console.error('Erro ao fazer o upload:', err);
  }
}

