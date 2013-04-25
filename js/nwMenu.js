function nwMenu(position, size)
{
	var name = "nwMenu";
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var subObjects = [new nwMenuItem("nwMenuItem_Badge"), new nwMenuItem("nwMenuItem_Person")]
	
	NObject.call(this, name, layer, position, size, "", "", events, animations, states, subObjects, true, true);
	this.element.style.display = "";
}

nwMenu.prototype = Object.create(NObject.prototype);

