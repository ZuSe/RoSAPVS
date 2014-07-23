sap.ui.jsview("zy_ss14_t01_rosapvs.Users", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t01_rosapvs.Users
	*/ 
	getControllerName : function() {
		return "zy_ss14_t01_rosapvs.Users";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t01_rosapvs.Users
	*/ 
	createContent : function(oController) {
	
	  var matLayout = new sap.ui.commons.layout.MatrixLayout({
		width: "22em",
		widths: ["22em"],
	  });		
		
	  var tableUsers = new sap.ui.table.Table({
	    title: "Registered Users",
	    visibleRowCount: 10,
	    firstVisibleRow: 3,
	    selectionMode: sap.ui.table.SelectionMode.Single,	    
	  });
	
	var columnName = new sap.ui.table.Column({
	  label: new sap.ui.commons.Label({text: "User Name"}),
	  template: new sap.ui.commons.TextView().bindProperty("text", "SapUser"),
	  sortProperty: "SapUser",
	});
	var columnRole = new sap.ui.table.Column({
	  label: new sap.ui.commons.Label({text: "Role"}),
	  template: new sap.ui.commons.TextView().bindProperty("text", "Role"),
	  sortProperty: "Role",
	});
	
	tableUsers.addColumn(columnName).addColumn(columnRole);
	tableUsers.bindRows("/PrivilegeCollection");
	
	matLayout.createRow(tableUsers);
	this.addContent(matLayout);
	}
});
