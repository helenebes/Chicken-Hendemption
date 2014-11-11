// Create our pause panel extending Phaser.Group

var InGameOptionsPanel = function(game, parent)
{
    // Super call to Phaser.Group
    Phaser.Group.call(this, game,parent);

    
    // Add the panel
    this.panel = this.create(1,1, 'options_window');
    this.panel.anchor.setTo(0.5, 0);
    
    // Add close button
    this.btnClose = this.game.add.button(190,-40, 'options_x', function()
    {
        this.game.state.getCurrentState().playGame();
        
    }, this);
    this.add(this.btnClose);
    
    this.btnQuit = this.game.add.button(-200,70, 'quit_button_sheet',function()
    {
        this.game.state.getCurrentState().quitGame();
        
    },this,0, 0, 1, 0);
    this.add(this.btnQuit);
    
    this.btnReset = this.game.add.button(-200,200, 'reset_button_sheet',function()
    {
    this.game.state.getCurrentState().reloadLevel();    
    },this,0, 0, 1, 0);
    this.add(this.btnReset);
    
    this.btnOpt = this.game.add.button(-200,350, 'more_opt_sheet',function()
    {
        this.game.state.getCurrentState().changeMenu();
        //BasicGame.optionsPanel.show();
        
    },this,0, 0, 1, 0);
    this.add(this.btnOpt);

    // Place it out of bounds
    this.x = BasicGame.convertWidth(240);
    this.y = BasicGame.convertHeight(-300);
};

InGameOptionsPanel.prototype = Object.create(Phaser.Group.prototype);
InGameOptionsPanel.constructor = InGameOptionsPanel;

InGameOptionsPanel.prototype.show = function()
{
    this.game.add.tween(this).to({y:BasicGame.convertHeight(70)}, 500, Phaser.Easing.Bounce.Out, true);

};
InGameOptionsPanel.prototype.hide = function()
{
    this.game.add.tween(this).to({y:BasicGame.convertHeight(-300)}, 200, Phaser.Easing.Linear.NONE, true);
};
