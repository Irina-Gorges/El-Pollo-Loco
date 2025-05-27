class Endboss extends MovableObject {
    height = 400;
    width = 320;
    y = 60;

    IMAGES_WALKING = ImageHub.endboss.IMAGES_WALKING;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        IntervalHub.startInterval(this.animate, 1000 / 5);
        // this.animate();
    }

    animate = () => {
        this.playAnimation(this.IMAGES_WALKING);
    };
}
