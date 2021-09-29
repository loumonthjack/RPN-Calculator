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
	getResult(operatorValue, leftExpression, rightExpression){
        //operators are keys and value returns operation expression result 
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
        const Storage = this.space;
        
        // When Input is "h" return "Valid Commands..."
        const isHelpCommand = Input.value.includes('h') && 
        "Valid Commands: \n r or reset -- reset the storage \n q or quit -- quit the Calculator \n h or help -- view valid Commands \n v or view -- view current Calulation storage";

        // When Input is "r" or "reset", reset Storage space and return "storage has been emptied!"
        const isResetCommand = (Input.value.includes('r') || Input.value.includes('reset')) && Storage.resetSpace() && 'storage has been emptied!'
        // When Input is "q" or "quit", return "Quitting..."
        const isQuitCommand = (Input.value.includes('q') || Input.value.includes('quit')) && "Quitting..."
        // When Input is "v" or "view", return Storage space array
        const isViewCommand = (Input.value.includes('v') || Input.value.includes('view')) && Storage.space;

        // When Input is Error return "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator."
        const isError = Input.isError == true && "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator.";
        // When Input is multi character value remove the spaces and create array
        const isMultiCharacter = Input.isMultiCharacter == true;

        // Input is a Operator
        const inputIsOperator = Input.isOperator == true;

        // Last Two Items from storage Array
        const storageLastTwoItems = Storage.space.slice(-2);

        // Last Item from storage
        const storageItemOne = storageLastTwoItems[0];
        // Second to Last Item from storage
        const storageItemTwo = storageLastTwoItems[1];
        
        // function to add the Input Operands to storage Array
        const processOperand = (validInput) => this.InputCommand(validInput).isOperand == true && Storage.addItem(parseInt(validInput));
        // function to use a Input Operator to calculate result of last two stored Input Operands 
        const calculateTotal = (validInput) => (storageItemOne && storageItemTwo) ? this.getResult(validInput, Storage.removeItem(storageItemOne), Storage.removeItem(storageItemTwo)) : `Cannot Operate on One Operand`;
        // Add result of calculation to storage when storage has more than one operand else return "This answer is $RESULT
        const processOperator = (validInput) => Storage.space.length > 1 ? Storage.addItem(calculateTotal(validInput)): !Storage.space[1] && `Result: The answer is ${Storage.space[0]}`;
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
            
        // If Multi Character Input
        if(isMultiCharacter == true){
                // strip the input of spaces and return values as array
                const multiCharacter = Input.value.split(' ');

                // operators get stored here
                const operatorArray = [];

                // When there is multiple characters present in line process operands and push operators to operatorsArray
                multiCharacter.map(line => {
                            this.InputCommand(line).isOperand == true ? processOperand(parseInt(line)) : (this.InputCommand(line).isOperator == true && operatorArray.push(line));
                            }) && Input.value;

                // calculate input result then return result            
                const result = operatorArray.map(operator => {
                    // Last Two Items from storage Array
                    const storageLastTwoItems = Storage.space.slice(-2);
                    // Last Item from storage
                    const storageItemOne = storageLastTwoItems[0];
                    // Second to Last Item from storage
                    const storageItemTwo = storageLastTwoItems[1];
                    // process result
                    processOperand(this.getResult(operator, Storage.removeItem(storageItemOne), Storage.removeItem(storageItemTwo)))
                }) && Storage.space.at(-1);
                return result;
        }
        // Single Input 
        const result = (inputIsOperator == true ? processOperator(Input.value) : processOperand(Input.value));
        if(result) return result;
        
	}
    
}

module.exports = {
    Handler
}