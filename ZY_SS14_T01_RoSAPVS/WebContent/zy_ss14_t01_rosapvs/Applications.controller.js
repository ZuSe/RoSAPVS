sap.ui.controller("zy_ss14_t01_rosapvs.Applications", {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Applications
   */
  onInit: function() {

  },

  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf zy_ss14_t01_rosapvs.Applications
   */
  onBeforeRendering: function() {

  },

  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Applications
   */
  onAfterRendering: function() {

  },

  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Applications
   */
  onExit: function() {

  },
	
  clear: function() {
	    sap.ui.getCore().byId("tF_ApplicationId").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationName").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationReqCPU").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationReqRAM").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationReqHDD").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationSoftwareType").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationPerson").setValue("");
	    sap.ui.getCore().byId("tF_ApplicationPlatform").setValue("");
		if (sap.ui.getCore().byId("createButtonApplications") != null) {
			sap.ui.getCore().byId("createButtonApplications").destroy();
		}
		if (sap.ui.getCore().byId("updateButtonApplications") != null) {
			sap.ui.getCore().byId("updateButtonApplications").destroy();
		}
  },
  
  disableTableButtons : function()
  {
    var btnsOfTable = sap.ui.getCore().byId("toolbarTableApplications").getItems();
    console.log(btnsOfTable);
      $.each(btnsOfTable, function(index, element)
              {
                  element.setEnabled(false);
              });
  },
  enableTableButtons: function()
  {
    $.each(sap.ui.getCore().byId("toolbarTableApplications").getItems(), function(index, element)
            {
                element.setEnabled(true);
            });
  },  
  
  lockInput: function() {
    sap.ui.getCore().byId("tF_ApplicationId").setEditable(false);
    sap.ui.getCore().byId("tF_ApplicationName").setEditable(false);
    sap.ui.getCore().byId("tF_ApplicationReqCPU").setEditable(false);
    sap.ui.getCore().byId("tF_ApplicationReqRAM").setEditable(false);
    sap.ui.getCore().byId("tF_ApplicationReqHDD").setEditable(false);
    sap.ui.getCore().byId("dB_ApplicationSoftwareType").setEditable(false).setVisible(false);
    sap.ui.getCore().byId("dB_ApplicationPlatform").setEditable(false).setVisible(false);
    sap.ui.getCore().byId("dB_ApplicationPerson").setEditable(false).setVisible(false);
    sap.ui.getCore().byId("formContainerApplicationDetails").rerender();
  },
  getDetails: function() {
    this.enableTableButtons();
	this.lockInput();
	if (sap.ui.getCore().byId("createButtonApplications") != null) {
		sap.ui.getCore().byId("createButtonApplications").destroy();
	}
	if (sap.ui.getCore().byId("updateButtonApplications") != null) {
		sap.ui.getCore().byId("updateButtonApplications").destroy();
	}
    var tblApplications = sap.ui.getCore().byId('tblApplications');
    var context = tblApplications.getContextByIndex(tblApplications.getSelectedIndex());
    if (null != context) {
      sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function(success) {
        console.log(success);
        sap.ui.getCore().byId("tF_ApplicationId").setValue(success.Id);
        sap.ui.getCore().byId("tF_ApplicationName").setValue(success.Name);
        sap.ui.getCore().byId("tF_ApplicationReqCPU").setValue(success.ReqCpu);
        sap.ui.getCore().byId("tF_ApplicationReqRAM").setValue(success.ReqRam);
        sap.ui.getCore().byId("tF_ApplicationReqHDD").setValue(success.ReqHdd);       
        sap.ui.getCore().byId("tF_ApplicationSoftwareType").setValue("("+success.Swt.Id +") "+ success.Swt.Name);
        sap.ui.getCore().byId("tF_ApplicationPerson").setValue(success.Person);
        sap.ui.getCore().byId("tF_ApplicationPlatform").setValue(success.Platform);
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
  createApplication: function() {
    this.disableTableButtons();
	sap.ui.getCore().byId('tblApplications').setSelectedIndex(-1); 
	if (sap.ui.getCore().byId("updateButtonApplications") != null) {
		sap.ui.getCore().byId("updateButtonApplications").destroy();
	}
    sap.ui.getCore().byId("tF_ApplicationId").setValue("Will be calculated");
    sap.ui.getCore().byId("tF_ApplicationName").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqCPU").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqRAM").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqHDD").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationSoftwareType").setValue("Please select");
    sap.ui.getCore().byId("tF_ApplicationPerson").setValue("Please select");
    sap.ui.getCore().byId("tF_ApplicationPlatform").setValue("Please select");
    sap.ui.getCore().byId("dB_ApplicationSoftwareType").setValue("").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_ApplicationPlatform").setValue("").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_ApplicationPerson").setValue("").setEditable(true).setVisible(true);
    
    if(sap.ui.getCore().byId("createButtonApplications") == null) {
	    new sap.ui.commons.Button('createButtonApplications', {
	      text: "Add",
	      icon: sap.ui.core.IconPool.getIconURI("create"),
	      tooltip: "Submit Data",
	      visible: true,
	      layoutData: new sap.ui.layout.form.GridElementData({
	        hCells: "2"
	      })
	    });
    }
    
    var fnPressHandler = null;
    fnPressHandler = function(oEvent) {      
      var entry = {
        Name: sap.ui.getCore().byId("tF_ApplicationName").getValue(),
        ReqCpu: 1 * sap.ui.getCore().byId("tF_ApplicationReqCPU").getValue(),
        ReqRam: sap.ui.getCore().byId("tF_ApplicationReqRAM").getValue(),
        ReqHdd: sap.ui.getCore().byId("tF_ApplicationReqHDD").getValue(),
        Swt: {
          Id: 1 * sap.ui.getCore().byId("dB_ApplicationSoftwareType").getValue(),
          Name: "",
          Comment: "",
          Selected: "",
        },
        Platform: 1 * sap.ui.getCore().byId("dB_ApplicationPlatform").getValue(),
        Person: sap.ui.getCore().byId("dB_ApplicationPerson").getValue(),
      };
      console.log(entry);
      var response = sap.ui.getCore().getModel().create('/ApplicationCollection', entry);
      console.log(response);
      var tblApplications = sap.ui.getCore().byId('tblApplications');
      tblApplications.getModel().refresh(true);
      tblApplications.setSelectedIndex(tblApplications.getBinding("rows").iLength-1);
      // TODO Refresh ID after creating (instead of showing Will be calculated)
      // TODO not working context (ID)
      var contextApplications = tblApplications.getContextByIndex(tblApplications.getBinding("rows").iLength-1);
      if (null != contextApplications) {
      sap.ui.getCore().getModel().read(contextApplications.sPath, 0, 0, false, function(successApplications) {
      sap.ui.getCore().byId("tF_ApplicationId").setValue(successApplications.Id);
      var oMessage = new sap.ui.core.Message({
        text : 'Application ' + sap.ui.getCore().byId("tF_ApplicationName").getValue() + ' was created successfully.',
      timestamp : (new Date()).toUTCString(),
    });
      oMessage.setLevel(sap.ui.core.MessageType.Sucess);
      sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);     
      }, function(error)
      {
        var oMessage = new sap.ui.core.Message({
          text : 'Failed to create Application ' + sap.ui.getCore().byId("tF_ApplicationName").getValue(),
        timestamp : (new Date()).toUTCString(),
      });
        oMessage.setLevel(sap.ui.core.MessageType.Error);
        sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
      }
      
      );
      }
		
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        sap.ui.controller("zy_ss14_t01_rosapvs.Applications").enableTableButtons();
      };
    };

    if (sap.ui.getCore().byId("createButtonApplications") != null) {
    sap.ui.getCore().byId("formContainerApplicationDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [sap.ui.getCore().byId("createButtonApplications").attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));
    }

  },
  deleteApplication: function() {
	if (sap.ui.getCore().byId("tF_ApplicationId").getValue() == "Will be calculated" || sap.ui.getCore().byId("tF_ApplicationId").getValue() == "") {
		this.lockInput();
		this.clear();
		var oMessage = new sap.ui.core.Message({
			text : 'Warning: No application selected to delete.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Warning);
	sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	}
	else {
	    var tblApplications = sap.ui.getCore().byId('tblApplications');
	    var context = tblApplications.getContextByIndex(tblApplications.getSelectedIndex());
	    var nameDeleted = sap.ui.getCore().byId("tF_ApplicationName").getValue();
	    sap.ui.getCore().getModel().remove(context.sPath);
	    this.clear();
	    tblApplications.setSelectedIndex(-1);
		var oMessage = new sap.ui.core.Message({
			text : 'Application ' + nameDeleted + ' was deleted successfully.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Success);
	  sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	  }
  },
  updateApplication: function() {
  this.disableTableButtons();
	if (sap.ui.getCore().byId("tF_ApplicationId").getValue() == "Will be calculated" || sap.ui.getCore().byId("tF_ApplicationId").getValue() == "") {
		this.lockInput();
		this.clear();
		var oMessage = new sap.ui.core.Message({
			text : 'Warning: No application selected to update.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Warning);
	  sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
	}
	else {
    sap.ui.getCore().byId("tF_ApplicationName").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqCPU").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqRAM").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqHDD").setEditable(true);
    sap.ui.getCore().byId("dB_ApplicationSoftwareType").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_ApplicationPlatform").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_ApplicationPerson").setEditable(true).setVisible(true);
    if(sap.ui.getCore().byId("updateButtonApplications") == null) {
	    new sap.ui.commons.Button('updateButtonApplications', {
	      text: "Update",
	      tooltip: "Submit Data",
	      visible: true,
	      layoutData: new sap.ui.layout.form.GridElementData({
	        hCells: "2"
	      })
	    });
    }
    var fnPressHandler = null;
    fnPressHandler = function(oEvent) {      
      var entry = {
        Name: sap.ui.getCore().byId("tF_ApplicationName").getValue(),
        ReqCpu: 1 * sap.ui.getCore().byId("tF_ApplicationReqCPU").getValue(),
        ReqRam: sap.ui.getCore().byId("tF_ApplicationReqRAM").getValue(),
        ReqHdd: sap.ui.getCore().byId("tF_ApplicationReqHDD").getValue(),
        Swt: {
          Id: 1 * sap.ui.getCore().byId("dB_ApplicationSoftwareType").getValue(),
          Name: "",
          Comment: "",
          Selected: "",
        },
        Platform: 1 * sap.ui.getCore().byId("dB_ApplicationPlatform").getValue(),
        Person:  sap.ui.getCore().byId("dB_ApplicationPerson").getValue(),
      };
      console.log(entry);
      var tblApplications = sap.ui.getCore().byId('tblApplications');
      var context = tblApplications.getContextByIndex(tblApplications.getSelectedIndex());
      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0,function(success){
        var oMessage = new sap.ui.core.Message({
          text : 'Applications ' + sap.ui.getCore().byId("tF_ApplicationName").getValue() + ' was updated successfully.',
          timestamp : (new Date()).toUTCString(),
        });
          oMessage.setLevel(sap.ui.core.MessageType.Sucess);
          sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
          
        },function(error){
          var oMessage = new sap.ui.core.Message({
            text : 'Failed to update Application ' + sap.ui.getCore().byId("tF_ApplicationName").getValue(),
          timestamp : (new Date()).toUTCString(),
        });
          oMessage.setLevel(sap.ui.core.MessageType.Error);
          sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
        });
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        sap.ui.controller("zy_ss14_t01_rosapvs.Applications").enableTableButtons();
      };      
    };

    if (sap.ui.getCore().byId("updateButtonApplications") != null) {
    sap.ui.getCore().byId("formContainerApplicationDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [sap.ui.getCore().byId("updateButtonApplications").attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));
    }

  }
},


});