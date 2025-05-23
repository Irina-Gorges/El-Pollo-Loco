class MovableObject {
    // ########### Attributes ###########
    x = 120;
    y = 70;
    img;
    width = 130;
    height = 260;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0; //* der Charakter fällt von oben nach unten
    acceleration = 2.5; //* wie schnell fällt der Charakter
    energy = 100;
    lastHit = 0;
    rX;
    rY;
    rW;
    rH;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    //* Rahmen drum herum malen für Collission
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // charakter.isColliding(chicken)
    isColliding(mo) {
        return (
            this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in sek
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6;  //* i = 0, 1, 2, 3, 4, 5, 0
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
