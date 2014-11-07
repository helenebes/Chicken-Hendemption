
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
		this.game.state.getCurrentState().playGame("Options");
        
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
			BasicGame.music = true;
			this.game.state.getCurrentState().resumeMusic();
		}
	},this);
	
	this.adjustMusicVolume = this.game.add.sprite(BasicGame.musicVolume*333 -195,120, 'arrow');
    this.musicSlider = new Phaser.Rectangle(-195,120,372,58);
    this.adjustMusicVolume.inputEnabled = true;
    this.adjustMusicVolume.input.enableDrag(true);
    this.adjustMusicVolume.input.boundsRect = this.musicSlider;
    this.adjustMusicVolume.events.onInputUp.add(function()
    {
        BasicGame.musicVolume = (this.adjustMusicVolume.position.x + 195)/333;
		this.game.state.getCurrentState().updateVolume();
        console.log("Music Volume: "+BasicGame.musicVolume);
    },this);

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
	
	this.adjustSoundVolume = this.game.add.sprite(BasicGame.soundVolume*333 -195,284, 'arrow');
    this.soundSlider = new Phaser.Rectangle(-195,284,372,58);
    this.adjustSoundVolume.inputEnabled = true;
    this.adjustSoundVolume.input.enableDrag(true);
    this.adjustSoundVolume.input.boundsRect = this.soundSlider;
    this.adjustSoundVolume.events.onInputUp.add(function()
    {
        BasicGame.soundVolume = (this.adjustSoundVolume.position.x + 195)/333;
		this.game.state.getCurrentState().updateVolume();
        console.log("Sound Volume: "+BasicGame.soundVolume);
    },this);
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
