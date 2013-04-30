//MAIN LOGIC ... LOOP?

var badgeContainer;
var studentContainer;


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

