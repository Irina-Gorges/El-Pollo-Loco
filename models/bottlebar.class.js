class BottleBar extends DrawableObject {
    //#region Attributes
    IMAGES_BOTTLESB = ImageHub.bottlebar.IMAGES_BOTTLESB;

    bottles = 0;
    //#endregion

    //#region Constructor
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLESB);
        this.x = 340;
        this.y = 0;
        this.width = 160;
        this.height = 45;
        this.setBottles(0); // Setzt das Anfangsbild der Bottlesbar ein
    }
    //#endregion

    //#region Methods
    //* Bottlesanzeige
    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLESB[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottles == 0) {
            return 0;
        } else if (this.bottles == 1) {
            return 1;
        } else if (this.bottles == 2) {
            return 2;
        } else if (this.bottles == 3) {
            return 3;
        } else if (this.bottles == 4) {
            return 4;
        } else {
            return 5;
        }
    }
    //#endregion
}
