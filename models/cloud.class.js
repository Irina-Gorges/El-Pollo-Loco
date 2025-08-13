// #region class Cloud

/**
 * Represents a movable cloud in the game's background.
 * Inherits movement and rendering logic from MoveableObject.
 */
class Cloud extends MoveableObject {
    // #region Properties

    y = 0;
    width = 700;
    height = 300;

    // #endregion

    /**
     * Creates a new cloud with a random X position and starts its movement.
     */
    constructor() {
        super();
        this.loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 200;
        this.moveLeft();
    }
}

// #endregion