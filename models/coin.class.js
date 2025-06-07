class Coin extends DrawableObject {
    //#region Attributes
    IMAGES_COIN = ImageHub.coin.IMAGES_COIN;

    coins = 0;

    offset = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    };
    //#endregion

    //#region Constructor
    /**
     * Class constructor.
     * Loads the coin images, sets the initial position and size of the object,
     * initializes the coin display to 0, and determines the current frame.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 340;
        this.y = 180;
        this.width = 120;
        this.height = 120;
        this.setCoin(0); // Setzt das Anfangsbild der Coins ein
        this.getRealFrame();
    }
    //#endregion

    //#region Methods
    /**
     * Sets the current coin amount and updates the displayed image.
     * The coin's position is randomly shifted within specified ranges.
     *
     * @param {number} coin - The amount of coins to set.
     */
    //* Coinanzeige
    setCoin(coin) {
        this.coin = coin;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.x = this.x + Math.random() * 1900;
        this.y = this.y + Math.random() * 175;
    }

    /**
     * Determines the index of the image to display based on the current coin amount.
     *
     * @returns {number} The index of the image in IMAGES_COIN corresponding to the coin amount.
     */
    resolveImageIndex() {
        if (this.coins == 0) {
            return 0;
        } else if (this.coins > 20) {
            return 1;
        } else if (this.coins > 40) {
            return 2;
        } else if (this.coins > 60) {
            return 3;
        } else if (this.coins > 80) {
            return 4;
        } else {
            return 5;
        }
    }
    //#endregion
}
