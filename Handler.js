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
        // input is neither operator or operand -- boolean
        const error = command.isInvalid();
        // input is a operand(integer) -- boolean
        const operand = command.hasOperand();
        // input is a operator -- boolean
        const operator = command.hasOperator();
        // input is multiple characters -- boolean
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

    // This method uses the Validated Input, the Stash and returns the calculation results
    processInput(){
        // Input is the Data being processed
        const Input = this.InputCommand(this.input)
        // Stash is the Storage(Array) being used for the Input 
        const Stash = this.space;
        
        // When Input is "h" return "Valid Commands..."
        const isHelpCommand = Input.value.includes('h') && 
        "Valid Commands: \n m or manual -- how to work Calculator \n r or reset -- reset the Stash \n q or quit -- quit the Calculator \n h or help -- view valid Commands \n v or view -- view current Calulation Stash";

        // When Input is "r" return 'Stash has been emptied!'
        const isResetCommand = (Input.value.includes('r') || Input.value.includes('reset')) && Stash.resetSpace() && 'Stash has been emptied!'
        const isQuitCommand = (Input.value.includes('q') || Input.value.includes('quit')) && "Quitting..."
        const isViewCommand = (Input.value.includes('v') || Input.value.includes('view')) && Stash.space;
        // When Input returns as error return "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator."
        const isError = Input.isError == true && "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator.";
        // When Input returns as multi character value remove the spaces and create array
        const isMultiCharacter = Input.isMultiCharacter == true && Input.value.split(' ');

        // Input is a Operator
        const inputIsOperator = Input.isOperator == true;
        // Remove Last Two Items from Stash Array
        const getStashLastTwoItems = Stash.space.slice(-2);

        // Last Item from Stash
        const stashItemOne = getStashLastTwoItems[0];
        // Second to Last Item from Stash
        const stashItemTwo = getStashLastTwoItems[1];
        
        // function to add the Input Operands to Stash Array
        const processOperand = (validInput) => this.InputCommand(validInput).isOperand == true && Stash.addItem(parseInt(validInput));
        // function to use a Input Operator to calculate result of last two stored Input Operands 
        const calculateTotal = (validInput) => this.operate(validInput, Stash.removeItem(stashItemOne), Stash.removeItem(stashItemTwo));
        // Add result of calculation to stash when stash has more than one operand else return "This answer is $RESULT
        const processOperator = (validInput) => Stash.space.length > 1 ? Stash.addItem(calculateTotal(validInput)): !Stash.space[1] && `Result: The answer is ${Stash.space[0]}`;
        
        // When there is multiple characters present in line process accordingly
        // When single character process accordingly
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