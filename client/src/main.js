import { Entity } from './ecs/entity.js'
import { Component } from './ecs/component.js'
import { System } from './ecs/system.js'

import { Vector3 } from './math/vector3.js'

console.log('Started...');

class Transform extends Component {
	constructor(entity){
		super(entity);

		this.position = new Vector3();
		this.rotation = new Vector3();
		this.scale = new Vector3();
	}
}

class Color extends Component {
	constructor(entity){
		super(entity);

		this.r = 0;
		this.g = 0;
		this.b = 0;
	}
}

class Body extends Component {
	constructor(entity){
		super(entity);

		this.velocity = new Vector3();
	}
}

class Lifetime extends Component {
	constructor(entity){
		super(entity);

		this.amount = 0;
	}
}

class LifetimeSystem extends System {
	constructor(){
		super();

		this._requiredComponents = [Transform, Lifetime];
	}

	init(){
		super.init();
	}

	process(entity, deltaTime){

		if(entity.hasAllComponents(this._requiredComponents)){
			entity.lifetime.amount -= 0.01;

			if(entity.lifetime.amount <= 0){
				entity.transform.position.set(Math.random() * 500, Math.random() * 300, 0);
				entity.lifetime.amount = Math.random() * 10;
			}
		}

		for(let i = 0; i < entity.getAllChildren().length; i++){
			let child = entity.getChildAt(i);
			this.process(child);
		}
	}
}

class MovementSystem extends System {
	constructor(){
		super();
		this._requiredComponents = [Transform, Body];
	}

	init(){
		super.init();
	}

	process(entity, deltaTime){
		super.process(entity, deltaTime);

		if(entity.hasAllComponents(this._requiredComponents)){
			let transform = entity.getComponent(Transform);
			let body = entity.getComponent(Body);

			transform.position.x += body.velocity.x;
			transform.position.y += body.velocity.y;
			transform.position.z += body.velocity.z;

			if(transform.position.x > 500 || transform.position.x < 0){
				body.velocity.x = -body.velocity.x;
			}

			if(transform.position.y > 300 || transform.position.y < 0){
				body.velocity.y = -body.velocity.y;
			}
		}

		for(let i = 0; i < entity.getAllChildren().length; i++){
			let child = entity.getChildAt(i);
			this.process(child);
		}
	}
}

class RenderSystem extends System {
	constructor(){
		super();
		this._requiredComponents = [Transform, Color];

		this._canvas = null;
		this._context = null;
	}

	init(){
		super.init();

		this._canvas = document.getElementById('canvas');
		this._context = this._canvas.getContext('2d');
	}

	preRender(){
		this._context.fillStyle = 'rgb(0, 0, 0)';
		this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
	}

	process(entity, deltaTime){
		super.process(entity, deltaTime);

		if(entity.hasAllComponents(this._requiredComponents)){
			this._context.fillStyle = 'rgb(' + entity.color.r + ', ' + entity.color.g + ', ' + entity.color.b + ')';

			let parentX = 0;
			let parentY = 0;

			if(entity.getParent() !== null){
				parentX = entity.getParent().transform.position.x || 0;
				parentY = entity.getParent().transform.position.y || 0;
			}
			this._context.fillRect(entity.transform.position.x + parentX, entity.transform.position.y + parentY, 32, 32);
		}

		for(let i = 0; i < entity.getAllChildren().length; i++){
			let child = entity.getChildAt(i);
			this.process(child);
		}
	}
}

let root = new Entity('Root');
root.addComponent(Transform);

for(let i = 0; i < 1000; i++){
	let child = new Entity('Child' + i);
	child.addComponents([Transform, Body, Color, Lifetime]);
	child.transform.position.set(Math.random() * 500, Math.random() * 300, 0);
	child.body.velocity.set(Math.random() * 10 - 5, Math.random() * 10 - 5);
	child.color.r = Math.random() * 255;
	child.color.g = Math.random() * 255;
	child.color.b = Math.random() * 255;
	child.lifetime.amount = Math.random() * 10;
	child.setParent(root);
}

let lifetimeSystem = new LifetimeSystem();
lifetimeSystem.init();

let movementSystem = new MovementSystem();
movementSystem.init();

let renderSystem = new RenderSystem();
renderSystem.init();

requestAnimationFrame(loop);

let then = 0;
function loop(now){
	let deltaTime = (now - then) / 1000;
	lifetimeSystem.process(root, deltaTime);

	movementSystem.process(root, deltaTime);

	renderSystem.preRender();
	renderSystem.process(root, deltaTime);

	then = now;
	requestAnimationFrame(loop);
}