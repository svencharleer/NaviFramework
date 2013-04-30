var nwMenuItem_Events =
{ 
	badgeTouched_Timer: null,
	badgeTouchedSubmit: function()
	{
		if(badgeContainer != null)
		{
			//remove badge container
			badgeContainer.delete();
			fw.removeObjectFromDocument(badgeContainer);
			badgeContainer = null;
		}
		else
		{
		    console.log("BADGES REQUEST: LOADING");
			$.getJSON('http://localhost:8888/REST/getBadges/0?callback=', badgesLoaded_callBack, "json");
		}
	},

	badgeTouched: function(point, obj, action)
	{
		if(action=="hit")
		{
			if(nwMenuItem_Events.badgeTouched_Timer == null)
			{
				obj.animatable.switchToAnimation(1);
				nwMenuItem_Events.badgeTouched_Timer = setTimeout(function()
						{
							nwMenuItem_Events.badgeTouchedSubmit();
							obj.animatable.idle();
						},

						3000);
				return;
			}
		}
		if(action=="letgo")
		{
			obj.animatable.idle();
			clearTimeout(nwMenuItem_Events.badgeTouched_Timer);
			nwMenuItem_Events.badgeTouched_Timer = null;
		}
		//if we move out of icon, might wanna cancel timer as well...
		/*if(action=="move" && nwMenuItem_Events.badgeTouched_Timer != 0)
		{
			if(nwMenuItem_Events.badgeTouched_Timer + 5000 < new Date().getTime())
			{
				nwMenuItem_Events.badgeTouchedSubmit();
				nwMenuItem_Events.badgeTouched_Timer = 0;
			}
		}*/
		
	},

	studentTouched: function(point, obj, action)
	{
		if(studentContainer != null)
		{
			//remove badge container
			studentContainer.delete();
			fw.removeObjectFromDocument(studentContainer);
			studentContainer = null;
		}
		else
		{
		    console.log("STUDENT REQUEST: LOADING");
			$.getJSON('http://localhost:8888/REST/getStudents?callback=', studentsLoaded_callBack, "json");
		}
	},
};


function nwMenu(position, size)
{
	var name = "nwMenu";
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var subObjects = [new nwMenuItem("nwMenuItem_Badge", nwMenuItem_Events.badgeTouched), new nwMenuItem("nwMenuItem_Person", nwMenuItem_Events.studentTouched)];

	NObject.call(this, name, layer, position, size, "", "", events, animations, states, subObjects, true, true);
	this.addChildren.call(this, subObjects);
	this.element.style.display = "";
}

nwMenu.prototype = Object.create(NObject.prototype);

