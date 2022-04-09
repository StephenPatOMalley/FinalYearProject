#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <MQTTPubSubClient.h>
#include <ArduinoJson.h>

#include "AWS.h"
#include "AWS_Certs.h"

WiFiClientSecure client;
MQTTPubSubClient mqtt;

void ConnectToAWS(){
    // connect to aws endpoint with certificates and keys
    client.setCACert(AWS_CERT_CA);
    client.setCertificate(AWS_CERT_CRT);
    client.setPrivateKey(AWS_CERT_PRIVATE);

    while (!client.connect(AWS_IOT_ENDPOINT, 8883)) {
        Serial.print(".");
        delay(1000);
    }
    Serial.println(" connected!");
}

void MQTT_Initialize(){
  
    // initialize mqtt client
    mqtt.begin(client);

    Serial.print("connecting to aws mqtt broker...");
    while (!mqtt.connect(DEVICE_NAME)) {
        Serial.print(".");
        delay(1000);
    }
    Serial.println(" connected!");
}

void MQTT_Publish(){
    mqtt.update();
    
    static uint32_t prev_ms = millis();
    if (millis() > prev_ms + 5000) {
        prev_ms = millis();
        
        StaticJsonDocument<128> jsonDoc;
        
        // Write the temperature & humidity. Here you can use any C++ type (and you can refer to variables)
        jsonDoc["temperature"] = 23.76;
        jsonDoc["humidity"] = 78.12;
        jsonDoc["CO2"] = 432.4;
      
        Serial.println("Publishing message to AWS...");
        char buffer[128];
        serializeJson(jsonDoc, buffer);

        Serial.println(buffer);
        
        if(mqtt.publish(AWS_IOT_TOPIC, buffer) == 0){
          Serial.println("Failed\n");
        }else{
          Serial.println("Success\n");
        }
    }
}
