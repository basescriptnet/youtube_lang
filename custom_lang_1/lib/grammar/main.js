// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    console.clear();
    const moo = require('moo');
    const lexer = moo.compile({
        space: {
            match: /(?:\s+|\/\/[^\n]*(?:\n+\s*)?)+/,
            lineBreaks: true,
            value: v => '\n'
        },
        number: /(?:\+|-)?(?:[0-9]+(?:_?[0-9]+)*)(?:\.[0-9]+)?/,
        keyword: ['function', 'let', 'this', 'if', 'else', 'and', 'or'],
        identifier: /[A-Za-z_$]+[A-Za-z0-9_$]*/,
        '[': '[',
        ']': ']',
        '(': '(',
        ')': ')',
        '{': '{',
        '}': '}',
        double_equal: '==',
        equal: '=',
    });
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "process", "symbols": ["statements"], "postprocess": id},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["_", "statement"], "postprocess": v => v[1]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1", "_"], "postprocess": id},
    {"name": "statement", "symbols": ["number"], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess":  v => Object.assign(v[0], {
            value: v[0].value.replace(/_/g, '')
        }) },
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": v => ''},
    {"name": "_", "symbols": [], "postprocess": v => ''},
    {"name": "__", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": v => ' '}
]
  , ParserStart: "process"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
