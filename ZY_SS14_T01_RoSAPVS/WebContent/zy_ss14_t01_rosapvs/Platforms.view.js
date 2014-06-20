sap.ui.jsview("zy_ss14_t01_rosapvs.Platforms", {

	/** Specifies the Controller belonging to this View.
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf zy_ss14_t01_rosapvs.Platforms
	 */
	getControllerName : function () {
		return "zy_ss14_t01_rosapvs.Platforms";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf zy_ss14_t01_rosapvs.Platforms
	 */
	createContent : function (oController) {
		// Create a new Matrix Layout for the View
		var layoutPlatforms = new sap.ui.commons.layout.MatrixLayout({
				id : 'layoutPlatforms',
				columns : 3,
				widths: ['35%', '5%', '60%']
			});
		layoutPlatforms.setWidth('100%');
		
		var tblPlatforms = new sap.ui.table.DataTable("tblPlatforms", {
				visibleRowCount : 25,
				ExpandedVisibleRowCount : 30,
				selectionMode : sap.ui.table.SelectionMode.Single,
				toolbar : new sap.ui.commons.Toolbar({
					items : [
						new sap.ui.commons.Button({
							text : "Create",
							icon: sap.ui.core.IconPool.getIconURI("create"),
							press : function () {
								oController.createPlatform();
							}
						}),
						new sap.ui.commons.Button({
							text : "Update",
							icon: sap.ui.core.IconPool.getIconURI("refresh"),
							press : function () {
								oController.updatePlatform();
							}
						}),
						new sap.ui.commons.Button({
							text : "Delete",
							icon: sap.ui.core.IconPool.getIconURI("delete"),
							press : function () {
								oController.deletePlatform();
							}
						}),
					]
				}),
				editable : false
			});

		tblPlatforms.addColumn(
			new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Id"
				}),
				template : new sap.ui.commons.TextField().bindProperty("value", "Id"),
				sortProperty : "Id"
			}));
		tblPlatforms.addColumn(
			new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Name"
				}),
				template : new sap.ui.commons.TextField().bindProperty("value", "Name"),
				sortProperty : "Name"
			}));
		tblPlatforms.addColumn(
			new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Active"
				}),
				template : new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
				sortProperty : "IsActive"
			}));

		tblPlatforms.bindRows("/PlatformCollection");
		tblPlatforms.attachRowSelect(function (oEvent) {
			oController.getDetails();
		});

		var oLayoutfmPlatformDetails = new sap.ui.layout.form.ResponsiveGridLayout();
		var formContainerPlatformDetails = new sap.ui.layout.form.FormContainer("formContainerPlatformDetails");

		var formPlatformDetails = new sap.ui.commons.form.Form('formPlatformDetails', {
				title : new sap.ui.core.Title({
					text : "Platform Details",
					tooltip : "Todo",
				}),
				layout : oLayoutfmPlatformDetails,
				formContainers : [formContainerPlatformDetails]
			});

		$(oController.properties.keys).each(function (index, element) {
			formContainerPlatformDetails.addFormElement(new sap.ui.layout.form.FormElement({
					label : new sap.ui.commons.Label({
						text : element
					}),
					fields : [new sap.ui.commons.TextField("tF_Platforms" + element, {
							editable : false,
							required : true,
							width : "12em"
						}), ]
				}));
		});
		$(oController.properties.textFields).each(function (index, element) {
			formContainerPlatformDetails.addFormElement(new sap.ui.layout.form.FormElement({
					label : new sap.ui.commons.Label({
						text : element
					}),
					fields : [new sap.ui.commons.TextField("tF_Platforms" + element, {
							editable : false,
							required : false,
							width : "12em",
						})]
				}));
		});
		$(oController.properties.dropDownBoxes).each(function (index, element) {
			formContainerPlatformDetails.addFormElement(new sap.ui.layout.form.FormElement({
					label : new sap.ui.commons.Label({
						text : element
					}),
					fields : [new sap.ui.commons.DropdownBox("dB_Platforms" + element, {
							editable : false,
							required : false,
							width : "12em",
						})]
				}));
		});

		// *** Data Binding and Listeners *** //

		layoutPlatforms.createRow(tblPlatforms, null, new sap.ui.commons.layout.MatrixLayoutCell({content: formPlatformDetails}).setVAlign("Top"));
		this.addContent(layoutPlatforms);
	}

});
