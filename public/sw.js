/*
console.log("Novìssmo.")

const CACHE_NAME = 'app-cache-v1';
const FILES_TO_CACHE = [
        '/',                  // Cache da página inicial

        '/offline.html',

        '/css/simples.css',   // Exemplo de CSS
        '/css/geral.css',   // Exemplo de CSS

        '/js/preparacoes.js',   // Exemplo de JS
        '/js/modelos.js',
        '/js/auxiliares.js',
        '/js/env.js',
        '/js/faz_html_auxiliares.js',
        '/js/genericas.js',
        '/js/variaveis.js',
        '/js/html_palavras.js',
        '/js/aux_cria.js',
        '/js/alterados.js',
        '/js/xeca_mexido.js',
        '/js/tinycolor.js',
        '/js/script.js',

        '/imagens/placeholder_image.svg',
        '/imagens/avatar-default.jpg',
        '/imagens/mulher_index.png',

        '/font/drop.eot',
        '/font/drop.svg',
        '/font/drop.ttf',
        '/font/drop.woff',
        '/font/drop.woff2',

        '/font/fontello.eot',
        '/font/fontello.svg',
        '/font/fontello.ttf',
        '/font/fontello.woff',
        '/font/fontello.woff2',

        '/font/fontello .eot'

];

// **1. Instalação**
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Armazenando arquivos no cache...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Torna o SW ativo imediatamente
});

// Limpando caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Removendo cache antigo: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptando as requisições e aplicando a estratégia Cache First com verificação de duplicação
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log(`Recurso recuperado do cache: ${event.request.url}`);
        return response; // Retorna do cache se disponível
      }
      
      return fetch(event.request).then((networkResponse) => {
        console.log(`Recurso baixado do servidor: ${event.request.url}`);

        // Clonando a resposta da rede para poder usá-la tanto para o cache quanto para a resposta final
        const clonedResponse = networkResponse.clone();

        // Abrindo o cache e armazenando a resposta clonada
        caches.open(CACHE_NAME).then((cache) => {
          cache.match(event.request).then((cacheResponse) => {
            if (!cacheResponse) {
              cache.put(event.request, clonedResponse);  // Armazena no cache
              console.log(`Recurso adicionado ao cache: ${event.request.url}`);
            }
          });
        });

        // Retorna a resposta original para o navegador
        return networkResponse;
      });
    })
  );
});



// **4. Atualização do Service Worker**
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting(); // Força a ativação do novo SW
  }
});



console.log('Service Worker no DOZE!');

*/