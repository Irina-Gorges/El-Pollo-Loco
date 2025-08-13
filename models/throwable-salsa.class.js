//#region class throwableSalsa

/**
 * Represents a thrown salsa object that moves and animates.
 * Inherits movement and collision behavior from MoveableObject.
 */
class throwableSalsa extends MoveableObject {
    //#region Properties

    gotHit = false;
    throwLeft = false;
    shouldDisappear = false;
    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    };
    height = 60;
    width = 50;

    //#endregion

    /**
     * Creates a new throwable salsa object at the given position.
     * @param {number} x - Starting X position
     * @param {number} y - Starting Y position
     * @param {boolean} throwLeft - Indicates whether the bottle should be thrown to the left
     */
    constructor(x, y, throwLeft = false) {
        super();
        this.throwLeft = throwLeft;
        this.loadImage(ImageHub.salsa.spinning_salsa[0]);
        this.loadImages(ImageHub.salsa.spinning_salsa);
        this.loadImages(ImageHub.salsa.salsa_splash);
        this.throw(x, y);
    }

    //#region Movement & Animation

    /**
     * Initiates the throw and starts animation and movement intervals.
     * @param {number} x - Initial X position
     * @param {number} y - Initial Y position
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        Intervalhub.startInterval(this.showImage, 1000 / 10);
        Intervalhub.startInterval(this.flyingbottle, 1000 / 60);
        Intervalhub.startInterval(this.applyGravitySalsa, 1000 / 30);
        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);
    }

    /**
     * Moves the bottle in the specified direction.
     */
    flyingbottle = () => {
        if (!this.gotHit) {
            if (this.throwLeft) {
                this.x -= 10; // Move left
            } else {
                this.x += 10; // Move right
            }
        }
    };

    /**
     * Applies gravity to the bottle while it's airborne.
     */
    applyGravitySalsa = () => {
        if (!this.gotHit && (this.isAboveGround() || this.y > 0)) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    };

    /**
     * Displays the appropriate animation (spinning or splash).
     */
    showImage = () => {
        if (this.gotHit) {
            this.playAnimation(ImageHub.salsa.salsa_splash);
        } else {
            this.playAnimation(ImageHub.salsa.spinning_salsa);
        }
    };

    /**
     * Called when the bottle collides with another object.
     * Triggers splash animation and schedules disappearance.
     */
    hit() {
        if (!this.gotHit) {
            this.gotHit = true;
            setTimeout(() => {
                this.shouldDisappear = true;
            }, 100);
        }
    }

    //#endregion
}

//#endregion