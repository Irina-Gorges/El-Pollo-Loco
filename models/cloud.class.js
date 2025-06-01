class Cloud extends MovableObject {
    y = 30;
    width = 550;
    height = 300;

    IMAGES_CLOUDS = ImageHub.clouds.IMAGES_CLOUDS;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.x = Math.random() * 2200;
        IntervalHub.startInterval(this.animate, 1000 / 40);
    }

    animate = () => {
        this.moveLeft();
    };
}
