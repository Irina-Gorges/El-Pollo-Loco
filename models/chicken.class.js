class Chicken extends MovableObject {
    y = 370;
    width = 50;
    height = 60;

    constructor() {
        super().loadImage(
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'
        );
        this.x = 260 + Math.random() * 500;
    }
}
