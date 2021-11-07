/**
 * @author <code@tythos.net>
 */

require(['../lib/logger', '../lib/wasi.esm'], function(logger, wasi) {
  (async () => {
    const memory = new WebAssembly.Memory({initial: 2});
    const response = await fetch('./malloc_copy.wasm');
    const bytes = await response.arrayBuffer();
    let wmi = new wasi.WASI();
    const {instance} = await WebAssembly.instantiate(
        bytes, {'env': {memory}, 'wasi_snapshot_preview1': wmi.wasiImport});
    const text = 'Hello from JavaScript!';
    const view1 = new Uint8Array(memory.buffer);
    const pInput = instance.exports.malloc(1024);
    const view2 = new Uint8Array(memory.buffer);
    encode(view2, pInput, text);
    const pOutput = instance.exports.malloc_copy(pInput, text.length);
    logger.log(`copy: ${decode(view2, pOutput)}`);
  })();

  const encode = (memory, base, string) => {
    for (let i = 0; i < string.length; i++) {
      memory[base + i] = string.charCodeAt(i);
    }
    memory[base + string.length] = 0;
  };

  const decode = (memory, base) => {
    let cursor = base;
    let result = '';
    while (memory[cursor] !== 0) {
      result += String.fromCharCode(memory[cursor++]);
    }
    return result;
  };
});
