class Level {
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss(),
    ];
    clouds = [new Cloud(), new Cloud(), new Cloud()];
    coin = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
    bottlesOG = [
        new SalsaBottles(),
        new SalsaBottles(),
        new SalsaBottles(),
        new SalsaBottles(),
        new SalsaBottles(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject(
            'img/5_background/layers/3_third_layer/2.png',
            -719
        ),
        new BackgroundObject(
            'img/5_background/layers/2_second_layer/2.png',
            -719
        ),
        new BackgroundObject(
            'img/5_background/layers/1_first_layer/2.png',
            -719
        ),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject(
            'img/5_background/layers/3_third_layer/2.png',
            719
        ),
        new BackgroundObject(
            'img/5_background/layers/2_second_layer/2.png',
            719
        ),
        new BackgroundObject(
            'img/5_background/layers/1_first_layer/2.png',
            719
        ),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject(
            'img/5_background/layers/3_third_layer/1.png',
            719 * 2
        ),
        new BackgroundObject(
            'img/5_background/layers/2_second_layer/1.png',
            719 * 2
        ),
        new BackgroundObject(
            'img/5_background/layers/1_first_layer/1.png',
            719 * 2
        ),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject(
            'img/5_background/layers/3_third_layer/2.png',
            719 * 3
        ),
        new BackgroundObject(
            'img/5_background/layers/2_second_layer/2.png',
            719 * 3
        ),
        new BackgroundObject(
            'img/5_background/layers/1_first_layer/2.png',
            719 * 3
        ),
    ];

    level_end_x = 2250;
}
