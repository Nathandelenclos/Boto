import {BodyInit} from "undici";
import {REST, Routes} from "discord.js";
import * as console from "console";

export type refreshCommandsProps = {
    clientId: string;
    token: string;
    body: BodyInit | unknown;
}

export const refreshCommands = async ({
    clientId,
    token,
    body
}: refreshCommandsProps) => {
    console.log('Refreshing commands');
    try {
        const rest = new REST({ version: '10' }).setToken(token);
        await rest.put(
            Routes.applicationCommands(clientId),
            { body }
        );
    } catch (error) {
        console.error(error);
    }
}
