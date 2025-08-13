// #region class Character

/**
 * Main character of the game (Pepe), controllable via keyboard.
 * Reacts to environment, collisions, and user actions.
 */
class Character extends MoveableObject {
    // #region Properties

    x = 0;
    y = 170;
    height = 250;
    width = 150;
    speed = 4.5;
    idleTime = new Date().getTime();
    world;
    protection = false;
    soundCooldowns = {
        dead: false,
        jump: false,
        hurt: false,
        run: false,
        snoring: false
    };
    currentRunSound = null;
    offset = {
        top: 110,
        right: 45,
        bottom: 10,
        left: 30,
    };

    // #endregion

    // #region Constructor

    /**
     * Creates a new Character instance with all animations and starts movement/gravity.
     */
    constructor() {
        super();
        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);
        this.loadImage(ImageHub.mainCharacter.idle[0]);
        this.loadImagesFromMainChar();
        Intervalhub.startInterval(this.applyGravity, 1000 / 40);
        Intervalhub.startInterval(this.animate, 1000 / 6);
        Intervalhub.startInterval(this.leftAndRightAnimation, 1000 / 60);
    }

    // #endregion

    // #region Methods

    /**
     * Plays the appropriate animation depending on the character's state (running, jumping, hurt, dead, idle).
     */
    animate = () => {
        if (this.isDead()) {
            this.handleDeadAnimation();
        } else if (this.isHurtAnimation()) {
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleJumpAnimation();
        } else if (this.world && this.world.keyboard && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.handleWalkAnimation();
        } else {
            this.handleIdleAnimation();
        }
    };

    /**
     * Handles the death animation and corresponding sound.
     */
    handleDeadAnimation() {
        this.playAnimation(ImageHub.mainCharacter.dead);
        if (!this.soundCooldowns.dead && this.world) {
            AudioHub.playCharacterSound('dead');
            this.soundCooldowns.dead = true;
        }
    }

    /**
     * Safely stops the currently playing run sound.
     */
    stopRunSound() {
        if (this.currentRunSound) {
            try {
                this.currentRunSound.pause();
                this.currentRunSound.currentTime = 0;
            } catch (error) {
                // Ignore errors when stopping sound
            }
            this.currentRunSound = null;
        }
    }

    /**
     * Handles the hurt animation and corresponding sound.
     */
    handleHurtAnimation() {
        this.playAnimation(ImageHub.mainCharacter.hurt);
        this.stopRunSound();     
        this.soundCooldowns.snoring = false;
        if (!this.soundCooldowns.hurt && this.world) {
            AudioHub.playCharacterSound('damage');
            this.soundCooldowns.hurt = true;
            setTimeout(() => {
                this.soundCooldowns.hurt = false;
            }, 1000);
        }
        this.updateActivity();
    }

    /**
     * Handles the jump animation and corresponding sound.
     */
    handleJumpAnimation() {
        this.playAnimation(ImageHub.mainCharacter.jump);
        this.stopRunSound();       
        this.soundCooldowns.snoring = false;      
        this.updateActivity();
    }

    /**
     * Handles the walk animation and corresponding sound.
     */
    handleWalkAnimation() {
        this.playAnimation(ImageHub.mainCharacter.walk);
        
        this.soundCooldowns.snoring = false;
        
        // Only start run sound if it's not already playing
        if (!this.currentRunSound && this.world) {
            this.currentRunSound = AudioHub.createCharacterRunSound();
            this.currentRunSound.play().catch(error => {
                if (error.name !== 'AbortError') {
                    // console.log("Run sound could not be played:", error);
                }
            });
        }
        
        this.updateActivity();
    }

    /**
     * Handles idle animations (normal and long).
     */
    handleIdleAnimation() {
        this.stopRunSound();  
        if (this.isLongIdle()) {
            this.playAnimation(ImageHub.mainCharacter.long_idle);
            if (!this.soundCooldowns.snoring && this.world) {
                AudioHub.playCharacterSound('snoring');
                this.soundCooldowns.snoring = true;
                setTimeout(() => {
                    this.soundCooldowns.snoring = false;
                }, 3000); 
            }
        } else {
            this.playAnimation(ImageHub.mainCharacter.idle);
            this.soundCooldowns.snoring = false;
        }
    }

    /**
     * Responds to key presses (move left/right or jump).
     * Updates camera position.
     */
    leftAndRightAnimation = () => {
        if (this.world && this.world.keyboard) {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }
            if (this.world.keyboard.SPACEBAR && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }
    };

    /**
     * Loads all animation images for the character.
     */
    loadImagesFromMainChar() {
        this.loadImages(ImageHub.mainCharacter.walk);
        this.loadImages(ImageHub.mainCharacter.jump);
        this.loadImages(ImageHub.mainCharacter.hurt);
        this.loadImages(ImageHub.mainCharacter.dead);
        this.loadImages(ImageHub.mainCharacter.idle);
        this.loadImages(ImageHub.mainCharacter.long_idle);
    }

    /**
     * Overrides the jump() method to include jump sound.
     */
    jump = () => {
        if (!this.soundCooldowns.jump && this.world) {
            AudioHub.playCharacterSound('jump');
            this.soundCooldowns.jump = true;
            setTimeout(() => {
                this.soundCooldowns.jump = false;
            }, 1000); // Longer cooldown to prevent repeated sound
        }
        this.speedY = 30;
    }
    // #endregion
}

// #endregion