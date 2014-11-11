// Standard Chicken
var Chicken = function (Xtile,Ytile,Index,gameContext)
{
    //A abordagem foi mudada para this.variavel, pois precisamos de uma instância de cada um destes por objeto, a var é a mesma para toda a "classe"
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.lastAttack = 0;
    this.attackSpeed = 25;
    this.damage = 12;
    
    this.sprite = gameContext.add.sprite((Xtile*64),((Ytile*64+5)),'normalP');
    //console.log(this);
    this.rangeSprite = gameContext.add.graphics(0,0);
    this.range = 96;

    this.setSprite();
    this.setRange();
    this.cleanRange();
    this.initializeAttackEffect();
    this.setUpgradeButton();
}
Chicken.prototype =
{
    attack: function(enemy)
    {
        this.lastAttack = this.gameContext.game.time.now;
        enemy.isAttacked(this.damage);
        this.attackEffect.alpha = 1;
        this.attackEffect.animations.play('attacking', 10, false);
        this.attackEffect.position.x = enemy.enemy.centrex;
        this.attackEffect.position.y = enemy.enemy.centrey;
        
        var attack = this.attackEffect;
	this.gameContext.world.bringToTop(this.attackEffect);
        
        setTimeout(function()
        {
           attack.alpha = 0;
        },200)
    },
    detectEnemies: function()
    {
        for(var i=0;i<this.gameContext.game.enemies.length;i++)
        {
            if(this.rangeCircle.contains(this.gameContext.game.enemies[i].enemy.centrex,this.gameContext.game.enemies[i].enemy.centrey))
            {
                this.attack(this.gameContext.game.enemies[i]);
                break;
            }
        }
    },
    initializeAttackEffect: function()
    {

        this.attackEffect = this.gameContext.add.sprite(this.x*64-96,this.y*64-96, 'normal_attack');
        var anim = this.attackEffect.animations.add('attacking');
        this.attackEffect.alpha = 0;
        this.gameContext.effectsLayer.add(this.attackEffect);
    },
    setSprite: function()
    {
        this.sprite.inputEnabled = true;
        this.showingUpgradeWindow = false;
        this.sprite.events.onInputDown.add(function()
                {
                    if(this.showingUpgradeWindow == false)
                        this.showUpgradeWindow();
                    else
                        this.cleanUpgradeWindow();
                },this);
        this.sprite.events.onInputOver.add(this.showRange,this);
        this.sprite.events.onInputOut.add(this.cleanRange,this);
        this.gameContext.chickenLayers[this.y].add(this.sprite);
    },
    setRange: function()
    {
        this.rangeSprite.lineStyle(2,0xffffff,1);
        this.rangeSprite.beginFill(0xffffff,0.15);
        this.drawnCircle = this.rangeSprite.drawCircle(0,0,this.range);
        this.rangeSprite.position.x = (this.x*64+32);
        this.rangeSprite.position.y = (this.y*64+32);
        this.rangeCircle = new Phaser.Circle(this.x*64+32,this.y*64+32,2*this.range);
    },
    update: function()
    {
        if(this.gameContext.game.time.now > (this.lastAttack + 5000/this.attackSpeed))
        {
            this.detectEnemies();
        }
    },
    setUpgradeButton: function()
    {
        this.speedUpgraded = false;
        this.rangeUpgraded = false;
        this.damageUpgraded = false;
        var upRange = UpgradeRange.bind(this);
        var upSpeed = UpgradeSpeed.bind(this);
        var upDamage = UpgradeDamage.bind(this);

        this.upgradeWindow = this.gameContext.add.sprite(-200,-200,'upgradeMenu');

        this.upgradeRangeButton = this.gameContext.add.sprite(-200,-200,'oculos');
        this.upgradeRangeButton.inputEnabled = true; 
        this.upgradeRangeButton.events.onInputDown.add(function(){upRange(this)},this); 

        this.upgradeDamageButton = this.gameContext.add.sprite(-200,-200,'super');
        this.upgradeDamageButton.inputEnabled = true; 
        this.upgradeDamageButton.events.onInputDown.add(function(){upDamage(this)},this); 

        this.upgradeSpeedButton = this.gameContext.add.sprite(-200,-200,'speed');
        this.upgradeSpeedButton.inputEnabled = true; 
        this.upgradeSpeedButton.events.onInputDown.add(function(){upSpeed(this)},this); 
    },
    showUpgradeWindow: function()
    {
        this.upgradeWindow.position.x =this.x*64+64;
        this.upgradeWindow.position.y =this.y*64;

        this.upgradeRangeButton.position.x =this.x*64+95;
        this.upgradeRangeButton.position.y =this.y*64+18;

        this.upgradeDamageButton.position.x =this.x*64+95;
        this.upgradeDamageButton.position.y =this.y*64+52;

        this.upgradeSpeedButton.position.x =this.x*64+105;
        this.upgradeSpeedButton.position.y =this.y*64+98;
        
        this.showingUpgradeWindow = true;
    },
    cleanUpgradeWindow: function()
    {
        this.upgradeWindow.position.x =-200;
        this.upgradeWindow.position.y =-200;

        this.upgradeRangeButton.position.x =-200;
        this.upgradeRangeButton.position.y =-200;

        this.upgradeDamageButton.position.x =-200;
        this.upgradeDamageButton.position.y =-200;

        this.upgradeSpeedButton.position.x =-200;
        this.upgradeSpeedButton.position.y =-200;

        this.showingUpgradeWindow = false;
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
//AOE Chicken
//Stands for Area Of Effect, these chickens have a modified detectEnemies functions that targets all enemies in range
//Inherits from Standard Chicken
var AOEChicken = function (Xtile,Ytile,Index,gameContext)
{
    //A abordagem foi mudada para this.variavel, pois precisamos de uma instância de cada um destes por objeto, a var é a mesma para toda a "classe"
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.lastAttack = 0;
    this.attackSpeed = 50;
    this.damage = 10;

    this.sprite = gameContext.add.sprite((Xtile*64),((Ytile*64+5)),'normalP');
    //console.log(this);
    this.rangeSprite = gameContext.add.graphics(0,0);
    this.range = 64;

    this.setSprite();
    this.setRange();
    this.cleanRange();
    this.setUpgradeButton();
}
AOEChicken.prototype = Object.create(Chicken.prototype);
AOEChicken.prototype.detectEnemies = function()
{
    for(var i=0;i<this.gameContext.game.enemies.length;i++)
    {
        if(this.rangeCircle.contains(this.gameContext.game.enemies[i].enemy.centrex,this.gameContext.game.enemies[i].enemy.centrey))
        {
            this.attack(this.gameContext.game.enemies[i]);
        }
    }
};
//Longie
//Longer range, less damage, spends corn
//Inherits from Standard Chicken
var Longie = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 3*64;
    this.lastAttack = 0;
    this.attackSpeed = 25;
    this.damage = 8;

    this.sprite = gameContext.add.sprite(Xtile*64,(Ytile*64-31),'longieP');

    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
    this.setUpgradeButton();
}
Longie.prototype = Object.create(Chicken.prototype);
Longie.prototype.attack = function(enemy)
{
	if (this.gameContext.level.initialCorn>0)
	{
   		this.gameContext.createBullet(this.x*64+32,this.y*64,enemy,this.damage);
    	this.lastAttack = this.gameContext.game.time.now;
	}
};
//Poopie
//Slows enemies, doesn't deal damage
//Inherits from Area of Effect Chicken
var Poopie = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 256;
    this.lastAttack = 0;
    this.attackSpeed = 30;
    this.damage = 10;
    this.explosion;

    this.sprite = gameContext.add.sprite(Xtile*64-8,(Ytile*64+15),'poopieP');
    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.initializeExplosion();
    this.cleanRange();
    this.setUpgradeButton();
}
Poopie.prototype = Object.create(AOEChicken.prototype);
Poopie.prototype.initializeExplosion = function()
{

        this.explosion = this.gameContext.add.sprite(this.x*64-96,this.y*64-96, 'poop');
        var anim = this.explosion.animations.add('pooping');
        this.explosion.alpha = 0;
        this.gameContext.effectsLayer.add(this.explosion);
};
Poopie.prototype.attack = function(enemy)
{
    this.lastAttack = this.gameContext.game.time.now;
    enemy.enemy.speed = enemy.enemy.oldSpeed/4;
    this.explosion.alpha = 0.5;
    this.explosion.animations.play('pooping', 10, false);
    //this.explosionSound.play();
    var effect = this.explosion;
    setTimeout(function()
       {
           enemy.enemy.speed = enemy.enemy.oldSpeed;
           effect.alpha = 0;
       },1500)
};
//Fartie
//Deals damage to all enemies in range
//Inherits from Area of Effect Chicken
var Fartie = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 3*64;
    this.lastAttack = 0;
    this.attackSpeed = 10;
    this.damage = 20;
    this.explosionSound = this.gameContext.add.audio('explosion_sound');
    this.sprite = gameContext.add.sprite(Xtile*64,(Ytile*64-8),'fartieP');
    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
    this.initializeExplosion();
    this.explosion;
    this.setUpgradeButton();
}
Fartie.prototype = Object.create(AOEChicken.prototype);
Fartie.prototype.initializeExplosion = function()
{

        this.explosion = this.gameContext.add.sprite(this.x*64-96,this.y*64-96, 'explosion');
        //this.explosion.scale.set(2);
        var anim = this.explosion.animations.add('explode');
        this.explosion.alpha = 0;
        this.gameContext.effectsLayer.add(this.explosion);
};
Fartie.prototype.attack = function(enemy)
{
    this.lastAttack = this.gameContext.game.time.now;
    enemy.isAttacked(this.damage);    
    this.explosion.alpha = 0.5;
    this.explosion.animations.play('explode', 10, false);
    this.explosionSound.play();
    var explosion = this.explosion;
    setTimeout(function()
       {
            //           enemy.isAttacked(this.damage/5);    
            explosion.alpha = 0;
       },1000)
};
//Robot
//Shoots a laser that damages all enemies in a line
//Inherits from Standard Chicken
var Robot = function (Xtile,Ytile,Index,gameContext)
{
    this.index = Index;
    this.gameContext = gameContext;
    this.x = Xtile;
    this.y = Ytile;
    this.range = 256;
    this.lastAttack = 0;
    this.attackSpeed = 2;
    this.damage = 100;


    this.sprite = gameContext.add.sprite(Xtile*64-8,(Ytile*64-14),'robotP');
    this.rangeSprite = gameContext.add.graphics(0,0);

    this.setSprite();
    this.setRange();
    this.cleanRange();
    this.setUpgradeButton();

    this.initializeLaser();
}
Robot.prototype = Object.create(Chicken.prototype);
Robot.prototype.initializeLaser = function()
{
    this.laserSprite = this.gameContext.add.sprite(this.x*64 - 10,this.y*64+6,'laser');
    this.laserSprite.anchor.setTo(16/1600,0.5);
    this.laserSprite.angle =0;
    this.laserSprite.alpha =0;
 };
