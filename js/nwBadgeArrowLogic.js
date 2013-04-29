var nwBadge_Arrow_Page = 0;

var nwBadge_Arrow_Events =
{ 

	Back_Touched: function(point, obj)
	{
		
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:8888/REST/getBadges?callback=', badgesLoaded_callBack, "json");
	},
	Forward_Touched: function(point, obj)
	{
		
	    console.log("BADGES REQUEST: LOADING");
		$.getJSON('http://localhost:8888/REST/getBadges?callback=', badgesLoaded_callBack, "json");
	},
};

var nwBadgeArrowLeft = new nwButton("nwBadgeArrowLeft" , null, {nwBadge_Arrow_Events.Back_Touched}, true );
var nwBadgeRightLeft = new nwButton("nwBadgeArrowLeft" , null, {nwBadge_Arrow_Events.Back_Touched}, true );

 