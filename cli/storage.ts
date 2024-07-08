class Stack {
    private space: number[] = [];

    resetSpace(): number[] {
        this.space = [];
        return this.space;
    }

    addItem(value: number): number {
        this.space.push(value);
        return value;
    }

    removeItem(): number | undefined {
        return this.space.pop();
    }

    isInvalid(): boolean {
        return this.space.length <= 1;
    }

    getSpace(): number[] {
        return this.space;
    }
}
const storage = new Stack();
export default storage;
