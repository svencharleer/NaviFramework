var fw;

function naviFramework_UI()
{
    this.paper;
    this.view;
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
                if(hitResult.item.raw != null && hitResult.item.raw.mouseDownEvent != null)
                {
                    hitResult.item.raw.mouseDownEvent(event.point, hitResult.item);
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
                if(hitResult.item.raw != null && hitResult.item.raw.mouseDragEvent != null)
                {
                    hitResult.item.mouseDragEvent(event.point, hitResult.item);
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
                if(hitResult.item.raw != null && hitResult.item.raw.mouseUpEvent != null)
                {
                    hitResult.item.mouseUpEvent(event.point, hitResult.item);
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
                if(hitResult.item.raw.fingerEvent != null)
                {
                    hitResult.item.raw.fingerEvent(point);
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
                if(children[i].raw.animationLoop != null)
                {
                    children[i].raw.animationLoop(event, children[i]);
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
            this.view = view;
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
   
    this.draw = function(objects)
    {
        
            for(var i=0; i < objects.length; i++)
            {
                if(objects[i].type == "square")
                    this.drawTile(objects[i]);
                else if(objects[i].type == "text")
                    this.drawText(objects[i]);
                if(objects[i].subItems != null)
                    this.draw(objects[i].subItems);
            }

    }

    this.drawTile = function(tile)
    {
        with(this.paper)
        {
            this.layers[1].activate();
            var rect = new Rectangle(new Point(tile.x,tile.y), new Size(tile.width(),tile.height()));
            var rectangle = new Path.Rectangle(rect);
            if(tile.style != null)
                rectangle.style = tile.style;
            else
                rectangle.style = this.generalStyle;
            rectangle.name = tile.name; 
            rectangle.raw = tile;

           
        }
    }

    this.drawText = function(text)
    {
        with(this.paper)
        {
            this.layers[1].activate();
            var textD = new PointText(new Point(text.x, text.y));
            textD.content = text.text;
            textD.characterStyle = text.style;
            if(text.visible == false)
                textD.visible = false;
            textD.raw = text;
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