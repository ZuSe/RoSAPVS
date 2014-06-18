sap.ui.controller("zy_ss14_t01_rosapvs.Landing", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t01_rosapvs.Landing
*/
	onInit: function() {
		var modCM = new sap.ui.model.odata.ODataModel(  
                "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/",  
                                    true,  
                                    "ABAP-12",  
                                    "p4ssw0rd");
		sap.ui.getCore().setModel(modCM);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t01_rosapvs.Landing
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t01_rosapvs.Landing
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t01_rosapvs.Landing
*/
//	onExit: function() {
//
//	}

});