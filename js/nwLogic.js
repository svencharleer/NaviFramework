//MAIN LOGIC ... LOOP?

var badgeContainer;
var studentContainer;
var naviLogo 
function loadMenu(){
	naviLogo = new nwNaviLogo();
	fw.addObjectToDocument(naviLogo);

	//load objects
	var objects = [new nwMenu(null,null)];//{x:2*fw.view.width/5, y:7.3*fw.view.height/8}, {width:fw.view.width/5, height:fw.view.height/8})];
	fw.addObjectsToDocument(objects);
}


/*var loadingDone = function()
{
	for(var i = 0; i < objects.length; i++)
	{
		objects[i].setPosition();
	}
}*/

