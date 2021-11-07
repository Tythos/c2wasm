/**
 * @file sum.c
 * @author Brian Kirkpatrick (code@tythos.net)
 * @brief See README.md
 * @version 0.1
 * @date 2021-11-06
 * 
 * @copyright Copyright (c) 2021
 * 
 */

extern unsigned char __heap_base;

unsigned int bump_pointer = &__heap_base;

void* malloc(int n) {
    unsigned int r = bump_pointer;
    bump_pointer += n;
    return (void*)r;
}

void free(void* p) {
    // lol
}

int sum(int a[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += a[i];
    }
    return sum;
}
