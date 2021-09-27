const readline = require("readline");
const { Handler } = require('./Handler');
const { Storage } = require('./Storage');

// Create Command Line Interface
const interface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Allowed Quit Command Line Executables
const canExecute = (input) => {
	const executable = {
		"q": function(){return interface.close()},
		"quit": function(){return interface.close()}
	}
	if(input in executable){
		return executable[input]()
	}
}

// Set Prompt for Command Line
interface.setPrompt('> ');
interface.prompt(" ");

// While Command Line is Open Create Calculator, Print Result and Execute Allowed Quit Commands
interface.on('line', function(data){
	try {
		// Create Calulator 
		const Calculator = new Handler(data, Storage);
		// Print Result
		console.log(Calculator.processInput())
		// Execute Quit Commands
		canExecute(data);
	} catch (e) {
		console.log("Error:", e);
	}
	interface.prompt()
}).on('SIGINT', function () {
	// CTRL+D Quit Command Line
	interface.close();
}).on('close', function () {
	// When Command Line receives Quit Command, Print Text and Close
	console.log('Thanks for Using My RPN Calculator!');
	process.exit(0);
});


