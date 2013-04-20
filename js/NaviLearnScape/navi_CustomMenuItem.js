


function MenuItem(name, text, position, events) 
{
	var states = [];
	var animations = ["fadingIn", "fadingOut"];
	NObject.call(this, name, 2, position, {width:30, height:30}, "square", "div", text, events, animations, states,[]);
	


	this.showText = function()
	{
		this.animatable.switchToAnimation(0);
	}
	this.hideText = function()
	{
		this.animatable.switchToAnimation(1)
	}
	
	//required callback method if animatable
	this.afterAnimation = function(obj)
	{
		this.animatable.idle();
	}

}

MenuItem.prototype = Object.create(NObject.prototype);


