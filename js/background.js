import {App} from './app.js';

export class Background {
    constructor(config) {
        this.img = config.img;
        
        this.height = App.height;
        this.width = App.height * (this.img.width / this.img.height);
       
        this.leftPos ={ x : 0, y : 0};
        // -4는 안해줘도 되는데 배경이미지 끝부분에 흰색 공백부분이 있어서
        // 두 이미지가 자연스럽게 이어지지 않아서 조금 겹치게 구성
        this.rightPos = { x : this.width, y : 0};
        this.speed = config.speed;
    }

    update() {
        if (this.leftPos.x + this.width < 0) {
            this.leftPos.x = this.rightPos.x + this.width;
        }
        if (this.rightPos.x + this.width < 0) {
            this.rightPos.x = this.leftPos.x + this.width;
        }
        this.leftPos.x += this.speed;
        this.rightPos.x += this.speed;
    }
    
    draw() {
        //이미지 이동 시 계속 연결되어 보이도록 하기 위해
        // 똑같은 이미지를 2개 붙여서 사용한다. 
        App.ctx.drawImage(
            this.img,
            this.leftPos.x,
            this.leftPos.y,
            this.width,
            this.height
        );
        App.ctx.drawImage(
            this.img,
            this.rightPos.x,
            this.rightPos.y,
            this.width,
            this.height
        );
    }
}