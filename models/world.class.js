class World {
    // ########### Attributes ###########
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    coin = new Coin();
    bottlesOG = new BottlesOG();
    throwableObjects = [];

    // ########### Constructor ###########
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.run, 1000 / 5);
    }

    // ########### Methods ###########
    setWorld() {
        this.character.world = this;
    }

    run = () => {
        this.checkCollisions();
        this.checkThrowObjects();
    };

    // Checkt ob eine Kollission stattfindet
    checkThrowObjects() {
        if (this.keyboard.THROW && !this.character.isThrowing) {
            const bottle = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100
            );
            this.throwableObjects.push(bottle);

            // Flag aktivieren und Zeit setzen
            this.character.isThrowing = true;
            this.character.throwStartTime = new Date().getTime();
            this.character.lastMoveTime = this.character.throwStartTime;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setHealth(this.character.energy);
                this.coinsBar.setCoins(this.character.coins);
                this.bottleBar.setBottles(this.character.bottles);
                console.log(
                    'Collision with Character, energy',
                    this.character.energy
                );
            }
        });
    }

    /**
     * Zeichnet die Welt auf den Bildschirm
     * Die draw() Methode wird immer wieder aufgerufen
     * und sorgt dafür, dass die Welt auf den Bildschirm
     * gezeichnet wird. Sie wird immer wieder
     * von requestAnimationFrame aufgerufen.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Back
        //* ----- Space for fixed objects -----
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.coin);
        this.addToMap(this.bottlesOG);

        this.ctx.translate(-this.camera_x, 0);

        //* Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Iterates over an array of objects and adds each object to the map.
     *
     * @param {Array} objects - The array of objects to be added to the map.
     */

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the map by drawing it on the canvas.
     * If the object is facing the opposite direction, it flips the image
     * horizontally before drawing. It also draws frames around the object
     * for collision detection. After drawing, if the object was flipped,
     * it reverts the flip to maintain the original object state.
     *
     * @param {MovableObject} mo - The movable object to be added to the map.
     */

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        //* Rahmen drum herum malen für Collission
        mo.drawFrame(this.ctx);
        mo.drawRedFrame(this.ctx);
    }

    /**
     * Flips the image of the movable object horizontally on the canvas.
     * This involves saving the current canvas context, then translating
     * and scaling the context to achieve the flip effect. The object's x
     * coordinate is also inverted to match the visual transformation.
     *
     * @param {MovableObject} mo - The movable object whose image is to be flipped.
     */

    flipImage(mo) {
        this.ctx.save(); //* Speichert die Eigenschaften von unserem Context
        this.ctx.translate(mo.width, 0); //* Wir spiegeln das Bild um 180°
        this.ctx.scale(-1, 1); //* Hier verschieben wir das Bild wieder ein Stück nach rechts (um die Breite des Elements)
        mo.x = mo.x * -1; //* Dasselbe machen wir hier mit der X Koordinate
        mo.rX = mo.rX * -1;
    }

    /**
     * Reverts the horizontal flip of the image of the movable object on the canvas.
     * This involves restoring the canvas context to its previous state and
     * reverting the x coordinate transformation that was applied during the flip.
     *
     * @param {MovableObject} mo - The movable object whose image flip is to be reverted.
     */

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        mo.rX = mo.rX * -1;
        this.ctx.restore();
    }
}
