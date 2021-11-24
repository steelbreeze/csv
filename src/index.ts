/**
 * Parses a string encoded as a comma seperated values
 * @param text The source csv text.
 * @returns An array of objects.
 */
export function parse(text: string): Array<any> {
	// trim byte order mark from beginning and any trailing EOL if present
	const tokens = text.replace(/^\uFEFF|[\r\n]+$/, '')
		// split text into rows at EOL (unless in quotes)
		.split(/\r?\n(?=(?:(?:[^"]*"){2})*[^"]*$)|\r(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(row =>
			// split row into tokens based on comma delimiter (unless in quotes)
			row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
				// dequote tokens if needed 
				.map(token => token.replace(/(^"|"$)/g, '')
					// replace double double quotes with double quotes
					.replace(/\"\"/g, '"')));

	// extract the header row and use for the property names
	const header = tokens.shift();

	// convert subsiquent rows into objects
	return header ? tokens.map(row => Object.fromEntries(header.map((column, index) => [column, row[index]]))) : [];
}
