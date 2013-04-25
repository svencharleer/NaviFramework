var loadingDone = function()
{
	for(var i = 0; i < this.group.length; i++)
	{
		this.group[i].setPosition({x: (i % 10) * 50, y : (i / 10) * 60});
	}
}

var callBack = function(json)
{	
	console.log("BADGES REQUEST: DONE");
	
	for(var i = 0; i < json.length; i++)
	{

		//document.getElementById("dummybodyid").naviData.addObject(new Badge(json[i].GUID, 2, null, {width:50,height:50}, "transit", events, json[i].imageUrl));
	};
	//setTimeout(function(){document.getElementById("BadgeScene").naviData.loadingDone();},1000);
	

};



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

	NObject.call(this, name, layer, null, null, "", "", "", events, animations, states,[], true, true);
	this.element.style.display = "";
}

nwMenuItem.prototype = Object.create(NObject.prototype);

