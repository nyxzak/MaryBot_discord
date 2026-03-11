const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js'); // Importa o Client e os GatewayIntentBits do discord.j
const axios = require('axios'); // Importa a biblioteca axios para fazer requisições HTTP
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Olá, Estou viva!')
});

app.listen(process.env.PORT || 3000);

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

    if (message.content.toLowerCase().startsWith('/anime')) { 
            const partesDoNome = message.content.split(' '); // Divide a mensagem em partes usando espaço como separador
            const nomeDoAnime = partesDoNome.slice(1).join(' '); // Junta as partes do nome do anime, ignorando o comando
            if (!nomeDoAnime) {
              return message.reply('Olá fofo(a)! Sobre qual anime quer saber mais?'); // Se o nome do anime não for fornecido, responde com uma mensagem de erro   
            }
        try {
            const resposta = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nomeDoAnime)}&limit=1`); // Faz uma requisição GET para a API do Jikan, passando o nome do anime como parâmetro de busca
            const anime = resposta.data.data[0]; // Acessa o primeiro resultado da resposta da API
            if (!anime) {
                return message.reply('Desculpe, não achei o anime :(') 
            }
            const embed = new EmbedBuilder() // Cria um novo embed para exibir as informações do anime
                .setColor('BE32D1')
                .setTitle(anime.title)
                .setURL(anime.url)
                .setThumbnail(anime.images.jpg.image_url)
                .addFields( // Adiciona campos ao embed com informações sobre o anime
                     { name: 'Nota', value: `${anime.score ?? 'N/A'}`, inline: true},
                     { name: 'Episódios', value: `${anime.episodes ?? 'N/A'}`, inline: true},
                     { name: 'Status', value: anime.status, inline: true}
                )
                .setDescription(anime.synopsis ? anime.synopsis.slice(0, 400) + '...' : 'Sem sinopse disponível.') // Define a descrição do embed com a sinopse do anime, limitando a 400 caracteres
                .setFooter({ text: 'Dados fornecidos por Jikan API' }); // Adiciona um rodapé ao embed
                message.reply({ embeds: [embed] }); 
        } catch (error) {
            console.error('Erro ao consumir a API:', error); 
            message.reply('Desculpe, ocorreu um erro ao buscar a imagem do anime.'); 
        }
    }
});

client.login(process.env.DISCORD_TOKEN); // Faz login no Discord usando o token do arquivo .env