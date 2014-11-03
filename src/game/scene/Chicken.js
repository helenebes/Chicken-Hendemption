var Chicken = function (Xtile,Ytile,kind,Index)
{
    //A abordagem foi mudada para this.variavel, pois precisamos de uma instância de cada um destes por objeto, a var é a mesma para toda a "classe"
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.type = kind;
    this.sprite;
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
    },
    print: function()
    {
        console.log("Chicken "+this.index);
        console.log("X: "+this.x);
        console.log("Y: "+this.y);
        console.log("Type: "+this.type);
    }

};
