#ifndef MQ135_Sensor_h
#define MQ135_Sensor_h

#include <Arduino.h>

#define BORAD "ESP-32"              // ESP-32 board
#define PIN 34                       // IO34 ESP32
#define SENSOR_TYPE "MQ-135"        // MQ135 Type Sensor
#define VOLTAGE_RESOLUTION 3.3      // 3V3 Source: https://randomnerdtutorials.com/esp32-adc-analog-read-arduino-ide/
#define ADC_BIT_RESOLUTION 12       // ESP-32 bit resolution. Source: https://randomnerdtutorials.com/esp32-adc-analog-read-arduino-ide/
#define RATIO_MQ135_CLEAN_AIR 3.6   // Ratio of your sensor, for an MQ-135

void InitialiseMQ135();
void CalibrateMQ135();
float MQ135_CO2();

#endif //MQ135_Sensor_h
