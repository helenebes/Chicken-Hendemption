
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
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    this.width = 1440;
	this.height = 960;
	this.MapTileWidth = 20;
	this.MapTileHeight = 15;
	this.MapOffset = 128;
	this.TileSize = 64;
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () 
    {     
        var bg = this.add.sprite(0,0,'grass');
        var map = this.add.tilemap('test_lvl');
        map.addTilesetImage('tileset');
        var layer = map.createLayer('layer1');
        layer.resizeWorld();
        //this.cameraOffset = new Phaser.Point(160,0);
        
        //var bg = this.add.sprite(0,0,'lvl1_map');
        
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
		
		var money = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(0),'counter');
		money.bringToTop();
        opt = this.add.sprite(BasicGame.convertWidth(453),BasicGame.convertHeight(5),'opt');
		opt.inputEnabled = true;
		opt.bringToTop();
		//opt.events.onInputDown.add(this.onClickOptions,this);
        //opt.events.onInputUp.add(this.onClickOptionsReleased,this);
		
		var poopie = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(65),'poopie');
		poopie.scale.x = 0.75;
		poopie.scale.y = 0.75;
		var longie = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(110),'longie');
		longie.scale.x = 0.7;
		longie.scale.y = 0.7;
		var normal = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(170),'normal');
		normal.scale.x = 0.7;
		normal.scale.y = 0.7;
		var robot = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(270),'robot');
		robot.scale.x = 0.1;
		robot.scale.y = 0.1;
		
		var longieP = this.add.sprite(BasicGame.convertWidth(100),BasicGame.convertHeight(100),'longieP');
        

	},

	update: function () 
    {

    
        this.highlightTile(this.input.mousePointer.x,this.input.mousePointer.y);
		this.showGrid(this.input.mousePointer.x);
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},
    
    highlightTile: function (x,y) 
    {
		var clear;
		if((x>128)&&(x<1408))
        {
			clear = 0
			this.rect.position.x = ((~~(x/this.TileSize))*this.TileSize);
			this.rect.position.y = ((~~(y/this.TileSize))*this.TileSize);
		}else
        {
			//this.rect.clear();
			//clear = 1;
			this.rect.position.x = (-this.TileSize);
		}
		
	},
	showGrid: function (x) 
    {
		var clear;
		if((x>128)&&(x<1408))
        {
			clear = 0
			this.bitmap.position.x = (128);
			this.bitmap.position.y = (0);
		}else
        {
			//this.rect.clear();
			//clear = 1;
			this.bitmap.position.x = (-1408);
		}
	},

	quitGame: function (pointer) 
    {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
