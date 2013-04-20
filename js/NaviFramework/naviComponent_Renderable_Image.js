function NCRImage(layer, style, filename) 
{
	NCRenderable.call(this, layer, style);
	this.filename = filename;
	this.customHtml = "<img src='" + filename + "'/>";
}


NCRImage.prototype = Object.create(NCRenderable.prototype);