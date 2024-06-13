import { UI } from '../../constants/assetConstants'


export default class inMenuBurger {

    // Определяем объекты класса
    private burgerMenu!: Phaser.GameObjects.Container

    private scene: Phaser.Scene

    openSettings = false

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.scene = scene

        // Container
        this.burgerMenu = scene.add.container(x - 15, y + 15).setScale(0).setDepth(1)
        const settingsPanel = scene.add.nineslice(0, 0, UI.PANEL, undefined, 410).setOrigin(1, 0).setScale(1, 0.83)
        this.burgerMenu.add(settingsPanel)

        const linkOne = scene.add.text(-settingsPanel.width + 48, 74, 'О Petsitters', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',

        }).setOrigin(0, 0)

        const linkTwo = scene.add.text(-settingsPanel.width + 48, 128, 'Условия использования', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',

        }).setOrigin(0, 0)

        const linkThree = scene.add.text(-settingsPanel.width + 48, 188, 'Конфиденциальность', {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',

        }).setOrigin(0, 0)

        this.burgerMenu.add(linkOne)
        this.burgerMenu.add(linkTwo)
        this.burgerMenu.add(linkThree)

        linkOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                const siteUrl = 'https://www.example.com'
                window.open(siteUrl, '_blank')
            })

        linkTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                const siteUrl = 'https://www.example.com'
                window.open(siteUrl, '_blank')
            })

        linkThree.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                const siteUrl = 'https://www.example.com'
                window.open(siteUrl, '_blank')
            })



    }
    settingsShow() {
        if (this.openSettings) {
            return
        }

        this.scene.tweens.add({
            targets: this.burgerMenu,
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
            targets: this.burgerMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.openSettings = false
    }

}