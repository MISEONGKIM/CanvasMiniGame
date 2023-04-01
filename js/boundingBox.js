import { App } from './app.js';

export class BoundingBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(255, 0, 0, 0.3)';
    }

    isCollision(target) {
        return (
            target.x <= this.x + this.width &&
            target.x + target.width >= this.x &&
            target.y <= this.y + this.height &&
            target.y + target.height >= this.y 
        );
    }

    draw() {
        App.ctx.fillStyle = this.color;
        App.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}