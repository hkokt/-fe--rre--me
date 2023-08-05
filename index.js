const path = require('path');
const dotenv = require('dotenv');
const fs = require('node:fs');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const config = path.join(__dirname, "config.env");

dotenv.config({
    path: config
})

const { TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

client.commands = new Collection();

for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`falhou`);
    }
}

// login
client.once(Events.ClientReady, c => {
    console.log(`Logado ${c.user.tag}`);
});

client.login(TOKEN);

// listener
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply("erro na requisição");
    }
});