class BottleBar extends DrawableObject {
    IMAGES_BOTTLESB = ImageHub.bottlebar.IMAGES_BOTTLESB;

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESB);
        this.x = 340;
        this.y = 0;
        this.width = 150;
        this.height = 45;
        this.setBottles(0); // Setzt das Anfangsbild der Bottlesbar ein
    }

    //* Bottlesanzeige
    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLESB[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottles == 0) {
            return 0;
        } else if (this.bottles > 2) {
            return 1;
        } else if (this.bottles > 4) {
            return 2;
        } else if (this.bottles > 6) {
            return 3;
        } else if (this.bottles > 8) {
            return 4;
        } else {
            return 5;
        }
    }
}
