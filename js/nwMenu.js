function nwMenu(position, size)
{
	var name = "nwMenu";
	var states = [];
	var animations = [];
	var events = {fingerEvent: genericTouchEvents.fingerEvent};
	var layer = 2;

	NObject.call(this, name, layer, position, size, "", "", "", events, animations, states,[], true);
	this.element.style.display = "";
}

nwMenu.prototype = Object.create(NObject.prototype);

