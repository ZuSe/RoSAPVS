sap.ui.jsview("zy_ss14_t01_rosapvs.LogicalUnits", {

	  /**
	   * Specifies the Controller belonging to this View. In the case that it is not
	   * implemented, or that "null" is returned, this View does not have a
	   * Controller.
	   * 
	   * @memberOf zy_ss14_t01_rosapvs.LogicalUnits
	   */
	  getControllerName: function() {
	    return "zy_ss14_t01_rosapvs.LogicalUnits";
	  },

	  /**
	   * Is initially called once after the Controller has been instantiated. It is
	   * the place where the UI is constructed. Since the Controller is given to
	   * this method, its event handlers can be attached right away.
	   * 
	   * @memberOf zy_ss14_t01_rosapvs.LogicalUnits
	   */
	  createContent: function(oController) {

	    // *** Declaration of important style variables *** //

	    // Create a new Matrix Layout for the View
	    var layoutLogicalUnits = new sap.ui.commons.layout.MatrixLayout({
	      id: 'layoutLogicalUnits',
	      columns: 3,
	      widths: ['35%', '5%', '60%']
	    });
	    layoutLogicalUnits.setWidth('100%');

	    var tblLogicalUnits = new sap.ui.table.DataTable("tblLogicalUnits", {
	      visibleRowCount: 25,
	      ExpandedVisibleRowCount: 30,
	      selectionMode: sap.ui.table.SelectionMode.Single,
	      toolbar: new sap.ui.commons.Toolbar({
	        items: [new sap.ui.commons.Button({
	          text: "Create",
	          icon: sap.ui.core.IconPool.getIconURI("create"),
	          press: function() {
	            oController.createLogicalUnit();
	          }
	        }), new sap.ui.commons.Button({
	          text: "Update",
	          icon: sap.ui.core.IconPool.getIconURI("refresh"),
	          press: function() {
	            oController.updateLogicalUnit();
	          }
	        }), new sap.ui.commons.Button({
	          text: "Delete",
	          icon: sap.ui.core.IconPool.getIconURI("delete"),
	          press: function() {
	            oController.deleteLogicalUnit();
	          }
	        }), ]
	      }),
	      editable: false
	    });
	    tblLogicalUnits.addColumn(new sap.ui.table.Column({
	      label: new sap.ui.commons.Label({
	        text: "Id"
	      }),
	      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
	      sortProperty: "Id"
	    }));
	    tblLogicalUnits.addColumn(new sap.ui.table.Column({
	      label: new sap.ui.commons.Label({
	        text: "Name"
	      }),
	      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
	      sortProperty: "Name"
	    }));

	    tblLogicalUnits.bindRows("/LogicalUnitCollection");
	    tblLogicalUnits.attachRowSelect(function(oEvent) {
	      oController.getDetails();
	    });

	    var oLayoutfmLogicalUnitDetails = new sap.ui.layout.form.GridLayout();
	    var formLogicalUnitDetails = new sap.ui.commons.form.Form('formLogicalUnitDetails', {
	      title: new sap.ui.core.Title({
	        text: "LogicalUnit Details",
	        tooltip: "Todo"
	      }),
	      layout: oLayoutfmLogicalUnitDetails,
	      formContainers: [new sap.ui.layout.form.FormContainer('formContainerLogicalUnitDetails',{
	        formElements: [new sap.ui.layout.form.FormElement({
	          label: new sap.ui.commons.Label({
	            text: "ID"
	          }),
	          fields: [new sap.ui.commons.TextField("tF_LogicalUnitId", {
	            editable: false,
	            layoutData: new sap.ui.layout.form.GridElementData({
	              hCells: "auto"
	            })
	          }), ]
	        }), new sap.ui.layout.form.FormElement({
	          label: new sap.ui.commons.Label({
	            text: "Name"
	          }),
	          fields: [new sap.ui.commons.TextField("tF_LogicalUnitName", {
	            value: "",
	            editable: false,
	            layoutData: new sap.ui.layout.form.GridElementData({
	              hCells: "auto"
	            })
	          }), ]
	        }),  new sap.ui.layout.form.FormElement({
	          label: new sap.ui.commons.Label({
	            text: "Employee Responsible"
	          }),
	          fields: [new sap.ui.commons.TextField("tF_LogicalUnitPerson", {
	              value: "",
	              editable: false,
	              layoutData: new sap.ui.layout.form.GridElementData({
	                hCells: "3"
	              })
	            }),    new sap.ui.commons.DropdownBox("dB_LogicalUnitPerson", {
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

//	    var templateLogicalUnitPlatform = new sap.ui.core.ListItem();
//	    templateLogicalUnitPlatform.bindProperty("text", "Id");
//	    templateLogicalUnitPlatform.bindProperty("additionalText", "Name");
//	    sap.ui.getCore().byId('dB_LogicalUnitPlatform').bindItems("/PlatformCollection", templateLogicalUnitPlatform);
//	    
//	    var templateLogicalUnitSoftwareType = new sap.ui.core.ListItem();
//	    templateLogicalUnitSoftwareType.bindProperty("text", "Id");
//	    templateLogicalUnitSoftwareType.bindProperty("additionalText", "Name");
//	    sap.ui.getCore().byId('dB_LogicalUnitSoftwareType').bindItems("/SoftwareTypeCollection", templateLogicalUnitSoftwareType);
//
	    var templateLogicalUnitPerson = new sap.ui.core.ListItem();
	    templateLogicalUnitPerson.bindProperty("text", "SapUser");
	    templateLogicalUnitPerson.bindProperty("additionalText", "Role");
	    sap.ui.getCore().byId('dB_LogicalUnitPerson').bindItems("/PrivilegeCollection", templateLogicalUnitPerson);
	    
	    layoutLogicalUnits.createRow(tblLogicalUnits, null, new sap.ui.commons.layout.MatrixLayoutCell({content: formLogicalUnitDetails}).setVAlign("Top"));
	    this.addContent(layoutLogicalUnits);
	  }

	});
