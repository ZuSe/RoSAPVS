sap.ui.controller("zy_ss14_t01_rosapvs.Hosts", {
  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Hosts
   */

  properties: {
    keys: ["Id"],
    textFields: ["Name", "Cpu", "Hdd", "Ram", "IsActive"],
    dropDownBoxes: ["Person"],
  },
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
  onAfterRendering: function(e) {

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
    $(sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").properties.keys).each(function(index, element) {
      sap.ui.getCore().byId("tF_Hosts" + element).setEditable(false);
    });
    $(sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").properties.textFields).each(function(index, element) {
      sap.ui.getCore().byId("tF_Hosts" + element).setEditable(false);
    });
    $(sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").properties.dropDownBoxes).each(function(index, element) {
      sap.ui.getCore().byId("dB_Hosts" + element).setEditable(false);
    });
  },
  
  getDetails: function() {
    var tblHosts = sap.ui.getCore().byId('tblHosts');
    var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
    if (null != context) {
      sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function(success) {
        console.log(success);
        $(sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").properties.keys).each(function(index, element) {
          sap.ui.getCore().byId("tF_Hosts" + element).setValue(success[element]);
        });
        $(sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").properties.textFields).each(function(index, element) {
          sap.ui.getCore().byId("tF_Hosts" + element).setValue(success[element]);
        });
        $(sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").properties.dropDownBoxes).each(function(index, element) {
          sap.ui.getCore().byId("dB_Hosts" + element).setValue(success[element]);
        });
      }, function(error) {
        console.log(error);
        alert(error);
      });
    }
  },
  
  createHost: function() {
    $(this.properties.keys).each(function(index, element) {
      sap.ui.getCore().byId("tF_Hosts" + element).setValue("To be calculated");
    });
    $(this.properties.textFields).each(function(index, element) {
      sap.ui.getCore().byId("tF_Hosts" + element).setEditable(true).setValue("");
    });
    $(this.properties.dropDownBoxes).each(function(index, element) {
      sap.ui.getCore().byId("dB_Hosts" + element).setEditable(true).setValue("");
    });

    var submitButton = new sap.ui.commons.Button({
      text: "Add",
      icon: sap.ui.core.IconPool.getIconURI("create"),
      tooltip: "Submit Data",
      visible: true,
      width: "4em"

    });
    var fnPressHandler = null;
    fnPressHandler = function(oEvent) {
      var entry = {       
        Name: sap.ui.getCore().byId("tF_HostsName").getValue(),
        Cpu: 1 * sap.ui.getCore().byId("tF_HostsCpu").getValue(),
        Hdd: sap.ui.getCore().byId("tF_HostsHdd").getValue(),
        Ram: sap.ui.getCore().byId("tF_HostsRam").getValue(),
        IsActive: sap.ui.getCore().byId("tF_HostsIsActive").getValue(),
        Person: sap.ui.getCore().byId("dB_HostsPerson").getValue(),
      };

      console.log(entry);
      var response = sap.ui.getCore().getModel().create('/HostCollection', entry);
      console.log(response);
      alert("New Host was added successfully");
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      }
      ;
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
    $(this.properties.textFields).each(function(index, element) {
      sap.ui.getCore().byId("tF_Hosts" + element).setEditable(true);
    });
    $(this.properties.dropDownBoxes).each(function(index, element) {
      sap.ui.getCore().byId("dB_Hosts" + element).setEditable(true);
    });
    var submitButton = new sap.ui.commons.Button({
      text: "Update",
      tooltip: "Submit Data",
      visible: true,
      layoutData: new sap.ui.layout.form.GridElementData({
        hCells: "2"
      })
    });
    var fnPressHandler = null;
    fnPressHandler = function(oEvenet) {      
      var entry = {
        Name: sap.ui.getCore().byId("tF_HostsName").getValue(),
        Cpu: 1 * sap.ui.getCore().byId("tF_HostsCpu").getValue(),
        Ram: sap.ui.getCore().byId("tF_HostsRam").getValue(),
        Hdd: sap.ui.getCore().byId("tF_HostsHdd").getValue(),        
        IsActive: sap.ui.getCore().byId("tF_HostsIsActive").getValue(),
        Person: sap.ui.getCore().byId("dB_HostsPerson").getValue(),
      };
      console.log(entry);
      var tblHosts = sap.ui.getCore().byId('tblHosts');
      var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
      var response = sap.ui.getCore().getModel().update(context.sPath,entry,0);      
      console.log(response);
      alert("Host was updated successfully");
      if (oEvenet.getSource() instanceof sap.ui.commons.Button) {
        oEvenet.getSource().detachPress(fnPressHandler);
        submitButton.destroy();
      };
    };

    sap.ui.getCore().byId("formContainerHostDetails").addFormElement(new sap.ui.layout.form.FormElement({
      fields: [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
    }));

  },

  
});
