function NCAnimatable(owner, animations)
{
	this.owner = owner;
	this.activate = []
	this.active = [];
	this.deactivate = [];
	this.animations = animations; //css classes

 	//add our trigger to animation end trigger of html object
    if(this.owner.afterAnimation != null)
    {
        this.owner.element.addEventListener('webkitAnimationEnd', function(){
            console.log("Animation ended");
            this.naviData.afterAnimation();
        });
    }


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




