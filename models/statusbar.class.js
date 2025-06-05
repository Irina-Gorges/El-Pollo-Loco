class StatusBar extends DrawableObject {
    //#region Attributes
    IMAGES_STATUS = ImageHub.statusbar.IMAGES_STATUS;

    health = 100;
    //#endregion

    //#region Constructor
    /**
     * Class constructor.
     * Loads the status bar images, sets the initial position and size,
     * and initializes the health display to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS);
        this.x = 20;
        this.y = 0;
        this.width = 150;
        this.height = 45;
        this.setHealth(100); // setzt das Anfangsbild der Statusbar ein
    }
    //#endregion

    //#region Methods
    //* Lebensanzeige
    /**
     * Sets the current health value and updates the displayed status bar image.
     *
     * @param {number} health - The current health value (0 to 100).
     */
    setHealth(health) {
        this.health = health;
        let path = this.IMAGES_STATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the current health value.
     *
     * @returns {number} The index of the image in IMAGES_STATUS corresponding to the health.
     */
    resolveImageIndex() {
        if (this.health == 100) {
            return 5;
        } else if (this.health > 80) {
            return 4;
        } else if (this.health > 60) {
            return 3;
        } else if (this.health > 40) {
            return 2;
        } else if (this.health > 20) {
            return 1;
        } else {
            return 0;
        }
    }
    //#endregion
}
