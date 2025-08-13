// #region class DrawableObject

/**
 * Base class for all drawable objects in the game.
 * Manages position, size, image sources, and rendering on the canvas.
 */
class DrawableObject {
    // #region Properties

    x = 100;
    y = 350;
    width = 80;
    height = 80;
    img;
    ImageCache = {};
    currentImage = 0;

    // #endregion

    /**
     * Loads a single image.
     * @param {string} path - Path to the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} array - Array of image paths
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    /**
     * Draws the object onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The drawing context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

// #endregion