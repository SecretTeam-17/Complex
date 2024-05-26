import { Scene } from 'phaser'

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/main/boot_bg.jpg');
        this.load.image('main-logo', 'assets/main/main_logo.png')
        this.load.image('main-icon', 'assets/main/petsitter-icon.png')

        this.load.image('start-button-up', 'assets/ui/start-button-up.png')
        this.load.image('start-button-down', 'assets/ui/start-button-down.png')
        this.load.image('resume-button-up', 'assets/ui/resume-button-up.png')
        this.load.image('resume-button-down', 'assets/ui/resume-button-down.png')

        this.load.image('mainmap-bg', 'assets/MainMap/map_bg.jpg');

        this.load.image('cat', 'assets/ChoiceScene/cat.png')
        this.load.image('dog', 'assets/ChoiceScene/dog.png')
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
