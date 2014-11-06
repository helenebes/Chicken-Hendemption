var Level = function(game) 
{
	this.game = game;
	this.wave;
	this.setLevel();
	this.setConfigLevel();
}

Level.prototype = 
{

	setLevel: function() {
		this.level = 1;		
	},

	setConfigLevel: function(){
		switch(this.level)
		{
			case 1:
				console.log("level 1");
				this.path = [{x: 19,y: 0}, {x: 19,y: 1}, {x: 19,y: 2}, {x: 19,y: 3}, {x: 19,y: 4}, {x: 19,y: 5}, {x: 19,y: 6}, {x: 19,y: 7}, {x: 18,y: 7},
{x: 17,y: 7}, {x: 16,y: 7}, {x: 15,y: 7}, {x: 14,y: 7}, {x: 13,y: 7}, {x: 12,y: 7}, {x: 11,y: 7}, {x: 10,y: 7}, {x: 9,y: 7}, {x: 8,y: 7}, {x: 7,y: 7}, {x: 6,y: 7}, {x: 5,y: 7}, 
{x: 5,y: 8}, {x: 5,y: 9}, {x: 5,y: 10}, {x: 5,y: 11}, 
{x: 6,y: 11}, {x: 7,y: 11}, {x: 8,y: 11}, {x: 9,y: 11}, {x: 10,y: 11}, {x: 11,y: 11}, {x: 12,y: 11}, {x: 13,y: 11},
 {x: 13,y: 12}, {x: 13,y: 13}, {x: 13,y: 14}];
				this.infoWaves = [{'timeBetweenTwo': 100}, {'nbEnemyByWave': 3}, {'nbWaves': 4}, {'typeEnemy': ['dog', 'mummy', 'lagarto']}];
				break;
			case 2:
				console.log("level 2");
				this.path = this.path_lv2;
				break;
			case 3:
				this.path = this.path_lv3;
				break;
		}
	},
	setWave: function() {
		this.wave = new Wave(this.game, this.game.time.now + 10, this.path, 1);
	},
	nextLevel: function() {
		this.level++;
		this.setConfigLevel();
	}

};





