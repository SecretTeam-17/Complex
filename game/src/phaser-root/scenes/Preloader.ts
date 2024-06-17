import { Scene } from 'phaser'
import { CONFIG } from '../constants/gameConfig'
import { loadAssets } from './assetLoader'

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        // Отображаем фон для загрузочного экрана
        this.add.image(0, 0, 'loading-bg').setOrigin(0, 0)
        this.add.image(CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT / 2, 'big-logo')

        // Полоса загрузки
        this.add.rectangle(CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT / 2 + 200, CONFIG.SCREENWIDTH / 2, 64).setStrokeStyle(1, 0xffffff)

        // Полоса прогресса
        const bar = this.add.rectangle(CONFIG.SCREENWIDTH / 4 + 4, CONFIG.SCREENHIGHT / 2 + 200, 4, 60, 0xC896FF)

        // Процент загрузки
        const loadingText = this.add.text(CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT / 2 + 200, "0%", {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0.5, 0.5)

        // Функция отображения прогресса загрузки
        this.load.on('progress', (progress: number) => {
            bar.width = 4 + (CONFIG.SCREENWIDTH / 2 - 8) * progress
            loadingText.setText(`${Math.round(progress * 100)}%`)
        })
    }

    preload() {
        this.load.setPath('assets')
        loadAssets(this)
    }

    create() {
        this.scene.start('StartScreen')
    }
}