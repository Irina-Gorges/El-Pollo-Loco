// #region class coin_bar

/**
 * Display for collected coins.
 * Inherits from the generic Statusbar.
 */
class coin_bar extends Statusbar {
    // #region Properties

    x = 10;
    y = 57;
    percentage = 0;
    collectedCoins = 0;

    // #endregion

    /**
     * Creates the coin bar and loads all image stages.
     */
    constructor() {
        super();
        this.loadImages(ImageHub.hitpointbar.coins);
        this.setPercentage(0);
    }

    /**
     * Sets the current percentage value and updates the corresponding image.
     * @param {number} percentage - Progress value from 0 to 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        let path = ImageHub.hitpointbar.coins[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
    }
}

// #endregion