const { Client, GatewayIntentBits } = require('discord.js'); // Importa o Client e os GatewayIntentBits do discord.j
const axios = require('axios'); // Importa a biblioteca axios para fazer requisições HTTP
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

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignora mensagens de outros bots

    if (message.content.toLowerCase() === '/anime') { 
            message.reply('Olá fofo(a)! Sobre qual anime quer saber mais?'); // Responde com uma mensagem de saudação
            const partesDoNome = message.content.split(' '); // Divide a mensagem em partes usando espaço como separador
            const nomeDoAnime = partesDoNome.slice(1).join(' '); // Junta as partes do nome do anime, ignorando o comando
            if (!nomeDoAnime) {
              return message.reply('Por Favor, Me diga o nome do anime :) Ex: /anime Re:Zero'); // Se o nome do anime não for fornecido, responde com uma mensagem de erro   
            }
        try {
            const resposta = await axios.get('https://api.jikan.moe/v4/' + encodeURIComponent(nomeDoAnime)); // Faz uma requisição GET para a API do Jikan, passando o nome do anime como parâmetro de busca
            const imageUrl = resposta.data.data[0]; // Acessa a URL da imagem do primeiro anime na resposta da API
            const anime = imageUrl[0];
            message.reply(`Aqui está a imagem do anime: ${imageUrl}`); // Responde com a URL da imagem
            console.log(anime.title, anime.synopsis, anime.images.jpg.image.url);
        } catch (error) {
            console.error('Erro ao consumir a API:', error); 
            message.reply('Desculpe, ocorreu um erro ao buscar a imagem do anime.'); 
        }
    }
});

client.login(process.env.DISCORD_TOKEN); // Faz login no Discord usando o token do arquivo .env