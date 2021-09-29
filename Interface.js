const readline = require("readline");
const {
	Handler
} = require('./Handler');
const {
	Storage
} = require('./Storage');

// Create Command Line Interface
const interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Allowed Interface Quit Commands 
const closeInterface = (input) => {
	// Quit commands
	const executable = ["q", "quit"]

	// if input is a executable array, close interface
	if (executable.includes(input)) {
		return interface.close()
	}
}

// Set Prompt for Interface
interface.setPrompt('> ');
interface.prompt(" ");

// While Interface is Open, userInput is data
interface.on('line', function (data) {
	try {
		// Create Calulator 
		const Calculator = new Handler(data, Storage);
		// Print Result
		console.log(Calculator.processInput())
		// Execute Quit Commands
		closeInterface(data);
	} catch (e) {
		// Print Error: $e in console
		console.log("Error:", e);
	}
	interface.prompt()
}).on('SIGINT', function () {
	// Close Interface
	interface.close();
}).on('close', function () {
	// End gracefully. Print Text and Close Calculator CLI Process
	console.log('Thanks for Using My RPN Calculator!');
	process.exit(0);
});