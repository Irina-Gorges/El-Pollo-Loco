class Chicken extends MovableObject {
    //#region Properties
    x = 260;
    y = 350;
    width = 70;
    height = 80;

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

    IMAGES_WALKING = ImageHub.chicken.IMAGES_WALKING;
    //#endregion

    constructor() {
        super().loadImage(
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
        );
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.x + Math.random() * 2200;
        this.speed = 0.5 + Math.random() * 0.5;
        IntervalHub.startInterval(this.animate, 1000 / 20, 100 / 5);
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
