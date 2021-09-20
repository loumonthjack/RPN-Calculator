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

// Basic Arithmetic
const operators = ["+", "-", "/", "*"] 
const storedResponses = []

// ----- Validators ----- //

// Is Operator, if userInput is included in Operators Array 
// Boolean
const isOperator = (input) => {
	return operators.includes(input)
}; 
// Is Operand, if userInput is a number 
// Boolean
const isOperand = (input)=> {
	const number = parseInt(input);
	return isNaN(number) == false ? true : false;
};
// Stored Responses is empty
// Boolean
const isEmpty = () => { 
	return (storedResponses.length === 0 ? true : false ); 
};
// Stored Responses is Executable if has more than one number
// Boolean
const isExecutable = () => {
	return (storedResponses.length > 1)
};
// is Invalid, if input is not Operand or Operator
// Boolean
const isInvalidInput = (userInput) => {
	return isOperand(userInput) == false && isOperator(userInput) == false;
};
// is Invalid, if less than two values in Stored Responses 
// Boolean
const isInvalidStack = (userInput) => {
	return isOperator(userInput) == true && isExecutable() == false;
};
// is Error when userInput is not Operand/Operator or Stored Responses has less than 2 values.
// Boolean
const isError = (userInput) => {
	return (isInvalidInput(userInput) || isInvalidStack(userInput));
};
