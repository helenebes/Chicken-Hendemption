var Window = function(game, windowType, parent)
{
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent); 
    this.game = game;

    switch(windowType)
    {
        case "How To Play":
        
            this.panel = this.create(1,1, 'how_to_play');

            break;
        case "Chickens":
            
            this.panel = this.create(1,1, 'chicken_info_1');
            var i = 1;
            this.btnRight = this.game.add.button(780,540, 'right_arrow', function()
            {
                if(i < 3)
                {
                    i++;
                    this.panel.loadTexture('chicken_info_'+ i,0);
                }

            }, this,0, 0, 1, 0);
            this.add(this.btnRight);
            this.btnLeft = this.game.add.button(680,540, 'left_arrow', function()
            {
                if(i > 1)
                {
                    i--;
                    this.panel.loadTexture('chicken_info_'+ i,0);
                }

            }, this,0, 0, 1, 0);
            this.add(this.btnLeft);
            break;
        case "Enemies":
            this.panel = this.create(1,1, 'enemie_info_1');
            var i = 1;
            this.btnRight = this.game.add.button(780,540, 'right_arrow', function()
            {
                if(i < 2)
                {
                    i++;
                    this.panel.loadTexture('enemie_info_'+ i,0);
                }

            }, this,0, 0, 1, 0);
            this.add(this.btnRight);
            this.btnLeft = this.game.add.button(680,540, 'left_arrow', function()
            {
                if(i > 1)
                {
                    i--;
                    this.panel.loadTexture('enemie_info_'+ i,0);
                }

            }, this,0, 0, 1, 0);
            this.add(this.btnLeft);
            break;
    }
    
    this.btnClose = this.game.add.button(840,-40, 'options_x', function()
    {
        this.game.state.getCurrentState().playGame(windowType);
        
    }, this);
    this.add(this.btnClose);
    
	// Place it out of bounds
	this.x = BasicGame.convertWidth(90);
	this.y = BasicGame.convertHeight(-300);
};

Window.prototype = Object.create(Phaser.Group.prototype);
Window.constructor = Window;

Window.prototype.show = function()
{
	this.game.add.tween(this).to({y:BasicGame.convertHeight(50)}, 500, Phaser.Easing.Bounce.Out, true);
};
Window.prototype.hide = function()
{
	this.game.add.tween(this).to({y:BasicGame.convertHeight(-300)}, 200, Phaser.Easing.Linear.NONE, true);
};