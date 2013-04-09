//imagestore is actually a div that will be created in the html page as paper.js needs it
	var BadgeData =
	{
		data: null,
		loadDone: false,
		imageStore: null,
		sceneCallBack: null,

		callBack: function(json)
		{
			BadgeData.data = json; 
			BadgeData.loadDone = true; 
			alert("Loaded!");
			for(var i = 0; i < BadgeData.data.length; i++)
			{
				$("#" + BadgeData.imageStore).append("<img src='"+ BadgeData.data[i].imageUrl +"' id='"+ BadgeData.data[i].GUID +"'' />");
			};
			BadgeData.sceneCallBack.callBack();
		},

		reload: function(imageStore, callBack)
		{
			this.sceneCallBack = callBack;
			this.loadDone = false;
			this.imageStore = imageStore;
			$.getJSON('http://localhost:8888/REST/getBadges?callback=', this.callBack, "json");
		},
	};

/* 
	a scene needs:
		- data
*/
var scene_Badges =
{
	data: BadgeData,
	init: function()
	{
		this.data.reload("imageStore", scene_Badges);
	},
	callBack: function()
	{
		scene_Badges.drawBadges();
	},
	drawBadges: function()
	{
		var badgeImages = [];
		var imageStore = $("#imageStore")[0];
		var children = imageStore.childNodes;
		for(var i = 0; i < children.length; i ++)
		{
			badgeImages.push(new naviImage(children[i].id,2, {x: i * 50, y : 100}, {w:50,h:50}, {}, {}));
		}
		
			
		fw.drawAll(badgeImages);
	}

	

};