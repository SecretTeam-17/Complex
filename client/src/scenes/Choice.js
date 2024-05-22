import { Scene } from 'phaser'

export class ChoicePet extends Scene
{
    constructor ()
    {
        super('ChoicePet');
    }

    create() {

        this.add.image(512, 384, 'background');

        const image1Button = this.add.image(300, 300, 'cat').setScale(0.5).setInteractive();
        const image2Button = this.add.image(700, 300, 'dog').setScale(0.5).setInteractive();

        image1Button.on('pointerover', () => {
            image1Button.setScale(0.7);})
        image1Button.on('pointerout', () => {
            image1Button.setScale(0.5);})

        image2Button.on('pointerover', () => {
            image2Button.setScale(0.7);})
        image2Button.on('pointerout', () => {
            image2Button.setScale(0.5);})

        this.add.text(512, 560, 'Выбери своего бойца', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
    
        image1Button.on('pointerdown', () => {
          this.scene.start('GameOver', {selectedImage: 'cat'});
        });
    
        image2Button.on('pointerdown', () => {
          this.scene.start('GameOver', {selectedImage: 'dog'});
        });
      }
}
