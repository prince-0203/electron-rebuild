'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _spawnRx = require('spawn-rx');

var _chai = require('chai');

var _rebuild = require('../lib/rebuild');

var _rebuild2 = _interopRequireDefault(_rebuild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ora2.default.ora = _ora2.default;

describe('rebuilder', function () {
  var testModulePath = _path2.default.resolve(_os2.default.tmpdir(), 'electron-forge-rebuild-test');

  var resetTestModule = function () {
    var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _fsPromise2.default.remove(testModulePath);

            case 2:
              _context.next = 4;
              return _fsPromise2.default.mkdirs(testModulePath);

            case 4:
              _context.t0 = _fsPromise2.default;
              _context.t1 = _path2.default.resolve(testModulePath, 'package.json');
              _context.next = 8;
              return _fsPromise2.default.readFile(_path2.default.resolve(__dirname, '../test/fixture/native-app1/package.json'), 'utf8');

            case 8:
              _context.t2 = _context.sent;
              _context.next = 11;
              return _context.t0.writeFile.call(_context.t0, _context.t1, _context.t2);

            case 11:
              _context.next = 13;
              return (0, _spawnRx.spawnPromise)('npm', ['install'], {
                cwd: testModulePath,
                stdio: 'inherit'
              });

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function resetTestModule() {
      return _ref.apply(this, arguments);
    };
  }();

  describe('core behavior', function () {
    before(resetTestModule);

    before((0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _rebuild2.default)(testModulePath, '1.4.12', process.arch);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('should have rebuilt top level prod dependencies', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee3() {
      var forgeMeta;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              forgeMeta = _path2.default.resolve(testModulePath, 'node_modules', 'ref', 'build', 'Release', '.forge-meta');
              _context3.t0 = _chai.expect;
              _context3.next = 4;
              return _fsPromise2.default.exists(forgeMeta);

            case 4:
              _context3.t1 = _context3.sent;
              (0, _context3.t0)(_context3.t1, 'ref build meta should exist').to.equal(true);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('should have rebuilt children of top level prod dependencies', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee4() {
      var forgeMetaGoodNPM, forgeMetaBadNPM;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              forgeMetaGoodNPM = _path2.default.resolve(testModulePath, 'node_modules', 'microtime', 'build', 'Release', '.forge-meta');
              forgeMetaBadNPM = _path2.default.resolve(testModulePath, 'node_modules', 'benchr', 'node_modules', 'microtime', 'build', 'Release', '.forge-meta');
              _context4.t0 = _chai.expect;
              _context4.next = 5;
              return _fsPromise2.default.exists(forgeMetaGoodNPM);

            case 5:
              _context4.t1 = _context4.sent;

              if (_context4.t1) {
                _context4.next = 10;
                break;
              }

              _context4.next = 9;
              return _fsPromise2.default.exists(forgeMetaBadNPM);

            case 9:
              _context4.t1 = _context4.sent;

            case 10:
              _context4.t2 = _context4.t1;
              (0, _context4.t0)(_context4.t2, 'microtime build meta should exist').to.equal(true);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it('should have rebuilt children of scoped top level prod dependencies', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee5() {
      var forgeMeta;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              forgeMeta = _path2.default.resolve(testModulePath, 'node_modules', '@newrelic/native-metrics', 'build', 'Release', '.forge-meta');
              _context5.t0 = _chai.expect;
              _context5.next = 4;
              return _fsPromise2.default.exists(forgeMeta);

            case 4:
              _context5.t1 = _context5.sent;
              (0, _context5.t0)(_context5.t1, '@newrelic/native-metrics build meta should exist').to.equal(true);

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('should have rebuilt top level optional dependencies', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee6() {
      var forgeMeta;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              forgeMeta = _path2.default.resolve(testModulePath, 'node_modules', 'zipfile', 'build', 'Release', '.forge-meta');
              _context6.t0 = _chai.expect;
              _context6.next = 4;
              return _fsPromise2.default.exists(forgeMeta);

            case 4:
              _context6.t1 = _context6.sent;
              (0, _context6.t0)(_context6.t1, 'zipfile build meta should exist').to.equal(true);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    it('should not have rebuilt top level devDependencies', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee7() {
      var forgeMeta;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              forgeMeta = _path2.default.resolve(testModulePath, 'node_modules', 'ffi', 'build', 'Release', '.forge-meta');
              _context7.t0 = _chai.expect;
              _context7.next = 4;
              return _fsPromise2.default.exists(forgeMeta);

            case 4:
              _context7.t1 = _context7.sent;
              (0, _context7.t0)(_context7.t1, 'ffi build meta should not exist').to.equal(false);

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    after((0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _fsPromise2.default.remove(testModulePath);

            case 2:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));
  });

  describe('force rebuild', function () {
    before(resetTestModule);

    it('should skip the rebuild step when disabled', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee9() {
      var rebuilder, skipped;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return (0, _rebuild2.default)(testModulePath, '1.4.12', process.arch);

            case 2:
              rebuilder = (0, _rebuild2.default)(testModulePath, '1.4.12', process.arch, [], false);
              skipped = 0;

              rebuilder.lifecycle.on('module-skip', function () {
                skipped++;
              });
              _context9.next = 7;
              return rebuilder;

            case 7:
              (0, _chai.expect)(skipped).to.equal(4);

            case 8:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));

    it('should rebuild all modules again when enabled', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee10() {
      var rebuilder, skipped;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return (0, _rebuild2.default)(testModulePath, '1.4.12', process.arch);

            case 2:
              rebuilder = (0, _rebuild2.default)(testModulePath, '1.4.12', process.arch, [], true);
              skipped = 0;

              rebuilder.lifecycle.on('module-skip', function () {
                skipped++;
              });
              _context10.next = 7;
              return rebuilder;

            case 7:
              (0, _chai.expect)(skipped).to.equal(0);

            case 8:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));
  });
});