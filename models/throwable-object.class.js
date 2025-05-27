class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 80;
        IntervalHub.startInterval(this.throw, 1000 / 40);
        // this.throw();
    }

    throw = () => {
        this.speedY = 30;
        this.applyGravity();
        this.x += 10;
    };
}
