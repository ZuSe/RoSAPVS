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
	      widths: ['35%', '2em', '65%']
	    });
	    layoutLogicalUnits.setWidth('100%');

	    var tblLogicalUnits = new sap.ui.table.Table("tblLogicalUnits", {
	      visibleRowCount: 25,
	      ExpandedVisibleRowCount: 30,
	      selectionMode: sap.ui.table.SelectionMode.Single,
	      toolbar: new sap.ui.commons.Toolbar({
	        id:"toolbarTableLogicalUnits",
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
	    tblLogicalUnits.attachRowSelectionChange(function(oEvent) {
	      oController.getDetails();
	    });

	    var layoutLogicalUnitsDetails = new sap.ui.commons.layout.MatrixLayout({
	      id: 'layoutLogicalUnitsDetails',
	      columns: 1,
	      widths: ['100%']
	    });
	    
	    layoutLogicalUnitsDetails.setWidth('100%');
   
	    var matLayout = new sap.ui.commons.layout.MatrixLayout({
			width: "100%",
			widths: ["15em","100%"],
		    });
		    
		    matLayout.createRow(null, null);
		    matLayout.createRow(new sap.ui.commons.Label({text:"ID"}),new sap.ui.commons.TextField("tF_LogicalUnitId",{editable: false}));
		    matLayout.createRow(new sap.ui.commons.Label({text:"Name"}),new sap.ui.commons.TextField("tF_LogicalUnitName",{editable: false}));
		    matLayout.createRow(new sap.ui.commons.Label({text:"Employee Responsible"}), new sap.ui.commons.layout.MatrixLayoutCell({content: [new sap.ui.commons.TextField("tF_LogicalUnitPerson",{editable: false}),new sap.ui.commons.DropdownBox("dB_LogicalUnitPerson",{value: "None",displaySecondaryValues: true, visible: false, editable: false})]}));	    
		    matLayout.createRow(null, null);
		    
	    //matLayout.createRow(null, formLogicalUnitDetails);
	    
	    layoutLogicalUnitsDetails.createRow(matLayout);
	    
	    // Layout for Detail Tables
	    var layoutDetailsTables = new sap.ui.commons.layout.MatrixLayout({
		      id: 'layoutDetailsTables',
		      columns: 3,
		      widths: ['25%', '25%', '25%']
		    });
		layoutDetailsTables.setWidth('100%');
	    
	    var tblHostsDetail = new sap.ui.table.Table("tblHostsDetail", {
		      visibleRowCount: 10,
		      ExpandedVisibleRowCount: 20,
		      selectionMode: sap.ui.table.SelectionMode.None,
		      editable: false
		    });
	    
		    tblHostsDetail.addColumn(new sap.ui.table.Column({
		      label: new sap.ui.commons.Label({
		        text: "Id"
		      }),
		      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
		      sortProperty: "Id"
		    }));
		    tblHostsDetail.addColumn(new sap.ui.table.Column({
		      label: new sap.ui.commons.Label({
		        text: "Name"
		      }),
		      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
		      sortProperty: "Name"
		    }));

		    tblHostsDetail.bindRows("/HostCollection");
		    tblHostsDetail.setTitle("Hosts");
		    
		    var tblPlatformsDetail = new sap.ui.table.Table("tblPlatformsDetail", {
			      visibleRowCount: 10,
			      ExpandedVisibleRowCount: 20,
			      selectionMode: sap.ui.table.SelectionMode.None,
			      editable: false
			    });
			    tblPlatformsDetail.addColumn(new sap.ui.table.Column({
			      label: new sap.ui.commons.Label({
			        text: "Id"
			      }),
			      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
			      sortProperty: "Id"
			    }));
			    tblPlatformsDetail.addColumn(new sap.ui.table.Column({
			      label: new sap.ui.commons.Label({
			        text: "Name"
			      }),
			      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
			      sortProperty: "Name"
			    }));

			    tblPlatformsDetail.bindRows("/PlatformCollection");
			    tblPlatformsDetail.setTitle("Platforms");
		    
			    var tblApplicationsDetail = new sap.ui.table.Table("tblApplicationsDetail", {
				      visibleRowCount: 10,
				      ExpandedVisibleRowCount: 20,
				      selectionMode: sap.ui.table.SelectionMode.None,
				      editable: false
				    });
				    tblApplicationsDetail.addColumn(new sap.ui.table.Column({
				      label: new sap.ui.commons.Label({
				        text: "Id"
				      }),
				      template: new sap.ui.commons.TextField().bindProperty("value", "Id"),
				      sortProperty: "Id"
				    }));
				    tblApplicationsDetail.addColumn(new sap.ui.table.Column({
				      label: new sap.ui.commons.Label({
				        text: "Name"
				      }),
				      template: new sap.ui.commons.TextField().bindProperty("value", "Name"),
				      sortProperty: "Name"
				    }));

				    tblApplicationsDetail.bindRows("/ApplicationCollection");
				    tblApplicationsDetail.setTitle("Applications");			    
		    
				    var formLogicalUnitDetails = new sap.ui.layout.form.Form('formLogicalUnitDetails', {
					      layout: new sap.ui.layout.form.GridLayout(),
					      formContainers: [new sap.ui.layout.form.FormContainer('formContainerLogicalUnitDetails'
					      )],
					    }); 
				    
		    layoutDetailsTables.createRow(tblHostsDetail, tblPlatformsDetail, tblApplicationsDetail);   
		
		    layoutLogicalUnitsDetails.createRow(new sap.ui.commons.HorizontalDivider("divider", {visible: true}));
		    layoutLogicalUnitsDetails.createRow(layoutDetailsTables);
		    layoutLogicalUnitsDetails.createRow(null);
		    layoutLogicalUnitsDetails.createRow(formLogicalUnitDetails);
		    
	    // *** Data Binding and Listeners *** //

	    var templateLogicalUnitPerson = new sap.ui.core.ListItem();
	    templateLogicalUnitPerson.bindProperty("text", "SapUser");
	    templateLogicalUnitPerson.bindProperty("additionalText", "Role");
	    sap.ui.getCore().byId('dB_LogicalUnitPerson').bindItems("/PrivilegeCollection", templateLogicalUnitPerson);
	    
	    var panelDetails = new sap.ui.commons.Panel({
	    	applyContentPadding: true,
	    	title: new sap.ui.core.Title({
	        text: "Logical Unit Details",
	      }),
	      showCollapseIcon: false});
	    panelDetails.addContent(layoutLogicalUnitsDetails);
	    panelDetails.addStyleClass('fancyBox');
	    
	    layoutLogicalUnits.createRow(tblLogicalUnits, null, new sap.ui.commons.layout.MatrixLayoutCell({content: panelDetails}).setVAlign("Top"));
	    this.addContent(layoutLogicalUnits);
	    
	  }

	});
