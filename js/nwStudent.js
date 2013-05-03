function nwStudent(name, position, size, studentName)
{
	var name = "nwStudent" + name;
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
						
			}
			else
			{
			
				studentContainer.element.appendChild(obj.element);
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
	var innerHTML = $("#nwStudent").html();

	NObject.call(this, name, layer, position, size, "", innerHTML, eventHandler, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.className = "nwStudent";
	this.element.innerHTML = this.element.innerHTML.replace("NT_STUDENT_NAME", studentName);
}

nwStudent.prototype = Object.create(NObject.prototype);
