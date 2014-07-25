sap.ui.jsview("zy_ss14_t01_rosapvs.Platforms", {

  /**
   * Specifies the Controller belonging to this View. In the case that it is not
   * implemented, or that "null" is returned, this View does not have a
   * Controller.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Platforms
   */
  getControllerName: function() {
    return "zy_ss14_t01_rosapvs.Platforms";
  },

  /**
   * Is initially called once after the Controller has been instantiated. It is
   * the place where the UI is constructed. Since the Controller is given to
   * this method, its event handlers can be attached right away.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Platforms
   */
  createContent: function(oController) {

    // *** Declaration of important style variables *** //

    // Create a new Matrix Layout for the View
    var layoutPlatforms = new sap.ui.commons.layout.MatrixLayout({
      id: 'layoutPlatforms',
      columns: 3,
      widths: ['35%', '2em', '65%']
    });
    layoutPlatforms.setWidth('100%');

    var tblPlatforms = new sap.ui.table.Table("tblPlatforms", {
//    showOverlay: true,
      visibleRowCount: 10,
      ExpandedVisibleRowCount: 20,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
        id: "toolbarTablePlatform",
        items: [new sap.ui.commons.Button({
          text: "Create",          
          icon: sap.ui.core.IconPool.getIconURI("create"),
          press: function() {
            oController.createPlatform();
          }
        }), new sap.ui.commons.Button({
          text: "Update",
          icon: sap.ui.core.IconPool.getIconURI("refresh"),
          press: function() {
            oController.updatePlatform();
          }
        }), new sap.ui.commons.Button({
          text: "Delete",
          icon: sap.ui.core.IconPool.getIconURI("delete"),
          press: function() {
            oController.deletePlatform();
          }
        }), ]
      }),
      editable: false
    });
    tblPlatforms.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Id"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
      sortProperty: "Id"
    }));
    tblPlatforms.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Name"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
      sortProperty: "Name"
    }));
