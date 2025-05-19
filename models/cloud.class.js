class Cloud extends MovableObject {
    y = 30;
    width = 550;
    height = 300;
    // speed = 0.15;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 400;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}
