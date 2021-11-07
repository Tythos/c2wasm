/**
 * @file copy.c
 * @author Brian Kirkpatrick (code@tythos.net)
 * @brief See README.md
 * @version 0.1
 * @date 2021-11-06
 * 
 * @copyright Copyright (c) 2021
 * 
 */

#include <string.h>

int copy(char *input, char *output) {
    const int length = strlen(input);
    strncpy(output, input, length);
    return length;
}

int main(int nArgs, char** vArgs) {
    return 0;
}
