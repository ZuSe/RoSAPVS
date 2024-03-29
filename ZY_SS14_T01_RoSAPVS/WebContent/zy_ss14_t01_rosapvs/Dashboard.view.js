sap.ui.jsview("zy_ss14_t01_rosapvs.Dashboard", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t01_rosapvs.Dashboard
	*/ 
	getControllerName : function() {
		return "zy_ss14_t01_rosapvs.Dashboard";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t01_rosapvs.Dashboard
	*/ 
	createContent : function(oController) {
	    var matrixLayoutDashboard = new sap.ui.commons.layout.MatrixLayout("matrixLayoutDashboard");
	    	    
	    this.addContent(matrixLayoutDashboard); 
	    oController.addPanels();
	}

});
