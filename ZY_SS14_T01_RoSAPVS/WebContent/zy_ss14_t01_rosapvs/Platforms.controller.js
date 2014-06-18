sap.ui.controller("zy_ss14_t01_rosapvs.Platforms", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf zy_ss14_t01_rosapvs.Platforms
	 */

	properties : {
		keys : ["Id"],
		textFields : ["Name", "ReqCpu", "ReqHdd", "ReqRam", "IsActive"],
		dropDownBoxes : ["Host", "Person"],
	},
	onInit : function () {},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf zy_ss14_t01_rosapvs.Platforms
	 */
	onBeforeRendering : function () {},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf zy_ss14_t01_rosapvs.Platforms
	 */
	onAfterRendering : function () {},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf zy_ss14_t01_rosapvs.Platforms
	 */
	onExit : function () {
	
	},

	lockInput : function () {
		$(sap.ui.controller("zy_ss14_t01_rosapvs.Platforms").properties.keys).each(function (index, element) {
			sap.ui.getCore().byId("tF_Platforms" + element).setEditable(false);
		});
		$(sap.ui.controller("zy_ss14_t01_rosapvs.Platforms").properties.textFields).each(function (index, element) {
			sap.ui.getCore().byId("tF_Platforms" + element).setEditable(false);
		});
		$(sap.ui.controller("zy_ss14_t01_rosapvs.Platforms").properties.dropDownBoxes).each(function (index, element) {
			sap.ui.getCore().byId("dB_Platforms" + element).setEditable(false);
		});
	},

	getDetails : function () {
		var tblPlatforms = sap.ui.getCore().byId('tblPlatforms');
		var context = tblPlatforms.getContextByIndex(tblPlatforms.getSelectedIndex());
		if (null != context) {
			sap.ui.getCore().getModel().read(context.sPath, 0, 0, false, function (success) {
				console.log(success);
				$(sap.ui.controller("zy_ss14_t01_rosapvs.Platforms").properties.keys).each(function (index, element) {
					sap.ui.getCore().byId("tF_Platforms" + element).setValue(success[element]);
				});
				$(sap.ui.controller("zy_ss14_t01_rosapvs.Platforms").properties.textFields).each(function (index, element) {
					sap.ui.getCore().byId("tF_Platforms" + element).setValue(success[element]);
				});
				$(sap.ui.controller("zy_ss14_t01_rosapvs.Platforms").properties.dropDownBoxes).each(function (index, element) {
					sap.ui.getCore().byId("dB_Platforms" + element).setValue(success[element]);
				});
			}, function (error) {
				console.log(error);
				alert(error);
			});
		}
	},

	createPlatform : function () {
		$(this.properties.keys).each(function (index, element) {
			sap.ui.getCore().byId("tF_Platforms" + element).setValue("To be calculated");
		});
		$(this.properties.textFields).each(function (index, element) {
			sap.ui.getCore().byId("tF_Platforms" + element).setEditable(true).setValue("");
		});
		$(this.properties.dropDownBoxes).each(function (index, element) {
			sap.ui.getCore().byId("dB_Platforms" + element).setEditable(true).setValue("");
		});

		var submitButton = new sap.ui.commons.Button({
				text : "Add",
				tooltip : "Submit Data",
				visible : true,
				width : "4em"

			});
		var fnPressHandler = null;
		fnPressHandler = function (oEvent) {
			var entry = {
				Name : sap.ui.getCore().byId("tF_PlatformsName").getValue(),
				ReqCpu : 1 * sap.ui.getCore().byId("tF_PlatformsReqCpu").getValue(),
				ReqHdd : sap.ui.getCore().byId("tF_PlatformsReqHdd").getValue(),
				ReqRam : sap.ui.getCore().byId("tF_PlatformsReqRam").getValue(),
				Host : sap.ui.getCore().byId("dB_PlatformsHost").getValue(),
				IsActive : sap.ui.getCore().byId("tF_PlatformsIsActive").getValue(),
				Person : sap.ui.getCore().byId("dB_PlatformsPerson").getValue(),
			};

			console.log(entry);
			var response = sap.ui.getCore().getModel().create('/PlatformCollection', entry);
			console.log(response);
			alert("New Platform was added successfully");
			if (oEvent.getSource()instanceof sap.ui.commons.Button) {
				oEvent.getSource().detachPress(fnPressHandler);
				submitButton.destroy();
			}
			;
		};

		sap.ui.getCore().byId("formContainerPlatformDetails").addFormElement(new sap.ui.layout.form.FormElement({
				fields : [submitButton.attachPress(this.lockInput).attachPress(fnPressHandler), ]
			}));

	},
});
