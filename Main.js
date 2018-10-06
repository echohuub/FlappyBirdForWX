// 初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Background} from "./js/runtime/Background.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {

    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    // 创建背景音乐
    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'audios/bgm.mp3';
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;

        this.createBackgroundMusic();

        this.init();
    }

    init() {

        // 首先重置游戏是没有结束的
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', new Background())
            .put('land', new Land())
            .put('birds', new Birds())
            .put('score', new Score())
            .put('startButton', new StartButton());

        this.registerEvent();

        // 创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
        this.director.run();
        // const image = new Image();
        // image.src = '../res/land.png';
        // image.onload = () => {
        //     this.ctx.drawImage(image, 0, 0,
        //         image.width, image.height,
        //         -500, 0,
        //         image.width, image.height);
        // }
    }

    registerEvent() {
        // this.canvas.addEventListener('touchstart', e => {
        //     // 屏幕掉js的事件冒泡
        //     e.preventDefault();
        //     if (this.director.isGameOver) {
        //         console.log('游戏开始');
        //         this.init();
        //     } else {
        //         this.director.birdsEvent();
        //     }
        // })
        wx.onTouchStart(() => {
          if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        })
    }

}