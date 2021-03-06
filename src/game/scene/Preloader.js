//Teste - Nicolas
BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {


        this.background = this.add.sprite(0, 0, 'loading');
        //this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

        
        //this.load.setPreloadSprite(this.preloadBar);
        
        // intro
        this.load.image('introBg','assets/'+BasicGame.screen+"/intro.png");
        this.load.image('introPlayBtn','assets/'+BasicGame.screen+"/startButton.png");
        this.load.image('introPlayBtnPressed','assets/'+BasicGame.screen+"/startButtonPressed.png");
        this.load.image('title','assets/'+BasicGame.screen+"/title.png");
        this.load.image('intro_longie','assets/'+BasicGame.screen+"/intro_longie.png");
        
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
        
        // end game window
        this.load.image('defeat_window','assets/'+BasicGame.screen+"/defeat_window.png");
        this.load.image('victory_window','assets/'+BasicGame.screen+"/victory_window.png");
        this.load.spritesheet('quitB','assets/'+BasicGame.screen+"/quitB.png",150, 89);
        this.load.spritesheet('retryB','assets/'+BasicGame.screen+"/retryB.png",158, 94);
        this.load.spritesheet('nextLvlB','assets/'+BasicGame.screen+"/nextLvlB.png",270, 89);
        this.load.image('nextLvlBDisabled','assets/'+BasicGame.screen+"/nextLvlBDisabled.png");
        this.load.image('golden_egg','assets/'+BasicGame.screen+"/golden_egg.png");
        this.load.image('no_egg','assets/'+BasicGame.screen+"/no_egg.png");
        
        // how to play 
        this.load.image('how_to_play','assets/'+BasicGame.screen+"/how_to_play.png");
        
        // chicken info window
        this.load.image('chicken_info_1','assets/'+BasicGame.screen+"/chicken_info_1.png");
        this.load.image('chicken_info_2','assets/'+BasicGame.screen+"/chicken_info_2.png");
        this.load.image('chicken_info_3','assets/'+BasicGame.screen+"/chicken_info_3.png");
        this.load.spritesheet('right_arrow','assets/'+BasicGame.screen+"/right_arrow_sheet.png",80, 64);
        this.load.spritesheet('left_arrow','assets/'+BasicGame.screen+"/left_arrow_sheet.png",80, 64);
        
        // enemie info window
        this.load.image('enemie_info_1','assets/'+BasicGame.screen+"/enemie_info_1.png");
        this.load.image('enemie_info_2','assets/'+BasicGame.screen+"/enemie_info_2.png");
        
        // game
        this.load.image('counter','assets/'+BasicGame.screen+"/money_counter.png");
        this.load.image('cornBullet','assets/'+BasicGame.screen+"/corn_bullet.png");
        this.load.spritesheet('explosion','assets/'+BasicGame.screen+"/explosion1.png",256, 256,12);
        this.load.spritesheet('poop','assets/'+BasicGame.screen+"/poop.png",256, 256,12);
        this.load.spritesheet('normal_attack','assets/'+BasicGame.screen+"/normal_attack.png",32, 32,12);
        this.load.image('laser','assets/'+BasicGame.screen+"/laser.png");
        this.load.tilemap('lvl1_map', 'assets/'+BasicGame.screen+"/level_1.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lvl2_map', 'assets/'+BasicGame.screen+"/level_2.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('lvl3_map', 'assets/'+BasicGame.screen+"/level_3.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image('stopButton','assets/'+BasicGame.screen+"/stop_ingame_button.png");
        this.load.image('stopButtonPressed','assets/'+BasicGame.screen+"/stop_ingame_button_pressed.png");
        this.load.image('playButton','assets/'+BasicGame.screen+"/play_ingame_button.png");
        this.load.image('playButtonPressed','assets/'+BasicGame.screen+"/play_ingame_button_pressed.png");

        this.load.image('oculos','assets/'+BasicGame.screen+"/oculos.png");
        this.load.image('monoculo','assets/'+BasicGame.screen+"/monoculo.png");
        this.load.image('oculosBtn','assets/'+BasicGame.screen+"/oculosButton.png");
        this.load.image('super','assets/'+BasicGame.screen+"/super.png");
        this.load.image('superBtn','assets/'+BasicGame.screen+"/superButton.png");
        this.load.image('speed','assets/'+BasicGame.screen+"/speed.png");
        this.load.image('speedBtn','assets/'+BasicGame.screen+"/speedButton.png");

        this.load.image('upgradeMenu','assets/'+BasicGame.screen+"/chicken_info.png");

        //this.load.tilemap('test_lvl', 'assets/'+BasicGame.screen+"/teste.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset',  'assets/'+BasicGame.screen+"/tileset.png");
        this.load.image('grass',  'assets/'+BasicGame.screen+"/map1.png");
        
        this.load.image('coop_10',  'assets/'+BasicGame.screen+"/coop_10.png");
        this.load.image('coop_9',  'assets/'+BasicGame.screen+"/coop_9.png");
        this.load.image('coop_8',  'assets/'+BasicGame.screen+"/coop_8.png");
        this.load.image('coop_7',  'assets/'+BasicGame.screen+"/coop_7.png");
        this.load.image('coop_6',  'assets/'+BasicGame.screen+"/coop_6.png");
        this.load.image('coop_5',  'assets/'+BasicGame.screen+"/coop_5.png");
        this.load.image('coop_4',  'assets/'+BasicGame.screen+"/coop_4.png");
        this.load.image('coop_3',  'assets/'+BasicGame.screen+"/coop_3.png");
        this.load.image('coop_2',  'assets/'+BasicGame.screen+"/coop_2.png");
        this.load.image('coop_1',  'assets/'+BasicGame.screen+"/coop_1.png");
        this.load.image('coop_0',  'assets/'+BasicGame.screen+"/coop_0.png");
        
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
        this.load.audio('chicken_family', ['assets/sounds/happy.ogg']);
        this.load.audio('menu_music', ['assets/sounds/MenuMusic.mp3', 'assets/sounds/MenuMusic.ogg']);
        this.load.audio('click_in', ['assets/sounds/click3.ogg']);
        this.load.audio('click_out', ['assets/sounds/click4.ogg']);
        this.load.audio('laser', ['assets/sounds/laser.ogg']);
        this.load.audio('corn_attack', ['assets/sounds/corn_attack.ogg']);
        this.load.audio('explosion_sound', ['assets/sounds/explosion.ogg']);
        
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
