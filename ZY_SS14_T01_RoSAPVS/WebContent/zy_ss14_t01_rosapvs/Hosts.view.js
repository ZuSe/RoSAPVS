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

    var formHostDetails = new sap.ui.layout.form.Form('formHostDetails', {
      title: new sap.ui.core.Title({
        text: "Host Details",
        tooltip: "Shows the host details"
      }),
      layout: new sap.ui.layout.form.GridLayout(),
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
            })
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
            })
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
    });

    formHostDetails.addStyleClass('fancyBox');
    
    // *** Data Binding and Listeners *** //

    var templateHostPerson = new sap.ui.core.ListItem();
    templateHostPerson.bindProperty("text", "SapUser");
    templateHostPerson.bindProperty("additionalText", "Role");
    sap.ui.getCore().byId('dB_HostsPerson').bindItems("/PrivilegeCollection", templateHostPerson);
    
    layoutHosts.createRow(tblHosts, null, new sap.ui.commons.layout.MatrixLayoutCell({content: formHostDetails}).setVAlign("Top"));
    this.addContent(layoutHosts);
  }

});
