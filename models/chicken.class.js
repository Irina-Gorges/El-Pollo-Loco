class Chicken extends MovableObject {
    y = 350;
    width = 70;
    height = 80;
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
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6;  //* i = 0, 1, 2, 3, 4, 5, 0
            let path = this.IMAGES_WALKING[i]; //* Hier laden wir das 0. Bild aus dem Array rein
            this.img = this.imageCache[path]; //* Hier sage ich, das ich das Bild in unseren Cache so setze.
            this.currentImage++; //* Hier wird dann das Bild immer um eins erhöht.
        }, 200);
    }
}
