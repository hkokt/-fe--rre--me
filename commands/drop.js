const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drop')
        .setDescription('pede uma awp para o Luis'),
    async execute(interaction) {
        await interaction.reply('Luis, jogou o que sabe... Dropa AWP ae');
    },
};
