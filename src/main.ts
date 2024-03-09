import {CacheType, Events, Interaction} from 'discord.js';
import 'dotenv/config';
import {features} from "@features";
import * as console from "console";
import {refreshCommands} from "./utils/refreshCommands";
import {MyClient} from "@types";
import {Rcon} from "rcon-client";

const client = new MyClient();

client.on('ready', async () => {
  try {
    const commands = features.map(feature => feature.commands.map(command => command.command)).flat()
    client.commands = features.map(feature => feature.commands).flat();
    await refreshCommands({
      clientId: process.env.CLIENT_ID || '',
      token: process.env.TOKEN || '',
      body: commands
    });
    console.log('Commands refreshed', commands);
    console.log('Rcon connecting');
    client.rconClient = await Rcon.connect({
        host: process.env.RCON_HOST || '',
        port: parseInt(process.env.RCON_PORT || ''),
        password: process.env.RCON_PASSWORD || ''
    });
    console.log('Rcon connected');
  } catch (error) {
    console.error(error);
  }
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.find(command => {
        console.log(command.command.name, interaction.commandName)
        return command.command.name === interaction.commandName
    });
    console.log(command);
    if (!command) return;

    try {
      command.handler(client, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('error', console.error);
client.on('warn', console.warn);
client.on('debug', console.info);

client.login(process.env.TOKEN);
