#ifndef MQTT_Sub_h
#define MQTT_Sub_h

#include <Arduino.h>

//Server and Port for MQTT server
#define mqtt_server "192.168.178.26"
//#define mqtt_server "192.168.1.112"
#define mqtt_port 1884

void MQTTConnectHost();
void MQTTConnectBroker();
void MQTTSubscribe();
void MQTTPublish();
void MQTTreconnect();
void MQTTPubTemp(float);


#endif //MQTT_Sub_h
