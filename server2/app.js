//ChatGPT Used to help debug code.

const http = require('http');
const url = require('url');
const { addDefinition, getDefinition, getRequestCount, getTotalEntries } = require('./dictionary');

const PORT = 3000; // Change this if needed
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && pathname === '/api/definitions/') {
        if (!query.word || !/^[a-zA-Z]+$/.test(query.word)) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid or missing word parameter" }));
            return;
        }
        const definition = getDefinition(query.word);
        const requestNumber = getRequestCount();
        if (definition) {
            res.writeHead(200);
            res.end(JSON.stringify({ requestNumber, word: query.word, definition }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ requestNumber, message: `Word '${query.word}' not found!` }));
        }
    } 
    else if (req.method === 'POST' && pathname === '/api/definitions') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (!data.word || !data.definition || !/^[a-zA-Z]+$/.test(data.word)) {
                    throw new Error("Invalid input");
                }
                const response = addDefinition(data.word, data.definition);
                const requestNumber = getRequestCount();
                const totalEntries = getTotalEntries();
                res.writeHead(201);
                res.end(JSON.stringify({ requestNumber, totalEntries, message: response }));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: "Invalid input, please send valid JSON with word and definition" }));
            }
        });
    } 
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Endpoint not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
