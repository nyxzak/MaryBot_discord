const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith('/manga')) { 
            const partesDoNome = message.content.split(' ');
            const nomeDoManga = partesDoNome.slice(1).join(' ');
            if (!nomeDoManga) {
              return message.reply('Olá fofo(a)! Sobre qual mangá quer saber mais?');
            }
        try {
            const resposta = await axios.get(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(nomeDoManga)}&limit=1`);
            const manga = resposta.data.data[0];
            if (!manga) {
                return message.reply('Deculpe, não achei o mangá :(') 
            }
            const embed = new EmbedBuilder()
                .setColor('#BE32D1')
                .setTitle(manga.title)
                .setURL(manga.url)
                .setThumbnail(manga.images.jpg.image_url)
                .addFields(
                     { name: 'Nota', value: `${manga.score ?? 'N/A'}`, inline: true},
                     { name: 'Capítulos', value: `${manga.chapters ?? 'N/A'}`, inline: true},
                     { name: 'Volumes', value: `${manga.volumes ?? 'N/A'}`, inline: true},
                     { name: 'Status', value: manga.status, inline: true}
                )
                .setDescription(manga.synopsis ? manga.synopsis.slice(0, 400) + '...' : 'Sem sinopse disponível.')
                .setFooter({ text: 'Dados fornecidos por Jikan API' });
                message.reply({ embeds: [embed] }); 
        } catch (error) {
            console.error('Erro ao consumir a API:', error); 
            message.reply('Desculpe, ocorreu um erro ao buscar a imagem do mangá.'); 
        }
    }
});