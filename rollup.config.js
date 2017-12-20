import uglify from 'rollup-plugin-uglify'

const input = 'index.js'
const sourcemap = true

export default [{
    input,
    output: {
        file: 'dist/simple-statistics.mjs',
        format: 'es',
        sourcemap
    }
}, {
    input,
    output: {
        file: 'dist/simple-statistics.js',
        format: 'cjs',
        sourcemap
    }
},
{
    input,
    output: {
        file: 'dist/simple-statistics.min.js',
        format: 'umd',
        name: 'ss',
        sourcemap
    },
    plugins: [uglify()]
}]
