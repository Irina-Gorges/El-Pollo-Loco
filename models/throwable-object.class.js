class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;

    offset = {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20,
    };
    bottle;
    IMAGES_THROW = ImageHub.bottle.IMAGES_THROW;
    IMAGES_SPLASH = ImageHub.bottle.IMAGES_SPLASH;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.isBroken = false;

        // this.applyGravity(); // nur 1x aktivieren
        IntervalHub.startInterval(this.applyGravity, 1000 / 40);
        IntervalHub.startInterval(this.throw, 1000 / 40); // regelmäßiger Aufruf
    }

    throw = () => {
        if (!this.hasBeenThrown) {
            this.speedY = 22;
            this.hasBeenThrown = true;
        }

        if (!this.isBroken) {
            this.x += 18;
            this.playAnimation(this.IMAGES_THROW);

            // Prüfen, ob am Boden
            if (this.y >= 340) {
                // 340 = Bodenhöhe
                this.break(); // zerbricht beim Aufprall
            }
        }
    };

    break = () => {
        this.isBroken = true;
        this.img = this.imageCache[this.IMAGES_SPLASH[0]];
    };
}
