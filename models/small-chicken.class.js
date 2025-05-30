class SmallChicken extends MovableObject {
    //#region Properties
    x = 260;
    y = 350;
    width = 50;
    height = 30;

    rX;
    rY;
    rW;
    rH;

    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    IMAGES_WALKING = ImageHub.small_chicken.IMAGES_WALKING;
    //#endregion

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * 600;
        this.speed = 0.15 + Math.random() * 0.5;
        IntervalHub.startInterval(this.animate, 1000 / 15, 100 / 5);
    }

    // ########### Methods ###########

    animate = () => {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
    };
}
