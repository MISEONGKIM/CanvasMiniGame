import { App } from './app.js';

export class Bird {
    constructor() {
        this.img = document.querySelector('#bird-img');

        this.x = App.width * 0.1;
        this.y = App.height * 0.5;

        this.width = 130;
        //이미지 사이즈 2096 * 96, bird의 갯수는 15개 , 새 한마리당 가로 세로 비율(가로 : 2096 /15, 세로 : 96) 140:96
        this.height = this.width * (96 / Math.ceil(2096 / 15));

        this.frameRate = 0;
        this.frame = 0;

        this.gravity = 0.3;
        this.vy = -10;

        App.canvas.addEventListener('click', () => {
            this.vy += -10;
            console.log(this.vy);
        });
    }
    update() {
        this.frameRate += 1;
        //프레임 변환 속도 2배 느려지게 
        if (this.frameRate % 2 === 0) {
            this.frame = ++this.frame % 15;
        }
        this.vy += this.gravity;
        this.y += this.vy;
    }

    draw() {
        App.ctx.drawImage(
            this.img,
            (this.img.width / 15) * this.frame, 0, this.img.width / 15 , this.img.height,
            this.x, this.y, this.width, this.height
        )
    }
}