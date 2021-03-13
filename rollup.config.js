import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.tsx',
  external: ['react', 'react-hook-form'],
  plugins: [
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true
    }),
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.es.js',
      format: 'esm'
    }
  ]
}
