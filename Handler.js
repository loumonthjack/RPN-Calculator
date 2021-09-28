const { Input } = require('./Input');

// Representation of Calculation Controller
class Handler {

	constructor(input, storage) {
		this.input = input;
		this.space = storage;
	}

    // This method return the Object of Validated Input
    InputCommand(value){
        // initialization of Input
        const command = new Input(value);
        // input value -- string 
        const input = command.value;
        // input has neither operator or operand -- boolean
        const error = command.isInvalid();
        // input has a operand(integer) -- boolean
        const operand = command.hasOperand();
        // input has a operator -- boolean
        const operator = command.hasOperator();
        // input has multiple characters -- boolean
        const multi = command.hasMultiCharacter();
        return {isError: error, value: input, isOperand: operand , isOperator: operator, isMultiCharacter: multi};
    };

    // This method returns the operations result based on the operator
	operate(operatorValue, leftExpression, rightExpression){
        const operations = { 
                "*": function(){ return leftExpression * rightExpression},
                "/": function(){ return leftExpression / rightExpression},
                "+": function(){ return leftExpression + rightExpression},
                "-": function(){ return leftExpression - rightExpression},
        }
        
        // if operator in operations return operation expression 
        if(operatorValue in operations) return operations[operatorValue]() 
    }

    // This method uses the Validated Input, the storage and returns the calculation results
    processInput(){
        // Input is the Data being processed
        const Input = this.InputCommand(this.input)
        // storage is the Storage(Array) being used for the Input 
        const storage = this.space;
        
        // When Input is "h" return "Valid Commands..."
        const isHelpCommand = Input.value.includes('h') && 
        "Valid Commands: \n r or reset -- reset the storage \n q or quit -- quit the Calculator \n h or help -- view valid Commands \n v or view -- view current Calulation storage";

        // When Input is "r" or "reset", reset Storage space and return "storage has been emptied!"
        const isResetCommand = (Input.value.includes('r') || Input.value.includes('reset')) && storage.resetSpace() && 'storage has been emptied!'
        // When Input is "q" or "quit", return "Quitting..."
        const isQuitCommand = (Input.value.includes('q') || Input.value.includes('quit')) && "Quitting..."
        // When Input is "v" or "view", return Storage space array
        const isViewCommand = (Input.value.includes('v') || Input.value.includes('view')) && storage.space;

        // When Input is Error return "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator."
        const isError = Input.isError == true && "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator.";
        // When Input is multi character value remove the spaces and create array
        const isMultiCharacter = Input.isMultiCharacter == true && Input.value.split(' ');

        // Input is a Operator
        const inputIsOperator = Input.isOperator == true;

        // Last Two Items from storage Array
        const storageLastTwoItems = storage.space.slice(-2);

        // Last Item from storage
        const storageItemOne = storageLastTwoItems[0];
        // Second to Last Item from storage
        const storageItemTwo = storageLastTwoItems[1];
        
        // function to add the Input Operands to storage Array
        const processOperand = (validInput) => this.InputCommand(validInput).isOperand == true && storage.addItem(parseInt(validInput));
        // function to use a Input Operator to calculate result of last two stored Input Operands 
        const calculateTotal = (validInput) => this.operate(validInput, storage.removeItem(storageItemOne), storage.removeItem(storageItemTwo));
        // Add result of calculation to storage when storage has more than one operand else return "This answer is $RESULT
        const processOperator = (validInput) => storage.space.length > 1 ? storage.addItem(calculateTotal(validInput)): !storage.space[1] && `Result: The answer is ${storage.space[0]}`;
        
        // When there is multiple characters present in line process operands and operators
        // When single character process operator or operand
        const result = !isError &&
                isMultiCharacter ? isMultiCharacter.map(line => {
                    this.InputCommand(line).isOperator == true ? processOperator(line) : processOperand(line);
                    }) : (inputIsOperator == true ? processOperator(Input.value) : processOperand(Input.value));

        // If Value is "v" or "view"
        if(isViewCommand) return isViewCommand

        // If Value is "q" or "quit"
        if(isQuitCommand) return isQuitCommand

        // If Value is "h" or "help" 
        if(isHelpCommand) return isHelpCommand

        // If Value is "r" or "reset"
        if(isResetCommand) return isResetCommand

        // If Error 
        if(isError) return isError
        
        // If Result
        if(result)return result;
	}
    
}

module.exports = {
    Handler
}