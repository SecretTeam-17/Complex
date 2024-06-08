import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { BACKGROUNDS } from '../constants/assetConstants'
import { CONFIG } from '../constants/gameConfig'

import CustomButton from '../components/customButton'
import mainHeader from '../components/mainHeader'
import mascotDog from '../components/mascotDog'

export class MainMenu extends Scene
{

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {

        this.cameras.main.fadeIn(500, 0,0,0)
        
        // Добавляем задний фон
        this.add.image(0, 0, BACKGROUNDS.STARTSCREEN).setOrigin(0,0).setScale(1)

        // Добавляем хеадер
        const Header = new mainHeader(this, CONFIG.SCREENWIDTH / 2, 38)
        this.add.existing(Header)

        // Добавляем кнопку
        const startButton = new CustomButton(this, 250, CONFIG.SCREENHIGHT - 40, 'Назад').setScale(0.5)
        this.add.existing(startButton)

        // Добавляем маскотов
        const Dog = new mascotDog(this, CONFIG.SCREENWIDTH / 2 + 306, CONFIG.SCREENHIGHT - 256).setScale(1.5)
        this.add.existing(Dog)


        startButton.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.scene.start('StartScreen');
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {

        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {

        })
        
        

        EventBus.emit('current-scene-ready', this);
    }

}
