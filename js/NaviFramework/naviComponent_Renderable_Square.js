function NCRSquare(layer, cssClass) 
{
	NCRenderable.call(this, layer, cssClass);
	this.customHtml = "Square";
}


NCRSquare.prototype = Object.create(NCRenderable.prototype);