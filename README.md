C2WASM
======

Based on a set of exercises from one of my favorite no-Emscripten-required
C/WASM tutorials:

  https://dassur.ma/things/c-to-webassembly/

If you are running from Windows, I would highly suggest a managed build
environment; I happen to maintain one I'm pretty happy with and it's easy to
set up:

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

A Note About LibC
-----------------

The "copy.c" and "malloc_copy.c" programs are meant to test wasi-libc
integration; they both assume:

* You have successfully cloned & built the wasi-libc project in
  "/root/Projects/wasb-libc", resulting in a "sysroot/" folder under that
  directory

* You have installed the necessary libclang runtime (e.g.,
  "libclang_rt.builtins-wasm32.a") at "/usr/lib64/clang/12.0.1/lib/wasi"

For more details, refer to the following tutorial:

  https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/

For the second bullet point specifically, I would recommend the following
releases (as opposed to the expired project referenced in the article):

  https://github.com/WebAssembly/wasi-sdk/releases

Note that the example in "copy" also shows how to use a third-party WASI
browser runtime, integrated with a RequireJS modularization scheme, to hand off
the appropriate imports to the WASM module instantiation. Otherwise, you would
see the following error (on Firefox; the Chrome text is almost identical):

  ```
  > Uncaught (in promise) TypeError: import object field 'wasi_snapshot_preview1' is not an Object
  ```
