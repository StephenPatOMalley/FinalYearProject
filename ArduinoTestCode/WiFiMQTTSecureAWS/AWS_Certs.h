#ifndef AWS_Certs_h
#define AWS_Certs_h

#include <Arduino.h>

// Amazon's root CA. This should be the same for everyone.
const char AWS_CERT_CA[] = "-----BEGIN CERTIFICATE-----\n" \
"MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\n" \
"ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6\n" \
"b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL\n" \
"MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv\n" \
"b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj\n" \
"ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM\n" \
"9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw\n" \
"IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6\n" \
"VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L\n" \
"93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm\n" \
"jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC\n" \
"AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA\n" \
"A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI\n" \
"U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs\n" \
"N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv\n" \
"o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU\n" \
"5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy\n" \
"rqXRfboQnoZsG4q5WTP468SQvvG5\n" \
"-----END CERTIFICATE-----\n";

// The private key for your device
const char AWS_CERT_PRIVATE[] = "-----BEGIN RSA PRIVATE KEY-----\n" \
"MIIEogIBAAKCAQEAxqoCkNu3NOKHCglhFaq6QFn5m712qUuKbk7QpurKQO/9C97T\n" \
"P1/JTr7hF4lkj64a4XpBydH/1d8ZK0WTGl1qFnR/YwYFHY99rYG8fS8IfUfPcyWo\n" \
"JGULdw99v9wl0JDwS4jk99jFQX5EetJWBHSUP1YdFs4DKRK5rOWBc00r0Fwg1+5q\n" \
"jQbuQ2rm0ixu5CR40djlcKSLOREgo2DxGjD7QIoZTWslmvwO2VUYZZ7vsbkTHl/R\n" \
"+2QO9u3Tnk6DBNku2siKSLZxjI3nFkh8GK++RGnujVn7S0UlnZI0C2es0sQPdhrz\n" \
"h7LOztHyCXs40SOqhqhWr9qhIDEJ1M/BST82MQIDAQABAoIBAFNvK0yzOipXyOcK\n" \
"MV/sJ/TG1PH3jFJli2nwZ+jySqcjI19M4eOH0v/jYp2D8lv1fwybT+326D9mRyfJ\n" \
"PJKiEOAFZUqtSJC1ps6r4gGhMyuKcTGm6wr99Oa39tQRHUCO3pyaja8Ztx5ebVw3\n" \
"4jBU1b4T6HufYexqFNjsOoW2L2R9zog9i2gLeks9ALxKdorXZYZlQShdX5+IbofO\n" \
"0qBdByraP3N8fhz2bDRwn50bCfSrjFXCLOo9uKTC8DITYC09xwTPR7l8TeKUCt3F\n" \
"F+lAdIIpP2I3RJ/L02Xw+N13YvG4yi3+hat8qawMk/A2oaeCNM0zMDgKygBji2kT\n" \
"7kamy8ECgYEA9vG9eFi+NLWC7lxtMRaZieDaHe/oT4JGObuSYlXQ5vBlEO7uauRV\n" \
"GeA3l4LsDjBt717QVtN8noAkBiUWnabBzSfoKnRI8RATRmF878Pm8q1GPSRST/5x\n" \
"4odWIhI0x8Wx+VPAH/+W5Gq1uWoxT5OkpRpmu0x1eTcPm91sXV4tlr0CgYEAzfMG\n" \
"nIJGGUq48e/unOJI0ZIi+5xHoujBxJBm/yFjZRV2AQ+dkMVqyZEV4EwlqeNP0Wdm\n" \
"rkUotI+ufG8aVcq+6InuSJuBaW4jOO1+hT2aWTOHPHvBjPNO+PXTnN6+l2704d/A\n" \
"164JCt0KB1HX8C1s5mZ9YWUBDvRaDkWr3pe43oUCgYAhyqKqvToJ7GymQW+PsBAC\n" \
"lgpC3nljp+gELm6xlhyn/W1XC9sENYqPp+bzjK7Qoj/o6YiI2RfMeKx1Ss31dMRA\n" \
"Vp2mcZMpqZF5qA14oc4QlzVtWHMLDz52SR64OtWOILdh7tvzhP4Y86E6ZhWpVgLJ\n" \
"tPsp1iSdGbPBGGOjwydp4QKBgDAIb1FPXPQHJm1e7ULvz9X5BGm0gEyxhofGug7l\n" \
"BZ6My9Hhh3k9YfOTAAwpFluyJWqMeDlK7fx2ylZBP14lBDON/+I1SpCBXHupgGmo\n" \
"/XeyeecUYgbytEeCZhFfLgp5mWmY2wwyje9XsEAWyYs9vPlbjACMIxwOx3Yur7Ah\n" \
"qL9VAoGAeabOSL4z2zAS1jMK6f5rRdwYfn11sLnJr0ZhzWIqBLju1DHbzDxq2JcH\n" \
"+BjZdX23+l/SoHNb6YGMqIupmni6EhgESMuJX7cCNQVxTl3/8l/Yx8995yjaS34p\n" \
"bjI9x4hbqyPC3dUgSpYznvxAcoOkuW+s5/o6Bf7S68Lsdt9erbc=\n" \
"-----END RSA PRIVATE KEY-----\n";

