var fs          = require('fs');
var coffee      = require('coffee-script');
var cjsx        = require('coffee-react-transform');
var transformed = false;

function transform() {
  if (transformed) {
    return;
  }

  require.extensions['.coffee'] = require.extensions['.cjsx'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    try {
      src = coffee.compile(cjsx(src), { 'bare': true });
    } catch (e) {
      throw new Error('Error transforming ' + filename + ' from CJSX: ' + e.toString());
    }
    module._compile(src, filename);
  };

  transformed = true;
}

module.exports = {
  transform: transform
};
