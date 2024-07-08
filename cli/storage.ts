class Stack {
    private space: number[] = [];
    public size: number = this.space.length;

    reset(): number[] {
        this.space = [];
        return this.space;
    }

    add(value: number): number {
        this.space.push(value);
        return value;
    }


    remove(): number | undefined {
        return this.space.pop();
    }

    isInvalid(): boolean {
        return this.space.length <= 1;
    }

    get(): number[] {
        return this.space;
    }
}
const storage = new Stack();
export default storage;
