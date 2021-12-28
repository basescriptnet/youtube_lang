@{%
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
%}

@lexer lexer

process -> statements {% id %}

### statements ###
statements -> (_ statement {% v => v[1] %}):* _ {% id %}

statement -> number {% id %}

number -> %number {% v => Object.assign(v[0], {
    value: v[0].value.replace(/_/g, '')
}) %}

_ -> %space {% v => '' %}
	| null {% v => '' %}
# mandatory whitespace
__ -> %space {% v => ' ' %}
