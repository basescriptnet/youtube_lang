const fs = require('fs');
const parser = require('./parser.js');
function readFile (fileName) {
    let content = fs.readFileSync(fileName, {
        encoding: "utf8",
        flag: "r"
    });
    return content;
}
module.exports = (string) => {
    // if string is provided
    if (!/\.bs$/.test(string)) { 
        try {
            let result = parser(string+'\n');
            return result;
        } catch (err) {
            console.error(err)
            return;
        }
    }
    // if file path is provided
    let file = readFile(string);
    try {
        let result = parser(file+'\n');
        console.log(result);
        return result;
    } catch (err) {
        console.error(err)
    }
}
