
/**
 * Parses a string encoded as a comma seperated values
 * @param text The source csv text.
 * @returns An array of objects.
 */
export function parse(text: string): Array<any> {
	// convert the csv formatted test into a table of tokens
	const tokens = text.replace(/^\uFEFF|\r\n$|\n$|\r$/g, '')	// trim byte order mark from beginning and trailing EOL if present
		.split(/\r\n|\n|\r/).map(row =>							// split text into rows at EOL
			row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)			// split row into tokens based on comma delimiter (unless in quotes)
				.map(token => token.replace(/(^"|"$)/g, '')		// dequote tokens if needed 
					.replace(/\"\"/g, '"')));					// replace double double quotes with double quotes

	// extract the header row and use for the property names
	const header = tokens.shift();

	// convert subsiquent rows into objects
	return header ? tokens.map(row => Object.fromEntries(header.map((column, index) => [column, row[index]]))) : [];
}
