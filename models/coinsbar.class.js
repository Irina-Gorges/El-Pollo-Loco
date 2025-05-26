class CoinsBar extends DrawableObject {
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 20;
        this.y = 35;
        this.width = 200;
        this.height = 55;
        this.setCoins(0); // Setzt das Anfangsbild der Coinsbar ein
    }

    //* Coinsanzeige
    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
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
