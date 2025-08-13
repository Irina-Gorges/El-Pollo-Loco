// #region class BackgroundObject

/**
 * Represents a background object (e.g., mountains, trees, sky) that moves within the level.
 * Inherits movement and rendering functions from MoveableObject.
 */
class BackgroundObject extends MoveableObject {
    // #region Properties

    width = 720;
    height = 480;
    y = 0;

    // #endregion

    // #region Constructor

    /**
     * Creates a background object with the given image and X position.
     * @param {string} imagePath - Path to the background object's image
     * @param {number} x - X position where the object should appear
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
    }

    // #endregion
}

// #endregion
