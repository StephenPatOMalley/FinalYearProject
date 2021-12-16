

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#include <FirebaseESP32.h>
#include  <WiFi.h>

#define SEALEVELPRESSURE_HPA (1013.25)

#define FIREBASE_HOST "finalyear-651ba-default-rtdb.europe-west1.firebasedatabase.app"
#define WIFI_SSID "FRITZ!Box 7430 BX" // Change the name of your WIFI
#define WIFI_PASSWORD "FATHERDOUGAL" // Change the password of your WIFI
#define FIREBASE_Authorization_key "LG4iNRSfrmD587jsaZgw7C2J1sIlJnRRPzYUcMp6"

Adafruit_BME280 bme; // I2C

FirebaseData firebaseData;
FirebaseJson json;

unsigned long delayTime;
int fan = 0;
float temp = 0, pres = 0, alt = 0, hum = 0;  

void setup() {

 Serial.begin(115200);
   WiFi.begin (WIFI_SSID, WIFI_PASSWORD);
   Serial.print("Connecting...");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.begin(FIREBASE_HOST,FIREBASE_Authorization_key);

  unsigned status;
  
  // default settings
  status = bme.begin(0x76);  
  // You can also pass in a Wire library object like &Wire2
  // status = bme.begin(0x76, &Wire2)
  if (!status) {
      Serial.println("Could not find a valid BME280 sensor, check wiring, address, sensor ID!");
      Serial.print("SensorID was: 0x"); Serial.println(bme.sensorID(),16);
      while (1) delay(10);
  }
  
  Serial.println("-- Default Test --");
  delayTime = 10000;

  Serial.println();
}

void loop() {
  
  Serial.print("Temperature = ");
  temp = bme.readTemperature();
  Serial.print(temp);
  Serial.println(" °C");

  Serial.print("Pressure = ");
  pres = bme.readPressure() / 100.0F;
  Serial.print(pres);
  Serial.println(" hPa");

  Serial.print("Approx. Altitude = ");
  alt = bme.readAltitude(SEALEVELPRESSURE_HPA);
  Serial.print(alt);
  Serial.println(" m");

  Serial.print("Humidity = ");
  hum = bme.readHumidity();
  Serial.print(hum);
  Serial.println(" %");

  Serial.println();
  
  Firebase.setFloat(firebaseData, "/ESP32_APP/Data/Temperature", temp);
  Firebase.setFloat(firebaseData, "/ESP32_APP/Data/Pressure", pres);
  Firebase.setFloat(firebaseData, "/ESP32_APP/Data/Altitude", alt);
  Firebase.setFloat(firebaseData, "/ESP32_APP/Data/Humidity", hum);
  if(temp >= 30){
    fan = 1;
    Firebase.setInt(firebaseData, "/ESP32_APP/Data/EnableFan", fan);
  }
  else if(temp <= 29 && fan == 1){
    fan = 0;
    Firebase.setInt(firebaseData, "/ESP32_APP/Data/EnableFan", fan);
  }
  delay(delayTime);
}
