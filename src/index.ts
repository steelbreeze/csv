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
const doubledoublequote = /\"\"/g

/**
 * Parses a string encoded as a comma seperated values
 * @param text The source csv text.
 * @returns An array of objects.
 */
export function parse(text: string): Array<any> {
	// convert the csv formatted test into a table of tokens
	const tokens = text.replace(trim, '').split(eol).map(row => row.split(delimiter).map(token => token.replace(dequote, '').replace(doubledoublequote, '"')));

	// extract the header row and use for the property names
	const header = tokens.shift();

	// convert subsiquent rows into objects
	return header ? tokens.map(row => Object.fromEntries(header.map((column, index) => [column, row[index]]))) : [];
}