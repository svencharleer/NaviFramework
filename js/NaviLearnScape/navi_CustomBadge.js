function Badge(name, position, size, layer, style, filename)
{
	this.name = name;
	this.x = position.x;
	this.y = position.y;
	this.width = size.w;
	this.height = size.h;
	this.renderable = new NCRImage(layer, style, filename);
	this.touchable = new NCTouchable({fingerEvent: genericTouchEvents.fingerEvent});
	this.animatable = null;
}




