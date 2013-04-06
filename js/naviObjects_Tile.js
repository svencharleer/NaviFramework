function Tile(name, layer, position, size, style, events)
{
	this.type = "square";
	this.name = name;
	this.layer = layer;
	this.x = position.x;
	this.y = position.y;
	this.width = size.w;
	this.height = size.h;
	this.style = style;
	this.mouseDownEvent = events.mouseDownEvent;
	this.mouseUpEvent = events.mouseUpEvent;
	this.mouseDragEvent = events.mouseDragEvent;
	this.fingerEvent = events.fingerEvent;

}


function customAnimation_Rotate(caller) 
{
	animation_Base.call(this, caller);

    this.defaultAnimation = function(event, obj) 
    {	
    			obj.rotate(3);		
    }
};





function RotatingTile(name, layer, position, size, style, events)
{
	Tile.call(this, name, layer, position, size, style, events);
	this.activeAnimations = [new customAnimation_Rotate(this)];
	this.activeAnimations[0].trigger();
}

RotatingTile.prototype = Object.create(Tile.prototype);

var tile1 = new Tile("tile1", 2, {x: 400, y:200}, {w:50, h:50}, {fillColor: '#FFFFFF',strokeColor: '#4d4d4d', strokeWidth: 10}, {mouseDownEvent: genericTouchEvents.mouseDownEvent})

var tile2 = new RotatingTile("tile2", 2, {x: 200, y:200}, {w:50, h:50}, {fillColor: '#FFFFFF',strokeColor: '#4d4d4d', strokeWidth: 10}, {mouseDownEvent: genericTouchEvents.mouseDownEvent})





