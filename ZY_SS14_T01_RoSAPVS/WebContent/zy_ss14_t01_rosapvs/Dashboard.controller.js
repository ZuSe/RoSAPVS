sap.ui.controller("zy_ss14_t01_rosapvs.Dashboard", {

  /**
   * Called when a controller is instantiated and its View controls (if
   * available) are already created. Can be used to modify the View before it is
   * displayed, to bind event handlers and do other one-time initialization.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Dashboard
   */
  onInit: function() {
    console.log(window.role);

  },

  /**
   * Similar to onAfterRendering, but this hook is invoked before the
   * controller's View is re-rendered (NOT before the first rendering! onInit()
   * is used for that one!).
   * 
   * @memberOf zy_ss14_t01_rosapvs.Dashboard
   */
  onBeforeRendering: function() {

  },

  /**
   * Called when the View has been rendered (so its HTML is part of the
   * document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Dashboard
   */
  onAfterRendering: function() {

  },

  /**
   * Called when the Controller is destroyed. Use this one to free resources and
   * finalize activities.
   * 
   * @memberOf zy_ss14_t01_rosapvs.Dashboard
   */
  onExit: function() {

  },
  addPanels: function() {
    var mainLayout = sap.ui.getCore().byId("matrixLayoutDashboard");
    mainLayout.destroyRows();

    var panelUserData = new sap.ui.commons.Panel("panelUserData", {
      title: new sap.ui.core.Title({
        text: "Account Information",
        icon: sap.ui.core.IconPool.getIconURI("account")
      })
    });
    new sap.ui.layout.form.Form("formUserData", {
      layout: new sap.ui.layout.form.ResponsiveGridLayout(),
      editable: false,
      formContainers: [new sap.ui.layout.form.FormContainer("F1C3", {
        formElements: [new sap.ui.layout.form.FormElement({
          label: "Account",
          fields: [new sap.ui.commons.TextField({
            value: $.cookie("Account"),editable: false
          })]
        }), new sap.ui.layout.form.FormElement({
          label: "Role",
          fields: [new sap.ui.commons.TextField({
            value: window.role, editable: false
          })]
        }), ]
      }),

      ]
    }).placeAt(panelUserData);

    mainLayout.createRow(panelUserData);

    if (window.role == 2 || window.role == 1) // HostAdmin or SuperAdmin
    {
      var panelHosts = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Your Hosts",
          icon: sap.ui.core.IconPool.getIconURI("sys-monitor")
        })
      });
      var panelPlatforms = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Your Platforms",
          icon: sap.ui.core.IconPool.getIconURI("it-system")
        })
      });
      var panelApplications = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Your Applications",
          icon: sap.ui.core.IconPool.getIconURI("it-instance")
        })
      });

      mainLayout.createRow(panelHosts);
      mainLayout.createRow(panelPlatforms);
      mainLayout.createRow(panelApplications);
    }
    if (window.role == 3 || window.role == 1) // LandscapeAdmin or SuperAdmin
    {
      var panelLogicalUnits = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Your Logical Units",
          icon: sap.ui.core.IconPool.getIconURI("tree")
        })
      });
      mainLayout.createRow(panelLogicalUnits);
    }
  }

});