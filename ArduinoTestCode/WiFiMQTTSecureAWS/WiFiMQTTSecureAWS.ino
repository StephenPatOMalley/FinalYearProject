// this example is based on
// https://savjee.be/2019/07/connect-esp32-to-aws-iot-with-arduino-code/

#include <WiFi.h>
#include <WiFiClientSecure.h>

#include "AWS.h"

//SSID and Password combination for router
#define SSID "eir83257563"
#define PASS "7PJRUsuhkk"


void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASS);
  
  Serial.print("connecting to wifi...");
  while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
  }
  Serial.println(" connected!");
  
  ConnectToAWS();
  MQTT_Initialize();
}

void loop() {
  MQTT_Publish();
}
