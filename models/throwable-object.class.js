class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;

    offset = {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20,
    };

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;

        // this.applyGravity(); // nur 1x aktivieren
        IntervalHub.startInterval(this.applyGravity, 1000 / 40);
        IntervalHub.startInterval(this.throw, 1000 / 40); // regelmäßiger Aufruf
    }

    throw = () => {
        if (!this.hasBeenThrown) {
            this.speedY = 25; // vertikale Anfangsgeschwindigkeit
            this.hasBeenThrown = true;
        }

        this.x += 15; // horizontale Bewegung
    };
}
