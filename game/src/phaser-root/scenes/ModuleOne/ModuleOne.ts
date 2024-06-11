import { Scene } from 'phaser'
import { setModuleScene } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import { EventBus } from '../../EventBus'
import inGameBag from '../../components/inGameBag'
import inGamePhone from '../../components/inGamePhone'
import inGameSettingsMenu from '../../components/inGameSettingsMenu'
import { UI } from '../../constants/assetConstants'
import { AUDIO } from '../../constants/audioConstant'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'


export class ModuleOne extends Scene {

    //Audio
    bgMusic: Phaser.Sound.WebAudioSound

    // UI
    private Phone: inGamePhone
    private Bag: inGameBag
    private SettingsMenu!: inGameSettingsMenu

    // BackGrounds
    private roomOne: Phaser.GameObjects.Image
    private roomTwo: Phaser.GameObjects.Image
    private kitchen: Phaser.GameObjects.Image
    private computer: Phaser.GameObjects.Image
    private withDog: Phaser.GameObjects.Image
    private phoneOne: Phaser.GameObjects.Image

    constructor() {
        super('ModuleOne')
    }

    create() {

        // Sound
        const Click = this.sound.add(AUDIO.BUTTONCLICK)


        // Добавляем кнопку настроек
        this.SettingsMenu = new inGameSettingsMenu(this)

        const SettingsButton = this.add.image(CONFIG.SCREENWIDTH - 105, 70, UI.SETTINGS).setDepth(1)

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
        this.Phone = new inGamePhone(this, CONFIG.SCREENWIDTH - 135, CONFIG.SCREENHIGHT - 110)
        this.add.existing(this.Phone)
            .setDepth(1)
            .setAlpha(0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                let state = store.getState()
                let inModuleScene = state.config.inModuleScene
                this.phoneChose(inModuleScene)
            })

        this.Bag = new inGameBag(this, CONFIG.SCREENWIDTH - 285, CONFIG.SCREENHIGHT - 110)
        this.add.existing(this.Bag)
            .setDepth(1)
            .setAlpha(0)

        // Музыка и Звуки
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true }) as Phaser.Sound.WebAudioSound

        // Добавляем задние фоны
        this.roomOne = this.add.image(0, 0, MOODULEONE.BACKGROUNDS.ROOMVIEWONE)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.roomTwo = this.add.image(0, 0, MOODULEONE.BACKGROUNDS.ROOMVIEWTWO)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.kitchen = this.add.image(0, 0, MOODULEONE.BACKGROUNDS.KITCHEN)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.computer = this.add.image(0, 0, MOODULEONE.BACKGROUNDS.COMPUTER)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.withDog = this.add.image(0, 0, MOODULEONE.BACKGROUNDS.WITHDOG)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        this.phoneOne = this.add.image(0, 0, MOODULEONE.BACKGROUNDS.PHONEONE)
            .setOrigin(0, 0)
            .setScale(0.96)
            .setAlpha(0)
            .setDepth(0)

        let state = store.getState()
        let CurrentScene = state.config.currentScene
        if (CurrentScene === 'ModuleOne') { store.subscribe(this.onStoreChange.bind(this)) }

        store.dispatch(setModuleScene('intro1'))

        EventBus.emit('current-scene-ready', this)
    }

    phoneChose(ModuleScene: string) {
        if (ModuleScene === 'withDog') {
            store.dispatch(setModuleScene('PhoneOne'))
        } else {
            return
        }
    }

    onStoreChange() {
        const state = store.getState()
        const ModuleScene = state.config.inModuleScene
        switch (ModuleScene) {
            case 'intro1':
                this.sound.add(MOODULEONE.AUDIO.KEYBOARD).play()
                this.bgMusic.play()
                this.tweens.add({
                    targets: this.roomOne,
                    alpha: 1,
                    duration: 1000
                })
                setTimeout(function () {
                    store.dispatch(setModuleScene('intro2'))
                }, 2000)
                break
            case 'intro2':
                this.tweens.add({
                    targets: this.roomOne,
                    alpha: 0,
                    duration: 1000
                })
                this.tweens.add({
                    targets: this.roomTwo,
                    alpha: 1,
                    duration: 1000
                })
                setTimeout(function () {
                    store.dispatch(setModuleScene('intro3'))
                }, 2000)
                break
            case 'intro3':
                this.tweens.add({
                    targets: this.roomTwo,
                    alpha: 0,
                    duration: 1000
                })
                this.tweens.add({
                    targets: this.kitchen,
                    alpha: 1,
                    duration: 1000
                })
                setTimeout(function () {
                    store.dispatch(setModuleScene('nearComputer'))
                }, 2000)
                break
            case 'nearComputer':
                this.tweens.add({
                    targets: this.kitchen,
                    alpha: 0,
                    duration: 1000
                })
                this.tweens.add({
                    targets: this.computer,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.sound.add(MOODULEONE.AUDIO.MESSAGE).setVolume(0.2).play()
                    }
                })
                setTimeout(function () {
                    store.dispatch(setModuleScene('withDog'))
                }, 3000)
                break
            case 'withDog':
                this.tweens.add({
                    targets: this.computer,
                    alpha: 0,
                    duration: 1000
                })
                this.tweens.add({
                    targets: this.withDog,
                    alpha: 1,
                    duration: 1000
                })
                this.tweens.add({
                    targets: [this.Phone],
                    alpha: 1,
                    duration: 1500
                })
                break
            case 'PhoneOne':
                this.tweens.add({
                    targets: this.withDog,
                    alpha: 0,
                    duration: 1000
                })
                this.tweens.add({
                    targets: this.phoneOne,
                    alpha: 1,
                    duration: 1000
                })
                this.tweens.add({
                    targets: [this.Phone],
                    alpha: 0,
                    duration: 1500
                })
                break

        }
    }
}