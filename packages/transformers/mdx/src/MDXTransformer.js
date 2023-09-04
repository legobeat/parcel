// @flow
import {Transformer} from '@parcel/plugin';
import {CompileOptions} from '@mdx-js/mdx';

export default (new Transformer({
  async transform({asset}, compileOpts?: CompileOptions) {
    let {compile} = await import('@mdx-js/mdx');
    let code = await asset.getCode();

    try {
      let compiled = await compile(code, compileOpts);
      asset.type = 'js';
      asset.setCode(compiled.value);
    } catch (e) {
      throw e.toString(); // Adds the line and column number of errors
    }

    return [asset];
  },
}): Transformer);
