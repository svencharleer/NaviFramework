/*
	animation objects
	- trigger: method to call to trigger the animation
	- animationLoop: current animation loop (set to null if not animating)
	- other methods: animation loops
*/

var animation_FadeInOut =
{
	animationTime: null,
	animationState: -1,
	animate: null;
	
	trigger: function()
	{
						switch(this.animationState)
						{
							case 0:
								this.animate = this.fadeIn;
								this.animationState = -1;
								break;
							case 1:
								this.animate = this.fadeOut;
								this.animationState = -1;
								break;
							default:
						}
	},

	fadeIn: function(event, obj)
	{
    					//total seconds for animation
    					var totalSeconds = .2;
    					if(this.animationTime == null)
    						this.animationTime = 0;

    					if(this.animationTime < totalSeconds)
    					{
    						this.animationTime = this.animationTime + event.delta;
	    					var t = this.animationTime / totalSeconds;
	    					if(t < 1)
	    					{
	    						obj.visible = true;
	    						obj.opacity = t;
	    					}
	    				}
	    				else 
	    				{
	    					obj.visible = true;
    						obj.opacity = 1.0;
	    					this.animate = null;
	    					this.animationTime = null;
	    					this.animationState = 1;
	    				}
	},
    fadeOut: function(event, obj)
	{
    					//total seconds for animation
    					var totalSeconds = .2;
    					if(this.animationTime == null)
    						this.animationTime = 0;

    					if(this.animationTime < totalSeconds)
    					{
    						this.animationTime = this.animationTime + event.delta;
	    					var t = this.animationTime / totalSeconds;
	    					if(t < 1)
	    					{
	    						
	    						obj.opacity = 1.0 - t;
	    					}
	    				}
	    				else 
	    				{
	    					obj.visible = false;
	    					this.animate = null;
	    					this.animationTime = null;
	    					this.animationState = 0;
	    				}
	},

}




function animation_TweenPosition(startPosition, endPosition, totalTime, caller) 
{
	var startPosition = startPosition;
	var endPosition = endPosition;
	var totalTime = totalTime;
	var animationTime = null;
	var animationState = -1;
	var animate = null;
	var caller = caller;
	this.trigger = function()
	{
						switch(this.animationState)
						{
							case 0:
								this.animate = this.fadeIn;
								this.animationState = -1;
								break;
							case 1:
								this.animate = this.fadeOut;
								this.animationState = -1;
								break;
							default:
						}
	};

    this.tweenPosition = function(event, obj) 
    {
    					
    					if(this.animationTime == null)
    						this.animationTime = 0;

    					if(this.animationTime < totalTime)
    					{
    						this.animationTime = this.animationTime + event.delta;
	    					var t = this.animationTime / totalTime;
	    					if(t < 1.0)
	    					{
	    						
	    						obj.bounds.x = ((1.0 - t) * startPosition.x + t * endPosition.x);
	    						obj.bounds.y = ((1.0 - t) * startPosition.y + t * endPosition.y);
	    					}
	    					
	    				}
	    				else
	    				{
	    					obj.bounds.x = endPosition.x;
	    					obj.bounds.y = endPosition.y;
	    					this.animate = null;
	    					this.animationTime = null;
	    					this.animationState = 0;
	    					caller.afterAnimation(obj);
	    				}	
    }
};