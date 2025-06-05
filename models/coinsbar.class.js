class CoinsBar extends DrawableObject {
    IMAGES_COINSB = ImageHub.coinsbar.IMAGES_COINSB;

    coins = 0;

    //#region Constructor
    /**
     * Class constructor.
     * Loads the coin bar images, sets the initial position and size of the object,
     * and initializes the coin bar display to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSB);
        this.x = 180;
        this.y = 0;
        this.width = 150;
        this.height = 45;
        this.setCoins(0); // Setzt das Anfangsbild der Coinsbar ein
    }
    //#endregion

    //#region Methods
    //* Coinsanzeige
    /**
     * Sets the current number of coins and updates the displayed image accordingly.
     *
     * @param {number} coins - The current number of coins to display.
     */
    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES_COINSB[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the current coin count.
     *
     * @returns {number} The index of the image in IMAGES_COINSB corresponding to the coin count.
     */
    resolveImageIndex() {
        if (this.coins == 0) {
            return 0;
        } else if (this.coins == 1) {
            return 1;
        } else if (this.coins == 2) {
            return 2;
        } else if (this.coins == 3) {
            return 3;
        } else if (this.coins == 4) {
            return 4;
        } else {
            return 5;
        }
    }
    //#endregion
}
