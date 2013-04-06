
function Menu(name, position, menuItems)
{
	//general
	this.type ="group";
	this.name = name;
	this.layer = 2;
	this.paperObject = null;
	
	//group
	this.subItems = [
		new Tile("menuBackground",1,{x:0,y:-10},{w:200,h:fw.view.size.height+20},{fillColor: '#ffffff', strokeWidth: 0},{}),
		new Tile("menuRedBar",1,{x:200, y:-10},{w:10, h:fw.view.size.height+20},{fillColor: '#fe5f66', strokeWidth:0},
			{
				mouseDownEvent: function(point, obj)
					{
						obj.parent.raw.showHideMenu();
					}
			})
		]

	var firstMenuItemIndex = this.subItems.length; //need this to iterate over menuitems
	var length = menuItems.length;

	
	for(var i = 0; i < length; i++)
	{
		this.subItems.push(new Text(menuItems[i].name, menuItems[i].text, {x:15,y:(50+i*50)}, menuItems[i].events));
	}

	//object state
	this.x = position.x;
	this.y = position.y;
	this.state = "hidden";

	//animation related
	//-----------------
	this.activeAnimations = [];
	var anim1 = new animation_TweenPosition({x: this.x, y:this.y}, {x: this.x +190, y:this.y}, .2, this);
	var anim2 = new animation_TweenPosition({x: this.x +190, y:this.y}, {x: this.x, y:this.y}, .2, this);
	this.animations = [anim1, anim2];

	this.afterAnimation = function()
					{
						if(this.state == "becoming_visible") this.state = "visible";
						if(this.state == "becoming_hidden") this.state = "hidden";
						for(var i = firstMenuItemIndex; i < this.subItems.length;i++)
							this.subItems[i].showHideText();
    					
						
					},
	//methods
	this.showHideMenu = function()
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
}


