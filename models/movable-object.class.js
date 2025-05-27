class MovableObject extends DrawableObject {
    //#region Properties

    rY = 175;
    speed = 0.15;
    otherDirection = false; //* der Charakter switcht von links nach rechts
    speedY = 0; //* der Charakter fällt von oben nach unten
    acceleration = 2.5; //* wie schnell fällt der Charakter
    energy = 100; //* die Lebensanzeige des Charakters
    lastHit = 0;

    //#endregion

    // ########### Constructor ###########
    constructor() {
        super();
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
    }
    // ########### Methods ###########

    /**
     * Applies gravity to the object.
     *
     * If the object is above the ground or if it is moving upwards,
     * the object will move downwards at an accelerating rate,
     * simulating gravity.
     *
     * @method applyGravity
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.rY -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            //* Throwable Objects should always fall
            return true;
        } else {
            return this.y < 175; //* Abfrage ob der Charakter am Boden ist oder nicht.
        }
    }

    // charakter.isColliding(chicken)
    isColliding(mo) {
        return (
            this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH
        );
    }

    /**
     * Subtracts 5 energy points from the movable object's energy.
     * If the energy falls below 0, it is set to 0.
     * The timestamp of the last hit is stored in lastHit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Returns true if the movable object has been hit in the last second.
     * @returns {boolean} True if the movable object has been hit in the last second.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in sek
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;  //* i = 0, 1, 2, 3, 4, 5, 0
        let path = images[i]; //* Hier laden wir das 0. Bild aus dem Array rein
        this.img = this.imageCache[path]; //* Hier sage ich, das ich das Bild in unseren Cache so setze.
        this.currentImage++; //* Hier wird dann das Bild immer um eins erhöht.
    }

    moveRight() {
        this.x += this.speed;
        this.rX += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
        this.rX -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}
