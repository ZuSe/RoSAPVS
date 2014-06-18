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
      widths: ['10em', '5em', '15em']
    });
    layoutHosts.setWidth('100%');

    var tblHosts = new sap.ui.table.DataTable("tblHosts", {
      visibleRowCount: 25,
      ExpandedVisibleRowCount: 30,
      selectionMode: sap.ui.table.SelectionMode.Single,
      toolbar: new sap.ui.commons.Toolbar({
        items: [new sap.ui.commons.Button({
          text: "Create",
          press: function() {
            oController.createHost();
          }
        }), new sap.ui.commons.Button({
          text: "Update",
          press: function() {
            oController.updateHost();
          }
        }), new sap.ui.commons.Button({
          text: "Delete",
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
    tblHosts.addColumn(new sap.ui.table.Column({
      label: new sap.ui.commons.Label({
        text: "Active"
      }),
      template: new sap.ui.commons.TextField().bindProperty("value", "IsActive"),
      sortProperty: "IsActive"
    }));

    tblHosts.bindRows("/HostCollection");
    tblHosts.attachRowSelect(function(oEvent) {
      oController.getDetails();
    });

    var oLayoutfmHostDetails = new sap.ui.layout.form.ResponsiveGridLayout();
    var formContainerHostDetails = new sap.ui.layout.form.FormContainer("formContainerHostDetails");
    
    var formHostDetails = new sap.ui.commons.form.Form('formHostDetails', {
      title: new sap.ui.core.Title({
        text: "Host Details",
        tooltip: "Todo",
      }),
      layout: oLayoutfmHostDetails,
      formContainers: [formContainerHostDetails]});

    $(oController.properties.keys).each(function(index, element) {
      formContainerHostDetails.addFormElement(new sap.ui.layout.form.FormElement({label:new sap.ui.commons.Label({
        text: element}), fields: [new sap.ui.commons.TextField("tF_Hosts" + element, {editable: false,required: true,width: "12em"}),]}));
    });
    $(oController.properties.textFields).each(function(index, element) {
      formContainerHostDetails.addFormElement(new sap.ui.layout.form.FormElement({ label: new sap.ui.commons.Label({
        text: element}), fields: [new sap.ui.commons.TextField("tF_Hosts" + element, {editable: false,required: false, width: "12em",
        })]}));
    });
    $(oController.properties.dropDownBoxes).each(function(index, element) {
      formContainerHostDetails.addFormElement(new sap.ui.layout.form.FormElement({ label: new sap.ui.commons.Label({
        text: element}), fields: [new sap.ui.commons.DropdownBox("dB_Hosts" + element, {editable: false,required: false, width: "12em",
        })]}));
    });   

    // *** Data Binding and Listeners *** //

    layoutHosts.createRow(tblHosts, null, formHostDetails);
    this.addContent(layoutHosts);
  }

});