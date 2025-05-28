class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        IntervalHub.startInterval(this.throw, 1000 / 40);
        this.animate();
    }

    throw = () => {
        this.speedY = 30;
        this.applyGravity();
        this.x += 10;
    };

    animate() {
        this.getRealFrame();
    }
}
