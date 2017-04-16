export default {
  entry: 'src/index.js',
  plugins: [],
  external: [],
  sourceMap: true,
  moduleName: 'rollup',
  targets: [
    { dest: 'dist/simple-statistics.js', format: 'cjs' },
    { dest: 'dist/simple-statistics.es.js', format: 'es' }
  ]
};
