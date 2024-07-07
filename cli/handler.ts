
import Input from "./input";
import { Operator, InputCommandResult } from "./types";

export default class Handler {
  constructor(public input: string, private space: number[] = []) { }

  private inputCommand(value: string): InputCommandResult {
    const command = new Input(value);
    return command.analyze();
  }

  private getResult(operator: Operator, left: number, right: number): number {
    const operations: Record<Operator, (left: number, right: number) => number> = {
      [Operator.Add]: (left, right) => left + right,
      [Operator.Subtract]: (left, right) => left - right,
      [Operator.Multiply]: (left, right) => left * right,
      [Operator.Divide]: (left, right) => right === 0 ? NaN : left / right,
    };
    return operations[operator](left, right);
  }

  processInput(): string | number | undefined {
    const input = this.inputCommand(this.input);
    const value = input.value as string;

    const commands: Record<string, () => string | undefined> = {
      h: () => this.showHelp(),
      help: () => this.showHelp(),
      r: () => this.resetSpace(),
      reset: () => this.resetSpace(),
      q: () => "Quitting...",
      quit: () => "Quitting...",
      v: () => this.space.join(" "),
      view: () => this.space.join(" "),
      t: () => this.runTest(),
      test: () => this.runTest(),
    };

    if (value in commands) {
      return commands[value]();
    }
    if (input.isMultiCharacter) {
      return this.processMultiCharacterInput(value);
    }

    if (input.isError) {
      return "Cannot Process! The Input is not Valid! Please Enter an Integer or Operator.";
    }

    if (input.isOperator) {
      return this.processOperator(input.value as Operator);
    }

    if (input.isOperand) {
      this.space.push(parseInt(input.value as string));
      return undefined;
    }

    return undefined;
  }

  private showHelp(): string {
    return `Valid Commands:
 r or reset -- reset the storage
 q or quit -- quit the Calculator
 h or help -- view valid Commands
 v or view -- view current Calculation storage
 t or test -- test Input and Storage`;
  }

  private resetSpace(): string {
    this.space = [];
    return "Storage has been emptied!";
  }

  private runTest(): string {
    if (this.space.length === 0) {
      return "Try:\n \n(Operand and/or Operator) test\n \nExample: 2 3 4 test";
    }
    console.table(this.inputCommand(this.input));
    console.table(this.space);
    return "Test completed. Check console for details.";
  }

  private processMultiCharacterInput(value: string): number | undefined {
    const characters = value.split(" ");
    const operatorArray: Operator[] = [];

    characters.forEach(char => {
      const charInput = this.inputCommand(char);
      if (charInput.isOperand) this.space.push(parseInt(char));
      else if (charInput.isOperator) operatorArray.push(char as Operator);
    });

    operatorArray.forEach(operator => {
      this.processOperator(operator);
    });

    return this.space.at(-1);
  }

  private processOperator(operator: Operator): number | string {
    if (this.space.length < 2) {
      return `Result: The answer is ${this.space[0]}`;
    }
    const [right, left] = this.space.splice(-2);
    const result = this.getResult(operator, left, right);
    this.space.push(result);
    return result;
  }
}
