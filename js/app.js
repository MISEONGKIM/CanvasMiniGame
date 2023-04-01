import { Background, Wall } from "./index.js";

export class App {
    static canvas = document.querySelector('canvas');
    static ctx = App.canvas.getContext('2d');
    //�ִ� dpr ���� 2�� ����. �ֳĸ� dpr�� 3�Ǵ� 4�� �� ��� �����̽��� ���� ���� ����. 2�� ����� �����ϰ� ����.
    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;
    static width = 1024;
    static height = 768;

    constructor() {
        this.backgrounds = [
            new Background({img : document.querySelector('#bg3-img'), speed : -1}),
            new Background({img : document.querySelector('#bg2-img'), speed : -2}),
            new Background({img : document.querySelector('#bg1-img'), speed : -4}),
        ];
        Wall.create();
        this.preTime = Date.now();
        window.addEventListener('resize', this.resize.bind(this));

    }

    animation() {
        requestAnimationFrame(this.animation.bind(this));
        const now = Date.now();
        if (now - this.preTime < App.interval) return;
        this.exec();
        this.preTime = now - ((now - this.preTime) % App.interval);
    }

    resize() {
        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        //���������� ����� ���� width�� �Ʒ�ó�� ���� ���� 90%������ ����
        const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
        // 4: 3 �� ����
        App.canvas.style.width = width + 'px';
        App.canvas.style.height = width * (3 / 4) + 'px';
    }

    start() {
        window.addEventListener('load', () => {
            this.resize();
            this.animation();
        });
    }

    exec() {
        App.ctx.clearRect(0, 0, App.width, App.height);
        this.backgrounds.forEach(bg => {
            bg.update();
            bg.draw();
        });

        for (let i = Wall.list.length - 1; i > -1; i--) {
            Wall.list[i].update();
            Wall.list[i].draw();

            if(Wall.list[i].canGenerateWall) {
                Wall.list[i].isGenerate = true;
                Wall.create();
            }

            if(Wall.list[i].isOutside) {
                Wall.remove(i);
            }
        }
    };
}