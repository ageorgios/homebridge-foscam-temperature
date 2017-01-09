# homebridge-foscam-temperature

This is a plugin for [homebridge](https://github.com/nfarina/homebridge) which makes it possible to create a temperature sensor
in HomeKit for Foscam Cameras that have temperature sensor.

# Information
The temperature is retrieved from the CGI API of Foscam Cameras.
```
http://hostname:port/cgi-bin/CGIProxy.fcgi?cmd=getTemperatureState
```

## Example config

```json
{
  "accessory": "FoscamP1TemperatureAccessory",
  "name": "Foscam P1 Temperature Sensor",
  "description": "The temperature sensor from a Foscam P1 Camera",
  "hostname": "The hostnmae of the foscam camera",
  "port": "The port of the foscam camera",
  "username": "username of the foscam",
  "password": "password of the foscam"
}
```