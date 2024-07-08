import storage from '../storage';

describe('Stack', () => {
    beforeEach(() => {
        storage.resetSpace();
    });

    test('resetSpace should empty the stack', () => {
        storage.addItem(1);
        storage.addItem(2);
        expect(storage.resetSpace()).toEqual([]);
        expect(storage.getSpace()).toEqual([]);
    });

    test('addItem should add an item to the stack', () => {
        expect(storage.addItem(5)).toBe(5);
        expect(storage.getSpace()).toEqual([5]);
    });

    test('removeItem should remove and return the last item', () => {
        storage.addItem(1);
        storage.addItem(2);
        expect(storage.removeItem()).toBe(2);
        expect(storage.getSpace()).toEqual([1]);
    });

    test('removeItem should return undefined for empty stack', () => {
        expect(storage.removeItem()).toBeUndefined();
    });

    test('isInvalid should return true for stack with 0 or 1 items', () => {
        expect(storage.isInvalid()).toBe(true);
        storage.addItem(1);
        expect(storage.isInvalid()).toBe(true);
    });

    test('isInvalid should return false for stack with more than 1 item', () => {
        storage.addItem(1);
        storage.addItem(2);
        expect(storage.isInvalid()).toBe(false);
    });

    test('getSpace should return the current stack', () => {
        storage.addItem(1);
        storage.addItem(2);
        storage.addItem(3);
        expect(storage.getSpace()).toEqual([1, 2, 3]);
    });
});
