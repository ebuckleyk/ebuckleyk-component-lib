// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
//https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import bundleSize from 'rollup-plugin-bundle-size';
import replace from '@rollup/plugin-replace';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [{
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    }, {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }],
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
      terser(),
      bundleSize()
    ]
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    // https://stackoverflow.com/questions/71848226/creating-react-library-with-rollup-js-i-get-error-null-reading-usestate/72604051#72604051
    external: [/\.(css|less|scss)$/, 'react', 'react-dom']
  }
]