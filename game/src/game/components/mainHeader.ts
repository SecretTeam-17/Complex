import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

export default class mainHeader extends Phaser.GameObjects.Container
{

    // Определяем объекты контейнера
    private logo: Phaser.GameObjects.Image
    private settings: Phaser.GameObjects.Image

    private voiceOn: Phaser.GameObjects.Image
    private voiceOff: Phaser.GameObjects.Image
    private siteIcon: Phaser.GameObjects.Image
    private burger: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x:number, y: number)
    {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Добавляем изображения и текст в контейнер
        this.logo = scene.add.image(-CONFIG.SCREENWIDTH / 2 + 48, 0, UI.MAINLOGO).setOrigin(0,0)
        this.burger = scene.add.image(CONFIG.SCREENWIDTH / 2 - 170, 26, UI.BURGER)
        this.settings = scene.add.image(CONFIG.SCREENWIDTH / 2 - 96, 26, UI.SETTINGS)




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

        // Кнопка бургер
        this.burger.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.burger.setScale(1.1)
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.burger.setScale(1)
        })






        // this.add(this.voiceOn)
        // this.add(this.voiceOff)
        // this.add(this.siteIcon)

        // Скрываем не нужные состояния
        // this.voiceOff.setVisible(false)

        // // this.setSize(this.normalImage.width,this.normalImage.height)


        // // Определяем действия для кнопки сайта
        // this.siteIcon.setInteractive()
        // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //     this.openSite();
        // })

        // // Определяем действия для кнопки выключения звука
        // this.voiceOn.setInteractive()
        // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //     this.voiceOff.setVisible(true)
        //     this.voiceOn.setVisible(false)
        // })

        // // Определяем действия для кнопки включения звука
        // this.voiceOff.setInteractive()
        // .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        //     this.voiceOff.setVisible(false)
        //     this.voiceOn.setVisible(true)
        // })

    }

    private openSite() {
        const siteUrl = 'https://www.example.com'
        window.open(siteUrl, '_blank');
    }

}