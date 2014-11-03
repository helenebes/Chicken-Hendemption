
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

    this.positionMode = false;
    
    this.map = new Map();
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = 
{
    //Create and Update functions
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
		
        poopie.inputEnabled = true;
		poopie.events.onInputDown.add(this.drag,{type:"Poopie",prescope: this});
        poopie.events.onInputUp.add(this.drop,{type:"Poopie",prescope: this});

        longie.inputEnabled = true;
		longie.events.onInputDown.add(this.drag,{type:"Longie",prescope: this});
        longie.events.onInputUp.add(this.drop,{type:"Longie",prescope: this});

        normal.inputEnabled = true;
		normal.events.onInputDown.add(this.drag,{type:"Normal",prescope: this});
        normal.events.onInputUp.add(this.drop,{type:"Normal",prescope: this});

        robot.inputEnabled = true;
		robot.events.onInputDown.add(this.drag,{type:"Robot",prescope: this});
        robot.events.onInputUp.add(this.drop,{type:"Robot",prescope: this});

		//var longieP = this.add.sprite(BasicGame.convertWidth(100),BasicGame.convertHeight(100),'longieP');
        
        //this.input.onDown.add(this.positionChicken, this);
        
        this.chickens = [];
        this.chickenAmount = 0;
           
	},
	update: function () 
    {
        this.guidePositioning(this.input.mousePointer.x,this.input.mousePointer.y);
	},
    //Guided Positioning functions
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
    //Position Chicken
    positionChicken: function(type)
    {
        var Xtile = (~~(this.input.mousePointer.x/this.TileSize));
        var Ytile = (~~(this.input.mousePointer.y/this.TileSize));
        var x = (Xtile)*this.TileSize;
        var y = (Ytile)*this.TileSize;
        console.log("Putting: "+Xtile+","+Ytile);
        if(this.map.testTile(Xtile,Ytile))
        {
            console.log("Tile is occupied/forbidden");
        } else if((x>=128)&&(x<1408))
        {
            this.map.setTile(Xtile,Ytile);
            this.chickens[this.chickenAmount] = new Chicken((x/64)-2,(y/64),type,this.chickenAmount,this.game);
            switch(type)
            {
                case "Normal":
                    console.log("Positioning Normal");
                    break;
                case "Longie":
                    console.log("Positioning Longie");
                    this.chickens[this.chickenAmount].setSprite(this.add.sprite((x),((y)-31),'longieP'));
                    break;
                case "Poopie":
                    console.log("Positioning Poopie");
                    break; 
                case "Fartie":
                    console.log("Positioning Fartie");
                    break; 
                case "Robot":
                    console.log("Positioning Robot");
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

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
