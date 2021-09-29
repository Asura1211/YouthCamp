import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: "./index.js",
    output: {
        file: "dist/bundle.js",
        format:"esm"
    },
    plugins: [nodeResolve(), commonjs()],
    // 不打包所有的 vue
    external:["vue"],
}