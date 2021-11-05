C2WASM
======

Based on a set of exercises from one of my favorite no-Emscripten-required
C/WASM tutorials:

  https://dassur.ma/things/c-to-webassembly/

If you are running from Windows, I would highly suggest a managed build
environment; I happen to have one I'm pretty happy with and it's easy to set
up:

  https://github.com/Tythos/fed

From within this environment, you can of course use the build script to compile
optimized versions of WASM modules for each of the two C examples:

  ```sh
  > ./build.sh
  ```

And serving (you need streaming application/wasm or most browsers will fail to
construct an instance from octet content), the easiest way is probably:

  ```sh
  > python -m http.server
  ```
  
Thinking this will serve as the base of a number of WASM experiments I will be
trying in the future, so stability is nice, and hopefully that will make it
somewhat reusable (and may even lead to expanded capabilities once I get, for
example, a good libc libary integrated). Great excuse to dust off your K&R!
