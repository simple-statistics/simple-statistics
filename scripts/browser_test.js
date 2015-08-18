var path = require('path'),
  brtapsauce = require('brtapsauce');

if (!process.env.SAUCE_USER) {
  throw new Error('Must set a SAUCE_USER env var');
}

if (!process.env.SAUCE_KEY) {
  throw new Error('Must set a SAUCE_KEY env var');
}

var user = process.env.SAUCE_USER,
  key = process.env.SAUCE_KEY;

// list of browsers & versions that you want to test
var capabilities = [
  {
    browserName: 'chrome',
    platform: 'Windows 8',
    version: ''
  },
  {
    browserName: 'firefox',
    platform: 'Windows 8',
    version: ''
  },
  {
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  },
  {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  },
  {
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  },
  {
    browserName: 'internet explorer',
    platform: 'Windows XP',
    version: '7'
  },
  {
    browserName: 'internet explorer',
    platform: 'Windows XP',
    version: '6'
  },
  {
    browserName: 'safari',
    platform: 'Windows 7',
    version: '5'
  },
  {
    browserName: 'opera',
    platform: 'Windows 7',
    version: ''
  },
  {
    browserName: 'ipad',
    platform: 'OS X 10.8',
    version: '6'
  },
  {
    browserName: 'android',
    platform: 'Linux',
    version: '4.0',
    'device-type': 'tablet'
  }
];

brtapsauce({
  name: 'Simple Statistics',
  user: user,
  key: key,
  brsrc: path.join(__dirname, 'required_test.js'),
  capabilities: capabilities
});
