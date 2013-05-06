function nwBadgeIcon(name, position, size, filename, badgeData)
{
	var name = "nwBadgeIcon" + name;
	var states = [];
	var animations = [];
	this.badgeData = badgeData;
	var eventHandler =  
	{
		timer: null,
		onHit: function(point, obj)
		{
			//obj.setPosition(point);
			$("#" + obj.element.id).removeClass("transit");
		},
		onLetGo: function(obj)
		{
			if(obj.getPosition().y < $("#nwContainerArea").offset().top)
			{
				var details = $("#" + obj.element.id).find(".nwBadgeDetails_hidden");
				details.removeClass("nwBadgeDetails_hidden");
				details.addClass("nwBadgeDetails_shown");
				var icon = $("#" + obj.element.id).find(".nwBadgeIcon");
				icon.removeClass("nwBadgeIcon");
				icon.addClass("nwBadgeIconDetailed");
				$("#" + obj.element.id).removeClass("nwBadge");		
				$("#" + obj.element.id).addClass("nwBadgeDetailed");			
			}
			else
			{
				var details = $("#" + obj.element.id).find(".nwBadgeDetails_shown");
				details.removeClass("nwBadgeDetails_shown");
				details.addClass("nwBadgeDetails_hidden");
				var icon = $("#" + obj.element.id).find(".nwBadgeIconDetailed");
				icon.removeClass("nwBadgeIconDetailed");
				icon.addClass("nwBadgeIcon");
				$("#" + obj.element.id).removeClass("nwBadgeDetailed");		
				$("#" + obj.element.id).addClass("nwBadge");

				badgeContainer.element.appendChild(obj.element);
				obj.setPosition(null);
			}
			//if outside of container area, let it go ...
			//otherwise snap back
		},
		onMove: function(point, obj)
		{
			document.getElementById("playfield").appendChild(obj.element);
			obj.setPosition(point, true);
		}
	};
	var layer = 2;
	var innerHTML = $("#nwBadge").html();
	NObject.call(this, name, layer, position, size, "", innerHTML, eventHandler, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.className = "nwBadge";
	//replace placeholders
	this.element.innerHTML = this.element.innerHTML.replace("NT_IMG_SRC", filename);
	this.element.innerHTML = this.element.innerHTML.replace("NT_BADGE_NAME", this.badgeData.name);
	this.element.innerHTML = this.element.innerHTML.replace("NT_BADGE_DESCRIPTION", this.badgeData.description);	

}

nwBadgeIcon.prototype = Object.create(NObject.prototype);
