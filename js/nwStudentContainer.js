var studentsLoaded_callBack = function(json)
{	
	console.log("STUDENTS REQUEST: DONE");
	
	var objects = [];
	for(var i = 0; i < json.length; i++)
	{
		objects.push(new nwStudent(json[i].replace(/[^A-Za-z]+/g, ''), null, null, json[i]));
	};
	if(studentContainer == null)
		studentContainer = new nwStudentContainer();
	else
		studentContainer.resetStudents();
	studentContainer.setStudents(objects);


	fw.addObjectsToDocument([studentContainer]);
	//setTimeout(function(){loadingDone();},1000);
};


function nwStudentContainer()
{
	var name = "nwStudentContainer";
	var states = [];
	var animations = [];
	var events = {};
	var layer = 2;
	var students = [];
	this.type = "container";

	this.setStudents = function(_students)
	{
		students = _students;
		
		this.addChildren.call(this, students, true);	
	}

	this.resetStudents = function()
	{
		this.removeChildren.call(this, students);
		this.students = [];
	}

	//positioning, depending on different containers/platforms...
	
	this.thereAreXContainer = function(numberOfContainers)
	{
		if(numberOfContainers == 1)
		{
			$("#"+ this.element.id).removeClass("container_2x1");
			$("#"+ this.element.id).addClass("container_1x1");
		}
		else
		{
			$("#"+ this.element.id).removeClass("container_1x1");
			$("#"+ this.element.id).addClass("container_2x1");
		}
	}
	
	

	NObject.call(this, name, layer, null, null, "", "", events, animations, states, [], true);
	
	this.element.style.display = "";


	this.delete = function()
	{
		this.resetStudents();
		this.element.style.display = "none";
	}

}



nwStudentContainer.prototype = Object.create(NObject.prototype);

