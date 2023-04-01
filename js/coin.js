import { App } from './app.js';
import { BoundingBox } from './boundingBox.js';

export class Coin {
    static list = [];

    constructor(x, y, vx) {
        this.img = document.querySelector('#coin-img');
        
        this.width = 50;
        this.height = 50;
        this.x = x - this.width / 2;
        this.y = y  - this.width / 2;

        this.vx = vx;

        this.frame = 0;

        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }
    
    static reset() {
        Coin.list = [];
    }
    static create(x, y, vx) {
        Coin.list.push(new Coin(x, y, vx));
    }

    static remove(index) {
        Coin.list.splice(index, 1);
    }

    get isOutside() {
        return this.x + this.width < 0;
    }

    isCollision(target) {
        return this.boundingBox.isCollision(target);
    }

    update() {
        this.frame = ++this.frame % 10;
        this.x += this.vx;
        
        this.boundingBox.x = this.x;
    }

    draw() {
        App.ctx.drawImage(
            this.img,
            this.img.width / 10 * this.frame, 0, this.img.width / 10,  this.img.height,
            this.x, this.y , this.width, this.height
        );
        // this.boundingBox.draw();
    }
}