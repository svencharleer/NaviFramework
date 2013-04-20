function NCAnimatable(animations)
{
	this.activate = []
	this.active = [];
	this.deactivate = [];
	this.animations = animations; //css classes

	this.switchToAnimation = function(animationNumber)
	{
		if(this.animations != null && this.animations.length >= animationNumber)
		{
			this.activate.push(this.animations[animationNumber]);
		}
	};
	this.idle = function()
	{
		this.deactivate = this.active; //maybe we want to select what anim to stop in case we have multiple anims..
		this.active = [];
	};
	
}




