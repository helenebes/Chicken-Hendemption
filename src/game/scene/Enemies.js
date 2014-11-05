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
	this.enemy.followingPath = wayToGo;
	this.enemy.type_enemy = typeEnemy;
	listOfEnemies.add(this.enemy);
	this.enemy.listOfEnemies = listOfEnemies;

}


Enemies.prototype =
{
	nextTile: function(enemy) {
		//console.log("remove of the group "+this.listOfEnemiestest);
		//console.log("remove of the group "+this.listOfEnemies);
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
		} 
	},

	moveOnStep: function(enemy) {
		console.log("last position:("+enemy.x+","+enemy.y+")");
		console.log("new position:("+enemy.next_positX+","+enemy.next_positY+")");
		//console.log("angle : "+enemy.angle);
		enemy.y = enemy.next_positY;
		enemy.x = enemy.next_positX;
		if (enemy.x === 810 && enemy.y === 720) {
					enemy.listOfEnemies.remove(enemy);
					enemy.destroy();
		}
        this.nextTile(enemy);
	},
};
