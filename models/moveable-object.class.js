//#region class MoveableObject

/**
 * Base class for all movable objects in the game.
 * Includes functionality for gravity, collision detection, movement, and state management.
 */
class MoveableObject extends DrawableObject {
    //#region Properties

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastAction = new Date().getTime();
    chickenIsDead = false;
    rx;
    ry;
    rw;
    rh;

    //#endregion

    //#region Movement & Gravity

    /**
     * Applies gravity to the object if it's not on the ground.
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    /**
     * Makes the object jump upward.
     */
    jump = () => {
        this.speedY = 30;
    };

    /**
     * Moves the object to the right.
     */
    moveRight = () => {
        this.x += this.speed;
    };

    /**
     * Moves the object to the left.
     * Does nothing if the object is marked as dead.
     */
    moveLeft = () => {
        if (this.chickenIsDead) {
            return;
        }

        this.x -= this.speed;
    };

    //#endregion

    //#region Collision & Position

    /**
     * Checks if the object is above the ground.
     * @returns {boolean}
     */
    isAboveGround() {
        return this.y < 170;
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MoveableObject} mo - Another movable object
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.rx + this.rw > mo.rx && this.ry + this.rh > mo.ry && this.rx < mo.rx + mo.rw && this.ry < mo.ry + mo.rh;
    }

    /**
     * Calculates the actual collision frame based on offsets.
     */
    getRealFrame = () => {
        this.rx = this.x + this.offset.left;
        this.ry = this.y + this.offset.top;
        this.rw = this.width - this.offset.left - this.offset.right;
        this.rh = this.height - this.offset.top - this.offset.bottom;
    };

    //#endregion

    //#region Animation

    /**
     * Plays a frame-based animation using an array of image paths.
     * @param {string[]} images - Array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    //#endregion

    //#region State / Energy / Actions

    /**
     * Applies damage to the object and records the time of impact.
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object has no energy left.
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Indicates whether the object was recently hit (used for animations).
     * @returns {boolean}
     */
    isHurtAnimation() {
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        return timepassed < 0.5;
    }

    /**
     * Updates the timestamp of the last action performed.
     */
    updateActivity() {
        this.lastAction = new Date().getTime();
    }

    /**
     * Checks if the object has been idle for more than 3 seconds.
     * @returns {boolean}
     */
    isLongIdle() {
        let timePassed = (new Date().getTime() - this.lastAction) / 1000;
        return timePassed > 3;
    }

    //#endregion
}

//#endregion