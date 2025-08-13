//#region class Statusbar

/**
 * A generic status bar (e.g. for health, coins, salsa),
 * which displays an appropriate image based on a percentage value.
 */
class Statusbar extends DrawableObject {
    //#region Properties

    width = 150;
    height = 42;
    percentage = 100;

    //#endregion

    /**
     * Creates a new instance of the Statusbar.
     */
    constructor() {
        super();
    }

    /**
     * Returns the image index corresponding to the current percentage.
     * @returns {number} Index of the image to display (0–5)
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }
}

//#endregion