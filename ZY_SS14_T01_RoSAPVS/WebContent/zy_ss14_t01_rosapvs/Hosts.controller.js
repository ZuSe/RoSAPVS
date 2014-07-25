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
    sap.ui.getCore().byId("cB_HostsIsActive").setEditable(false);
    sap.ui.getCore().byId("dB_HostsPerson").setEditable(false)
            .setVisible(false);
    sap.ui.getCore().byId("formContainerHostDetails").rerender();
  },
  disableTableButtons : function()
  {
    var btnsOfTable = sap.ui.getCore().byId("toolbarTableHosts").getItems();
    console.log(btnsOfTable);
      $.each(btnsOfTable, function(index, element)
              {
                  element.setEnabled(false);
              });
  },
  enableTableButtons: function()
  {
    $.each(sap.ui.getCore().byId("toolbarTableHosts").getItems(), function(index, element)
            {
                element.setEnabled(true);
            });
  },  
  getDetails: function() {
    this.enableTableButtons();
    if(null != sap.ui.getCore().byId("buttonAddHost"))
      sap.ui.getCore().byId("buttonAddHost").setVisible(false);
    if(null != sap.ui.getCore().byId("buttonUpdateHost"))
      sap.ui.getCore().byId("buttonUpdateHost").setVisible(false);
    
    this.lockInput();
    var tblHosts = sap.ui.getCore().byId('tblHosts');
    var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
    if (null != context) {
      sap.ui.getCore().getModel().read(
              context.sPath,
              0,
              0,
              false,
              function(success) {
                console.log(success);
                sap.ui.getCore().byId("tF_HostsId").setValue(success.Id);
                sap.ui.getCore().byId("tF_HostsName").setValue(success.Name);
                sap.ui.getCore().byId("tF_HostsCpu").setValue(success.Cpu);
                sap.ui.getCore().byId("tF_HostsRam").setValue(success.Ram);
                sap.ui.getCore().byId("tF_HostsHdd").setValue(success.Hdd);
                sap.ui.getCore().byId("tF_HostsPerson")
                        .setValue(success.Person);
                if (success.IsActive == "X") {
                	sap.ui.getCore().byId("cB_HostsIsActive").setChecked(true);
                }
                else {
                	sap.ui.getCore().byId("cB_HostsIsActive").setChecked(false);
                }
              }, function(error) {
                console.log(error);
                var oMessage = new sap.ui.core.Message({
                  text: 'Unable to retrieve data.',
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Error);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
              });
    }
  },
  createHost: function() {
    this.disableTableButtons();
    sap.ui.getCore().byId("tF_HostsId").setValue("Will be calculated");
    sap.ui.getCore().byId("tF_HostsName").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsCpu").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsRam").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsHdd").setValue("").setEditable(true);
    sap.ui.getCore().byId("tF_HostsPerson").setValue("Please select");
    sap.ui.getCore().byId("dB_HostsPerson").setValue("").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("cB_HostsIsActive").setEditable(true);;
    
    var submitButton;
    if (null == sap.ui.getCore().byId("buttonAddHost")) {
      submitButton = new sap.ui.commons.Button("buttonAddHost", {
        text: "Add",
        icon: sap.ui.core.IconPool.getIconURI("create"),
        tooltip: "Submit Data",
        layoutData: new sap.ui.layout.form.GridElementData({
          hCells: "2"
        })
      });
    } else {
      submitButton = sap.ui.getCore().byId("buttonAddHost");
      submitButton.setVisible(true);
    }

    var fnPressHandler = null;
    fnPressHandler = function(oEvent) {
    var isChecked;
    if (sap.ui.getCore().byId("cB_HostsIsActive").getChecked() == true) {
    	isChecked = "X";
    }	
    else {
    	isChecked = "";
    }
      var entry = {
        Name: sap.ui.getCore().byId("tF_HostsName").getValue(),
        Cpu: 1 * sap.ui.getCore().byId("tF_HostsCpu").getValue(),
        Ram: sap.ui.getCore().byId("tF_HostsRam").getValue(),
        Hdd: sap.ui.getCore().byId("tF_HostsHdd").getValue(),
        Person: sap.ui.getCore().byId("dB_HostsPerson").getValue(),
        IsActive: isChecked,
      };
      console.log(entry);
      
      
      var response = sap.ui.getCore().getModel().create('/HostCollection',
              entry,null,
      function(success){
      var oMessage = new sap.ui.core.Message({
          text : 'Host ' + sap.ui.getCore().byId("tF_HostsName").getValue() + ' was created successfully.',
        timestamp : (new Date()).toUTCString(),
      });
        oMessage.setLevel(sap.ui.core.MessageType.Success);
        sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
        
      },function(error){
        var oMessage = new sap.ui.core.Message({
          text : 'Failed to create Host ' + sap.ui.getCore().byId("tF_HostsName").getValue(),
        timestamp : (new Date()).toUTCString(),
      });
        oMessage.setLevel(sap.ui.core.MessageType.Error);
        sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
      });
        
        
      console.log(response);
      var tblHosts = sap.ui.getCore().byId('tblHosts');
      tblHosts.getModel().refresh(true);
      tblHosts.setSelectedIndex(tblHosts.getBinding("rows").iLength - 1);
   
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.setVisible(false);
        sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").enableTableButtons();
      }
      ;
    };

    sap.ui.getCore().byId("formContainerHostDetails").addFormElement(
            new sap.ui.layout.form.FormElement({
              fields: [
                  submitButton.attachPress(this.lockInput).attachPress(
                          fnPressHandler), ]
            }));

  },
  deleteHost: function() {
    var tblHosts = sap.ui.getCore().byId('tblHosts');
    var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
    var nameDeleted = sap.ui.getCore().byId("tF_HostsName").getValue();
    sap.ui.getCore().getModel().remove(context.sPath);
    var oMessage = new sap.ui.core.Message({
      text: 'Host ' + nameDeleted + ' was deleted successfully.',
      timestamp: (new Date()).toUTCString()
    });
    oMessage.setLevel(sap.ui.core.MessageType.Success);
    sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
  },
  updateHost: function() {
    this.disableTableButtons();
    sap.ui.getCore().byId("tF_HostsName").setEditable(true);
    sap.ui.getCore().byId("tF_HostsCpu").setEditable(true);
    sap.ui.getCore().byId("tF_HostsRam").setEditable(true);
    sap.ui.getCore().byId("tF_HostsHdd").setEditable(true);
    sap.ui.getCore().byId("dB_HostsPerson").setEditable(true).setVisible(true);
    sap.ui.getCore().byId("cB_HostsIsActive").setEditable(true);
    var submitButton ;
    if(null == sap.ui.getCore().byId("buttonUpdateHost"))
      {
      submitButton= new sap.ui.commons.Button("buttonUpdateHost",{
      text: "Update",
      tooltip: "Submit Data",
      visible: true,
      layoutData: new sap.ui.layout.form.GridElementData({
        hCells: "2"
      })
    });
  } else {
    submitButton = sap.ui.getCore().byId("buttonUpdateHost");
    submitButton.setVisible(true);
  }
    
    var fnPressHandler = null;
    fnPressHandler = function(oEvent) {
        var isChecked;
        if (sap.ui.getCore().byId("cB_HostsIsActive").getChecked() == true) {
        	isChecked = "X";
        }	
        else {
        	isChecked = "";
        }
      var entry = {
        Name: sap.ui.getCore().byId("tF_HostsName").getValue(),
        Cpu: 1 * sap.ui.getCore().byId("tF_HostsCpu").getValue(),
        Ram: sap.ui.getCore().byId("tF_HostsRam").getValue(),
        Hdd: sap.ui.getCore().byId("tF_HostsHdd").getValue(),
        Person: sap.ui.getCore().byId("dB_HostsPerson").getValue(),
        IsActive: isChecked,
      };
      console.log(entry);
      var tblHosts = sap.ui.getCore().byId('tblHosts');
      var context = tblHosts.getContextByIndex(tblHosts.getSelectedIndex());
      var response = sap.ui.getCore().getModel()
              .update(context.sPath, entry, 0,function(success){
                var oMessage = new sap.ui.core.Message({
                text : 'Host ' + sap.ui.getCore().byId("tF_HostsName").getValue() + ' was updated successfully.',
                timestamp : (new Date()).toUTCString(),
              });
                oMessage.setLevel(sap.ui.core.MessageType.Success);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
                
              },function(error){
                var oMessage = new sap.ui.core.Message({
                  text : 'Failed to update Host ' + sap.ui.getCore().byId("tF_HostsName").getValue(),
                timestamp : (new Date()).toUTCString(),
              });
                oMessage.setLevel(sap.ui.core.MessageType.Error);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(oMessage);
              });
      console.log(response);
      
      if (oEvent.getSource() instanceof sap.ui.commons.Button) {
        oEvent.getSource().detachPress(fnPressHandler);
        submitButton.setVisible(false);
        sap.ui.controller("zy_ss14_t01_rosapvs.Hosts").enableTableButtons();
      }
      ;
    };

    sap.ui.getCore().byId("formContainerHostDetails").addFormElement(
            new sap.ui.layout.form.FormElement({
              fields: [
                  submitButton.attachPress(this.lockInput).attachPress(
                          fnPressHandler), ]
            }));

  },

});