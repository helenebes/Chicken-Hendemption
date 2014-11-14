var Enemies = function (game, path, IndexEnemy, wave)
{
    this.game = game;
    this.gameContext = this.game.state.getCurrentState();
    this.enemy = game.add.sprite(path[0].x * 64, path[0].y * 64, 'dog');
    this.enemy.path = path;
    this.enemy.indexEnemy = IndexEnemy;
    this.wave = wave;
    this.setSprite();
    this.setAnim();
    this.setCentre();
    this.cost = 5;
}


Enemies.prototype =
{
    setCentre: function(){
        this.enemy.offsetCentreX = 32;
        this.enemy.offsetCentreY = 32;
        this.enemy.centrex = this.enemy.x + this.enemy.offsetCentreX;
        this.enemy.centrey = this.enemy.y + this.enemy.offsetCentreY;
    },
    setAnim: function() {
        this.enemy.scale.set(1.5);
        this.enemy.animations.add('walk down', [0,1,2]);
        this.enemy.animations.add('walk left', [3,4,5]);
        this.enemy.animations.add('walk right', [6,7,8]);
        this.enemy.animations.add('walk up', [9,10,11]);
        this.enemy.play('walk down',2, true);
        this.enemy.speed = 5;
        this.enemy.oldSpeed = this.enemy.speed;
        this.enemy.offsetX = -30;
        this.enemy.offsetY = -30;
        this.enemy.x = this.enemy.path[0].x * 64 + this.enemy.offsetX;
        this.enemy.y = this.enemy.path[0].y * 64 + this.enemy.offsetY;
        this.enemy.health = 100;
        this.enemy.damageToEggs = 10;
        this.enemy.attackSpeed = 15;
        moveEnemy.prototype.nextTile(this.enemy);
        this.wave.add(this.enemy);
    },
    setSprite: function() {
        this.lastAttackCoop = 0;
        this.enemy.inputEnabled = true;
        this.enemy.input.enableDrag();
        this.enemy.nextTile = 0;
        this.enemy.alive;
        this.enemy.toTheEnd = false;
    },
    damageSpeed: function(damageSpeed){
        this.enemy.speed -= damageSpeed;
    },
    isAttacked: function(damage) {
                this.enemy.health -= damage;
                if (this.enemy.health <= 0) {
                    this.gameContext.cornCounter+=this.cost;
                    this.enemy.kill();
                }
     },
    attackCoop: function(coop){
        if (this.enemy.toTheEnd) {
            if (this.game.time.now > this.lastAttackCoop*10/this.enemy.attackSpeed) {
                //console.log(this.enemy.key);
                this.lastAttackCoop = this.game.time.now;
                this.game.currentEggHealth -= this.enemy.damageToEggs;
                if (this.game.currentEggHealth <= 0) {
                    this.game.currentEggHealth = 100;
                    coop.removeEgg();
                }
            }
        }
    },
    update: function(coop){
        if (coop.eggCounter > 0) {
            this.attackCoop(coop);
        }
    }    
};

var Mummy = function (game, path, IndexEnemy, wave)
{
    this.game = game;
    this.gameContext = this.game.state.getCurrentState();
    this.enemy = game.add.sprite(path[0].x*64, path[0].y*64, 'mummy');
    console.log("Creation mummy");
    this.enemy.path = path;
    this.enemy.indexEnemy = IndexEnemy;
    this.wave = wave;
    this.setSprite();
    this.setAnim();
    this.setCentre();
    this.cost = 10;
}

Mummy.prototype = Object.create(Enemies.prototype);
Mummy.prototype.setAnim = function()
{
    this.enemy.scale.set(1.5);
    var anim = this.enemy.animations.add('walk');
    this.enemy.play('walk', 10, true);
    this.enemy.speed = 20;
    this.enemy.oldSpeed = this.enemy.speed;
    this.enemy.offsetX = 30;
    this.enemy.offsetY = 30;
    this.enemy.x = this.enemy.path[0].x * 64 + this.enemy.offsetX;
    this.enemy.y = this.enemy.path[0].y * 64 + this.enemy.offsetY;
    this.enemy.health = 200;
    this.enemy.damageToEggs = 5;
    this.enemy.attackSpeed = 15;
    moveEnemy.prototype.nextTile(this.enemy);
    this.wave.add(this.enemy);
};

var Lagarto = function (game, path, IndexEnemy, wave)
{
    this.game = game;
    this.gameContext = this.game.state.getCurrentState();
    this.enemy = game.add.sprite(path[0].x*64, path[0].y*64, 'lagarto');
    this.enemy.path = path;
    this.enemy.indexEnemy = IndexEnemy;
    this.wave = wave;
    this.setSprite();
    this.setAnim();
    this.setCentre();
    this.cost = 2;
}

