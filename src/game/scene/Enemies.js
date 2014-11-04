var Enemies = function (xEnemy, yEnemy, typeEnemy, enemyMoves, enemyLength, enemyScale, enemyFrame, game)
{
	this.enemy = game.add.sprite(xEnemy, yEnemy, typeEnemy.name, enemyFrame);
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
	this.x_enemy = xEnemy;
	this.y_enemy = yEnemy;
	this.type_enemy = typeEnemy;
}


Enemies.prototype =
{
	
};