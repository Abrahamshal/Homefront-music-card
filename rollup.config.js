import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/homefront-music-card.ts',
  output: {
    file: 'dist/homefront-music-card.js',
    format: 'es',
    sourcemap: dev ? 'inline' : false,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !!dev,
      inlineSources: !!dev,
    }),
    !dev && terser({
      format: { comments: false },
      mangle: { keep_classnames: true },
    }),
  ].filter(Boolean),
};
