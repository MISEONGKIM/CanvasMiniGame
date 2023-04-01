import { App } from "./app.js";
import { Coin } from './coin.js';

export class Score {
    constructor() { 

        this.distCount = 0;
        this.scoreCount = 0;

        this.coin = new Coin(App.width - 50, 50, 0);
        this.coin.frame = 9; //총 10장의 이미지 중에서 마지막 이미지가 정면사진이라서 
    }

    update() {
        this.distCount += 0.015;
    }

    draw() {
        this.coin.draw();

        App.ctx.font = '55px Jua';
        App.ctx.fillStyle = '#f1f1f1';
        App.ctx.textAlign = 'right';
        App.ctx.fillText(this.scoreCount, App.width - 90, 69);

        App.ctx.textAlign = 'left';
        App.ctx.fillText(Math.floor(this.distCount) + 'm', 22, 69);
    }
}