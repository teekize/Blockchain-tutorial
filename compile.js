const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const sourceCode = fs.readFileSync(inboxPath, "utf8");

// module.exports = solc.compile(sourceCode, 1).contracts[":Inbox"];

// let outputFile = path.resolve(__dirname, "text.JS");

// fs.writeFileSync(outputFile, solc.compile(sourceCode, 1).toString());

let output = solc.compile(sourceCode, 1);
console.log(output);
