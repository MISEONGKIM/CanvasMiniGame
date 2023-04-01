import { Background, Wall } from "./index.js";

export class App {
    static canvas = document.querySelector('canvas');
    static ctx = App.canvas.getContext('2d');
    //최대 dpr 값을 2로 설정. 왜냐면 dpr이 3또는 4가 될 경우 성능이슈가 생길 수도 있음. 2로 충분히 선명하게 보임.
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
        this.walls = [
            new Wall({type : 'BIG'})
        ];
        this.preTime = Date.now();
        window.addEventListener('resize', this.resize.bind(this));

    }

    animation() {
        requestAnimationFrame(this.animation.bind(this));
        const now = Date.now();
        if (now - this.preTime < App.interval) return;
        
        App.ctx.clearRect(0, 0, App.width, App.height);
        this.backgrounds.forEach(bg => {
            bg.update();
            bg.draw();
        })
        this.walls.forEach(w => {
            w.update();
            w.draw();
        })

        this.preTime = now - ((now - this.preTime) % App.interval);
    }

    resize() {
        App.canvas.width = App.width * App.dpr;
        App.canvas.height = App.height * App.dpr;
        App.ctx.scale(App.dpr, App.dpr);

        //반응형으로 만들기 위해 width를 아래처럼 작은 값의 90%값으로 설정
        const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
        // 4: 3 의 비율
        App.canvas.style.width = width + 'px';
        App.canvas.style.height = width * (3 / 4) + 'px';
    }

    start() {
        window.addEventListener('load', () => {
            this.resize();
            this.animation();
        });
    }
}