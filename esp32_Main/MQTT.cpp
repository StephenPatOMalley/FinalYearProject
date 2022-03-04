#include <WiFi.h>
#include <Arduino.h>
#include <MQTTPubSubClient.h>

#include "WiFi_ESP.h"
#include "MQTT.h"
#include "BME_Sensor.h"

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
      BMEValues();
  }
}

void MQTTreconnect(){
  while(!esp_client.connected()){
    Serial.println("Trying to Reconnect");
    MQTTConnectHost();
    MQTTConnectBroker();
    MQTTSubscribe();
    delay(5000);
  }
}

void MQTTPubTemp(float tempValue){
  char tempString[8];
  dtostrf(tempValue, 1, 2, tempString); //Converts the Float into a string
  esp_mqtt.publish("esp32/temperature", tempString);
}

void MQTTPubPres(float presValue){
  char presString[8];
  dtostrf(presValue, 1, 2, presString); //Converts the Float into a string
  esp_mqtt.publish("esp32/pressure", presString);
}

void MQTTPubAlti(float altiValue){
  char altiString[8];
  dtostrf(altiValue, 1, 2, altiString); //Converts the Float into a string
  esp_mqtt.publish("esp32/altitude", altiString);
}

void MQTTPubHumi(float humiValue){
  char humiString[8];
  dtostrf(humiValue, 1, 2, humiString); //Converts the Float into a string
  esp_mqtt.publish("esp32/humidity", humiString);
}
