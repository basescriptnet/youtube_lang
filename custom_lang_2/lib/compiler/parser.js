const nearley = require("nearley");
module.exports = function (str) {
    const grammar = require('../grammar/main.js');
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
        let parsed = parser.feed(str);
        let result = parsed.results[0]
        if (!result) {
            console.log('[Log]: Grammar doesn\'t match.')
            return [];
        };
        return result
    } catch (err) {
        console.error(err.message);
    }
    return [];
}