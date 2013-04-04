//fw is loaded before this file. so you can access fw.

var genericTouchEvents =
{
	mouseDownEvent: function(point, obj)
				    {
    					obj.position = point;
    				}
 };
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


var text1 = 
{
	type: "text",
	name: "menuBadges",
	text: "Badges",
	x: 15,
	y: 50,
	mouseDownEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	animationLoop1: genericAnimation.fadeIn,
	animationLoop2: genericAnimation.fadeOut,
	showHideText: function()
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

	style: {
				fillColor:'#4d4d4d',
				fontSize:30,
				font: 'Helvetica'
			},
	visible: false
}

var text2 = 
{
	type: "text",
	name: "menuStudents",
	text: "Students",
	x: 15,
	y: 100,
	mouseDownEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	animationLoop1: genericAnimation.fadeIn,
	animationLoop2: genericAnimation.fadeOut,
	showHideText: function()
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
	style: {

				fillColor:'#4d4d4d',
				fontSize:30,
				font: 'Helvetica'
			},
	visible: false
}


var menuRedBar = 
{
	type: "square",
	name: "menuRedBar",
	
	x:190,
	y: -10,
	width: function() { return 10;},
	height: function() { return fw.view.size.height+20;},
	mouseDownEvent: function(point, obj)
					{
						obj.parent.raw.showHideMenu();
					},
	mouseUpEvent: null,
	mouseDragEvent: null,
	fingerEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	style: {
        fillColor: '#efefef',
        strokeColor: '#fe5f66',
        strokeWidth: 20
    }
};

var menuBackground = 
{
	type: "square",
	name: "menuBackground",
	
	x:0,
	y: -10,
	width: function() { return 200;},
	height: function() { return fw.view.size.height+20;},
	mouseUpEvent: null,
	mouseDragEvent: null,
	fingerEvent: null,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	style: {
        fillColor: '#ffffff',
        strokeColor: '#fe5f66',
        strokeWidth: 0
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


var menu =
{
	type: "group",
	name: "menu",
	subItems: [menuBackground, menuRedBar, text1, text2],
	x: -200,
	y: 0,
	animationTime: null,
	animationState: 0,
	animationLoop: null,
	animationLoop: null,
	animationLoop1:function(event, obj)
    				{
    					var startPosition = {x: this.x, y:this.y};
						var endPosition = {x: this.x + 190, y: this.y};
    					//total seconds for animation
    					var totalTime = .2;
    					var result = genericAnimation.tweenPosition(event, obj, startPosition, endPosition, this.animationTime, totalTime);
    					this.animationTime = result.time;
    					if(result.done)
    					{
    						obj.children["menuBadges"].raw.showHideText();
	    					obj.children["menuStudents"].raw.showHideText();
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    					this.animationState = 1;
	    				}
    				},
	animationLoop2:function(event, obj)
    				{
    					var startPosition = {x: this.x + 190, y:this.y};
						var endPosition = {x: this.x, y: this.y};
    					//total seconds for animation
    					var totalTime = .2;
    					var result = genericAnimation.tweenPosition(event, obj, startPosition, endPosition, this.animationTime, totalTime);
    					this.animationTime = result.time;
    					if(result.done)
    					{	
    						obj.children["menuBadges"].raw.showHideText();
    						obj.children["menuStudents"].raw.showHideText();
	    					this.animationLoop = null;
	    					this.animationTime = null;
	    					this.animationState = 0;
	    				}
    				},
	showHideMenu: function()
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
}


