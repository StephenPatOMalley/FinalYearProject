#ifndef BME_Sensor_h
#define BME_Sensor_h

#include <Arduino.h>

#define SEALEVELPRESSURE_HPA 1030

void InitialiseBME();
float BME_Temperature();
float BME_Humidity();

#endif //BME_Sensor_h
