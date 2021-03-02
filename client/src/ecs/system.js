
export class System {
	constructor(){
		this._active = true;
		this._requiredComponents = [];
	}

	init(){
	}

	process(entity, deltaTime){
	}

	get active(){
		return this._active;
	}

	set active(flag){
		this._active = flag;
	}
}