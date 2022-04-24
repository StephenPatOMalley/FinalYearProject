#ifndef WiFi_ESP_h
#define WiFi_ESP_h

#include <Arduino.h>

//SSID and Password combination for router
//#define SSID "eir83257563"
//#define PASSWORD "7PJRUsuhkk"

//#define SSID "FRITZ!Box 7530 JF"
//#define PASSWORD "64243483391113090713"

#define SSID "OnePlus5T"
#define PASSWORD "niceguy1"

//Initialise Wifi Connection
void WifiSetup();
void WifiReconnect();

#endif //WiFi_ESP_h
