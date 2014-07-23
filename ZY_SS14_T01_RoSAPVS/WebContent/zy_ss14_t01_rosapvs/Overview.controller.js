sap.ui
	.controller(
		"zy_ss14_t01_rosapvs.Overview",
		{
		    network : [],		    
		    /**
		     * Called when a controller is instantiated and its View
		     * controls (if available) are already created. Can be used
		     * to modify the View before it is displayed, to bind event
		     * handlers and do other one-time initialization.
		     * 
		     * @memberOf zy_ss14_t01_rosapvs.Overview
		     */

		    onInit : function() {
			//this.buildNetworkModel();
		    },

		    /**
		     * Similar to onAfterRendering, but this hook is invoked
		     * before the controller's View is re-rendered (NOT before
		     * the first rendering! onInit() is used for that one!).
		     * 
		     * @memberOf zy_ss14_t01_rosapvs.Overview
		     */
		    onBeforeRendering : function() {
			this.buildNetworkModel();
		    },

		    /**
		     * Called when the View has been rendered (so its HTML is
		     * part of the document). Post-rendering manipulations of
		     * the HTML could be done here. This hook is the same one
		     * that SAPUI5 controls get after being rendered.
		     * 
		     * @memberOf zy_ss14_t01_rosapvs.Overview
		     */
		    onAfterRendering : function() {	      	      
		        
		    },

		    /**
		     * Called when the Controller is destroyed. Use this one to
		     * free resources and finalize activities.
		     * 
		     * @memberOf zy_ss14_t01_rosapvs.Overview
		     */
		    onExit : function() {

		    },

		    buildNetworkModel : function() {
			var hosts = new Array();
			var platforms = new Array();
			var applications = new Array();
			
			function drawGraphDummy(z)
		  {
			  sap.ui.controller("zy_ss14_t01_rosapvs.Overview").drawGraph(z);
		  }

			// Fill applications
			function fillApplications(){ 
			  var dfd = $.Deferred();
			  
			  var request = {
			    headers : {
				"Accept" : "application/json"
			    },
			    requestUri : "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/ApplicationCollection",
			    method : "GET",
			    User : "ABAP-12",
			    Password : "p4ssw0rd",
			};
			OData
				.request(
					request,
					function(data, success) {
					    console.log(data.results.length);
					    $.each(data.results,function(index, element) {
								request = {
								    headers : {
									"Accept" : "application/json"
								    },
								    requestUri : "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/ApplicationCollection("
									    + element.Id + ")",
								    method : "GET",
								    User : "ABAP-12",
								    Password : "p4ssw0rd",
								};
								OData.request(request, function(data2, success2) {								   
								    var application = {
					                  Id : data2.Id,
					                  Name : data2.Name,
					                  Platform : data2.Platform
					                   };
								    applications.push(application);	
								    console.log("apps");
								    if(index+1 == data.results.length)
                    {								     
                      dfd.resolve();
                    }
								}, function(error2) {
								});
							    });
					}, function(error) {
					});			
			return dfd.promise();
			};
			// End of applications
			//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++    
			// Fill platforms
			function fillPlatforms(){  
			  var dfd = $.Deferred();
			  var request = {
          headers : {
        "Accept" : "application/json"
          },
          requestUri : "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/PlatformCollection",
          method : "GET",
          User : "ABAP-12",
          Password : "p4ssw0rd",
      };
      OData
        .request(
          request,
          function(data, success) {              
              $.each(data.results,function(index, element) {
                request = {
                    headers : {
                  "Accept" : "application/json"
                    },
                    requestUri : "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/PlatformCollection("
                      + element.Id + ")",
                    method : "GET",
                    User : "ABAP-12",
                    Password : "p4ssw0rd",
                };
                OData.request(request, function(data2, success2) {               
                    var applicationsOfPlatform = $.grep(applications, function(application){ return application.Platform == data2.Id; });
                    var platform = {
                            Id : data2.Id,
                            Name : data2.Name,
                            Host : data2.Host,
                            Applications: applicationsOfPlatform,
                    };
                    platforms.push(platform);
                    console.log("plts");
                    if(index+1 == data.results.length)
                    {
                      dfd.resolve();                     
                    }
                    
                }, function(error2) {
                });
                  });
          }, function(error) {
          });      
      return dfd.promise();}
   // End of platforms
   //++//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++//++
   // Fill Hosts
	function fillHosts()
	{
	  var dfd = $.Deferred();
      var request = {
              headers : {
            "Accept" : "application/json"
              },
              requestUri : "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/HostCollection",
              method : "GET",
              User : "ABAP-12",
              Password : "p4ssw0rd",
          };
      OData
      .request(
        request,
        function(data, success) {           
            $.each(data.results,function(index, element) {
              request = {
                  headers : {
                "Accept" : "application/json"
                  },
                  requestUri : "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/HostCollection("
                    + element.Id + ")",
                  method : "GET",
                  User : "ABAP-12",
                  Password : "p4ssw0rd",
              };
              OData.request(request, function(data2, success2) {               
                  var platformsOfHost = $.grep(platforms, function(platform){ return platform.Host== data2.Id; });
                  var host = {
                          Id : data2.Id,
                          Name: data2.Name,
                          Platforms: platformsOfHost,
                  };
                  hosts.push(host); 
                  console.log("hosts");
                  if( hosts.length == data.results.length)
                    {
                      this.network = hosts;
                      console.log("Network is ready");
                      console.log(this.network);
                      dfd.resolve(); 
                      drawGraphDummy(hosts);
                    }
              }, function(error2) {
              });
                });
        }, function(error) {
        });
      return dfd.promise();
      
	      } // End of fillHosts
	
	    $.when(fillApplications()).done(
	            function(x){$.when(fillPlatforms()).done(
	                    function(y){fillHosts();});});	   
	}, // End of buildNetworkModel
	
	drawGraph: function(elements)
  {
    var nodes = null;
    var edges = null;
    var network = null;

    var DIR = 'http://home.in.tum.de/~palacin/static/images/';
    var LENGTH_HOST = 300;
    var LENGTH_PLT = 150;
    var LENGTH_APP = 100;

            
      // Create a data table with nodes.
      nodes = [];

      // Create a data table with links.
      edges = [];
      nodes.push({id: -1, label: "DataCenter", image: DIR + 'datacenter64.png', shape: 'image'})
      $.each(elements, function(index, host){
      nodes.push({id: host.Id, label: "("+host.Id+") "+host.Name, image: DIR + 'host48.png', shape: 'image'});
      edges.push({from: host.Id, to: -1, length: LENGTH_HOST});
        $.each(host.Platforms, function(index2,platform)
                {
                        nodes.push({id: platform.Id, label: "("+platform.Id+") "+platform.Name, image: DIR + 'platform48.png', shape: 'image'});
                        edges.push({from: host.Id, to: platform.Id, length: LENGTH_PLT});
                        $.each(platform.Applications, function(index3, application)
                                {
                                        nodes.push({id: application.Id , label: "("+application.Id+") "+application.Name, image: DIR + 'application48.png', shape: 'image'});
                                        edges.push({from: platform.Id, to: application.Id, length: LENGTH_APP});
                                });
                });
        
  });
      
      // create a network
      var container = document.getElementById('network');
      var data = {
        nodes: nodes,
        edges: edges
      };
      console.log(data);
      var options = {
        stabilize: false, // stabilize positions before displaying
        clustering: true,
        hierarchicalLayout: false

      };
      network = new vis.Network(container, data, options);
  }

    });