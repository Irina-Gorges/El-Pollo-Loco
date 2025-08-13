// #region class ConsumeableObject

/**
 * Abstract superclass for consumable objects (e.g. coins, salsa bottles).
 * Inherits movement and rendering logic from MoveableObject.
 */
class ConsumeableObject extends MoveableObject {
    // #region Constructor

    /**
     * Creates a new consumable object.
     */
    constructor() {
        super();
    }

    // #endregion

    // #region Animation

    /**
     * Starts a simple idle animation with a static frequency.
     * Uses the coin image set by default.
     */
    animate() {
        Intervalhub.startInterval(() => {
            this.playAnimation(ImageHub.images_of_coins);
        }, 400);
    }

    // #endregion
}

// #endregion