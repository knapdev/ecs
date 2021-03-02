import hashId from '../math/hash.js'

class Component {
	constructor(entity){
		this._hashId = hashId(this.constructor.name);
		this._entity = entity;

	}

	get entity(){
		return this._entity;
	}
}

export default Component