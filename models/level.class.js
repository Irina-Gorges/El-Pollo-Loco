//#region class Level

/**
 * Represents a complete level including enemies, objects, background layers, and collectible items.
 * 
 * This class encapsulates all components that make up a playable level,
 * such as the endboss, active enemies, background visuals, and interactive elements.
 * It serves as the central structure for managing level-specific data and behavior.
 */
class Level {
    //#region Properties

    level_end_x = 2200;
    deadEnemies = [];

    endboss = new Endboss();

    enemies = [new SmallChicken(), new Chicken(), new SmallChicken(), new Chicken(), new SmallChicken(), new Chicken(), new Chicken(), this.endboss];

    clouds = [new Cloud()];
    
    backgroundObjects = [
        new BackgroundObject(`img/5_background/layers/air.png`, -719),
        new BackgroundObject(`img/5_background/layers/3_third_layer/2.png`, -719),
        new BackgroundObject(`img/5_background/layers/2_second_layer/2.png`, -719),
        new BackgroundObject(`img/5_background/layers/1_first_layer/2.png`, -719),

        new BackgroundObject(`img/5_background/layers/air.png`, 0),
        new BackgroundObject(`img/5_background/layers/3_third_layer/1.png`, 0),
        new BackgroundObject(`img/5_background/layers/2_second_layer/1.png`, 0),
        new BackgroundObject(`img/5_background/layers/1_first_layer/1.png`, 0),

        new BackgroundObject(`img/5_background/layers/air.png`, 719),
        new BackgroundObject(`img/5_background/layers/3_third_layer/2.png`, 719),
        new BackgroundObject(`img/5_background/layers/2_second_layer/2.png`, 719),
        new BackgroundObject(`img/5_background/layers/1_first_layer/2.png`, 719),

        new BackgroundObject(`img/5_background/layers/air.png`, 719 * 2),
        new BackgroundObject(`img/5_background/layers/3_third_layer/1.png`, 719 * 2),
        new BackgroundObject(`img/5_background/layers/2_second_layer/1.png`, 719 * 2),
        new BackgroundObject(`img/5_background/layers/1_first_layer/1.png`, 719 * 2),

        new BackgroundObject(`img/5_background/layers/air.png`, 719 * 3),
        new BackgroundObject(`img/5_background/layers/3_third_layer/2.png`, 719 * 3),
        new BackgroundObject(`img/5_background/layers/2_second_layer/2.png`, 719 * 3),
        new BackgroundObject(`img/5_background/layers/1_first_layer/2.png`, 719 * 3),
    ];

    coins = [...Coin.multipleCoins(200), ...Coin.multipleCoins(900)];
    salsa = [
        new SalsaBottle(100),
        new SalsaBottle(200),
        new SalsaBottle(400),
        new SalsaBottle(700),
        new SalsaBottle(900),
        new SalsaBottle(1100),
        new SalsaBottle(1400),
        new SalsaBottle(1700),
        new SalsaBottle(2000),
    ];

    //#endregion
}

//#endregion