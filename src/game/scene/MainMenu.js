
BasicGame.MainMenu = function (game) 
{

	this.music = null;
	this.playButton = null;
    var lvl1;
    var lvl2;
    var lvl3;
    var opt;
    var chickenInfo;
    var enemieInfo;
    var howToPlayInfo;
    var back;
    var paused;
	//this.optionsPanel;
	

};

BasicGame.MainMenu.prototype = 
{

    
	create: function () 
    {
        
        this.startMusic();
        
		this.add.sprite(0,0,'menuBg');
        
        lvl1 = this.add.sprite(BasicGame.convertWidth(100),BasicGame.convertHeight(140),'lvl1');
        lvl2 = this.add.sprite(BasicGame.convertWidth(190),BasicGame.convertHeight(140),'lvl2');
        lvl3 = this.add.sprite(BasicGame.convertWidth(280),BasicGame.convertHeight(140),'lvl3');
        opt = this.add.sprite(BasicGame.convertWidth(453),BasicGame.convertHeight(5),'opt');
        chickenInfo = this.add.sprite(BasicGame.convertWidth(90),BasicGame.convertHeight(278),'chickenB');
        enemieInfo = this.add.sprite(BasicGame.convertWidth(210),BasicGame.convertHeight(278),'enemiesB');
        howToPlayInfo = this.add.sprite(BasicGame.convertWidth(330),BasicGame.convertHeight(270),'howToPlayB');
        back = this.add.sprite(BasicGame.convertWidth(20),BasicGame.convertHeight(270),'back');
        
		lvl1.inputEnabled = true;
		lvl1.events.onInputDown.add(this.onClick,{buttonName:"level 1",prescope: this});
        lvl1.events.onInputUp.add(this.onClickReleased,{buttonName:"level 1",prescope: this});
               
		lvl2.inputEnabled = true;
		lvl2.events.onInputDown.add(this.onClick,{buttonName:"level 2",prescope: this});
        lvl2.events.onInputUp.add(this.onClickReleased,{buttonName:"level 2",prescope: this});
            
		lvl3.inputEnabled = true;
		lvl3.events.onInputDown.add(this.onClick,{buttonName:"level 3",prescope: this});
        lvl3.events.onInputUp.add(this.onClickReleased,{buttonName:"level 3",prescope: this});
             
		opt.inputEnabled = true;
		opt.events.onInputDown.add(this.onClick,{buttonName:"options",prescope: this});
        opt.events.onInputUp.add(this.onClickReleased,{buttonName:"options",prescope: this});
        
		chickenInfo.inputEnabled = true;
		chickenInfo.events.onInputDown.add(this.onClick,{buttonName:"chicken info",prescope: this});
        chickenInfo.events.onInputUp.add(this.onClickReleased,{buttonName:"chicken info",prescope: this});
        
		enemieInfo.inputEnabled = true;
		enemieInfo.events.onInputDown.add(this.onClick,{buttonName:"enemy info",prescope: this});
        enemieInfo.events.onInputUp.add(this.onClickReleased,{buttonName:"enemy info",prescope: this});
        
		howToPlayInfo.inputEnabled = true;
		howToPlayInfo.events.onInputDown.add(this.onClick,{buttonName:"how to play",prescope: this});
        howToPlayInfo.events.onInputUp.add(this.onClickReleased,{buttonName:"how to play",prescope: this});
        
		back.inputEnabled = true;
		back.events.onInputDown.add(this.onClickReleased,{buttonName:"back",prescope: this});
        
        
		//this.optionsPanel = new OptionsPanel(this);
        BasicGame.optionsPanel = new OptionsPanel(this);
		this.game.add.existing(BasicGame.optionsPanel);
        paused = false;
        
		/*
		//Aligning HUD to view edges
		//Align to left top edge
		var q = this.add.sprite(BasicGame.viewX,BasicGame.viewY,'playBtn');
		
		//Align to bottom right edge
		q.position.x = BasicGame.viewWidth - q.width;
		q.position.y = BasicGame.viewHeight - q.height;
		q.inputEnabled = true;
		q.events.onInputDown.add(this.onClick,this);
        
        var poopie = this.add.sprite(BasicGame.convertWidth(4),BasicGame.convertHeight(125),'longie');
        poopie.scale.x = 0.7;
        poopie.scale.y = 0.7;
        poopie_H = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(75),'poopie_highlighted');
        poopie_H.inputEnabled = true;
        poopie_H.scale.x = 0.8;
        poopie_H.scale.y = 0.8;
        
        var mummy = this.add.sprite(BasicGame.convertWidth(200), BasicGame.convertHeight(200), 'mummy', 5);
        mummy.scale.set(4);
        var anim = mummy.animations.add('walk');
        mummy.play('walk', 10, true);
        
        var dog = this.add.sprite(BasicGame.convertWidth(250), BasicGame.convertHeight(200), 'dog', 1);
        dog.scale.set(4);
        var anim2 = dog.animations.add('walk', [3,4,5]);
        dog.play('walk',5, true);
        
        var lag = this.add.sprite(BasicGame.convertWidth(300), BasicGame.convertHeight(5), 'lagarto', 1);
        //lag.scale.set(0.4);
        var anim3 = lag.animations.add('walk down', [0,1,2,1]);
        var anim3 = lag.animations.add('walk left', [3,4,5,4]);
        var anim3 = lag.animations.add('walk right', [6,7,8,6]);
        var anim3 = lag.animations.add('walk up', [9,10,11,10]);
        lag.play('walk up',5, true);
        
        var normal = this.add.sprite(BasicGame.convertWidth(4),BasicGame.convertHeight(185),'normal');
        normal.scale.x = 0.7;
        normal.scale.y = 0.7;
        
        poopie_H.events.onInputOver.add(this.onMouseOver,this);
        poopie_H.events.onInputOut.add(this.onMouseOut,this);
        */
        
        
        
	},
	
    pauseGame: function()
    {
        
    },

    playGame: function()
    {
        if(paused)
        {
            // Hide panel
            paused = false;
            BasicGame.optionsPanel.hide();
			//this.optionsPanel.hide();
		}
    },
    
    onMouseOver:function()
    {
        poopie_H.scale.x = 0.9;
        poopie_H.scale.y = 0.9;
    },
    
    onMouseOut:function()
    {
        poopie_H.scale.x = 0.8;
        poopie_H.scale.y = 0.8;
    },
    
	onClick:function(buttonName)
    {
        switch(this.buttonName)
        {
            case "level 1":
                lvl1.loadTexture('lvl1_pressed',0);
                break;
            case "level 2":
                lvl2.loadTexture('lvl2_pressed',0);
                break;
            case "level 3":
                lvl3.loadTexture('lvl3_pressed',0);
                break;
            case "options":
                opt.loadTexture('opt_pressed',0);
                break;
            case "chicken info":
                chickenInfo.loadTexture('chickenB_pressed',0);
                break;
            case "enemy info":
                enemieInfo.loadTexture('enemiesB_pressed',0);
                break;
            case "how to play":
                howToPlayInfo.loadTexture('howToPlayB_pressed',0);
                break;
        }
		
        
	},
    onClickReleased:function(buttonName,prescope)
    {
        switch(this.buttonName)
        {
            case "level 1":
                lvl1.loadTexture('lvl1',0);
                this.prescope.startGame(this); 
                break;
            case "level 2":
                lvl2.loadTexture('lvl2',0);
                break;
            case "level 3":
                lvl3.loadTexture('lvl3',0);
                break;
            case "options":
                opt.loadTexture('opt',0);
                if(!paused)
                {
                    // Show panel
                    paused = true;
                    BasicGame.optionsPanel.show();
                    //this.optionsPanel.show();
                }
                break;
            case "chicken info":
                chickenInfo.loadTexture('chickenB',0);
                break;
            case "enemy info":
                enemieInfo.loadTexture('enemiesB',0);
                break;
            case "how to play":
                howToPlayInfo.loadTexture('howToPlayB',0);
                break;
            case "back":
                this.prescope.state.start('Intro');
        }
	},
    
	update: function () 
    {

		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) 
    {
        this.stopMusic();
        var dad = this.state;
        setTimeout(function()
        {
            dad.start('Game');
        },100);
		//	And start the actual game
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
        this.music = this.add.audio('menu_music');
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
