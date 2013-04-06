var badgeData = 
{
	data:null,
	loadDone: false,
	reload: function()
	{
		loadDone = false;
		$.getJSON('http://localhost:8888/REST/getBadges?callback=', function(json) { this.data = json; loadDone = true; alert("Loaded!"); }, "json");
	}

}