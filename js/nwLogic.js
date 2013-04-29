//MAIN LOGIC ... LOOP?

var badgeContainer;



function loadMenu(){
	//load objects
	var objects = [new nwMenu({x:fw.view.width/3, y:5*fw.view.height/6}, {width:fw.view.width/3, height:fw.view.height/6})];
	fw.addObjectsToDocument(objects);
}


/*var loadingDone = function()
{
	for(var i = 0; i < objects.length; i++)
	{
		objects[i].setPosition();
	}
}*/

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