function BadgeScene()
{
	naviScene.call(this,"BadgeScene");
	this.callBack = function(json)
	{	 
		alert("Loaded!");
		for(var i = 0; i < json.length; i++)
		{
			$("#imageStore").append("<img src='"+ json[i].imageUrl +"' id='"+ json[i].GUID +"'' />");
		};
		$("#imageStore").attr("loaded", "true");
	};
	this.init = function()
	{
		fw.pushScene(this);
		
		$("#imageStore").attr("loaded", "false");
		$.getJSON('http://localhost:8888/REST/getBadges?callback=', this.callBack, "json");

	};
	this.update = function()
	{
		if($("#imageStore").attr("loaded") == "true")
		{
			var imageStore = $("#imageStore")[0];
			var children = imageStore.childNodes;
			for(var i = 0; i < children.length; i ++)
			{
				this.renderables.push(new naviImage(children[i].id,2, {x: i * 50, y : 100}, {w:50,h:50}, {}, {}));
			}
			this.enter();
			$("#imageStore").attr("loaded","false");
		}
	}
}

BadgeScene.prototype = Object.create(naviScene.prototype);
var scene = new BadgeScene();
scene.init();
