var Level = function(state, level) 
{
    this.state = state;
    this.game = state.game;
    this.victory = false;
    this.waves = [];
    this.infoWaves = [];
    this.level = level;
    this.setConfigLevel();
    this.setCoopLocation();
    this.loadLevel();
}

Level.prototype = 
{
    setFirstWave: function(time)
    {
        this.waves[0] = new Wave(this.game, time + 100, this.path, this.infoWaves.Wave[0], this.waves.length);
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
                this.infoWaves = {"timeBetweenTwo": 10000, "Wave":[
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2}, 
																	{'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001},  {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, {'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]}
															]};
                this.initialEggs = 10;
                this.initialEggs = 10;
                this.initialCorn = 200;
                this.map = 'lvl1';
                for(var i =0;i<8;i++)
                {
                    this.state.map.forbidTile(18,i);
                    this.state.map.forbidTile(19,i);
                }
                for(var i =4;i<18;i++)
                {
                    this.state.map.forbidTile(i,6);
                    this.state.map.forbidTile(i,7);
                }
                for(var i =0;i<8;i++)
                {
                    this.state.map.forbidTile(18,i);
                    this.state.map.forbidTile(19,i);
                }
                this.state.map.forbidTile(4,8);
                this.state.map.forbidTile(5,8);
                this.state.map.forbidTile(4,9);
                this.state.map.forbidTile(5,9);
                for(var i =4;i<14;i++)
                {
                    this.state.map.forbidTile(i,10);
                    this.state.map.forbidTile(i,11);
                }
                for(var i =12;i<15;i++)
                {
                    this.state.map.forbidTile(13,i);
                    this.state.map.forbidTile(12,i);
                }
                break;
            case 2:
                console.log("level 2");
                this.path = [{x: 4,y: 0}, {x: 4,y: 13}, {x: 5,y: 13}, {x: 10,y: 13}, {x: 10,y: 10}, {x: 9,y: 10}, {x: 8,y: 9}, {x: 8,y: 1}, {x: 9,y: 1}, {x: 16,y: 1}, {x: 16,y: 3}, {x: 11,y: 3}, {x: 11,y: 4}, {x: 11,y: 6}, {x: 21,y: 6}];
                this.initialEggs = 10;
                this.initialCorn = 200;
                this.infoWaves = {"timeBetweenTwo": 8000, "Wave":[
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2}, 
																	{'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001},  {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, {'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'lagarto', 'timeToNextEn':0}, {'type':'lagarto', 'timeToNextEn':1}, {'type':'lagarto', 'timeToNextEn':2},
																	 {'type':'lagarto', 'timeToNextEn':3}, {'type':'lagarto', 'timeToNextEn':4}, {'type':'lagarto', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]}
															]};
                this.initialEggs = 10;
                this.initialCorn = 20;
                this.map = 'lvl2';
                for(var i =0;i<15;i++)
                {
                    this.state.map.forbidTile(3,i);
                    this.state.map.forbidTile(4,i);
                }
                for(var i =5;i<11;i++)
                {
                    this.state.map.forbidTile(i,13);
                    this.state.map.forbidTile(i,14);
                }
                this.state.map.forbidTile(9,12);
                this.state.map.forbidTile(9,11);
                this.state.map.forbidTile(9,10);
                this.state.map.forbidTile(9,9);
                this.state.map.forbidTile(10,12);
                this.state.map.forbidTile(10,11);
                this.state.map.forbidTile(10,10);
                this.state.map.forbidTile(10,9);
                for(var i =0;i<11;i++)
                {
                    this.state.map.forbidTile(7,i);
                    this.state.map.forbidTile(8,i);
                }
                for(var i =9;i<18;i++)
                {
                    this.state.map.forbidTile(i,0);
                    this.state.map.forbidTile(i,1);
                }
                this.state.map.forbidTile(16,2);
                this.state.map.forbidTile(17,2);
                for(var i =10;i<18;i++)
                {
                    this.state.map.forbidTile(i,3);
                    this.state.map.forbidTile(i,4);
                }
                this.state.map.forbidTile(10,5);
                this.state.map.forbidTile(11,5);
                for(var i =10;i<22;i++)
                {
                    this.state.map.forbidTile(i,6);
                    this.state.map.forbidTile(i,7);
                }
                break;
            case 3:
                this.path = [{x: 4,y: 14}, {x: 4,y: 4}, {x: 20,y: 4}, {x: 20,y: 8}, {x: 8,y: 8}, {x: 8,y: 12}, {x: 19,y: 12}, {x: 19,y: 14}];
                this.initialEggs = 10;
                this.initialCorn = 200;
                this.infoWaves = {"timeBetweenTwo": 7000, "Wave":[
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2}, 
																	{'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001},  {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, {'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'snake', 'timeToNextEn':4}, {'type':'snake', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'turtle', 'timeToNextEn':1}, {'type':'turtle', 'timeToNextEn':2},
																	 {'type':'turtle', 'timeToNextEn':3}, {'type':'turtle', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]},
																{'enemy':[{'type':'lagarto', 'timeToNextEn':0}, {'type':'lagarto', 'timeToNextEn':1}, {'type':'lagarto', 'timeToNextEn':2},
																	 {'type':'lagarto', 'timeToNextEn':3}, {'type':'lagarto', 'timeToNextEn':4}, {'type':'turtle', 'timeToNextEn':5}, 
																	{'type':'snake', 'timeToNextEn':3000}, {'type':'snake', 'timeToNextEn':3001}, {'type':'snake', 'timeToNextEn':3002}, 
																	{'type':'lagarto', 'timeToNextEn':5000},  {'type':'lagarto', 'timeToNextEn':5001}, {'type':'lagarto', 'timeToNextEn':5002}, 																	{'type':'lagarto', 'timeToNextEn':5003}, {'type':'lagarto', 'timeToNextEn':5004}]}
															]};
                this.initialEggs = 10;
                this.initialCorn = 10;
                this.map = 'lvl3';
                for(var i =3;i<15;i++)
                {
                    this.state.map.forbidTile(3,i);
                    this.state.map.forbidTile(4,i);
                }
                for(var i =5;i<21;i++)
                {
                    this.state.map.forbidTile(i,3);
                    this.state.map.forbidTile(i,4);
                }
                for(var i =5;i<8;i++)
                {        
                    this.state.map.forbidTile(19,i);
                    this.state.map.forbidTile(20,i);
                }
                for(var i =9;i<21;i++)
                {
                    this.state.map.forbidTile(i,8);
                    this.state.map.forbidTile(i,9);
                }
                for(var i =8;i<14;i++)
                {
                    this.state.map.forbidTile(7,i);
                    this.state.map.forbidTile(8,i);
                }
                for(var i =9;i<21;i++)
                {
                    this.state.map.forbidTile(i,12);
                    this.state.map.forbidTile(i,13);
                }
                this.state.map.forbidTile(19,14);
                this.state.map.forbidTile(20,14);
                break;
        }
    },
    updateLevel: function() {
        //console.log(this.game.time.now- this.timeBeginLastWave - this.infoWaves.timeBetweenTwo );
        if (this.game.time.now >= this.timeBeginLastWave + this.infoWaves.timeBetweenTwo && this.waves.length < this.infoWaves.Wave.length && this.state.coop.eggCounter > 0){
            console.log("create new wave ");
            this.waves[this.waves.length] = new Wave(this.game, this.game.time.now, this.path, this.infoWaves.Wave[this.waves.length], this.waves.length);
            this.timeBeginLastWave = this.game.time.now;
        }
        if (this.state.coop.eggCounter > 0) 
        {
            for(var iLevel = 0; iLevel < this.waves.length; iLevel++){
                this.waves[iLevel].move();
            }
        }
        var AllLivingEnemies = 0; 
        for(var i =0;i<this.waves.length;i++)
            AllLivingEnemies+=this.waves[i].waveEnemy.countLiving();
        //this.waves[this.waves.length-1].nbEnemyKilled === this.infoWaves.nbEnemyByWave 
        if (this.waves.length == this.infoWaves.Wave.length && this.state.coop.eggCounter > 0 && AllLivingEnemies == 0 && this.victory === false) 
        {
            this.victory = true;
            console.log("Victory");
            this.state.gameVictory();
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

