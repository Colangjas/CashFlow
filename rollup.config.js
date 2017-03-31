import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: './src/CashFlow.ts',
  dest: './build/CashFlow.js',
  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      extensions: [ '.ts', '.js', '.json' ]
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup', 'stage-2'],
      plugins: ['transform-object-assign']
    })
  ]
}