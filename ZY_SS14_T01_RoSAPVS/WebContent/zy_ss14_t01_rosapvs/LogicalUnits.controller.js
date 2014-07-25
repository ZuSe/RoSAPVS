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
	  disableTableButtons : function()
	  {
	    var btnsOfTable = sap.ui.getCore().byId("toolbarTableLogicalUnit").getItems();
	    console.log(btnsOfTable);
	      $.each(btnsOfTable, function(index, element)
	              {
	                  element.setEnabled(false);
	              });
	  },
	  enableTableButtons: function()
	  {
	    $.each(sap.ui.getCore().byId("toolbarTableLogicalUnit").getItems(), function(index, element)
	            {
	                element.setEnabled(true);
	            });
	  },  	  
	  getDetails: function() {
	    this.enableTableButtons();
	    var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	    var context = tblLogicalUnits.getContextByIndex(tblLogicalUnits.getSelectedIndex());
	    if (null != context) {

	      sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function(success) {
	        console.log(success);
	        sap.ui.getCore().byId("tF_LogicalUnitId").setValue(success.Id);
	        sap.ui.getCore().byId("tF_LogicalUnitName").setValue(success.Name);
	        sap.ui.getCore().byId("tF_LogicalUnitPerson").setValue(success.Person);
	        
	       var hostTable = sap.ui.getCore().byId('tblHostsDetail');
	       var platformTable = sap.ui.getCore().byId('tblPlatformsDetail');
	       var applicationTable = sap.ui.getCore().byId('tblApplicationsDetail');
	       hostTable.setSelectedIndex(-1);
	       hostTable.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
	       platformTable.setSelectedIndex(-1);
	       platformTable.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
	       applicationTable.setSelectedIndex(-1);
	       applicationTable.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
	       
	       // Select hosts
	       var hostIds = JSON.parse("[" + success.HstList + "]");
	       var lengthHostTable = hostTable.getBinding("rows").iLength;
	       
	       for (var i = 0; i < lengthHostTable; i++) {
		       var contextHosts = hostTable.getContextByIndex(i);
		       sap.ui.getCore().getModel().read(contextHosts.sPath, 0, 0, false, function(successHosts) {
			       if (($.inArray(successHosts.Id, hostIds)) != -1) {
			    	   hostTable.addSelectionInterval(i,i);
			       }
		       });
	       }
	       
	       // Select platforms
	       var platformIds = JSON.parse("[" + success.PltList + "]");
	       var lengthPlatformTable = platformTable.getBinding("rows").iLength;
	       
	       for (var i = 0; i < lengthPlatformTable; i++) {
		       var contextPlatforms = platformTable.getContextByIndex(i);
		       sap.ui.getCore().getModel().read(contextPlatforms.sPath, 0, 0, false, function(successPlatforms) {
			       if (($.inArray(successPlatforms.Id, platformIds)) != -1) {
			    	   platformTable.addSelectionInterval(i,i);
			       }
		       });
	       }
	       
	       // Select applications
	       var applicationIds = JSON.parse("[" + success.AplList + "]");
	       var lengthApplicationTable = applicationTable.getBinding("rows").iLength;
	       
	       for (var i = 0; i < lengthApplicationTable; i++) {
		       var contextApplications = applicationTable.getContextByIndex(i);
		       sap.ui.getCore().getModel().read(contextApplications.sPath, 0, 0, false, function(successApplications) {
			       if (($.inArray(successApplications.Id, applicationIds)) != -1) {
			    	   applicationTable.addSelectionInterval(i,i);
			       }
		       });
	       }
	       
	      }, function(error) {
	        console.log(error);
	      	var oMessage = new sap.ui.core.Message({
	      		text : 'Unable to retrieve data.',
	    		timestamp : (new Date()).toUTCString()
	    	});
	    	oMessage.setLevel(sap.ui.core.MessageType.Error);
	      sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	      });
	    }
	  },
	  createLogicalUnit: function() {
	    this.disableTableButtons();
	    sap.ui.getCore().byId("tF_LogicalUnitId").setValue("Will be calculated");
	    sap.ui.getCore().byId("tF_LogicalUnitName").setValue("").setEditable(true);
	    sap.ui.getCore().byId("tF_LogicalUnitPerson").setValue("Please select");
	    sap.ui.getCore().byId("dB_LogicalUnitPerson").setValue("").setEditable(true).setVisible(true);
	    
	    var hostTable = sap.ui.getCore().byId("tblHostsDetail");
	    hostTable.setSelectedIndex(-1);
	    hostTable.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
	    
	 	var platformTable = sap.ui.getCore().byId("tblPlatformsDetail");
		platformTable.setSelectedIndex(-1);
		platformTable.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
		
	 	var applicationTable = sap.ui.getCore().byId("tblApplicationsDetail");
		applicationTable.setSelectedIndex(-1);
		applicationTable.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
		
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
	    
	    	var selectedIndicesHosts = hostTable.getSelectedIndices();
	    	var selectedIndicesPlatforms = platformTable.getSelectedIndices();
	    	var selectedIndicesApplications = applicationTable.getSelectedIndices();
	    	
	    	var selectedHosts = new Array();
	    	var selectedPlatforms = new Array();
	    	var selectedApplications = new Array();
	    	
	    	for (var i = 0; i < selectedIndicesHosts.length; i++) {
	    		var contextHosts = hostTable.getContextByIndex(selectedIndicesHosts[i]);
			       sap.ui.getCore().getModel().read(contextHosts.sPath, 0, 0, false, function(successHosts) {
			    	   selectedHosts.push(successHosts.Id);
			       });
	    	}
	    	
	    	for (var i = 0; i < selectedIndicesPlatforms.length; i++) {
	    		var contextPlatforms = platformTable.getContextByIndex(selectedIndicesPlatforms[i]);
			       sap.ui.getCore().getModel().read(contextPlatforms.sPath, 0, 0, false, function(successPlatforms) {
			    	   selectedPlatforms.push(successPlatforms.Id);
			       });
	    	}
	    	
	    	for (var i = 0; i < selectedIndicesApplications.length; i++) {
	    		var contextApplications = applicationTable.getContextByIndex(selectedIndicesApplications[i]);
			       sap.ui.getCore().getModel().read(contextApplications.sPath, 0, 0, false, function(successApplications) {
			    	   selectedApplications.push(successApplications.Id);
			       });
	    	}
	    	
	    	console.log(selectedHosts);
	    	console.log(selectedPlatforms);
	    	console.log(selectedApplications);
	            
	      var entry = {
	        Name: sap.ui.getCore().byId("tF_LogicalUnitName").getValue(),
	        Person: sap.ui.getCore().byId("dB_LogicalUnitPerson").getValue(),
	        AplList: selectedApplications.toString(),
	        HstList: selectedHosts.toString(),
	        PltList: selectedPlatforms.toString()
	      };
	      console.log(entry);
	      var response = sap.ui.getCore().getModel().create('/LogicalUnitCollection', entry);
	      console.log(response);
	      var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	      tblLogicalUnits.getModel().refresh(true);
	      tblLogicalUnits.setSelectedIndex(tblLogicalUnits.getBinding("rows").iLength-1);
	  	var oMessage = new sap.ui.core.Message({
	  		text : 'Logical Unit ' + sap.ui.getCore().byId("tF_LogicalUnitName").getValue() + ' was created successfully.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Success);
	  sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
	        oEvent.getSource().detachPress(fnPressHandler);
	        submitButton.destroy();
	        this.enableTableButtons();
	      };
	    };

	    sap.ui.getCore().byId("formContainerLogicalUnitDetails").addFormElement(new sap.ui.layout.form.FormElement({
	      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
	    }));

	  },
	  deleteLogicalUnit: function() {
	    var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	    var context = tblLogicalUnits.getContextByIndex(tblLogicalUnits.getSelectedIndex());
	    var nameDeleted = sap.ui.getCore().byId("tF_LogicalUnitName").getValue();
	    sap.ui.getCore().getModel().remove(context.sPath);
		var oMessage = new sap.ui.core.Message({
			text : 'Logical Unit ' + nameDeleted + ' was deleted successfully.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Success);
	  sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	  },
	  
	  updateLogicalUnit: function() {
	    this.disableTableButtons();
	    sap.ui.getCore().byId("tF_LogicalUnitName").setEditable(true);
	    sap.ui.getCore().byId("dB_LogicalUnitPerson").setEditable(true).setVisible(true);
	    
	    var hostTable = sap.ui.getCore().byId("tblHostsDetail"); 
	 	var platformTable = sap.ui.getCore().byId("tblPlatformsDetail");
	 	var applicationTable = sap.ui.getCore().byId("tblApplicationsDetail");
	    
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
	    	var selectedIndicesHosts = hostTable.getSelectedIndices();
	    	var selectedIndicesPlatforms = platformTable.getSelectedIndices();
	    	var selectedIndicesApplications = applicationTable.getSelectedIndices();
	    	
	    	var selectedHosts = new Array();
	    	var selectedPlatforms = new Array();
	    	var selectedApplications = new Array();
	    	
	    	for (var i = 0; i < selectedIndicesHosts.length; i++) {
	    		var contextHosts = hostTable.getContextByIndex(selectedIndicesHosts[i]);
			       sap.ui.getCore().getModel().read(contextHosts.sPath, 0, 0, false, function(successHosts) {
			    	   selectedHosts.push(successHosts.Id);
			       });
	    	}
	    	
	    	for (var i = 0; i < selectedIndicesPlatforms.length; i++) {
	    		var contextPlatforms = platformTable.getContextByIndex(selectedIndicesPlatforms[i]);
			       sap.ui.getCore().getModel().read(contextPlatforms.sPath, 0, 0, false, function(successPlatforms) {
			    	   selectedPlatforms.push(successPlatforms.Id);
			       });
	    	}
	    	
	    	for (var i = 0; i < selectedIndicesApplications.length; i++) {
	    		var contextApplications = applicationTable.getContextByIndex(selectedIndicesApplications[i]);
			       sap.ui.getCore().getModel().read(contextApplications.sPath, 0, 0, false, function(successApplications) {
			    	   selectedApplications.push(successApplications.Id);
			       });
	    	}
	    	
	    	console.log(selectedHosts);
	    	console.log(selectedPlatforms);
	    	console.log(selectedApplications);
	            
	      var entry = {
	        Name: sap.ui.getCore().byId("tF_LogicalUnitName").getValue(),
	        Person: sap.ui.getCore().byId("dB_LogicalUnitPerson").getValue(),
	        AplList: selectedApplications.toString(),
	        HstList: selectedHosts.toString(),
	        PltList: selectedPlatforms.toString()
	      };
	      console.log(entry);
	      var tblLogicalUnits = sap.ui.getCore().byId('tblLogicalUnits');
	      var context = tblLogicalUnits.getContextByIndex(tblLogicalUnits.getSelectedIndex());
	      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0);      
	      console.log(response);
	  	var oMessage = new sap.ui.core.Message({
	  		text : 'Logical Unit ' + sap.ui.getCore().byId("tF_LogicalUnitName").getValue() + ' was updated successfully.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Success);
	  sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
	        oEvent.getSource().detachPress(fnPressHandler);
	        submitButton.destroy();
	        this.enableTableButtons();
	      };      
	    };

	    sap.ui.getCore().byId("formContainerLogicalUnitDetails").addFormElement(new sap.ui.layout.form.FormElement({
	      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
	    }));

	  },


	});