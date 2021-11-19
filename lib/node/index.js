"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
/**
 * Finds byte order mark from the start of a string if present and trailing EOL from the end if present
 * @hidden
 */
const trim = /^\uFEFF|\r\n$|\n$|\r$/g;
/**
 * Finds EOLs
 * @hidden
 */
const eol = /\r\n|\n|\r/;
/**
 * Finds commas, but not if in a double quoted string
 * @hidden
 */
const delimiter = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
/**
 * Finds double quotes at the beginning or end of a string
 * @hidden
 */
const dequote = /(^"|"$)/g;
/**
 * Finds double double quotes
 * @hidden
 */
const doubledoublequote = /\"\"/g;
/**
 * Parses a string encoded as a comma seperated values
 * @param text The source csv text.
 * @returns An array of objects.
 */
function parse(text) {
    const tokens = text.replace(trim, '').split(eol).map(row => row.split(delimiter).map(token => token.replace(dequote, '').replace(doubledoublequote, '"')));
    const header = tokens.shift();
    return header ? tokens.map(row => Object.fromEntries(header.map((column, index) => [column, row[index]]))) : [];
}
exports.parse = parse;
