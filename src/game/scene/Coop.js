var Coop = function (Xtile,Ytile, InitialEggsNum, gameContext)
{
    this.sprite = gameContext.add.sprite((Xtile*64) + 16,(Ytile*64) - 16,'coop_'+ InitialEggsNum);
    this.eggCounter = InitialEggsNum;
    this.gameContext = gameContext;
}

Coop.prototype =
{
    removeEgg: function()
    {
        this.eggCounter--;
		console.log("remove egg");
        this.sprite.loadTexture('coop_' + this.eggCounter ,0);
        if(this.eggCounter <= 0)
        {  
            this.gameContext.game.state.getCurrentState().gameOver();
        }
    }
};