Lagarto.prototype = Object.create(Enemies.prototype);
Lagarto.prototype.setAnim = function()
{
    this.enemy.scale.set(1.5);
    this.enemy.animations.add('walk down', [0,1,2]);
    this.enemy.animations.add('walk left', [3,4,5]);
    this.enemy.animations.add('walk right', [6,7,8]);
    this.enemy.animations.add('walk up', [9,10,11]);
    this.enemy.play('walk down', 1, true);
    this.enemy.speed = 65;
    this.enemy.oldSpeed = this.enemy.speed;
    this.enemy.offsetX = -30;
    this.enemy.offsetY = -40;
    this.enemy.x = this.enemy.path[0].x * 64 + this.enemy.offsetX;
    this.enemy.y = this.enemy.path[0].y * 64 + this.enemy.offsetY;
    this.enemy.health = 30;
    this.enemy.damageToEggs = 2;
    this.enemy.attackSpeed = 25;
    moveEnemy.prototype.nextTile(this.enemy);
    this.wave.add(this.enemy);
};

var Snake = function (game, path, IndexEnemy, wave)
{
    this.game = game;
    this.gameContext = this.game.state.getCurrentState();
    this.enemy = game.add.sprite(path[0].x*64, path[0].y*64, 'snake');
    this.enemy.path = path;
    this.enemy.indexEnemy = IndexEnemy;
    this.wave = wave;
    this.setSprite();
    this.setAnim();
    this.setCentre();
    this.cost = 4;
}

Snake.prototype = Object.create(Enemies.prototype);
Snake.prototype.setAnim = function()
{
    this.enemy.scale.set(1);
    this.enemy.animations.add('walk down', [0,1,2]);
    this.enemy.animations.add('walk left', [3,4,5]);
    this.enemy.animations.add('walk right', [6,7,8]);
    this.enemy.animations.add('walk up', [9,10,11]);
    this.enemy.play('walk down',1, true);
    this.enemy.speed = 20;
    this.enemy.oldSpeed = this.enemy.speed;
    this.enemy.offsetX = -30;
    this.enemy.offsetY = -30;
    this.enemy.x = this.enemy.path[0].x * 64 + this.enemy.offsetX;
    this.enemy.y = this.enemy.path[0].y * 64 + this.enemy.offsetY;
    this.enemy.health = 50;
    this.enemy.damageToEggs = 2;
    this.enemy.attackSpeed = 25;
    moveEnemy.prototype.nextTile(this.enemy);
    this.wave.add(this.enemy);
};

var Turtle = function (game, path, IndexEnemy, wave)
{
    this.game = game;
    this.gameContext = this.game.state.getCurrentState();
    this.enemy = game.add.sprite(path[0].x*64, path[0].y*64, 'turtle');
    this.enemy.path = path;
    this.enemy.indexEnemy = IndexEnemy;
    this.wave = wave;
    this.setSprite();
    this.setAnim();
    this.setCentre();
    this.cost = 6;
}

Turtle.prototype = Object.create(Enemies.prototype);
Turtle.prototype.setAnim = function()
{
    this.enemy.scale.set(0.7);
    this.enemy.animations.add('walk down', [0,1,2,3]);
    this.enemy.animations.add('walk left', [4,5,6,7]);
    this.enemy.animations.add('walk right', [8,9,10,11]);
    this.enemy.animations.add('walk up', [12,13,14,15]);
    this.enemy.play('walk down',3, true);
    this.enemy.speed = 7;
    this.enemy.oldSpeed = this.enemy.speed;
    this.enemy.offsetX = -30;
    this.enemy.offsetY = -30;
    this.enemy.x = this.enemy.path[0].x * 64 + this.enemy.offsetX;
    this.enemy.y = this.enemy.path[0].y * 64 + this.enemy.offsetY;
    this.enemy.damageReduction = 10;
    this.enemy.health = 700;
    this.enemy.damageToEggs = 30;
    this.enemy.attackSpeed = 1;
    moveEnemy.prototype.nextTile(this.enemy);
    this.wave.add(this.enemy);
};

