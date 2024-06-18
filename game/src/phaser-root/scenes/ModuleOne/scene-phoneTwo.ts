import Phaser from 'phaser'
import { setBag, setPhone, setSavePoint } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import choiceMiniButton from '../../components/UI/choiceMiniButton'
import { CONFIG } from '../../constants/gameConfig'
import { MOODULEONE } from '../../constants/moduleOneConstants'

export default class scenePhoneTwo extends Phaser.GameObjects.Container {
    choiceMenu: Phaser.GameObjects.Container
    choicePanel: Phaser.GameObjects.Graphics
    ButtonOne: choiceMiniButton
    ButtonTwo: choiceMiniButton
    choiceMenu2: Phaser.GameObjects.Container
    choicePanel2: Phaser.GameObjects.Graphics
    typingText2: Phaser.GameObjects.Text
    ButtonOne2: choiceMiniButton
    ButtonTwo2: choiceMiniButton

    isVisible: boolean
    bgOne: Phaser.GameObjects.Image
    bgTwo: Phaser.GameObjects.Image
    bgThree: Phaser.GameObjects.Image
    call: Phaser.Sound.BaseSound
    knopka: Phaser.Sound.BaseSound
    blankList: Phaser.GameObjects.Image

    checklistContainer: Phaser.GameObjects.Container
    checklistContainer2: Phaser.GameObjects.Container
    punkt1: Phaser.GameObjects.Text
    punkt2: Phaser.GameObjects.Text
    punkt3: Phaser.GameObjects.Text
    punkt4: Phaser.GameObjects.Text
    punkt5: Phaser.GameObjects.Text
    punkt6: Phaser.GameObjects.Text
    punkt7: Phaser.GameObjects.Text
    title: Phaser.GameObjects.Text
    background: Phaser.GameObjects.Image
    currentScore: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.scene = scene

        // Sound
        this.call = scene.sound.add(MOODULEONE.AUDIO.CALL).setVolume(0.4)
        this.knopka = scene.sound.add(MOODULEONE.AUDIO.KNOPKA).setVolume(0.4)

