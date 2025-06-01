class CoinsBar extends DrawableObject {
    IMAGES_COINSB = ImageHub.coinsbar.IMAGES_COINSB;

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINSB);
        this.x = 180;
        this.y = 0;
        this.width = 150;
        this.height = 45;
        this.setCoins(0); // Setzt das Anfangsbild der Coinsbar ein
    }

    //* Coinsanzeige
    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES_COINSB[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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
}
