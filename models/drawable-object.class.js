class DrawableObject {
    rX;
    rY;
    rW;
    rH;

    offset = {
        top: 110,
        right: 35,
        bottom: 13,
        left: 25,
    };

    constructor() {
        getRealFrame();
    }

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.w - this.offset.left - this.offset.right;
        this.rH = this.h - this.offset.top - this.offset.bottom;
    }
}
