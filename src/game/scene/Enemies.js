var Enemies = function (game, path, IndexEnemy, wave)
{
	this.indexEnemy = IndexEnemy;
    this.game = game;
	this.enemy = game.add.sprite(path[0].x * 64, path[0].y * 64, 'dog', 0.5);
	//console.log("Creation basic enemy (dog)");
	this.enemy.path = path;
	this.wave = wave;
	this.setSprite();
	this.setAnim();

}


Enemies.prototype =
{
	setAnim: function() {
		this.enemy.scale.set(1.5);
    	this.anim = this.enemy.animations.add('walk', [3,4,5]);
    	this.enemy.play('walk',5, true);
		this.enemy.speed = 1;
		moveEnemy.prototype.nextTile(this.enemy);
		this.wave.add(this.enemy);
	},
	setSprite: function() {
		this.enemy.inputEnabled = true;
		this.enemy.x = this.enemy.path[0].x * 64;
		this.enemy.y = this.enemy.path[0].y * 64;
		this.enemy.nextTile = 0;
		this.enemy.toTheEnd = false;
	}	
};

var Mummy = function (game, path, IndexEnemy, wave)
{
	this.indexEnemy = IndexEnemy;
    this.game = game;
	this.enemy = game.add.sprite(path[0].x*64, path[0].y*64, 'mummy', 1);
	console.log("Creation mummy");
	this.enemy.path = path;
	this.wave = wave;
	this.setSprite();
	this.setAnim();
}

Mummy.prototype = Object.create(Enemies.prototype);
Mummy.prototype.setAnim = function()
{
    this.enemy.scale.set(1.5);
    var anim = this.enemy.animations.add('walk');
    this.enemy.play('walk', 10, true);
	this.enemy.speed = 1;
	moveEnemy.prototype.nextTile(this.enemy);
	this.wave.add(this.enemy);
};

var Lagarto = function (game, path, IndexEnemy, wave)
{
	this.indexEnemy = IndexEnemy;
    this.game = game;
	this.enemy = game.add.sprite(path[0].x*64, path[0].y*64, 'lagarto', 1.5);
	console.log("Creation lagarto");
	this.enemy.path = path;
	this.wave = wave;
	this.setSprite();
	this.setAnim();
}

Lagarto.prototype = Object.create(Enemies.prototype);
Lagarto.prototype.setAnim = function()
{
    this.enemy.scale.set(1.5);
    this.anim = this.enemy.animations.add('walk', [3,4,5]);
    this.enemy.play('walk',5, true);
	this.enemy.speed = 4;
	moveEnemy.prototype.nextTile(this.enemy);
	this.wave.add(this.enemy);
};

var Wave = function(game, releaseTime, path, infoWaves)  
{

		this.waveEnemy = game.add.group();
		this.path = path;
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
		var typeEnemy = 'dog';
        //var typeEnemy = this.infoWaves.typeEnemy[parseInt(Math.random() * this.infoWaves.typeEnemy.length)];
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
		}	
		console.log("Create Enemy: "+typeEnemy);
		this.nbEnemiesCreated++;           
	},
	move: function() {
		var delayBeforeNewEnemy = 5000;
		if (this.game.time.now >= this.releaseTime + delayBeforeNewEnemy && this.nbEnemiesCreated < this.infoWaves.nbEnemyByWave) {
			this.setWave();
			this.releaseTime = this.game.time.now;
		}
		if (this.firstEnemyCreate) {
			if (this.game.time.now > this.lastMove) {
				this.lastMove = this.game.time.now;
				this.waveEnemy.forEachAlive(function(enemy) {
					moveEnemy.prototype.moveOnTile(enemy);
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
		enemy.y += enemy.speedY;
		enemy.x += enemy.speedX;
		//console.log("last position ("+enemy.x + enemy.y+ ")");
		//console.log("new position ("+enemy.nextTileX + enemy.nextTileX+ ")");
		if (enemy.speedX > 0 && enemy.x >= enemy.nextTileX) {
			enemy.x = enemy.nextTileX;
			this.nextTile(enemy);
		}
		else if (enemy.speedX < 0 && enemy.x <= enemy.nextTileX) {
			enemy.x = enemy.nextTileX;
			this.nextTile(enemy);
		}
		else if (enemy.speedY > 0 && enemy.y >= enemy.nextTileY) {
			enemy.y = enemy.nextTileY;
			this.nextTile(enemy);
		}
		else if (enemy.speedY < 0 && enemy.y <= enemy.nextTileY) {
			enemy.y = enemy.nextTileY;
			this.nextTile(enemy);
		}
	},
	nextTile: function(enemy){
		if (enemy.nextTile < enemy.path.length - 1) {
			enemy.nextTile++;
			enemy.nextTileX = enemy.path[enemy.nextTile].x * 64;
			enemy.nextTileY = enemy.path[enemy.nextTile].y * 64;

			//console.log("last position ("+enemy.x +", "+ enemy.y+ ")");
			//console.log("new position ("+enemy.nextTileX +", "+ enemy.nextTileX+ ")");

			// Checking if there is a change of direction left/right
			if (enemy.nextTileY > enemy.y) {
				enemy.angle = -90;
				enemy.speedY = enemy.speed;
			} else if (enemy.nextTileY < enemy.y) {
				enemy.angle = 90;
				enemy.speedY = -enemy.speed;
			} else {
				enemy.speedY = 0;
			}

			// Checking if there is a change of direction up/down
			if (enemy.nextTileX > enemy.x) {
				enemy.angle = 180;
				enemy.speedX = enemy.speed;
			} else if (enemy.nextTileX < enemy.x) {
				enemy.angle = 0;
				enemy.speedX = -enemy.speed;
			} else {
				enemy.speedX = 0;
			}
		} else {
			enemy.toTheEnd = true;
		}
	}

};



