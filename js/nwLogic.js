//MAIN LOGIC ... LOOP?

var badgeContainer;
var studentContainer;


function loadMenu(){
	document.getElementById("mainBody").webkitRequestFullScreen();
	//load objects
	var objects = [new nwMenu({x:2*fw.view.width/5, y:7.3*fw.view.height/8}, {width:fw.view.width/5, height:fw.view.height/8})];
	fw.addObjectsToDocument(objects);
}


/*var loadingDone = function()
{
	for(var i = 0; i < objects.length; i++)
	{
		objects[i].setPosition();
	}
}*/

