function NCRSquare(layer, style) 
{
	NCRenderable.call(this, layer, style);
	this.type = "square";
}


NCRSquare.prototype = Object.create(NCRenderable.prototype);