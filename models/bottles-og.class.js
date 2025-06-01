class BottlesOG extends DrawableObject {
    IMAGES_BOTTLES_OG = ImageHub.bottlesOG.IMAGES_BOTTLES_OG;

    bottlesOG = 0;

    constructor() {
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES_OG);
        this.x = 340;
        this.y = 340;
        this.width = 90;
        this.height = 90;
        this.setBottlesOG(0); // Setzt das Anfangsbild der Bottle ein
    }

    //* Coinanzeige
    setBottlesOG(bottlesOG) {
        this.bottlesOG = bottlesOG;
        let path = this.IMAGES_BOTTLES_OG[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.x = this.x + Math.random() * 2000;
        this.y = this.y + Math.random() * 5;
    }

    resolveImageIndex() {
        if (this.bottlesOG == 0) {
            return 0;
        } else if (this.bottlesOG > 20) {
            return 1;
        } else if (this.bottlesOG > 40) {
            return 2;
        } else if (this.bottlesOG > 60) {
            return 3;
        } else if (this.bottlesOG > 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
