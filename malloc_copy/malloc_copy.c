/**
 * @file malloc_copy.c
 * @author Brian Kirkpatrick (code@tythos.net)
 * @brief See README.md
 * @version 0.1
 * @date 2021-11-06
 * 
 * @copyright Copyright (c) 2021
 * 
 */

#include <string.h>
#include <stdlib.h>

char* malloc_copy(char* input) {
    char* result = malloc(1024);
    strncpy(result, input, strlen(input));
    return result;
}
