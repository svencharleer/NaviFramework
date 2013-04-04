var genericAnimation = 
 {
 	//fade in for items / no specific arguments so replace original anim
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
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    					this.animationState = 1;
	    				}
    				},
    //fade in for items / no specific arguments so replace original anim
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
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    					this.animationState = 0;
	    				}
    				},
    //tween for item. return true when finished
    tweenPosition: function(event, obj, startPosition, endPosition, time, totalTime) 
    {
    					
    					if(time == null)
    						time = 0;

    					if(time < totalTime)
    					{
    						time = time + event.delta;
	    					var t = time / totalTime;
	    					if(t < 1.0)
	    					{
	    						
	    						obj.bounds.x = ((1.0 - t) * startPosition.x + t * endPosition.x);
	    						obj.bounds.y = ((1.0 - t) * startPosition.y + t * endPosition.y);
	    					}
	    					return {time: time, done: false};
	    				}
	    				else
	    				{
	    					obj.bounds.x = endPosition.x;
	    					obj.bounds.y = endPosition.y;
	    					return {time: time, done: true};
	    				}	
    }
};