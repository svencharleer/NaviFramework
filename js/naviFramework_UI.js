var fw;

function naviFramework_UI()
{
    this.paper = "";
    this.generalStyle = {
        fillColor: '#FFFFFF',
        strokeColor: '#4d4d4d',
        strokeWidth: 10 
    };
    
    this.bgItemSymbol = "";
    this.layers;
    this.tool;
    
    
    
    //------------
    // EVENTS
    //------------

    this.onMouseDown = function(event)
    {
        with(fw.paper)
        {
            //console.log("CLICK X: " + event.point.x + "- Y: " + event.point.y);
            
            var hitResult = fw.layers[1].hitTest(event.point);
            if(hitResult != null)
            {
                if(hitResult.item.mouseDownEvent != null)
                {
                    hitResult.item.mouseDownEvent(event.point);
                }
            }
        }
    }

    this.onMouseDrag = function(event)
    {
        with(fw.paper)
        {
            var hitResult = fw.layers[1].hitTest(event.point);
            if(hitResult != null)
            {
                if(hitResult.item.mouseDragEvent != null)
                {
                    hitResult.item.mouseDragEvent(event.point);
                }
            }
        }
    }

    this.onMouseUp = function(event)
    {
        with(fw.paper)
        {
            var hitResult = fw.layers[1].hitTest(event.point);
            if(hitResult != null)
            {
                if(hitResult.item.mouseUpEvent != null)
                {
                    hitResult.item.mouseUpEvent(event.point);
                }
            }
        }
    }

    this.onFingerHits = function(point)
    {
        with(this.paper)
        {
            
            //console.log("FINGER X: " + point.x + "- Y: " + point.y);
            var hitPoint = new Point(point.x, point.y);
            var hitResult = fw.layers[1].hitTest(hitPoint);
            if(hitResult != null)
            {
                if(hitResult.item.fingerEvent != null)
                {
                    hitResult.item.fingerEvent(point);
                }
            }
        }   
    }

    this.onFrame = function(event)
    {
        with(paper)
        {
            var children = fw.layers[1].children;
            for(var i=0;i < children.length; i++)
            {
                if(children[i].animationLoop != null)
                {
                    children[i].animationLoop(event);
                }
            }
        }
    }


    this.init = function(canvas)
    {
        this.paper = paper.setup(canvas);

        with(this.paper)
        {
            this.tool = tool;
            this.layers = [new Layer(), new Layer()];
            tool.onMouseDown = this.onMouseDown;
            tool.onMouseUp = this.onMouseUp;
            tool.onMouseDrag = this.onMouseDrag;
            view.onFrame = this.onFrame;
        }
        return this;
    }

    //------------
    // DRAW FUNCTIONS
    //------------
   
    this.drawTile = function(tile)
    {
        with(this.paper)
        {
            this.layers[1].activate();
            var rect = new Rectangle(new Point(tile.x,tile.y), new Size(tile.width,tile.height));
            var rectangle = new Path.Rectangle(rect);
            rectangle.style = this.generalStyle;
            rectangle.name = tile.name; 
            rectangle.mouseDownEvent = tile.mouseDownEvent;
            rectangle.mouseDragEvent = tile.mouseDownEvent;
            rectangle.mouseUpEvent = tile.mouseDownEvent;
            rectangle.fingerEvent = tile.mouseDownEvent;
            rectangle.animationLoop = tile.animationLoop;
           
        }
    }

    this.drawBackgroundItem = function()
    {
        with(this.paper)
        {
            //create symbol in case it hasn't been created yet
            //moet prolly null zijn
            if(this.bgItemSymbol == "")
            {
                var circle = new Path.Circle(new Point(0,0),10);
                circle.style = this.generalStyle;
                this.bgItemSymbol = new Symbol(circle);
            }
            this.layers[0].activate();
            
            var count = 10;
            for (var i = 0; i < count; i++) {
                // The center position is a random point in the view:
                var center = Point.random().multiply([view.size.width, view.size.height]);
                var placedSymbol = this.bgItemSymbol.place(center);
                placedSymbol.scale(i / count);
            }

            
        }

    }

}

fw = new naviFramework_UI();