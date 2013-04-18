function Menu(name, position, menuItems)
{
	//general
	this.type ="group";

	this.name = name;
	this.x = position.x;
	this.y = position.y;

	this.group = new NCGroup(2, [
		new Tile("menuBackground",1,{x:0,y:-10},{w:200,h:fw.view.size.height+20},{fillColor: '#ffffff', strokeWidth: 0},{}),
		new Tile("menuRedBar",1,{x:200, y:-10},{w:10, h:fw.view.size.height+20},{fillColor: '#fe5f66', strokeWidth:0},
			{
				mouseDownEvent: function(point, obj)
					{
						obj.parent.raw.showHideMenu();
					}
			})
		]);

	this.paperObject = null;
	



	var firstMenuItemIndex = this.group.objects.length; //need this to iterate over menuitems
	var length = menuItems.length;

	
	for(var i = 0; i < length; i++)
	{
		this.group.objects.push(new MenuItem(menuItems[i].name, menuItems[i].text, {x:15,y:(50+i*50)}, menuItems[i].events));
	}

	//object state

	this.state = "hidden";

	this.animatable = new NCAnimatable([new animation_TweenPosition({x: this.x, y:this.y}, {x: this.x +190, y:this.y}, .2, this),new animation_TweenPosition({x: this.x +190, y:this.y}, {x: this.x, y:this.y}, .2, this)]);

	//animation related
	//-----------------


	this.afterAnimation = function()
					{
						if(this.state == "becoming_visible")
						{
						 	this.state = "visible";
							for(var i = firstMenuItemIndex; i < this.group.objects.length;i++)
								this.group.objects[i].showText();
    					
						}
						if(this.state == "becoming_hidden") 
						{
							this.state = "hidden";
							for(var i = firstMenuItemIndex; i < this.group.objects.length;i++)
								this.group.objects[i].hideText();
    					
						}
						
						
					},
	//methods
	this.showHideMenu = function()
					{
						if(this.state == "hidden")
						{
							this.animatable.switchToAnimation(0);
							this.state = "becoming_visible";
						}
						else if(this.state == "visible")
						{
							this.animatable.switchToAnimation(1);
							this.state = "becoming_hidden";
						}
						
					}
}


