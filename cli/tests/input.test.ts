import Input from '../input';
import { Operator, InputCommandResult, InputValue } from '../types';

describe('Input Class', () => {
  describe('isOperator', () => {
    it('should return true for valid operators', () => {
      const operators = Object.values(Operator);
      operators.forEach((op: InputValue["value"]) => {
        const input = new Input(op);
        const value = input.analyze()
        expect(value.isOperator).toBe(true);
      });
    });

    it('should return false for non-operators', () => {
      const input = new Input('a');
      const value = input.analyze()
      expect(value.isOperator).toBe(false);
    });
  });

  describe('isOperand', () => {
    it('should return true for numbers', () => {
      const input = new Input(5);
      const value = input.analyze()
      expect(value.isOperand).toBe(true);
    });

    it('should return false for non-numbers', () => {
      const input = new Input('a');
      const value = input.analyze()
      expect(value.isOperand).toBe(false);
    });
  });

  describe('hasOperator', () => {
    it('should return true if the value is an operator', () => {
      const input = new Input(Operator.Add);
      expect(input.hasOperator()).toBe(true);
    });

    it('should return false if the value is not an operator', () => {
      const input = new Input('a');
      expect(input.hasOperator()).toBe(false);
    });
  });

  describe('hasOperand', () => {
    it('should return true if the value is an operand', () => {
      const input = new Input(5);
      expect(input.hasOperand()).toBe(true);
    });

    it('should return false if the value is not an operand', () => {
      const input = new Input('a');
      expect(input.hasOperand()).toBe(false);
    });
  });

  describe('hasMultiCharacter', () => {
    it('should return true if the value has more than one character', () => {
      const input = new Input('abc');
      expect(input.hasMultiCharacter()).toBe(true);
    });

    it('should return false if the value has one or fewer characters', () => {
      const input = new Input('a');
      expect(input.hasMultiCharacter()).toBe(false);
    });
  });

  describe('isInvalid', () => {
    it('should return true if the value is neither an operator nor an operand', () => {
      const input = new Input('a');
      expect(input.isInvalid()).toBe(true);
    });

    it('should return false if the value is an operand', () => {
      const input = new Input(5);
      expect(input.isInvalid()).toBe(false);
    });

    it('should return false if the value is an operator', () => {
      const input = new Input(Operator.Add);
      expect(input.isInvalid()).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the value is an empty string', () => {
      const input = new Input('');
      expect(input.isEmpty()).toBe(true);
    });

    it('should return false if the value is not an empty string', () => {
      const input = new Input('a');
      expect(input.isEmpty()).toBe(false);
    });
  });

  describe('analyze', () => {
    it('should return correct analysis for a number', () => {
      const input = new Input(5);
      const result: InputCommandResult = {
        isError: false,
        value: 5,
        isOperand: true,
        isOperator: false,
        isMultiCharacter: false,
        isEmpty: false
      };
      expect(input.analyze()).toEqual(result);
    });

    it('should return correct analysis for an operator', () => {
      const input = new Input(Operator.Add);
      const result: InputCommandResult = {
        isError: false,
        value: Operator.Add,
        isOperand: false,
        isOperator: true,
        isMultiCharacter: false,
        isEmpty: false
      };
      expect(input.analyze()).toEqual(result);
    });

    it('should return correct analysis for a multi-character string', () => {
      const input = new Input('abc');
      const result: InputCommandResult = {
        isError: true,
        value: 'abc',
        isOperand: false,
        isOperator: false,
        isMultiCharacter: true,
        isEmpty: false
      };
      expect(input.analyze()).toEqual(result);
    });

    it('should return correct analysis for an empty string', () => {
      const input = new Input('');
      const result: InputCommandResult = {
        isError: false,
        value: '',
        isOperand: true,
        isOperator: false,
        isMultiCharacter: false,
        isEmpty: true
      };
      expect(input.analyze()).toEqual(result);
    });
  });
});
