import { Operator, InputValue, InputCommandResult } from "./types";

export default class Input {
	constructor(public value: InputValue["value"]) { }

	private isOperator(value: InputValue["value"]): value is Operator {
		return Object.values(Operator).includes(value as Operator);
	}

	private isOperand(value: InputValue["value"]): value is number {
		return !isNaN(Number(value));
	}

	hasOperator(): boolean {
		return this.isOperator(this.value);
	}

	hasOperand(): boolean {
		return this.isOperand(this.value);
	}

	hasMultiCharacter(): boolean {
		return typeof this.value === "string" && this.value.length > 1;
	}

	isInvalid(): boolean {
		return !this.hasOperand() && !this.hasOperator();
	}

	isEmpty(): boolean {
		return typeof this.value === "string" && this.value.length === 0;
	}
	analyze(): InputCommandResult {
		return {
			isError: this.isInvalid(),
			value: this.value,
			isOperand: this.isOperand(this.value),
			isOperator: this.isOperator(this.value),
			isMultiCharacter: this.hasMultiCharacter(),
			isEmpty: this.isEmpty()
		};
	}
}

