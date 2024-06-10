import { Scene } from 'phaser'
import { setCurrentScene } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import { BACKGROUNDS, MASCOTS, MODULE, UI } from '../constants/assetConstants'
import { AUDIO } from '../constants/audioConstant'
import { CONFIG } from '../constants/gameConfig'

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        //  Отображаем фон для загрузочного экрана
        this.add.image(0, 0, 'loading-bg').setOrigin(0, 0)
        this.add.image(CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT / 2, 'big-logo')

        //  Полоса загрузки
        this.add.rectangle(CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT / 2 + 200, CONFIG.SCREENWIDTH / 2, 64).setStrokeStyle(1, 0xffffff)

        //  Полоса прогресса
        const bar = this.add.rectangle(CONFIG.SCREENWIDTH / 4 + 4, CONFIG.SCREENHIGHT / 2 + 200, 4, 60, 0xC896FF)

        //  Функция отображения прогресса загрузки
        this.load.on('progress', (progress: number) => {

            bar.width = 4 + (CONFIG.SCREENWIDTH / 2 - 8 * progress)

        })
    }

    preload() {
        // Загружаем основные компоненты
        this.load.setPath('assets')

        // Audio
        this.load.audio("bgMusic", 'audio/bgMusic.mp3')
        this.load.audio(AUDIO.BUTTONCLICK, 'audio/button-click.mp3')

        // Backgrounds
        this.load.image(BACKGROUNDS.STARTSCREEN, 'ui/New_bg.png')

        // UI Main Header
        this.load.image(UI.MAINLOGO, 'ui/petsitter-logo.png')
        this.load.image(UI.SETTINGS, 'ui/settings-icon.png')
        this.load.image(UI.BURGER, 'ui/burger-icon.png')

        this.load.image(UI.PANEL, 'ui/menu-panel.png')
        this.load.image(UI.CARDPANEL, 'ui/card-button.png')
        this.load.image(UI.MODULEPANEL, 'ui/module-card.png')

        this.load.image(UI.VOICEON, 'ui/Voice.png')
        this.load.image(UI.VOICEOFF, 'ui/VoiceOff.png')
        this.load.image(UI.SITE, 'ui/exit.png')
        this.load.image(UI.BOOK, 'ui/book-icon.png')
        this.load.image(UI.GAME, 'ui/game-icon.png')


        // Buttons
        this.load.image(UI.BUTTON.NORMAL, 'ui/buttonNormal.png')
        this.load.image(UI.BUTTON.HOVER, 'ui/buttonHover.png')
        this.load.image(UI.BUTTON.DISABLE, 'ui/buttonDisable.png')

        this.load.image(UI.ICONBUTTON.NORMAL, 'ui/iconButtonNormal.png')
        this.load.image(UI.ICONBUTTON.HOVER, 'ui/iconButtonHover.png')

        // Mascots
        this.load.image(MASCOTS.MASCOTCAT.BASE, 'ui/mascotCat.png')
        this.load.image(MASCOTS.MASCOTDOG.BASE, 'ui/mascotDog.png')

        // Module One
        this.load.image(MODULE.MODULEONE.PREIMAGE, 'modules/one/pre-module-one.png')

    }

    create() {
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('StartScreen')
        store.dispatch(setCurrentScene('StartScreen'))
        // this.scene.start('MainMenu')

    }
}
