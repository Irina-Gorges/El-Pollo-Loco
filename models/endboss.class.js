class Endboss extends MovableObject {
    //#region Attributes
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
    IMAGES_ALERT = ImageHub.endboss.IMAGES_ALERT;
    IMAGES_ATTACK = ImageHub.endboss.IMAGES_ATTACK;
    IMAGES_HURT = ImageHub.endboss.IMAGES_HURT;
    IMAGES_DEAD = ImageHub.endboss.IMAGES_DEAD;
    //#endregion

    //#region constructor
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        IntervalHub.startInterval(this.animate, 1000 / 5);
        this.getRealFrame();
    }
    //#endregion

    //#region Methods

    



    animate = () => {
        this.playAnimation(this.IMAGES_WALKING);
    };
    //#endregion
}
