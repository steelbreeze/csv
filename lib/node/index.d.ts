/**
 * Parses a string encoded as a comma seperated values.
 * @param text The source csv text.
 * @returns An array of objects.
 */
export declare function parse(text: string): Array<any>;
/**
 * Encodes an array of objects as comma seperated values in accordance to RFC 4180
 * @param items
 * @returns
 */
export declare function encode(items: Array<any>): string;
/**
 * Encodes an array of values as a row in a csv.
 * @param values The array of values to encode
 */
export declare function row(values: Array<any>): string;
/**
 * Encodes a single field ready for a csv.
 * Doubles up double quotes and quotes the whole field if is contains a comma or double quote
 * @param value The value to encode
 */
export declare function field(value: any): string;
