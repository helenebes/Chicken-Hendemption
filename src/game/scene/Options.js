// Create our pause panel extending Phaser.Group

var OptionsPanel = function(game, parent)
{
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);

	// Add the panel
	//this.panel = this.create(BasicGame.convertWidth(240),BasicGame.convertHeight(70), 'options_window');
    this.panel = this.create(1,1, 'options_window');
    this.panel.anchor.setTo(0.5, 0);

	// Add text
	//this.pauseText = this.game.add.bitmapText(100, 20, 'kenpixelblocks', 'Game paused', 24);
	//this.add(this.pauseText);
	//this.cloudsText = this.game.add.bitmapText(100, 50, 'kenpixelblocks', 'Clouds are still moving :)', 16);
	//this.add(this.cloudsText);

    
	// Add close button
	this.btnClose = this.game.add.button(190,-40, 'options_x', function()
    {
		this.game.state.getCurrentState().playGame();
        
    }, this);
	this.add(this.btnClose);
    
    this.btnQuit = this.game.add.button(-200,90, 'quit_button_sheet',function()
    {
		//this.btnQuit.loadTexture('quit_button_pressed',0);
		console.log("LOL");
        
    },this,0, 0, 1, 0);
	this.add(this.btnQuit);
    


	// Place it out of bounds
	this.x = BasicGame.convertWidth(240);
	this.y = BasicGame.convertHeight(-300);
};

OptionsPanel.prototype = Object.create(Phaser.Group.prototype);
OptionsPanel.constructor = OptionsPanel;

OptionsPanel.prototype.show = function()
{
	this.game.add.tween(this).to({y:BasicGame.convertHeight(70)}, 500, Phaser.Easing.Bounce.Out, true);

};
OptionsPanel.prototype.hide = function()
{
	this.game.add.tween(this).to({y:BasicGame.convertHeight(-300)}, 200, Phaser.Easing.Linear.NONE, true);
};