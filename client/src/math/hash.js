function hashId(string){
	let hash = 5381;

	let i = string.length;
	while(i){
		hash = (hash * 33) ^ string.charCodeAt(--i);
	}

	return hash >>> 0;
}

export default hashId