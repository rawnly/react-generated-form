import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.tsx',
  external: ['react', 'react-hook-form'],
  plugins: [
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
