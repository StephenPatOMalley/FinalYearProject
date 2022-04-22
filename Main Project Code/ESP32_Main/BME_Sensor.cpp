#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <Adafruit_Sensor.h>

#include "BME_Sensor.h"

//BME I2C Settup
Adafruit_BME280 bme;

void InitialiseBME(){
    if (!bme.begin(0x76)){
    Serial.println("Could not find a valid BME Sensor");
    while(1);
  }
}

float BME_Temperature(){
  float temperature = 0.0;
  
  temperature = bme.readTemperature();
  Serial.print(temperature);
  Serial.println(" °C");

  return temperature;
}

float BME_Humidity(){
  float humidity = 0.0;
  
  humidity = bme.readHumidity();
  Serial.print(humidity);
  Serial.println(" %");

  return humidity;
}
