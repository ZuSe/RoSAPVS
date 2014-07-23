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
		var oMessage = new sap.ui.core.Message({
			text : 'Application ' + sap.ui.getCore().byId("tF_ApplicationName").getValue() + ' was created successfully.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Success);
      sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };
    };

    sap.ui.getCore().byId("formContainerApplicationDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },
  deleteApplication: function() {
    var tblApplications = sap.ui.getCore().byId('tblApplications');
    var context = tblApplications.getContextByIndex(tblApplications.getSelectedIndex());
    var nameDeleted = sap.ui.getCore().byId("tF_ApplicationName").getValue();
    sap.ui.getCore().getModel().remove(context.sPath);
	var oMessage = new sap.ui.core.Message({
		text : 'Application ' + nameDeleted + ' was deleted successfully.',
		timestamp : (new Date()).toUTCString()
	});
	oMessage.setLevel(sap.ui.core.MessageType.Success);
  sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
  },
  updateApplication: function() {
    sap.ui.getCore().byId("tF_ApplicationName").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqCPU").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqRAM").setEditable(true);
    sap.ui.getCore().byId("tF_ApplicationReqHDD").setEditable(true);
    sap.ui.getCore().byId("dB_ApplicationSoftwareType").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_ApplicationPlatform").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_ApplicationPerson").setEditable(true).setVisible(true);
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
      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0);      
      console.log(response);
		var oMessage = new sap.ui.core.Message({
			text : 'Application ' + sap.ui.getCore().byId("tF_ApplicationName").getValue() + ' was updated successfully.',
			timestamp : (new Date()).toUTCString()
		});
		oMessage.setLevel(sap.ui.core.MessageType.Success);
    sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };      
    };

    sap.ui.getCore().byId("formContainerApplicationDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },


});