exports.random =  async (min, max) => {
	return min + Math.floor((max - min) * Math.random());
}