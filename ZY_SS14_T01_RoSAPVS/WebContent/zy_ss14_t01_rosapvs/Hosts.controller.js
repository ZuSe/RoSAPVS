
sap.ui.controller("zy_ss14_t01_rosapvs.Hosts", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t01_rosapvs.Hosts
*/
	onInit: function() {
		var tblHostsOverview = new sap.ui.table.Table("tblHostsOverview",
				{ 
			visibleRowCount : 10,  
			ExpandedVisibleRowCount : 20,  
			selectionMode : sap.ui.table.SelectionMode.Single,
			toolbar: new sap.ui.commons.Toolbar({
				items: [
				        new sap.ui.commons.Button({
				        	text: "Create",
				        	press: function() {
				        		oController.Create();
				        	}
				        }),
				        new sap.ui.commons.Button({
				        	text: "Update",
				        	press: function() {
				        		oController.Update();
				        	}
				        }),
				        new sap.ui.commons.Button({
				        	text: "Delete",
				        	press: function() {
				        		oController.Delete();
				        	}
				        }),
				        ]
			}),
			editable : false  
		});
		tblHostsOverview.addColumn(  
		         new sap.ui.table.Column({  
		              label: new sap.ui.commons.Label({text: "Id"}),  
		              template: new sap.ui.commons.TextField().bindProperty("value", "Id"),  
		              sortProperty: "Id"  
		    }));  
		    tblHostsOverview.addColumn(  
		         new sap.ui.table.Column({  
		              label: new sap.ui.commons.Label({text: "Name"}),  
		              template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		              sortProperty: "Name"  
		    }));  
		    tblHostsOverview.addColumn(  
		         new sap.ui.table.Column({  
		              label: new sap.ui.commons.Label({text: "Active"}),  
		              template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),  
		              sortProperty: "IsActive"  
		    }));	   
		tblHostsOverview.bindRows("/HostCollection");	
		this.getView().addContent(tblHostsOverview);
	
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t01_rosapvs.Hosts
*/
	onBeforeRendering: function() {
		
        
	},
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf zy_ss14_t01_rosapvs.Hosts
	 */
	onAfterRendering: function(e) {
		
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t01_rosapvs.Hosts
*/
	onExit: function() {

	},
});
