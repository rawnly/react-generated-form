import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import bundleSass from './rollup-plugin-bundle-sass'

const pkg = require('./package.json')

export default {
  input: 'src/index.tsx',
  external: ['react', 'react-hook-form', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true
    }),
    bundleSass({
      targets: [
        {
          src: './src/style/style.scss',
          dest: 'css/style.css'
        }
      ]
    })
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
