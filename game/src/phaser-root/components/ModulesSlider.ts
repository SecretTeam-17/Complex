import Phaser from 'phaser'
import { UI } from '../constants/assetConstants'
import { MOODULEONE } from '../constants/moduleOneConstants'
import moduleCard from './moduleCard'

export default class ModulesSlider extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private moduleOne: moduleCard
    private moduleTwo: moduleCard
    private moduleThree: moduleCard
    private moduleFour: moduleCard

    private arrowLeft: Phaser.GameObjects.Image
    private arrowRight: Phaser.GameObjects.Image


    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        let count = 1

        this.arrowLeft = scene.add.image(this.x - 50, this.y, UI.ARROWLEFT)
        this.arrowRight = scene.add.image(this.x + 550, this.y, UI.ARROWRIGHT)

        this.moduleOne = new moduleCard(this.scene, this.x + 250, this.y, 'Модуль 1. Подготовка', MOODULEONE.PREIMAGE, 30)
        this.moduleTwo = new moduleCard(this.scene, this.x + 250, this.y, 'Модуль 2. Знакомство', MOODULEONE.PREIMAGE, 50)
        this.moduleThree = new moduleCard(this.scene, this.x + 250, this.y, 'Модуль 3. Прогулка', MOODULEONE.PREIMAGE, 10)
        this.moduleFour = new moduleCard(this.scene, this.x + 250, this.y, 'Модуль 4. Прощание', MOODULEONE.PREIMAGE, 10)

        this.add(this.arrowLeft)
        this.add(this.arrowRight)

        this.add(this.moduleOne)
        this.moduleOne.setVisible(true)
        this.add(this.moduleTwo)
        this.moduleTwo.setVisible(false)
        this.add(this.moduleThree)
        this.moduleThree.setVisible(false)
        this.add(this.moduleFour)
        this.moduleFour.setVisible(false)



        this.arrowLeft.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                count--
                if (count < 1) { count = 1 }
                if (count === 1) { this.moduleOne.setVisible(true) }
                else { this.moduleOne.setVisible(false) }

                if (count === 2) { this.moduleTwo.setVisible(true) } else { this.moduleTwo.setVisible(false) }

                if (count === 3) { this.moduleThree.setVisible(true) } else { this.moduleThree.setVisible(false) }

                if (count === 4) { this.moduleFour.setVisible(true) } else { this.moduleFour.setVisible(false) }



            })

        this.arrowRight.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                count++
                if (count > 4) { count = 1 }
                if (count === 1) { this.moduleOne.setVisible(true) }
                else { this.moduleOne.setVisible(false) }

                if (count === 2) { this.moduleTwo.setVisible(true) } else { this.moduleTwo.setVisible(false) }

                if (count === 3) { this.moduleThree.setVisible(true) } else { this.moduleThree.setVisible(false) }

                if (count === 4) { this.moduleFour.setVisible(true) } else { this.moduleFour.setVisible(false) }


            })


    }

}