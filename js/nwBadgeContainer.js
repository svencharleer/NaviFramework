var badgesLoaded_callBack = function(json)
{	
	console.log("BADGES REQUEST: DONE");
	if(badgeContainer != null)
		badgeContainer.removeBadges();
	var objects = [];
	var iteration = -1;
	for(var i = 0; i < json.length; i++)
	{
		iteration = json[i].biweek;
		objects.push(new nwBadgeIcon(json[i].GUID, /*{x: (i % 40) * __w, y : Math.floor(i / 40) * __h}*/null, null, json[i].imageUrl));
	};
	if(badgeContainer == null)
		badgeContainer = new nwBadgeContainer({x:fw.view.width/3.4, y:fw.view.height/3}, null);
	badgeContainer.addBadges(objects, "Iteration " + (iteration + 1));
	fw.addObjectsToDocument([badgeContainer]);
	//setTimeout(function(){loadingDone();},1000);
};

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

function nwBadgeContainer()
{
	var name = "nwBadgeContainer";
	var states = [];
	var animations = [];
	var events = null;
	var layer = 2;
	var badges = [];
	this.type = "container";
	
	//positioning, depending on different containers/platforms...
	
	this.thereAreXContainer = function(numberOfContainers)
	{
		if(numberOfContainers == 1)
		{
			$("#"+ this.element.id).removeClass("container_2x1");
			$("#"+ this.element.id).addClass("container_1x1");
		}
		else
		{
			$("#"+ this.element.id).removeClass("container_1x1");
			$("#"+ this.element.id).addClass("container_2x1");
		}
	}
	
	NObject.call(this, name, layer, null, null, "", "", events, animations, states, badges, true);
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


	this.delete = function()
	{
		this.removeBadges();
		delete nwBadgeArrowLeft;
		delete nwBadgeArrowRight; //we gotta make destructors per object, take into account to delete doc element or not
		this.element.style.display = "none";
	}

}



nwBadgeContainer.prototype = Object.create(NObject.prototype);

