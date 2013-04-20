function NCRText(layer, cssClass, text) 
{
	NCRenderable.call(this, layer, cssClass);
	this.text = text;
	this.customHtml = "<div>" + text + "</div>"; 
}


NCRText.prototype = Object.create(NCRenderable.prototype);