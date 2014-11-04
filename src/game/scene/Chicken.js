var Chicken = function (Xtile,Ytile,Index,game)
{
    //A abordagem foi mudada para this.variavel, pois precisamos de uma instância de cada um destes por objeto, a var é a mesma para toda a "classe"
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.sprite = game.add.sprite((Xtile*64),((Ytile*64+5)),'normalP');
    this.rangeCircle = game.add.graphics(0,0);
    this.range = 64;

    this.setSprite();
    this.setRange();
}

Chicken.prototype =
{
    attack: function(enemy)
    {
        console.log("Chicken attacked "+enemy);
    },
    setSprite: function()
    {
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.print,this);
        this.sprite.events.onInputOver.add(this.showRange,this);
        this.sprite.events.onInputOut.add(this.cleanRange,this);
    },
    setRange: function()
    {
        this.rangeCircle.lineStyle(2,0xffffff,1);
        this.rangeCircle.beginFill(0xffffff,0.15);
        this.rangeCircle.drawCircle(0,0,this.range);
        this.rangeCircle.position.x = (-2*this.range);
        this.rangeCircle.position.y = (this.y*64+32);
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
        this.rangeCircle.position.x = (this.x*64+32);
    },
    cleanRange: function()
    {
        this.rangeCircle.position.x = (-2*this.range);
    }

};

var Longie = function (Xtile,Ytile,Index,game)
{
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 3*64;

    this.sprite = game.add.sprite(Xtile*64,(Ytile*64-31),'longieP');
    this.rangeCircle = game.add.graphics(0,0);

    this.setSprite();
    this.setRange();
}

Longie.prototype = Object.create(Chicken.prototype);
Longie.prototype.print = function()
{
    console.log("Longie is special");
};

var Poopie = function (Xtile,Ytile,Index,game)
{
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 128;

    this.sprite = game.add.sprite(Xtile*64-8,(Ytile*64+15),'poopieP');
    this.rangeCircle = game.add.graphics(0,0);

    this.setSprite();
    this.setRange();
}

Poopie.prototype = Object.create(Chicken.prototype);
Poopie.prototype.print = function()
{
    console.log("Poopie is special");
};

var Fartie = function (Xtile,Ytile,Index,game)
{
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 64;

    this.sprite = game.add.sprite(Xtile*64,(Ytile*64-8),'fartieP');
    this.rangeCircle = game.add.graphics(0,0);

    this.setSprite();
    this.setRange();
}

Fartie.prototype = Object.create(Chicken.prototype);
Fartie.prototype.print = function()
{
    console.log("Fartie is special");
};

var Robot = function (Xtile,Ytile,Index,game)
{
    this.index = Index;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 64;

    this.sprite = game.add.sprite(Xtile*64-8,(Ytile*64-14),'robotP');
    this.rangeCircle = game.add.graphics(0,0);

    this.setSprite();
    this.setRange();
}

Robot.prototype = Object.create(Chicken.prototype);
Robot.prototype.print = function()
{
    console.log("Robot is special");
};

