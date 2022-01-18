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
        string: {
            match: /"(?:\\["nrt]|[^"])*"/,
            lineBreaks: true,
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
        comma: ',',
    });

 
    
const vars = {
    assign: v => {
        let f = v[0] ? v[0][0] : v[1];
        return {
            type: 'var_assign',
            use_let: v[0] && (v[0][0].value == 'let' || v[0][0].value == '\\') ? true : false,
            use_const: v[0] && v[0][0].value == 'const' ? true : false,
            line: f.line,
            col: f.col,
            offset: f.offset,
            value: v[1],
        }
    },
    var_assign_list: v => {
        v[1] = v[1].map(i => Object.assign(i[3], {type: 'var_reassign'}));
        return {
            type: 'var_assign_group',
            line: v[0].line,
            col: v[0].col,
            offset: v[0].offset,
            value: v[1] ? [v[0], ...v[1]] : [v[0]],
        }
    }
};

const statement = {
    value_reassign: v => ({
        type: 'statement_value',
        value: v[0],
        line: v[0].line,
        col: v[0].col,
        lineBreak: v[0].lineBreak,
        offset: v[0].offset,
    }),
    value: v => ({
        type: 'statement_value',
        value: v[0],
        line: v[0].line,
        col: v[0].col,
        lineBreak: v[0].lineBreak,
        offset: v[0].offset,
    }),
};
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "process", "symbols": ["statements"], "postprocess": id},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["_", "statement"], "postprocess": v => v[1]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements$ebnf$1", "_"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign", "EOL"], "postprocess": id},
    {"name": "statement", "symbols": ["value", "EOL"], "postprocess": statement.value},
    {"name": "var_assign$subexpression$1", "symbols": [{"literal":"let"}, "__"]},
    {"name": "var_assign$subexpression$1", "symbols": [{"literal":"const"}, "__"]},
    {"name": "var_assign$subexpression$1", "symbols": [{"literal":"\\"}]},
    {"name": "var_assign", "symbols": ["var_assign$subexpression$1", "var_assign_list"], "postprocess": vars.assign},
    {"name": "var_assign_list$ebnf$1", "symbols": []},
    {"name": "var_assign_list$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "var_reassign"]},
    {"name": "var_assign_list$ebnf$1", "symbols": ["var_assign_list$ebnf$1", "var_assign_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "var_assign_list", "symbols": ["var_reassign", "var_assign_list$ebnf$1"], "postprocess": vars.var_assign_list},
    {"name": "var_reassign", "symbols": ["identifier", "_", {"literal":"="}, "_", "value"], "postprocess":  v => ({
            type: 'var_reassign',
            identifier: v[0].value,
            line: v[0].line,
            col: v[0].col,
            offset: v[0].offset,
            value: v[4],
        }) },
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess":  v => Object.assign(v[0], {
            value: v[0].value.replace(/_/g, '')
        }) },
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": v => ''},
    {"name": "_", "symbols": [], "postprocess": v => ''},
    {"name": "__", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": v => ' '},
    {"name": "EOL", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": v => 'EOL'},
    {"name": "EOL", "symbols": ["_", {"literal":";"}], "postprocess": v => v[1]}
]
  , ParserStart: "process"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
