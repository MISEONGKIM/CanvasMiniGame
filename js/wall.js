import { App } from './app.js';
import { randomNumBetween } from './utils.js';

export class Wall {
    static list = [];

    constructor(config) {
        this.img = document.querySelector('#wall-img');
        this.type = config.type;

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

        //������ ���� ����.
        this.x = App.width;
        //���Ʒ� �� �������� ����.
        this.gabY = randomNumBetween(App.height * 0.2, App.height * 0.35);

        //���� �� , y�� �ּҰ��� -this.height , �ִ밪��  App.height - this.gabY - this.height, 
        // 30�� �� �̹����� �� �Ʒ��� ������ �־ �뷫������ ���ذ� 
        this.y1 = -this.height + randomNumBetween(30, App.height - this.gabY - 30);
        this.y2 = this.y1 + this.height + this.gabY;

        this.isGenerate = false;
    }
    
    get canGenerateWall() {
        return !this.isGenerate && this.x + this.width < App.width * randomNumBetween(0.6, 0.75);
    }

    get isOutside() {
        return this.x + this.width < 0;
    }

    static create() {
        const oldArray = Wall.list ?? [];
        Wall.list = oldArray.concat([new Wall({type : Math.random() < 0.3 ? 'SMALL' : 'BIG'})]);
    }

    static remove(index) {
        Wall.list.splice(index, 1);
    }

    update() {
        this.x += -3;
    }
    draw() {
        //���� ���Ʒ��� ��ġ 
        App.ctx.drawImage(
            this.img, 
            //��ü �̹������� �߶� ������ ���� x, y, width, height
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            //Canvas�� ������ �׷��� �̹��� ��ǥ,ũ��  
            this.x, this.y1, this.width, this.height
        ); 
        App.ctx.drawImage(
            this.img, 
            //��ü �̹������� �߶� ������ ���� x, y, width, height
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            //Canvas�� ������ �׷��� �̹��� ��ǥ,ũ��  
            this.x, this.y2, this.width, this.height
        );
    }
}