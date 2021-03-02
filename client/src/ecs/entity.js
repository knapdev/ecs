
class Entity {
	constructor(name){
		this._id = 0; //getUUID()?
		this._name = name || 'New Entity';
		this._active = true;

		this._parent = null;
		this._children = [];

		this._components = {};
	}

	getParent(){
		return this._parent;
	}

	setParent(parent){
		this._parent = parent;
		parent._children.push(this);
	}

	getChild(name){
		for(let i = 0; i < this._children.length; i++){
			if(this._children[i].name == name){
				return this._children[i];
			}
		}

		return null;
	}

	getChildAt(index){
		return this._children[index];
	}

	getAllChildren(){
		return this._children;
	}

	addComponent(ComponentType){
		if(this._components[ComponentType.name] !== undefined){
			console.log('Entity (' + this._name + ') already has component of type "' + ComponentType.name);
			return null;
		}

		let component = new ComponentType(this);
		this._components[ComponentType.name] = component;

		this[ComponentType.name.toLowerCase()] = component;

		return this._components[ComponentType.name];
	}

	addComponents(ComponentTypes){
		for(let i = 0; i < ComponentTypes.length; i++){
			this.addComponent(ComponentTypes[i]);
		}
	}

	removeComponent(ComponentType){
		delete this._components[ComponentType.name];
		delete this[ComponentType.name.toLowerCase()];
	}

	removeComponents(ComponentTypes){
		for(let i = 0; i < ComponentTypes.length; i++){
			this.removeComponent(ComponentTypes[i]);
		}
	}

	getComponent(ComponentType){
		return this._components[ComponentType.name];
	}

	hasComponent(ComponentType){
		if(this._components[ComponentType.name] !== undefined){
			return true;
		}

		return false;
	}

	hasAllComponents(ComponentTypes){

		for(let i = 0; i < ComponentTypes.length; i++){
			if(this.hasComponent(ComponentTypes[i]) == false){
				return false;
			}
		}

		return true;
	}

	get name(){
		return this._name;
	}

	set name(newName){
		this._name = newName;
	}

	get active(){
		return this._active;
	}

	set active(flag){
		this._active = flag;
	}
}

export default Entity