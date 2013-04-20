var fw;

function PaperCanvas(paper)
{
    var canvas;
    var objects = [];
    var paper = paper;
    this.drawCircle = function(point, radius)
    {
        with(paper)
        {
            var circle = new Path.Circle(new Point(point.x, point.y), radius);
            circle.style = {
            fillColor: "#99FF99",
            strokeColor: '#4d4d4d',
            strokeWidth: 1};
            objects.push(circle); 
        }
    }
    this.position = function(position)
    {
        canvas.style.left = position.x;
        canvas.style.top = position.y;
    }
    this.init = function(name, position,size)
    {
        var element = document.createElement("canvas");
        element.id = name;
        element.className = "transit";
        element.width = size.w;
        element.height = size.h;
        element.style.position = 'absolute';
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
        element.style.WebkitTransform = 'translateZ(0)';
        element.style.MozTransform = 'translateZ(0)';
        element.style.OTransform = 'translateZ(0)';
        element.style.msTransform = 'translateZ(0)';
        element.style.transform = 'translateZ(0)';
        document.body.appendChild(element);
        canvas = element;
        paper = paper.setup(canvas);
        with(paper)
        {
            this.tool = tool;
            this.view = view;
            this.layers = [new Layer()];
//            tool.onMouseDown = this.onMouseDown;
//            tool.onMouseUp = this.onMouseUp;
//            tool.onMouseDrag = this.onMouseDrag;
//            view.onFrame = this.onFrame;
        }
        return this;
    }
    this.reset = function()
    {
        var object = objects.pop();
        while(object != null)
        {
            var child = document.getElementById(canvas.id);
            document.body.removeChild(child);
            object.remove();
            object = objects.pop();
            //test
        }
    }
}


function DocumentLayer()
{
    this.objects = [];
    this.touchTest = function(point)
    {
        for(var i = 0; i < this.objects.length; i++)
        {
            if(this.objects[i].touchable != null)
            {
                var position = this.objects[i].getPosition();
                var size = this.objects[i].getSize();
                if(point.x > position.x 
                    && point.y > position.y 
                    && point.x < position.x + size.width 
                    && point.y < position.y + size.height)
                {
                    console.log("Object " + this.objects[i].name + " hit");
                    return this.objects[i]; //maybe later return all or a max of first X? although layers might prevent its necessaty
                    
                }
            }
        }
    }
}

function naviFramework_UI()
{
    this.layers = [];
    this.scenes = [];
    this.view = {width: $(window).width(), height: $(window).height()};
    
    this.init = function()
    {
        this.layers = [new DocumentLayer(), new DocumentLayer(), new DocumentLayer(), new DocumentLayer()];
        this.paper = paper;
    }
    
    
    //------------
    // EVENTS
    //------------

    /*this.onMouseDown = function(event)
    {
        var hitResult = fw.layers[2].touchTest(event.point);
        if(hitResult != null)
        {
            if(hitResult.item.raw != null && hitResult.item.raw.touchable != null && hitResult.item.raw.touchable.mouseDownEvent != null)
            {
                hitResult.item.raw.touchable.mouseDownEvent(event, hitResult.item);
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
    }*/

    this.fingerToObjects = {};
    this.fingerToCursors = {};
    this.onFingerHits = function(hitPoint, identifier)
    {
        if(this.fingerToCursors[identifier] != null)
            return; // we're already handling this finger
        //draw indicators of where we touch (interesting when testing on mbp)
        //(could also be useful to make touch pretty :P particles?)
        var canvas = new PaperCanvas(this.paper);
        canvas.init(identifier, hitPoint, {w:50, h:50});
        canvas.drawCircle({x: 25, y:25}, 10 );
        this.fingerToCursors[identifier] = canvas;
        
        var hitResult = fw.layers[2].touchTest(hitPoint);
        
        if(hitResult != null)
        {
            this.fingerToObjects[identifier] = hitResult;
            if(hitResult.touchable.fingerEvent != null)
            {
                hitResult.touchable.fingerEvent(hitPoint, hitResult);
            }
        } 
    }
    this.onFingerLetGo = function(identifier)
    {   
        if(this.fingerToCursors[identifier] != null)
        {   
            //hm we have to find a way to get rid of this
            //this.fingerToCursors[identifier].remove();
            this.fingerToCursors[identifier].reset(); //doesn't get rid of the object though
            this.fingerToCursors[identifier] = null;
        }
        this.fingerToObjects[identifier] = null;
    }

    this.onFingerMoved = function(hitPoint, identifier) 
    {   
        //draw indicators of where we touch (interesting when testing on mbp)
        //(could also be useful to make touch pretty :P particles?)
        if(this.fingerToCursors[identifier] != null)
        {
            canvas = this.fingerToCursors[identifier];
            canvas.position(hitPoint);
        }
        else
        {
            console.log("FINGER " + identifier + " moved but was not found");
        }
        if(this.fingerToObjects[identifier] != null)
        {
            var hitResult = this.fingerToObjects[identifier];
            if(hitResult.touchable.fingerEvent != null)
            {
                hitResult.touchable.fingerEvent(hitPoint, hitResult);
            }
        }   
    }


    this.handleFrameItem = function(event, item)
    {
        //check children first
        /*if(item.hasChildren())
        {
            var children = item.children;
            for(var i=0;i < children.length; i++)
            {
                this.handleFrameItem(event, children[i]);
            }
        }*/
        //then animate the item
        if(item.animatable != null)
        {
            var node = $("#"+item.element.id);
            var anim = item.animatable.activate.pop();
            while(anim != null)
            {
                if(!node.hasClass(anim))
                    node.addClass(anim);
                item.animatable.active.push(anim);
                anim = item.animatable.activate.pop();
            }
            var deactiveAnim = item.animatable.deactivate.pop();
            while(deactiveAnim != null)
            {
                if(node.hasClass(deactiveAnim))
                    node.removeClass(deactiveAnim);
                deactiveAnim = item.animatable.deactivate.pop();
            }

        }
        //do stte things here as well
    }

    this.onFrame = function(event)
    {
        //take care of animations
        var children = fw.layers[2].objects;
        for(var i=0;i < children.length; i++)
        {
            fw.handleFrameItem(event, children[i]);
        }
        if(fw.scenes != null && fw.scenes.length > 0)
        {
            fw.scenes[fw.scenes.length-1].update.call(fw.scenes[fw.scenes.length-1]);
        }

    }


 

    //------------
    // DRAW FUNCTIONS
    //------------
   

    this.pushScene = function(scene)
    {
        this.scenes.push(scene);
    }

   

   /* this.addObjectToCanvas = function(object)
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

    } */



    this.addObjectsToDocument = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            this.layers[objects[i].layer].objects.push(objects[i]);
            document.body.appendChild(objects[i].element);
        }

    }

    this.removeObjectFromDocument = function(object)
    {
        document.removeChild(object.name); //doesn't really delete it it seems :/
    }

    this.removeObjectsFromDocument = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            this.removeObjectFromDocument(objects[i]);
        }
    }

 /*   this.addSquare = function(square)
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

    } */

}

fw = new naviFramework_UI();