#include "WiFi_ESP.h"
#include "MQTT.h"
#include "BME_Sensor.h"
#include "MQ135_Sensor.h"

void setup() {
  Serial.begin(115200);

  InitialiseBME();
  InitialiseMQ135();
  CalibrateMQ135();
  WifiSetup();
  MQTTConnectHost();
  MQTTConnectBroker();
  MQTTSubscribe();
  
}

void loop() {
  MQTTreconnect();
  MQTTPublish();
}
