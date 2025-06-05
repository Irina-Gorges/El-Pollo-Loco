class SalsaBottles extends DrawableObject {
    //#region Attributes
    IMAGES_SALSABOTTLES = ImageHub.salsaBottles.IMAGES_SALSABOTTLES;

    bottlesOG = 0;

    offset = {
        top: 10,
        right: 25,
        bottom: 10,
        left: 25,
    };
    //#endregion

    //#region Constructor
    /**
     * Class constructor.
     * Loads the salsa bottle images, sets the initial position and size,
     * initializes the bottle display with a random image (index 0 or 1),
     * and updates the current frame.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_SALSABOTTLES);
        this.x = 340;
        this.y = 340;
        this.width = 90;
        this.height = 90;
        this.setBottlesOG(this.getRandom1Or2()); // Setzt das Anfangsbild der Bottle ein
        this.getRealFrame();
    }
    //#endregion

    //#region Methods
    //* Bottleanzeige
    /**
     * Sets the current bottle image based on the given index,
     * updates the displayed image, and randomly adjusts the position.
     *
     * @param {number} bottlesOG - Index of the bottle image to display (typically 0 or 1).
     */
    setBottlesOG(bottlesOG) {
        this.bottlesOG = bottlesOG;
        let path = this.IMAGES_SALSABOTTLES[this.bottlesOG];
        this.img = this.imageCache[path];
        this.x = this.x + Math.random() * 2000;
        this.y = this.y + Math.random() * 5;
    }

    /**
     * Returns a random integer 0 or 1.
     * Used to randomly select one of two bottle images.
     *
     * @returns {number} Either 0 or 1, chosen randomly.
     */
    getRandom1Or2() {
        let result;
        result = Math.random() < 0.5 ? 0 : 1;
        return result;
    }

    //#endregion
}
