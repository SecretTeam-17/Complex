import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS } from '../constants/assetConstants'
import gameConfig from '../constants/gameConfig'

import CustomButton from '../components/customButton'
import mainHeader from '../components/mainHeader'
import mascotCat from '../components/mascotCat'
import mascotDog from '../components/mascotDog'

export class StartScreen extends Scene
{

    constructor ()
    {
        super('StartScreen');
    }

    create ()
    {
        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.startScreen).setOrigin(0,0)

        // Добавляем хеадер
        const Header = new mainHeader(this, gameConfig.screenWidth / 2, 50)
        this.add.existing(Header)

        // Добавляем кнопку
        const startButton = new CustomButton(this, gameConfig.screenWidth / 2, gameConfig.screenHeight - 120, 'СТАРТ')

        this.add.existing(startButton)

        // Добавляем маскотов
        const Dog = new mascotDog(this, gameConfig.screenWidth / 2 + 300, gameConfig.screenHeight - 200)
        this.add.existing(Dog)

        const Cat = new mascotCat(this, gameConfig.screenWidth / 2 - 300, gameConfig.screenHeight - 130)
        this.add.existing(Cat)

        startButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

        })

        EventBus.emit('current-scene-ready', this);
    }

}
