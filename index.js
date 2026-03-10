const { Client, GatewayIntentBits } = require('discord.js'); // Importa o Client e os GatewayIntentBits do discord.j
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const client = new Client({ // Cria uma nova instância do Client com as intenções necessárias
    intents: [
        GatewayIntentBits.Guilds, // Permite que o bot acesse informações sobre os servidores
        GatewayIntentBits.GuildMessages, // Permite que o bot acesse mensagens em servidores
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Mary está pronta para ajudar!'); // Loga uma mensagem quando o bot estiver pronto
});

client.on('messageCreate', message => {
    if (message.author.bot) return; // Ignora mensagens de outros bots

    if (message.content.toLowerCase() === 'oi mary') { // Verifica se a mensagem é "oi mary"
        message.reply('Olá fofo(a)! Sobre qual anime quer saber mais?'); // Responde com uma mensagem de saudação
    }
});

client.login(process.env.DISCORD_TOKEN); // Faz login no Discord usando o token do arquivo .env