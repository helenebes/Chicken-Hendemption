
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
	this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
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

    this.chickenLayers = [];
	
    var opt; //Options button

    //Experimental
    //this.qTree = new Phaser.QuadTree(game.physics,0,0,BasicGame.gameWidth,BasicGame.gameHeight,30*15,4,0);

};

BasicGame.Game.prototype = 
{
    //Create and Update functions
	create: function () 
    {     
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var textobj = this.add.text(100,100, "skjhdbajsdbjaksdhasbdkaskjhdbajsdbjaksdhasbdkaskjhdbajsdbjaksdhasbdkaskjhdbajsdbjaksdhasbdkaskjhdbajsdbasbdkaskjhd", style);
        this.world.bringToTop(textobj);

        this.setControlVars();
        this.loadLevel();
        this.map.cleanMap();

        this.startMusic();
        this.initializeInterface();
        this.buildChickenMenu();
        this.initializeGuidedPositioningStructures();
        this.initializeChickenStructure();
        this.setupMap();
        
        var coop = new Coop(12, 14,this);
        
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        coop.removeEgg();
        
        //Lets keep this code clean and understandable

        this.game.enemies = [];
        this.level = new Level(this.game);

	},
	update: function () 
    {
        if(this.paused == false)
        {
            this.level.updateLevel();
            this.guidePositioning(this.input.mousePointer.x,this.input.mousePointer.y);
        }
		//console.log("dans update");
	},
    loadLevel: function()
    {
        var bg = this.add.sprite(0,0,'grass');
        var map = this.add.tilemap('test_lvl');
        map.addTilesetImage('tileset');
        var layer = map.createLayer('layer1');
        layer.resizeWorld();
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
    },
    guidePositioning: function(x,y)
    {
        if((this.positionMode == true)&&((x>=128)&&(x<1408)))
        {
            this.highlightTile(x,y);
            this.showGrid(x);
        }else{
			this.rect.position.x = (-this.TileSize);
			this.bitmap.position.x = (-1408);
        }

	
    },
    highlightTile: function (x,y) 
    {
        this.rect.position.x = ((~~(x/this.TileSize))*this.TileSize);
        this.rect.position.y = ((~~(y/this.TileSize))*this.TileSize);
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
    initializeChickenStructure: function()
    {
        //Declare the chicken array, and the initial amount of chickens
        this.chickens = [];
        this.chickenAmount = 0;

        //Create the layer groups for the chickens
        for(var i=0;i<15;i++)
        {
            this.chickenLayers[i] = this.add.group();
            this.chickenLayers[i].z=i;
        }
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
			opt.loadTexture('opt_pressed',0);
		},this);
		opt.events.onInputUp.add(this.pauseGame,this);
        BasicGame.optionsPanel.game = this.game;
		BasicGame.optionsPanel = new OptionsPanel(this);
		this.game.add.existing(BasicGame.optionsPanel);
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
        }
        this.chickenAmount++;
    },
	quitGame: function (pointer) 
    {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.stopMusic();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},
    gameOver: function()
    {
        var endGameWindow = new EndGamePanel(this,"defeat",0);
        endGameWindow.show();
    },
    gameVictory: function()
    {
        var endGameWindow = new EndGamePanel(this,"victory",0);
        endGameWindow.show();
    },
	pauseGame: function()
    {
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
        //this.sound.volume = BasicGame.soundVolume;
    },
	stopMusic: function()
	{
		this.music.stop();
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
    resumeMusic: function()
    {
        this.music.volume = BasicGame.musicVolume;
        if(BasicGame.music)
        {
            this.music.play();
        }
    }

};
