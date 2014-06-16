sap.ui.jsview("zy_ss14_t01_rosapvs.Platforms", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t01_rosapvs.Platforms
	*/ 
	getControllerName : function() {
		return "zy_ss14_t01_rosapvs.Platforms";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t01_rosapvs.Platforms
	*/ 
	createContent : function(oController) {
		// Create a new Matrix Layout for the View
		var layoutPlatforms = new sap.ui.commons.layout.MatrixLayout('layoutPlatforms');    
	    layoutPlatforms.setWidth('50%');
	    
	    var panPlatforms = new sap.ui.commons.Panel('panPlatforms');              
	    var titPlatforms = new sap.ui.commons.Title('titPlatforms');     
	    titPlatforms.setText('Platforms');     
	    panPlatforms.setTitle(titPlatforms);     
	    var tblPlatforms = new sap.ui.table.DataTable("tblPlatforms",{ 
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
	    editable : false  });  
	    tblPlatforms.addColumn(  
	         new sap.ui.table.Column({  
	              label: new sap.ui.commons.Label({text: "Id"}),  
	              template: new sap.ui.commons.TextField().bindProperty("value", "Id"),  
	              sortProperty: "Id"  
	    }));  
	    tblPlatforms.addColumn(  
	         new sap.ui.table.Column({  
	              label: new sap.ui.commons.Label({text: "Name"}),  
	              template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
	              sortProperty: "Name"  
	    }));  
	    tblPlatforms.addColumn(  
	         new sap.ui.table.Column({  
	              label: new sap.ui.commons.Label({text: "Active"}),  
	              template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),  
	              sortProperty: "IsActive"  
	    }));	   
	     
	    tblPlatforms.bindRows("/PlatformCollection");  
	    panPlatforms.addContent(tblPlatforms);    
	    layoutPlatforms.createRow(panPlatforms);
	    this.addContent(layoutPlatforms);
	}

});
