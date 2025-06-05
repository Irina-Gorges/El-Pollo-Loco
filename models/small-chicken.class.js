/**
 * Class representing a small chicken enemy.
 * Extends MovableObject and includes properties for position, size,
 * animations, and movement behavior.
 *
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    //#region Attributs
    x = 260;
    y = 380;
    width = 50;
    height = 50;

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

    IMAGES_WALKING = ImageHub.chicken_small.IMAGES_WALKING;
    IMAGES_DEAD = ImageHub.chicken_small.IMAGES_DEAD;
    //#endregion

    //#region Constructor
    /**
     * Creates a new SmallChicken instance.
     * Initializes position, speed, and animation intervals.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.x + Math.random() * 2200;
        this.speed = 0.25 + Math.random() * 0.5;
        IntervalHub.startInterval(this.animate, 1000 / 32, 100 / 5);
        this.getRealFrame();
        this.hit();
        this.isDead();
        this.playAnimation();
    }
    //#endregion

    //#region Methods

    /**
     * Animation loop: moves the chicken left and plays walking animation.
     */
    animate = () => {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
    };
    //#endregion
}