// The certificate for your device
const char AWS_CERT_CRT[] = "-----BEGIN CERTIFICATE-----\n" \
"MIIDWTCCAkGgAwIBAgIUZTBWQCLPXKfDeBNEmfQ1uXiQubQwDQYJKoZIhvcNAQEL\n" \
"BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g\n" \
"SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTIyMDQwNzEwNDkx\n" \
"N1oXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0\n" \
"ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMaqApDbtzTihwoJYRWq\n" \
"ukBZ+Zu9dqlLim5O0KbqykDv/Qve0z9fyU6+4ReJZI+uGuF6QcnR/9XfGStFkxpd\n" \
"ahZ0f2MGBR2Pfa2BvH0vCH1Hz3MlqCRlC3cPfb/cJdCQ8EuI5PfYxUF+RHrSVgR0\n" \
"lD9WHRbOAykSuazlgXNNK9BcINfuao0G7kNq5tIsbuQkeNHY5XCkizkRIKNg8Row\n" \
"+0CKGU1rJZr8DtlVGGWe77G5Ex5f0ftkDvbt055OgwTZLtrIiki2cYyN5xZIfBiv\n" \
"vkRp7o1Z+0tFJZ2SNAtnrNLED3Ya84eyzs7R8gl7ONEjqoaoVq/aoSAxCdTPwUk/\n" \
"NjECAwEAAaNgMF4wHwYDVR0jBBgwFoAU7/NfsQyROeg0m/pZw4bw+Cn0ZbIwHQYD\n" \
"VR0OBBYEFKHA5a5IJTc6LPa7gqZozMJPxs5kMAwGA1UdEwEB/wQCMAAwDgYDVR0P\n" \
"AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQCz2JIva5RVs/U2Mpb//tRO8r5l\n" \
"Q6HJYyNEP2cmfRqOpC9Kx3Yn1uw1SJxsfMl9WoX6PNK8tqUqgmsBtiu4izAFdzOi\n" \
"p8G15URBZJq4lZQu1rQD9KvBJR+05XfeDOb8PMU+QahgQi51Q0/oBx9752yRzt7y\n" \
"TlMgDLEU4/QbNTbd766UCPb1CKZz++a0tphs360tOhyeMHZtgRiI/TlFVmX4CAH+\n" \
"MRDL4E1R6WuYUB/uqH5snj8CbfR7/kGp1I7vvNu8xtHUCad1s8o5FJ/IPpDzIiMq\n" \
"AyrdeKFWAPJIy0WsooB/lleIUZoOK4a4c10B+STYEZ2V7AKLVOyxGCwPN6vp\n" \
"-----END CERTIFICATE-----\n";

#endif