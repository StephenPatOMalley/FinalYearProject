#include "WiFi_ESP.h"
#include "BME_Sensor.h"
#include "MQ135_Sensor.h"
#include "AWS.h"

void setup() {
  Serial.begin(115200);

  InitialiseBME();
  InitialiseMQ135();
  CalibrateMQ135();
  WifiSetup();
  ConnectToAWS();
  MQTT_Initialize();
  
}

void loop() {
  MQTT_Publish();
  MQTT_Reconnect();
  WifiReconnect();
}
