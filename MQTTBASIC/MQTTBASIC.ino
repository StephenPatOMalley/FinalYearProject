#include <WiFi.h>
// or
// #include <Ethernet.h>
#include <MQTTPubSubClient.h>

WiFiClient client;
// or
// EthernetClient client;
MQTTPubSubClient mqtt;

void setup() {
    // start your network
    WiFi.begin("eir83257563", "7PJRUsuhkk");
    // connect to host
    client.connect("192.168.1.112", 1884);
    // initialize mqtt client
    mqtt.begin(client);
    // connect to mqtt broker
    mqtt.connect("arduino", "public", "public");

    // subscribe callback which is called when every packet has come
    mqtt.subscribe([](const String& topic, const String& payload, const size_t size) {
        Serial.println("mqtt received: " + topic + " - " + payload);
    });
    // subscribe topic and callback which is called when esp32/output has come
    mqtt.subscribe("esp32/output", [](const String& payload, const size_t size) {
        Serial.print("esp32/output");
        Serial.println(payload);
    });
}

void loop() {
    // should be called to trigger callbacks
    mqtt.update();
    // publish message
    mqtt.publish("esp32/output", "world");
    delay(1000);
}
