let space: number[] = [];
const resetSpace = () => {
    space = [];
    return []
}
const addItem = (value: number) => {
    space.push(value);
    return value
}
const removeItem = (value: number) => {
    space.pop();
    return value
}
const isInvalid = () => {
    return space.length <= 1
}

export default {
    space,
    resetSpace,
    addItem,
    removeItem,
    isInvalid
}
