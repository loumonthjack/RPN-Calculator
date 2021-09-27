// Representation of Incoming Data from Command Line

// Input has a UserInput Command
class Input {
	constructor(value) {
		this.value = value;
	}
	// Input has a operator -- Boolean
	hasOperator(value=this.value) {
		const operators = ["+", "-", "/", "*"];
		return operators.includes(value);
	}
	// Input has a operand -- Boolean
	hasOperand(value=this.value) {
		const hasNumber = parseInt(value);
		return isNaN(hasNumber) == false ? true : false;
	}

	// Input has multiple characters -- Boolean
	hasMultiCharacter(value=this.value) { 
		return (value && value.length > 1) ? true : false;  
	};

	// Input has not operand or operator  -- Boolean
	isInvalid(value=this.value) {
		return this.hasOperand(value) == false && this.hasOperator(value) == false;
	};

	// Input is empty -- Boolean
	isEmpty(value=this.value){
		return value.length == 0;
	}
}

module.exports = {
    Input
}