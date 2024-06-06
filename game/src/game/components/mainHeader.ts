import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'
import iconButton from './iconButton'

export default class mainHeader extends Phaser.GameObjects.Container
{

    // Определяем объекты контейнера
    private logo: Phaser.GameObjects.Image
    private settings: Phaser.GameObjects.Image
    private burger: Phaser.GameObjects.Image

    private settingsMenu: Phaser.GameObjects.Container
    private burgerMenu: Phaser.GameObjects.Container

    private openBurger = false
    private openSettings = false

    constructor(scene: Phaser.Scene, x:number, y: number)
    {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        this.scene = scene

        const { width } = scene.scale

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
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            if (this.openSettings)
                {
                    this.settingsHide()
                    if (this.openBurger){this.burgerHide()}
                }
            else
                {
                    this.settingsShow()
                    if (this.openBurger){this.burgerHide()}
                }
            
        })

        this.settingsMenu = scene.add.container(width - 96, 50).setScale(0)
        const settingsPanel = scene.add.nineslice(0, 20, UI.PANEL).setOrigin(1, 0)
        this.settingsMenu.add(settingsPanel)

        const voiceONButton = new iconButton(scene, settingsPanel.width - 385, 90, 'ЗВУК ВКЛ', UI.VOICEON)

        const voiceOffButton = new iconButton(scene, settingsPanel.width - 385, 90, 'ЗВУК ВЫКЛ', UI.VOICEOFF).setVisible(false)

        const siteButton = new iconButton(scene, settingsPanel.width - 385, 150, 'НА САЙТ', UI.SITE)

        this.settingsMenu.add(siteButton)
        this.settingsMenu.add(voiceONButton)
        this.settingsMenu.add(voiceOffButton)
        
        siteButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
            this.openSite();
        })

        voiceONButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
            voiceONButton.setVisible(false)
            voiceOffButton.setVisible(true)
        })

        voiceOffButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
            voiceOffButton.setVisible(false)
            voiceONButton.setVisible(true)
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
            if (this.openBurger)
                {
                    this.burgerHide()
                    if (this.openSettings){this.settingsHide()}
                }
            else
                {
                    this.burgerShow()
                    if (this.openSettings){this.settingsHide()}
                }
            
        })

        this.burgerMenu = scene.add.container(width - 170, 50).setScale(0)
        const burgerPanel = scene.add.nineslice(0, 20, UI.PANEL, undefined, 234).setOrigin(1, 0)

        const linkOne = scene.add.text(-burgerPanel.width + 24, 68, 'О Petsitters', {
            fontFamily:'Manrope',
            fontSize: '14px',
            fontStyle: 'normal',
            color:'#320064',
            
        }).setOrigin(0, 0)

        const linkTwo = scene.add.text(-burgerPanel.width + 24, 106, 'Условия использования', {
            fontFamily:'Manrope',
            fontSize: '14px',
            fontStyle: 'normal',
            color:'#320064',
            
        }).setOrigin(0, 0)

        const linkThree = scene.add.text(-burgerPanel.width + 24, 144, 'Конфиденциальность', {
            fontFamily:'Manrope',
            fontSize: '14px',
            fontStyle: 'normal',
            color:'#320064',
            
        }).setOrigin(0, 0)

        this.burgerMenu.add(burgerPanel)
        this.burgerMenu.add(linkOne)
        this.burgerMenu.add(linkTwo)
        this.burgerMenu.add(linkThree)

        linkOne.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
            this.openSite();
        })

        linkTwo.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
            this.openSite();
        })

        linkThree.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
            this.openSite();
        })
    }

    burgerShow()
    {
        const { width } = this.scene.scale

        if (this.openBurger)
            {
                return
            }

        this.scene.tweens.add({
            targets:this.burgerMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openBurger = true
    }

    burgerHide()
    {
        const { width } = this.scene.scale

        if (!this.openBurger)
            {
                return
            }

        this.scene.tweens.add({
            targets:this.burgerMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openBurger = false
    }

    settingsShow()
    {
        const { width } = this.scene.scale

        if (this.openSettings)
            {
                return
            }

        this.scene.tweens.add({
            targets:this.settingsMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = true
    }

    settingsHide()
    {
        const { width } = this.scene.scale

        if (!this.openSettings)
            {
                return
            }

        this.scene.tweens.add({
            targets:this.settingsMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = false
    }

    private openSite() {
        const siteUrl = 'https://www.example.com'
        window.open(siteUrl, '_blank');
    }

}