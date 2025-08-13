// #region class Chicken

/**
 * Enemy chicken character that moves randomly to the left.
 * Reacts to collisions and can die.
 */
class Chicken extends MoveableObject {
    // #region Properties

    hp = 10;
    isHit = false;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    // #endregion

    // #region Constructor

    /**
     * Creates a new normal chicken with random position and movement.
     */
    constructor() {
        super();
        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);
        this.loadImages(ImageHub.chicken_normal.walk);
        this.loadImage(ImageHub.chicken_normal.walk[0]);
        this.x = 300 + Math.random() * 1000;
        this.speed = 0.3 + Math.random() * 1;
        Intervalhub.startInterval(this.animate, 1000 / 5);
        if (this.hp > 0) {
            Intervalhub.startInterval(this.moveLeft, 1000 / 60);
        }
    }

    // #endregion

    // #region Methods

    /**
     * Executes the walking animation or displays the death image.
     */
    animate = () => {
        if (!this.chickenIsDead) {
            this.playAnimation(ImageHub.chicken_normal.walk);
        } else {
            this.loadImage(ImageHub.chicken_normal.dead[0]);
        }
    };

    /**
     * Loads the first image of the normal chicken.
     */
    loadImageChicken() {
        this.loadImage(ImageHub.chicken_normal.walk[0]);
    }

    // #endregion
}

// #endregion

// #region class SmallChicken

/**
 * Enemy mini-chicken character, a smaller variant of the normal chicken.
 */
class SmallChicken extends MoveableObject {
    // #region Properties

    hp = 10;
    isHit = false;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    // #endregion

    // #region Constructor

    /**
     * Creates a new small chicken with random position and movement.
     */
    constructor() {
        super();
        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);
        this.loadImages(ImageHub.chicken_small.walk);
        this.loadImage(ImageHub.chicken_small.walk[0]);
        this.x = 300 + Math.random() * 1000;
        this.speed = 0.3 + Math.random() * 1;
        Intervalhub.startInterval(this.animate, 1000 / 5);
        if (this.hp > 0) {
            Intervalhub.startInterval(this.moveLeft, 1000 / 60);
        }
    }

    // #endregion

    // #region Methods

    /**
     * Executes the walking animation or displays the death image.
     */
    animate = () => {
        if (!this.chickenIsDead) {
            this.playAnimation(ImageHub.chicken_small.walk);
        } else {
            this.loadImage(ImageHub.chicken_small.dead[0]);
        }
    };

    /**
     * Loads the first image of the small chicken.
     */
    loadImageChicken() {
        this.loadImage(ImageHub.chicken_small.walk[0]);
    }

    // #endregion
}

// #endregion