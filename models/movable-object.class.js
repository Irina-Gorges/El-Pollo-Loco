class MovableObject {
    //#region Properties
    x = 120;
    y = 70;
    rY = 175;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false; //* der Charakter switcht von links nach rechts
    speedY = 0; //* der Charakter fällt von oben nach unten
    acceleration = 2.5; //* wie schnell fällt der Charakter
    energy = 100; //* die Lebensanzeige des Charakters
    lastHit = 0;

    //#endregion
    // ########### Constructor ###########
    constructor() {}

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
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.rY -= this.speedY;
                this.speedY -= this.acceleration;
                // this.updatePosition();
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 175; //* Abfrage ob der Charakter am Boden ist oder nicht.
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    //#region draw
    /**
     * Draws the image of the movable object onto the provided canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The context of the canvas where the image will be drawn.
     */

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    //* Rahmen drum herum malen für Collission
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }

    /**
     * Zeichnet einen roten Rahmen um das MovableObject (nur für Character)
     * @param {CanvasRenderingContext2D} ctx - der Context des Canvas-Elements
     */
    drawRedFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }
    //#endregion
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

    /**
     * Loads all images from the given array into the movable object's imageCache.
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
