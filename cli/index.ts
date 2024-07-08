
import readline from "readline";
import Interface from "./interface";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt("> ");
rl.prompt();

rl.on("line", (input: string) => {
    try {
        const quitCommands = ["q", "quit", "exit"];
        const output = Interface.initialize(input);
        if (output) {
            if (quitCommands.includes(input.toLowerCase())) {
                console.log("Quitting...");
                rl.close();
            }
            console.log(output);
        }
    } catch (error) {
        console.error((error as Error).message);
    }
    rl.prompt();
});

rl.on("SIGINT", () => rl.close());

rl.on("close", () => {
    console.log("Thanks for using my RPN Calculator!");
    process.exit(0);
});
