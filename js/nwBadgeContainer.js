var	nwBadge_Arrow_Events =
{ 
	nwBadge_Arrow_Page: 0,

	Back_Touched: function(point, obj)
	{
		
		nwBadge_Arrow_Events.nwBadge_Arrow_Page--;
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:8888/REST/getBadges/' + nwBadge_Arrow_Events.nwBadge_Arrow_Page + '?callback=', badgesLoaded_callBack, "json");
	},
	Forward_Touched: function(point, obj)
	{
		nwBadge_Arrow_Events.nwBadge_Arrow_Page++;
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:8888/REST/getBadges/' + nwBadge_Arrow_Events.nwBadge_Arrow_Page + '?callback=', badgesLoaded_callBack, "json");
	},
};

function nwBadgeContainer(position, size)
{
	var name = "nwBadgeContainer";
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var badges = [];

	
	
	NObject.call(this, name, layer, position, size, "", "", events, animations, states, badges, true);
	this.addBadges = function(_badges, title)
	{
		this.titleElement.innerHTML = title;
		for(var i = 0; i < _badges.length;i++)
			badges.push(_badges[i]);
		this.addChildren.call(this, _badges, true);	
	}
	this.removeBadges = function()
	{
		this.removeChildren.call(this, badges);
	}
	this.element.style.display = "";
	this.titleElement = document.getElementById("nwBadgeContainer_Title");



	
	var nwBadgeArrowLeft = new nwButton("nwBadgeContainer_ArrowLeft" , null, nwBadge_Arrow_Events.Back_Touched, true );
	var nwBadgeArrowRight = new nwButton("nwBadgeContainer_ArrowRight" , null, nwBadge_Arrow_Events.Forward_Touched, true );
	this.addChildren.call(this, [nwBadgeArrowLeft, nwBadgeArrowRight]);
	//REMEMBER WE HAVE TO DELETE THESE AT SOME POINT
	//ALSO MAYBE WE WANNA PUT THEM ALL IN THE GROUP POOL --> K WE DID THAT BUT I THINK THEY STAY IN MEMORY IN THE LAYER OF THE FRAMEWORK
}



nwMenu.prototype = Object.create(NObject.prototype);

