function NCRSquare(layer, cssClass) 
{
	NCRenderable.call(this, layer, cssClass);
	this.customHtml = "Tile";
}


NCRSquare.prototype = Object.create(NCRenderable.prototype);