import { Scene } from 'phaser'

export class Boot extends Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        this.load.setPath('assets')

        //  Подгружаем фон для сцены загрузки
        this.load.image('loading-bg', 'boot/loading-bg.png')
        this.load.image('big-logo', 'boot/big-logo.png')
    }

    create() {
        this.scene.start('Preloader')
    }
}
