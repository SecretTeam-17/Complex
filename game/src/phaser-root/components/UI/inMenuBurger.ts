import Phaser from 'phaser'
import { UI } from '../../constants/assetConstants'

export default class inMenuBurger {

    // Определяем объекты класса
    private burgerMenu: Phaser.GameObjects.Container
    private scene: Phaser.Scene
    openSettings = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene

        // Создаем контейнер для меню
        this.burgerMenu = this.createMenuContainer(x, y)
        // Добавляем панель настроек в контейнер
        this.addSettingsPanel()

        // Добавляем ссылки в контейнер
        const linkData = [
            { text: 'О Petsitters', url: 'https://pet-sitter.ru/#BfKeO7G' },
            { text: 'Условия использования', url: 'https://pet-sitter.ru/legal' },
            { text: 'Конфиденциальность', url: 'https://pet-sitter.ru/' },
        ]

        linkData.forEach((link, index) => {
            const yOffset = 74 + index * 54
            const linkText = this.createLinkText(link.text, yOffset, link.url)
            this.burgerMenu.add(linkText)
        })
    }

    // Создание контейнера меню
    private createMenuContainer(x: number, y: number): Phaser.GameObjects.Container {
        const container = this.scene.add.container(x - 15, y + 15).setScale(0).setDepth(1)
        return container
    }

    // Добавление панели настроек в контейнер меню
    private addSettingsPanel() {
        const settingsPanel = this.scene.add.nineslice(0, 0, UI.PANEL, undefined, 410).setOrigin(1, 0).setScale(1, 0.83)
        this.burgerMenu.add(settingsPanel)
    }

    // Создание ссылки с текстом и добавление интерактива
    private createLinkText(text: string, y: number, url: string): Phaser.GameObjects.Text {
        const linkText = this.scene.add.text(-362, y, text, {
            fontFamily: 'Manrope',
            fontSize: '24px',
            color: '#320064',
        }).setOrigin(0, 0)

        linkText.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => window.open(url, '_blank'))

        return linkText
    }

    settingsShow() {
        if (this.openSettings) return

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
        if (!this.openSettings) return

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