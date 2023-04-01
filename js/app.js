import { Background, Wall, Player, Coin, Score, GameHandler, GameStatus } from "./index.js";

export class App {
    static canvas = document.querySelector('canvas');
    static ctx = App.canvas.getContext('2d');
    //최대 dpr 값을 2로 설정. 왜냐면 dpr이 3또는 4가 될 경우 성능이슈가 생길 수도 있음. 2로 충분히 선명하게 보임.
    static dpr = devicePixelRatio > 1 ? 2 : 1;
    static interval = 1000 / 60;
    static width = 1024;
    static height = 768;

    constructor() {
        window.addEventListener('load', () => {
            App.canvas.width = App.width * App.dpr;
            App.canvas.height = App.height * App.dpr;
            App.ctx.scale(App.dpr, App.dpr);
        });
    }

    startAnimation() {
        this.animationId = requestAnimationFrame(this.startAnimation.bind(this));
        const now = Date.now();
        if (now - this.preTime < App.interval) return;
        this.exec();
        this.preTime = now - ((now - this.preTime) % App.interval);
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationId);
    }

    start() {
        this.backgrounds = [
            new Background({img : document.querySelector('#bg3-img'), speed : -1}),
            new Background({img : document.querySelector('#bg2-img'), speed : -2}),
            new Background({img : document.querySelector('#bg1-img'), speed : -4}),
        ];
  
        this.backgrounds.forEach(bg => {
            bg.draw();
        });
        
        this.handler = new GameHandler(this);
        this.handler.status = GameStatus.READY;
        
        this.reset();
       
    }

    reset() {
        Wall.reset();
        Wall.create();
        this.player = new Player();
        this.score = new Score();

        this.preTime = Date.now();
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

            if(Wall.list[i].isOutside) {
                Wall.remove(i);
                continue;
            }

            if(Wall.list[i].canGenerateWall) {
                Wall.list[i].isGenerate = true;
                const newWall = Wall.create();
                if(Math.random() < 0.5) { 
                    Coin.create(
                        newWall.x + (newWall.width / 2), 
                        newWall.y2 - (newWall.gabY / 2),
                        newWall.vx
                    );
                }
            }
           
            if(Wall.list[i].isCollision(this.player.boundingBox)) {
                this.handler.status = GameStatus.FINISHED;
                break;
            }
        }

        for (let i = Coin.list.length - 1; i > -1; i--) {
            Coin.list[i].update();
            Coin.list[i].draw();

            if (Coin.list[i].isOutside) {
                Coin.remove(i);
            }
            if (Coin.list[i].isCollision(this.player.boundingBox)) {
                Coin.remove(i);
                this.score.scoreCount += 1;
            }
        }

        this.player.update();
        this.player.draw();

        if(this.player.y >= App.height) {
            this.handler.status = GameStatus.FINISHED;
        }

        this.score.update();
        this.score.draw();

    };
}