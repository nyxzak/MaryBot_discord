require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const express = require('express'); 
const app = express();    
const cron = require('node-cron');
const mangaCommand = require('./commands/manga.js');          

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Mary está pronta para ajudar!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith('/anime')) { 
            const partesDoNome = message.content.split(' ');
            const nomeDoAnime = partesDoNome.slice(1).join(' ');
            if (!nomeDoAnime) {
              return message.reply('Olá fofo(a)! Sobre qual anime quer saber mais?');
            }
        try {
            const resposta = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nomeDoAnime)}&limit=1`);
            const anime = resposta.data.data[0];
            if (!anime) {
                return message.reply('Deculpe, não achei o anime :(') 
            }
            const embed = new EmbedBuilder()
                .setColor('#BE32D1')
                .setTitle(anime.title)
                .setURL(anime.url)
                .setThumbnail(anime.images.jpg.image_url)
                .addFields(
                     { name: 'Nota', value: `${anime.score ?? 'N/A'}`, inline: true},
                     { name: 'Episódios', value: `${anime.episodes ?? 'N/A'}`, inline: true},
                     { name: 'Status', value: anime.status, inline: true}
                )
                .setDescription(anime.synopsis ? anime.synopsis.slice(0, 400) + '...' : 'Sem sinopse disponível.')
                .setFooter({ text: 'Dados fornecidos por Jikan API' });
                message.reply({ embeds: [embed] }); 
        } catch (error) {
            console.error('Erro ao consumir a API:', error); 
            message.reply('Desculpe, ocorreu um erro ao buscar a imagem do anime.'); 
        }
    }
            if (message.content.toLowerCase().startsWith('/manga')) {
            const partesDoNome = message.content.split(' ');
            const nomeDoManga = partesDoNome.slice(1).join(' ');
            if (!nomeDoManga) {
            return message.reply('Olá fofo(a)! Sobre qual mangá quer saber mais?');
        }
            mangaCommand(message, nomeDoManga); //chamar a função do manga.js
}
});

app.get('/', (req, res) => res.send('Mary está viva!'));
app.listen(process.env.PORT || 3000, () => console.log('Servidor HTTP ativo!'));

client.login(process.env.DISCORD_TOKEN);