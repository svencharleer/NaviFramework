function MenuItem(name, text, position, events) 
{
	//general
	this.name = name;
	this.x = position.x;
	this.y = position.y;


	this.renderable = new NCRText(2, "fadingOut",
										text
										);
	this.touchable = new NCTouchable(events);
	this.animatable = new NCAnimatable(["fadingIn", "fadingOut"])
	

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