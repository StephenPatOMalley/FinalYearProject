#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <Arduino.h>
#include <MQTTPubSubClient.h>
#include <ArduinoJson.h>

#include "WiFi_ESP.h"
#include "MQTT.h"
#include "BME_Sensor.h"
#include "MQ135_Sensor.h"

WiFiClient esp_client;
MQTTPubSubClient esp_mqtt;

void MQTTConnectHost(){
  Serial.print("connecting to host...");
  while (!esp_client.connect(mqtt_server, mqtt_port)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println(" connected!");
}

void MQTTConnectBroker(){
  // initialize mqtt client
  esp_mqtt.begin(esp_client);

  Serial.print("connecting to mqtt broker...");
  while (!esp_mqtt.connect("espClient", "Steve", "covid")) {
      Serial.print(".");
      delay(1000);
  }
  Serial.println(" connected!");
}

void MQTTSubscribe(){
  // subscribe topic and callback which is called when esp32/output has come
  esp_mqtt.subscribe("esp32/output", [](const String& payload, const size_t size) {
      Serial.print("esp32/output ");
      Serial.println(payload);
  });
}

void MQTTPublish(){
  bool val = false;
  esp_mqtt.update();  // should be called
  
  // publish message
  static uint32_t prev_ms = millis();
  if (millis() > prev_ms + 1000) {
      prev_ms = millis();
      
      StaticJsonDocument<128> jsonDoc;
      
      // Write the temperature & humidity. Here you can use any C++ type (and you can refer to variables)
      jsonDoc["temperature"] = BME_Temperature();
      jsonDoc["humidity"] = BME_Humidity();
      jsonDoc["CO2"] = MQ135_CO2();
    
      Serial.println("Publishing message...");
      char buffer[128];
      serializeJson(jsonDoc, buffer);
      
      esp_mqtt.publish("esp32/roomData", buffer);
  }
}

void MQTTreconnect(){
  while(!esp_client.connected()){
    Serial.println("Trying to Reconnect...");
    MQTTConnectHost();
    MQTTConnectBroker();
    MQTTSubscribe();
    delay(5000);
  }
}
