import { Scene } from 'phaser'
import { store } from '../../../redux/store'
import { EventBus } from '../../EventBus'
import inGameBag from '../../components/inGameBag'
import inGamePhone from '../../components/inGamePhone'
import inGameSettingsMenu from '../../components/inGameSettingsMenu'
import { UI } from '../../constants/assetConstants'
import { AUDIO } from '../../constants/audioConstant'
import { CONFIG } from '../../constants/gameConfig'
import sceneComputer from './scene-computer'
import sceneIntro from './scene-intro'
import sceneOnSofa from './scene-onSofa'

export class ModuleOne extends Scene {
    SettingsMenu: inGameSettingsMenu
    bgMusic: Phaser.Sound.WebAudioSound
    sceneContainer1: any
    sceneContainer2: any
    activeSceneContainer: any
    Phone: any
    Bag: any
    prevSavePoint: string

    constructor() {
        super('ModuleOne')
        this.prevSavePoint = ''
    }

    create() {
        this.prevSavePoint = ''

        // Sound
        const Click = this.sound.add(AUDIO.BUTTONCLICK)
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true }) as Phaser.Sound.WebAudioSound
        this.bgMusic.play()

        // Добавляем кнопку настроек
        this.SettingsMenu = new inGameSettingsMenu(this)

        const SettingsButton = this.add.image(CONFIG.SCREENWIDTH - 105, 60, UI.SETTINGS).setDepth(10)

        // Кнопка настроек поведение при наведении
        SettingsButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                SettingsButton.setScale(1.1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                SettingsButton.setScale(1)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                if (this.SettingsMenu.openSettings) {
                    Click.play()
                    this.SettingsMenu.settingsHide()
                }
                else {
                    Click.play()
                    this.SettingsMenu.settingsShow()
                }
            })

        // Добавляем интерфейсные кнопки
        this.Phone = new inGamePhone(this, CONFIG.SCREENWIDTH - 135, CONFIG.SCREENHIGHT - 135)
        this.add.existing(this.Phone)
            .setDepth(10)
            .setAlpha(0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            })

        this.Bag = new inGameBag(this, CONFIG.SCREENWIDTH - 285, CONFIG.SCREENHIGHT - 135)
        this.add.existing(this.Bag)
            .setDepth(10)
            .setAlpha(0)
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            })

        store.subscribe(this.onStoreChange.bind(this))

        this.onStoreChange()

        EventBus.emit('current-scene-ready', this)
    }

    onStoreChange() {
        const state = store.getState()
        const savePoint = state.config.savePoint

        if (savePoint !== this.prevSavePoint) {
            this.prevSavePoint = savePoint

            if (this.activeSceneContainer) {
                this.activeSceneContainer.destroy(true)
                this.activeSceneContainer = null
            }

            this.activeSceneContainer = this.activeSceneContainer === this.sceneContainer1 ? this.sceneContainer2 : this.sceneContainer1

            this.activeSceneContainer = this.add.container(0, 0)

            switch (savePoint) {
                case 'intro':
                    this.activeSceneContainer.add(new sceneIntro(this, 0, 0))
                    break
                case 'computer':
                    this.activeSceneContainer.add(new sceneComputer(this, 0, 0))
                    break
                case 'onSofa':
                    this.activeSceneContainer.add(new sceneOnSofa(this, 0, 0))
                    break
                default:
                    this.activeSceneContainer = null
                    break
            }

            if (this.activeSceneContainer) {
                this.add.existing(this.activeSceneContainer)
            }
        }

        const phoneIndex = state.config.phone
        if (phoneIndex > 0) {
            this.tweens.add({
                targets: this.Phone,
                alpha: 1,
                duration: 1000,
            })
        }

        const bagIndex = state.config.bag
        if (bagIndex > 0) {
            this.tweens.add({
                targets: this.Bag,
                alpha: 1,
                duration: 1000,
            })
        }
    }
}
