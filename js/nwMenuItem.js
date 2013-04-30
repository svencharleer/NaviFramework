






function nwMenuItem(name, event)
{
	var name = name;
	var states = [];
	var animations = ["","pulsate"];
	var events = {fingerEvent: event};
	var layer = 2;

	NObject.call(this, name, layer, null, null, "", "", events, animations, states,[], true, true);
	this.element.style.display = "";
}

nwMenuItem.prototype = Object.create(NObject.prototype);

