//fw is loaded before this file. so you can access fw.
//fw is loaded before this file. so you can access fw.

//SUB ITEMS
//---------
var text1 = 
{
	type: "text",
	name: "menuBadges",
	text: "Badges",
	layer: 2,
	x: 15,
	y: 50,
	mouseDownEvent: function(point, obj)
	{
						badgeData.reload();
	},

	animation: animation_FadeInOut,
	showHideText: animation.trigger,

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
	layer: 2,
	x: 15,
	y: 100,
	
	animation: animation_FadeInOut,
	showHideText: animation.trigger,

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
	layer: 1,
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
	layer: 1,
	x:0,
	y: -10,
	width: function() { return 200;},
	height: function() { return fw.view.size.height+20;},
	mouseUpEvent: null,
	mouseDragEvent: null,
	fingerEvent: null,
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
	layer: 2,
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


//ACTUAL ITEM

var menu =
{
	type: "group",
	name: "menu",
	layer: 2,
	subItems: [menuBackground, menuRedBar, text1, text2],
	x: -200,
	y: 0,
	
	animations: [
			new animation_TweenPosition({x: this.x, y:this.y}, {x: this.x +190, y:this.y}, .2, this),
			new animation_TweenPosition({x: this.x +190, y:this.y}, {x: this.x, y:this.y}, .2, this)
				]

	afterAnimation: function(obj)
					{
						
						obj.children["menuBadges"].raw.showHideText();
    					obj.children["menuStudents"].raw.showHideText();
						
					}
	showHideMenu: function()
					{
						this.animation.trigger();
					},
}


