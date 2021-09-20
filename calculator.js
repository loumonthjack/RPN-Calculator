const readline = require("readline");


const commandLine = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

commandLine.setPrompt('> ');
commandLine.prompt(" ");

// Exit Program
const exit = (userInput) => {
	switch(userInput) {
		case 'q':
		case 'quit':
			return commandLine.close(); 
	}
}
