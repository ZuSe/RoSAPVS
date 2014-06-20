sap.ui.jsview("zy_ss14_t01_rosapvs.Landing", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t01_rosapvs.Landing
	*/ 
	getControllerName : function() {
		return "zy_ss14_t01_rosapvs.Landing";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t01_rosapvs.Landing
	*/ 
	createContent : function(oController) {
	    var matLayout = new sap.ui.commons.layout.MatrixLayout({
		width: "30em",
		widths: ["5em","25em"],
	    });
	    matLayout.createRow(new sap.ui.commons.Label({text:"User"}),new sap.ui.commons.TextField("tF_LoginUsername",{placeholder: "SAP-User"}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Password"}),new sap.ui.commons.TextField("tF_LoginPassword",{placeholder:"Password"}));
	    matLayout.createRow(new sap.ui.commons.Button("btn_LoginSubmit", {text: "Sign In", press: function(){oController.signInButtonListener(); }} ));
	    this.addContent(matLayout);
	}

});
