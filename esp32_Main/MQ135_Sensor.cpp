#include <Arduino.h>
#include <MQUnifiedsensor.h>

#include "MQ135_Sensor.h"
#include "MQTT.h"

MQUnifiedsensor MQ135(BORAD, VOLTAGE_RESOLUTION, ADC_BIT_RESOLUTION, PIN, SENSOR_TYPE);

void InitialiseMQ135(){
  // Set math model to calculate the PPM concentration and the value of constants
  MQ135.setRegressionMethod(1);   // _PPM =  a*ratio^b
  
  // Configure the pin of arduino as input.
  MQ135.init();
  MQ135.setRL(1);                 // RL Value is equal to 1k, the default is set to 10k
  
  // Configure the equation to calculate CO2 concentration value
  MQ135.setA(110.47); 
  MQ135.setB(-2.862); 
}

void CalibrateMQ135(){
  MQ135.setR0(16.6);
  MQ135.serialDebug(true);
}

float MQ135_CO2(){
  MQ135.update();
  
  float CO2 = 0;
  CO2 = MQ135.readSensor(); // Sensor will read PPM concentration using the model, a and b values

  //https://gml.noaa.gov/ccgg/trends/monthly.html
  // 420 is added becuse the initial state of the library assumes that air has 0 PPM of CO2, when it around 420
  CO2 += 420;                
  Serial.print(CO2);
  Serial.println(" PPM");
  
  return CO2;
}
