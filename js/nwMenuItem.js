



var nwMenuItem_Events =
{ 

	badgeTouched: function(point, obj)
	{
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:8888/REST/getBadges?callback=', callBack, "json");
	},
};


function nwMenuItem(name)
{
	var name = name;
	var states = [];
	var animations = [];
	var events = {fingerEvent: nwMenuItem_Events.badgeTouched};
	var layer = 2;

	NObject.call(this, name, layer, null, null, "", "", events, animations, states,[], true, true);
	this.element.style.display = "";
}

nwMenuItem.prototype = Object.create(NObject.prototype);

