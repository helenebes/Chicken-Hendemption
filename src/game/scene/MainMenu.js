
BasicGame.MainMenu = function (game) 
{

	this.music = null;
	this.playButton = null;
    var lvl1;
    var lvl2;
    var lvl3;
    var opt;
    var back;
    var paused;
    var optionsPanel;


};

BasicGame.MainMenu.prototype = 
{

    
	create: function () 
    {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
        
        
        //this.stage.smoothed = false;      
		this.add.sprite(0,0,'menuBg');
        
        lvl1 = this.add.sprite(BasicGame.convertWidth(100),BasicGame.convertHeight(140),'lvl1');
		lvl1.inputEnabled = true;
		lvl1.events.onInputDown.add(this.onClick,this);
        lvl1.events.onInputUp.add(this.onClickReleased,this);
        
        lvl2 = this.add.sprite(BasicGame.convertWidth(190),BasicGame.convertHeight(140),'lvl2');
		lvl2.inputEnabled = true;
		lvl2.events.onInputDown.add(this.onClick,this);
        lvl2.events.onInputUp.add(this.onClickReleased,this);
        
        lvl3 = this.add.sprite(BasicGame.convertWidth(280),BasicGame.convertHeight(140),'lvl3');
		lvl3.inputEnabled = true;
		lvl3.events.onInputDown.add(this.onClick,this);
        lvl3.events.onInputUp.add(this.onClickReleased,this);
             
        opt = this.add.sprite(BasicGame.convertWidth(453),BasicGame.convertHeight(5),'opt');
		opt.inputEnabled = true;
		opt.events.onInputDown.add(this.onClickOptions,this);
        opt.events.onInputUp.add(this.onClickOptionsReleased,this);
        
        back = this.add.sprite(BasicGame.convertWidth(20),BasicGame.convertHeight(270),'back');
		back.inputEnabled = true;
		back.events.onInputDown.add(this.onClickBack,this);
        
        
		optionsPanel = new OptionsPanel(this);
        this.add.existing(optionsPanel);
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
            optionsPanel.hide();
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
    
	onClick:function()
    {
		lvl1.loadTexture('lvl1_pressed',0);
        
	},
    onClickReleased:function()
    {
		lvl1.loadTexture('lvl1',0);
        this.startGame(this);
	},
    
    onClickOptions: function()
    {
        opt.loadTexture('opt_pressed',0);
    },
    
    onClickOptionsReleased: function()
    {
        opt.loadTexture('opt',0);
        if(!paused)
        {
            // Show panel
            paused = true;
            optionsPanel.show();
        }
    },
    
    onClickBack: function()
    {
        this.state.start('Intro');
    },
    

	update: function () 
    {

		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) 
    {


        var dad = this.state;
        setTimeout(function()
        {
            dad.start('Game');
        },100);
		//	And start the actual game

	}

};
