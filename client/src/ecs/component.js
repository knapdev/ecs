import hashId from '../math/hash.js'

export class Component {
	constructor(entity){
		this._hashId = hashId(this.constructor.name);
		this._entity = entity;
	}

	get entity(){
		return this._entity;
	}
}