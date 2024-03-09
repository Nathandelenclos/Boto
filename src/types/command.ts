import {CacheType, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {MyClient} from "./client";

export type Handler = (client: MyClient, interaction:  ChatInputCommandInteraction<CacheType>) => void;

export type SlashCommand = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">

export type Command = {
    command: SlashCommand;
    handler: Handler;
}
