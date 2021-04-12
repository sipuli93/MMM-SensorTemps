/* global Module */

/* Magic Mirror
 * Module: MMM-SensorTemps
 *
 * By sipuli93
 * MIT Licensed.
 */

Module.register("MMM-SensorTemps", {
	defaults: {
		initialLoadDelay: 0,
		retryDelay: 10 * 1000, //10sec
		updateInterval: 60 * 1000, //1min
		animationSpeed: 1000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		Log.info("Starting module: " + this.name);
		
		this.sensors = {};
		for (i = 0; i < this.config.sensors.length; i++) {
			this.sensors[this.config.sensors[i].mac] = {
				temp: NaN,
				humidity: NaN,
				header: this.config.sensors[i].name,
				oudoorNotification: typeof this.config.sensors[i].sendAsOutdoorNotification !== 'undefined' ?  this.config.sensors[i].sendAsOutdoorNotification : false
			};
		};
		this.queryURL = this.config.ruuvitagRestGatewayAddr + "/ruuvitags?";
		var iterations = this.sensors.length;
		for (var sensor in this.sensors){
			this.queryURL = this.queryURL + "filter=" + sensor;
			if (--iterations){ this.queryURL + "&";	}
		}
		this.scheduleUpdate(this.config.initialLoadDelay);
	},
	
	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("DIV");
		wrapper.className = "large light sidebyside";
		var degreeLabel = "°";
		
		for (var sensor in this.sensors){
			if (! this.sensors[sensor].oudoorNotification){
				var sensorWrapper = document.createElement("DIV");
				var sensorHeader = document.createElement("HEADER");
				var sensorTempSpan = document.createElement("SPAN");
				var sensorHeaderText = document.createTextNode(this.sensors[sensor].header);
				var sensorTemp = document.createTextNode(this.sensors[sensor].temp.toFixed(1) + degreeLabel + "C" + " " + this.sensors[sensor].humidity.toFixed(0) + "%");
				sensorTempSpan.className = "bright regular";
				sensorTempSpan.appendChild(sensorTemp);
				sensorHeader.appendChild(sensorHeaderText);
				sensorWrapper.appendChild(sensorHeader);
				sensorWrapper.appendChild(sensorTempSpan);
				wrapper.appendChild(sensorWrapper);
			} else {
				this.sendNotification("OUTDOOR_TEMPERATURE", this.sensors[sensor].temperature;
				this.sendNotification("OUTDOOR_HUMIDITY", this.sensors[sensor].humidity;
			}
		}
		return wrapper;
	},
	
	// Load css files
	getStyles: function () {
		return [
			"MMM-SensorTemps.css",
		];
	},
	
	// Update sensor data from rest gateway
	updateSensors: function () {
		var self = this;
		var retry = true;
		
		if (this.config.endpoint === "") {
			Log.error(self.name + ": Missing endpoint!");
			return;
		}
		var dataRequest = new XMLHttpRequest();
		dataRequest.open("GET", this.queryURL, true);
		dataRequest.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processSensorData(JSON.parse(this.response));
				} else {
					Log.error(self.name + ": Could not load sensor data.");
				}

				if (retry) {
					self.scheduleUpdate(self.loaded ? -1 : self.config.retryDelay);
				}
			}
		};
		dataRequest.send();
	},
	
	// Handle received data and update dom
	processSensorData: function (data) {
		for (i = 0; i < data.ruuvitags.length; i++){
			this.sensors[data.ruuvitags[i].mac].temp = data.ruuvitags[i].temperature;
			this.sensors[data.ruuvitags[i].mac].humidity = data.ruuvitags[i].humidity;
		}
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},
	
	// Schedule next update
	scheduleUpdate: function (delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function () {
			self.updateSensors();
		}, nextLoad);
	},
});
