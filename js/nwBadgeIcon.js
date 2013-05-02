function nwBadgeIcon(name, position, size, filename)
{
	var name = "nwBadgeIcon" + name;
	var states = [];
	var animations = [];
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
				//show extra data
			}
			else
			{
				badgeContainer.element.appendChild(obj.element);
				obj.setPosition(null);
			}
			//if outside of container area, let it go ...
			//otherwise snap back
		},
		onMove: function(point, obj)
		{
			document.getElementById("playfield").appendChild(obj.element);
			obj.setPosition(point);
		}
	};
	var layer = 2;
	var innerHTML = $("#nwBadgeIcon").html();
	NObject.call(this, name, layer, position, size, "", innerHTML, eventHandler, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.style.className = "";
	this.element.setAttribute("src",filename);
}

nwBadgeIcon.prototype = Object.create(NObject.prototype);
