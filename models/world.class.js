// #region class World

/**
 * Represents the game world, including game logic, rendering, and collision detection.
 */

class World {
    // #region Properties
    character = new Character();
    hp_bar = new HpBar();
    salsa_bar = new Salsa_Bar();
    coin_bar = new coin_bar();
    boss_bar = new Endbossbar();
    level = new Level();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    sperre = true;
    check = false;

    // #endregion

    /**
 * Initializes the world with rendering context and input controls.
 * @param {HTMLCanvasElement} canvas - The canvas element used for drawing.
 * @param {Keyboard} keyboard - The keyboard input handler.
 */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        Intervalhub.startInterval(this.checkAllCollisions, 1000 / 60);
    }

    // #region Setup & Rendering

    /** Renders the entire game scene and HUD */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(Math.floor(this.camera_x), 0);
        this.drawLevelImages();
        this.addToMap(this.character);
        this.ctx.translate(-Math.floor(this.camera_x), 0);
        this.drawHUD();
        requestAnimationFrame(() => this.draw());
    }
    

    /** Links objects within the world */
    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
    }

    /**
 * Plays a sound using the centralized AudioHub.
 * @param {string} audioPath - Path to the audio file
 */
    playSound(audioPath) {
        AudioHub.playSound(audioPath);
    }

    chickenSound(enemy){
        if (enemy instanceof SmallChicken) {
            AudioHub.playChickenSound('dead_small');
        } else {
            AudioHub.playChickenSound('dead');
        }
    }

    // #endregion

    // #region Collision

    /**
 * Centralized collision check for optimized performance.
 */
    checkAllCollisions = () => {
        this.checkCharacterCollisions();
        this.checkThrowableCollisions(); 
        this.checkCollectibleCollisions();
    };

    /**
 * Checks all collisions involving the character.
 */
    checkCharacterCollisions() {
        this.jumpCollision();
        this.enemyToCharacterCollision();
        this.checkThrowableObjects();
        this.removeDisappearedBottles();
        this.walkingEndboss();
        setTimeout(() => {
            this.character.protection = false;
        }, 200);
        this.gameOver();
        this.gameWon();
    }

    /**
 * Checks collisions involving thrown objects.
 */
    checkThrowableCollisions() {
        this.checkThrowableCollision();
    }

    /**
 * Checks collisions with collectible objects.
 */
    checkCollectibleCollisions() {
        this.checkCollisionSalsa();
        this.checkCollisionCoin();
    }

    checkCollisionSalsa = () => {
        for (let i = this.level.salsa.length - 1; i >= 0; i--) {
            const s = this.level.salsa[i];
            if (this.salsa_bar.percentage !== 100 && this.character.isColliding(s)) {
                this.level.salsa.splice(i, 1);
                this.salsa_bar.setPercentage(this.salsa_bar.percentage + 20);
                AudioHub.playCollectibleSound('bottle');
            }
        }
    };

    checkCollisionCoin = () => {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const s = this.level.coins[i];
            if (this.coin_bar.percentage !== 100 && this.character.isColliding(s)) {
                this.level.coins.splice(i, 1);
                this.coin_bar.setPercentage(this.coin_bar.percentage + 6.25);
                AudioHub.playCollectibleSound('coin');
            }
        }
    };

    // #endregion

    jumpCollision() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            const chicken = this.level.enemies[i];
            if (!chicken.chickenIsDead && this.character.isAboveGround() && this.character.isColliding(chicken) && this.character.speedY < 0) {
                chicken.chickenIsDead = true;
                this.character.speedY = 15;
                this.character.protection = true;
                this.level.enemies.splice(i, 1);
                this.level.deadEnemies.push(chicken);
                AudioHub.playChickenSound('dead');
                setTimeout(() => {
                    const index = this.level.deadEnemies.indexOf(chicken);
                    if (index !== -1) this.level.deadEnemies.splice(index, 1);
                }, 1000);
            }
        }
    }

    enemyToCharacterCollision() {
        if (!this.character.protection) {
            this.level.enemies.forEach((enemie) => {
                if (enemie instanceof Endboss && this.character.isColliding(enemie)) {
                    enemie.attackAnimation();
                    this.character.hit();
                    this.hp_bar.setPercentage(this.character.energy);
                } else if (this.character.isColliding(enemie)) {
                    this.character.hit();
                    this.hp_bar.setPercentage(this.character.energy);
                }
            });
        }
    }

    checkThrowableObjects() {
        if (this.keyboard.F && this.sperre && this.salsa_bar.percentage !== 0) {
            this.sperre = false;
            this.generateNewThrowableSalsa();
        }
    }

    generateNewThrowableSalsa() {
        let bottle = new throwableSalsa(this.character.x + 80, this.character.y + 120, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.salsa_bar.setPercentage(this.salsa_bar.percentage - 20);
        setTimeout(() => {
            const index = this.throwableObjects.indexOf(bottle);
            if (index !== -1) this.throwableObjects.splice(index, 1);
        }, 4000);
    }

  /**
 * Removes bottles that are marked to disappear.
 */
    removeDisappearedBottles() {
        this.throwableObjects = this.throwableObjects.filter(bottle => !bottle.shouldDisappear);
    }

    checkThrowableCollision() {
        this.throwableObjects.forEach((salsa) => {
            for (let i = this.level.enemies.length - 1; i >= 0; i--) {
                const enemy = this.level.enemies[i];
                if (!enemy.isHit && (enemy instanceof Chicken || enemy instanceof SmallChicken) && salsa.isColliding(enemy)) {
                    enemy.hp -= 10;
                    this.killNormalEnemies(enemy, salsa, i);
                } else if (!enemy.isHit && enemy instanceof Endboss && salsa.isColliding(enemy) && !salsa.gotHit) {
                    enemy.hp -= 20;
                    this.killNormalEnemies(enemy, salsa, i);
                    this.boss_bar.setPercentage(enemy.hp);
                }
            }
        });
    }

    walkingEndboss() {
        const boss = this.level.endboss;
        if (this.character.x > 1800) {

            if (!this.check) {
                AudioHub.playEndbossSound('approachEndboss');
            }
            this.check = true;
            this.addToMap(this.boss_bar);
        }
        if (this.check && boss.hp > 0 && boss.x > 300) {
            boss.x -= 3;
            boss.playerIsNear = true;
        }
        if (boss.hp <= 0 || boss.x <= 300) {
            boss.playerIsNear = false;
        }
    }

    killNormalEnemies(enemy, salsa, index) {
        enemy.isHit = true;
        salsa.hit(); 
        if (enemy.hp <= 0) {
            enemy.chickenIsDead = true;
            this.level.enemies.splice(index, 1);
            this.level.deadEnemies.push(enemy);
            this.chickenSound(this.enemy)
            setTimeout(() => {
                const idx = this.level.deadEnemies.indexOf(enemy);
                if (idx !== -1) this.level.deadEnemies.splice(idx, 1);
            }, 2000);
        } else {
            setTimeout(() => {
                enemy.isHit = false;
            }, 2000);
        }
    }

    // #region Drawing

    drawLevelImages() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsa);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.deadEnemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    drawHUD() {
        this.addToMap(this.hp_bar);
        this.addToMap(this.salsa_bar);
        this.addToMap(this.coin_bar);
        if (this.check) {
            this.addToMap(this.boss_bar);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);

        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    gameOver() {
        if (this.character.energy <= 0) {
 
            window.stopAllSounds();
            

            setTimeout(() => {
                AudioHub.playGameEndSound('gameOver');
            }, 100);
            
            Intervalhub.stopAllintervals();
            document.querySelector(".loose-screen").classList.remove("d_none");
        }
    }

    gameWon() {
        if (this.level.endboss.hp <= 0) {
   
            window.stopAllSounds();
            

            setTimeout(() => {
                AudioHub.playGameEndSound('victory');
            }, 100);
            
            setTimeout(() => {
                Intervalhub.stopAllintervals();
                document.querySelector(".win-screen").classList.remove("d_none");
            }, 2000);
        }
    }

    // #endregion
}

// #endregion
