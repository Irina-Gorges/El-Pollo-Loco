class Character extends MovableObject {
    //#region Attributes
    speed = 5;
    height = 260;
    width = 130;
    y = 175;
    

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
    IMAGES_LONG_IDLE = ImageHub.character.IMAGES_LONG_IDLE;

    AUDIO_COLLECTCOINS = AudioHub.coinSounds.AUDIO_COLLECTCOINS;
    AUDIO_COLLECTBOTTLE = AudioHub.bottleSounds.AUDIO_COLLECTBOTTLE;

    AUDIO_CHARACTER_DIE = AudioHub.characterSounds.AUDIO_CHARACTER_DIE;
    AUDIO_CHARACTER_HURT = AudioHub.characterSounds.AUDIO_CHARACTER_HURT;
    AUDIO_CHARACTER_JUMP = AudioHub.characterSounds.AUDIO_CHARACTER_JUMP;
    AUDIO_CHARACTER_RUN = AudioHub.characterSounds.AUDIO_CHARACTER_RUN;
    AUDIO_CHARACTER_SNORING = AudioHub.characterSounds.AUDIO_CHARACTER_SNORING;

    world;
    coins = 0;
    bottles = 0;
    //#endregion

    //#region Constructor
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
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        IntervalHub.startInterval(this.applyGravity, 1000 / 60);
        this.animatSpeedRef();
        this.getRealFrame();
        this.lastMoveTime = new Date().getTime();
        this.idleStartTime = null;
        this.IDLE_THRESHOLD = 15000; // 15 sek bis LONG_IDLE
        this.isThrowing = false;
        this.throwStartTime = null;
        this.throwDuration = 30; // ms
    }
    //#endregion

    //#region Methods

    /**
     * Increases the number of collected coins by 1.
     * The maximum amount is limited to 100.
     */
    collectCoin() {
        this.coins += 1; // Oder den Wert, den ein Coin geben soll
        if (this.coins > 100) {
            // Maximalwert für Coins
            this.coins = 100;
        }
        if (this.AUDIO_COLLECTCOINS) {
            this.AUDIO_COLLECTCOINS.currentTime = 0;
            this.AUDIO_COLLECTCOINS.play().catch(console.warn);
        }
    }

    /**
     * Increases the number of collected bottles by 1.
     * The maximum amount is limited to 5.
     */
    collectBottle() {
        this.bottles += 1; // Oder den Wert, den eine Bottle geben soll
        if (this.bottles > 5) {
            // Maximalwert für Bottles
            this.bottles = 5;
        }
        if (this.AUDIO_COLLECTBOTTLE) {
            this.AUDIO_COLLECTBOTTLE.currentTime = 0;
            this.AUDIO_COLLECTBOTTLE.play().catch(console.warn);
        }
    }

    /**
     * Decreases the number of bottles by 1 if at least one is available.
     */
    decreaseBottle() {
        if (this.bottles > 0) {
            this.bottles--;
        }
    }

    /**
     * Starts the animation speed using intervals.
     * If the object is not "dead", the animation is restarted.
     *
     * @returns {number} - The ID of the started interval.
     */

    animatSpeedRef() {
        let result = IntervalHub.startInterval(this.animate, 1000 / 20);
        if (!this.isDead()) {
            result = IntervalHub.startInterval(this.animate, 1000 / 20);
        }
        return result;
    }

    /**
     * Updates the movement and animation of the player character based on input and state.
     * Moves the character, adjusts the camera, and plays the appropriate animation (running, jumping, idle, etc.).
     */
    //#region Animate
    animate = () => {
        const currentTime = new Date().getTime();

        if (
            this.isThrowing &&
            currentTime - this.throwStartTime > this.throwDuration
        ) {
            this.isThrowing = false;
        }

        if (
            this.world.keyboard.RIGHT &&
            this.x < this.world.level.level_end_x
        ) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMoveTime = currentTime;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMoveTime = currentTime;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastMoveTime = currentTime;
        }

        this.world.camera_x = -this.x + 100;

        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.AUDIO_CHARACTER_DIE.play().catch(console.warn);
            IntervalHub.stopAllIntervals();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.AUDIO_CHARACTER_HURT.play().catch(console.warn);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.AUDIO_CHARACTER_JUMP.play().catch(console.warn);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.animationFrameRate = 5;
            this.playAnimation(this.IMAGES_WALKING);
            this.AUDIO_CHARACTER_RUN.play().catch(console.warn);
            if (!this.moveRight || !this.moveLeft) {
                this.AUDIO_CHARACTER_RUN.stop();
            }
        } else {
            const idleDuration = currentTime - this.lastMoveTime;
            if (idleDuration > this.IDLE_THRESHOLD) {
                this.animationFrameRate = 5; // normal
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.AUDIO_CHARACTER_SNORING.play().catch(console.warn);
            } else {
                this.animationFrameRate = 10; // slower
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    };
    //#endregion
    //#endregion
}
