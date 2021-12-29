const fs = require('fs');

module.exports = function parse (statements, tmp) {
    // statememnts must be an array, if no, make it an array
    if (statements === void 0) {
        // something went wrong. This part should never be executed
        debugger
        return;
    };
    if (!Array.isArray(statements)) 
        statements = [statements];
    let result = '';
    for (let i = 0; i < statements.length; i++) {
        let statement = statements[i];
        let value = statement.value;

        switch (statement.type) {
            case 'number':
                result += value + ' ';
                break;
            case undefined: // whitespace
                result += ';';
                break;
            default:
                result += '/* Unhandled expression: '+JSON.stringify(statement)+' */'
        }
    }
    return result.trim();
}
