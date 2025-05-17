class Character extends MovableObject {
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;  //* i = 0, 1, 2, 3, 4, 5, 0
            let path = this.IMAGES_WALKING[i]; //* Hier laden wir das 0. Bild aus dem Array rein
            this.img = this.imageCache[path]; //* Hier sage ich, das ich das Bild in unseren Cache so setze.
            this.currentImage++; //* Hier wird dann das Bild immer um eins erhöht.
        }, 1000);
    }

    jump() {}
}
