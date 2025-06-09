class Endboss extends MovableObject {
    //#region Attributes
    height = 400;
    width = 320;
    y = 60;
    energy = 10;

    offset = {
        top: 65,
        right: 5,
        bottom: 20,
        left: 5,
    };
    lastHit = 0;
    triggered = false;
    isAttacking = false;

    IMAGES_WALKING = ImageHub.endboss.IMAGES_WALKING;
    IMAGES_ALERT = ImageHub.endboss.IMAGES_ALERT;
    IMAGES_ATTACK = ImageHub.endboss.IMAGES_ATTACK;
    IMAGES_HURT = ImageHub.endboss.IMAGES_HURT;
    IMAGES_DEAD = ImageHub.endboss.IMAGES_DEAD;

    AUDIO_ENDBOSS_DIE = AudioHub.endbossSounds.AUDIO_ENDBOSS_DIE;
    AUDIO_ENDBOSS_ = AudioHub.endbossSounds.AUDIO_ENDBOSS;
    AUDIO_ENDBOSS_AGGRO = AudioHub.endbossSounds.AUDIO_ENDBOSS_AGGRO;
    AUDIO_ENDBOSS_WALK = AudioHub.endbossSounds.AUDIO_ENDBOSS_WALK;
    //#endregion

    //#region constructor
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        IntervalHub.startInterval(this.animate, 1000 / 25);
        this.getRealFrame();
    }
    //#endregion

    //#region Methods

    animate = () => {
        if (this.triggered && !this.isDead()) {
            this.moveLeft();
        }
        if (this.isDead() && !gameover) {
            this.playAnimation(this.IMAGES_DEAD);
            this.AUDIO_ENDBOSS_DIE.play();
            winOverlay();
            gameover = true;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.AUDIO_ENDBOSS_AGGRO.play();
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.AUDIO_ENDBOSS_AGGRO.play();
        } else if (this.triggered) {
            this.playAnimation(this.IMAGES_WALKING);
            this.AUDIO_ENDBOSS_WALK.play();
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
    };

    //#endregion
}
