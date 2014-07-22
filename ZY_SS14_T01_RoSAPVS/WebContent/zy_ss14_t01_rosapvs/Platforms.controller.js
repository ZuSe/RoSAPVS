sap.ui.controller("zy_ss14_t01_rosapvs.Platforms", {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Platforms
   */
  onInit: function() {

  },

  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf zy_ss14_t01_rosapvs.Platforms
   */
  onBeforeRendering: function() {

  },

  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Platforms
   */
  onAfterRendering: function() {

  },

  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Platforms
   */
  onExit: function() {

  },
  lockInput: function() {
    sap.ui.getCore().byId("tF_PlatformsId").setEditable(false);
    sap.ui.getCore().byId("tF_PlatformsName").setEditable(false);
    sap.ui.getCore().byId("tF_PlatformsReqCPU").setEditable(false);
    sap.ui.getCore().byId("tF_PlatformsReqRAM").setEditable(false);
    sap.ui.getCore().byId("tF_PlatformsReqHDD").setEditable(false);
    sap.ui.getCore().byId("dB_PlatformsHost").setEditable(false).setVisible(false);
    sap.ui.getCore().byId("dB_PlatformsPerson").setEditable(false).setVisible(false);
    sap.ui.getCore().byId("formContainerPlatformDetails").rerender();
  },
  getDetails: function() {
    var tblPlatforms = sap.ui.getCore().byId('tblPlatforms');
    var context = tblPlatforms.getContextByIndex(tblPlatforms.getSelectedIndex());
    if (null != context) {

      sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function(success) {
        console.log(success);
        sap.ui.getCore().byId("tF_PlatformsId").setValue(success.Id);
        sap.ui.getCore().byId("tF_PlatformsName").setValue(success.Name);
        sap.ui.getCore().byId("tF_PlatformsReqCPU").setValue(success.ReqCpu);
        sap.ui.getCore().byId("tF_PlatformsReqRAM").setValue(success.ReqRam);
        sap.ui.getCore().byId("tF_PlatformsReqHDD").setValue(success.ReqHdd);       
        sap.ui.getCore().byId("tF_PlatformsPerson").setValue(success.Person);
        sap.ui.getCore().byId("tF_PlatformsHost").setValue(success.Host);
      }, function(error) {
        console.log(error);
        sap.ui.commons.MessageBox.alert("Unable to retrieve data.",'',"Error");
      });
    }
  },
  createPlatform: function() {
    sap.ui.getCore().byId("tF_PlatformsId").setValue("Will be calculated");
    sap.ui.getCore().byId("tF_PlatformsName").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsReqCPU").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsReqRAM").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsReqHDD").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsPerson").setValue("Please select");
    sap.ui.getCore().byId("tF_PlatformsHost").setValue("Please select");
    sap.ui.getCore().byId("dB_PlatformsHost").setValue("").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_PlatformsPerson").setValue("").setEditable(true).setVisible(true);
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
        Name: sap.ui.getCore().byId("tF_PlatformsName").getValue(),
        ReqCpu: 1 * sap.ui.getCore().byId("tF_PlatformsReqCPU").getValue(),
        ReqRam: sap.ui.getCore().byId("tF_PlatformsReqRAM").getValue(),
        ReqHdd: sap.ui.getCore().byId("tF_PlatformsReqHDD").getValue(),
        Host: 1 * sap.ui.getCore().byId("dB_PlatformsHost").getValue(),
        Person: sap.ui.getCore().byId("dB_PlatformsPerson").getValue(),
      };
      console.log(entry);
      var response = sap.ui.getCore().getModel().create('/PlatformCollection', entry);
      console.log(response);
      var tblPlatforms = sap.ui.getCore().byId("tblPlatforms");
      tblPlatforms.getModel().refresh(true);
      tblPlatforms.setSelectedIndex(tblPlatforms.getBinding("rows").iLength-1);
      sap.ui.commons.MessageBox.alert("New Platform was created successfully.",'',"Notification");
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };
    };

    sap.ui.getCore().byId("formContainerPlatformDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },
  deletePlatform: function() {
    var tblPlatforms = sap.ui.getCore().byId('tblPlatforms');
    var context = tblPlatforms.getContextByIndex(tblPlatforms.getSelectedIndex());
    sap.ui.getCore().getModel().remove(context.sPath);
    console.log(tblPlatforms.getSelectedIndex());
    tblPlatforms.setSelectedIndex(-1);
    sap.ui.commons.MessageBox.alert("Platform was deleted.",'',"Notification");
  },
  updatePlatform: function() {
    sap.ui.getCore().byId("tF_PlatformsName").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsReqCPU").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsReqRAM").setEditable(true);
    sap.ui.getCore().byId("tF_PlatformsReqHDD").setEditable(true);
    sap.ui.getCore().byId("dB_PlatformsHost").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("dB_PlatformsPerson").setEditable(true).setVisible(true);
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
        Name: sap.ui.getCore().byId("tF_PlatformsName").getValue(),
        ReqCpu: 1 * sap.ui.getCore().byId("tF_PlatformsReqCPU").getValue(),
        ReqRam: sap.ui.getCore().byId("tF_PlatformsReqRAM").getValue(),
        ReqHdd: sap.ui.getCore().byId("tF_PlatformsReqHDD").getValue(),
        Host: 1 * sap.ui.getCore().byId("dB_PlatformsHost").getValue(),
        Person:  sap.ui.getCore().byId("dB_PlatformsPerson").getValue(),
      };
      console.log(entry);
      var tblPlatforms = sap.ui.getCore().byId('tblPlatforms');
      var context = tblPlatforms.getContextByIndex(tblPlatforms.getSelectedIndex());
      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0);      
      console.log(response);
      sap.ui.commons.MessageBox.alert("Platform was updated successfully.",'',"Notification");
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };      
    };

    sap.ui.getCore().byId("formContainerPlatformDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },


});