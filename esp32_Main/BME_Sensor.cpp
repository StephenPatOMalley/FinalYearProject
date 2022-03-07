#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <Adafruit_Sensor.h>

#include "BME_Sensor.h"
#include "MQTT.h"

//BME I2C Settup
Adafruit_BME280 bme;

void InitialiseBME(){
    if (!bme.begin(0x76)){
    Serial.println("Could not find a valid BME Sensor");
    while(1);
  }
}

void BMEValues(){
  float temperature = 0.0;
  temperature = bme.readTemperature();
  Serial.print(temperature);
  Serial.println(" °C");
  MQTTPubTemp(temperature);

  float pressure = 0.0;
  pressure = bme.readPressure() / 100.0F;;
  Serial.print(pressure);
  Serial.println(" hPa");
  MQTTPubPres(pressure);

  float altitude = 0.0;
  altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
  Serial.print(altitude);
  Serial.println(" m");
  MQTTPubAlti(altitude);

  float humidity = 0.0;
  humidity = bme.readHumidity();
  Serial.print(humidity);
  Serial.println(" %");
  MQTTPubHumi(humidity);
  
}
