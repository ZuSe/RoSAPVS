sap.ui.jsview("zy_ss14_t01_rosapvs.Applications", {

  /**
   * Specifies the Controller belonging to this View. In the case that it is not
   * implemented, or that "null" is returned, this View does not have a
   * Controller.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Applications
   */
  getControllerName: function() {
    return "zy_ss14_t01_rosapvs.Applications";
  },

  /**
   * Is initially called once after the Controller has been instantiated. It is
   * the place where the UI is constructed. Since the Controller is given to
   * this method, its event handlers can be attached right away.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Applications
   */
  createContent: function(oController) {

    // *** Declaration of important style variables *** //

    // Create a new Matrix Layout for the View
    var layoutApplications = new sap.ui.commons.layout.MatrixLayout({
      id: 'layoutApplications',
      columns: 3,
      widths: ['30%', '5%', '65%']
    });
    layoutApplications.setWidth('100%');

    var tblApplications = new sap.ui.table.DataTable("tblApplications", {
      visibleRowCount: 25,
      ExpandedVisibleRowCount: 30,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
        items: [new sap.ui.commons.Button({
          text: "Create",
          press: function() {
            oController.createApplication();
          }
        }), new sap.ui.commons.Button({
          text: "Update",
          press: function() {
            oController.updateApplication();
          }
        }), new sap.ui.commons.Button({
          text: "Delete",
          press: function() {
            oController.deleteApplication();
          }
        }), ]
      }),
      editable: false
    });
    tblApplications.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Id"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
      sortProperty: "Id"
    }));
    tblApplications.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Name"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
      sortProperty: "Name"
    }));
    tblApplications.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Active"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
      sortProperty: "IsActive"
    }));

    tblApplications.bindRows("/ApplicationCollection");
    tblApplications.attachRowSelect(function(oEvent) {
      oController.getDetails();
    });

    var oLayoutfmApplicationDetails = new sap.ui.layout.form.GridLayout();
    var formApplicationDetails = new sap.ui.commons.form.Form('formApplicationDetails', {
      title: new sap.ui.core.Title({
        text: "Application Details",
        tooltip: "Todo"
      }),
      layout: oLayoutfmApplicationDetails,
      formContainers: [new sap.ui.layout.form.FormContainer('formContainerApplicationDetails',{
        formElements: [new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "ID"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationId", {
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Name"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationName", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required CPU"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationReqCPU", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "auto"
            })
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required RAM"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationReqRAM", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            }),
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required HDD"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationReqHDD", {
            value: "",
            editable: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            })
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Software Type"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationSoftwareType", {
              value: "",
              editable: false,
              layoutData: new sap.ui.layout.form.GridElementData({
                hCells: "3"
              })
            }),    
                   
            new sap.ui.commons.DropdownBox("dB_ApplicationSoftwareType", {
            value: 0,
            editable: false,
            displaySecondaryValues: true,
            visible: false,
            layoutData: new sap.ui.layout.form.GridElementData({
              hCells: "3"
            })
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Platform"
          }),
          fields: [
                   new sap.ui.commons.TextField("tF_ApplicationPlatform", {
              value: "",
              editable: false,
              layoutData: new sap.ui.layout.form.GridElementData({
                hCells: "3"
              })
            }),    new sap.ui.commons.DropdownBox("dB_ApplicationPlatform", {
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
            text: "Person"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationPerson", {
              value: "",
              editable: false,
              layoutData: new sap.ui.layout.form.GridElementData({
                hCells: "3"
              })
            }),    new sap.ui.commons.DropdownBox("dB_ApplicationPerson", {
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

    // *** Data Binding and Listeners *** //

    var templateApplicationPlatform = new sap.ui.core.ListItem();
    templateApplicationPlatform.bindProperty("text", "Id");
    templateApplicationPlatform.bindProperty("additionalText", "Name");
    sap.ui.getCore().byId('dB_ApplicationPlatform').bindItems("/PlatformCollection", templateApplicationPlatform);
    
    var templateApplicationSoftwareType = new sap.ui.core.ListItem();
    templateApplicationSoftwareType.bindProperty("text", "Id");
    templateApplicationSoftwareType.bindProperty("additionalText", "Name");
    sap.ui.getCore().byId('dB_ApplicationSoftwareType').bindItems("/SoftwareTypeCollection", templateApplicationSoftwareType);

    layoutApplications.createRow(tblApplications, null, formApplicationDetails);
    this.addContent(layoutApplications);
  }

});
