# MMM-SensorTemps
Displays sensor temperature and humidity for multiple sensors. Uses http to collect sensor data from rest api.

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Module takes sensor data via http from [RuuvitagRestGateway](https://github.com/sipuli93/RuuvitagRestGateway)

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
             module: "MMM-SensorTemps",
             position: "bottom_center",
             config: {
                ruuvitagRestGatewayAddr: "http://<ip>:<port>",
                sensors: [
                    {
                        mac: "<mac address>",
                        name: "<sensor name>",
			sendAsOutdoorNotification: false,
			hideIfTempUnder: -1000
                    },
                ]
             }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `ruuvitagRestGatewayAddr` | *Required* Full url pointing to sensor in rest api. Example `http://<ip>:<port>`
| `sensors` | *Required* List of sensors. Mac address and name.
| `sendAsOutdoorNotification` | *Optional* false is default. When set to true, sensors temperature and humidity will be sended via notification (CURRENT_WEATHER_OVERRIDE) to other modules, this overdrives current temperature and humidity in default weather module.
| `hideIfTempUnder` | *Optional* -1000 is default. Treshold for showing/hiding sensor. Ex. for sauna, no need to show temperature if not hot.
