
function naviFramework_UI()
{
    this.paper = "";
    this.generalStyle = {
        fillColor: '#FFFFFF',
        strokeColor: '#4d4d4d',
        strokeWidth: 10 
    };
    this.tileSymbol = "";
    this.bgItemSymbol = "";
    this.layers;
    
    this.init = function(canvas)
    {
        this.paper = paper.setup(canvas);
        with(this.paper)
        {
            this.layers = [new Layer(), new Layer()];
        }
    }
    
   
    this.drawTile = function(x,y, width, height)
    {
        with(this.paper)
        {
            //create symbol in case it hasn't been created yet
            if(this.tileSymbol == "")
            {
                
                var rect = new Rectangle(new Point(0,0), new Size(width,height));
                var rectangle = new Path.Rectangle(rect);
                rectangle.style = this.generalStyle;
                this.tileSymbol = new Symbol(rectangle);
            }
            this.layers[1].activate();
            var placed = this.tileSymbol.place(new Point(x,y));
        }
    }

    this.drawBackgroundItem = function()
    {
        with(this.paper)
        {
            if(this.bgItemSymbol == "")
            {
                var circle = new Path.Circle(new Point(0,0),10);
                circle.style = this.generalStyle;
                this.bgItemSymbol = new Symbol(circle);
            }
            this.layers[0].activate();
            
            var count = 150;
            for (var i = 0; i < count; i++) {
                // The center position is a random point in the view:
                var center = Point.random().multiply([view.size.width, view.size.height]);
                var placedSymbol = this.bgItemSymbol.place(center);
                placedSymbol.scale(i / count);
            }

            
        }

    }

}
