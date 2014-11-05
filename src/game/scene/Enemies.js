var Enemies = function (typeEnemy, enemyMoves, enemyLength, enemyScale, enemyFrame, game, wayToGo, listOfEnemies)
{
	this.enemy = game.add.sprite(wayToGo[0].x, wayToGo[0].y, typeEnemy);
	console.log("Creation "+ typeEnemy + " x= " + wayToGo[0].x + " and y= " + wayToGo[0].y);
	this.enemy.scale.set(enemyScale);
	for(var i_parcoursMoves = 0; i_parcoursMoves < enemyMoves.length; i_parcoursMoves++) {
		if (enemyMoves[i_parcoursMoves].frame != []) {
			this.anim = this.enemy.animations.add(enemyMoves[i_parcoursMoves].type);
			console.log('create animation '+ enemyMoves[i_parcoursMoves].type);
		} else {
			this.anim = this.enemy.animations.add(enemyMoves[i_parcoursMoves].type, enemyMoves[i_parcoursMoves].frame);
			console.log('create animation '+ enemyMoves[i_parcoursMoves].type + enemyMoves[i_parcoursMoves].frame);
		}
	}
	this.enemy.animations.play(enemyMoves.type, enemyLength, true);
	this.enemy.x = wayToGo[0].x;
	this.enemy.y = wayToGo[0].y;
	this.enemy.next_positX;
	this.enemy.next_positY;
	this.enemy.curTile = 0;
	// The enemies are moving too fast but modifing the speed does not change
	this.enemy.speed = 1;
	this.enemy.followingPath = wayToGo;
	this.enemy.type_enemy = typeEnemy;
	listOfEnemies.add(this.enemy);
	this.enemy.listOfEnemies = listOfEnemies;
	this.nextTile(this.enemy);

}


Enemies.prototype =
{
	nextTile: function(enemy) {
		if (enemy.curTile < enemy.followingPath.length - 1) {
			enemy.curTile++;
			enemy.next_positX = enemy.followingPath[enemy.curTile].x;
			enemy.next_positY = enemy.followingPath[enemy.curTile].y;

			// Checking if there is a change of direction left/right
			if (enemy.next_positY > enemy.y) {
				enemy.angle = 0;
			} else if (enemy.next_positY < enemy.y) {
				enemy.angle = 180;
			} 
			// Checking if there is a change of direction up/down
			if (enemy.next_positX > enemy.x) {
				enemy.angle = -90;
			} else if (enemy.next_positX < enemy.x) {
				enemy.angle = 90;
			}
		} else {
			enemy.kill();
		}
	},

	moveOnStep: function(enemy) {
		//console.log("last position:("+enemy.x+","+enemy.y+")");
		//console.log("new position:("+enemy.next_positX+","+enemy.next_positY+")");
		//console.log("angle : "+enemy.angle);
		enemy.y = enemy.next_positY;
		enemy.x = enemy.next_positX;
        	this.nextTile(enemy);
	},
	
};

var Wave = function(level, game, releaseTime, listEnemy, pathToGo, nb_enemies)  
{

		this.waveEnemy = game.add.group();
		this.waveEnemy.enableBody = true;
		this.waveEnemy.physicsBodyType = Phaser.Physics.ARCADE;
		this.chemin = pathToGo;
		this.game = game;
		this.nb_enemies = nb_enemies;
		this.nb_enemies_created = 0;
		this.releaseTime = releaseTime;
		this.listEnemy = listEnemy;
		this.firstEnemyCreate = false;
}
Wave.prototype = 
{

	setWave: function() {
		this.firstEnemyCreate = true;
        	var typeEnemy = this.listEnemy[parseInt(Math.random() * this.listEnemy.length)];
        	new Enemies(typeEnemy.nome, typeEnemy.moves, typeEnemy.length, typeEnemy.scale, typeEnemy.frame, this.game, this.chemin, this.waveEnemy);
		console.log("Create Enemy: "+typeEnemy.nome);
		this.nb_enemies_created++;           
	},
	move: function() {
		var delayBeforeNewEnemy = 200;
		if (this.game.time.now >= this.releaseTime && this.nb_enemies_created < this.nb_enemies) {
			console.log("creat new ennemy");
			this.setWave();
			this.releaseTime = this.game.time.now + delayBeforeNewEnemy;
		}
		if (this.firstEnemyCreate) {
			if (this.waveEnemy.countDead() === this.nb_enemies) {
				this.waveEnemy.destroy();
				console.log("destruction of the wave");
			}
			this.waveEnemy.forEachAlive(function(ennemy) {
		      		Enemies.prototype.moveOnStep(ennemy);
			});
		}
	},

};



