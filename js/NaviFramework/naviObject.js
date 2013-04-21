function NObject(name, layer, position, size, cssClass, tag, innerHTML, events, animations, states, objects) 
{
	//HTML NODE
	this.element = null;
	//POSITION
	var _x, _y;
	this.setPosition = function(point)
	{
		this.element.style.left = point.x + 'px';
    	this.element.style.top = point.y + 'px';
    	_x = point.x;
    	_y = point.y;
	}
	this.getPosition = function()
	{
		var jelement = $("#"+this.element.id);
		return {x:jelement.offset().left, y:jelement.offset().top};
	}
	//SIZE
	var _width, _height;
	this.setSize = function(size)
	{
		this.element.style.width = size.width + 'px';
    	this.element.style.height = size.height + 'px';
    	_width = size.width;
    	_height = size.height;
	}
	this.getSize = function()
	{
		var jelement = $("#"+this.element.id);
		return {width:jelement.width(), height:jelement.height()};
	}
	this.layer = layer;
	
	//TELLS ENGINE SOMETHING CHANGED
	this.updateMe = false;

	//INIT
	{
		this.element = document.createElement(tag);
	    this.element.innerHTML = innerHTML;
	    this.element.id = name;
	    this.element.className = cssClass;
	    if(size != null)
	    	this.setSize(size);
	    this.element.style.position = 'absolute';
	    if(position != null)
	    	this.setPosition(position);
	    this.element.naviData = this;
	   
	    
	    if(objects != null)
	    {
	        for(var i = 0; i < objects.length; i++)
	        {
	            this.element.appendChild(objects[i].element);
	        }
	        
	    }
	}

	//COMPONENTS
	//this.afterAnimation = null;
	//this.afterTransition = null;
	this.touchable = new NCTouchable(this, events);
	this.animatable = new NCAnimatable(this, animations);
	this.state = new NCState(this, states);

	//ACTIVATE object
	this.activate = function()
	{
		this.state.switchToState(0);
	}
      
	

	
}