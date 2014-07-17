sap.ui.controller("zy_ss14_t01_rosapvs.Hosts", {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Hosts
   */
  onInit: function() {

  },

  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
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
  onAfterRendering: function() {

  },

  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Hosts
   */
  onExit: function() {

  },
  lockInput: function() {
    sap.ui.getCore().byId("tF_HostsId").setEditable(false);
    sap.ui.getCore().byId("tF_HostsName").setEditable(false);
    sap.ui.getCore().byId("tF_HostsCpu").setEditable(false);
    sap.ui.getCore().byId("tF_HostsRam").setEditable(false);
    sap.ui.getCore().byId("tF_HostsHdd").setEditable(false);
    sap.ui.getCore().byId("dB_HostsPerson").setEditable(false).setVisible(false);
    sap.ui.getCore().byId("formContainerHostDetails").rerender();
  },
  getDetails: function() {
    var tblHosts = sap.ui.getCore().byId('tblHosts');
    var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
    if (null != context) {

      sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function(success) {
        console.log(success);
        sap.ui.getCore().byId("tF_HostsId").setValue(success.Id);
        sap.ui.getCore().byId("tF_HostsName").setValue(success.Name);
        sap.ui.getCore().byId("tF_HostsCpu").setValue(success.Cpu);
        sap.ui.getCore().byId("tF_HostsRam").setValue(success.Ram);
        sap.ui.getCore().byId("tF_HostsHdd").setValue(success.Hdd);       
        sap.ui.getCore().byId("tF_HostsPerson").setValue(success.Person);
      }, function(error) {
        console.log(error);
        alert(error);
      });
    }
  },
  createHost: function() {
    sap.ui.getCore().byId("tF_HostsId").setValue("Will be calculated");
    sap.ui.getCore().byId("tF_HostsName").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsCpu").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsRam").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsHdd").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsPerson").setValue("Please select");
    sap.ui.getCore().byId("dB_HostsPerson").setValue("").setEditable(true).setVisible(true);
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
        Name: sap.ui.getCore().byId("tF_HostsName").getValue(),
        Cpu: 1 * sap.ui.getCore().byId("tF_HostsCpu").getValue(),
        Ram: sap.ui.getCore().byId("tF_HostsRam").getValue(),
        Hdd: sap.ui.getCore().byId("tF_HostsHdd").getValue(),
        Person: sap.ui.getCore().byId("dB_HostsPerson").getValue(),
      };
      console.log(entry);
      var response = sap.ui.getCore().getModel().create('/HostCollection', entry);
      console.log(response);
      alert("New Host was added successfully");
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };
    };

    sap.ui.getCore().byId("formContainerHostDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },
  deleteHost: function() {
    var tblHosts = sap.ui.getCore().byId('tblHosts');
    var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
    sap.ui.getCore().getModel().remove(context.sPath);
    alert("Host was deleted");
  },
  updateHost: function() {
    sap.ui.getCore().byId("tF_HostsName").setEditable(true);
    sap.ui.getCore().byId("tF_HostsCpu").setEditable(true);
    sap.ui.getCore().byId("tF_HostsRam").setEditable(true);
    sap.ui.getCore().byId("tF_HostsHdd").setEditable(true);
    sap.ui.getCore().byId("dB_HostsPerson").setEditable(true).setVisible(true);
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
        Name: sap.ui.getCore().byId("tF_HostsName").getValue(),
        Cpu: 1 * sap.ui.getCore().byId("tF_HostsCpu").getValue(),
        Ram: sap.ui.getCore().byId("tF_HostsRam").getValue(),
        Hdd: sap.ui.getCore().byId("tF_HostsHdd").getValue(),
        Person:  sap.ui.getCore().byId("dB_HostsPerson").getValue(),
      };
      console.log(entry);
      var tblHosts = sap.ui.getCore().byId('tblHosts');
      var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0);      
      console.log(response);
      alert("Host was updated successfully");
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };      
    };

    sap.ui.getCore().byId("formContainerHostDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },


});