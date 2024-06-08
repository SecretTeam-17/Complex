import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'

export default class gameCard extends Phaser.GameObjects.Container
{

    // Определяем объекты контейнера
    private panel: Phaser.GameObjects.Image
    private preImage: Phaser.GameObjects.Image

    private normalImage: Phaser.GameObjects.Image
    private hoverImage: Phaser.GameObjects.Image

    private text: Phaser.GameObjects.Text
    private buttonText: Phaser.GameObjects.Text
    private descText: Phaser.GameObjects.Text


    constructor(scene: Phaser.Scene, x:number, y: number, text:string, desc:string, preimage:string, counts:number)
    {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        // Button
        this.normalImage = scene.add.image(0, 180, UI.ICONBUTTON.NORMAL)
        this.hoverImage = scene.add.image(0, 180, UI.ICONBUTTON.HOVER)

        // Добавляем изображения и текст в контейнер
        this.panel = scene.add.image(0,0, UI.MODULEPANEL)
        this.preImage = scene.add.image(0, 0, preimage)
        this.text = scene.add.text(0, -230, text, {
            fontFamily:'Manrope',
            fontSize: '30px',
            fontStyle: 'Bold',
            stroke:'#320064',
            strokeThickness:1,
            color:'#320064',
        })
            .setOrigin(0.5,0)

        this.buttonText = scene.add.text(0,180, 'НАЧАТЬ', {
            fontFamily:'Manrope',
            fontSize: '28px',
            fontStyle: 'Bold',
            color:'#FDF8F8',
        })
            .setOrigin(0.5, 0.5)


        this.descText = scene.add.text(0, -this.panel.height / 2 + 95, desc, {
            fontFamily:'Manrope',
            fontSize: '20px',
            fontStyle: 'Normal',
            color:'#320064',
        })
            .setOrigin(0.5, 0.5)



        // Отрисовываем изображения и текст
        this.add(this.panel)
        this.add(this.text)
        this.add(this.descText)
        this.add(this.preImage)
        this.add(this.normalImage)
        this.add(this.hoverImage)
        this.add(this.buttonText)
        

        // Скрываем не нужные состояния
        this.hoverImage.setVisible(false)

        this.setSize(this.panel.width,this.panel.height)


        // Определяем действия для кнопки по навыедению и нажатию
        this.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
            this.normalImage.setVisible(false)
            this.hoverImage.setVisible(true)
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
            this.normalImage.setVisible(true)
            this.hoverImage.setVisible(false)
        })

    }

}