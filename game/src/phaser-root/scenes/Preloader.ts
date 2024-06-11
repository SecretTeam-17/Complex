import { Scene } from 'phaser'
import { setCurrentScene } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import { BACKGROUNDS, INGAMEUI, MASCOTS, UI } from '../constants/assetConstants'
import { AUDIO } from '../constants/audioConstant'
import { CONFIG } from '../constants/gameConfig'
import { MOODULEONE } from '../constants/moduleOneConstants'

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

        // inGame UI
        this.load.image(INGAMEUI.BAG, 'ui/bag-icon.png')
        this.load.image(INGAMEUI.PHONE, 'ui/phone-icon.png')
        this.load.image(INGAMEUI.BOX, 'ui/box-icon.png')
        this.load.image(INGAMEUI.TRASH, 'ui/trash-icon.png')

        // Arrows
        this.load.image(UI.ARROWLEFT, 'ui/arrow-left.png')
        this.load.image(UI.ARROWRIGHT, 'ui/arrow-right.png')

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
        this.load.image(MOODULEONE.PREIMAGE, 'modules/one/pre-module-one.png')
        // Backgrounds
        this.load.image(MOODULEONE.BACKGROUNDS.ROOMVIEWONE, 'modules/one/roomone.png')
        this.load.image(MOODULEONE.BACKGROUNDS.ROOMVIEWTWO, 'modules/one/roomtwo.png')
        this.load.image(MOODULEONE.BACKGROUNDS.KITCHEN, 'modules/one/kitchen.png')
        this.load.image(MOODULEONE.BACKGROUNDS.COMPUTER, 'modules/one/nearComputer.png')
        this.load.image(MOODULEONE.BACKGROUNDS.WITHDOG, 'modules/one/withDog.png')
        this.load.image(MOODULEONE.BACKGROUNDS.PHONEONE, 'modules/one/PhoneOne.png')

        // Audio
        this.load.audio(MOODULEONE.AUDIO.KEYBOARD, 'audio/keyboard.mp3')
        this.load.audio(MOODULEONE.AUDIO.MESSAGE, 'audio/message.mp3')


    }

    create() {
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        // this.scene.start('StartScreen')
        this.scene.start('MainMenu')
        store.dispatch(setCurrentScene('StartScreen'))
        // this.scene.start('ModuleOne')

    }
}
