import Handler from "./handler";
import Storage from "./storage";

const initialize = (input: string): string | void => {
	try {
		const reservedStorage = Storage.getSpace();
		const calculator = new Handler(input, reservedStorage);
		const result = calculator.processInput();
		if (result) return result.toString();
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
};

export default {
	initialize,
}
