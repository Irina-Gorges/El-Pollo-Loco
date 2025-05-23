class Chicken extends MovableObject {
    y = 350;
    width = 70;
    height = 80;
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 70,
        right: 70,
        bottom: 70,
        left: 70,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage(
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
        );
        this.loadImages(this.IMAGES_WALKING);
        this.x = 260 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.getRealFrame();
    }

    // ########### Methods ###########

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.w - this.offset.left - this.offset.right;
        this.rH = this.h - this.offset.top - this.offset.bottom;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);
    }
}
