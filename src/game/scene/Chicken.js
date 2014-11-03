var Chicken = function (Xtile,Ytile,kind,Index,game)
{
    //A abordagem foi mudada para this.variavel, pois precisamos de uma instância de cada um destes por objeto, a var é a mesma para toda a "classe"
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.type = kind;
    this.sprite;
    this.range = 64;
    this.rangeCircle = game.add.graphics(0,0);
    this.rangeCircle.lineStyle(4,0xffffff,1);
    this.rangeCircle.beginFill(0xffffff,0.3);
    this.rangeCircle.drawCircle(0,0,this.range);
    this.rangeCircle.position.x = (-2*this.range);
    this.rangeCircle.position.y = (Ytile*64+32);
}

Chicken.prototype =
{
    attack: function(enemy)
    {
        console.log("Chicken attacked "+enemy);
    },
    setSprite: function(SPRITE)
    {
        this.sprite = SPRITE;
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.print,this);
        this.sprite.events.onInputOver.add(this.showRange,this);
        this.sprite.events.onInputOut.add(this.cleanRange,this);
    },
    print: function()
    {
        console.log("Chicken "+this.index);
        console.log("X: "+this.x);
        console.log("Y: "+this.y);
        console.log("Type: "+this.type);
    },
    showRange: function()
    {
        this.rangeCircle.position.x = (this.x*64+32 + 128);
    },
    cleanRange: function()
    {
        this.rangeCircle.position.x = (-2*this.range);
    }

};
