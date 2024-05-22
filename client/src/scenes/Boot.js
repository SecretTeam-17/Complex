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

        this.load.image('background', 'assets/BootScene/boot_bg.jpg');
        this.load.image('logo', 'assets/BootScene/main_logo.png')

        this.load.image('cat', 'assets/ChoiceScene/cat.png')
        this.load.image('dog', 'assets/ChoiceScene/dog.png')
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
