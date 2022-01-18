const path_applied = process.cwd();
const BS = require('../lib/compiler');

module.exports = {
    parse (path) {
        console.clear()
        try {
            let content = BS(`${path_applied}/${path}`);
            if (content === void 0) {
                return '';
            }
            const ast_to_js = require('../lib/compiler/ast_to_js');
            let contentJS = ast_to_js(content);
            console.log(contentJS);
            return contentJS;
        } catch (err) {
            console.warn(new Error('Can\'t compile. Unexpected input.'));
            console.warn(new Error(err.message));
        }
    }
}
