import uglify from 'rollup-plugin-uglify';

function assign({ file, format, plugins }) {
    return {
        input: 'index',
        output: {
            file,
            format: format || 'umd',
            extend: true,
            sourcemap: true,
            name: 'ss'
        },
        plugins: plugins || []
    }
}
export default [
    assign({ file: 'dist/simple-statistics.js' }),
    assign({ file: 'dist/simple-statistics.min.js', plugins: [uglify()] }),
    assign({ format: 'cjs', file: 'dist/index.js' })
];
