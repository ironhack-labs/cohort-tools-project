function getQuery(program) {
	const query = {}
	if (program) {
		const regexpProgram = new RegExp(program, "i")
		query.program = regexpProgram
	}
	
	return query
}

module.exports = getQuery
