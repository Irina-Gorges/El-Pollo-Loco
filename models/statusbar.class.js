class StatusBar extends DrawableObject {
    //#region Attributes
    IMAGES_STATUS = ImageHub.statusbar.IMAGES_STATUS;

    health = 100;
    //#endregion

    //#region Constructor
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS);
        this.x = 20;
        this.y = 0;
        this.width = 150;
        this.height = 45;
        this.setHealth(100); // setzt das Anfangsbild der Statusbar ein
    }
    //#endregion

    //#region Methods
    //* Lebensanzeige
    setHealth(health) {
        this.health = health;
        let path = this.IMAGES_STATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.health == 100) {
            return 5;
        } else if (this.health > 80) {
            return 4;
        } else if (this.health > 60) {
            return 3;
        } else if (this.health > 40) {
            return 2;
        } else if (this.health > 20) {
            return 1;
        } else {
            return 0;
        }
    }
    //#endregion
}
