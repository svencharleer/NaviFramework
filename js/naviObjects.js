//fw is loaded before this file. so you can access fw.

var genericTouchEvents =
{
	mouseDownEvent: function(point, obj)
				    {
    					obj.position = point;
    				}
};

var tile1 = 
{
	name: "tile1",
	x: 100,
	y: 100,
	width: function() { return 10;},
	height: function() { return fw.view.size.height;},
	mouseDownEvent: function(point, obj)
					{
						this.animationLoop = this.animationLoop1;

					},
	mouseUpEvent: null,
	mouseDragEvent: null,
	fingerEvent: null,
	animationTime: null,
	animationLoop: null,
    animationLoop1: function(event, obj)
    				{
    					var startWidth = 0;
						var endWidth = 200;
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
	    						console.log(event.count);
	    						obj.bounds.width = ( (1.0 - t) * startWidth + t * endWidth);
	    					}
	    				}
	    				else 
	    				{
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    				}
    				}
};

var tile2 = 
{
	name: "tile1",
	x: 200,
	y: 200,
	width: function() { return 50;},
	height: function() { return 50;},
	mouseDownEvent: genericTouchEvents.mouseDownEvent,
	mouseUpEvent: null,
	mouseDragEvent: null,
	fingerEvent: null,
    animationLoop: function(event,obj)
    				{
    					obj.rotate(3);
    				}
};