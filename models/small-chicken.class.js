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
    energy = 2;

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

    AUDIO_CHICKEN_SMALL_SOUND =
        AudioHub.chickenSounds.AUDIO_CHICKEN_SMALL_SOUND;
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
    }
    //#endregion

    //#region Methods

    /**
     * Animation loop: moves the chicken left and plays walking animation.
     */

    animate = () => {
        if (this.isDead()) {
            // Prüfen, ob das kleine Huhn tot ist
            this.playAnimation(this.IMAGES_DEAD); // Todesanimation abspielen
            this.speed = 0; // Bewegung stoppen
        } else {
            this.moveLeft(); // Normal weiterbewegen
            this.playAnimation(this.IMAGES_WALKING); // Laufanimation abspielen
            this.AUDIO_CHICKEN_SMALL_SOUND.play();
        }
    };
    //#endregion
}