//    tblPlatforms.addColumn(new sap.ui.table.Column({
//      label: new sap.ui.commons.Label({
//        text: "Active"
//      }),
//      template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
//      sortProperty: "IsActive"
//    }));

    tblPlatforms.bindRows("/PlatformCollection");
    tblPlatforms.attachRowSelectionChange(function(oEvent) {
      oController.getDetails();
    });

    var matLayout = new sap.ui.commons.layout.MatrixLayout({
		width: "100%",
		widths: ["15em","100%"],
	    });
	    
	    matLayout.createRow(null, null);
	    matLayout.createRow(new sap.ui.commons.Label({text:"ID"}),new sap.ui.commons.TextField("tF_PlatformsId",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Name"}),new sap.ui.commons.TextField("tF_PlatformsName",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Required CPU (Cores)"}),new sap.ui.commons.TextField("tF_PlatformsReqCPU",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Required RAM (GB)"}),new sap.ui.commons.TextField("tF_PlatformsReqRAM",{editable: false}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Required HDD (TB)"}),new sap.ui.commons.TextField("tF_PlatformsReqHDD",{editable: false})); 
	    matLayout.createRow(new sap.ui.commons.Label({text:"Assigned Host"}), new sap.ui.commons.layout.MatrixLayoutCell({content: [new sap.ui.commons.TextField("tF_PlatformsHost",{editable: false}),new sap.ui.commons.DropdownBox("dB_PlatformsHost",{value: "None",displaySecondaryValues: true, visible: false, editable: false})]}));
	    matLayout.createRow(new sap.ui.commons.Label({text:"Employee Responsible"}), new sap.ui.commons.layout.MatrixLayoutCell({content: [new sap.ui.commons.TextField("tF_PlatformsPerson",{editable: false}),new sap.ui.commons.DropdownBox("dB_PlatformsPerson",{value: "None",displaySecondaryValues: true, visible: false, editable: false})]}));	    
	    matLayout.createRow(null, null);
	    
    var formPlatformDetails = new sap.ui.layout.form.Form('formPlatformDetails', {
      layout: new sap.ui.layout.form.GridLayout(),
<<<<<<< HEAD
      formContainers: [new sap.ui.layout.form.FormContainer('formContainerPlatformDetails',{
        formElements: [new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "ID"
          }),
          fields: [new sap.ui.commons.TextField("tF_PlatformsId", {
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Name"
          }),
          fields: [new sap.ui.commons.TextField("tF_PlatformsName", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required CPU (Cores)"
          }),
          fields: [new sap.ui.commons.TextField("tF_PlatformsReqCPU", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            }),
            change : function(){

              var tfValue = sap.ui.getCore().byId('tF_PlatformsReqCPU').getValue();


              if( !tfValue.match(numberTemplate) )
                {
                var oMessage = new sap.ui.core.Message({
                  text: "Value '" +tfValue + "' is invalid for Required CPU (Cores)",
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Warning);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(
                        oMessage);                
                }                  
             },            
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required RAM (GB)"
          }),
          fields: [new sap.ui.commons.TextField("tF_PlatformsReqRAM", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            }),
            change : function(){

              var tfValue = sap.ui.getCore().byId('tF_PlatformsReqRAM').getValue();


              if( !tfValue.match(numberTemplate) )
                {
                var oMessage = new sap.ui.core.Message({
                  text: "Value '" +tfValue + "' is invalid for Required RAM (GB)",
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Warning);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(
                        oMessage);                
                }                  
             },
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required HDD (TB)"
          }),
          fields: [new sap.ui.commons.TextField("tF_PlatformsReqHDD", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            }),
            change : function(){

              var tfValue = sap.ui.getCore().byId('tF_PlatformsReqHDD').getValue();


              if( !tfValue.match(numberTemplate) )
                {
                var oMessage = new sap.ui.core.Message({
                  text: "Value '" +tfValue + "' is invalid for Required HDD (TB)",
                  timestamp: (new Date()).toUTCString()
                });
                oMessage.setLevel(sap.ui.core.MessageType.Warning);
                sap.ui.getCore().byId("oMessageNotifier").addMessage(
                        oMessage);                
                }                  
             },
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Assigned Host"
          }),
          fields: [
                   new sap.ui.commons.TextField("tF_PlatformsHost", {
              value: "",
              editable: false,
              layoutData: new sap.ui.layout.form.GridElementData({
                hCells: "3"
              })
            }),    new sap.ui.commons.DropdownBox("dB_PlatformsHost", {
            value: "None",
            editable: false,
            visible: false,
            displaySecondaryValues: true,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            })
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Employee Responsible"
          }),
          fields: [new sap.ui.commons.TextField("tF_PlatformsPerson", {
              value: "",
              editable: false,
              layoutData: new sap.ui.layout.form.GridElementData({
                hCells: "3"
              })
            }),    new sap.ui.commons.DropdownBox("dB_PlatformsPerson", {
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
      formContainers: [new sap.ui.layout.form.FormContainer('formContainerPlatformDetails'
      )],
>>>>>>> branch 'master' of git@github.com:ZuSe/RoSAPVS.git
    });

    matLayout.createRow(null, formPlatformDetails);
    
    // *** Data Binding and Listeners *** //

    var templatePlatformHost = new sap.ui.core.ListItem();
    templatePlatformHost.bindProperty("text", "Id");
    templatePlatformHost.bindProperty("additionalText", "Name");
    sap.ui.getCore().byId('dB_PlatformsHost').bindItems("/RestrictedHostCollection", templatePlatformHost);

    var templatePlatformPerson = new sap.ui.core.ListItem();
    templatePlatformPerson.bindProperty("text", "SapUser");
    templatePlatformPerson.bindProperty("additionalText", "Role");
    sap.ui.getCore().byId('dB_PlatformsPerson').bindItems("/PrivilegeCollection", templatePlatformPerson);
    
    var panelDetails = new sap.ui.commons.Panel({
    	applyContentPadding: true,
    	title: new sap.ui.core.Title({
        text: "Platform Details",
      }),
      showCollapseIcon: false});
    panelDetails.addContent(matLayout);
    panelDetails.addStyleClass('fancyBox');
    
    layoutPlatforms.createRow(tblPlatforms, null, new sap.ui.commons.layout.MatrixLayoutCell({content: panelDetails}).setVAlign("Top"));
    this.addContent(layoutPlatforms);
  }

});
