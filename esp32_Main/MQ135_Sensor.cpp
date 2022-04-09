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
  float calcR0 = 0;
  
  Serial.print("Calibrating please wait.");
  for(int i = 1; i<=10; i ++)
  {
    MQ135.update(); // Update data, the arduino will read the voltage from the analog pin
    calcR0 += MQ135.calibrate(RATIO_MQ135_CLEAN_AIR);
    Serial.print(".");
  }
  MQ135.setR0(calcR0/10);
  Serial.println("  done!.");
  
  if(isinf(calcR0)) {Serial.println("Warning: Conection issue, R0 is infinite (Open circuit detected) please check your wiring and supply"); while(1);}
  if(calcR0 == 0){Serial.println("Warning: Conection issue found, R0 is zero (Analog pin shorts to ground) please check your wiring and supply"); while(1);}
  MQ135.serialDebug(true);
}

void MQ135Values(){
  float CO2 = 0;
  MQ135.update();
  CO2 = MQ135.readSensor(); // Sensor will read PPM concentration using the model, a and b values
  //https://gml.noaa.gov/ccgg/trends/monthly.html
  // 420 is added becuse the initial state of the library assumes that air has 0 PPM of CO2, when it around 420
  CO2 += 420;                
  Serial.print(CO2);
  Serial.println(" PPM");
  MQTTPubCO2(CO2);
}
