class Character extends MovableObject {
    speed = 10;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true; //* Wenn Pepe rückwärts läuft, dann wird sein Charakter gespiegelt
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk Animation
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;  //* i = 0, 1, 2, 3, 4, 5, 0
                let path = this.IMAGES_WALKING[i]; //* Hier laden wir das 0. Bild aus dem Array rein
                this.img = this.imageCache[path]; //* Hier sage ich, das ich das Bild in unseren Cache so setze.
                this.currentImage++; //* Hier wird dann das Bild immer um eins erhöht.
            }
        }, 50);
    }

    jump() {}
}
