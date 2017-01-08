'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chai = require('chai');

var _readPackageJson = require('../lib/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('read-package-json', function () {
  it('should find a package.json file from the given directory', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _chai.expect;
            _context.next = 3;
            return (0, _readPackageJson2.default)(_path2.default.resolve(__dirname, '..'));

          case 3:
            _context.t1 = _context.sent;
            _context.t2 = require('../package.json');
            (0, _context.t0)(_context.t1).to.deep.equal(_context.t2);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});