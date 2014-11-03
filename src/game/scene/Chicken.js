var Chicken = function (Xtile,Ytile,kind)
{
    var x;
    var y;
    var type;
    this.initialize(Xtile,Ytile,kind);
    //What is best? 
    //this.(most things), making them all public 
    //or
    //as we have now, with vars that are private but initialized outside the constructor
}

Chicken.prototype =
{
    initialize: function(X,Y,TYPE)
    { 
        x = X;
        y = Y;
        type = TYPE;
    },
    attack: function(enemy)
    {
        console.log("Chicken attacked "+enemy);
    },
    print: function()
    {
        console.log("ChickenPrint");
        console.log("X: "+x);
        console.log("Y: "+y);
        console.log("Type: "+type);
    }

};
