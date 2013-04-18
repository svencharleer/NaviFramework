
var genericTouchEvents =
{
	 mouseDownEvent: function(event, obj)
				    {
    					obj.position = event.point;
    				},
   	dragging_mouseDown: function(event, obj)
   	{
   		obj.position = event.position;
   	},

   	dragging_mouseDrag: function(event, obj)
   	{
   		obj.position = obj.position + event.delta;
   	},

   	dragging_mouseUp: function(event, obj)
   	{
   		obj.position = event.position;
   	},
     fingerEvent: function(point, obj)
            {
              obj.position = point;
            },
 };

