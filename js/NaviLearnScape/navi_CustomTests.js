function customAnimation_Rotate(caller) 
{
	animation_Base.call(this, caller);

    this.defaultAnimation = function(event, obj) 
    {	
    			obj.rotate(3);		
    }
};

function customEvent_MouseDown(point, obj)
{
	obj.raw.activeAnimations[0].trigger();
};




function RotatingTile(name, layer, position, size, style, events)
{
	Tile.call(this, name, layer, position, size, style, events);
	this.activeAnimations = [new customAnimation_Rotate(this)];
	this.activeAnimations[0].trigger();
}

RotatingTile.prototype = Object.create(Tile.prototype);

var tile1 = new Tile("tile1", 2, {x: 400, y:200}, {w:50, h:50}, {fillColor: '#FFFFFF',strokeColor: '#4d4d4d', strokeWidth: 10}, {mouseDownEvent: genericTouchEvents.mouseDownEvent})

var tile2 = new RotatingTile("tile2", 2, {x: 200, y:200}, {w:50, h:50}, {fillColor: '#FFFFFF',strokeColor: '#4d4d4d', strokeWidth: 10}, {mouseDownEvent: customEvent_MouseDown})



