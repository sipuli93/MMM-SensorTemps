# MMM-SensorTemps
Displays sensor temperature and humidity for multiple sensors. Uses http to collect sensor data from rest api.

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Module takes sensor data via notifications, use modified [MMM-SensorGateway](https://github.com/sipuli93/MMM-SensorGateway).

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
             module: "MMM-IndoorAndSaunaTemp",
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
| `saunaSensorMAC`        | *Required* Mac address of the sensor
| `saunaTempLimit`        | *Optional* The minimum to show sauna temperature <br>**Type:** `int`(celsius) <br>Default 35 celsius
| `saunaReadyLimit`        | *Optional* The minimum when sauna temperature will start blinking <br>**Type:** `int`(celsius) <br>Default 60 celsius
| `indoorSensorHeader`        | *Optional* Header for indoor <br>Default `infood`
| `saunaSensorHeader`        | *Optional* Header for sauna <br>Default `sauna`
