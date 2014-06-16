sap.ui.jsview("zy_ss14_t01_rosapvs.Applications", {

    /**
     * Specifies the Controller belonging to this View. In the case that it is
     * not implemented, or that "null" is returned, this View does not have a
     * Controller.
     * 
     * @memberOf zy_ss14_t01_rosapvs.Applications
     */
    getControllerName : function() {
	return "zy_ss14_t01_rosapvs.Applications";
    },

    /**
     * Is initially called once after the Controller has been instantiated. It
     * is the place where the UI is constructed. Since the Controller is given
     * to this method, its event handlers can be attached right away.
     * 
     * @memberOf zy_ss14_t01_rosapvs.Applications
     */
    createContent : function(oController) {

	// Create a new Matrix Layout for the View
	var layoutApplications = new sap.ui.commons.layout.MatrixLayout('layoutApplications');
	layoutApplications.setWidth('100%');

	var tblApplications = new sap.ui.table.DataTable("tblApplications", {
	    visibleRowCount : 10,
	    ExpandedVisibleRowCount : 20,
	    selectionMode : sap.ui.table.SelectionMode.Single,
	    toolbar : new sap.ui.commons.Toolbar({
		items : [ new sap.ui.commons.Button({
		    text : "Create",
		    press : function() {
			oController.Create();
		    }
		}), new sap.ui.commons.Button({
		    text : "Update",
		    press : function() {
			oController.Update();
		    }
		}), new sap.ui.commons.Button({
		    text : "Delete",
		    press : function() {
			oController.Delete();
		    }
		}), ]
	    }),
	    editable : false
	});
	tblApplications.addColumn(new sap.ui.table.Column({
	    label : new sap.ui.commons.Label({
		text : "Id"
	    }),
	    template : new sap.ui.commons.TextField().bindProperty("value", "Id"),
	    sortProperty : "Id"
	}));
	tblApplications.addColumn(new sap.ui.table.Column({
	    label : new sap.ui.commons.Label({
		text : "Name"
	    }),
	    template : new sap.ui.commons.TextField().bindProperty("value", "Name"),
	    sortProperty : "Name"
	}));
	tblApplications.addColumn(new sap.ui.table.Column({
	    label : new sap.ui.commons.Label({
		text : "Active"
	    }),
	    template : new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
	    sortProperty : "IsActive"
	}));

	tblApplications.bindRows("/ApplicationCollection");

	var oLayoutfmApplicationDetails = new sap.ui.layout.form.GridLayout();
	var formApplicationDetails = new sap.ui.commons.form.Form('formApplicationDetails', {
	    title : new sap.ui.core.Title({
		text : "Application Details",
		tooltip : "Todo"
	    }),
	    layout : oLayoutfmApplicationDetails,
	    formContainers : [ new sap.ui.layout.form.FormContainer({
		formElements : [ new sap.ui.layout.form.FormElement({
		    label : new sap.ui.commons.Label({
			text : "ID"
		    }),
		    fields : [ new sap.ui.commons.TextField("tF_ApplicationId", {
			editable : false,
			layoutData : new sap.ui.layout.form.GridElementData({
			    hCells : "auto"
			})
		    }), ]
		}), new sap.ui.layout.form.FormElement({
		    label : new sap.ui.commons.Label({
			text : "Name"
		    }),
		    fields : [ new sap.ui.commons.TextField("tF_ApplicationName", {
			value : "",
			editable : false,
			layoutData : new sap.ui.layout.form.GridElementData({
			    hCells : "auto"
			})
		    }), ]
		}), new sap.ui.layout.form.FormElement({
		    label : new sap.ui.commons.Label({
			text : "Hardware Requirements"
		    }),
		    fields : [ new sap.ui.commons.TextField("tF_reqCPU", {
			value : "",
			editable : false,
			layoutData : new sap.ui.layout.form.GridElementData({
			    hCells : "3"
			})
		    }), new sap.ui.commons.TextField("tF_reqRAM", {
			value : "",
			editable : false,
			layoutData : new sap.ui.layout.form.GridElementData({
			    hCells : "3"
			})
		    }), new sap.ui.commons.TextField("tF_reqHDD", {
			value : "",
			editable : false,
			layoutData : new sap.ui.layout.form.GridElementData({
			    hCells : "3"
			})
		    }),

		    ]
		}), new sap.ui.layout.form.FormElement({
		    fields : [ new sap.ui.commons.Button({
			text : "Submit",
			id : "btnApplicationSubmit",
			tooltip : "Submit Data",
			visible : true,
			layoutData : new sap.ui.layout.form.GridElementData({
			    hCells : "1"
			})
		    }), ]
		}), ]
	    }) ],
	});

	layoutApplications.createRow(tblApplications, formApplicationDetails);
	this.addContent(layoutApplications);
    }

});
