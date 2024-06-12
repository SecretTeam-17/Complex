import { setCurrentScene } from '../../../redux/GameConfig/config.slice'
import { store } from '../../../redux/store'
import ModuleCard from './moduleCard'
import ModuleCardMini from './moduleCardMini'

export default class ModuleCardSelector {

    // Определяем объекты класса
    cardSelector!: Phaser.GameObjects.Container

    private cardOne: ModuleCard
    private cardTwo: ModuleCard
    private cardThree: ModuleCard
    private cardFour: ModuleCard

    private cardOneMini: ModuleCardMini
    private carTwoMiniLeft: ModuleCardMini
    private cardTwoMiniRight: ModuleCardMini
    private cardThreeMiniLeft: ModuleCardMini
    private cardThreeMiniRight: ModuleCardMini
    private cardFourMini: ModuleCardMini

    private scene: Phaser.Scene

    isVisible = false

    scaleOne = 1
    scaleTwo = 0.95
    scaleThree = 0.90

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.scene = scene

        this.cardSelector = scene.add.container(x, y).setScale(1).setDepth(1)

        // Карточки модулей
        this.cardOne = new ModuleCard(scene, 0, 0)
        this.cardTwo = new ModuleCard(scene, 70, 0)
        this.cardThree = new ModuleCard(scene, 140, 0)
        this.cardFour = new ModuleCard(scene, 210, 0)

        //Маленькие карточки
        this.cardOneMini = new ModuleCardMini(scene, 40, 470, 'Модуль 1')
        this.cardOneMini.container.setRotation(-1.5708)

        this.carTwoMiniLeft = new ModuleCardMini(scene, 110, 470, 'Модуль 2. Слева')
        this.carTwoMiniLeft.container.setRotation(-1.5708)

        this.cardTwoMiniRight = new ModuleCardMini(scene, 440, 470, 'Модуль 2. Справа')
        this.cardTwoMiniRight.container.setRotation(-1.5708)

        this.cardThreeMiniLeft = new ModuleCardMini(scene, 180, 470, 'Модуль 3. Слева')
        this.cardThreeMiniLeft.container.setRotation(-1.5708)

        this.cardThreeMiniRight = new ModuleCardMini(scene, 510, 460, 'Модуль 3. Справа')
        this.cardThreeMiniRight.container
            .setRotation(-1.5708)
            .setScale(this.scaleTwo)

        this.cardFourMini = new ModuleCardMini(scene, 580, 450, 'Модуль 4')
        this.cardFourMini.container
            .setRotation(-1.5708)
            .setScale(this.scaleThree)





        // Добавляем карточки в контейнер
        this.cardSelector.add(this.cardFourMini.container)
        this.cardSelector.add(this.cardThreeMiniRight.container)
        this.cardSelector.add(this.cardTwoMiniRight.container)
        this.cardSelector.add(this.cardOneMini.container.setAlpha(0))
        this.cardSelector.add(this.carTwoMiniLeft.container.setAlpha(0))
        this.cardSelector.add(this.cardThreeMiniLeft.container.setAlpha(0))


        this.cardSelector.add(this.cardOne.container)
        this.cardSelector.add(this.cardTwo.container.setAlpha(0))
        this.cardSelector.add(this.cardThree.container.setAlpha(0))
        this.cardSelector.add(this.cardFour.container.setAlpha(0))

        this.cardOneMini.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleOneButton()
            })

        this.cardTwoMiniRight.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleTwoButton()
            })

        this.carTwoMiniLeft.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleTwoButton()
            })

        this.cardThreeMiniRight.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleThreeButton()
            })

        this.cardThreeMiniLeft.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleThreeButton()
            })

        this.cardFourMini.panel.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.moduleFourButton()
            })

        this.cardOne.hoverImage.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.scene.cameras.main.fadeOut(500, 0, 0, 0, (_camera: any, progress: number) => {
                    if (progress === 1) {
                        store.dispatch(setCurrentScene('ModuleOne'))
                        this.scene.scene.start('ModuleOne')

                    }
                })
            })
    }

    hideAllCards() {
        this.cardOne.container.setAlpha(0)
        this.cardTwo.container.setAlpha(0)
        this.cardThree.container.setAlpha(0)
        this.cardFour.container.setAlpha(0)
    }

    hideAllCardsMini() {
        this.cardOneMini.container.setAlpha(0)
        this.cardThreeMiniRight.container.setAlpha(0)
        this.cardTwoMiniRight.container.setAlpha(0)
        this.cardFourMini.container.setAlpha(0)
        this.carTwoMiniLeft.container.setAlpha(0)
        this.cardThreeMiniLeft.container.setAlpha(0)
    }

    moduleOneButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardOne.container.setAlpha(1)
        this.cardTwoMiniRight.container.setAlpha(1).setScale(this.scaleOne).setY(470)
        this.cardThreeMiniRight.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardFourMini.container.setAlpha(1).setScale(this.scaleThree).setY(450)
    }

    moduleTwoButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardTwo.container.setAlpha(1)
        this.cardThreeMiniRight.container.setAlpha(1).setScale(this.scaleOne).setY(470)
        this.cardFourMini.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardOneMini.container.setAlpha(1)
    }

    moduleThreeButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardThree.container.setAlpha(1)
        this.cardFourMini.container.setAlpha(1).setScale(this.scaleOne).setY(470)
        this.cardOneMini.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.carTwoMiniLeft.container.setAlpha(1).setScale(this.scaleOne).setY(470)
    }

    moduleFourButton() {
        this.hideAllCards()
        this.hideAllCardsMini()

        this.cardFour.container.setAlpha(1)
        this.cardOneMini.container.setAlpha(1).setScale(this.scaleThree).setY(450)
        this.carTwoMiniLeft.container.setAlpha(1).setScale(this.scaleTwo).setY(460)
        this.cardThreeMiniLeft.container.setAlpha(1).setScale(this.scaleOne).setY(470)
    }
}