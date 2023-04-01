import {App} from './app.js';

export class Wall {
    constructor(config) {
        this.img = document.querySelector('#wall-img');
        this.type = config.type;
        this.y = 0;
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
    }

    update() {}
    draw() {
        App.ctx.drawImage(
            this.img, 
            //전체 이미지에서 잘라서 보여줄 영역 x, y, width, height
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            //Canvas에 실제로 그려질 이미지 좌표,크기  
            0, 0, this.width, this.height
        );
    }
}