        // Инициализация фонов
        this.bgOne = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.PHONETWO)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(3)

        this.bgTwo = scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.CALLTWO)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(3)

        this.bgThree = scene.add.image(960, 0, MOODULEONE.BACKGROUNDS.ROOMRIGHT)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(3)

        this.blankList = scene.add.image(1100, 50, MOODULEONE.LISTBLANK)
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0)
            .setDepth(3)

        this.add(this.bgOne)
        this.add(this.bgTwo)
        this.add(this.bgThree)
        this.add(this.blankList)

        this.punkt1 = this.scene.add.text(1150, 275, 'Мальвина никогда не бывала на\nпередержке', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.punkt2 = scene.add.text(1150, 335, 'Боиться громких звуков', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.punkt3 = scene.add.text(1150, 375, 'Проблем со здоровьем нет', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.punkt4 = scene.add.text(1150, 415, 'Обожает спать под батареей', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.punkt5 = scene.add.text(1150, 455, 'Есть все прививки', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.punkt6 = scene.add.text(1150, 495, 'Обожает "Хатико"', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.punkt7 = scene.add.text(1150, 535, 'Одна дома ведет себя спокойно,\nчаще всего просто спит', {
            fontFamily: 'Comfortaa',
            fontSize: '24px',
            fontStyle: 'Bold',
            color: '#320064',
        }).setOrigin(0, 0)
            .setAlpha(0)
            .setDepth(4)

        this.add(this.punkt1)
        this.add(this.punkt2)
        this.add(this.punkt3)
        this.add(this.punkt4)
        this.add(this.punkt5)
        this.add(this.punkt6)
        this.add(this.punkt7)

        // Запуск анимаций и звуков
        this.initAnimations()

        // Container one
        this.choiceMenu = scene.add.container(500, 740).setScale(0).setDepth(3)
        this.add(this.choiceMenu)

        this.choicePanel = scene.add.graphics()
        this.choicePanel.fillStyle(0xffffff, 1)
        this.choicePanel.fillRoundedRect(0, 0, 384, 278, 24)

        this.ButtonOne = new choiceMiniButton(scene, 190, 90, '       СООБЩИТЬ\nЧТО ВСЕ ГОТОВО')
        this.ButtonTwo = new choiceMiniButton(scene, 190, 200, '  УЗНАТЬ\nО СОБАКЕ')

        this.choiceMenu.add(this.choicePanel)
        this.choiceMenu.add(this.ButtonOne)
        this.choiceMenu.add(this.ButtonTwo)

        this.ButtonOne.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.panelOneHide()
                this.panelTwoShow()
            })

        this.ButtonTwo.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.panelOneHide()
                this.showBgThreeAndBlankList()
            })

        // Container two
        this.choiceMenu2 = scene.add.container(648, CONFIG.SCREENHIGHT - 306).setAlpha(0).setDepth(3)
        this.add(this.choiceMenu2)

        this.choicePanel2 = scene.add.graphics()
        this.choicePanel2.fillStyle(0xffffff, 1)
        this.choicePanel2.fillRoundedRect(0, 0, 684, 228, 24)

        this.typingText2 = scene.add.text(32, 42, 'Вы уверены, что все сделали?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',

        })
            .setOrigin(0, 0)

        this.ButtonOne2 = new choiceMiniButton(scene, 180, 150, 'ДА')
        this.ButtonTwo2 = new choiceMiniButton(scene, 505, 150, 'ЕЩЕ НЕ ВСЕ')

        this.choiceMenu2.add(this.choicePanel2)
        this.choiceMenu2.add(this.ButtonOne2)
        this.choiceMenu2.add(this.ButtonTwo2)
        this.choiceMenu2.add(this.typingText2)

        this.ButtonOne2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                store.dispatch(setSavePoint('ModuleOneEnd'))
            })
        this.ButtonTwo2.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.panelOneShow()
                this.panelTwoHide()
            })

        // Создание контейнеров для чекбоксов
        this.createChecklistContainers()
    }

    initAnimations() {
        // Начинаем с воспроизведения звука
        this.call.play()

        this.scene.time.delayedCall(2000, () => {
            this.call.stop()
        })

        // Плавное появление bgOne
        this.scene.tweens.add({
            targets: this.bgOne,
            alpha: 1,
            ease: 'Linear',
            duration: 1000,
            onComplete: () => {
                // После появления bgOne, начинаем появление bgTwo с задержкой
                this.scene.time.delayedCall(1000, () => {
                    this.scene.tweens.add({
                        targets: this.bgTwo,
                        alpha: 1,
                        ease: 'Linear',
                        duration: 1000,
                        onComplete: () => {
                            this.panelOneShow()
                        }
                    })
                })
            }
        })
    }

    panelOneShow() {
        if (this.isVisible) {
            return
        }

        this.scene.tweens.add({
            targets: this.choiceMenu,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isVisible = true
    }

    panelOneHide() {
        if (!this.isVisible) {
            return
        }

        this.scene.tweens.add({
            targets: this.choiceMenu,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isVisible = false
    }

    private panelTwoShow() {
        this.scene.tweens.add({
            targets: this.choiceMenu2,
            alpha: 1,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut
        })
    }
    private panelTwoHide() {
        this.scene.tweens.add({
            targets: this.choiceMenu2,
            alpha: 0,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut
        })

    }
    private showBgThreeAndBlankList() {
        this.scene.tweens.add({
            targets: this.bgThree,
            alpha: 1,
            ease: 'Linear',
            duration: 500,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this.blankList,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 1000,
                    onComplete: () => {
                        this.title = this.scene.add.text(1150, 230, 'Анкета собаки', {
                            fontFamily: 'Comfortaa',
                            fontSize: '32px',
                            fontStyle: 'Bold',
                            color: '#000000',
                        }).setOrigin(0, 0)
                            .setAlpha(1)
                            .setDepth(4)

                        this.showChecklist()
                    }
                })
            }
        })
    }

    private createChecklistContainers() {
        // Первый контейнер с чекбоксами
        this.checklistContainer = this.scene.add.container(75, 700).setAlpha(0).setDepth(4)
        this.checklistContainer.add(this.createChecklistPanel1(0, 0, 920, 328))

        const continueButton1 = new choiceMiniButton(this.scene, 180, 260, 'ДАЛЕЕ')
        continueButton1.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.hideChecklist(this.checklistContainer, () => {
                this.showChecklist(this.checklistContainer2)
            })
        })
        this.checklistContainer.add(continueButton1)

        // Второй контейнер с чекбоксами
        this.checklistContainer2 = this.scene.add.container(75, 700).setAlpha(0).setDepth(4)
        this.checklistContainer2.add(this.createChecklistPanel2(0, 0, 920, 328))

        const backButton2 = new choiceMiniButton(this.scene, 180, 260, 'НАЗАД')
        backButton2.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.hideChecklist(this.checklistContainer2, () => {
                this.showChecklist(this.checklistContainer)
            })
        })
        this.checklistContainer2.add(backButton2)

        const endButton = new choiceMiniButton(this.scene, 520, 260, 'ЗАКОНЧИТЬ')
        endButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.hideAllElements()
            this.background = this.scene.add.image(0, 0, MOODULEONE.BACKGROUNDS.BLURROOM)
                .setOrigin(0, 0)
                .setScale(1)
                .setAlpha(0)
                .setDepth(3)
            this.scene.tweens.add({
                targets: this.background,
                alpha: 1,
                ease: 'Linear',
                duration: 500,
                onComplete: () => {
                    const listFullImage = this.scene.add.image(CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT / 2, MOODULEONE.LISTFULL)
                        .setOrigin(0.5, 0.5)
                        .setAlpha(0)
                        .setDepth(3)

                    this.scene.tweens.add({
                        targets: listFullImage,
                        alpha: 1,
                        ease: 'Linear',
                        duration: 500,
                        onComplete: () => {
                            const inventoryButton = new choiceMiniButton(this.scene, CONFIG.SCREENWIDTH / 2, CONFIG.SCREENHIGHT - 75, 'ДОБАВИТЬ В ИНВЕНТАРЬ')
                                .setAlpha(0)
                                .setDepth(3)

                            this.scene.add.existing(inventoryButton)

                            this.scene.tweens.add({
                                targets: inventoryButton,
                                alpha: 1,
                                ease: 'Linear',
                                duration: 500,
                            })

                            inventoryButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                                this.scene.tweens.add({
                                    targets: [inventoryButton, listFullImage, this.background, this.bgTwo],
                                    alpha: 0,
                                    ease: 'Linear',
                                    duration: 500,
                                })
                                store.dispatch(setPhone(3))
                                store.dispatch(setBag(1))
                                store.dispatch(setSavePoint('HUB'))
                            })
                        }
                    })
                }
            })
        })
        this.checklistContainer2.add(endButton)
    }

    private createChecklistPanel1(x: number, y: number, width: number, height: number): Phaser.GameObjects.Container {
        const panel = this.scene.add.graphics()
        panel.fillStyle(0xffffff, 1)
        panel.fillRoundedRect(x, y, width, height, 24)

        const check1on = this.scene.add.image(x + 45, y + 45, MOODULEONE.CHECKBOXON).setVisible(false)
        const check1off = this.scene.add.image(x + 45, y + 45, MOODULEONE.CHECKBOXOFF)
        const check2on = this.scene.add.image(x + 45, y + 90, MOODULEONE.CHECKBOXON).setVisible(false)
        const check2off = this.scene.add.image(x + 45, y + 90, MOODULEONE.CHECKBOXOFF)
        const check3on = this.scene.add.image(x + 45, y + 135, MOODULEONE.CHECKBOXON).setVisible(false)
        const check3off = this.scene.add.image(x + 45, y + 135, MOODULEONE.CHECKBOXOFF)
        const check4on = this.scene.add.image(x + 45, y + 180, MOODULEONE.CHECKBOXON).setVisible(false)
        const check4off = this.scene.add.image(x + 45, y + 180, MOODULEONE.CHECKBOXOFF)

        check1off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check1on.setVisible(true)
                check1off.setVisible(false)
                this.punkt1.setAlpha(1)
            })
        check1on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check1on.setVisible(false)
                check1off.setVisible(true)
                this.punkt1.setAlpha(0)
            })

        check2off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check2on.setVisible(true)
                check2off.setVisible(false)
                this.punkt2.setAlpha(1)
            })
        check2on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check2on.setVisible(false)
                check2off.setVisible(true)
                this.punkt2.setAlpha(0)
            })

        check3off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check3on.setVisible(true)
                check3off.setVisible(false)
                this.punkt3.setAlpha(1)
            })
        check3on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check3on.setVisible(false)
                check3off.setVisible(true)
                this.punkt3.setAlpha(0)
            })

        check4off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check4on.setVisible(true)
                check4off.setVisible(false)
                this.punkt4.setAlpha(1)
            })
        check4on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check4on.setVisible(false)
                check4off.setVisible(true)
                this.punkt4.setAlpha(0)
            })

        const check1text = this.scene.add.text(x + 75, y + 30, 'Была ли ранее собака на передержке?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })
        const check2text = this.scene.add.text(x + 75, y + 75, 'Есть ли любое место для сна?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })
        const check3text = this.scene.add.text(x + 75, y + 120, 'Есть ли у Мальвины страхи, тревожность, агрессия?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })
        const check4text = this.scene.add.text(x + 75, y + 165, 'Есть ли у проблемы со здоровьем, аллергии?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })

        const container = this.scene.add.container(x, y)
        container.add([panel, check1on, check1off, check2on, check2off, check3on, check3off, check4on, check4off, check1text, check2text, check3text, check4text])
        return container
    }

    private createChecklistPanel2(x: number, y: number, width: number, height: number): Phaser.GameObjects.Container {
        const panel = this.scene.add.graphics()
        panel.fillStyle(0xffffff, 1)
        panel.fillRoundedRect(x, y, width, height, 24)

        const check1on = this.scene.add.image(x + 45, y + 45, MOODULEONE.CHECKBOXON).setVisible(false)
        const check1off = this.scene.add.image(x + 45, y + 45, MOODULEONE.CHECKBOXOFF)
        const check2on = this.scene.add.image(x + 45, y + 90, MOODULEONE.CHECKBOXON).setVisible(false)
        const check2off = this.scene.add.image(x + 45, y + 90, MOODULEONE.CHECKBOXOFF)
        const check3on = this.scene.add.image(x + 45, y + 135, MOODULEONE.CHECKBOXON).setVisible(false)
        const check3off = this.scene.add.image(x + 45, y + 135, MOODULEONE.CHECKBOXOFF)

        check1off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check1on.setVisible(true)
                check1off.setVisible(false)
                this.punkt5.setAlpha(1)
            })
        check1on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check1on.setVisible(false)
                check1off.setVisible(true)
                this.punkt5.setAlpha(0)
            })

        check2off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check2on.setVisible(true)
                check2off.setVisible(false)
                this.punkt6.setAlpha(1)
            })
        check2on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check2on.setVisible(false)
                check2off.setVisible(true)
                this.punkt6.setAlpha(0)
            })

        check3off.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check3on.setVisible(true)
                check3off.setVisible(false)
                this.punkt7.setAlpha(1)
            })
        check3on.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                check3on.setVisible(false)
                check3off.setVisible(true)
                this.punkt7.setAlpha(0)
            })

        const check1text = this.scene.add.text(x + 75, y + 30, 'Привита собака в соответствии с возрастом?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })
        const check2text = this.scene.add.text(x + 75, y + 75, 'Есть ли любимый фильм у собаки?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })
        const check3text = this.scene.add.text(x + 75, y + 120, 'Грызет собака вещи, разрушает ли имущество когда\nостается одна?', {
            fontFamily: 'Comfortaa',
            fontSize: '28px',
            fontStyle: 'normal',
            color: '#320064',
        })

        const container = this.scene.add.container(x, y)
        container.add([panel, check1on, check1off, check2on, check2off, check3on, check3off, check1text, check2text, check3text])
        return container
    }

    private showChecklist(container?: Phaser.GameObjects.Container) {
        const targetContainer = container || this.checklistContainer
        this.scene.tweens.add({
            targets: targetContainer,
            alpha: 1,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut
        })
    }

    private hideChecklist(container: Phaser.GameObjects.Container, onComplete?: () => void) {
        this.scene.tweens.add({
            targets: container,
            alpha: 0,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut,
            onComplete: onComplete || (() => { })
        })
    }
    private hideAllElements() {
        // Hide backgrounds
        this.bgOne.setAlpha(0)
        this.bgThree.setAlpha(0)
        this.blankList.setAlpha(0)

        // Hide choice menus
        this.title.setAlpha(0)
        this.choiceMenu.setAlpha(0)
        this.choiceMenu2.setAlpha(0)

        // Hide text points
        this.punkt1.setAlpha(0)
        this.punkt2.setAlpha(0)
        this.punkt3.setAlpha(0)
        this.punkt4.setAlpha(0)
        this.punkt5.setAlpha(0)
        this.punkt6.setAlpha(0)
        this.punkt7.setAlpha(0)

        // Hide checklist containers
        this.checklistContainer.setAlpha(0)
        this.checklistContainer2.setAlpha(0)
    }
}