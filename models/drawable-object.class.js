class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 70;
    width = 130;
    height = 260;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    //#region draw
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the image of the movable object onto the provided canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The context of the canvas where the image will be drawn.
     */

    //* Rahmen drum herum malen für Collission
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Zeichnet einen roten Rahmen um das MovableObject
     * @param {CanvasRenderingContext2D} ctx - der Context des Canvas-Elements
     */
    drawRedFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof SmallChicken ||
            this instanceof ThrowableObject ||
            this instanceof Coin ||
            this instanceof SalsaBottles ||
            this instanceof Endboss
        ) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }
    //#endregion

    /**
     * Calculates the real frame of the Character object.
     *
     * The real frame is the area of the object that is actually visible on the screen.
     * It is calculated by adding the offset values to the x and y coordinates, and
     * subtracting the offset values from the width and height of the object.
     * The offset values are the distances from the edges of the object's bounding box
     * to the edges of the object itself.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
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
}