Robot.prototype.attack = function(enemy)
{
    this.lastAttack = this.gameContext.game.time.now;
    //this.laserSprite.angle = 90+ (180/Math.PI)*Math.atan((- enemy.enemy.centrex + (this.x*64))/(+ enemy.enemy.centrey - (this.y*64)));
    this.laserSprite.angle = (180/Math.PI)*(Math.atan2( enemy.enemy.centrey -this.y*64+6, enemy.enemy.centrex- this.x*64-10)); 
    this.laserSprite.alpha = 1;
    for(var i=0;i<this.gameContext.game.enemies.length;i++)
    {
        if(this.laserSprite.overlap(this.gameContext.game.enemies[i].enemy))
        {
            this.gameContext.game.enemies[i].isAttacked(this.damage);
        }
    }
    var laser = this.laserSprite;
    setTimeout(function()
       {
            laser.alpha = 0;
       },500)
};
//Upgrades
//Using Delegates
function UpgradeRange()
{
    if(this.rangeUpgraded === false )
    {
        this.range *= 1.2;
        this.rangeSprite.destroy();
        this.rangeSprite = this.gameContext.add.graphics(0,0);
        this.setRange();
        this.rangeUpgraded = true;
        this.gameContext.cornCounter-=10;
    }
}
function UpgradeDamage()
{
    if(this.damageUpgraded === false)
    {
        this.damage *= 1.2;
        this.damageUpgraded = true;
        this.gameContext.cornCounter-=10;
    }
}
function UpgradeSpeed()
{
    if(this.speedUpgraded == false)
    {
        this.attackSpeed *= 1.2;
        this.speedUpgraded = true;
        this.gameContext.cornCounter-=10;
    }
}
