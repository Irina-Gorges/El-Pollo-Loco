class MovableObject extends DrawableObject {
    //#region Attributs

    speed = 0.15;
    otherDirection = false; //* der Charakter switcht von links nach rechts
    speedY = 0; //* keine Bewegung auf der vertikalen Ebene
    acceleration = 2; //* beeinflusst die Größe von speedY (Beschleunigung)
    energy = 100; //* die Lebensanzeige des Charakters
    lastHit = 0;
    damage = 0;

    //#endregion

    //#region Constructor
    constructor() {
        super();
        this.animationCounter = 0;
        this.animationFrameRate = 4; // Je höher, desto langsamer die Animation
    }
    //#endregion

    //#region Methods
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
        if (this.speedY > 0) {
            this.y -= this.speedY;
            this.rY -= this.speedY;
            this.speedY -= this.acceleration;
        } else if (this.isAboveGround()) {
            this.y -= this.speedY;
            this.rY -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0;
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
        this.animationCounter++;

        if (this.animationCounter % this.animationFrameRate === 0) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
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
        this.speedY = 27;
    }

    //#endregion
}
