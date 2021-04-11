/* global Module */

/* Magic Mirror
 * Module: MMM-IndoorAndSaunaTemp
 *
 * By sipuli93
 * MIT Licensed.
 */

Module.register("MMM-IndoorAndSaunaTemp", {
	defaults: {
		saunaTempLimit: 35,
		saunaReadyLimit: 60,
		indoorSensorHeader: "Indoor",
		saunaSensorHeader: "Sauna",
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		this.indoorSensor = {
			MAC: this.config.indoorSensorMAC,
			temp: NaN,
			humidity: NaN,
			header: this.config.indoorSensorHeader
		};
		this.saunaSensor = {
			MAC: this.config.saunaSensorMAC,
			temp: NaN,
			header: this.config.saunaSensorHeader
		};
		this.outdoorSensor = {
			MAC: this.config.outdoorSensorMAC
		};
	},
	
	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("DIV");
		wrapper.className = "large light sidebyside";
		var degreeLabel = "°";
		if (this.indoorSensor.temp != NaN) {
			var indoorWrapper = document.createElement("DIV");
			var indoorHeader = document.createElement("HEADER");
			var indoorTempSpan = document.createElement("SPAN");
			var indoorHeaderText = document.createTextNode(this.indoorSensor.header);
			var indoorTemp = document.createTextNode(this.indoorSensor.temp.toFixed(1) + degreeLabel + "C" + " | " + this.indoorSensor.humidity.toFixed(0) + "%");
			indoorTempSpan.className = "bright regular";
			indoorTempSpan.appendChild(indoorTemp);
			indoorHeader.appendChild(indoorHeaderText);
			indoorWrapper.appendChild(indoorHeader);
			indoorWrapper.appendChild(indoorTempSpan);
			wrapper.appendChild(indoorWrapper);
		}
		if (this.saunaSensor.temp != NaN && this.saunaSensor.temp > this.config.saunaTempLimit) {
			var saunaWrapper = document.createElement("DIV");
                        var saunaHeader = document.createElement("HEADER");
			var saunaTempSpan = document.createElement("SPAN");
                        var saunaHeaderText = document.createTextNode(this.saunaSensor.header);
			var saunaTemp = document.createTextNode(this.saunaSensor.temp.toFixed(1) + degreeLabel + "C");
			if (this.saunaSensor.temp > this.config.saunaReadyLimit){
				saunaTempSpan.className = "bright regular blinking";
			} else {
				saunaTempSpan.className = "bright regular";
			}
			saunaTempSpan.appendChild(saunaTemp);
			saunaHeader.appendChild(saunaHeaderText);
			saunaWrapper.appendChild(saunaHeader);
			saunaWrapper.appendChild(saunaTempSpan);
			wrapper.appendChild(saunaWrapper);
		}
		return wrapper;
	},
	
	// Load css files
	getStyles: function () {
		return [
			"MMM-IndoorAndSaunaTemp.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},
	
	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		var self = this;
		
		if (notification == 'RUUVI_ENVIRONMENT_PACKET') {
			var obj = JSON.parse(payload);

			if (this.indoorSensor.MAC === obj.MAC) {
				this.indoorSensor.temp = obj.temperature;
				this.indoorSensor.humidity = obj.humidity;
				self.updateDom();
			}
			else if (this.saunaSensor.MAC === obj.MAC) {
				this.saunaSensor.temp = obj.temperature;
				self.updateDom();
			}
			else if (this.outdoorSensor.MAC === obj.MAC) {
				this.sendNotification("OUTDOOR_TEMPERATURE",obj.temperature);
			}
		}
	},
});
