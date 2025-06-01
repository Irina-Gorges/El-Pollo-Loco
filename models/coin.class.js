class Coin extends DrawableObject {
    IMAGES_COIN = ImageHub.coin.IMAGES_COIN;

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 340;
        this.y = 180;
        this.width = 120;
        this.height = 120;
        this.setCoin(0); // Setzt das Anfangsbild der Coins ein
    }

    //* Coinanzeige
    setCoin(coin) {
        this.coin = coin;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.x = this.x + Math.random() * 2100;
        this.y = this.y + Math.random() * 175;
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
