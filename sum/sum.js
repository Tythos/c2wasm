/**
 * @author <code@tythos.net>
 */

require(['../lib/logger'], function(logger) {
  fetch('./sum.wasm')
      .then(response => response.arrayBuffer())
      .then(bytes => WebAssembly.instantiate(bytes, {}))
      .then(instantiation => {
        const exports = instantiation.instance.exports;
        const jsArray = [1, 2, 3, 4];
        const cArrayPointer = exports.malloc(jsArray.length * 4);
        const cArray = new Uint32Array(
            exports.memory.buffer, cArrayPointer, jsArray.length);
        cArray.set(jsArray);
        logger.log(exports.sum(cArrayPointer, cArray.length));
      })
});
