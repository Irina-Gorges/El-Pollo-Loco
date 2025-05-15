class MovableObject {
    x = 120;
    y = 240;
    img;
    width = 120;
    height = 250;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {}
}
