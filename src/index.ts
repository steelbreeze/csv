// unicode character constants
const lineFeed           = '\u000A';
const carriageReturn     = '\u000D';
const doubleQuote        = '\u0022';
const comma              = '\u002C';
const lineSeperator      = '\u2028';
const paragraphSeperator = '\u2029';
const byteOrderMark      = '\uFEFF';

// regular expression fragments
const lineTerminator = `[${lineFeed}${carriageReturn}${lineSeperator}${paragraphSeperator}]+`; // any of the line terminator code points as defined in the ECMAScript® 2019 Language Specification
const unquoted = `(?=(?:(?:[^${doubleQuote}]*${doubleQuote}){2})*[^${doubleQuote}]*$)`; // a look ahead to ensure whatever is matched in not within double quotes

// regular expressions used to parse
const trim = new RegExp(`^${byteOrderMark}|${lineTerminator}$`);
const rows = new RegExp(`${lineTerminator}${unquoted}`);
const tokens = new RegExp(`${comma}${unquoted}`);
const quoted = new RegExp(`(^${doubleQuote}|${doubleQuote}$)`, 'g');
const doubleDoubleQuotes = new RegExp(`${doubleQuote}${doubleQuote}`, 'g');
const needsQuotes = new RegExp(`[${lineFeed}${carriageReturn}${lineSeperator}${paragraphSeperator}${doubleQuote}${comma}]`);

/**
 * Parses a string encoded as a comma seperated values.
 * @param text The source csv text.
 * @returns An array of objects.
 */
export function parse(text: string): Array<any> {
	// create a table of tokens from the source csv formatted text
	const table = text.replace(trim, '').split(rows).map(row => row.split(tokens).map(token => token.replace(quoted, '').replace(doubleDoubleQuotes, doubleQuote)));

	// extract the header row and use for the property names
	const header = table.shift();

	// convert subsiquent rows into objects
	return header ? table.map(row => Object.fromEntries(header.map((column, index) => [column, row[index]]))) : [];
}

/**
 * Encodes an array of objects as comma seperated values in accordance to RFC 4180
 * @param items 
 * @returns 
 */
export function encode(items: Array<any>): string {
	const keys = Object.keys(items[0]);

 	return [row(keys), ...items.map(item => row(keys.map(key => item[key] || '')))].join(`${carriageReturn}${lineFeed}`);
}

/**
 * Encodes an array of values as a row in a csv. 
 * @param values The array of values to encode
 */
export function row(values: Array<any>): string {
	return values.map(field).join(comma);
}

/**
 * Encodes a single field ready for a csv.
 * Doubles up double quotes and quotes the whole field if is contains a comma or double quote
 * @param value The value to encode
 */
 export function field(value: any): string {
	const result = String(value).replace(/\"/g, doubleDoubleQuotes.source);

	return result.match(needsQuotes) ? `"${result}"` : result;
}
