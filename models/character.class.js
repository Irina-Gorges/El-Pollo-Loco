class Character extends MovableObject {
    //#region Properties
    speed = 5;
    width = 130;
    height = 260;

    rX;
    rY;
    rW;
    rH;

    offset = {
        top: 100,
        right: 30,
        bottom: 10,
        left: 32,
    };

    IMAGES_WALKING = ImageHub.character.IMAGES_WALKING;
    IMAGES_JUMPING = ImageHub.character.IMAGES_JUMPING;
    IMAGES_DEAD = ImageHub.character.IMAGES_DEAD;
    IMAGES_HURT = ImageHub.character.IMAGES_HURT;
    IMAGES_IDLE = ImageHub.character.IMAGES_IDLE;
    IMAGES_LONGIDLE = ImageHub.character.IMAGES_LONGIDLE;

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
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        this.animatSpeedRef();
        this.getRealFrame();
    }

    animatSpeedRef() {
        let result = IntervalHub.startInterval(this.animate, 1000 / 20);
        if (!this.isDead()) {
            result = IntervalHub.startInterval(this.animate, 1000 / 20);
        }
        return result;
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

    animate = () => {
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
        this.world.camera_x = -this.x + 100; //* Wo zu Beginn Pepe steht

        if (this.isDead()) {
            // Dead Animation
            this.playAnimation(this.IMAGES_DEAD) +
                IntervalHub.stopAllIntervals();
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
    };
    //#endregion
}
