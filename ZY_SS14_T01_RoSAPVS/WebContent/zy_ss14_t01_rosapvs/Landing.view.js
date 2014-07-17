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
		jQuery.sap.require("sap.ui.core.IconPool");
	    var loginPanel = new sap.ui.commons.Panel({
	        title: new sap.ui.core.Title({
	          text: "Login",
	          icon: sap.ui.core.IconPool.getIconURI("log")
	        }),
	        applyContentPadding: true,
	        showCollapseIcon: false,
	      });
		
	    var matLayout = new sap.ui.commons.layout.MatrixLayout({
		width: "22em",
		widths: ["7em","15em"],
	    });
	    matLayout.createRow(null, null);
	    matLayout.createRow(new sap.ui.commons.Label({text:"User"}),new sap.ui.commons.TextField("tF_LoginUsername",{placeholder: "SAP-User"}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Password"}),new sap.ui.commons.PasswordField("tF_LoginPassword",{placeholder:"Password"}));
	    matLayout.createRow(null, null);
	    
	    matLayout.createRow(null, new sap.ui.commons.Button("btn_LoginSubmit", {text: "Sign In", icon: sap.ui.core.IconPool.getIconURI("locked"), press: function(){oController.signInButtonListener(); }} ));
	    
	    loginPanel.addContent(matLayout);
	    this.addContent(loginPanel);
	}

});
