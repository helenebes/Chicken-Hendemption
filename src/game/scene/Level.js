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
																{'enemy':[{'type':'snake', 'timeToNextEn':0}, {'type':'snake', 'timeToNextEn':100}, {'type':'lagarto', 'timeToNextEn':200}, 
																	{'type':'turtle', 'timeToNextEn':300}, {'type':'snake', 'timeToNextEn':400}, {'type':'turtle', 'timeToNextEn':1000}, 
																	{'type':'snake', 'timeToNextEn':1200}, {'type':'snake', 'timeToNextEn':1500},  {'type':'snake', 'timeToNextEn':5000}, 
																	{'type':'snake', 'timeToNextEn':5300},  {'type':'lagarto', 'timeToNextEn':5601}, {'type':'lagarto', 'timeToNextEn':5902}, 
                                                                    {'type':'lagarto', 'timeToNextEn':6000}, {'type':'snake', 'timeToNextEn':6500}]},
																{'enemy':[{'type':'snake', 'timeToNextEn':8000}, {'type':'snake', 'timeToNextEn':8600}, {'type':'snake', 'timeToNextEn':9000},
																	 {'type':'turtle', 'timeToNextEn':9300}, {'type':'snake', 'timeToNextEn':9700}, {'type':'turtle', 'timeToNextEn':10300}, 
																	{'type':'snake', 'timeToNextEn':10600}, {'type':'snake', 'timeToNextEn':10700}, {'type':'snake', 'timeToNextEn':10900}, 
																	{'type':'lagarto', 'timeToNextEn':11100},  {'type':'lagarto', 'timeToNextEn':11700}, {'type':'lagarto', 'timeToNextEn':11900}, 																	
                                                                    {'type':'lagarto', 'timeToNextEn':12000}, {'type':'lagarto', 'timeToNextEn':13000}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':13800}, {'type':'snake', 'timeToNextEn':14000}, {'type':'turtle', 'timeToNextEn':15000},
																	 {'type':'snake', 'timeToNextEn':15400}, {'type':'snake', 'timeToNextEn':15888}, {'type':'snake', 'timeToNextEn':16000}, 
																	{'type':'snake', 'timeToNextEn':16400}, {'type':'snake', 'timeToNextEn':16500}, {'type':'snake', 'timeToNextEn':16800}, 
																	{'type':'lagarto', 'timeToNextEn':17000},  {'type':'lagarto', 'timeToNextEn':17400}, {'type':'lagarto', 'timeToNextEn':17600}, 																	
                                                                    {'type':'lagarto', 'timeToNextEn':18000}, {'type':'lagarto', 'timeToNextEn':18400}]},
																{'enemy':[{'type':'snake', 'timeToNextEn':18700}, {'type':'snake', 'timeToNextEn':19000}, {'type':'snake', 'timeToNextEn':19300},
																	 {'type':'snake', 'timeToNextEn':19500}, {'type':'turtle', 'timeToNextEn':19700}, {'type':'turtle', 'timeToNextEn':20000}, 
																	{'type':'snake', 'timeToNextEn':20300}, {'type':'snake', 'timeToNextEn':20700}, {'type':'snake', 'timeToNextEn':20800}, 
																	{'type':'lagarto', 'timeToNextEn':21000},  {'type':'lagarto', 'timeToNextEn':21500}, {'type':'lagarto', 'timeToNextEn':21700}, 																	
                                                                    {'type':'lagarto', 'timeToNextEn':21800}, {'type':'lagarto', 'timeToNextEn':22000}]}
															]};

                this.initialEggs = 10;
                this.initialCorn = 50;
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
                this.infoWaves = {"timeBetweenTwo": 10000, "Wave":[
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'snake', 'timeToNextEn':100}, {'type':'lagarto', 'timeToNextEn':200}, 
																	{'type':'turtle', 'timeToNextEn':300}, {'type':'turtle', 'timeToNextEn':400}, {'type':'turtle', 'timeToNextEn':1000}, 
																	{'type':'lagarto', 'timeToNextEn':1200}, {'type':'snake', 'timeToNextEn':1500},  {'type':'turtle', 'timeToNextEn':5000}, 
																	{'type':'snake', 'timeToNextEn':5300},  {'type':'lagarto', 'timeToNextEn':5601}, {'type':'lagarto', 'timeToNextEn':5902}, 
                                                                    {'type':'lagarto', 'timeToNextEn':6000}, {'type':'lagarto', 'timeToNextEn':6500}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':8000}, {'type':'snake', 'timeToNextEn':8600}, {'type':'snake', 'timeToNextEn':9000},
																	 {'type':'turtle', 'timeToNextEn':9300}, {'type':'turtle', 'timeToNextEn':9700}, {'type':'turtle', 'timeToNextEn':10300}, 
																	{'type':'snake', 'timeToNextEn':10600}, {'type':'lagarto', 'timeToNextEn':10700}, {'type':'snake', 'timeToNextEn':10900}, 
																	{'type':'lagarto', 'timeToNextEn':11100},  {'type':'lagarto', 'timeToNextEn':11700}, {'type':'lagarto', 'timeToNextEn':11900}, 																	
                                                                    {'type':'lagarto', 'timeToNextEn':12000}, {'type':'lagarto', 'timeToNextEn':13000}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':13800}, {'type':'lagarto', 'timeToNextEn':14000}, {'type':'turtle', 'timeToNextEn':15000},
																	 {'type':'turtle', 'timeToNextEn':15400}, {'type':'snake', 'timeToNextEn':15888}, {'type':'turtle', 'timeToNextEn':16000}, 
																	{'type':'snake', 'timeToNextEn':16400}, {'type':'lagarto', 'timeToNextEn':16500}, {'type':'lagarto', 'timeToNextEn':16800}, 
																	{'type':'lagarto', 'timeToNextEn':17000},  {'type':'lagarto', 'timeToNextEn':17400}, {'type':'lagarto', 'timeToNextEn':17600}, 																	
                                                                    {'type':'lagarto', 'timeToNextEn':18000}, {'type':'lagarto', 'timeToNextEn':18400}]},
																{'enemy':[{'type':'snake', 'timeToNextEn':18700}, {'type':'lagarto', 'timeToNextEn':19000}, {'type':'lagarto', 'timeToNextEn':19300},
																	 {'type':'lagarto', 'timeToNextEn':19500}, {'type':'turtle', 'timeToNextEn':19700}, {'type':'turtle', 'timeToNextEn':20000}, 
																	{'type':'lagarto', 'timeToNextEn':20300}, {'type':'lagarto', 'timeToNextEn':20700}, {'type':'snake', 'timeToNextEn':20800}, 
																	{'type':'lagarto', 'timeToNextEn':21000},  {'type':'lagarto', 'timeToNextEn':21500}, {'type':'lagarto', 'timeToNextEn':21700}, 	
																	{'type':'lagarto', 'timeToNextEn':23000}, {'type':'turtle', 'timeToNextEn':23100}, {'type':'turtle', 'timeToNextEn':23600}, 
																	{'type':'lagarto', 'timeToNextEn':23900}, {'type':'lagarto', 'timeToNextEn':24200}, {'type':'turtle', 'timeToNextEn':24700}, 
																	{'type':'lagarto', 'timeToNextEn':25000},  {'type':'lagarto', 'timeToNextEn':25600}, {'type':'lagarto', 'timeToNextEn':25900}, 
                                                                    {'type':'lagarto', 'timeToNextEn':26100}, {'type':'lagarto', 'timeToNextEn':27200}]},
																{'enemy':[{'type':'snake', 'timeToNextEn':28000}, {'type':'lagarto', 'timeToNextEn':28300}, {'type':'lagarto', 'timeToNextEn':28600},
																	 {'type':'lagarto', 'timeToNextEn':28500}, {'type':'turtle', 'timeToNextEn':28900}, {'type':'turtle', 'timeToNextEn':29400}, 
																	{'type':'lagarto', 'timeToNextEn':30000}, {'type':'lagarto', 'timeToNextEn':30500}, {'type':'snake', 'timeToNextEn':30700}, 
																	{'type':'lagarto', 'timeToNextEn':31000},  {'type':'lagarto', 'timeToNextEn':31600}, {'type':'lagarto', 'timeToNextEn':31800}, 	
																	{'type':'lagarto', 'timeToNextEn':32000}, {'type':'turtle', 'timeToNextEn':32500}, {'type':'turtle', 'timeToNextEn':33000}, 
																	{'type':'lagarto', 'timeToNextEn':33600}, {'type':'lagarto', 'timeToNextEn':33900}, {'type':'snake', 'timeToNextEn':34000}, 
																	{'type':'lagarto', 'timeToNextEn':34700},  {'type':'lagarto', 'timeToNextEn':35000}, {'type':'lagarto', 'timeToNextEn':35800}, 
                                                                    {'type':'lagarto', 'timeToNextEn':36000}, {'type':'lagarto', 'timeToNextEn':36500}]}
															]};
                this.initialEggs = 10;
                this.initialCorn = 50;
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
                this.infoWaves = {"timeBetweenTwo": 10000, "Wave":[
																{'enemy':[{'type':'turtle', 'timeToNextEn':0}, {'type':'snake', 'timeToNextEn':100}, {'type':'lagarto', 'timeToNextEn':200}, 
																	{'type':'turtle', 'timeToNextEn':300}, {'type':'turtle', 'timeToNextEn':400}, {'type':'turtle', 'timeToNextEn':1000}, 
																	{'type':'lagarto', 'timeToNextEn':1200}, {'type':'snake', 'timeToNextEn':1500},  {'type':'turtle', 'timeToNextEn':5000}, 
																	{'type':'snake', 'timeToNextEn':5300},  {'type':'lagarto', 'timeToNextEn':5601}, {'type':'lagarto', 'timeToNextEn':5902}, 
                                                                    {'type':'turtle', 'timeToNextEn':6000}, {'type':'turtle', 'timeToNextEn':6500}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':8000}, {'type':'snake', 'timeToNextEn':8600}, {'type':'snake', 'timeToNextEn':9000},
																	 {'type':'turtle', 'timeToNextEn':9300}, {'type':'turtle', 'timeToNextEn':9700}, {'type':'turtle', 'timeToNextEn':10300}, 
																	{'type':'snake', 'timeToNextEn':10600}, {'type':'turtle', 'timeToNextEn':10700}, {'type':'snake', 'timeToNextEn':10900}, 
																	{'type':'lagarto', 'timeToNextEn':11100},  {'type':'lagarto', 'timeToNextEn':11700}, {'type':'lagarto', 'timeToNextEn':11900}, 																	
                                                                    {'type':'turtle', 'timeToNextEn':12000}, {'type':'lagarto', 'timeToNextEn':13000}]},
																{'enemy':[{'type':'turtle', 'timeToNextEn':13800}, {'type':'turtle', 'timeToNextEn':14000}, {'type':'turtle', 'timeToNextEn':15000},
																	 {'type':'turtle', 'timeToNextEn':15400}, {'type':'snake', 'timeToNextEn':15888}, {'type':'turtle', 'timeToNextEn':16000}, 
																	{'type':'snake', 'timeToNextEn':16400}, {'type':'turtle', 'timeToNextEn':16500}, {'type':'lagarto', 'timeToNextEn':16800}, 
																	{'type':'turtle', 'timeToNextEn':17000},  {'type':'lagarto', 'timeToNextEn':17400}, {'type':'turtle', 'timeToNextEn':17600}, 																	
                                                                    {'type':'turtle', 'timeToNextEn':18000}, {'type':'turtle', 'timeToNextEn':18400}]},
																{'enemy':[{'type':'snake', 'timeToNextEn':18700}, {'type':'lagarto', 'timeToNextEn':19000}, {'type':'lagarto', 'timeToNextEn':19300},
																	 {'type':'lagarto', 'timeToNextEn':19500}, {'type':'turtle', 'timeToNextEn':19700}, {'type':'turtle', 'timeToNextEn':20000}, 
																	{'type':'turtle', 'timeToNextEn':20300}, {'type':'lagarto', 'timeToNextEn':20700}, {'type':'snake', 'timeToNextEn':20800}, 
																	{'type':'turtle', 'timeToNextEn':21000},  {'type':'turtle', 'timeToNextEn':21500}, {'type':'turtle', 'timeToNextEn':21700}, 	
																	{'type':'turtle', 'timeToNextEn':23000}, {'type':'turtle', 'timeToNextEn':23100}, {'type':'turtle', 'timeToNextEn':23600}, 
																	{'type':'turtle', 'timeToNextEn':23900}, {'type':'turtle', 'timeToNextEn':24200}, {'type':'turtle', 'timeToNextEn':24700}, 
																	{'type':'turtle', 'timeToNextEn':25000},  {'type':'lagarto', 'timeToNextEn':25600}, {'type':'lagarto', 'timeToNextEn':25900}, 
                                                                    {'type':'lagarto', 'timeToNextEn':26100}, {'type':'turtle', 'timeToNextEn':27200}]},
																{'enemy':[{'type':'snake', 'timeToNextEn':28000}, {'type':'turtle', 'timeToNextEn':28300}, {'type':'lagarto', 'timeToNextEn':28600},
																	 {'type':'lagarto', 'timeToNextEn':28500}, {'type':'turtle', 'timeToNextEn':28900}, {'type':'turtle', 'timeToNextEn':29400}, 
																	{'type':'turtle', 'timeToNextEn':30000}, {'type':'lagarto', 'timeToNextEn':30500}, {'type':'snake', 'timeToNextEn':30700}, 
																	{'type':'turtle', 'timeToNextEn':31000},  {'type':'turtle', 'timeToNextEn':31600}, {'type':'turtle', 'timeToNextEn':31800}, 	
																	{'type':'lagarto', 'timeToNextEn':32000}, {'type':'turtle', 'timeToNextEn':32500}, {'type':'turtle', 'timeToNextEn':33000}, 
																	{'type':'turtle', 'timeToNextEn':33600}, {'type':'lagarto', 'timeToNextEn':33900}, {'type':'snake', 'timeToNextEn':34000}, 
																	{'type':'lagarto', 'timeToNextEn':34700},  {'type':'turtle', 'timeToNextEn':35000}, {'type':'lagarto', 'timeToNextEn':35800}, 
                                                                    {'type':'turtle', 'timeToNextEn':36000}, {'type':'lagarto', 'timeToNextEn':36500}]}
															]};
                this.initialEggs = 10;
                this.initialCorn = 50;
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

