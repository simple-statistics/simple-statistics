import uglify from 'rollup-plugin-uglify';

export default [{
    input: 'index',
    output: {
        extend: true,
        sourcemap: true,
        file: 'dist/simple-statistics.js',
        format: 'umd',
        name: 'ss'
    }
}, {
    input: 'index',
    output: {
        extend: true,
        sourcemap: true,
        file: 'dist/index.js',
        format: 'cjs'
    }
}, {
    input: 'index',
    output: {
        extend: true,
        sourcemap: true,
        file: 'dist/simple-statistics.min.js',
        format: 'umd',
        name: 'ss'
    },
    plugins: [
        uglify()
    ]
}];
