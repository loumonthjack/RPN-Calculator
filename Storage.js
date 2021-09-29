// Storage Object utilized by Handler 
const Storage = {
    // Storage space
    space: [],
    // Empty Storage
    resetSpace: function () {
        this.space = [];
        return []
    },
    // Add to Storage space
    addItem: function (value) {
        this.space.push(value);
        return value
    },
    // Remove from Storage space
    removeItem: function (value) {
        this.space.pop(value);
        return value;
    },
    // Storage space is not empty 
    isInvalid: function () {
        return this.space.length <= 1
    }
}

module.exports = {
    Storage
}