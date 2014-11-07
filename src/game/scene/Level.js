var Level = function(game) 
{
	this.game = game;
	this.waves = [];
	this.initialEggs = 10;
	this.initialCorn = 200;
	this.map = 'lvl1';
	this.path = [{x: 19,y: 0}, {x: 19,y: 1}, {x: 19,y: 2}, {x: 19,y: 3}, {x: 19,y: 4}, {x: 19,y: 5}, {x: 19,y: 6}, {x: 18,y: 7},
{x: 17,y: 7}, {x: 16,y: 7}, {x: 15,y: 7}, {x: 14,y: 7}, {x: 13,y: 7}, {x: 12,y: 7}, {x: 11,y: 7}, {x: 10,y: 7}, {x: 9,y: 7}, {x: 8,y: 7}, {x: 7,y: 7}, {x: 6,y: 7}, {x: 5,y: 7}, 
{x: 5,y: 8}, {x: 5,y: 9}, {x: 5,y: 10}, {x: 5,y: 11}, {x: 6,y: 11}, {x: 7,y: 11}, {x: 8,y: 11}, {x: 9,y: 11}, {x: 10,y: 11}, {x: 11,y: 11},  {x: 12,y: 11}, {x: 12,y: 12},  {x: 13,y: 12}, {x: 13,y: 13}, {x: 13,y: 14}];
	this.infoWaves = {"timeBetweenTwo": 50000, "nbEnemyByWave": 2, "nbWaves": 1, "typeEnemy": ['dog', 'mummy', 'lagarto']};
	this.setCoopLocalisation();
	this.setLevel();
	this.setFirstWave();
}

Level.prototype = 
{
	setLevel: function() {
		this.level = 1;	
	},
	setFirstWave: function(){
		console.log("first Wave created");
		this.waves[0] = new Wave(this.game, this.game.time.now + 1000, this.path, this.infoWaves);
		this.timeBeginLastWave = this.game.time.now + 1000;
	},
	setCoopLocalisation: function() {
		this.coopLocalisation = {x: this.path[this.path.length-1].x, y: this.path[this.path.length-1].y};
	},
	setConfigLevel: function(){
		switch(this.level)
		{
			case 2:
				console.log("level 2");
				this.path = [];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.infoWaves = [{'timeBetweenTwo': 300}, {'nbEnemyByWave': 4}, {'nbWaves': 5}, {'typeEnemy': ['dog', 'mummy', 'lagarto', 'turtle', 'snake']}];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.map = 'lvl2';
				break;
			case 3:
				this.path = [];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.infoWaves = [{'timeBetweenTwo': 300}, {'nbEnemyByWave': 4}, {'nbWaves': 5}, {'typeEnemy': ['dog', 'mummy', 'lagarto', 'turtle', 'snake']}];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.map = 'lvl3';
				break;
		}
	},
	updateLevel: function() {
		//console.log(this.game.time.now- this.timeBeginLastWave - this.infoWaves.timeBetweenTwo );
		if (this.game.time.now >= this.timeBeginLastWave + this.infoWaves.timeBetweenTwo && this.waves.length < this.infoWaves.nbWaves){
			console.log("create new wave");
			this.waves[this.waves.length] = new Wave(this.game, this.game.time.now, this.path, this.infoWaves);
			this.timeBeginLastWave = this.game.time.now;
		}
		for(var iLevel = 0; iLevel < this.waves.length; iLevel++){
			this.waves[iLevel].move();
		}
	},
	nextLevel: function() {
		this.level++;
		this.setConfigLevel();
		this.setCoopLocalisation();
		this.setFirstWave();		
	},

};





