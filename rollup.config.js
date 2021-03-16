import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import sass from 'rollup-plugin-sass'
// import peerDepsExternal from "rollup-plugin-peer-deps-external";

const pkg = require('./package.json')

export default {
  input: 'src/index.tsx',
  external: ['react', 'react-hook-form'],
  plugins: [
    sass(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true
    }),
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ]
}
