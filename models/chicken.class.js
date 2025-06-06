class Chicken extends MovableObject {
    //#region Attributes
    x = 260;
    y = 350;
    width = 70;
    height = 80;
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

    IMAGES_WALKING = ImageHub.chicken.IMAGES_WALKING;
    IMAGES_DEAD = ImageHub.chicken.IMAGES_DEAD;

    

    //#endregion

    //#region Constructor
    /**
     * Creates a new instance of the enemy character.
     * Loads the initial walk image and animation image sets (walking and dead).
     * Sets a random horizontal starting position and speed.
     * Starts the animation interval for this character.
     * Initializes the current animation frame.
     */
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

    /**
     * Animates the enemy character by moving it left and playing the walking animation.
     * This method is called repeatedly at a fixed interval.
     */
    // animate = () => {
    //     this.moveLeft();
    //     this.playAnimation(this.IMAGES_WALKING);
    // };

    animate = () => {
        if (this.isDead()) {
            // Prüfen, ob das Huhn tot ist
            this.playAnimation(this.IMAGES_DEAD); // Todesanimation abspielen
            this.speed = 0; // Bewegung stoppen
        } else {
            this.moveLeft(); // Normal weiterbewegen
            this.playAnimation(this.IMAGES_WALKING); // Laufanimation abspielen
        }
    };
}
