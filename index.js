var Service, Characteristic;
var parseString = require('xml2js').parseString;
var http = require('http');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-foscamp1-temperature", "FoscamP1Temperature", FoscamP1TemperatureAccessory);
}

function FoscamP1TemperatureAccessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.description = config["description"];
  this.hostname = config["hostname"];
  this.port = config["port"];
  this.username = config["username"];
  this.password = config["password"];

  this.service = new Service.TemperatureSensor(this.name);

  this.service
    .getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', this.getState.bind(this));
}

FoscamP1TemperatureAccessory.prototype.getState = function(callback) {
  xmlToJson("http://" + this.hostname + ":" + this.port +"/cgi-bin/CGIProxy.fcgi?cmd=getTemperatureState&usr="+this.username+"&pwd="+this.password, function(err, data) {
    if (err) return callback(err)
    console.log(JSON.stringify(data, null, 2));
    callback(null, 21.0)
  })
}

FoscamP1TemperatureAccessory.prototype.getServices = function() {
  return [this.service];
}

function xmlToJson(url, callback) {
  var req = http.get(url, function(res) {
    var xml = '';
    res.on('data', function(chunk) {
      xml += chunk;
    });
    res.on('error', function(e) {
      callback(e, null);
    }); 
    res.on('timeout', function(e) {
      callback(e, null);
    }); 
    res.on('end', function() {
      parseString(xml, function(err, result) {
        if (err) return callback(err, null);
        callback(null, result);
      });
    });
  });
}
