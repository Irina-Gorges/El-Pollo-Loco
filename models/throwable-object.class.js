class ThrowableObject extends MovableObject {
    //#region Attributes
    width = 70;
    height = 70;

    offset = {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20,
    };

    bottle;

    IMAGES_THROW = ImageHub.bottles.IMAGES_THROW;
    IMAGES_SPLASH = ImageHub.bottles.IMAGES_SPLASH;
    //#endregion

    //#region Constructor
    /**
     * Creates a new throwable object at the given (x, y) coordinates.
     * Loads base and animation images, and starts gravity and throw intervals.
     *
     * @param {number} x - The horizontal starting position.
     * @param {number} y - The vertical starting position.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.isBroken = false;

        // this.applyGravity(); // nur 1x aktivieren
        IntervalHub.startInterval(this.applyGravity, 1000 / 40);
        IntervalHub.startInterval(this.throw, 1000 / 40); // regelmäßiger Aufruf
    }
    //#endregion

    //#region Methods
    /**
     * Executes the throw action:
     * Initializes the throw movement, moves the object to the right,
     * plays the throw animation, and checks if the object hits the ground
     * to break it.
     */
    throw = () => {
        if (!this.hasBeenThrown) {
            this.speedY = 20;
            this.hasBeenThrown = true;
        }

        if (!this.isBroken) {
            this.x += 15;
            this.playAnimation(this.IMAGES_THROW);

            // Prüfen, ob am Boden
            if (this.y >= 340) {
                // 340 = Bodenhöhe
                this.break(); // zerbricht beim Aufprall
            }
        }
    };

    /**
     * Sets the object as broken and changes the displayed image to the splash.
     */
    break = () => {
        this.isBroken = true;
        this.img = this.imageCache[this.IMAGES_SPLASH[0]];
    };
    //#endregion
}
