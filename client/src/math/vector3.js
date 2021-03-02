
export class Vector3 {
	constructor(){
		this._x = 0;
		this._y = 0;
		this._z = 0;
	}

	set(x, y, z){
		this._x = x;
		this._y = y;
		this._z = z;
	}

	set x(val){
		this._x = val;
	}

	get x(){
		return this._x;
	}

	set y(val){
		this._y = val;
	}

	get y(){
		return this._y;
	}

	set z(val){
		this._z = val;
	}

	get z(){
		return this._z;
	}	
}