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
const quotes = new RegExp(`(^${doubleQuote}|${doubleQuote}$)`, 'g');
const doubleDoubleQuotes = new RegExp(`${doubleQuote}${doubleQuote}`, 'g');

/**
 * Parses a string encoded as a comma seperated values
 * @param text The source csv text.
 * @returns An array of objects.
 */
export function parse(text: string): Array<any> {
	// create a table of tokens from the source csv formatted text
	const table = text.replace(trim, '').split(rows).map(row => row.split(tokens).map(token => token.replace(quotes, '').replace(doubleDoubleQuotes, doubleQuote)));

	// extract the header row and use for the property names
	const header = table.shift();

	// convert subsiquent rows into objects
	return header ? table.map(row => Object.fromEntries(header.map((column, index) => [column, row[index]]))) : [];
}
