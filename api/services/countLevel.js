module.exports = function(sss) {
	var xp = sss/10;
	var _xp = 0;
	var level = 0;
	while(_xp < xp){
		_xp += level;
		level =	level + 1;
	}
	level--;
	return level
}

