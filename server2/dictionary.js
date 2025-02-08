//ChatGPT Used to help debug code.

let dictionary = [];
let requestCount = 0;

function addDefinition(word, definition) {
    requestCount++;
    const existingEntry = dictionary.find(entry => entry.word.toLowerCase() === word.toLowerCase());
    if (existingEntry) {
        return `Warning! '${word}' already exists.`;
    }
    dictionary.push({ word, definition });
    return `New entry recorded: '${word} : ${definition}'`;
}

function getDefinition(word) {
    requestCount++;
    const entry = dictionary.find(entry => entry.word.toLowerCase() === word.toLowerCase());
    return entry ? entry.definition : null;
}

function getRequestCount() {
    return requestCount;
}

function getTotalEntries() {
    return dictionary.length;
}

module.exports = { addDefinition, getDefinition, getRequestCount, getTotalEntries };
