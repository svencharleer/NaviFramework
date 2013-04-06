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




