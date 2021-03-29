exports.random =  async (min, max) => {
	return min + Math.floor((max - min) * Math.random());
}

exports.formatTextLimitCharacters = async (text, length=2043) => {
	if((text == null) || (text.length <= length)) return text;

	text = text.substring(0, length+3);
	last = text.lastIndexOf(" ");
	text = text.substring(0, last);
	return text + "...";
}