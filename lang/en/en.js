const messages = {
    invalidWord: "Invalid or missing word parameter",
    wordNotFound: (word) => `Word '${word}' not found!`,
    invalidInput: "Invalid input, please send valid JSON with word and definition",
    entryExists: (word) => `Warning! '${word}' already exists.`,
    newEntry: (word, definition) => `New entry recorded: '${word} : ${definition}'`,
    endpointNotFound: "Endpoint not found"
};

module.exports = messages;
