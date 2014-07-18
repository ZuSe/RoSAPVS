sap.ui.controller("zy_ss14_t01_rosapvs.LogicalUnits", {
	
	 /**
	   * Called when a controller is instantiated and its View controls (if
	   * available) are already created. Can be used to modify the View before it is
	   * displayed, to bind event handlers and do other one-time initialization.
	   * 
	   * @memberOf zy_ss14_t01_rosapvs.LogicalUnits
	   */
	  onInit: function() {

	  },

	  /**
	   * Similar to onAfterRendering, but this hook is invoked before the
	   * controller's View is re-rendered (NOT before the first rendering! onInit()
	   * is used for that one!).
	   * 
	   * @memberOf zy_ss14_t01_rosapvs.LogicalUnits
	   */
	  onBeforeRendering: function() {

	  },

	  /**
	   * Called when the View has been rendered (so its HTML is part of the
	   * document). Post-rendering manipulations of the HTML could be done here.
	   * This hook is the same one that SAPUI5 controls get after being rendered.
	   * 
	   * @memberOf zy_ss14_t01_rosapvs.LogicalUnits
	   */
	  onAfterRendering: function() {

	  },

	  /**
	   * Called when the Controller is destroyed. Use this one to free resources and
	   * finalize activities.
	   * 
	   * @memberOf zy_ss14_t01_rosapvs.LogicalUnits
	   */
	  onExit: function() {

	  },
	  lockInput: function() {
	    sap.ui.getCore().byId("tF_LogicalUnitId").setEditable(false);
	    sap.ui.getCore().byId("tF_LogicalUnitName").setEditable(false);
	    sap.ui.getCore().byId("dB_LogicalUnitPerson").setEditable(false).setVisible(false);
	    sap.ui.getCore().byId("formContainerLogicalUnitDetails").rerender();
	  },
	  getDetails: function() {
	    var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	    var context = tblLogicalUnits.getContextByIndex(tblLogicalUnits.getSelectedIndex());
	    if (null != context) {

	      sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function(success) {
	        console.log(success);
	        sap.ui.getCore().byId("tF_LogicalUnitId").setValue(success.Id);
	        sap.ui.getCore().byId("tF_LogicalUnitName").setValue(success.Name);
	        sap.ui.getCore().byId("tF_LogicalUnitPerson").setValue(success.Person);
	        //success.AplList, success.HstList, success.PltList
	        
	       var hostTable = sap.ui.getCore().byId('tblHostsDetail');
	       var platformTable = sap.ui.getCore().byId('tblPlatformsDetail');
	       var applicationTable = sap.ui.getCore().byId('tblApplicationsDetail');
	       hostTable.setSelectedIndex(-1);
	       platformTable.setSelectedIndex(-1);
	       applicationTable.setSelectedIndex(-1);
	       
	       if (typeof success.HstList == 'string') {
	    	   if (success.HstList) {
	    		   //var jsonHst = JSON.parse(success.HstList);
	    		   //code.log(jsonHst);
	    	   }
	       }
	       else {
	    	   //hostTable.setSelectedIndex(success.HstList);
	       }
	       
	       if (typeof success.PltList == 'string') {
	    	   if (success) {
	    		   //var jsonPlt = JSON.parse(success);
	    		   //code.log(jsonPlt);
	    	   }
	       }
	       else {
	    	   //platformTable.setSelectedIndex(success.PltList);
	       }
	       
	       if (typeof success.AplList == 'string') {
	    	   if (success.AplList) {
	    		   //var jsonApl = JSON.parse(success.AplList);
	    		   //code.log(jsonApl);
	    	   }
	       }
	       else {
	    	   //applicationTable.setSelectedIndex(success.AplList);
	       }
	       
	       // TODO Error handling, when context is null, Optimize
	       
	       // Select hosts
	       var hostId = parseInt(success.HstList);
	       console.log('hostID', hostId);
	       var lengthHostTable = hostTable.getBinding("rows").iLength;
	       console.log('HostLength', lengthHostTable);
	       
	       for (var i = 0; i < lengthHostTable; i++) {
		       var contextHosts = hostTable.getContextByIndex(i);
		       sap.ui.getCore().getModel().read(contextHosts.sPath, 0, 0, false, function(successHosts) {
			       if (successHosts.Id == hostId) {
			    	   hostTable.setSelectedIndex(i);
			       }
		       });
	       }
	       
	       // Select platforms
	       var platformId = parseInt(success.PltList);
	       console.log('platformID', platformId);
	       var lengthPlatformTable = platformTable.getBinding("rows").iLength;
	       console.log('PlatformLength', lengthPlatformTable);
	       
	       for (var i = 0; i < lengthPlatformTable; i++) {
		       var contextPlatforms = platformTable.getContextByIndex(i);
		       sap.ui.getCore().getModel().read(contextPlatforms.sPath, 0, 0, false, function(successPlatforms) {
			       if (successPlatforms.Id == platformId) {
			    	   platformTable.setSelectedIndex(i);
			       }
		       });
	       }
	       
	       // Select applications
	       var applicationId = parseInt(success.AplList);
	       console.log('applicationID', applicationId);
	       var lengthApplicationTable = applicationTable.getBinding("rows").iLength;
	       console.log('ApplicationLength', lengthApplicationTable);
	       
	       for (var i = 0; i < lengthApplicationTable; i++) {
		       var contextApplications = applicationTable.getContextByIndex(i);
		       sap.ui.getCore().getModel().read(contextApplications.sPath, 0, 0, false, function(successApplications) {
			       if (successApplications.Id == applicationId) {
			    	   applicationTable.setSelectedIndex(i);
			       }
		       });
	       }
	       
	      }, function(error) {
	        console.log(error);
	        alert(error);
	      });
	    }
	  },
	  createLogicalUnit: function() {
	    sap.ui.getCore().byId("tF_LogicalUnitId").setValue("Will be calculated");
	    sap.ui.getCore().byId("tF_LogicalUnitName").setValue("").setEditable(true);
	    sap.ui.getCore().byId("tF_LogicalUnitPerson").setValue("Please select");
	    sap.ui.getCore().byId("dB_LogicalUnitPerson").setValue("").setEditable(true).setVisible(true);
	    
	    // given: oTable.attachRowSelectionChange(function(oEvent) {
	    // get selected data: var currentRowContext = oEvent.getParameter("rowContext"); 
	       var hostTable = sap.ui.getCore().byId("tblHostsDetail");
	       hostTable.setSelectedIndex(-1);

	    	  //var selected = tblHostsDetail.getSelectedIndices();
	    	  //var rowIndices = e.getParameter('rowIndices');
	            for (var i = 0; i < hostTable.length; i++) {
	             if (true) {
	            	hostTable.setSelectedIndex(i);
	            } 
   }
	            
	 	var platformTable = sap.ui.getCore().byId("tblPlatformsDetail");
		platformTable.setSelectedIndex(-1);
		
	 	var applicationTable = sap.ui.getCore().byId("tblApplicationsDetail");
		applicationTable.setSelectedIndex(-1);
		
		
	    var submitButton = new sap.ui.commons.Button({
	      text: "Add",
	      icon: sap.ui.core.IconPool.getIconURI("create"),
	      tooltip: "Submit Data",
	      visible: true,
	      layoutData: new sap.ui.layout.form.GridElementData({
	        hCells: "2"
	      })
	    });
	    var fnPressHandler = null;
	    fnPressHandler = function(oEvent) {      
	      var entry = {
	        Name: sap.ui.getCore().byId("tF_LogicalUnitName").getValue(),
	        Person: sap.ui.getCore().byId("dB_LogicalUnitPerson").getValue(),
	        AplList: "17",
	        HstList: "3",
	        PltList: "8"
	      };
	      console.log(entry);
	      var response = sap.ui.getCore().getModel().create('/LogicalUnitCollection', entry);
	      console.log(response);
	      alert("New LogicalUnit was added successfully");
	      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
	        oEvent.getSource().detachPress(fnPressHandler);
	        submitButton.destroy();
	      };
	    };

	    sap.ui.getCore().byId("formContainerLogicalUnitDetails").addFormElement(new sap.ui.layout.form.FormElement({
	      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
	    }));

	  },
	  deleteLogicalUnit: function() {
	    var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	    var context = tblLogicalUnits.getContextByIndex(tblLogicalUnits.getSelectedIndex());
	    sap.ui.getCore().getModel().remove(context.sPath);
	    alert("LogicalUnit was deleted");
	  },
	  
	    // given: oTable.attachRowSelectionChange(function(oEvent) {
	    // get selected tata: var currentRowContext = oEvent.getParameter("rowContext"); 
	  
	  updateLogicalUnit: function() {
	    sap.ui.getCore().byId("tF_LogicalUnitName").setEditable(true);
	    sap.ui.getCore().byId("dB_LogicalUnitPerson").setEditable(true).setVisible(true);
	    var submitButton = new sap.ui.commons.Button({
	      text: "Update",
	      tooltip: "Submit Data",
	      visible: true,
	      layoutData: new sap.ui.layout.form.GridElementData({
	        hCells: "2"
	      })
	    });
	    var fnPressHandler = null;
	    fnPressHandler = function(oEvent) {      
	      var entry = {
	        Name: sap.ui.getCore().byId("tF_LogicalUnitName").getValue(),
	        Person:  sap.ui.getCore().byId("dB_LogicalUnitPerson").getValue(),
	      };
	      console.log(entry);
	      var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	      var context = tblLogicalUnits.getContextByIndex(tblLogicalUnits.getSelectedIndex());
	      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0);      
	      console.log(response);
	      alert("LogicalUnit was updated successfully");
	      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
	        oEvent.getSource().detachPress(fnPressHandler);
	        submitButton.destroy();
	      };      
	    };

	    sap.ui.getCore().byId("formContainerLogicalUnitDetails").addFormElement(new sap.ui.layout.form.FormElement({
	      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
	    }));

	  },


	});