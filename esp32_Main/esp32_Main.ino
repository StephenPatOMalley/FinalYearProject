#include "WiFi_ESP.h"
#include "MQTT.h"
#include "BME_Sensor.h"

void setup() {
  Serial.begin(115200);

  InitialiseBME();
  WifiSetup();
  MQTTConnectHost();
  MQTTConnectBroker();
  MQTTSubscribe();
  
}

void loop() {
  MQTTreconnect();
  MQTTPublish();
}
