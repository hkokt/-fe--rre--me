const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fazsentido')
        .setDescription('faz sentido'),
    async execute(interaction) {
        await interaction.reply('Não é que faz sentido');
    },
};
