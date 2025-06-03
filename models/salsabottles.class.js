class SalsaBottles extends DrawableObject {
    //#region Attributes
    IMAGES_SALSABOTTLES = ImageHub.salsaBottles.IMAGES_SALSABOTTLES;

    bottlesOG = 0;

    offset = {
        top: 10,
        right: 25,
        bottom: 10,
        left: 25,
    };
    //#endregion

    //#region Constructor
    constructor() {
        super();
        this.loadImages(this.IMAGES_SALSABOTTLES);
        this.x = 340;
        this.y = 340;
        this.width = 90;
        this.height = 90;
        this.setBottlesOG(this.getRandom1Or2()); // Setzt das Anfangsbild der Bottle ein
        this.getRealFrame();
    }
    //#endregion

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    //* Coinanzeige
    setBottlesOG(bottlesOG) {
        this.bottlesOG = bottlesOG;
        let path = this.IMAGES_SALSABOTTLES[this.bottlesOG];
        this.img = this.imageCache[path];
        this.x = this.x + Math.random() * 2000;
        this.y = this.y + Math.random() * 5;
    }

    getRandom1Or2() {
        let result;
        result = Math.random() < 0.5 ? 0 : 1;
        return result;
    }
}
