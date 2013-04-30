function nwStudent(name, position, size, studentName)
{
	var name = "nwStudent" + name;
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var innerHTML = $("#nwStudent").html();
	NObject.call(this, name, layer, position, size, "", innerHTML, events, animations, states, [], false, false);
	this.element.style.display = "";
	this.element.innerHTML = studentName;
}

nwStudent.prototype = Object.create(NObject.prototype);
