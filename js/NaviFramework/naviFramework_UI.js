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


TouchTest = function(point, objects)
{
    var touchedObjects = [];
    for(var i = 0; i < objects.length; i++)
    {
        if(objects[i].touchable)
        {
            var position = objects[i].getPosition();
            var size = objects[i].getSize();
            if(point.x > position.x 
                && point.y > position.y 
                && point.x < position.x + size.width 
                && point.y < position.y + size.height)
            {
                console.log("Object " + objects[i].element.id + " hit");
                
                touchedObjects.push(objects[i]);
            }
        }
    }
    return touchedObjects;
}

function DocumentLayer()
{
    this.objects = [];
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

    this.onMouseDown = function(hitPoint, identifier)
    {
        this.onFingerHits(hitPoint, identifier);
    }

    this.onMouseDrag = function(hitPoint, identifier)
    {
       this.onFingerMoved(hitPoint, identifier);
    }

    this.onMouseUp = function(hitPoint)
    {
       this.onFingerLetGo(hitPoint);
    }

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
        
        var hitResults = TouchTest(hitPoint,fw.layers[2].objects);
        while(hitResults.length > 0)
        {
            var hitResult = hitResults.pop();
            if(hitResult != null)
            {
                this.fingerToObjects[identifier] = hitResult;
                if(hitResult.touchable.fingerEvent != null)
                {
                    hitResult.touchable.fingerEvent(hitPoint, hitResult);
                }
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
        //think this might become physics loop
    }

    this.onFrame = function(event)
    {
        //take care of animations
        /*var children = fw.layers[2].objects;
        for(var i=0;i < children.length; i++)
        {
            fw.handleFrameItem(event, children[i]);
        }*/
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


    this.addObjectToDocument = function(object)
    {
        this.layers[object.layer].objects.push(object);
        object.activate();
        if(object.group != null)
        {
            for(var i=0; i < object.group.length; i++)
            {
                this.addObjectToDocument(object.group[i]);
            }
        }
    }

    this.addObjectsToDocument = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            document.body.appendChild(objects[i].element);
            this.addObjectToDocument(objects[i]);
            
        }

    }

    this.removeObjectFromDocument = function(object)
    {
        $("#" +object.element.id).remove(); //doesn't really delete it it seems :/
    }

    this.removeObjectsFromDocument = function(objects)
    {
        for(var i=0; i < objects.length; i++)
        {
            this.removeObjectFromDocument(objects[i]);
        }
    }

 

}

//touch handler
var TouchLoop =
{
    timer:0,
    updateStarted: false,
    updateLetGoStarted: false,
    updateMovedStarted:false,
    touches: [],
    touchesLetGo: [],
    touchesMoved: [],

    update: function() {
        if (TouchLoop.updateStarted) return;
        TouchLoop.updateStarted = true;
        var i, len = TouchLoop.touches.length;
        for (i=0; i<len; i++) {
            fw.onFingerHits({x:TouchLoop.touches[i].pageX, y:TouchLoop.touches[i].pageY}, TouchLoop.touches[i].identifier);
        }
        TouchLoop.updateMoved();
        TouchLoop.updateLetGo();
        TouchLoop.touches = [];
        TouchLoop.updateStarted = false;
        fw.onFrame();
    },

    updateMoved: function() {
        if(TouchLoop.updateMovedStarted) return;
        TouchLoop.updateMovedStarted = true;
        var finger = TouchLoop.touchesMoved.shift();
        while(finger != null)
        {

                fw.onFingerMoved({x:finger.pageX, y:finger.pageY}, finger.identifier);
                finger = TouchLoop.touchesMoved.shift();
        }
        TouchLoop.updateMovedStarted = false;
    },

    updateLetGo: function() {
        if(TouchLoop.updateLetGoStarted) return;
        TouchLoop.updateLetGoStarted = true;
        var finger = TouchLoop.touchesLetGo.shift();
        while(finger != null)
        {
                fw.onFingerLetGo(finger.identifier);
                finger = TouchLoop.touchesLetGo.shift();
        }
        TouchLoop.updateLetGoStarted = false;
    },

    init: function() {
        this.timer = setInterval(this.update, 15);

        document.addEventListener('touchend', function() {
            this.touchesLetGo = this.touchesLetGo.concat(event.changedTouches);   
            
        });
        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
            this.touchesMoved = event.changedTouches;

        });
        document.addEventListener('touchstart', function(event) {
            console.log('start');
            this.touches = event.targetTouches;
            
         });
        document.addEventListener('mousedown', function(event) {
            console.log('mouse touchy');
            fw.onMouseDown({x:event.pageX, y:event.pageY}, "mouse");
         });
        document.addEventListener('mousemove', function(event) {
            fw.onMouseDrag({x:event.pageX, y:event.pageY}, "mouse");
         });
        document.addEventListener('mouseup', function(event) {
            fw.onMouseUp("mouse");
     });
    }
};

fw = new naviFramework_UI();