class BottleBar extends DrawableObject {
    IMAGES_BOTTLES = ImageHub.bottlebar.IMAGES_BOTTLES;

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 340;
        this.y = 0;
        this.width = 150;
        this.height = 45;
        this.setBottles(0); // Setzt das Anfangsbild der Bottlesbar ein
    }

    //* Bottlesanzeige
    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottles == 0) {
            return 0;
        } else if (this.bottles > 20) {
            return 1;
        } else if (this.bottles > 40) {
            return 2;
        } else if (this.bottles > 60) {
            return 3;
        } else if (this.bottles > 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
