function Text(name, text, position, events) 
{
	//general
	this.type = "text";
	this.name = name;
	this.text = text;
	this.layer = 2;
	
	//object state
	this.x = position.x;
	this.y = position.y;
	this.state = "hidden";

	//events
	this.mouseDownEvent = events.mouseDownEvent;
	this.mouseUpEvent = events.mouseUpEvent;
	this.mouseDragEvent = events.mouseDragEvent;
	this.fingerEvent = events.fingerEvent;
	
	this.activeAnimations = [];
	var anim1 = new animation_Fade(0.0, 1.0, this);
	var anim2 = new animation_Fade(1.0, 0.0, this);
	this.animations = [anim1, anim2];

	this.showHideText = function()
					{
						if(this.state == "hidden")
						{
							this.activeAnimations = [this.animations[0]];
							this.state = "becoming_visible";
							this.activeAnimations[0].trigger();
						}
						else if(this.state == "visible")
						{
							this.activeAnimations = [this.animations[1]];
							this.state = "becoming_hidden";
							this.activeAnimations[0].trigger();
						}
					}
	this.afterAnimation = function(obj)
					{
						if(this.state == "becoming_visible") this.state = "visible";
						if(this.state == "becoming_hidden") this.state = "hidden";
					}

	this.style =  {
				fillColor:'#4d4d4d',
				fontSize:30,
				font: 'Helvetica'
			},
	this.visible = true;
}