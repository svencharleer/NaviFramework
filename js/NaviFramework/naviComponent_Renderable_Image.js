function NCRImage(layer, cssClass, filename) 
{
	NCRenderable.call(this, layer, cssClass);
	this.filename = filename;
	this.customHtml = "<img src='" + filename + "'/>";
}


NCRImage.prototype = Object.create(NCRenderable.prototype);