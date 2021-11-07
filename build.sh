#!/bin/bash
echo "Building WASM targets for .C files (add, sum, copy, malloc_copy)"
clang --target=wasm32 -O3 -flto -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--lto-O3 -Wl,-z,stack-size=$[8 * 1024 * 1024] -o add/add.wasm add/add.c
clang --target=wasm32 -O3 -flto -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--lto-O3 -Wl,-z,stack-size=$[8 * 1024 * 1024] -o sum/sum.wasm sum/sum.c
clang --target=wasm32-unknown-wasi --sysroot /root/Projects/wasi-libc/sysroot -nostartfiles -Wl,--import-memory -Wl,--export-all -Wl,--no-entry -o copy/copy.wasm copy/copy.c
clang --target=wasm32-unknown-wasi --sysroot /root/Projects/wasi-libc/sysroot -nostartfiles -Wl,--import-memory -Wl,--export-all -Wl,--no-entry -o malloc_copy/malloc_copy.wasm malloc_copy/malloc_copy.c
