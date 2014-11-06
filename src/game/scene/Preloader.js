//Teste - Nicolas
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		
		//this.load.setPreloadSprite(this.preloadBar);
        
        // intro
		this.load.image('introBg','assets/'+BasicGame.screen+"/intro.png");
        this.load.image('introPlayBtn','assets/'+BasicGame.screen+"/startButton.png");
        this.load.image('introPlayBtnPressed','assets/'+BasicGame.screen+"/startButtonPressed.png");
        this.load.image('title','assets/'+BasicGame.screen+"/title.png");
        
        // main menu
        this.load.image('menuBg','assets/'+BasicGame.screen+"/fazenda.png");
        this.load.image('lvl1','assets/'+BasicGame.screen+"/level_1.png");
        this.load.image('lvl1_pressed','assets/'+BasicGame.screen+"/level_1_pressed.png");
        this.load.image('lvl2','assets/'+BasicGame.screen+"/level_2.png");
        this.load.image('lvl2_pressed','assets/'+BasicGame.screen+"/level_2_pressed.png");
        this.load.image('lvl3','assets/'+BasicGame.screen+"/level_3.png");
        this.load.image('lvl3_pressed','assets/'+BasicGame.screen+"/level_3_pressed.png");
        this.load.image('opt','assets/'+BasicGame.screen+"/options_button.png");
        this.load.image('opt_pressed','assets/'+BasicGame.screen+"/options_button_pressed.png");
        this.load.image('back','assets/'+BasicGame.screen+"/back_arrow.png");
        this.load.image('chickenB','assets/'+BasicGame.screen+"/chickenB.png");
        this.load.image('chickenB_pressed','assets/'+BasicGame.screen+"/chickenB_pressed.png");
        this.load.image('enemiesB','assets/'+BasicGame.screen+"/enemiesB.png");
        this.load.image('enemiesB_pressed','assets/'+BasicGame.screen+"/enemiesB_pressed.png");
        this.load.image('howToPlayB','assets/'+BasicGame.screen+"/howToPlayB.png");
        this.load.image('howToPlayB_pressed','assets/'+BasicGame.screen+"/howToPlayB_pressed.png");
        
        // options
        this.load.image('options_window','assets/'+BasicGame.screen+"/options_window.png");
        this.load.image('options_x','assets/'+BasicGame.screen+"/options_x.png");
		this.load.spritesheet('quit_button_sheet','assets/'+BasicGame.screen+"/quit_button_sheet.png",398.5, 105);
		this.load.spritesheet('reset_button_sheet','assets/'+BasicGame.screen+"/reset_button_sheet.png",398.5, 104);
		this.load.spritesheet('more_opt_sheet','assets/'+BasicGame.screen+"/more_opt_sheet.png",398.5, 104);
		
		// main options
		this.load.image('main_options_window','assets/'+BasicGame.screen+"/main_options_window.png");
		this.load.image('check_true','assets/'+BasicGame.screen+"/check_true.png");
		this.load.image('check_false','assets/'+BasicGame.screen+"/check_false.png");
		this.load.image('arrow','assets/'+BasicGame.screen+"/arrow.png");
        
        // game
        this.load.image('counter','assets/'+BasicGame.screen+"/money_counter.png");
        this.load.tilemap('lvl1_map', 'assets/'+BasicGame.screen+"/lvl1.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('test_lvl', 'assets/'+BasicGame.screen+"/teste.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset',  'assets/'+BasicGame.screen+"/tileset.png");
        this.load.image('grass',  'assets/'+BasicGame.screen+"/map1.png");
        
        this.load.image('coop',  'assets/'+BasicGame.screen+"/coop.png");
        
		this.load.image('playBtn','assets/'+BasicGame.screen+"/playBtn.png");
        this.load.image('longie','assets/'+BasicGame.screen+"/longieB.png");
        this.load.image('normal','assets/'+BasicGame.screen+"/normalB.png");
        this.load.image('poopie','assets/'+BasicGame.screen+"/poopieB.png");
		this.load.image('robot','assets/'+BasicGame.screen+"/robotB.png");
        this.load.image('fartie','assets/'+BasicGame.screen+"/fartieB.png");
		this.load.image('longieP','assets/'+BasicGame.screen+"/longie.png");
		this.load.image('normalP','assets/'+BasicGame.screen+"/normal.png");
        this.load.image('poopieP','assets/'+BasicGame.screen+"/poopie.png");
        this.load.image('fartieP','assets/'+BasicGame.screen+"/fartie.png");
        this.load.image('robotP','assets/'+BasicGame.screen+"/robot.png");
		
		// songs
		this.load.audio('chicken_family', ['assets/sounds/ChickenFamily.mp3', 'assets/sounds/ChickenFamily.ogg']);
        this.load.audio('menu_music', ['assets/sounds/MenuMusic.mp3', 'assets/sounds/MenuMusic.ogg']);
		
        this.load.spritesheet('dog','assets/'+BasicGame.screen+"/dog.png", 40, 40, 12);
        this.load.spritesheet('mummy', 'assets/'+BasicGame.screen+"/mummy.png", 37, 45, 18); // width de cada sprite, height de cada sprite, numero de sprites no arquivo
        this.load.spritesheet('lagarto','assets/'+BasicGame.screen+"/lagarto2.png", 61.3, 61.25, 12);
        this.load.spritesheet('snake','assets/'+BasicGame.screen+"/snake.png", 100, 94.25, 12);
        this.load.spritesheet('turtle','assets/'+BasicGame.screen+"/turtle.png", 130, 118.5, 16);
        
	},

	create: function () 
    {
		//this.preloadBar.cropEnabled = false;
		this.ready = true;
		this.state.start('Intro');
	},

	update: function () 
    {

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('Intro');
		}

	}

};
