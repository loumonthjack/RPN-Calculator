This is a Command Line Utility
Model View Controller

Model -- Input.js
View -- Interface.js
Controller -- Handler.js
Storage -- Storage.js

Input Methods
 -- hasInvalid - return boolean, Input from Interface is Invalid
 -- hasOperand - return boolean, Input from Interface has Operand Value
 -- hasOperator - return boolean, Input from Interface has Operator value
 -- hasMultCharacter - return boolean, Input from Interface has multiple character

Handler Methods 
 -- InputCommand - Validates the Input from Interface
 -- operate - Calculate Result based on Input
 -- processInput - Return Result of Input based on Multi/Single Char.

Storage Object
 -- space - This is Where Input is Stored 
 -- addItems -- Adds to Space Array
 -- removeItems -- Removes from Space Array
 -- isInvalid -- Returns boolean, Storage has one or more Inputs

To Start Project: 
sh ./calculator

Need Help? 
See Valid Commands by entering "h" or "help".
