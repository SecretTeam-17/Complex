import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'
import gameConfig from '../constants/gameConfig'

export default class mainHeader extends Phaser.GameObjects.Container
{

    // Определяем объекты контейнера
    private logo: Phaser.GameObjects.Image
    private voiceOn: Phaser.GameObjects.Image
    private voiceOff: Phaser.GameObjects.Image
    private siteIcon: Phaser.GameObjects.Image
    private burger: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x:number, y: number)
    {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Добавляем изображения и текст в контейнер
        this.logo = scene.add.image(-gameConfig.screenWidth / 2 + 175, 0, UI.mainLogo)
        this.voiceOn = scene.add.image(gameConfig.screenWidth / 2 - 172,0, UI.voiceOn)
        this.voiceOff = scene.add.image(gameConfig.screenWidth / 2 - 172,0, UI.voiceOff)
        this.siteIcon = scene.add.image(gameConfig.screenWidth / 2 - 110, 0, UI.site)
        this.burger = scene.add.image(gameConfig.screenWidth / 2 - 48, 0, UI.burger)

        // Отрисовываем изображения и текст
        this.add(this.logo)
        this.add(this.voiceOn)
        this.add(this.voiceOff)
        this.add(this.siteIcon)
        this.add(this.burger)

        // Скрываем не нужные состояния
        this.voiceOff.setVisible(false)

        // this.setSize(this.normalImage.width,this.normalImage.height)


        // Определяем действия для кнопки сайта
        this.siteIcon.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.openSite();
        })

    }

    private openSite() {
        const siteUrl = 'https://www.example.com'
        window.open(siteUrl, '_blank');
    }

}