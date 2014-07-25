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
                            "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T01_ODATA_SRV/",
                            true, null, null);
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
                  displayListener: function(oEvent) {
                    var bShow = oEvent.getParameter("show");                    
                    if (bShow) {
                      /*
                       * Now the application can decide how to display the bar.
                       * It can be maximized, default, minimized (please see
                       * NotificationBarStatus)
                       */
                      var sStatus = sap.ui.ux3.NotificationBarStatus.Default;
                      oNotiBar.setVisibleStatus(sStatus);
                    } else {
                      
                    }
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
                    if (jQuery.cookie("Account") != undefined) {
                      this.performLogin(jQuery.cookie("Account"));

                      if (jQuery.cookie("workItemSelected") != undefined) {
                        var oShell = sap.ui.getCore().byId("RoSAPVSShell");
                        sap.ui.getCore().byId("WI_Landing").setVisible(false);
                        oShell.setSelectedWorksetItem(jQuery
                                .cookie("workItemSelected"));
                        oShell.setContent(sap.ui.getCore().byId(
                                jQuery.cookie("currentView")));

                      }
                    } else {
                      $(sap.ui.getCore().byId("RoSAPVSShell").getWorksetItems())
                              .each(function(index, element) {
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
                    };

                    OData.request(request, function(data, success) {
                      if (data.Valid == "T") {
                        console.log("Perfom Login");
                        sap.ui.controller("zy_ss14_t01_rosapvs.Landing")
                                .performLogin(data.User.toUpperCase());
                      } else {
                        var oMessage = new sap.ui.core.Message({
                          text: 'Incorrect Login',
                          timestamp: (new Date()).toUTCString()
                        });
                        oMessage.setLevel(sap.ui.core.MessageType.Error);
                        sap.ui.getCore().byId("oMessageNotifier").addMessage(
                                oMessage);
                        // sap.ui.commons.MessageBox.alert("Incorrect
                        // Login",'',"Error");
                      }
                    }, function(error) {
                      console.log(error);
                      var oMessage = new sap.ui.core.Message({
                        text: 'Not allowed',
                        timestamp: (new Date()).toUTCString()
                      });
                      oMessage.setLevel(sap.ui.core.MessageType.Error);
                      sap.ui.getCore().byId("oMessageNotifier").addMessage(
                              oMessage);
                    });
                  },

                  signInButtonListener: function() {
                    var user = sap.ui.getCore().byId("tF_LoginUsername")
                            .getValue().toUpperCase();
                    var password = sap.ui.getCore().byId("tF_LoginPassword")
                            .getValue();
                    this.signIn(user, password);
                  },

                  performLogin: function(username) {
                    sap.ui
                            .getCore()
                            .getModel()
                            .read(
                                    "/PrivilegeCollection(SapUser='" + username
                                            + "')",
                                    0,
                                    0,
                                    false,
                                    function(success) {
                                      console.log(success);
                                      var oMessage = new sap.ui.core.Message({
                                        text: 'Login successful.',
                                        timestamp: (new Date()).toUTCString()
                                      });
                                      oMessage
                                              .setLevel(sap.ui.core.MessageType.Success);
                                      sap.ui.getCore().byId("oMessageNotifier")
                                              .addMessage(oMessage);
                                      sap.ui.controller(
                                              "zy_ss14_t01_rosapvs.Landing")
                                              .postLogin(success.SapUser,
                                                      success.Role);
                                    }, function(error) {

                                    }

                            );
                  },

                  postLogin: function(username, role) {
                    console.log(role);
                    $(sap.ui.getCore().byId("RoSAPVSShell").getWorksetItems())
                            .each(
                                    function(index, element) {

                                      // Rights Management
                                      if (role == 1 || role == 2) {
                                        element.setVisible(true);
                                      } else if (role == 3) {
                                        if (element.sId == "WI_Dashboard"
                                                || element.sId == "WI_LogicalUnits"
                                                || element.sId == "WI_Overview"
                                                || element.sId == "WI_Users") {
                                          element.setVisible(true);
                                        }
                                      } else {
                                        if (element.sId == "WI_Dashboard"
                                                || element.sId == "WI_Users") {
                                          element.setVisible(true);
                                        }
                                      }
                                    });
                    // Show username and role
                    console.log(sap.ui.getCore().byId("tV_UserName"));
                    window.role = role;
                    sap.ui.getCore().byId("tV_UserName").setText(
                            username + " (" + this.roles[role] + ")");
                    // Set cookie
                    jQuery.cookie("Account", username, {
                      expires: 7,
                      path: '/'
                    });
                    sap.ui.getCore().byId("WI_Landing").setVisible(false);

                    // End of login, render id dependent dashboard elements and
                    // show it !
                    oShell.setSelectedWorksetItem("WI_Dashboard");
                    dashboardView.oController.addPanels();
                    oShell.setContent(dashboardView);
                  },

                });
