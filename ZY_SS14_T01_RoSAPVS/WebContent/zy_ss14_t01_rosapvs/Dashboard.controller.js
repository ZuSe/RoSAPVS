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
    
    var modelHosts = new sap.ui.model.json.JSONModel({
      hostData : [
              {Id :1, Name:"Hana P750",activePlatforms:2, Platforms:5},
              {Id :2, Name:"Hasso I3540",activePlatforms:10, Platforms:10},
              {Id :3, Name:"Billy X510",activePlatforms:1, Platforms:8},
              {Id :4, Name:"Ely AX32",activePlatforms:3, Platforms:4},
              {Id :5, Name:"Ginny P870",activePlatforms:0, Platforms:6},
              {Id :6, Name:"Jobs mac80",activePlatforms:7, Platforms:8},
      ]
    });
    var datasetHosts = new sap.viz.ui5.data.FlattenedDataset({

      // a Bar Chart requires exactly one dimension (x-axis) 
      dimensions : [ 
        {
          axis : 1, // must be one for the x-axis, 2 for y-axis
          name : 'Name', 
          value : "{Name}"
        } 
      ],

      // it can show multiple measures, each results in a new set of bars in a new color 
      measures : [           
        {
          name : 'Active Platforms', // 'name' is used as label in the Legend 
          value : '{activePlatforms}' // 'value' defines the binding for the displayed value   
        },
        {
          name : 'Total Platforms', 
          value : '{Platforms}'
        } 
      ],   
      data : {
        path : "/hostData"
      }
      
    });
    
    var modelPlatforms = new sap.ui.model.json.JSONModel({
      platformData : [
                      {Id :1,Name:"SAP NW 7.40",activeApplications:6, Applications:15},
                      {Id :2,Name:"Jboss 7",activeApplications:10, Applications:20},
                      {Id :3,Name:"Glassfish 4",activeApplications:1, Applications:8},
                      {Id :4,Name:"SAP HANA",activeApplications:3, Applications:4},
                      {Id :5,Name:"NodeJS",activeApplications:5, Applications:9},
                      {Id :6,Name:"MACH",activeApplications:0, Applications:8},
      ]
    });
    
    var datasetPlatforms = new sap.viz.ui5.data.FlattenedDataset({

      // a Bar Chart requires exactly one dimension (x-axis) 
      dimensions : [ 
        {
          axis : 1, // must be one for the x-axis, 2 for y-axis
          name : 'Name', 
          value : "{Name}"
        } 
      ],

      // it can show multiple measures, each results in a new set of bars in a new color 
      measures : [           
        {
          name : 'Active Applications', // 'name' is used as label in the Legend 
          value : '{activeApplications}' // 'value' defines the binding for the displayed value   
        },
        {
          name : 'Total Applications', 
          value : '{Applications}'
        } 
      ],   
      data : {
        path : "/platformData"
      }
      
    });
    
    var modelApplications = new sap.ui.model.json.JSONModel({
      applicationData : [
                {Id :1,Name:"SAP CRM 7.1", reqHDD:6, reqRAM:15},
                {Id :2,Name:"Grade Calculator 5",reHDD:100, reqRAM:20},
                {Id :3,Name:"RealTime Banking 10",reqHDD:21, reqRAM:8},
                {Id :4,Name:"RoSAPVS",reqHDD:33, reqRAM:4},
                {Id :5,Name:"Tengelmann Loyalty App",reqHDD:5, reqRAM:9},
                {Id :6,Name:"Torrent-Server JA",reqHDD:1, reqRAM:8},
      ]
    });
    
    var datasetApplications = new sap.viz.ui5.data.FlattenedDataset({

      // a Bar Chart requires exactly one dimension (x-axis) 
      dimensions : [ 
        {
          axis : 1, // must be one for the x-axis, 2 for y-axis
          name : 'Name', 
          value : "{Name}"
        } 
      ],

      // it can show multiple measures, each results in a new set of bars in a new color 
      measures : [           
        {
          group: 1,
          name : 'Required DiskSpace', // 'name' is used as label in the Legend 
          value : '{reqHDD}' // 'value' defines the binding for the displayed value   
        },
        {
          group: 2,
          name : 'Required Memory', 
          value : '{reqRAM}'
        } 
      ],   
      data : {
        path : "/applicationData",
        factory : function() {
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
          text: "Hosts",
          icon: sap.ui.core.IconPool.getIconURI("sys-monitor")
        })
      });
      var barChartHosts = new sap.viz.ui5.Bar({
        width : "80%",
        height : "400px",
        plotArea : {        
        },
        title : {
          visible : true,
          text : 'Active and total platforms per Host'
        },
        dataset : datasetHosts,
      }).setModel(modelHosts).placeAt(panelHosts);
      
      
      
      var panelPlatforms = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Platforms",
          icon: sap.ui.core.IconPool.getIconURI("it-system")
        })
      });
      
      var columnChartPlatforms = new sap.viz.ui5.Column({
        width : "80%",
        height : "400px",
        plotArea : {        
        },
        title : {
          visible : true,
          text : 'Applications per Platform'
        },
        dataset : datasetPlatforms,
      }).setModel(modelPlatforms).placeAt(panelPlatforms);
      var panelApplications = new sap.ui.commons.Panel({
        title: new sap.ui.core.Title({
          text: "Applications",
          icon: sap.ui.core.IconPool.getIconURI("it-instance")
        })
      });

      
      var scatterChartApplications = new sap.viz.ui5.Scatter({
        width : "80%",
        height : "400px",
        plotArea : {
          //'colorPalette' : d3.scale.category20().range()
          },
        title : {
          visible : true,
          text : 'DiskSpace vs RAM'
        },
        
        dataset : datasetApplications
      }).setModel(modelApplications).placeAt(panelApplications);
      
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