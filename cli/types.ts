export enum Operator {
    Add = "+",
    Subtract = "-",
    Divide = "/",
    Multiply = "*",
}

export interface InputValue {
    value: number | string | Operator;
}

export interface InputCommandResult {
    isError: boolean;
    value: string | number;
    isOperand: boolean;
    isOperator: boolean;
    isMultiCharacter: boolean;
    isEmpty: boolean;
}
