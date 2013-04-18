function BadgeScene()
{
	NOScene.call(this,"BadgeScene", 2, {x:200, y:100});
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
		//loading state
		if($("#imageStore").attr("loaded") == "true")
		{
			var imageStore = $("#imageStore")[0];
			var children = imageStore.childNodes;
			for(var i = 0; i < children.length; i ++)
			{
				this.group.objects.push(new Badge(children[i].id, {x: (i % 10) * 50, y : (i / 10) * 60}, {w:50,h:50},2, {},children[i].id, {}));
			}
			$("#imageStore").attr("loaded","false");
			this.status = "entering";
			this.entering();
		}
		else
		{

		}
	}
}

BadgeScene.prototype = Object.create(NOScene.prototype);


