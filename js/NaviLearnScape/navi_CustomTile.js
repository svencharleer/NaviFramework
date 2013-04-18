function Tile(name, layer, position, size, style, events)
{
	this.name = name;
	this.x = position.x;
	this.y = position.y;
	this.width = size.w;
	this.height = size.h;
	this.renderable = new NCRSquare(layer, style);
	this.touchable = null;
	if(events != null) this.touchable = new NCTouchable(events);
	this.animatable = null;
}




