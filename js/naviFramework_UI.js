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
            
            var hitResult = fw.layers[2].hitTest(event.point);
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
            var hitResult = fw.layers[2].hitTest(event.point);
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
            var hitResult = fw.layers[2].hitTest(event.point);
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
            var hitResult = fw.layers[2].hitTest(hitPoint);
            if(hitResult != null)
            {
                if(hitResult.item.raw.fingerEvent != null)
                {
                    hitResult.item.raw.fingerEvent(point);
                }
            }
        }   
    }

    this.handleFrameItem = function(event, item)
    {
        //check children first
        if(item.hasChildren())
        {
            var children = item.children;
            for(var i=0;i < children.length; i++)
            {
                this.handleFrameItem(event, children[i]);
            }
        }
        //then animate the item
        if(item.raw != null && item.raw.animationLoop != null)
        {
            item.raw.animationLoop(event,item);
        }
    }

    this.onFrame = function(event)
    {
        with(paper)
        {
            var children = fw.layers[2].children;
            for(var i=0;i < children.length; i++)
            {
                fw.handleFrameItem(event, children[i]);
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
            this.layers = [new Layer(), new Layer(), new Layer()];
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
   
    this.draw = function(object)
    {
        with(this.paper)
        {
            if(object.type == "group")
            {
                var group = new Group();
                group.position = new Point(object.x, object.y);
                group.raw = object;
                //don't draw, just add to group
                for(var j=0; j < object.subItems.length;j++)
                {
                    var child = this.draw(object.subItems[j]);
                    group.addChild(child);
                }
            }
            else if(object.type == "square")
                return this.drawTile(object);
            else if(object.type == "text")
                return this.drawText(object);
        }

    }

    this.drawAll = function(objects)
    {
        //if there's a parent, add the children to a group and attach them to the parent

        for(var i=0; i < objects.length; i++)
        {
            this.draw(objects[i]);
        }

    }

    this.drawTile = function(tile)
    {
        with(this.paper)
        {
            this.layers[tile.layer].activate();
            var rect = new Rectangle(new Point(tile.x,tile.y), new Size(tile.width(),tile.height()));
            var rectangle = new Path.Rectangle(rect);
            if(tile.style != null)
                rectangle.style = tile.style;
            else
                rectangle.style = this.generalStyle;
            rectangle.name = tile.name; 
            rectangle.raw = tile;
            return rectangle; 
        }
    }

    this.drawText = function(text)
    {
        with(this.paper)
        {
            this.layers[text.layer].activate();
            var textD = new PointText(new Point(text.x, text.y));
            textD.content = text.text;
            textD.characterStyle = text.style;
            if(text.visible == false)
                textD.visible = false;
            textD.raw = text;
            textD.name = text.name;
            return textD;
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