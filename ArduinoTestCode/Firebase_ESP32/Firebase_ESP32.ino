
#include <FirebaseESP32.h>
#include  <WiFi.h>

#define FIREBASE_HOST "finalyear-651ba-default-rtdb.europe-west1.firebasedatabase.app"
#define WIFI_SSID "FRITZ!Box 7430 BX" // Change the name of your WIFI
#define WIFI_PASSWORD "FATHERDOUGAL" // Change the password of your WIFI
#define FIREBASE_Authorization_key "LG4iNRSfrmD587jsaZgw7C2J1sIlJnRRPzYUcMp6"

FirebaseData firebaseData;
FirebaseJson json;

int hum;
int temp; 
  
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
  
}

void loop() {
  

  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.print("°C");
  Serial.print(" Humidity: ");
  Serial.print(hum);
  Serial.print("%");
  Serial.println();
  
  delay(200);
  Firebase.setFloat(firebaseData, "/ESP32_APP/Data/TEMPERATURE", temp);
  Firebase.setFloat(firebaseData, "/ESP32_APP/Data/HUMIDITY", hum);
  temp++;
  hum++;
}
