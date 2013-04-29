function nwBadgeContainer(position, size)
{
	var name = "nwBadgeContainer";
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var subObjects = [];
	
	NObject.call(this, name, layer, position, size, "", "", events, animations, states, subObjects, true);
	this.addBadges = function(badges)
	{
		this.addChildren.call(this, badges, true);	
	}
	this.removeBadges = function()
	{
		this.removeChildren.call(this);
	}
	this.element.style.display = "";
}

nwMenu.prototype = Object.create(NObject.prototype);

