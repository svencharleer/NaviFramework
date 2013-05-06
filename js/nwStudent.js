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
			$("#" + obj.element.id).removeClass("nwStudent");
			$("#" + obj.element.id).addClass("nwStudentDragged");

			obj.element.style.border = "solid 1px red";
			
		},
		onLetGo: function(obj)
		{
			if(obj.getPosition().y < $("#nwContainerArea").offset().top)
			{
				obj.element.style.border = "";
			}
			else
			{
				obj.element.style.border = "";
				$("#" + obj.element.id).removeClass("nwStudentDragged");
				$("#" + obj.element.id).addClass("nwStudent");
				studentContainer.element.appendChild(obj.element);
				obj.setPosition(null);
			}
			//if outside of container area, let it go ...
			//otherwise snap back
		},
		onMove: function(point, obj)
		{
			document.getElementById("playfield").appendChild(obj.element);
			obj.setPosition(point, true);
			var rotation = calculateRotation(point);
			obj.element.style.webkitTransform = "rotate(" + rotation + "deg)";
			obj.element.style.webkitTransformOrigin = "50% 50% 0";
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
