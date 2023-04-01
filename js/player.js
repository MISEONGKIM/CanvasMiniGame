import { App } from './app.js';
import { BoundingBox } from './boundingBox.js';

export class Player {
    constructor() {
        this.img = document.querySelector('#player-img');

        this.x = App.width * 0.1;
        this.y = App.height * 0.5;

        this.width = 130;
        //�̹��� ������ 2096 * 96, player�� ������ 15�� , �� �Ѹ����� ���� ���� ����(���� : 2096 /15, ���� : 96) 140:96
        this.height = this.width * (96 / Math.ceil(2096 / 15));

        this.frameRate = 0;
        this.frame = 0;

        this.gravity = 0.3;
        this.vy = -10;

        App.canvas.addEventListener('click', () => {
            this.vy += -10;
        });

        // + 10, + 16 �̷� �͵��� �ڽ� ũ�� �����ؼ� ������ ũ��� ����� ���� ������ ��.
        this.boundingBox = new BoundingBox(this.x + 10, this.y + 16, this.width - 15, this.height - 20);
    }
    update() {
        this.frameRate += 1;
        //������ ��ȯ �ӵ� 2�� �������� 
        if (this.frameRate % 2 === 0) {
            this.frame = ++this.frame % 15;
        }
        this.vy += this.gravity;
        this.y += this.vy;

        this.boundingBox.y = this.y + 16;

        if( this.y < 0) {
            this.y = 0;
            this.vy = 0;
        }
    }

    draw() {
        App.ctx.drawImage(
            this.img,
            (this.img.width / 15) * this.frame, 0, this.img.width / 15 , this.img.height,
            this.x, this.y, this.width, this.height
        );
        // this.boundingBox.draw();
    }
}