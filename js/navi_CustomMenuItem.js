function MenuItem(name, text, position, events) 
{
	//general
	this.name = name;
	this.x = position.x;
	this.y = position.y;


	this.renderable = new NCRText(2, {
										fillColor:'#4d4d4d',
										fontSize:30,
										font: 'Helvetica'
										},
										text
										);
	this.touchable = new NCTouchable(events);
	this.animatable = new NCAnimatable([new animation_Fade(0.0, 1.0, this), new animation_Fade(1.0, 0.0, this)])
	

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