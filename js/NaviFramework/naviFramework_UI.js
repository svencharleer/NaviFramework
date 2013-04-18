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

    this.scenes = [];
    

    
    
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
                if(hitResult.item.raw != null && hitResult.item.raw.touchable != null && hitResult.item.raw.touchable.mouseDownEvent != null)
                {
                    hitResult.item.raw.touchable.mouseDownEvent(event, hitResult.item);
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
                if(hitResult.item.raw != null && hitResult.item.raw.touchable != null && hitResult.item.raw.touchable.mouseDragEvent != null)
                {
                    hitResult.item.raw.touchable.mouseDragEvent(event, hitResult.item);
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
                if(hitResult.item.raw != null && hitResult.item.raw.touchable != null && hitResult.item.raw.touchable.mouseUpEvent != null)
                {
                    hitResult.item.raw.touchable.mouseUpEvent(event, hitResult.item);
                }
            }
        }
    }

    this.fingerToObjects = {};
    this.onFingerHits = function(point, identifier)
    {
        with(this.paper)
        {
            var hitResult = null;
            //console.log("FINGER X: " + point.x + "- Y: " + point.y);
            if(this.fingerToObjects[identifier] != null)
                hitResult = this.fingerToObjects[identifier];
            else
            {
                var hitPoint = new Point(point.x, point.y);
                hitResult = fw.layers[2].hitTest(hitPoint);
            }
            if(hitResult != null)
            {
                if(hitResult.item.raw != null && hitResult.item.raw.touchable != null && hitResult.item.raw.touchable.fingerEvent != null)
                {
                    hitResult.item.raw.touchable.fingerEvent(point, hitResult.item);
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
        if(item.raw != null && item.raw.animatable != null && item.raw.animatable.activeAnimations != null && item.raw.animatable.activeAnimations.length > 0)
        {

            $.each(item.raw.animatable.activeAnimations, 
                function(i, animationObject){ 
                    if(animationObject.animate != null) 
                        animationObject.animate(event, item)
                });
        }
    }

    this.onFrame = function(event)
    {
        //take care of animations
        with(paper)
        {
            var children = fw.layers[2].children;
            for(var i=0;i < children.length; i++)
            {
                fw.handleFrameItem(event, children[i]);
            }
        }
        //run updates on top scene
        if(fw.scenes != null && fw.scenes.length > 0)
        {
            fw.scenes[fw.scenes.length-1].update.call(fw.scenes[fw.scenes.length-1]);
        }

    }


    this.init = function(canvas)
    {
        this.paper = paper.setup(canvas);
        with(this.paper)
        {
            this.tool = tool;
            this.view = view;
            this.layers = [new Layer(), new Layer(), new Layer(), new Layer()];
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
   

    this.pushScene = function(scene)
    {
        this.scenes.push(scene);
    }

    this.addObjectToCanvas = function(object)
    {
        with(this.paper)
        {
            if(object.group != null)
            {
                this.layers[object.group.layer].activate();
                var group = new Group();
                group.name = object.name;
                group.position = new Point(object.x, object.y);
                group.raw = object;
                
                object.paperObject = group;
                //don't draw, just add to group
                for(var j=0; j < object.group.objects.length;j++)
                {
                    var child = this.addObjectToCanvas(object.group.objects[j]);
                    group.addChild(child);
                }
            }
            if(object.renderable != null)
            {
                if(object.renderable.type == "square")
                    return this.addSquare(object);
                else if(object.renderable.type == "image")
                    return this.addImage(object);
                else if(object.renderable.type == "text")
                    return this.addText(object);
            }
        }

    }

    this.removeObjectFromCanvas = function(object)
    {
        with(this.paper)
        {
            var layer = 0;
            if(object.renderable != null)
                layer = object.renderable.layer;
            if(object.group != null)
                layer = object.group.layer;
            this.layers[layer].children[object.name].remove();
        }

    }

    this.addObjectsToCanvas = function(objects)
    {
        //if there's a parent, add the children to a group and attach them to the parent

        for(var i=0; i < objects.length; i++)
        {
            this.addObjectToCanvas(objects[i]);
        }

    }

    this.removeObjectsFromCanvas = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            this.removeObjectFromCanvas(objects[i]);
        }
    }

    this.addSquare = function(square)
    {
        with(this.paper)
        {
            this.layers[square.renderable.layer].activate();
            var rect = new Rectangle(new Point(square.x,square.y), new Size(square.width,square.height));
            var rectangle = new Path.Rectangle(rect);
                rectangle.style = square.renderable.style;
            rectangle.name = square.name; 
            rectangle.raw = square;
            return rectangle; 
        }
    }

    this.addImage = function(image)
    {
        with(this.paper)
        {
            this.layers[image.renderable.layer].activate();
            var raster = new Raster(image.renderable.filename);
            raster.position = new Point(image.x,image.y);
            raster.scale(image.width/raster.size.width,image.height/raster.size.height);
    
            raster.name = image.name; 
            raster.raw = image;
            return raster; 
        }
    }

    this.addText = function(text)
    {
        with(this.paper)
        {
            this.layers[text.renderable.layer].activate();
            var textD = new PointText(new Point(text.x, text.y));
            textD.content = text.renderable.text;
            textD.characterStyle = text.renderable.style;
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