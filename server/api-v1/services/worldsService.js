const worlds = {
	Earth: {
		name: "Earth",
	},
};

const worldsService = {
	getWorlds(name) {
		return worlds[name] ? [worlds[name]] : [];
	},
};

exports.worldsService = worldsService;
