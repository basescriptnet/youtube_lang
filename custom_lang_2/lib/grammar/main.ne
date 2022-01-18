@{%
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
%}

@lexer lexer

process -> statements {% id %}

### statements ###
statements -> (_ statement {% v => v[1] %}):* _ {% id %}

statement -> var_assign EOL {% id %}
	| value EOL {% statement.value %}

var_assign -> ("let" __ | "const" __ | "\\") var_assign_list {% vars.assign %}

var_assign_list -> var_reassign (_ "," _ var_reassign):* {% vars.var_assign_list %}

var_reassign -> identifier _ "=" _ value {% v => ({
    type: 'var_reassign',
    identifier: v[0].value,
    line: v[0].line,
    col: v[0].col,
    offset: v[0].offset,
    value: v[4],
}) %}

identifier -> %identifier {% id %}

value -> number {% id %}
    | string {% id %}

number -> %number {% v => Object.assign(v[0], {
    value: v[0].value.replace(/_/g, '')
}) %}

# strings
string -> %string {% id %}

_ -> %space {% v => '' %}
	| null {% v => '' %}
# mandatory whitespace
__ -> %space {% v => ' ' %}

EOL -> %space {% v => 'EOL' %}
	| _ ";" {% v => v[1] %}

@{% 
    
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
%}
