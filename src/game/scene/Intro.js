BasicGame.Intro = function (game) 
{

    this.clickButtonSound = null;
    this.unclickButtonSound = null;
    this.playButton = null;
    var button;

};

BasicGame.Intro.prototype = 
{

    
    create: function () 
    {
        this.startSounds();
        this.add.sprite(0,0,'introBg');
        
        var title = this.add.sprite(BasicGame.convertWidth(200),BasicGame.convertHeight(-300),'title');
        this.game.add.tween(title).to({y:BasicGame.convertHeight(50)}, BasicGame.convertHeight(100), Phaser.Easing.Bounce.Out, true);
        button = this.add.sprite(BasicGame.viewX,BasicGame.viewY,'introPlayBtn');
        
        var chicken = this.add.sprite(BasicGame.convertWidth(0),BasicGame.convertHeight(1000),'intro_longie');
        this.game.add.tween(chicken).to({y:BasicGame.convertHeight(10)}, BasicGame.convertHeight(100), Phaser.Easing.Linear.NONE, true);
        //Align to bottom right edge
        button.position.x = BasicGame.convertWidth(250);
        button.position.y = BasicGame.convertHeight(250);
        button.inputEnabled = true;
        button.events.onInputDown.add(this.onClick,this);
        button.events.onInputUp.add(this.onClickReleased,this);
        
        
    },
    
    onClick:function()
    {
        this.clickButtonSound.play();
        button.loadTexture('introPlayBtnPressed',0);     
    },
    
    onClickReleased:function()
    {   
        this.unclickButtonSound.play();
        button.loadTexture('introPlayBtn',0);
        this.startGame(this);
    },
    
    startSounds: function()
    {
        this.clickButtonSound = this.add.audio('click_in');
        this.unclickButtonSound = this.add.audio('click_out');
    },

    update: function () 
    {

        //    Do some nice funky main menu effect here
    },

    startGame : function () 
    {
        //    And start the actual game
        var dad = this.state;
        setTimeout(function()
        {
            dad.start('MainMenu');
        },100);
    },

};
