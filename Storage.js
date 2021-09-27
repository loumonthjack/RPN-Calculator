// Storage for Command Line Data utilized by Handler -- Object
const Storage = {
        space: [],
        // Empty Storage
        resetSpace: function(){
            this.space = [];
            return []
        },
        // Add to Storage
        addItem: function(value){
            this.space.push(value);
            return value
        },
        // Remove from Storage
        removeItem: function(value){
            this.space.pop(value);
            return value;
        },
        // Storage is not empty 
        isInvalid: function(){
            return this.space.length <= 1
        }
}

module.exports = {
    Storage
}