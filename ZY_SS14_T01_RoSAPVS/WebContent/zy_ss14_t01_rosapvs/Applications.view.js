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
      widths: ['35%', '2em', '65%']
    });
    layoutApplications.setWidth('100%');

    var tblApplications = new sap.ui.table.Table("tblApplications", {
      visibleRowCount: 10,
      ExpandedVisibleRowCount: 20,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
        id: "toolbarTableApplications",
        items: [new sap.ui.commons.Button({
          text: "Create",
          icon: sap.ui.core.IconPool.getIconURI("create"),
          press: function() {
            oController.createApplication();
          }
        }), new sap.ui.commons.Button({
          text: "Update",
          icon: sap.ui.core.IconPool.getIconURI("refresh"),
          press: function() {
            oController.updateApplication();
          }
        }), new sap.ui.commons.Button({
          text: "Delete",
          icon: sap.ui.core.IconPool.getIconURI("delete"),
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
//    tblApplications.addColumn(new sap.ui.table.Column({
//      label: new sap.ui.commons.Label({
//        text: "Active"
//      }),
//      template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
//      sortProperty: "IsActive"
//    }));

    tblApplications.bindRows("/ApplicationCollection");
    tblApplications.attachRowSelectionChange(function(oEvent) {
      oController.getDetails();
    });
    
    var formApplicationDetails = new sap.ui.layout.form.Form('formApplicationDetails', {
      title: new sap.ui.core.Title({
        text: "Application Details",
        tooltip: "Shows the application details"
      }),
      layout: new sap.ui.layout.form.GridLayout(),
      formContainers: [new sap.ui.layout.form.FormContainer('formContainerApplicationDetails',{
        formElements: [new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "ID"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationId", {
            editable: false,
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Name"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationName", {
            value: "",
            editable: false,
          }), ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required CPU (Cores)"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationReqCPU", {
            value: "",
            editable: false,
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required RAM (GB)"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationReqRAM", {
            value: "",
            editable: false,
          })]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Required HDD (TB)"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationReqHDD", {
            value: "",
            editable: false,
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Software Type"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationSoftwareType", {
              value: "",
              editable: false,
            }),    
                   
            new sap.ui.commons.DropdownBox("dB_ApplicationSoftwareType", {
            value: 0,
            editable: false,
            displaySecondaryValues: true,
            visible: false,
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Assigned Platform"
          }),
          fields: [
                   new sap.ui.commons.TextField("tF_ApplicationPlatform", {
              value: "",
              editable: false,
            }),    new sap.ui.commons.DropdownBox("dB_ApplicationPlatform", {
            value: "None",
            editable: false,
            visible: false,
            displaySecondaryValues: true,
          }),

          ]
        }), new sap.ui.layout.form.FormElement({
          label: new sap.ui.commons.Label({
            text: "Employee Responsible"
          }),
          fields: [new sap.ui.commons.TextField("tF_ApplicationPerson", {
              value: "",
              editable: false,
            }),    new sap.ui.commons.DropdownBox("dB_ApplicationPerson", {
            value: "None",
            editable: false,
            visible: false,
            displaySecondaryValues: true,
          }),

          ]
        }),]
      })],
    });

    formApplicationDetails.addStyleClass('fancyBox');
    
    // *** Data Binding and Listeners *** //
    
    var templateApplicationPlatform = new sap.ui.core.ListItem();
    templateApplicationPlatform.bindProperty("text", "Id");
    templateApplicationPlatform.bindProperty("additionalText", "Name");
    sap.ui.getCore().byId('dB_ApplicationPlatform').bindItems("/RestrictedPlatformCollection", templateApplicationPlatform);
    
    var templateApplicationSoftwareType = new sap.ui.core.ListItem();
    templateApplicationSoftwareType.bindProperty("text", "Id");
    templateApplicationSoftwareType.bindProperty("additionalText", "Name");
    sap.ui.getCore().byId('dB_ApplicationSoftwareType').bindItems("/SoftwareTypeCollection", templateApplicationSoftwareType);

    var templateApplicationPerson = new sap.ui.core.ListItem();
    templateApplicationPerson.bindProperty("text", "SapUser");
    templateApplicationPerson.bindProperty("additionalText", "Role");
    sap.ui.getCore().byId('dB_ApplicationPerson').bindItems("/PrivilegeCollection", templateApplicationPerson);
    
    layoutApplications.createRow(tblApplications, null, new sap.ui.commons.layout.MatrixLayoutCell({content: formApplicationDetails}).setVAlign("Top"));
    this.addContent(layoutApplications);
  }

});
