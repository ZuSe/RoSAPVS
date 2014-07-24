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

    jQuery.sap.require("sap.viz.ui5.Bar");
    jQuery.sap.require("sap.viz.ui5.Column");
    jQuery.sap.require("sap.viz.ui5.Scatter");
    jQuery.sap.require("sap.viz.ui5.data.FlattenedDataset");

    /*
     * Datasets for Hosts
     */

    var datasetHostsCPU = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],
      measures: [{
        name: 'Cores in Use',
        value: '{UsedCpu}',
      }, {
        name: 'Total Cores',
        value: '{Cpu}',
      }],
      data: {
        path: "/HostStatsCollection"
      }
    });

    var datasetHostsRAM = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],
      measures: [{
        name: 'Ram in Use [GB]',
        value: '{UsedRam}',
      }, {
        name: 'Total Ram [GB]',
        value: '{Ram}',
      }],
      data: {
        path: "/HostStatsCollection"
      }
    });

    var datasetHostsHDD = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],
      measures: [{
        name: 'Reserved Disk Space [TB]',
        value: '{UsedHdd}',
      }, {
        name: 'Total Disk Space [TB]',
        value: '{Hdd}',
      }],
      data: {
        path: "/HostStatsCollection"
      }
    });

    var datasetHostsPLTS = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],
      measures: [{
        name: 'Number of Platforms running',
        value: '{CountPlt}',
      }, ],
      data: {
        path: "/HostStatsCollection"
      }
    });

    /*
     * Datasets for Platforms
     */

    var datasetPlatformsCPU = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],

      measures: [{
        name: 'Cores assigned to Applications',
        value: '{UsedCpu}',
      }, {
        name: 'Total Cores',
        value: '{Cpu}',
      }],
      data: {
        path: "/PlatformStatsCollection"
      }
    });

    var datasetPlatformsRAM = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],
      measures: [{
        name: 'Ram assigned to Applications [GB]',
        value: '{UsedRam}',
      }, {
        name: 'Total Ram[GB]',
        value: '{Ram}',
      }],
      data: {
        path: "/PlatformStatsCollection"
      }
    });

    var datasetPlatformsHDD = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],

      measures: [{
        name: 'Reserved Disk Space by Applications [TB]',
        value: '{UsedHdd}',
      }, {
        name: 'Total Disk Space [TB]',
        value: '{Hdd}',
      }],
      data: {
        path: "/PlatformStatsCollection"
      }
    });

    var datasetPlatformsAPLS = new sap.viz.ui5.data.FlattenedDataset({
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],
      measures: [{
        name: 'Number of Applications running',
        value: '{CountApl}',
      }, ],
      data: {
        path: "/PlatformStatsCollection"
      }
    });
    

    var datasetApplications = new sap.viz.ui5.data.FlattenedDataset({

      // a Bar Chart requires exactly one dimension (x-axis)
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Name',
        value: "{Name}"
      }],

      // it can show multiple measures, each results in a new set of bars in a
      // new color
      measures: [{
        group: 1,
        name: 'In Landscape', // 'name' is used as label in the Legend
        value: '{AplCount}' // 'value' defines the binding for the displayed value
      },],
      data: {
        path: "/ApplicationsStatsCollection",
        factory: function() {
        }
      }

    });
    
    var datasetCommonHPA= new sap.viz.ui5.data.FlattenedDataset({

      // a Bar Chart requires exactly one dimension (x-axis)
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Components',
        value: "All"
      }],

      // it can show multiple measures, each results in a new set of bars in a
      // new color
      measures: [{
        group: 1,
        name: 'Hosts Activated', // 'name' is used as label in the Legend
        value: '{SumActHst}' // 'value' defines the binding for the displayed value
      },
      {
        group: 1,
        name: 'Hosts Total', // 'name' is used as label in the Legend
        value: '{SumHst}' // 'value' defines the binding for the displayed value
      },
      {
        group: 2,
        name: 'Platforms Activated', // 'name' is used as label in the Legend
        value: '{SumActPlt}' // 'value' defines the binding for the displayed value
      },
      {
        group: 2,
        name: 'Platforms Total', // 'name' is used as label in the Legend
        value: '{SumPlt}' // 'value' defines the binding for the displayed value
      },      
      {
        group: 2,
        name: ' Applications Activated', 
        value: '{SumActApl}' // 'value' defines the binding for the displayed value
      },
      {
        group: 2,
        name: ' Applications Total', // 'name' is used as label in the Legend
        value: '{SumApl}' // 'value' defines the binding for the displayed value
      }, 
      
      ],
      data: {
        path: "/CommonStatsCollection",
        factory: function() {
        }
      }

    });
    
    var datasetCommonRES= new sap.viz.ui5.data.FlattenedDataset({

      // a Bar Chart requires exactly one dimension (x-axis)
      dimensions: [{
        axis: 1, // must be one for the x-axis, 2 for y-axis
        name: 'Ressources',
        value: "All"
      }],

      // it can show multiple measures, each results in a new set of bars in a
      // new color
      measures: [
      {
        group: 2,
        name: 'Total available Cores', // 'name' is used as label in the Legend
        value: '{SumCpu}' // 'value' defines the binding for the displayed value
      },      
      {
        group: 1,
        name: 'Total available Disk Space [TB]', 
        value: '{SumHdd}' // 'value' defines the binding for the displayed value
      },
      {
        group: 1,
        name: 'Total available Memory [GB]', // 'name' is used as label in the Legend
        value: '{SumRam}' // 'value' defines the binding for the displayed value
      }, 
      
      ],
      data: {
        path: "/CommonStatsCollection",
        factory: function() {
        }
      }

    });

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
            value: $.cookie("Account"),
            editable: false
          })]
        }), new sap.ui.layout.form.FormElement({
          label: "Role",
          fields: [new sap.ui.commons.TextField({
            value: window.role,
            editable: false
          })]
        }), ]
      }),

      ]
    }).placeAt(panelUserData);

    mainLayout.createRow(panelUserData);

    /*
     * All UI-Elements for HostAdmin's Stats go here
     */
    if (window.role == 2 || window.role == 1) // HostAdmin or SuperAdmin
    {
      var panelHosts = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Hosts",
          icon: sap.ui.core.IconPool.getIconURI("sys-monitor")
        })
      });

      var tabStripHosts = new sap.ui.commons.TabStrip("tabStripHosts", {
        width: "100%",
        height: "450px",
      });

      var barChartHostsCPU = new sap.viz.ui5.Bar({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'CPU Usage'
        },
        dataset: datasetHostsCPU,
      });

      var barChartHostsRAM = new sap.viz.ui5.Bar({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'Memory Usage'
        },
        dataset: datasetHostsRAM,
      });

      var barChartHostsHDD = new sap.viz.ui5.Bar({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'HardDisk Usage'
        },
        dataset: datasetHostsHDD,
      });

      var columnChartHostsPLTS = new sap.viz.ui5.Column({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'Platforms Running per Host'
        },
        dataset: datasetHostsPLTS,
      });

      tabStripHosts.createTab("CPU", barChartHostsCPU);
      tabStripHosts.createTab("RAM", barChartHostsRAM);
      tabStripHosts.createTab("HDD", barChartHostsHDD);
      tabStripHosts.createTab("PLATFORMS", columnChartHostsPLTS);
      tabStripHosts.placeAt(panelHosts);

      var panelPlatforms = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Platforms",
          icon: sap.ui.core.IconPool.getIconURI("it-system")
        })
      });

      var tabStripPlatforms = new sap.ui.commons.TabStrip("tabStripPlatforms",
              {
                width: "100%",
                height: "450px",
              });

      var barChartPlatformsCPU = new sap.viz.ui5.Bar({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'CPU Usage'
        },
        dataset: datasetPlatformsCPU,
      });

      var barChartPlatformsRAM = new sap.viz.ui5.Bar({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'Memory Usage'
        },
        dataset: datasetPlatformsRAM,
      });

      var barChartPlatformsHDD = new sap.viz.ui5.Bar({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'HardDisk Usage'
        },
        dataset: datasetPlatformsHDD,
      });

      var columnChartPlatformsPLTS = new sap.viz.ui5.Column({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'Applications Running per Platform'
        },
        dataset: datasetPlatformsAPLS,
      });

      tabStripPlatforms.createTab("CPU", barChartPlatformsCPU);
      tabStripPlatforms.createTab("RAM", barChartPlatformsRAM);
      tabStripPlatforms.createTab("HDD", barChartPlatformsHDD);
      tabStripPlatforms.createTab("APPLICATIONS", columnChartPlatformsPLTS);
      tabStripPlatforms.placeAt(panelPlatforms);

      var panelApplications = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Applications",
          icon: sap.ui.core.IconPool.getIconURI("it-instance")
        })
      });

      var donutChartApplications = new sap.viz.ui5.Donut({
        width: "80%",
        height: "400px",
        plotArea: {
        // 'colorPalette' : d3.scale.category20().range()
        },
        title: {
          visible: true,
          text: 'Software Types in Landscape'
        },

        dataset: datasetApplications
      }).placeAt(panelApplications);

      mainLayout.createRow(panelHosts);
      mainLayout.createRow(panelPlatforms);
      mainLayout.createRow(panelApplications);
    }  
    
    /*
     *  Common Stats
     */
      var panelCommon = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Landscape Overview",
          icon: sap.ui.core.IconPool.getIconURI("tree")
        })
      });
      var tabStripLandscape = new sap.ui.commons.TabStrip({
        width: "100%",
        height: "450px",
      });      
      
      var columnChartCommonHPA = new sap.viz.ui5.DualColumn({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'Overview Hosts, Platforms and Applications'
        },
        dataset: datasetCommonHPA,
      });
      
      var columnChartCommonRES = new sap.viz.ui5.DualColumn({
        width: "80%",
        height: "400px",
        plotArea: {},
        title: {
          visible: true,
          text: 'Overview Ressources'
        },
        dataset: datasetCommonRES,
      });
      
      tabStripLandscape.createTab("Components", columnChartCommonHPA);
      tabStripLandscape.createTab("Ressources", columnChartCommonRES);
      tabStripLandscape.placeAt(panelCommon);
      mainLayout.createRow(panelCommon);
    
  }

});