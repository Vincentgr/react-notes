import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
require('babel-register')();

process.env.NODE_ENV = 'production';

Enzyme.configure({ adapter: new Adapter() });

 // Disable webpack-specific features
require.extensions['.css'] = function () {
  return null;
};
require.extensions['.png'] = function () {
  return null;
};
require.extensions['.jpg'] = function () {
  return null;
};
