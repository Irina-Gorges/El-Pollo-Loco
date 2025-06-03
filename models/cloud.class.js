class Cloud extends MovableObject {
    //#region Attributes
    y = 30;
    width = 550;
    height = 300;

    IMAGES_CLOUDS = ImageHub.clouds.IMAGES_CLOUDS;
    //#endregion

    //#region Constructor
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.getRandom1Or2();
        this.x = this.x + Math.random() * 2200;
        IntervalHub.startInterval(this.animate, 1000 / 40);
    }
    //#endregion

    //#region Methods
    getRandom1Or2() {
        let result;
        result = Math.random() < 0.5 ? 0 : 1;
        return result;
    }

    animate = () => {
        this.moveLeft();
    };
    //#endregion
}
