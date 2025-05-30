class Cloud extends MovableObject {
    y = 30;
    width = 550;
    height = 300;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 900;
        IntervalHub.startInterval(this.animate, 1000 / 40);
    }

    animate = () => {
        this.moveLeft();
    };
}
