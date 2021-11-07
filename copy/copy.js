/**
 * @author <code@tythos.net>
 */

require(['../lib/logger', '../lib/wasi.esm'], function(logger, wasi) {
  (async () => {
    const memory = new WebAssembly.Memory({'initial': 2});
    const response = await fetch('./copy.wasm');
    const bytes = await response.arrayBuffer();
    let wmi = new wasi.WASI();
    const {instance} = await WebAssembly.instantiate(
        bytes, {'env': {memory}, 'wasi_snapshot_preview1': wmi.wasiImport});
    const text = 'Hello from Javascript!';
    const view = new Uint8Array(memory.buffer);
    const pInput = instance.exports.__heap_base;
    const pOutput = pInput + 1024;
    encode(view, pInput, text);
    const bytesCopied = instance.exports.copy(pInput, pOutput, text.length);
    logger.log(`copy length: ${bytesCopied}`);
    logger.log(`copy: ${decode(view, pOutput)}`);
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
