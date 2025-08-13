//#region class Salsa_Bar

/**
 * Displays the current supply of salsa bottles.
 * Inherits from the generic Statusbar class.
 */
class Salsa_Bar extends Statusbar {
    //#region Properties

    x = 10;
    y = 24;
    percentage = 0;

    //#endregion

    /**
     * Creates the salsa bar and loads the corresponding images.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.hitpointbar.bottle);
        this.setPercentage(0);
    }

    /**
     * Sets the fill level of the salsa bar and updates the displayed image.
     * @param {number} percentage - New percentage value (0–100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        let path = ImageHub.hitpointbar.bottle[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
    }
}

//#endregion