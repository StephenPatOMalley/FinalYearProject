#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Arduino.h>

#include "WiFi_ESP.h"
#include "AWS.h"

void WifiSetup(){
  delay(50);
  Serial.println("Connecting to ");
  Serial.print(SSID);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void WifiReconnect(){
  while(WiFi.status() != WL_CONNECTED){
    WifiSetup();
    MQTT_Reconnect();
  }
}
