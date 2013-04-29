var objects = [];
var __w = fw.view.width/45;
var __h = __w;

/*var loadingDone = function()
{
	for(var i = 0; i < objects.length; i++)
	{
		objects[i].setPosition();
	}
}*/

var callBack = function(json)
{	
	console.log("BADGES REQUEST: DONE");

	for(var i = 0; i < json.length; i++)
	{
		objects.push(new nwBadgeIcon(json[i].GUID, /*{x: (i % 40) * __w, y : Math.floor(i / 40) * __h}*/null, {width:__w,height:__h}, json[i].imageUrl));
	};
	var badgeContainer = new nwBadgeContainer({x:0,y:0}, null);
	badgeContainer.addBadges(objects);
	fw.addObjectsToDocument(badgeContainer);
	//setTimeout(function(){loadingDone();},1000);
};