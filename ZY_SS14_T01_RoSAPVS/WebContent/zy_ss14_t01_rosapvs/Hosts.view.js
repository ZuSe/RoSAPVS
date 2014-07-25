sap.ui.jsview("zy_ss14_t01_rosapvs.Hosts", {

  /**
   * Specifies the Controller belonging to this View. In the case that it is not
   * implemented, or that "null" is returned, this View does not have a
   * Controller.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Hosts
   */
  getControllerName: function() {
    return "zy_ss14_t01_rosapvs.Hosts";
  },

  /**
   * Is initially called once after the Controller has been instantiated. It is
   * the place where the UI is constructed. Since the Controller is given to
   * this method, its event handlers can be attached right away.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Hosts
   */
  createContent: function(oController) {

    // *** Declaration of important style variables *** //

    // Create a new Matrix Layout for the View
    var layoutHosts = new sap.ui.commons.layout.MatrixLayout({
      id: 'layoutHosts',
      columns: 3,
      widths: ['35%', '2em', '65%']
    });
    layoutHosts.setWidth('100%');

    var tblHosts = new sap.ui.table.Table("tblHosts", {
      visibleRowCount: 10,
      ExpandedVisibleRowCount: 20,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
        id: "toolbarTableHosts",
        items: [new sap.ui.commons.Button({
          text: "Create",
          icon: sap.ui.core.IconPool.getIconURI("create"),
          press: function() {
            oController.createHost();
          }
        }), new sap.ui.commons.Button({
          text: "Update",
          icon: sap.ui.core.IconPool.getIconURI("refresh"),
          press: function() {
            oController.updateHost();
          }
        }), new sap.ui.commons.Button({
          text: "Delete",
          icon: sap.ui.core.IconPool.getIconURI("delete"),
          press: function() {
            oController.deleteHost();
          }
        }), ]
      }),
      editable: false
    });
    tblHosts.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Id"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
      sortProperty: "Id"
    }));
    tblHosts.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Name"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
      sortProperty: "Name"
    }));
//    tblHosts.addColumn(new sap.ui.table.Column({
//      label: new sap.ui.commons.Label({
//        text: "Active"
//      }),
//      template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
//      sortProperty: "IsActive"
//    }));

    tblHosts.bindRows("/HostCollection");
    tblHosts.attachRowSelectionChange(function(oEvent) {
      oController.getDetails();
    });
    
    var matLayout = new sap.ui.commons.layout.MatrixLayout({
		width: "100%",
		widths: ["15em","100%"],
	    });
	    
	    matLayout.createRow(null, null);
	    matLayout.createRow(new sap.ui.commons.Label({text:"ID"}),new sap.ui.commons.TextField("tF_HostsId",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Name"}),new sap.ui.commons.TextField("tF_HostsName",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"CPU (Cores)"}),new sap.ui.commons.TextField("tF_HostsCpu",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"RAM (GB)"}),new sap.ui.commons.TextField("tF_HostsRam",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"HDD (TB)"}),new sap.ui.commons.TextField("tF_HostsHdd",{editable: false})); 
	    matLayout.createRow(new sap.ui.commons.Label({text:"Employee Responsible"}), new sap.ui.commons.layout.MatrixLayoutCell({content: [new sap.ui.commons.TextField("tF_HostsPerson",{editable: false}),new sap.ui.commons.DropdownBox("dB_HostsPerson",{value: "None",displaySecondaryValues: true, visible: false, editable: false})]}));	    
	    matLayout.createRow(null, null);
	    
    var formHostDetails = new sap.ui.layout.form.Form('formHostDetails', {
      layout: new sap.ui.layout.form.GridLayout(),
<<<<<<< HEAD
      formContainers: [new sap.ui.layout.form.FormContainer('formContainerHostDetails',{
        formElements: [new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "ID"
          }),
          fields: [new sap.ui.commons.TextField("tF_HostsId", {
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Name"
          }),
          fields: [new sap.ui.commons.TextField("tF_HostsName", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "CPU (Cores)"
          }),
          fields: [new sap.ui.commons.TextField("tF_HostsCpu", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            }),
            change : function(){

              var tfValue = sap.ui.getCore().byId('tF_HostsCpu').getValue();


              if( !tfValue.match(numberTemplate) )
                {
                var oMessage = new sap.ui.core.Message({
                  text: "Value '" +tfValue + "' is not valid for CPU (Cores)",
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Warning);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(
                        oMessage);                
                }                  
             }
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "RAM (GB)"
          }),
          fields: [new sap.ui.commons.TextField("tF_HostsRam", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            }),
            change : function(){

              var tfValue = sap.ui.getCore().byId('tF_HostsRam').getValue();


              if( !tfValue.match(numberTemplate) )
                {
                var oMessage = new sap.ui.core.Message({
                  text: "Value '" +tfValue + "' is not valid for RAM (GB)",
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Warning);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(
                        oMessage);                
                }                  
             }
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "HDD (TB)"
          }),
          fields: [new sap.ui.commons.TextField("tF_HostsHdd", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            }),
            change : function(){

              var tfValue = sap.ui.getCore().byId('tF_HostsHdd').getValue();


              if( !tfValue.match(numberTemplate) )
                {
                var oMessage = new sap.ui.core.Message({
                  text: "Value '" +tfValue + "' is invalid for HDD (TB)",
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Warning);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(
                        oMessage);                
                }                  
             }
          
          }),
          
          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Employee Responsible"
          }),
          fields: [new sap.ui.commons.TextField("tF_HostsPerson", {
              value: "",
              editable: false,
              layoutData: new sap.ui.layout.form.GridElementData({
                hCells: "3"
              })
            }),    new sap.ui.commons.DropdownBox("dB_HostsPerson", {
            value: "None",
            editable: false,
            visible: false,
            displaySecondaryValues: true,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            })
          }),

          ]
        }),]
      })],
=======
      formContainers: [new sap.ui.layout.form.FormContainer('formContainerHostDetails'
      )],
>>>>>>> branch 'master' of git@github.com:ZuSe/RoSAPVS.git
    });

    matLayout.createRow(null, formHostDetails);

    // *** Data Binding and Listeners *** //

    var templateHostPerson = new sap.ui.core.ListItem();
    templateHostPerson.bindProperty("text", "SapUser");
    templateHostPerson.bindProperty("additionalText", "Role");
    sap.ui.getCore().byId('dB_HostsPerson').bindItems("/PrivilegeCollection", templateHostPerson);
    
    var panelDetails = new sap.ui.commons.Panel({
    	applyContentPadding: true,
    	title: new sap.ui.core.Title({
        text: "Host Details",
      }),
      showCollapseIcon: false});
    panelDetails.addContent(matLayout);
    panelDetails.addStyleClass('fancyBox');
    
    layoutHosts.createRow(tblHosts, null, new sap.ui.commons.layout.MatrixLayoutCell({content: panelDetails}).setVAlign("Top"));
    this.addContent(layoutHosts);
  }

});
