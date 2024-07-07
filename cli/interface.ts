import readline from "readline";
import Handler from "./handler";
import Storage from "./storage";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const quitCommands = ["q", "quit"];

rl.setPrompt("> ");
rl.prompt(" " as any);

rl.on("line", (input: string) => {
	try {
		const calculator = new Handler(input, Storage.space);
		const result = calculator.processInput();
		if (result) console.log(result);

		if (quitCommands.includes(input.toLowerCase())) {
			rl.close();
		}
	} catch (error) {
		console.error("Error:", error);
	}
	rl.prompt();
});

rl.on("SIGINT", () => rl.close());

rl.on("close", () => {
	console.log("Thanks for using my RPN Calculator!");
	process.exit(0);
});
