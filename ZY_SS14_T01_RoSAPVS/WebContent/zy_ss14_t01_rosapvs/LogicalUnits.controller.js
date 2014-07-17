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
	       
	       if (typeof success.HstList == 'string') {
	    	   hostTable.setSelectedIndex(0);
	       }
	       else {
	    	   hostTable.setSelectedIndex(success.HstList);
	       }
	       
	       if (typeof success.PltList == 'string') {
	    	   platformTable.setSelectedIndex(0);
	       }
	       else {
	    	   platformTable.setSelectedIndex(success.PltList);
	       }
	       
	       if (typeof success.AplList == 'string') {
	    	   applicationTable.setSelectedIndex(0);
	       }
	       else {
	    	   applicationTable.setSelectedIndex(success.AplList);
	       }
	       
	       // TODO Error handling, when context is null, Optimize
	       var indicesHost = hostTable.getSelectedIndices();
	       
	       while (indicesHost.length > 0) {
		       var contextHosts = hostTable.getContextByIndex(indicesHost.pop());
		       sap.ui.getCore().getModel().read(contextHosts.sPath, 0, 0, false, function(successHosts) {
		    	   console.log(successHosts.Name);
		       });
	       }

		    	  //var selected = tblHostsDetail.getSelectedIndices();
		    	  //var rowIndices = e.getParameter('rowIndices');
		            for (var i = 0; i < hostTable.length; i++) {
		             if (true) {
		            	hostTable.setSelectedIndex(i);
		            }
		            
	      }}, function(error) {
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
	    // get selected tata: var currentRowContext = oEvent.getParameter("rowContext"); 
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