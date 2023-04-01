export const GameStatus = {
    READY :'READY', 
    PLAYING :'PLAYING', 
    FINISHED :'FINISHED' 
}
export class GameHandler {
    constructor(app) {
        this.app = app;
        this._status = GameStatus.READY;

        this.readScreen = document.querySelector('.ready-screen');
        this.titleImg = document.querySelector('.title-img');
        this.playBtn = document.querySelector('.play-img');
        this.playBtn.addEventListener('click', () => {
            this.hideReadyScreen();
            this.app.startAnimation();
        });
        
        this.finishScreen = document.querySelector('.finish-screen');
        this.distanceText = document.querySelector('.distance');
        this.coinText = document.querySelector('.coin');
        this.replayBtn = document.querySelector('.replay-img');
        this.replayBtn.addEventListener('click', () => {
            this.hideFinishScreen();
        });
    }

    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;

        switch(value) {
            case GameStatus.READY : this.showReadyScreen(); break;
            case GameStatus.FINISHED : this.showFinishScreen(); break;
        }
    }

    showReadyScreen() {
        gsap.to(this.titleImg, {
            scale : 1, rotation : 720, opacity: 1, duration : 0.5
        });
        gsap.to(this.playBtn, {
            scale : 1, duration : 1, ease : Elastic.easeOut.config(2, 0.5)
        });
    }

    hideReadyScreen() {
        gsap.to(this.readScreen, {
            opacity : 0, pointerEvents : 'none', duration : 0.3, onComplete: () => {
                this.status = 'PLAYING'
            }
        });
    }

    showFinishScreen() {
        this.app.stopAnimation();

        this.distanceText.innerText = Math.floor(this.app.score.distCount) + 'm';
        this.coinText.innerText = this.app.score.scoreCount + 'coin';
        gsap.fromTo(this.finishScreen, { opacity : 0}, {
            opacity : 1, duration: 0.5, pointerEvents : 'all'
        });
        gsap.fromTo(this.distanceText, { opacity : 0, scale: 0},{
            opacity : 1, scale: 1, duration : 0.5 , delay : 0.5
        });
        gsap.fromTo(this.coinText, { opacity : 0, scale: 0},{
            opacity : 1, scale: 1, duration : 0.5 ,delay : 0.8 
        });
        gsap.fromTo(this.replayBtn, { opacity : 0, scale: 0},{
            opacity : 1, scale: 1, rotation : 720, duration : 0.5 ,delay : 1 
        });
    }

    hideFinishScreen() {
        gsap.fromTo(this.finishScreen, { opacity : 1}, { 
            opacity : 0, pointerEvents : 'none', duration : 0.1
        });
        this.status = GameStatus.PLAYING;

        this.app.reset();
        this.app.startAnimation();
    }
}