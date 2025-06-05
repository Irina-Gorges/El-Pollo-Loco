class Cloud extends MovableObject {
    //#region Attributes
    y = 30;
    width = 550;
    height = 300;

    IMAGES_CLOUDS = ImageHub.clouds.IMAGES_CLOUDS;
    //#endregion

    //#region Constructor
    /**
     * Creates a new instance of the cloud background layer.
     * Loads the initial cloud image and additional cloud images.
     * Sets a random horizontal starting position.
     * Starts the animation interval for moving the cloud.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.getRandom1Or2();
        this.x = this.x + Math.random() * 2200;
        IntervalHub.startInterval(this.animate, 1000 / 40);
    }
    //#endregion

    //#region Methods
    /**
     * Returns either 0 or 1 randomly with equal probability.
     * @returns {number} Either 0 or 1.
     */
    getRandom1Or2() {
        let result;
        result = Math.random() < 0.5 ? 0 : 1;
        return result;
    }

    /**
     * Animates the cloud by moving it to the left.
     * This method is called repeatedly at a fixed interval.
     */
    animate = () => {
        this.moveLeft();
    };
    //#endregion
}
