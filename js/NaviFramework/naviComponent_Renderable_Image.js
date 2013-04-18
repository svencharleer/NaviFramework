function NCRImage(layer, style, filename) 
{
	NCRenderable.call(this, layer, style);
	this.type = "image";
	this.filename = filename;
}


NCRImage.prototype = Object.create(NCRenderable.prototype);