var Wave = function(game, releaseTime, path, infoWaves, numeroWave)  
{

        this.waveEnemy = game.add.group();
        this.nbEnemyKilled = 0;
        this.path = path;
		this.numeroWave = numeroWave;
        this.game = game;
        this.infoWaves = infoWaves;
        this.nbEnemiesCreated = 0;
        this.releaseTime = releaseTime;
        this.firstEnemyCreate = false;
        this.lastMove = 0;
        this.setWave();
}
Wave.prototype = 
{

    setWave: function() {
        this.firstEnemyCreate = true;
        //var typeEnemy = 'lagarto';
        var typeEnemy = this.infoWaves.enemy[this.nbEnemiesCreated].type;
		//console.log(this.infoWaves.enemy[this.nbEnemiesCreated].type);
		//console.log(this.infoWaves.enemy[this.nbEnemiesCreated].timeToNextEn);
        switch (typeEnemy)
        {
            case 'dog':
                this.game.enemies[this.game.enemies.length] = new Enemies(this.game, this.path, this.game.enemies.length, this.waveEnemy);
                break;
            case 'mummy':
                this.game.enemies[this.game.enemies.length] = new Mummy(this.game, this.path, this.game.enemies.length, this.waveEnemy);
                break;
            case 'lagarto':
                this.game.enemies[this.game.enemies.length] = new Lagarto(this.game, this.path, this.game.enemies.length, this.waveEnemy);
                break;
            case 'turtle':
                this.game.enemies[this.game.enemies.length] = new Turtle(this.game, this.path, this.game.enemies.length, this.waveEnemy);
                break;
            case 'snake':
                this.game.enemies[this.game.enemies.length] = new Snake(this.game, this.path, this.game.enemies.length, this.waveEnemy);
                break;
        }    
        this.nbEnemiesCreated++;           
    },
    move: function() {
        if (this.nbEnemiesCreated < this.infoWaves.enemy.length) {
		    if (this.game.time.now >= this.releaseTime + this.infoWaves.enemy[this.nbEnemiesCreated].timeToNextEn) {
		        this.setWave();
			}
        }
        if (this.firstEnemyCreate) {
            while (this.waveEnemy.countDead() > 0) {
                var toKill = this.waveEnemy.getFirstDead();
                this.game.enemies[this.game.enemies.length-1].enemy.indexEnemy = toKill.indexEnemy;
                this.game.enemies[toKill.indexEnemy] = this.game.enemies[this.game.enemies.length-1];
                this.game.enemies.pop();
                this.waveEnemy.remove(toKill);
                this.nbEnemyKilled++;
            }
            if (this.game.time.now > this.lastMove) {
                this.lastMove = this.game.time.now;
                this.waveEnemy.forEachAlive(function(enemy) {
                    if (!enemy.toTheEnd){
                        moveEnemy.prototype.moveOnTile(enemy);
                    }
                });
            }
        }
    },

};

var moveEnemy = function(enemy){
    this.enemy = enemy
}
moveEnemy.prototype =
{
    moveOnTile: function(enemy){

        /*if (enemy.nextTile === 15) {
            enemy.health = 10;
            enemy.isAttacked(10);
            console.log("enemy dead !!");
        }*/

        if (enemy.speedX < 0 && enemy.x <= enemy.nextTileX || enemy.speedX > 0 && enemy.x >= enemy.nextTileX) {
            enemy.x = enemy.nextTileX;
            enemy.centrex = enemy.x + enemy.offsetCentreX;
            this.nextTile(enemy);
        }
        else if (enemy.speedY > 0 && enemy.y >= enemy.nextTileY || enemy.speedY < 0 && enemy.y <= enemy.nextTileY) {
            enemy.y = enemy.nextTileY;
            enemy.centrey = enemy.y + enemy.offsetCentreY;
            this.nextTile(enemy);
        }
        enemy.y += enemy.speedY/10;
        enemy.x += enemy.speedX/10;
        enemy.centrex = enemy.x + enemy.offsetCentreX;
        enemy.centrey = enemy.y + enemy.offsetCentreY;
    },
    nextTile: function(enemy){
        if (enemy.nextTile < enemy.path.length - 1) {
            enemy.nextTile++;
            enemy.nextTileX = enemy.path[enemy.nextTile].x * 64 + enemy.offsetX;
            enemy.nextTileY = enemy.path[enemy.nextTile].y * 64 + enemy.offsetX;

            // Checking if there is a change of direction left/right
            if (enemy.nextTileY > enemy.y) {
                if (enemy.key === "mummy") {
                    enemy.angle = -90;
                } else {
                    enemy.play('walk down',2, true);
                }
                enemy.speedY = enemy.speed;
            } else if (enemy.nextTileY < enemy.y) {
                if (enemy.key === "mummy") {
                    enemy.angle = 90;
                } else {
                    enemy.play('walk up',2, true);
                }
                enemy.speedY = -enemy.speed;
            } else {
                enemy.speedY = 0;
            }

            // Checking if there is a change of direction up/down
            if (enemy.nextTileX > enemy.x) {
                if (enemy.key === "mummy") {
                    enemy.angle = 180;
                } else {
                    enemy.play('walk right',2, true);
                }
                enemy.speedX = enemy.speed;
            } else if (enemy.nextTileX < enemy.x) {
                if (enemy.key === "mummy") {
                    enemy.angle = 0;
                } else {
                    enemy.play('walk left',2, true);
                }
                enemy.speedX = -enemy.speed;
            } else {
                enemy.speedX = 0;
            }
        } else {
            console.log("to the end");
            enemy.toTheEnd = true;
        }
    }

};




