/**
 * @author <code@tythos.net>
 */

require(['../lib/logger'], function(logger) {
  fetch('./add.wasm')
      .then(response => response.arrayBuffer())
      .then(bytes => WebAssembly.instantiate(bytes, {}))
      .then(instantiation => {
        let add = instantiation.instance.exports.add;
        logger.log(add(4, 1));
      })
});
