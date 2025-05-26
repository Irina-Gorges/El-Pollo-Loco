class BottleBar extends DrawableObject {
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 20;
        this.y = 75;
        this.width = 200;
        this.height = 55;
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
