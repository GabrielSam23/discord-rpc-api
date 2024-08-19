// api/update-discord-presence.js

const { Client } = require('discord-rpc');

const clientId = '1219385405728886875'; // Substitua pelo seu Client ID
const rpcClient = new Client({ transport: 'ipc' });

module.exports = (req, res) => {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  if (req.method === 'POST') {
    const { title } = req.body;

    rpcClient.on('ready', () => {
      console.log('Discord RPC Client ready');
      rpcClient.setActivity({
        details: title,
        state: 'Assistindo',
        startTimestamp: new Date(),
        largeImageKey: 'your_image_key' // Substitua com uma chave de imagem válida
      });
    });

    rpcClient.login({ clientId }).catch(console.error);

    res.sendStatus(200);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
