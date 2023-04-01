import { App } from './app.js';

export class Coin {
    static list = [];

    constructor(x, y, vx) {
        this.img = document.querySelector('#coin-img');
        
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.vx = vx;

        this.frame = 0;
    }
    
    static create(x, y, vx) {
        Coin.list.push(new Coin(x, y, vx));
    }

    static remove(index) {
        Coin.list.splice(index, 1);
    }

    update() {
        this.frame = ++this.frame % 10;
        this.x += this.vx;
    }

    draw() {
        App.ctx.drawImage(
            this.img,
            this.img.width / 10 * this.frame, 0, this.img.width / 10,  this.img.height,
            this.x - this.width / 2, this.y  - this.width / 2, this.width, this.height
        );
    }
}