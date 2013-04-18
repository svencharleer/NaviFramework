function customAnimation_Rotate(caller) 
{
	animation_Base.call(this, caller);

    this.defaultAnimation = function(event, obj) 
    {	
    			obj.rotate(3);		
    }
};

function customEvent_MouseDown(event, obj)
{
	obj.raw.animatable.idle();
};




function RotatingTile(name, layer, position, size, style, events)
{
	Tile.call(this, name, layer, position, size, style, events);
	this.animatable = new NCAnimatable([new customAnimation_Rotate(this)]);
	this.animatable.switchToAnimation(0);
}

RotatingTile.prototype = Object.create(Tile.prototype);

var tile1 = new Tile("tile1", 2, {x: 400, y:200}, {w:50, h:50}, {fillColor: '#FFFFFF',strokeColor: '#4d4d4d', strokeWidth: 10}, {mouseDownEvent: genericTouchEvents.dragging_mouseDown, mouseDragEvent: genericTouchEvents.dragging_mouseDrag, mouseUpEvent: genericTouchEvents.dragging_mouseUp,fingerEvent: genericTouchEvents.fingerEvent})

var tile2 = new RotatingTile("tile2", 2, {x: 200, y:200}, {w:50, h:50}, {fillColor: '#FFFFFF',strokeColor: '#4d4d4d', strokeWidth: 10}, {mouseDownEvent: customEvent_MouseDown, fingerEvent: genericTouchEvents.fingerEvent})



