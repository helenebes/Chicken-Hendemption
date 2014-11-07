var Chicken = function (Xtile,Ytile,Index,gameContext)
{
    //A abordagem foi mudada para this.variavel, pois precisamos de uma instância de cada um destes por objeto, a var é a mesma para toda a "classe"
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.lastAttack = 0;
    this.attackSpeed = 50;

    this.sprite = gameContext.add.sprite((Xtile*64),((Ytile*64+5)),'normalP');
    //console.log(this);
    this.rangeSprite = gameContext.add.graphics(0,0);
    this.range = 64;

    this.setSprite();
    this.setRange();
    this.cleanRange();
}

Chicken.prototype =
{
    attack: function(enemy)
    {
        enemy.enemy.isAttacked(10);
    },
    detectEnemies: function()
    {
        for(var i=0;i<this.gameContext.game.enemies.length;i++)
        {
            if(this.rangeCircle.contains(this.gameContext.game.enemies[i].enemy.x,this.gameContext.game.enemies[i].enemy.y))
            {
                this.attack(this.gameContext.game.enemies[i]);
                break;
            }
        }
    },
    setSprite: function()
    {
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.detectEnemies,this);
        this.sprite.events.onInputOver.add(this.showRange,this);
        this.sprite.events.onInputOut.add(this.cleanRange,this);
        this.gameContext.chickenLayers[this.y].add(this.sprite);
    },
    setRange: function()
    {
        this.rangeSprite.lineStyle(2,0xffffff,1);
        this.rangeSprite.beginFill(0xffffff,0.15);
        this.rangeSprite.drawCircle(0,0,this.range);
        this.rangeSprite.position.x = (this.x*64+32);
        this.rangeSprite.position.y = (this.y*64+32);
        this.rangeCircle = new Phaser.Circle(this.x*64+32,this.y*64+32,2*this.range);
    },
    update: function()
    {
        if(this.gameContext.game.time.now > (this.lastAttack + 500-this.attackSpeed))
        {
            this.detectEnemies();
            this.lastAttack = this.gameContext.game.time.now;
        }
        else
        {
            console.log("Too early");
            }
    },
    print: function()
    {
        console.log("Chicken "+this.index);
        console.log("X: "+this.x);
        console.log("Y: "+this.y);
        
    },
    showRange: function()
    {
          this.rangeSprite.alpha = 1;
    },
    cleanRange: function()
    {
          this.rangeSprite.alpha = 0;
    }

};

var Longie = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 3*64;
    this.lastAttack = 0;
    this.attackSpeed = 50;

    this.sprite = gameContext.add.sprite(Xtile*64,(Ytile*64-31),'longieP');

    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
}

Longie.prototype = Object.create(Chicken.prototype);
Longie.prototype.print = function()
{
    console.log("Longie is special");
};
Longie.prototype.attack = function(enemy)
{
    this.gameContext.createBullet(this.x*64+32,this.y*64,enemy.enemy);
};

var Poopie = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 256;
    this.lastAttack = 0;
    this.attackSpeed = 50;

    this.sprite = gameContext.add.sprite(Xtile*64-8,(Ytile*64+15),'poopieP');
    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
}

Poopie.prototype = Object.create(Chicken.prototype);
Poopie.prototype.print = function()
{
    console.log("Poopie is special");
};
Poopie.prototype.attack = function(enemy)
{
   enemy.enemy.speed = 1;
};
Poopie.prototype.detectEnemies = function()
{
    for(var i=0;i<this.gameContext.game.enemies.length;i++)
    {
        if(this.rangeCircle.contains(this.gameContext.game.enemies[i].enemy.x,this.gameContext.game.enemies[i].enemy.y))
        {
            this.attack(this.gameContext.game.enemies[i]);
        }
    }
};

var Fartie = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 3*64;
    this.lastAttack = 0;
    this.attackSpeed = 50;

    this.sprite = gameContext.add.sprite(Xtile*64,(Ytile*64-8),'fartieP');
    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
}

Fartie.prototype = Object.create(Chicken.prototype);
Fartie.prototype.print = function()
{
    console.log("Fartie is special");
};
Fartie.prototype.detectEnemies = function()
{
    for(var i=0;i<this.gameContext.game.enemies.length;i++)
    {
        if(this.rangeCircle.contains(this.gameContext.game.enemies[i].enemy.x,this.gameContext.game.enemies[i].enemy.y))
        {
            this.attack(this.gameContext.game.enemies[i]);
        }
    }
};

var Robot = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 64;
    this.lastAttack = 0;
    this.attackSpeed = 50;

    this.sprite = gameContext.add.sprite(Xtile*64-8,(Ytile*64-14),'robotP');
    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
}

Robot.prototype = Object.create(Chicken.prototype);
Robot.prototype.print = function()
{
    console.log("Robot is special");
};

