var genericTouchEvents =
{
	mouseDownEvent: function(point)
				    {
    					this.position = point;
    				}
};

var tile1 = 
{
	name: "tile1",
	x: 100,
	y: 100,
	width: 100,
	height: 100,
	mouseDownEvent: genericTouchEvents.mouseDownEvent,
    animationLoop: function(event)
    				{
    					this.rotate(3);
    				}
};

var tile2 = 
{
	name: "tile1",
	x: 200,
	y: 200,
	width: 50,
	height: 50,
	mouseDownEvent: genericTouchEvents.mouseDownEvent,
    animationLoop: function(event)
    				{
    					this.rotate(3);
    				}
};