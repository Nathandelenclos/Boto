import {Command, Event} from "@types";

export type Feature = {
    commands: Command[];
    events: Event[];
    name: string;
}
