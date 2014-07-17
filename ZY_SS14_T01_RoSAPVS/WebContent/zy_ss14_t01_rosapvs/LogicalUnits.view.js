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
	    
	    // Create a new Matrix Layout for detail pane
	    var layoutLogicalUnitsDetails = new sap.ui.commons.layout.MatrixLayout({
	      id: 'layoutLogicalUnitsDetails',
	      columns: 1,
	      widths: ['100%']
	    });
	    
	    layoutLogicalUnitsDetails.setWidth('100%');
	    
	    var formLogicalUnitDetails = new sap.ui.commons.form.Form('formLogicalUnitDetails', {
	      title: new sap.ui.core.Title({
	        text: "Logical Unit Details",
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
	    
	    layoutLogicalUnitsDetails.createRow(formLogicalUnitDetails);
	    
	    // Layout for Detail Tables
	    var layoutDetailsTables = new sap.ui.commons.layout.MatrixLayout({
		      id: 'layoutDetailsTables',
		      columns: 3,
		      widths: ['25%', '25%', '25%']
		    });
		layoutDetailsTables.setWidth('100%');
	    
	    var tblHostsDetail = new sap.ui.table.DataTable("tblHostsDetail", {
		      visibleRowCount: 10,
		      ExpandedVisibleRowCount: 20,
		      selectionMode: sap.ui.table.SelectionMode.MultiToggle,
		      rowSelectionChange: function(e) {
			       var indicesHost = tblHostsDetail.getSelectedIndices();
			       
			       var hostArray = [];
			       while (indicesHost.length > 0) {
				       var contextHosts = tblHostsDetail.getContextByIndex(indicesHost.pop());
				       sap.ui.getCore().getModel().read(contextHosts.sPath, 0, 0, false, function(successHosts) {
				    	   console.log(successHosts.Name);
				    	   hostArray.push(successHosts);
				       });
			       }
			       console.log(hostArray);
			       console.log(hostArray.pop());
		    	  var selected = tblHostsDetail.getSelectedIndices();
		    	  var rowIndices = e.getParameter('rowIndices');
		    	  // Rowindices describes selected group
		            for (var i = 0; i < rowIndices.length; i++) {
		                var rowIndex = rowIndices[i];
		                //var sel = tblHostsDetail.isIndexSelected(rowIndex);
		                //var model = tblHostsDetail.getModel();
		                //model.getData()['modelData'][rowIndex]['checked'] = sel;
		                //tblHostsDetail.invalidate();
		                console.log(selected, rowIndex, rowIndices.length, 'AAAA');
		            }
		      },
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
		    //tblPlatformsDetail.attachRowSelect(function(oEvent) {
		    //  oController.getDetails();
		    //});
	
		    tblHostsDetail.setTitle("Hosts");
		    
		    var tblPlatformsDetail = new sap.ui.table.DataTable("tblPlatformsDetail", {
			      visibleRowCount: 10,
			      ExpandedVisibleRowCount: 20,
			      selectionMode: sap.ui.table.SelectionMode.MultiToggle,
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
			    //tblPlatformsDetail.attachRowSelect(function(oEvent) {
			    //  oController.getDetails();
			    //});
		
			    tblPlatformsDetail.setTitle("Platforms");
		    
			    var tblApplicationsDetail = new sap.ui.table.DataTable("tblApplicationsDetail", {
				      visibleRowCount: 10,
				      ExpandedVisibleRowCount: 20,
				      selectionMode: sap.ui.table.SelectionMode.MultiToggle,
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
				    //tblPlatformsDetail.attachRowSelect(function(oEvent) {
				    //  oController.getDetails();
				    //});
			
				    tblApplicationsDetail.setTitle("Applications");			    
		    
		    layoutDetailsTables.createRow(tblHostsDetail, tblPlatformsDetail, tblApplicationsDetail);   
		
		    layoutLogicalUnitsDetails.createRow(new sap.ui.commons.HorizontalDivider("divider", {visible: true}));
		    layoutLogicalUnitsDetails.createRow(layoutDetailsTables);
		    
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
	    
	    layoutLogicalUnits.createRow(tblLogicalUnits, null, new sap.ui.commons.layout.MatrixLayoutCell({content: layoutLogicalUnitsDetails}).setVAlign("Top"));
	    this.addContent(layoutLogicalUnits);
	  }

	});
