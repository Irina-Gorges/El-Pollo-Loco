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
