// #region class Endboss

/**
 * Represents the end boss in the game.
 * Uses animations, hit states, and attack behavior.
 */
class Endboss extends MoveableObject {
    // #region Properties

    hp = 50;
    isHit = false;
    canAttack = true;
    isAttacking = false;
    offset = {
        top: 70,
        right: 15,
        bottom: 20,
        left: 15,
    };
    height = 400;
    width = 250;
    y = 40;
    x = 2300;
    hurtTimeoutRunning = false;
    soundCooldowns = {
        hurt: false,
        attack: false,
        dead: false,
        approach: false
    };

    // #endregion

    /**
     * Creates a new end boss and starts animation and collision frame calculation.
     */
    constructor() {
        super();
        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);
        Intervalhub.startInterval(() => this.animate(), 1000 / 5);
        this.loadEndbossImages();
    }

    // #region Initialization

    /**
     * Loads all required images for the end boss (animations & states).
     */
    loadEndbossImages() {
        this.loadImage(ImageHub.chicken_boss.attack[0]);
        this.loadImage(ImageHub.chicken_boss.alert[0]);
        this.loadImage(ImageHub.chicken_boss.hurt[0]);
        this.loadImage(ImageHub.chicken_boss.dead[0]);
        this.loadImage(ImageHub.chicken_boss.walk[0]);

        this.loadImages(ImageHub.chicken_boss.alert);
        this.loadImages(ImageHub.chicken_boss.hurt);
        this.loadImages(ImageHub.chicken_boss.dead);
        this.loadImages(ImageHub.chicken_boss.attack);
        this.loadImages(ImageHub.chicken_boss.walk);
    }

    // #endregion

    // #region Animation & Behavior

    /**
     * Selects the appropriate animation based on the current state and plays sounds.
     */
    animate() {
        if (this.hp <= 0) {
            this.isHit = false;
            this.handleDeadAnimation();
        } else if (this.isHit) {
            this.handleHurtAnimation();
        } else if (this.isAttacking) {
            this.handleAttackAnimation();
        } else if (this.playerIsNear) {
            this.handleWalkAnimation();
        } else {
            this.handleAlertAnimation();
        }
    }

    /**
     * Handles the death animation and corresponding sound.
     */
    handleDeadAnimation() {
        this.playAnimation(ImageHub.chicken_boss.dead);
        if (!this.soundCooldowns.dead) {
            this.playEndbossSound('dead');
            this.soundCooldowns.dead = true;
        }
        if (!this.isDead) {
            this.isDead = true;
        }
    }

    /**
     * Handles the hurt animation and corresponding sound.
     */
    handleHurtAnimation() {
        if (!this.hurtTimeoutRunning) {
            this.playAnimation(ImageHub.chicken_boss.hurt);
            this.hurtTimeoutRunning = true;

            if (!this.soundCooldowns.hurt) {
                this.playEndbossSound('hurt');
                this.soundCooldowns.hurt = true;
                setTimeout(() => {
                    this.soundCooldowns.hurt = false;
                }, 1000);
            }

            setTimeout(() => {
                this.isHit = false;
                this.hurtTimeoutRunning = false;
            }, 300);
        }
    }

    /**
     * Handles the attack animation.
     */
    handleAttackAnimation() {
        this.playAnimation(ImageHub.chicken_boss.attack);
    }

    /**
     * Handles the walk animation.
     */
    handleWalkAnimation() {
        this.playAnimation(ImageHub.chicken_boss.walk);
    }

    /**
     * Handles the alert animation.
     */
    handleAlertAnimation() {
        this.playAnimation(ImageHub.chicken_boss.alert);
    }

    // #endregion

    // #region Sound Management

    /**
     * Plays end boss sounds via the central AudioHub.
     * @param {string} soundType - Type of sound (dead, hurt, attack, approachEndboss)
     */
    playEndbossSound(soundType) {
        AudioHub.playEndbossSound(soundType);
    }

    // #endregion

    // #region Attack

    /**
     * Executes the attack animation and activates cooldowns.
     */
    attackAnimation() {
        if (!this.isAttacking && this.canAttack) {
            this.isAttacking = true;
            this.canAttack = false;

            if (!this.soundCooldowns.attack) {
                this.playEndbossSound('attack');
                this.soundCooldowns.attack = true;
                setTimeout(() => {
                    this.soundCooldowns.attack = false;
                }, 1000);
            }

            setTimeout(() => {
                this.isAttacking = false;
            }, 500);

            setTimeout(() => {
                this.canAttack = true;
            }, 500);
        }
    }

    // #endregion
}

// #endregion