'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chai = require('chai');

var _spawnRx = require('spawn-rx');

var _electronLocater = require('../lib/electron-locater');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packageCommand = function packageCommand(command, packageName) {
  return (0, _spawnRx.spawnPromise)('npm', [command, packageName], {
    cwd: _path2.default.resolve(__dirname, '..'),
    stdio: 'ignore'
  });
};

var install = packageCommand.bind(undefined, 'install');
var uninstall = packageCommand.bind(undefined, 'uninstall');

var testElectronCanBeFound = function testElectronCanBeFound() {
  it('should return a valid path', function () {
    var electronPath = (0, _electronLocater.locateElectronPrebuilt)();
    (0, _chai.expect)(electronPath).to.be.a('string');
    (0, _chai.expect)(_fs2.default.existsSync(electronPath)).to.be.equal(true);
  });
};

describe('locateElectronPrebuilt', function () {
  before(function () {
    return uninstall('electron-prebuilt');
  });

  it('should return null when electron is not installed', function () {
    (0, _chai.expect)((0, _electronLocater.locateElectronPrebuilt)()).to.be.equal(null);
  });

  describe('with electron-prebuilt installed', function () {
    before(function () {
      return install('electron-prebuilt');
    });

    testElectronCanBeFound();

    after(function () {
      return uninstall('electron-prebuilt');
    });
  });

  describe('with electron installed', function () {
    before(function () {
      return install('electron');
    });

    testElectronCanBeFound();

    after(function () {
      return uninstall('electron');
    });
  });

  after(function () {
    return install('electron-prebuilt');
  });
});