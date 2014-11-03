var Tile = function()
{
    this.forbidden = false;
    this.occupied = false;
}; 

Tile.prototype =
{
    print: function()
    {
        console.log(this);
    }
};

var Map = function ()
{
    this.tiles = [];
    for(i=0;i<20*15;i++)
    {
        this.tiles[i] = new Tile()
    }
};

Map.prototype = 
{
    setTile: function(x,y)
    {
        this.tiles[y*20+x].occupied = true;
    },
    testTile: function(x,y)
    {
        if(this.tiles[y*20+x].occupied||this.tiles[y*20+x].forbidden)
            return true;
        else
            return false;
    },
    printMap: function()
    {
        for(i=0;i<20*15;i++)
        {
            if(this.tiles[i].occupied == true)
                this.tiles[i].print();
        }
    }


};
