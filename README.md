# Reverse Polish Notation Calculator

This project implements a Reverse Polish Notation (RPN) Calculator. It is designed with a clear separation of concerns in mind, mimicking the MVC (Model-View-Controller) architecture pattern in Command Line Interface. The calculator is capable of handling basic arithmetic operations in reverse Polish notation.

## Architecture

- **Model**: Responsible for the data-related logic. In this project, the model is represented by the `Input` class, which validates and processes the input.
- **View**: Manages the user interface. This role is played by the `Interface` class, which handles all interactions with the user through the command line.
- **Controller**: Acts as an intermediary between the Model and View, controlling the data flow into the model object and updates the view whenever data changes. It is implemented in the `Handler` class.
- **Storage**: A simple storage mechanism to keep track of the current state. The `Storage` class provides methods to manipulate this storage.

## Features

- **Input Validation**: Checks if the input from the user is valid.
- **Arithmetic Operations**: Supports basic arithmetic operations including addition, subtraction, multiplication, and division.
- **Command Line Interface**: A simple and interactive CLI to perform calculations and manage the application state.

## Commands

- `r` or `reset`: Resets the storage, clearing all stored data.
- `q` or `quit`: Quits the Calculator application.
- `h` or `help`: Displays valid commands.
- `v` or `view`: Views current calculation storage.
- `t` or `test`: Test input and storage (not implemented).

## Getting Started

To start using the RPN Calculator, follow these steps:

1. Ensure you have Node(+20 version recommended) installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the project directory and install dependencies:

```sh
npm install
```

4. Run the application:

```sh
npm start
```
5. Run test suite:

```sh
npm test
```

