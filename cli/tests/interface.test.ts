import Interface from "../interface";
import Handler from "../handler";
import Storage from "../storage";

jest.mock("../handler");
jest.mock("../storage");

describe("Interface.processInput", () => {
    it("should process valid input and return the result", () => {
        const input = "2 3 +";
        const expectedResult = "5";

        (Storage.get as jest.Mock).mockReturnValue("mocked storage");
        (Handler.prototype.processInput as jest.Mock).mockReturnValue(expectedResult);

        const result = Interface.initialize(input);
        expect(result).toBe(expectedResult);
    });

    it("should return 'quit' when input is a quit command", () => {
        const input = "q";
        const expectedResult = "Quitting...";
        (Storage.get as jest.Mock).mockReturnValue("mocked storage");
        (Handler.prototype.processInput as jest.Mock).mockReturnValue(expectedResult);
        const result = Interface.initialize(input);
        expect(result).toBe(expectedResult);
    });

    it("should throw an error when Handler throws an error", () => {
        const input = "some input";
        (Storage.get as jest.Mock).mockReturnValue("mocked storage");
        (Handler.prototype.processInput as jest.Mock).mockImplementation(() => {
            throw new Error("mocked error")
        });
        const result = () => Interface.initialize(input);
        expect(result).toThrow("mocked error");
    });
});
