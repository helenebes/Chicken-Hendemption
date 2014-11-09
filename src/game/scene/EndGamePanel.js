var EndGamePanel = function(game, finishingState, goldenEggsNum, parent)
{
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent); 
    this.game = game;

    if(finishingState == "victory")
    {
        this.panel = this.create(1,1, 'victory_window');
        this.panel.anchor.setTo(0.5, 0);
		if (BasicGame.currentLevel < 3) 
		{
		    this.btnNext = this.game.add.button(50,250, 'nextLvlB',function()
		    {
				this.game.state.getCurrentState().nextLevel();
		        
		    },this,0, 0, 1, 0);
		    this.add(this.btnNext);
		}
    }
    if(finishingState == "defeat")
    {
        this.panel = this.create(1,1, 'defeat_window');
        this.panel.anchor.setTo(0.5, 0);
        this.btnNext = this.game.add.sprite(50,250, 'nextLvlBDisabled');
        this.add(this.btnNext);
    }
    this.btnQuit = this.game.add.button(-310,250, 'quitB',function()
    {
		this.game.state.getCurrentState().quitGame();
        
    },this,0, 0, 1, 0);
	this.add(this.btnQuit);
    
    this.btnRetry = this.game.add.button(-130,250, 'retryB',function()
    {
	    //this.game.state.start('Game');
        this.game.level.reloadLevel();
        
    },this,0, 0, 1, 0);
	this.add(this.btnRetry);
    
    
    for(var i = 0; i < 3; i++)
    {
        if( i < goldenEggsNum)
        {
            this.egg = this.game.add.sprite(-140+i*112,150, 'golden_egg');
        }
        else
        {
            this.egg = this.game.add.sprite(-140+i*112,150, 'no_egg');
        }    
        
        this.add(this.egg);
    }
    
    //this.egg = this.game.add.sprite(-126,150, 'golden_egg');
    //this.add(this.egg);
    
    //this.egg = this.game.add.sprite(-29,150, 'golden_egg');
    //this.add(this.egg);
    
    //this.egg = this.game.add.sprite(76,150, 'golden_egg');
    //this.add(this.egg);
    
	// Place it out of bounds
	this.x = BasicGame.convertWidth(240);
	this.y = BasicGame.convertHeight(-300);
};

EndGamePanel.prototype = Object.create(Phaser.Group.prototype);
EndGamePanel.constructor = EndGamePanel;

EndGamePanel.prototype.show = function()
{
	this.game.add.tween(this).to({y:BasicGame.convertHeight(70)}, 500, Phaser.Easing.Bounce.Out, true);
};
EndGamePanel.prototype.hide = function()
{
	this.game.add.tween(this).to({y:BasicGame.convertHeight(-300)}, 200, Phaser.Easing.Linear.NONE, true);
};
