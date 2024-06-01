import { Scene } from 'phaser'
import { EventBus } from '../EventBus'

export class MainMenu extends Scene
{
    logoTween;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        this.add.image(512, 100, 'main-logo').setScale(1);

        this.add.image(50,700,'music').setScale(0.2)
        this.add.image(110,700,'burger').setScale(0.2)

        const startButton = this.add.image(512,700, 'start-button-up').setScale(1.25);
        const resumeButton = this.add.image(512,560, 'resume-button-up').setScale(1.25).setVisible(false)

        const startButtonDown = this.add.image(512,700, 'start-button-down').setScale(1.25);
        startButtonDown.setVisible(false)
        const resumeButtonDown = this.add.image(512,560, 'resume-button-down').setScale(1.25)
        resumeButtonDown.setVisible(false)

        startButton.setInteractive()
            .on('pointerdown', () => {
                startButton.setAlpha(0); 
                startButtonDown.setVisible(true).setAlpha(1); 
                setTimeout(() => {
                    this.scene.start('Game');
                }, 500);
            })
            .on('pointerout', () => {
                startButtonDown.setAlpha(0).setVisible(false);
                startButton.setAlpha(1);
            });

        resumeButton.setInteractive()
            .on('pointerdown', () => {
                resumeButton.setAlpha(0).setVisible(false)
                resumeButtonDown.setVisible(true).setAlpha(1);
                setTimeout(() => {
                    this.scene.start('Game');
                }, 500);
            })
            .on('pointerout', () => {
                resumeButtonDown.setAlpha(0).setVisible(false);
                resumeButton.setVisible(true).setAlpha(1);
            });

        
        EventBus.emit('current-scene-ready', this);
    }
}
