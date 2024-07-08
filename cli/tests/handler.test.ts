import Handler from "../handler";
import Input from "../input";
import { Operator, InputCommandResult } from "../types";

jest.mock("../input");

describe("Handler", () => {
    const mockAnalyze = jest.fn();
    let handler: Handler;

    beforeEach(() => {
        jest.clearAllMocks();
        (Input as jest.Mock).mockImplementation(() => {
            return { analyze: mockAnalyze };
        });
    });

    it("should show help when 'h' or 'help' is input", () => {
        handler = new Handler("h");
        mockAnalyze.mockReturnValue({ value: "h" } as InputCommandResult);
        expect(handler.processInput()).toBe(handler.showHelp());

        handler = new Handler("help");
        mockAnalyze.mockReturnValue({ value: "help" } as InputCommandResult);
        expect(handler.processInput()).toBe(handler.showHelp());
    });

    it("should reset storage when 'r' or 'reset' is input", () => {
        handler = new Handler("r");
        mockAnalyze.mockReturnValue({ value: "r" } as InputCommandResult);
        expect(handler.processInput()).toBe("Storage has been emptied!");
        expect(handler.space).toEqual([]);

        handler = new Handler("reset");
        mockAnalyze.mockReturnValue({ value: "reset" } as InputCommandResult);
        expect(handler.processInput()).toBe("Storage has been emptied!");
        expect(handler.space).toEqual([]);
    });

    it("should view current storage when 'v' or 'view' is input", () => {
        handler = new Handler("v");
        handler.space = [1, 2, 3];
        mockAnalyze.mockReturnValue({ value: "v" } as InputCommandResult);
        expect(handler.processInput()).toBe("1 2 3");

        handler = new Handler("view");
        handler.space = [4, 5, 6];
        mockAnalyze.mockReturnValue({ value: "view" } as InputCommandResult);
        expect(handler.processInput()).toBe("4 5 6");
    });

    it("should run test when 't' or 'test' is input", () => {
        handler = new Handler("t");
        handler.space = [];
        mockAnalyze.mockReturnValue({ value: "t" } as InputCommandResult);
        expect(handler.processInput()).toBe("Try:\n \n(Operand and/or Operator) test\n \nExample: 2 3 4 test");

        handler = new Handler("test");
        handler.space = [1, 2, 3];
        mockAnalyze.mockReturnValue({ value: "test" } as InputCommandResult);
        console.table = jest.fn();  // Mock console.table
        expect(handler.processInput()).toBe("Test completed. Check console for details.");
        expect(console.table).toHaveBeenCalledWith({ value: "test" });
        expect(console.table).toHaveBeenCalledWith([1, 2, 3]);
    });

    it("should process operator input correctly", () => {
        handler = new Handler("+");
        handler.space = [1, 2];
        mockAnalyze.mockReturnValue({ value: Operator.Add, isOperator: true } as InputCommandResult);
        expect(handler.processInput()).toBe(3);
        expect(handler.space).toEqual([3]);

        handler = new Handler("/");
        handler.space = [4, 3];
        mockAnalyze.mockReturnValue({ value: Operator.Divide, isOperator: true } as InputCommandResult);
        handler.processInput()
        expect(handler.space).toEqual([0.75]);
    });

    it("should process operand input correctly", () => {
        handler = new Handler("5");
        mockAnalyze.mockReturnValue({ value: "5", isOperand: true } as InputCommandResult);
        handler.processInput();
        expect(handler.space).toEqual([5]);
    });

    it("should return error message for invalid input", () => {
        handler = new Handler("invalid");
        mockAnalyze.mockReturnValue({ value: "invalid", isError: true } as InputCommandResult);
        expect(handler.processInput()).toBe("Cannot Process! The Input is not Valid! Please Enter an Integer or Operator.");
    });

    it("should handle insufficient operands for operators", () => {
        handler = new Handler("+");
        handler.space = [2];
        mockAnalyze.mockReturnValue({ value: Operator.Add, isOperator: true } as InputCommandResult);
        expect(handler.processInput()).toBe("Result: The answer is 2");
    });
});
