function nwBadgeIcon(name, position, size, filename)
{
	var name = "nwBadgeIcon" + name;
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var innerHTML = $("#nwBadgeIcon").html();
	NObject.call(this, name, layer, position, size, "", innerHTML, events, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.setAttribute("src",filename);
}

nwMenu.prototype = Object.create(NObject.prototype);