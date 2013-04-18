function NCAnimatable(animations)
{
	this.type = "animatable";

	//object state
	this.state = "hidden";

	this.activeAnimations = [];
	this.animations = animations;

	this.switchToAnimation = function(animationNumber)
	{
		if(this.animations != null && this.animations.length >= animationNumber)
		{
			this.activeAnimations = [this.animations[animationNumber]];
			this.animations[animationNumber].trigger();
		}
	};
	this.idle = function()
	{
		this.activeAnimations = []; //maybe we want to select what anim to stop in case we have multiple anims..
	};
	
}




