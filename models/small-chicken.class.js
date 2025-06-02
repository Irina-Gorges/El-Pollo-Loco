class SmallChicken extends MovableObject {
    //#region Properties
    x = 260;
    y = 380;
    width = 50;
    height = 50;

    rX;
    rY;
    rW;
    rH;

    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    IMAGES_WALKING = ImageHub.chicken_small.IMAGES_WALKING;
    //#endregion

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * 2200;
        this.speed = 0.25 + Math.random() * 0.5;
        IntervalHub.startInterval(this.animate, 1000 / 32, 100 / 5);
        this.getRealFrame();
    }

    // ########### Methods ###########

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    animate = () => {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
    };
}
