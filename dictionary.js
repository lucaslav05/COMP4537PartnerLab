//ChatGPT Used to help debug code.

const messages = require('./lang/en/en');

let dictionary = [];
let requestCount = 0;

function addDefinition(word, definition) {
    requestCount++;
    const existingEntry = dictionary.find(entry => entry.word.toLowerCase() === word.toLowerCase());
    if (existingEntry) {
        return messages.entryExists(word);
    }
    dictionary.push({ word, definition });
    return messages.newEntry(word, definition);
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
