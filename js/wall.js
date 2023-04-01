import {App} from './app.js';

export class Wall {
    constructor(config) {
        this.img = document.querySelector('#wall-img');
        this.type = config.type;
        this.y = 0;
        switch(this.type) {
            case 'SMALL' :
                //�� �̹��� �� �ȼ��� 30�̰� ���� ���� 0 ���� �����ؼ� 0/ 30
                this.sx = this.img.width * (0 / 30);
                // 9�� �̹������� ū ���� ���� �ȼ� �� 
                this.sizeX = 9/30;
                break;
            case 'BIG' : 
                //�� �̹����� �ȼ��� 30�̰� ū ���� 9 ���� �����ؼ� 9/ 30
                this.sx = this.img.width * (9 / 30);
                // 18�� �̹������� ū ���� ���� �ȼ� �� 
                this.sizeX = 18/30;
                break;
        }
        this.height = App.height;
        //�̹����� ���簢���̶� App.height���� sizeX ������ŭ�� ���ָ� ��.
        this.width = App.height * this.sizeX;
    }

    update() {}
    draw() {
        App.ctx.drawImage(
            this.img, 
            //��ü �̹������� �߶� ������ ���� x, y, width, height
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            //Canvas�� ������ �׷��� �̹��� ��ǥ,ũ��  
            0, 0, this.width, this.height
        );
    }
}