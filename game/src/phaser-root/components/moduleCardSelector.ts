import Phaser from 'phaser'
import { MODULE } from '../constants/assetConstants'
import moduleCard from './moduleCard'

export default class moduleCardSelector extends Phaser.GameObjects.Container {

    // Определяем объекты контейнера
    private moduleOne: moduleCard
    private moduleTwo: moduleCard
    private moduleThree: moduleCard


    constructor(scene: Phaser.Scene, x: number, y: number) {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        this.moduleOne = new moduleCard(this.scene, this.x, this.y, 'Модуль 1. Подготовка', MODULE.MODULEONE.PREIMAGE, 30)
        this.moduleTwo = new moduleCard(this.scene, this.x + 450, this.y, 'Модуль 2. Знакомство', MODULE.MODULEONE.PREIMAGE, 50)
        this.moduleThree = new moduleCard(this.scene, this.x + 900, this.y, 'Модуль 3. Прогулка', MODULE.MODULEONE.PREIMAGE, 10)

        this.add(this.moduleOne)
        this.add(this.moduleTwo)
        this.add(this.moduleThree)

    }

}