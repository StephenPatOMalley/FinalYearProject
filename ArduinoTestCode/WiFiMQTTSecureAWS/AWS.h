#ifndef AWS_h
#define AWS_h

#include <Arduino.h>

// The MQTTT endpoint for the device (unique for each AWS account but shared amongst devices within the account)
#define AWS_IOT_ENDPOINT "a1o14bye3fgtls-ats.iot.us-east-1.amazonaws.com"

// The name of the device MUST match up with the name defined in the AWS console
#define DEVICE_NAME "ESP-32"

#define AWS_IOT_TOPIC "esp32/pub"

void ConnectToAWS();
void MQTT_Initialize();
void MQTT_Publish();

#endif
