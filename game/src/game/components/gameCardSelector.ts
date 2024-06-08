import Phaser from 'phaser'
import { MODULE } from '../constants/assetConstants'
import moduleCard from './moduleCard'
import gameCard from './gameCard'

export default class gameCardSelector extends Phaser.GameObjects.Container
{

    // Определяем объекты контейнера
    private gameOne: gameCard
    private gameTwo: gameCard
    private gameThree: gameCard


    constructor(scene: Phaser.Scene, x:number, y: number)
    {
        // Создаем контейнер в сцене по координатам x, y
        super(scene, x, y)

        this.gameOne = new gameCard(this.scene, this.x, this.y, 'Собери овцу', 'Помоги собрать овцу', MODULE.MODULEONE.PREIMAGE, 30)
        this.gameTwo = new gameCard(this.scene, this.x + 450, this.y, 'Позы собаки', 'Угадай чего хочет собака!', MODULE.MODULEONE.PREIMAGE, 50)
        this.gameThree = new gameCard(this.scene, this.x + 900, this.y, 'Flappy Dog', 'Лети, песик, лети!', MODULE.MODULEONE.PREIMAGE, 10)
        
        this.add(this.gameOne)
        this.add(this.gameTwo)
        this.add(this.gameThree)

    }

}