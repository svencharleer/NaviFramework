function nwButton(name, template, buttonEvent, alreadyInDocument)
{
	var name = name;
	var states = [];
	var animations = [];
	var events = {fingerEvent: buttonEvent};
	var layer = 2;
	var innerHTML = "";
	if(template != null)
		innerHTML = $("#" + template).html();
	NObject.call(this, name, layer, null, null, "", innerHTML, events, animations, states,[], alreadyInDocument);
	this.element.style.display = "";
}

nwButton.prototype = Object.create(NObject.prototype);