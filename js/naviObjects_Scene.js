function naviScene(name)
{
	this.name = name;
	this.renderables = [];
	this.status = "not loaded"; // "loaded" "entering" "exiting"
	this.init = function()
	{
		fw.pushScene(this);
		// load everything that is needed
	};
	this.update = function()
	{
		// every frame we check if there's any action that needs to be performed
	}
	this.animate = function()
	{
		// custom animtations for entire scene
	};
	this.enter = function()
	{
		//a scene will maybe animate into place
		this.status = "entering";
		fw.addObjectsToCanvas(this.renderables);
		this.status = "loaded";
	}
	this.exit = function()
	{
		// a scene might animate out of screen
		this.status = "exiting";
		fw.removeObjectsFromCanvas(this.renderables);
		this.status = "not loaded";
	}
}