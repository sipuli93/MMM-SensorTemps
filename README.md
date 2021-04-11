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
             module: "MMM-IndoorTemps",
             position: "bottom_center",
             config: {
                indoorSensorMAC: "<Sensor mac address in capital>",
                saunaSensorMAC: "<Sensor mac address in capita>"
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `indoorSensorMAC`        | *Required* Mac address of the sensor
| `saunaSensorHeader`        | *Optional* Header for sauna <br>Default `sauna`
