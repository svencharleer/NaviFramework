function nwBadgeIcon(name, position, size, filename)
{
	var name = "nwBadgeIcon" + name;
	var states = [];
	var animations = [];
	var events = null;
	var layer = 2;
	var innerHTML = $("#nwBadgeIcon").html();
	NObject.call(this, name, layer, position, size, "", innerHTML, events, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.style.className = "";
	this.element.setAttribute("src",filename);
}

nwBadgeIcon.prototype = Object.create(NObject.prototype);
