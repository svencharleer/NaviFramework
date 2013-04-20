function NCRText(layer, style, text) 
{
	NCRenderable.call(this, layer, style);
	this.text = text;
	this.customHtml = "<div>" + text + "</div>"; 
}


NCRText.prototype = Object.create(NCRenderable.prototype);