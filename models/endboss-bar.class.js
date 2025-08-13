// #region class Endbossbar

/**
 * Displays the health bar of the end boss.
 * Inherits from the generic Statusbar.
 */
class Endbossbar extends Statusbar {
    // #region Properties

    percentage = 100;
    x = 510;
    y = -3;

    // #endregion

    /**
     * Creates a new end boss health bar and loads all relevant images.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.hitpointbar.endboss);
        this.setPercentage(100);
    }

    /**
     * Sets the current percentage value and updates the image accordingly.
     * @param {number} percentage - Health value from 0 to 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.hitpointbar.endboss[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
    }
}

// #endregion