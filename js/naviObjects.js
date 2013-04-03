//fw is loaded before this file. so you can access fw.

var genericTouchEvents =
{
	mouseDownEvent: function(point, obj)
				    {
    					obj.position = point;
    				}
};

var text1 = 
{
	type: "text",
	name: "menuBadges",
	text: "Badges",
	x: 0,
	y: 50,
	mouseDownEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	animationLoop1: function(event, obj)
					{
						//fade
					},
	style: {
				fillColor:'#000000',
				fontSize:30,
			},
	visible: false
}

var text2 = 
{
	type: "text",
	name: "menuStudents",
	text: "Students",
	x: 0,
	y: 100,
	mouseDownEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	animationLoop1: function(event, obj)
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
	    					
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    					this.animationState = 1;
	    				}
					},
	style: {

				fillColor:'#000000',
				fontSize:30,
			},
	visible: false
}


var tile1 = 
{
	type: "square",
	name: "tile1",
	subItems: [text1, text2],
	x: 0,
	y: 0,
	width: function() { return 1;},
	height: function() { return fw.view.size.height;},
	mouseDownEvent: function(point, obj)
					{
						switch(this.animationState)
						{
							case 0:
								this.animationLoop = this.animationLoop1;
								this.animationState = -1;
								break;
							case 1:
								this.animationLoop = this.animationLoop2;
								this.animationState = -1;
								break;
							default:
						}
					},
	mouseUpEvent: null,
	mouseDragEvent: null,
	fingerEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
    animationLoop1: function(event, obj)
    				{
    					var startWidth = 1;
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
	    					for(var i=0;i<this.subItems.length;i++)
	    					{
	    						this.subItems[i].animationLoop = this.subItems[i].animationLoop1;
	    					}
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    					this.animationState = 1;
	    				}
    				},
    animationLoop2: function(event, obj)
    				{
    					var startWidth = 200;
						var endWidth = 1;
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
	    					this.animationState = 0;
	    				}
    				},
	style: {
        fillColor: '#efefef',
        strokeColor: '#4d4d4d',
        strokeWidth: 1 
    }
};

var tile2 = 
{
	type: "square",
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



