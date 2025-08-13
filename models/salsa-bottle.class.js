//#region class SalsaBottle

/**
 * Represents a consumable salsa bottle placed on the ground,
 * which can be collected by the player.
 */
class SalsaBottle extends ConsumeableObject {
    //#region Properties

    y = 340;
    offset = {
        top: 12,
        right: 14,
        bottom: 10,
        left: 20,
    };

    //#endregion

    /**
     * Creates a new SalsaBottle at the given X position with a random image.
     * @param {number} x - The horizontal starting position
     */
    constructor(x) {
        super();

        Intervalhub.startInterval(this.getRealFrame, 1000 / 60);

        const random_i = Math.floor(Math.random() * ImageHub.salsa.on_ground.length);
        const random_img = ImageHub.salsa.on_ground[random_i];
        this.loadImage(random_img);

        this.x = x;
    }
}

//#endregion