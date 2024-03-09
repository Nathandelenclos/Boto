import {SlashCommandBuilder} from "discord.js";
import {Command} from "@types";

export const WhiteList: Command = {
    command: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Whitelist a user')
        .addStringOption(option =>
            option
                .setName('username')
                .setDescription('The username of the user to whitelist')
                .setRequired(true)),

    handler: async (client, interaction) => {
        if (!client.rconClient) return interaction.reply({ content: 'Rcon client not connected', ephemeral: true });
        await client.rconClient?.send(`whitelist add ${interaction.options.getString('username')}`);
        await interaction.reply({content: `Whitelisted ${interaction.options.getString('username')}`, ephemeral: true});
    }
}
