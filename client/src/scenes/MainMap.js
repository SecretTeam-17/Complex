import { Scene } from 'phaser'

export class MainMap extends Scene
{
    constructor ()
    {
        super('MainMap');
    }

    create() {

        const mainMapBg = this.add.image(512, 384, 'mainmap-bg');

        const module_1 = this.add.image(100, 500, 'main-icon').setScale(0.04).setInteractive();
        const module_2 = this.add.image(250, 400, 'main-icon').setScale(0.04).setInteractive();
        const module_3 = this.add.image(400, 350, 'main-icon').setScale(0.04).setInteractive();
        const module_4 = this.add.image(550, 420, 'main-icon').setScale(0.04).setInteractive();
        const module_5 = this.add.image(700, 300, 'main-icon').setScale(0.04).setInteractive();
        const module_6 = this.add.image(850, 200, 'main-icon').setScale(0.04).setInteractive();

        // Создание текстовых подсказок
        const hint_1 = this.add.text(100, 520, 'Подсказка 1').setVisible(false);
        const hint_2 = this.add.text(250, 420, 'Подсказка 2').setVisible(false);
        const hint_3 = this.add.text(400, 370, 'Подсказка 3').setVisible(false);
        const hint_4 = this.add.text(550, 440, 'Подсказка 4').setVisible(false);
        const hint_5 = this.add.text(700, 320, 'Подсказка 5').setVisible(false);
        const hint_6 = this.add.text(850, 220, 'Подсказка 6').setVisible(false);

        // Обработка наведения на кнопки
        module_1.on('pointerover', () => {
            this.tweenModule(module_1, 0.06); // Увеличение размера кнопки
            hint_1.setVisible(true); // Показываем подсказку
        });

        module_1.on('pointerout', () => {
            this.tweenModule(module_1, 0.04); // Возвращаем размер кнопки к исходному
            hint_1.setVisible(false); // Скрываем подсказку
        });

        module_1.on('pointerdown', () =>{
            this.scene.start('GameOver');
        })

        module_2.on('pointerover', () => {
            this.tweenModule(module_2, 0.06); // Увеличение размера кнопки
            hint_2.setVisible(true); // Показываем подсказку
        });

        module_2.on('pointerout', () => {
            this.tweenModule(module_2, 0.04); // Возвращаем размер кнопки к исходному
            hint_2.setVisible(false); // Скрываем подсказку
        });

        module_3.on('pointerover', () => {
            this.tweenModule(module_3, 0.06); // Увеличение размера кнопки
            hint_3.setVisible(true); // Показываем подсказку
        });

        module_3.on('pointerout', () => {
            this.tweenModule(module_3, 0.04); // Возвращаем размер кнопки к исходному
            hint_3.setVisible(false); // Скрываем подсказку
        });

        module_4.on('pointerover', () => {
            this.tweenModule(module_4, 0.06); // Увеличение размера кнопки
            hint_4.setVisible(true); // Показываем подсказку
        });

        module_4.on('pointerout', () => {
            this.tweenModule(module_4, 0.04); // Возвращаем размер кнопки к исходному
            hint_4.setVisible(false); // Скрываем подсказку
        });

        module_5.on('pointerover', () => {
            this.tweenModule(module_5, 0.06); // Увеличение размера кнопки
            hint_5.setVisible(true); // Показываем подсказку
        });

        module_5.on('pointerout', () => {
            this.tweenModule(module_5, 0.04); // Возвращаем размер кнопки к исходному
            hint_5.setVisible(false); // Скрываем подсказку
        });

        module_6.on('pointerover', () => {
            this.tweenModule(module_6, 0.06); // Увеличение размера кнопки
            hint_6.setVisible(true); // Показываем подсказку
        });

        module_6.on('pointerout', () => {
            this.tweenModule(module_6, 0.04); // Возвращаем размер кнопки к исходному
            hint_6.setVisible(false); // Скрываем подсказку
        });

        const Button1 = this.add.image(108,660, 'start-button-up')
        const Button2 = this.add.image(308,660, 'start-button-up')
        const Button3 = this.add.image(504,660, 'start-button-up')
        const Button4 = this.add.image(700,660, 'start-button-up')
        const Button5 = this.add.image(896,660, 'start-button-up')

        
      }
      tweenModule(module, scale) {
        this.tweens.add({
            targets: module,
            scaleX: scale,
            scaleY: scale,
            duration: 150,
            ease: 'Power2',
            yoyo: false,
            repeat: 0
        });}
      
}
