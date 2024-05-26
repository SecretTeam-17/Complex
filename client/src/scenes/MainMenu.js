import { Scene } from 'phaser'

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        this.add.image(512, 200, 'main-logo').setScale(0.25);

        const startButton = this.add.image(512,460, 'start-button-up').setScale(1.25);
        const resumeButton = this.add.image(512,560, 'resume-button-up').setScale(1.25)

        const startButtonDown = this.add.image(512,460, 'start-button-down').setScale(1.25);
        startButtonDown.setVisible(false)
        const resumeButtonDown = this.add.image(512,560, 'resume-button-down').setScale(1.25)
        resumeButtonDown.setVisible(false)

        startButton.setInteractive()
            .on('pointerdown', () => {
                startButton.setAlpha(0); 
                startButtonDown.setVisible(true).setAlpha(1); 
                setTimeout(() => {
                    this.scene.start('MainMap');
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
                    this.scene.start('MainMap');
                }, 500);
            })
            .on('pointerout', () => {
                resumeButtonDown.setAlpha(0).setVisible(false);
                resumeButton.setVisible(true).setAlpha(1);
            });

    }
}
