import { Scene } from 'phaser'
import { BACKGROUNDS, MASCOTS, UI } from '../constants/assetConstants'
import gameConfig from '../constants/gameConfig'

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  Отображаем фон для загрузочного экрана
        this.add.image(0,0, 'loading-bg').setOrigin(0,0).setScale(1.25)
        this.add.image(gameConfig.screenWidth / 2, gameConfig.screenHeight / 2,'big-logo').setScale(0.75)

        //  Полоса загрузки
        this.add.rectangle(gameConfig.screenWidth / 2, gameConfig.screenHeight - 100, 500, 32).setStrokeStyle(1, 0xffffff);

        //  Полоса прогресса
        const bar = this.add.rectangle(gameConfig.screenWidth / 2 - 248, gameConfig.screenHeight -100, 4, 28, 0xC896FF);

        //  Функция отображения прогресса загрузки
        this.load.on('progress', (progress) => {

            bar.width = 4 + (496 * progress);

        });
    }

    preload ()
    {
        // Загружаем основные компоненты
        this.load.setPath('assets');

        // Backgrounds
        this.load.image(BACKGROUNDS.startScreen, 'ui/startScreen-bg.png')

        // UI Main Header
        this.load.image(UI.mainLogo, 'ui/mainLogo.png')
        this.load.image(UI.voiceOn, 'ui/voiceOn.png')
        this.load.image(UI.voiceOff, 'ui/voiceOff.png')
        this.load.image(UI.voiceOff, 'ui/voiceOff.png')
        this.load.image(UI.site, 'ui/siteIcon.png')
        this.load.image(UI.burger, 'ui/burger.png')

        // Buttons
        this.load.image(UI.button.normal, 'ui/buttonNormal.png')
        this.load.image(UI.button.hover, 'ui/buttonHover.png')
        this.load.image(UI.button.disable, 'ui/buttonDisable.png')

        // Mascots
        this.load.image(MASCOTS.mascotCat.base, 'ui/mascotCat.png')
        this.load.image(MASCOTS.mascotDog.base, 'ui/mascotDog.png')

    }

    create ()
    {
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('StartScreen');
    }
}
