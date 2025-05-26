class Character extends MovableObject {
    //#region Properties
    speed = 5;
    width = 130;
    height = 260;

    rX;
    rW;
    rH;

    offset = {
        top: 220,
        right: 25,
        bottom: -100,
        left: 35,
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    world;
    //#endregion

    /**
     * Constructor for the Character class.
     *
     * This constructor creates a new Character object.
     * It loads the walking, jumping, dead and hurt images into the imageCache.
     * It then applies gravity to the object and starts the animation.
     * Finally it calls the getRealFrame method to set the real frame of the object.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.getRealFrame();
    }

    /**
     * Calculates the real frame of the Character object.
     *
     * The real frame is the area of the object that is actually visible on the screen.
     * It is calculated by adding the offset values to the x and y coordinates, and
     * subtracting the offset values from the width and height of the object.
     * The offset values are the distances from the edges of the object's bounding box
     * to the edges of the object itself.
     */
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        if (this.y != 70) {
            this.rY = this.y + this.offset.top;
        }
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }
    //#region animate
    /**
     * Animates the character based on keyboard input and state.
     *
     * This method uses setInterval to continuously update the character's position
     * and animation based on the keyboard input. The character can move right or left
     * and jump if the corresponding keys are pressed. The camera position is adjusted
     * as the character moves.
     *
     * Additionally, the character's animation is updated based on their current state:
     * - If the character is dead, the `IMAGES_DEAD` animation is played.
     * - If the character is hurt, the `IMAGES_HURT` animation is played.
     * - If the character is in the air (jumping), the `IMAGES_JUMPING` animation is played.
     * - If the character is on the ground and moving, the `IMAGES_WALKING` animation is played.
     */

    animate() {
        setInterval(() => {
            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true; //* Wenn Pepe rückwärts läuft, dann wird sein Charakter gespiegelt
            }
            //* Wenn der Charakter NICHT auf dem Boden ist, dann springt er
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                // Dead Animation
                this.playAnimation(this.IMAGES_DEAD);
                // Hurt Animation
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                // Jump Animation
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk Animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 20);
    }
    //#endregion
    // jump() {
    //     this.speedY = 30;
    // }
}
