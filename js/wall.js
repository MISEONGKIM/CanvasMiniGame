import { App } from './app.js';
import { BoundingBox } from './boundingBox.js';
import { randomNumBetween } from './utils.js';

export class Wall {
    static list = [];

    constructor(config) {
        this.img = document.querySelector('#wall-img');
        this.type = config.type;

        switch(this.type) {
            case 'SMALL' :
                //벽 이미지 총 픽셀이 30이고 작은 벽이 0 부터 시작해서 0/ 30
                this.sx = this.img.width * (0 / 30);
                // 9은 이미지에서 큰 벽의 가로 픽셀 수 
                this.sizeX = 9/30;
                break;
            case 'BIG' : 
                //벽 이미지총 픽셀이 30이고 큰 벽이 9 부터 시작해서 9/ 30
                this.sx = this.img.width * (9 / 30);
                // 18은 이미지에서 큰 벽의 가로 픽셀 수 
                this.sizeX = 18/30;
                break;
        }
        this.height = App.height;
        //이미지가 정사각형이라서 App.height에서 sizeX 비율만큼만 해주면 됨.
        this.width = App.height * this.sizeX;

        //끝에서 벽이 등장.
        this.x = App.width;
        this.vx = -6;
        //위아래 벽 사이이의 간격.
        this.gabY = randomNumBetween(App.height * 0.2, App.height * 0.35);

        //위쪽 벽 , y의 최소값은 -this.height , 최대값은  App.height - this.gabY - this.height, 
        // 30은 벽 이미지의 위 아래로 여백이 있어서 대략적으로 해준거 
        this.y1 = -this.height + randomNumBetween(30, App.height - this.gabY - 30);
        this.y2 = this.y1 + this.height + this.gabY;

        this.isGenerate = false;

        // + 30, - 60은 바운딩박스의 적당한 크기 조정을 위해 설정한 임의값.
        this.boundingBox1 = new BoundingBox(this.x + 30, this.y1 + 30, this.width - 60, this.height - 60);
        this.boundingBox2 = new BoundingBox(this.x + 30, this.y2 + 30, this.width - 60, this.height - 60);
    }
    
    get canGenerateWall() {
        return !this.isGenerate && this.x + this.width < App.width * randomNumBetween(0.6, 0.75);
    }

    get isOutside() {
        return this.x + this.width < 0;
    }
    
    static reset() {
        Wall.list = [];
    }

    static create() {
        const newWall = new Wall({type : Math.random() < 0.3 ? 'SMALL' : 'BIG'});
        Wall.list.push(newWall);
        return newWall;
    }

    static remove(index) {
        Wall.list.splice(index, 1);
    }

    update() {
        this.x += this.vx;

        this.boundingBox1.x = this.boundingBox2.x = this.x + 30;
    }
    draw() {
        //벽을 위아래로 배치 
        App.ctx.drawImage(
            this.img, 
            //전체 이미지에서 잘라서 보여줄 영역 x, y, width, height
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            //Canvas에 실제로 그려질 이미지 좌표,크기  
            this.x, this.y1, this.width, this.height
        ); 
        App.ctx.drawImage(
            this.img, 
            //전체 이미지에서 잘라서 보여줄 영역 x, y, width, height
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            //Canvas에 실제로 그려질 이미지 좌표,크기  
            this.x, this.y2, this.width, this.height
        );

        // this.boundingBox1.draw();
        // this.boundingBox2.draw();
    }

    
    isCollision(target) {
        return (this.boundingBox1.isCollision(target) || this.boundingBox2.isCollision(target));
    }
}