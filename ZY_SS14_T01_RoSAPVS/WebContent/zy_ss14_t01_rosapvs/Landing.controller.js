sap.ui
        .controller(
                "zy_ss14_t01_rosapvs.Landing",
                {

                  roles: {
                    1: "Superadmin",
                    2: "Hostadmin",
                    3: "Landscapeadmin",
                    4: "User",
                  },
                  /**
                   * Called when a controller is instantiated and its View
                   * controls (if available) are already created. Can be used to
                   * modify the View before it is displayed, to bind event
                   * handlers and do other one-time initialization.
                   * 
                   * @memberOf zy_ss14_t01_rosapvs.Landing
                   */
                  onInit: function() {
                    var modCM = new sap.ui.model.odata.ODataModel(
                            "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/", true, "ABAP-12",
                            "p4ssw0rd");
                    sap.ui.getCore().setModel(modCM);                    
                  },

                  /**
                   * Similar to onAfterRendering, but this hook is invoked
                   * before the controller's View is re-rendered (NOT before the
                   * first rendering! onInit() is used for that one!).
                   * 
                   * @memberOf zy_ss14_t01_rosapvs.Landing
                   */
                  onBeforeRendering: function() {                    
                   },
                  /**
                   * Called when the View has been rendered (so its HTML is part
                   * of the document). Post-rendering manipulations of the HTML
                   * could be done here. This hook is the same one that SAPUI5
                   * controls get after being rendered.
                   * 
                   * @memberOf zy_ss14_t01_rosapvs.Landing
                   */
                   onAfterRendering: function() {
                     if($.cookie("Account") != undefined)
                     {
                       this.performLogin($.cookie("Account"));
                     
                     if($.cookie("workItemSelected") != undefined)
                     {
                       var oShell = sap.ui.getCore().byId("RoSAPVSShell");
                       sap.ui.getCore().byId("WI_Landing").setVisible(false);
                       oShell.setSelectedWorksetItem($.cookie("workItemSelected"));
                       oShell.setContent(sap.ui.getCore().byId($.cookie("currentView")));
                       
                     }
                     }
                     else
                     {
                       $(sap.ui.getCore().byId("RoSAPVSShell").getWorksetItems()).each(function(index, element) {
                         element.setVisible(false);
                       });
                     }
                   },
                  /**
                   * Called when the Controller is destroyed. Use this one to
                   * free resources and finalize activities.
                   * 
                   * @memberOf zy_ss14_t01_rosapvs.Landing
                   */
                  // onExit: function() {
                  //
                  // }
                  signIn: function(myUser, myPassword) {

                    var request = {
                      headers: {
                        "Accept": "application/json"
                      },
                      requestUri: "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/UserCheckLoginCollection(User='"
                              + myUser + "',Password='" + myPassword + "')",
                      method: "GET",
                      User: "ABAP-12",
                      Password: "p4ssw0rd",
                    };

                    OData.request(request, function(data, success) {
                      if (data.Valid == "T") {
                        console.log("Perfom Login");
                        sap.ui.controller("zy_ss14_t01_rosapvs.Landing").performLogin(data.User.toUpperCase());
                      } else {

                      }
                    }, function(error) {
                    }

                    );

                  },

                  signInButtonListener: function() {
                    var user = sap.ui.getCore().byId("tF_LoginUsername").getValue().toUpperCase();
                    var password = sap.ui.getCore().byId("tF_LoginPassword").getValue();
                    // TODO implement validator for user and password
                    this.signIn(user, password);
                  },

                  performLogin: function(username) {
                    sap.ui.getCore().getModel().read("/PrivilegeCollection(SapUser='" + username + "')", 0, 0, false, function(success) {
                      console.log(success);
                      sap.ui.controller("zy_ss14_t01_rosapvs.Landing").postLogin(success.SapUser, success.Role);
                    }, function(error) {

                    }

                    );
                  },

                  postLogin: function(username, role) {
                    console.log(role);
                    $(sap.ui.getCore().byId("RoSAPVSShell").getWorksetItems()).each(function(index, element) {
                      element.setVisible(true);
                    });
                    // Show username and role
                    console.log(sap.ui.getCore().byId("tV_UserName"));
                    sap.ui.getCore().byId("tV_UserName").setText(username + " ("+ this.roles[role] +")");
                    // Set cookie
                    $.cookie("Account",username,{ expires: 7, path: '/' });
                    sap.ui.getCore().byId("WI_Landing").setVisible(false);
                  },
                });