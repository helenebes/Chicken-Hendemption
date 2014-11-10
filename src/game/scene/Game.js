
BasicGame.Game = function (game) 
{

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.music;
	this.clickButtonSound = null;
    this.unclickButtonSound = null;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

	this.paused;
	this.inGameOpt;
	
	this.MapTileWidth = 20;
	this.MapTileHeight = 15;
	this.MapOffset = 128;
	this.TileSize = 64;

    this.positionMode;
    this.pendingMenu;
    
    this.map = new Map();

    this.chickens;
    this.bullets = [];
    this.chickenLayers = [];
	
    var opt; //Options button
	var pauseGame;
	var startGame;
	var pauseAndPlayGameButton;
	var gamePaused;

};

BasicGame.Game.prototype = 
{
    //Create and Update functions
	create: function () 
    {     
		this.game.enemies = [];
		this.game.currentEggHealth = 100;
		this.bulletUsed = 0;
        this.map.cleanMap();
        this.setControlVars();
        this.level = new Level(this, BasicGame.currentLevel);
        this.startMusic();
        this.startSounds();
        this.initializeInterface();
        this.buildChickenMenu();
        this.initializeGuidedPositioningStructures();
        this.initializeChickenStructure();
        this.setupMap();
		this.setScore();
		this.setPlayPauseButtons();

        //Lets keep this code clean and understandable

	},
	update: function () 
    {
        if(this.paused == false)
        {
            this.level.updateLevel();
            this.guidePositioning(this.input.mousePointer.x,this.input.mousePointer.y);
			this.chickenUpdate();
			this.updateBullets();
			this.enemiesUpdate(this.coop);
        }       
		this.updateScore();
		//console.log("dans update");
	},
    setControlVars: function()
    {
        this.paused = false;
        this.pendingMenu = false;
        this.positionMenu = false;
    },
    //Guided Positioning functions
    initializeGuidedPositioningStructures: function()
    {
        this.bitmap = this.add.graphics(0,0);
		this.bitmap.lineStyle(1,0xffffff,1);
		this.bitmap.beginFill();
		for(i=0;i<=this.MapTileWidth;i++)
        {
			this.bitmap.moveTo(this.TileSize*i, 0);
			this.bitmap.lineTo(this.TileSize*i, this.MapTileHeight*this.TileSize);
		}
		for(i=0;i<=this.MapTileHeight;i++)
        {
			this.bitmap.moveTo(0, this.TileSize*i);
			this.bitmap.lineTo(this.MapTileWidth*this.TileSize, this.TileSize*i);
		}
		this.bitmap.position.x = (-1500);
		
		
	 	this.rect = this.add.graphics(0,0);
		this.rect.lineStyle(4,0xffffff,1);
		this.rect.beginFill(0xffffff,0.3);
		this.rect.drawRect(0,0,this.TileSize,this.TileSize);
		this.rect.position.x = (-100);

	 	this.badRect = this.add.graphics(0,0);
		this.badRect.lineStyle(4,0xff0000,1);
		this.badRect.beginFill(0xff0000,0.3);
		this.badRect.drawRect(0,0,this.TileSize,this.TileSize);
		this.badRect.position.x = (-100);
    },
    guidePositioning: function(x,y)
    {
        if((this.positionMode == true)&&((x>=128)&&(x<1408)))
        {
            this.highlightTile(x,y);
            this.showGrid(x);
        }else{
			this.rect.position.x = (-this.TileSize-4);
			this.badRect.position.x = (-this.TileSize-4);
			this.bitmap.position.x = (-1408 -4);
        }

	
    },
    highlightTile: function (x,y) 
    {
        var X = (~~(x/this.TileSize));
        var Y = (~~(y/this.TileSize));
        if(this.map.testTile(X,Y))
        {
			this.rect.position.x = (-this.TileSize-4);
            this.badRect.position.x = (X*this.TileSize);
            this.badRect.position.y = (Y*this.TileSize);
        }
        else
        {
			this.badRect.position.x = (-this.TileSize-4);
            this.rect.position.x = (X*this.TileSize);
            this.rect.position.y = (Y*this.TileSize);
        }
	},
	showGrid: function (x) 
    {
        this.bitmap.position.x = (128);
        this.bitmap.position.y = (0);
	},
    //Drag and Drop functions
    drag: function()
    {
       this.prescope.positionMode = true;
    },
    drop: function()
    {
       this.prescope.positionMode = false;
       this.prescope.positionChicken(this.type);
    },
	reloadLevel: function()
    {
        this.state.start('Game');

    },
    initializeChickenStructure: function()
    {
        //Declare the chicken array, and the initial amount of chickens
        this.chickens = [];
        this.chickenAmount = 0;

        //Create the layer groups for the chickens
        for(var i=0;i<15;i++)
        {
            this.chickenLayers[i] = this.add.group();
            this.chickenLayers[i].z=i+2;
        }
        this.effectsLayer = this.add.group();
        this.effectsLayer.z = 1;
    },
    initializeInterface: function()
    {
		var money = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(0),'counter');
		money.bringToTop();
		
		this.inGameOpt = new InGameOptionsPanel(this);
		this.game.add.existing(this.inGameOpt);
        //paused = false;
        opt = this.add.sprite(BasicGame.convertWidth(453),BasicGame.convertHeight(5),'opt');
		opt.inputEnabled = true;
		opt.bringToTop();
		opt.events.onInputDown.add(function()
		{
            this.clickButtonSound.play();
			opt.loadTexture('opt_pressed',0);
		},this);
		opt.events.onInputUp.add(this.pauseGame,this);
        BasicGame.optionsPanel.game = this.game;
		BasicGame.optionsPanel = new OptionsPanel(this);
		this.game.add.existing(BasicGame.optionsPanel);
    },
	setPlayPauseButtons: function() 
	{/*
		gamePaused = true;
		pauseAndPlayGameButton = this.add.sprite(BasicGame.convertWidth(453),BasicGame.convertHeight(15),'playButton');
		pauseAndPlayGameButton.events.onInputDown.add(this.onClick,{buttonName:"play_stop",prescope: this});
		pauseAndPlayGameButton.events.onInputUp.add(this.onClickReleased,{buttonName:"play_stop",prescope: this});*/
		
		if (BasicGame.currentLevel < 3)
		{
			startGame = this.add.sprite(16*64, 11*64,'playButton');
			pauseGame = this.add.sprite(17*64 + 50, 11*64, 'stopButton');
		} else 
		{
			startGame = this.add.sprite(11*64, 6*64,'playButton');
			pauseGame = this.add.sprite(12*64 + 50, 6*64,'stopButton');
		}
		startGame.inputEnabled = true;
		startGame.events.onInputDown.add(this.onClick,{buttonName:"play",prescope: this});
		startGame.events.onInputUp.add(this.onClickReleased,{buttonName:"play",prescope: this});
		pauseGame.inputEnabled = true;
		pauseGame.events.onInputDown.add(this.onClick,{buttonName:"pause",prescope: this});
		pauseGame.events.onInputUp.add(this.onClickReleased,{buttonName:"pause",prescope: this});
	},
    buildChickenMenu: function()
    {
		var normal = this.add.sprite(BasicGame.convertWidth(3),BasicGame.convertHeight(60),'normal'); 
		var longie = this.add.sprite(BasicGame.convertWidth(3),BasicGame.convertHeight(105),'longie'); 
        var poopie = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(163),'poopie'); 
        var fartie = this.add.sprite(BasicGame.convertWidth(3),BasicGame.convertHeight(213),'fartie');
		var robot = this.add.sprite(BasicGame.convertWidth(3),BasicGame.convertHeight(263),'robot');
		
        poopie.inputEnabled = true;
		poopie.events.onInputDown.add(this.drag,{type:"Poopie",prescope: this});
        poopie.events.onInputUp.add(this.drop,{type:"Poopie",prescope: this});

        longie.inputEnabled = true;
		longie.events.onInputDown.add(this.drag,{type:"Longie",prescope: this});
        longie.events.onInputUp.add(this.drop,{type:"Longie",prescope: this});

        normal.inputEnabled = true;
		normal.events.onInputDown.add(this.drag,{type:"Normal",prescope: this});
        normal.events.onInputUp.add(this.drop,{type:"Normal",prescope: this});

        fartie.inputEnabled = true;
		fartie.events.onInputDown.add(this.drag,{type:"Fartie",prescope: this});
        fartie.events.onInputUp.add(this.drop,{type:"Fartie",prescope: this});
        
        robot.inputEnabled = true;
		robot.events.onInputDown.add(this.drag,{type:"Robot",prescope: this});
        robot.events.onInputUp.add(this.drop,{type:"Robot",prescope: this});

    },
    setupMap: function()
    {
        this.map.forbidTile(2,0);
        this.map.forbidTile(2,1);
        this.map.forbidTile(2,2);
        this.map.forbidTile(3,0);
        this.map.forbidTile(3,1);
        this.map.forbidTile(21,0);
        this.map.forbidTile(21,1);
        this.map.forbidTile(21,2);
        this.map.forbidTile(21,3);
    },
    //Position Chicken
    positionChicken: function(type)
    {
        var Xtile = (~~(this.input.mousePointer.x/this.TileSize));
        var Ytile = (~~(this.input.mousePointer.y/this.TileSize));
        var x = (Xtile)*this.TileSize;
        var y = (Ytile)*this.TileSize;
        if(this.map.testTile(Xtile,Ytile))
        {
            console.log("Tile is occupied/forbidden");
        } else if((x>=128)&&(x<1408))
        {
            console.log("Putting: "+Xtile+","+Ytile);
            this.map.setTile(Xtile,Ytile);
            switch(type)
            {
                case "Normal":
                    this.chickens[this.chickenAmount] = new Chicken(Xtile,Ytile,this.chickenAmount,this);
                    //console.log("Positioning Normal");
                    break;
                case "Longie":
                    this.chickens[this.chickenAmount] = new Longie(Xtile,Ytile,this.chickenAmount,this);
                    //console.log("Positioning Longie");
                    break;
                case "Poopie":
                    this.chickens[this.chickenAmount] = new Poopie(Xtile,Ytile,this.chickenAmount,this);
                    //console.log("Positioning Poopie");
                    break; 
                case "Fartie":
                    this.chickens[this.chickenAmount] = new Fartie(Xtile,Ytile,this.chickenAmount,this);
                    //console.log("Positioning Fartie");
                    break; 
                case "Robot":
                    this.chickens[this.chickenAmount] = new Robot(Xtile,Ytile,this.chickenAmount,this);
                    //console.log("Positioning Robot");
                    break; 
            }
            console.log("Positioning Chicken "+x+" "+y);
            this.chickenAmount++;
        }
    },
    chickenUpdate: function()
    {
        for(var i=0;i<this.chickens.length;i++)
        {
            this.chickens[i].update();
        }
    },
	enemiesUpdate: function(coop)
    {
        for(var i=0;i<this.game.enemies.length;i++)
        {
            this.game.enemies[i].update(coop);
        }
    },
	quitGame: function (pointer) 
    {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.stopMusic();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},
	nextLevel: function()
	{
		BasicGame.currentLevel++;
        this.reloadLevel();
	},
    gameOver: function()
    {
        var endGameWindow = new EndGamePanel(this,"defeat",0);
        endGameWindow.show();
    },
    gameVictory: function()
    {
		if (this.coop.eggCounter === this.level.initialEggs) 
		{
			var goldenEggs = 3;
		} else {
			var goldenEggs = 9 - this.level.initialEggs - this.coop.eggCounter;
		}
        var endGameWindow = new EndGamePanel(this,"victory",goldenEggs);
        endGameWindow.show();
    },
	pauseGame: function()
    {   
        this.unclickButtonSound.play();
        console.log("Bullets: "+this.bullets.length);
		opt.loadTexture('opt',0);
		this.inGameOpt.show();
        this.world.bringToTop(this.inGameOpt);
        this.paused = true;
    },
    playGame: function()
    {
        BasicGame.optionsPanel.hide();
        if(this.pendingMenu)
        {
            this.pauseGame();
            this.pendingMenu = false;
        }
        else
        {
            // Hide panel
            this.paused = false;
            this.inGameOpt.hide();
        }
    },
	changeMenu: function()
	{
		this.inGameOpt.hide();
		BasicGame.optionsPanel.show();
        this.world.bringToTop(BasicGame.optionsPanel);
        this.pendingMenu = true;
	},
    updateVolume: function()
    {
        this.music.volume = BasicGame.musicVolume;
        this.clickButtonSound.volume = BasicGame.soundVolume;
        this.unclickButtonSound.volume = BasicGame.soundVolume;
        //this.sound.volume = BasicGame.soundVolume;
    },
	stopMusic: function()
	{
		this.music.stop();
	},
    stopSounds: function()
    {
       this.clickButtonSound.volume = 0;
       this.unclickButtonSound.volume = 0;
    },
    stopSounds: function()
    {
       this.clickButtonSound.volume = 0;
       this.unclickButtonSound.volume = 0;
    },
	startMusic: function()
	{
		this.music = this.add.audio('chicken_family');
		this.music.loop = true;
        this.music.volume = BasicGame.musicVolume;
        if(BasicGame.music)
        {
            this.music.play();
        }
	},
    startSounds: function()
    {
        this.clickButtonSound = this.add.audio('click_in');
        this.unclickButtonSound = this.add.audio('click_out');
    },
    resumeMusic: function()
    {
        this.music.volume = BasicGame.musicVolume;
        if(BasicGame.music)
        {
            this.music.play();
        }
    },
    createBullet: function(x,y,enemy,damage)
    {
		this.bulletUsed ++;
        var xDist = (x-enemy.centrex);
        var yDist = (y-enemy.centrey);
        var speed = 20;
        var distance = Math.sqrt(xDist*xDist + yDist*yDist);
        this.bullets.push(
                {
                    sprite:     this.add.sprite(x,y,'cornBullet'),
                    xStepSize:  (xDist/distance)*speed,
                    yStepSize:  (yDist/distance)*speed,
                    index:      distance/speed,
                    Enemy:      enemy,
                    Damage:     damage
                });
    },
    updateBullets: function()
    {
        for(var i=0;i<this.bullets.length;i++) 
        {
            this.bullets[i].index--; 
            this.bullets[i].sprite.position.x -= this.bullets[i].xStepSize;
            this.bullets[i].sprite.position.y -= this.bullets[i].yStepSize;
            if(this.bullets[i].index < 0)
            {
                this.bullets[i].Enemy.isAttacked(this.bullets[i].Damage);
                this.bullets[i].sprite.kill();
                this.bullets.splice(i,1);
            }
        }
    },
    shutdown: function()
    {
        this.stopMusic();
    },
	setScore: function() 
	{
		var style = { font: "65px Arial", fill: "#000000", align: "center" };
		this.lastNbEgg = this.coop.eggCounter;
		this.lastNbbullet = this.bulletUsed;
		this.lastNbWaves = this.level.waves.length;   	
		this.cornScore = this.game.add.text(BasicGame.convertWidth(0)+90, BasicGame.convertHeight(0)+10, this.level.initialCorn - this.bulletUsed, style);
		this.eggScore = this.game.add.text(BasicGame.convertWidth(0)+74, BasicGame.convertHeight(0)+95, this.coop.eggCounter, style);
		style = { font: "30px Arial", fill: "#000000", align: "center" };
		if (BasicGame.currentLevel < 3)
		{
			this.afficheNbWaves = this.game.add.text(16*64, 14*64, 'Waves Remaining:  ', style);
			this.afficheNbWaves = this.game.add.text(20*64, 14*64, this.level.infoWaves.nbWaves - this.level.waves.length, style);
		} else {
			this.afficheNbWaves = this.game.add.text(10*64, BasicGame.convertHeight(0)+70, 'Waves Remaining:  ', style);
			this.afficheNbWaves = this.game.add.text(14*64, BasicGame.convertHeight(0)+70, this.level.infoWaves.nbWaves - this.level.waves.length, style);
		}	
	},
	updateScore: function() 
	{
		var style = { font: "65px Arial", fill: "#000000", align: "center" };
		if (this.coop.eggCounter != this.lastNbEgg) 
		{
			this.eggScore.destroy(); 	
			this.eggScore = this.game.add.text(BasicGame.convertWidth(0)+100, BasicGame.convertHeight(0)+95, this.coop.eggCounter, style);
			this.lastNbEgg = this.coop.eggCounter;
			if (this.coop.eggCounter === 0)
			{
				this.eggScore = this.game.add.text(BasicGame.convertWidth(0)+100, BasicGame.convertHeight(0)+95, '0', style);
			}
		}
		if (this.bulletUsed != this.lastNbbullet) 
		{
			this.cornScore.destroy();
			this.cornScore = this.game.add.text(BasicGame.convertWidth(0)+90, BasicGame.convertHeight(0)+10, this.level.initialCorn - this.bulletUsed, style);
			this.lastNbbullet = this.bulletUsed;
			if (this.level.initialCorn === this.bulletUsed)
			{
				this.cornScore = this.game.add.text(BasicGame.convertWidth(0)+90, BasicGame.convertHeight(0)+10, '0', style);
			}
		}
		if (this.lastNbWaves != this.level.waves.length) 
		{
			style = { font: "30px Arial", fill: "#000000", align: "center" };
			this.afficheNbWaves.destroy();
			if (BasicGame.currentLevel < 3)
			{
				this.afficheNbWaves = this.game.add.text(16*64, 14*64, 'Waves Remaining:  ', style);
				if (this.level.infoWaves.nbWaves === this.level.waves.length)
				{
					this.afficheNbWaves = this.game.add.text(20*64, 14*64, '0', style);
				} else {
					this.afficheNbWaves = this.game.add.text(20*64, 14*64, this.level.infoWaves.nbWaves - this.level.waves.length, style);
				}
			} else {
				this.afficheNbWaves = this.game.add.text(10*64, BasicGame.convertHeight(0)+70, 'Waves Remaining:  '+ this.level.infoWaves.nbWaves - this.level.waves.length, style);
				if (this.level.infoWaves.nbWaves === this.level.waves.length)
				{
					this.afficheNbWaves = this.game.add.text(20*64, 14*64, '0', style);
				} else {
					this.afficheNbWaves = this.game.add.text(14*64, BasicGame.convertHeight(0)+70, this.level.infoWaves.nbWaves - this.level.waves.length, style);
				}
			}
			this.lastNbWaves = this.level.waves.length;
		}		
	},

	onClick:function(buttonName, prescope)
    {
		this.prescope.clickButtonSound.play();
		switch(this.buttonName)
		{
			case "play":				
				startGame.loadTexture('playButtonPressed',0);
				
				break;
			case "pause":
				pauseGame.loadTexture('stopButtonPressed',0);					
				break;
			case "play_stop":
				if(gamePaused)
				{
					pauseAndPlayGameButton.loadTexture('playButtonPressed',0);
				}
				else
				{
					pauseAndPlayGameButton.loadTexture('stopButtonPressed',0);
				}
				break;
		}
				
    },
    onClickReleased:function(buttonName, prescope)
    {
 		this.prescope.unclickButtonSound.play();
		switch(this.buttonName)
		{
			case "play":
				if (this.prescope.level.waves.length === 0) 
				{				
					this.prescope.level.setFirstWave(this.prescope.time.now);
				} else 
				{
					this.prescope.paused = false;
				}
				break;
			case "pause":
				this.prescope.paused = true;
				break;
				
			case "play_stop":
				if(gamePaused)
				{
					pauseAndPlayGameButton.loadTexture('stopButton',0);
					gamePaused = false;
					this.prescope.paused = false;
				}
				else
				{
					pauseAndPlayGameButton.loadTexture('playButton',0);
					gamePaused = true;
					this.prescope.paused = true;
				}
				break;
		}		
	},
};
