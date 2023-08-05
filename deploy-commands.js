const { REST, Routes } = require('discord.js');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('node:fs');
const config = path.join(__dirname, "config.env");

dotenv.config({
    path: config
});

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

// Instancia rest
const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos`)
        const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands })

        console.log(`comandos registrados`)
    } catch (err) {
        console.log(err);
    }
})();