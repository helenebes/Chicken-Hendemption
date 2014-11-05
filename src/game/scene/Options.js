
var OptionsPanel = function(game, parent)
{
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);
    this.game = game;

	// Add the panel
    this.panel = this.create(1,1, 'main_options_window');
    this.panel.inputEnabled = true;
    this.panel.anchor.setTo(0.5, 0);
    
	// Add close button
	this.btnClose = this.game.add.button(190,-40, 'options_x', function()
    {
		this.game.state.getCurrentState().playGame();
        
    }, this);
	this.add(this.btnClose);

    if(BasicGame.music)
    {
        this.checkMusic = this.game.add.sprite(-210,55, 'check_true');
    } else {
        this.checkMusic = this.game.add.sprite(-210,55, 'check_false');
    }

	this.checkMusic.inputEnabled = true;
	this.add(this.checkMusic);
	this.checkMusic.events.onInputDown.add(function()
	{
		if(BasicGame.music == true)
		{
			this.checkMusic.loadTexture('check_false',0);
			this.game.state.getCurrentState().stopMusic();
			BasicGame.music = false;
		}
		else
		{
			this.checkMusic.loadTexture('check_true',0);
			this.game.state.getCurrentState().startMusic();
			BasicGame.music = true;
		}
	},this);
	
	this.adjustMusicVolume = this.game.add.sprite(-40,120, 'arrow');
	this.add(this.adjustMusicVolume);
	
    if(BasicGame.sound)
    {
        this.checkSound = this.game.add.sprite(-210,225, 'check_true');
    } else {
        this.checkSound = this.game.add.sprite(-210,225, 'check_false');
    }
	this.checkSound.inputEnabled = true;
	this.add(this.checkSound);
	this.checkSound.events.onInputDown.add(function()
	{
		if(BasicGame.sound == true)
		{
			this.checkSound.loadTexture('check_false',0);
			BasicGame.sound = false;
		}
		else
		{
			this.checkSound.loadTexture('check_true',0);
			BasicGame.sound = true;
		}
	},this);
	
	this.adjustSoundVolume = this.game.add.sprite(-40,290, 'arrow');
	this.add(this.adjustSoundVolume);

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

OptionsPanel.prototype.check = function()
{
	console.log("OH YEAH");
};
