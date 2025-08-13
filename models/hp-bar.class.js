// #region class HpBar

/**
 * Displays the health bar of the player character.
 * Inherits from the generic Statusbar.
 */
class HpBar extends Statusbar {
    // #region Properties

    percentage = 100;
    x = 10;
    y = -10;

    // #endregion

    /**
     * Creates a new health bar and loads all health images.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.hitpointbar.hp);
        this.setPercentage(100);
    }

    /**
     * Sets the current percentage value and updates the image.
     * @param {number} percentage - Health value from 0 to 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = ImageHub.hitpointbar.hp[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
    }
}

// #endregion