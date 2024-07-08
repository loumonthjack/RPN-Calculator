import storage from '../storage';

describe('Stack', () => {
    beforeEach(() => {
        storage.reset();
    });

    test('resetSpace should empty the stack', () => {
        storage.add(1);
        storage.add(2);
        expect(storage.reset()).toEqual([]);
        expect(storage.get()).toEqual([]);
    });

    test('addItem should add an item to the stack', () => {
        expect(storage.add(5)).toBe(5);
        expect(storage.get()).toEqual([5]);
    });

    test('removeItem should remove and return the last item', () => {
        storage.add(1);
        storage.add(2);
        expect(storage.remove()).toBe(2);
        expect(storage.get()).toEqual([1]);
    });

    test('removeItem should return undefined for empty stack', () => {
        expect(storage.remove()).toBeUndefined();
    });

    test('isInvalid should return true for stack with 0 or 1 items', () => {
        expect(storage.isInvalid()).toBe(true);
        storage.add(1);
        expect(storage.isInvalid()).toBe(true);
    });

    test('isInvalid should return false for stack with more than 1 item', () => {
        storage.add(1);
        storage.add(2);
        expect(storage.isInvalid()).toBe(false);
    });

    test('getSpace should return the current stack', () => {
        storage.add(1);
        storage.add(2);
        storage.add(3);
        expect(storage.get()).toEqual([1, 2, 3]);
    });
});
