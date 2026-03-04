#!/usr/bin/env node

import dotenv from "dotenv";
import chalk from "chalk"
import figlet from "figlet"

import {Command} from "commander";
import { login, whoami, logout } from "./commands/auth/login.js";
import { wakeUp } from "./commands/ai/wakeUp.js";

dotenv.config();

async function main(){

    console.log(
        chalk.cyan(
            figlet.textSync("Sebi CLI", {
                font:"Standard",
                horizontalLayout:"default"
            })
        )
    )

    console.log(chalk.gray("A CLI based AI Tool \n"))

    const program = new Command("sebi")

    program.version("0.0.1")
    .addCommand(wakeUp)
    .description("Sebi CLI - A CLI Based AI Tool")
    .addCommand(login)
    .addCommand(logout)
    .addCommand(whoami)
    
    program.action(()=>{
        program.help()
    });

    program.parse()
}

main().catch((err)=>{
    console.log(chalk.red("Error running sebi CLI:"), err)
    process.exit(1)
})