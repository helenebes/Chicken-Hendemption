var Enemies = function (game, path, IndexEnemy, wave)
{
	this.indexEnemy = IndexEnemy;
    this.game = game;
	this.enemy = game.add.sprite(path[0].x * this.game.TileSize, path[0].y * this.game.TileSize, 'dog', 0.5);
	console.log("Creation basic enemy (dog)");
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
		this.wave.add(this.enemy);
	},
	setSprite: function() {
		this.enemy.inputEnabled = true;
		this.enemy.x = this.enemy.path[0].x * this.game.TileSize + 30;
		this.enemy.y = this.enemy.path[0].y * this.game.TileSize;
		this.enemy.next_positX = this.enemy.path[1].x * this.game.TileSize + 30;
		this.enemy.next_positY = this.enemy.path[1].y * this.game.TileSize;
		console.log(this.enemy.x - this.enemy.next_positX);
		this.enemy.nextTile = 1;
		this.enemy.toTheEnd = false;
	}	
};

var Mummy = function (game, path, IndexEnemy, wave)
{
	this.indexEnemy = IndexEnemy;
    this.game = game;
	this.enemy = game.add.sprite(path[0].x*game.TileSize, path[0].y*game.TileSize, 'mummy', 1);
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
	this.wave.add(this.enemy);
};

var Lagarto = function (game, path, IndexEnemy, wave)
{
	this.indexEnemy = IndexEnemy;
    this.game = game;
	this.enemy = game.add.sprite(path[0].x*game.TileSize, path[0].y*game.TileSize, 'lagarto', 1.5);
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
	this.wave.add(this.enemy);
};

var Wave = function(game, releaseTime, path, nb_enemies)  
{

		this.waveEnemy = game.add.group();
		this.path = path;
		this.game = game;
		this.nbEnemiesEachWave = nb_enemies;
		this.nbEnemiesCreated = 0;
		this.releaseTime = releaseTime;
		console.log(this.releaseTime);
		this.firstEnemyCreate = false;
		this.lastMove = 0;
}
Wave.prototype = 
{

	setWave: function() {
		this.firstEnemyCreate = true;
        var typeEnemy = this.game.listTypeEnemy[parseInt(Math.random() * this.game.listTypeEnemy.length)];
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
		var delayBeforeNewEnemy = 200;
		if (this.game.time.now >= this.releaseTime && this.nbEnemiesCreated < this.nbEnemiesEachWave) {
			this.setWave();
			this.releaseTime = this.game.time.now + delayBeforeNewEnemy;
		}
		if (this.firstEnemyCreate) {
			if (this.game.time.now > this.lastMove + 500) {
				this.lastMove = this.game.time.now;
				this.waveEnemy.forEachAlive(function(enemy) {
					if (!enemy.toTheEnd) {
						//console.log("last position:("+enemy.x+","+enemy.y+")");
						//console.log("new position:("+enemy.next_positX+","+enemy.next_positY+")");
						//console.log("angle : "+enemy.angle);
						enemy.y = enemy.next_positY;
						enemy.x = enemy.next_positX;
						if (enemy.nextTile < enemy.path.length - 1) {
							enemy.nextTile++;						
							if (enemy.nextTile < 7 || enemy.nextTile > 32 || (enemy.nextTile > 20 && enemy.nextTile < 25)){
								enemy.next_positX = enemy.path[enemy.nextTile].x * 64 + 30;
								enemy.next_positY = enemy.path[enemy.nextTile].y * 64;
							} else if (enemy.nextTile === 25){
								enemy.next_positX = enemy.path[enemy.nextTile].x * 64 + 30;
								enemy.next_positY = enemy.path[enemy.nextTile].y * 64 - 30;
							} else {
								enemy.next_positX = enemy.path[enemy.nextTile].x * 64;
								enemy.next_positY = enemy.path[enemy.nextTile].y * 64 - 30;
							}
							// Checking if there is a change of direction left/right
							if (enemy.next_positY/64 > enemy.y) {
								enemy.angle = 0;
							} else if (enemy.next_positY/64 < enemy.y) {
								enemy.angle = 180;
							} 
							// Checking if there is a change of direction up/down
							if (enemy.next_positX/64 > enemy.x) {
								enemy.angle = -90;
							} else if (enemy.next_positX/64 < enemy.x) {
								enemy.angle = 90;
							}
						} else {
							enemy.toTheEnd = true;
						}
					}
				});
			}
		}
	},

};



