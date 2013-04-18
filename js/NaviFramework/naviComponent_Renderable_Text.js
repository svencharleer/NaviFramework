function NCRText(layer, style, text) 
{
	NCRenderable.call(this, layer, style);
	this.type = "text";
	this.text = text;
}


NCRText.prototype = Object.create(NCRenderable.prototype);