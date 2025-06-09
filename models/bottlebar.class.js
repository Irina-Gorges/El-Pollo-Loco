class BottleBar extends DrawableObject {
    //#region Attributes
    IMAGES_BOTTLESB = ImageHub.bottlebar.IMAGES_BOTTLESB;

    bottles = 0;
    //#endregion

    //#region Constructor
    /**
     * Creates a new instance of the Bottles bar.
     * Loads the bottle images, sets position and size.
     * Initializes the displayed image to 0 bottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESB);
        this.x = 20;
        this.y = 60;
        this.width = 130;
        this.height = 40;
        this.setBottles(0); // Setzt das Anfangsbild der Bottlesbar ein
    }
    //#endregion

    //#region Methods
    /**
     * Sets the number of bottles and updates the displayed image accordingly.
     * @param {number} bottles - The number of bottles (0 to 5).
     */
    //* Bottlesanzeige
    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLESB[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index corresponding to the current number of bottles.
     * Returns a value from 0 to 5.
     * @returns {number} The index of the image in IMAGES_BOTTLESB.
     */
    resolveImageIndex() {
        if (this.bottles == 0) {
            return 0;
        } else if (this.bottles == 1) {
            return 1;
        } else if (this.bottles == 2) {
            return 2;
        } else if (this.bottles == 3) {
            return 3;
        } else if (this.bottles == 4) {
            return 4;
        } else {
            return 5;
        }
    }
    //#endregion
}
