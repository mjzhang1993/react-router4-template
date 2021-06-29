const path = require('path');

module.exports = {
  resolve: function (...basicPath) {
    return function (dir) {
      return path.join(...basicPath, dir || '');
    };
  }
}
