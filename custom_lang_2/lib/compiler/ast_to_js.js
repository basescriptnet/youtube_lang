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
    let r = [];
    for (let i = 0; i < statements.length; i++) {
        let statement = statements[i];
        let value = statement.value;

        switch (statement.type) {
            case 'statement_value':
                result += `${parse(value)};`;
                break;
            case 'number':
                result += value + ' ';
                break;
            case 'string':
                result += value;
                break;
            case 'var_assign':
                if (statement.use_const) {
                    result += `const ${parse(value)};`;
                    break;
                }
                result += `${statement.use_let ? 'let ' : ''}${parse(value)};`;
                break;
            case 'var_assign_group':
                if (!!value.value) value = value.value;
                for (let i = 0; i < value.length; i++) {
                    r.push(`${parse(value[i])}`);
                }
                if (statement.identifier) {
                    result += `${statement.identifier} = ${r.join()}`
                }
                else {
                    result += `${r.join()}`;
                }
                break;
            case 'var_reassign':
                result += `${statement.identifier} = ${parse(value)}`;
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
