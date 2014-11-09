var Level = function(state, level) 
{
	this.state = state;
	this.game = state.game;
	this.waves = [];
	this.infoWaves = [];
	this.level = level;
	this.setConfigLevel();
	this.setCoopLocation();
	this.loadLevel();
	this.setFirstWave(this.game.time.now);
}

Level.prototype = 
{
	setFirstWave: function(time){
		console.log("first Wave created");
		console.log(this.infoWaves.nbEnemyByWave);
		this.waves[0] = new Wave(this.game, time + 100, this.path, this.infoWaves);
		this.timeBeginLastWave = time + 100;
	},
	setCoopLocation: function() {
		this.coopLocation = {x: this.path[this.path.length-1].x, y: this.path[this.path.length-1].y};
	},
	setConfigLevel: function(){
		switch(this.level)
		{
			case 1:
				console.log("level 1");
				this.path = [{x: 19,y: 0}, {x: 19,y: 1}, {x: 19,y: 2}, {x: 19,y: 3}, {x: 19,y: 4}, {x: 19,y: 5}, {x: 19,y: 6}, {x: 18,y: 7},
{x: 17,y: 7}, {x: 16,y: 7}, {x: 15,y: 7}, {x: 14,y: 7}, {x: 13,y: 7}, {x: 12,y: 7}, {x: 11,y: 7}, {x: 10,y: 7}, {x: 9,y: 7}, {x: 8,y: 7}, {x: 7,y: 7}, {x: 6,y: 7}, {x: 5,y: 7}, 
{x: 5,y: 8}, {x: 5,y: 9}, {x: 5,y: 10}, {x: 5,y: 11}, {x: 6,y: 11}, {x: 7,y: 11}, {x: 8,y: 11}, {x: 9,y: 11}, {x: 10,y: 11}, {x: 11,y: 11},  {x: 12,y: 11}, {x: 12,y: 12}, {x: 12,y: 13}, {x: 12,y: 14}];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.infoWaves = {"timeBetweenTwo": 50000, "nbEnemyByWave": 2, "nbWaves": 3, "typeEnemy": ['snake', 'turtle', 'lagarto']};
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.map = 'lvl1';
				break;
			case 2:
				console.log("level 2");
				this.path = [{x: 4,y: 0}, {x: 4,y: 13}, {x: 5,y: 13}, {x: 10,y: 13}, {x: 10,y: 10}, {x: 9,y: 10}, {x: 8,y: 9}, {x: 8,y: 1}, {x: 9,y: 1}, {x: 16,y: 1}, {x: 16,y: 3}, {x: 11,y: 3}, {x: 11,y: 4}, {x: 11,y: 6}, {x: 21,y: 6}];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.infoWaves = {"timeBetweenTwo": 45000, "nbEnemyByWave": 3, "nbWaves": 4, "typeEnemy": ['snake', 'turtle', 'lagarto']};
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.map = 'lvl2';
				break;
			case 3:
				this.path = [{x: 4,y: 0}, {x: 19,y: 1}, {x: 19,y: 2}, {x: 19,y: 3}, {x: 19,y: 4}, {x: 19,y: 5}, {x: 19,y: 6}, {x: 18,y: 7},
{x: 17,y: 7}, {x: 16,y: 7}, {x: 15,y: 7}, {x: 14,y: 7}, {x: 13,y: 7}, {x: 12,y: 7}, {x: 11,y: 7}, {x: 10,y: 7}, {x: 9,y: 7}, {x: 8,y: 7}, {x: 7,y: 7}, {x: 6,y: 7}, {x: 5,y: 7}, 
{x: 5,y: 8}, {x: 5,y: 9}, {x: 5,y: 10}, {x: 5,y: 11}, {x: 6,y: 11}, {x: 7,y: 11}, {x: 8,y: 11}, {x: 9,y: 11}, {x: 10,y: 11}, {x: 11,y: 11},  {x: 12,y: 11}, {x: 12,y: 12}, {x: 12,y: 13}, {x: 12,y: 14}];
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.infoWaves = {"timeBetweenTwo": 40000, "nbEnemyByWave": 4, "nbWaves": 5, "typeEnemy": ['snake', 'turtle', 'lagarto']};
				this.initialEggs = 10;
				this.initialCorn = 200;
				this.map = 'lvl3';
				break;
		}
	},
	updateLevel: function() {
		//console.log(this.game.time.now- this.timeBeginLastWave - this.infoWaves.timeBetweenTwo );
		if (this.game.time.now >= this.timeBeginLastWave + this.infoWaves.timeBetweenTwo && this.waves.length < this.infoWaves.nbWaves && this.state.coop.eggCounter > 0){
			console.log("create new wave");
			this.waves[this.waves.length] = new Wave(this.game, this.game.time.now, this.path, this.infoWaves);
			this.timeBeginLastWave = this.game.time.now;
		}
		for(var iLevel = 0; iLevel < this.waves.length; iLevel++){
			this.waves[iLevel].move();
		}
	},
	loadLevel: function()
    {
        var bg = this.state.add.sprite(0,0,'grass');
        var map = this.state.add.tilemap(this.map+'_map');
        map.addTilesetImage('tileset');
        var layer = map.createLayer('layer1');
		//var layer = map.createLayer('layer'+this.level);
        layer.resizeWorld();
        this.state.coop = new Coop(this.coopLocation.x, this.coopLocation.y,10, this.state);
    },
	reloadLevel: function()
    {
        this.state.state.start('Game');

    },
};
