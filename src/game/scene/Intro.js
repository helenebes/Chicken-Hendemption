BasicGame.Intro = function (game) 
{

	this.music = null;
	this.playButton = null;
    var button;

};

BasicGame.Intro.prototype = 
{

    
	create: function () 
    {
        this.add.sprite(0,0,'introBg');
        
        this.add.sprite(BasicGame.convertWidth(200),BasicGame.convertHeight(50),'title');
        
        button = this.add.sprite(BasicGame.viewX,BasicGame.viewY,'introPlayBtn');
		
		//Align to bottom right edge
		button.position.x = BasicGame.convertWidth(250);
		button.position.y = BasicGame.convertHeight(250);
		button.inputEnabled = true;
		button.events.onInputDown.add(this.onClick,this);
        button.events.onInputUp.add(this.onClickReleased,this);
        
        
	},
	
    onMouseOver:function()
    {

    },
    
    onMouseOut:function()
    {

    },
    
	onClick:function()
    {
		button.loadTexture('introPlayBtnPressed',0);     
	},
    
    onClickReleased:function()
    {   
		button.loadTexture('introPlayBtn',0);
        this.startGame(this);
	},

	update: function () 
    {

		//	Do some nice funky main menu effect here
	},

	startGame : function () 
    {
        //	And start the actual game
        var dad = this.state;
        setTimeout(function()
        {
            dad.start('MainMenu');
        },100);
	},
    
    /*when: function(condition,then) 
    {
    // condition must be a callback that returns `true` when the condition is met
    if( condition()) then();
    else setTimeout(function() {when(condition,then);},1000);
    }*/
    
    sleep: function (milliseconds) 
    {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) 
        {
            if ((new Date().getTime() - start) > milliseconds)
            {
                break;
            }
        }
    }

};