var Coop = function (Xtile,Ytile,gameContext)
{
    this.sprite = gameContext.add.sprite((Xtile*64) + 16,(Ytile*64) - 16,'coop_10');
    this.eggCounter = 10;
    this.gameContext = gameContext;
}

Coop.prototype =
{
    removeEgg: function()
    {
        this.eggCounter--;
        this.sprite.loadTexture('coop_' + this.eggCounter ,0);
        if(this.eggCounter <= 0)
        {  
            this.gameContext.game.state.getCurrentState().gameOver();
        }
    }
};
