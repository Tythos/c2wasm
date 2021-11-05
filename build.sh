#!/bin/bash
echo "Building WASM targets for .C files (add, sum)"
clang --target=wasm32 -O3 -flto -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--lto-O3 -Wl,-z,stack-size=$[8 * 1024 * 1024] -o add.wasm add.c
clang --target=wasm32 -O3 -flto -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--lto-O3 -Wl,-z,stack-size=$[8 * 1024 * 1024] -o sum.wasm sum.c
