import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript';

const input = 'index.ts'
const sourcemap = true

export default [{
    input,
    output: {
        file: 'dist/simple-statistics.mjs',
        format: 'es',
        sourcemap
    },
    plugins: [typescript()]
}, {
    input,
    output: {
        file: 'dist/simple-statistics.js',
        format: 'cjs',
        sourcemap
    },
    plugins: [typescript()]
},
{
    input,
    output: {
        file: 'dist/simple-statistics.min.js',
        format: 'umd',
        name: 'ss',
        sourcemap
    },
    plugins: [typescript(), uglify()]
}]
