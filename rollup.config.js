const pkg = require('./package.json');
const year = (new Date()).getFullYear();

export default {
  entry: 'src/scrollProgress.js',
  dest: 'dist/scrollProgress.js',
  format: 'umd',
  globals: [
    'window'
  ],
  indent: true,
  useStrict: true,
  moduleName: 'ScrollProgress',
  banner: `/* ${ pkg.name } v${ pkg.version } - ${ year } Jeremias Menichelli - MIT License */`
};
