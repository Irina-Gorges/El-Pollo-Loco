class MovableObject {
    x = 120;
    y = 50;
    img;
    width = 130;
    height = 260;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0; //* der Charakter fällt von oben nach unten
    acceleration = 2.4; //* wie schnell fällt der Charakter

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 175; //* Abfrage ob der Charakter am Boden ist oder nicht.
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;  //* i = 0, 1, 2, 3, 4, 5, 0
        let path = images[i]; //* Hier laden wir das 0. Bild aus dem Array rein
        this.img = this.imageCache[path]; //* Hier sage ich, das ich das Bild in unseren Cache so setze.
        this.currentImage++; //* Hier wird dann das Bild immer um eins erhöht.
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}
