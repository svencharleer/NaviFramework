function Menu(name, position, menuItems)
{
	//general
	
	this.name = name;
	this.x = position.x;
	this.y = position.y;
	this.renderable = new  NCRSquare(0, "menuHidden");
	this.group = [
		new Tile("menuBackground",1,{x:0,y:-10},{w:200,h:fw.view.height+20},"square",{}),
		new Tile("menuRedBar",2,{x:200, y:-10},{w:10, h:fw.view.height+20},"square",
			{
				mouseDownEvent: function(event, obj)
					{
						obj.htmlElement.parent.showHideMenu();
					}
			})
		];

	this.paperObject = null;
	



	var firstMenuItemIndex = this.group.length; //need this to iterate over menuitems
	var length = menuItems.length;

	
	for(var i = 0; i < length; i++)
	{
		this.group.push(new MenuItem(menuItems[i].name, menuItems[i].text, {x:15,y:(50+i*50)}, menuItems[i].events));
	}

	//object state

	this.state = "hidden";

	this.animatable = new NCAnimatable(["menuShown", "menuHidden"]);

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


