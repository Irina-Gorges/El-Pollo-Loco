// #region class Coin

/**
 * Represents a collectible coin object in the game.
 * Inherits animation and collision logic from ConsumeableObject.
 */
class Coin extends ConsumeableObject {
    // #region Properties

    height = 100;
    width = 100;
    x = 200;
    offsetx = 0;
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
    };

    // #endregion

    /**
     * Creates a new coin at the specified position.
     * @param {number} x - Base X position
     * @param {number} y - Y position
     * @param {number} offsetx - Horizontal offset (e.g. for level distribution)
     */
    constructor(x, y, offsetx) {
        super();
        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);
        this.loadImage("img/8_coin/coin_1.png");
        this.loadImages(ImageHub.images_of_coins);
        this.animate();
        this.x = x + offsetx;
        this.y = y;
    }

    /**
     * Creates a full coin pattern (e.g. arches or towers) with offset.
     * @param {number} offsetx - Horizontal starting offset
     * @param {number} count - Number of coins to generate
     * @returns {Coin[]} Array of Coin instances
     */
    static multipleCoins(offsetx, count = 8) {
        const coins = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 1200) + 100; 
            const y = Math.floor(Math.random() * 175) + 150; 
            coins.push(new Coin(x, y, offsetx));
        }
        return coins;
    }
}

// #endregion