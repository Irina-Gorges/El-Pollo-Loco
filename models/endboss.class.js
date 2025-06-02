class Endboss extends MovableObject {
    height = 400;
    width = 320;
    y = 60;

    offset = {
        top: 65,
        right: 5,
        bottom: 20,
        left: 5,
    };

    IMAGES_WALKING = ImageHub.endboss.IMAGES_WALKING;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        IntervalHub.startInterval(this.animate, 1000 / 5);
        this.getRealFrame();
    }

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    animate = () => {
        this.playAnimation(this.IMAGES_WALKING);
    };
}
