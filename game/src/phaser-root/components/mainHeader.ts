import Phaser from 'phaser'
import { setMusicPlaying, setSound } from '../../redux/GameConfig/config.slice'
import { store } from '../../redux/store'
import { UI } from '../constants/assetConstants'
import { AUDIO } from '../constants/audioConstant'
import { CONFIG } from '../constants/gameConfig'
import iconButton from './iconButton'

export default class mainHeader extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private bgMusic!: Phaser.Sound.WebAudioSound
    private Click: Phaser.Sound.BaseSound

    private logo: Phaser.GameObjects.Image
    private settings: Phaser.GameObjects.Image
    private burger: Phaser.GameObjects.Image

    private settingsMenu: Phaser.GameObjects.Container
    private burgerMenu: Phaser.GameObjects.Container

    private voiceONButton: iconButton
    private voiceOffButton: iconButton

    private openBurger = false
    private openSettings = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y

        super(scene, x, y)

        this.scene = scene

        const { width } = scene.scale

        // Sound
        this.Click = scene.sound.add(AUDIO.BUTTONCLICK)

        // this.bgMusic = this.scene.sound.add('bgMusic', { volume: 0.5, loop: true }) as Phaser.Sound.WebAudioSound
        // if (SoundState && !soundPlaying) {
        //     this.bgMusic.play()
        //     store.dispatch(setMusicPlaying(true))
        // }


        // Добавляем изображения и текст в контейнер
        this.logo = scene.add.image(-CONFIG.SCREENWIDTH / 2 + 75, 0, UI.MAINLOGO).setOrigin(0, 0)
        this.burger = scene.add.image(CONFIG.SCREENWIDTH / 2 - 205, 36, UI.BURGER)
        this.settings = scene.add.image(CONFIG.SCREENWIDTH / 2 - 105, 36, UI.SETTINGS)

        // Отрисовываем изображения и текст
        this.add(this.logo)
        this.add(this.settings)
        this.add(this.burger)

        // Кнопка настроек
        this.settings.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.settings.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.settings.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.openSettings) {
                    this.Click.play()
                    this.settingsHide()
                    if (this.openBurger) { this.burgerHide() }
                }
                else {
                    this.Click.play()
                    this.settingsShow()
                    if (this.openBurger) { this.burgerHide() }
                }

            })

        this.settingsMenu = scene.add.container(width - 116, 90).setScale(0)
        const settingsPanel = scene.add.nineslice(0, 20, UI.PANEL, undefined, 410).setOrigin(1, 0)
        this.settingsMenu.add(settingsPanel)

        this.voiceONButton = new iconButton(scene, settingsPanel.width - 614, settingsPanel.height / 2 - 40, 'ЗВУК', UI.VOICEON)

        this.voiceOffButton = new iconButton(scene, settingsPanel.width - 614, settingsPanel.height / 2 - 40, 'БЕЗ ЗВУКА', UI.VOICEOFF).setVisible(false)

        const siteButton = new iconButton(scene, settingsPanel.width - 614, settingsPanel.height / 2 + 70, 'НА САЙТ', UI.SITE)

        this.settingsMenu.add(siteButton)
        this.settingsMenu.add(this.voiceONButton)
        this.settingsMenu.add(this.voiceOffButton)

        siteButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
                this.openSite()
            })

        this.voiceONButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
                this.onMusicOff()
            })

        this.voiceOffButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.Click.play()
                this.onMusicOn()
            })


        // Кнопка бургер
        this.burger.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                this.burger.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.burger.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.openBurger) {
                    this.Click.play()
                    this.burgerHide()
                    if (this.openSettings) { this.settingsHide() }
                }
                else {
                    this.Click.play()
                    this.burgerShow()
                    if (this.openSettings) { this.settingsHide() }
                }

            })

        this.burgerMenu = scene.add.container(width - 210, 90).setScale(0)
        const burgerPanel = scene.add.nineslice(0, 20, UI.PANEL, undefined, 410).setOrigin(1, 0)

        const linkOne = scene.add.text(-burgerPanel.width + 48, 98, 'О Petsitters', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',

        }).setOrigin(0, 0)

        const linkTwo = scene.add.text(-burgerPanel.width + 48, 156, 'Условия использования', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',

        }).setOrigin(0, 0)

        const linkThree = scene.add.text(-burgerPanel.width + 48, 214, 'Конфиденциальность', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',

        }).setOrigin(0, 0)

        this.burgerMenu.add(burgerPanel)
        this.burgerMenu.add(linkOne)
        this.burgerMenu.add(linkTwo)
        this.burgerMenu.add(linkThree)

        linkOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.openSite()
            })

        linkTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.openSite()
            })

        linkThree.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.openSite()
            })

        this.onStoreChange()
    }

    burgerShow() {
        if (this.openBurger) {
            return
        }

        this.scene.tweens.add({
            targets: this.burgerMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openBurger = true
    }

    burgerHide() {
        if (!this.openBurger) {
            return
        }

        this.scene.tweens.add({
            targets: this.burgerMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openBurger = false
    }

    settingsShow() {
        if (this.openSettings) {
            return
        }

        this.scene.tweens.add({
            targets: this.settingsMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = true
    }

    settingsHide() {
        if (!this.openSettings) {
            return
        }

        this.scene.tweens.add({
            targets: this.settingsMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = false
    }

    private openSite() {
        const siteUrl = 'https://www.example.com'
        window.open(siteUrl, '_blank')
    }


    onStoreChange() {
        const state = store.getState()
        const SoundState = state.config.sound
        if (!SoundState) {
            this.onMusicOff()
        }
    }

    onMusicOff() {
        this.scene.sound.stopByKey('bgMusic')
        this.voiceONButton.setVisible(false)
        this.voiceONButton.disableInteractive()
        this.voiceOffButton.setInteractive()
        this.voiceOffButton.setVisible(true)

        store.dispatch(setMusicPlaying(false))
        store.dispatch(setSound(false))

    }
    onMusicOn() {
        this.bgMusic.play()
        this.voiceOffButton.setVisible(false)
        this.voiceOffButton.disableInteractive()
        this.voiceONButton.setInteractive()
        this.voiceONButton.setVisible(true)

        store.dispatch(setMusicPlaying(true))
        store.dispatch(setSound(true))
    }

}