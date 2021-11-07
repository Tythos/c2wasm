/**
 * @author <code@tythos.net>
 */

define(function(require, exports, module) {
  function log(msg) {
    let body = window.document.body;
    let pre = body.querySelector('pre');
    let now = new Date();
    if (!pre) {
      pre = window.document.createElement('pre');
      body.appendChild(pre);
    }
    pre.textContent += `[${now.toISOString()}]# ${msg}\n`;
  }

  return Object.assign(exports, {'log': log});
});
