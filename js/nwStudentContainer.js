var studentsLoaded_callBack = function(json)
{	
	console.log("STUDENTS REQUEST: DONE");
	
	var objects = [];
	for(var i = 0; i < json.length; i++)
	{
		objects.push(new nwStudent(json[i].replace(/[^A-Za-z0-9]+/g, ''), null, null, json[i]));
	};
	if(studentContainer == null)
		studentContainer = new nwStudentContainer();
	else
		studentContainer.resetStudents();
	studentContainer.setStudents(objects);


	fw.addObjectsToDocument([studentContainer]);
	//setTimeout(function(){loadingDone();},1000);
};

var updateStudentColors = function()
{
	var badges = getBadgeObjectsInPlayField();
	for(var i = 0; i < studentContainer.students.length;i++)
	{
		var student = studentContainer.students[i];
		var badgesFound = false;
		for(var j = 0; j < badges.length; j++)
		{
			for(var k = 0; k < badges[j].badgeData.awardedBadges.length;k++)
			{
				var awardedBadge = badges[j].badgeData.awardedBadges[k];
				if(awardedBadge.username == student.studentName)
				{
					badgesFound = true;
					//fw.drawConnection(badgeContainer.badges[i], students[k]);
				}
			}
		}
		if(!badgesFound)
			student.element.style["color"]= "";
		else
			student.element.style["color"]= "white";
	}
};


function nwStudentContainer()
{
	var name = "nwStudentContainer";
	var states = [];
	var animations = [];
	var events = null;
	var layer = 2;
	this.students = [];
	this.type = "container";

	this.setStudents = function(_students)
	{
		this.students = _students;
		
		this.addChildren.call(this, this.students, true);	
	}

	this.resetStudents = function()
	{
		this.removeChildren.call(this, this.students);
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
	this.element.style.visibility = "";


	this.delete = function()
	{
		this.resetStudents();
		this.element.style.display = "none";
	}

}



nwStudentContainer.prototype = Object.create(NObject.prototype);

