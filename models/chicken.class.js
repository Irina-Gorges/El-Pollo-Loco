class Chicken extends MovableObject {
    //#region Attributes
    x = 260;
    y = 350;
    width = 70;
    height = 80;

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

    IMAGES_WALKING = ImageHub.chicken.IMAGES_WALKING;
    IMAGES_DEAD = ImageHub.chicken.IMAGES_DEAD;
    //#endregion

    //#region Constructor
    constructor() {
        super().loadImage(
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.x + Math.random() * 2200;
        this.speed = 0.5 + Math.random() * 0.5;
        IntervalHub.startInterval(this.animate, 1000 / 20, 100 / 5);
        this.getRealFrame();
    }
    //#endregion

    animate = () => {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
    };
}
