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

    var tblPlatforms = new sap.ui.table.DataTable("tblPlatforms", {
      visibleRowCount: 25,
      ExpandedVisibleRowCount: 30,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
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
    tblPlatforms.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Active"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
      sortProperty: "IsActive"
    }));

    tblPlatforms.bindRows("/PlatformCollection");
    tblPlatforms.attachRowSelect(function(oEvent) {
      oController.getDetails();
    });

    var formPlatformDetails = new sap.ui.layout.form.Form('formPlatformDetails', {
      title: new sap.ui.core.Title({
        text: "Platform Details",
        tooltip: "Shows the platform details"
      }),
      layout: new sap.ui.layout.form.GridLayout(),
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
            })
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
            })
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
    });

    formPlatformDetails.addStyleClass('fancyBox');
    
    // *** Data Binding and Listeners *** //

    var templatePlatformHost = new sap.ui.core.ListItem();
    templatePlatformHost.bindProperty("text", "Id");
    templatePlatformHost.bindProperty("additionalText", "Name");
    sap.ui.getCore().byId('dB_PlatformsHost').bindItems("/HostCollection", templatePlatformHost);

    var templatePlatformPerson = new sap.ui.core.ListItem();
    templatePlatformPerson.bindProperty("text", "SapUser");
    templatePlatformPerson.bindProperty("additionalText", "Role");
    sap.ui.getCore().byId('dB_PlatformsPerson').bindItems("/PrivilegeCollection", templatePlatformPerson);
    
    layoutPlatforms.createRow(tblPlatforms, null, new sap.ui.commons.layout.MatrixLayoutCell({content: formPlatformDetails}).setVAlign("Top"));
    this.addContent(layoutPlatforms);
  }

});
