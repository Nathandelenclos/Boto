import {Client, GatewayIntentBits} from "discord.js";
import {Command} from "./command";
import {Rcon} from "rcon-client";

export class MyClient extends Client {
  commands: Command[];
  rconClient?: Rcon;
  constructor() {
    super({ intents: [GatewayIntentBits.Guilds] });
    this.commands = [];
  }
  destroy(): Promise<void> {
    if (this.rconClient) {
      this.rconClient.end();
    }
    return super.destroy();
  }
}
