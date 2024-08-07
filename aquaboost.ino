#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "MAX30009.h"  // Include the library for MAX30009 if available

#define SDA_PIN A4
#define SCL_PIN A5

// Create an instance of the LCD display
LiquidCrystal_I2C lcd(0x27, 16, 2); // Change 0x27 to your LCD's I2C address

MAX30009 max30009;

void setup() {
  // Initialize serial communication at 9600 baud rate
  Serial.begin(9600);

  // Initialize I2C communication
  Wire.begin(SDA_PIN, SCL_PIN);

  // Initialize the LCD
  lcd.begin();
  lcd.backlight();
  lcd.print("Initializing...");
  
  // Initialize the MAX30009 sensor
  if (!max30009.begin()) {
    Serial.println("MAX30009 not detected. Check wiring.");
    lcd.clear();
    lcd.print("Sensor error!");
    while (1);
  }

  // Configure the MAX30009 settings
  max30009.setImpedanceMode(MAX30009_IMPEDANCE_MODE);
  max30009.setImpedanceFrequency(MAX30009_IMPEDANCE_FREQ_100KHZ);

  lcd.clear();
  lcd.print("Aqua Boost");
  delay(2000);
}

void loop() {
  // Read impedance data from the MAX30009
  float impedance = max30009.readImpedance();

  // Print the impedance data to the Serial Monitor
  Serial.print("Impedance: ");
  Serial.print(impedance);
  Serial.println(" ohms");

  // Display the impedance data on the LCD
  lcd.clear();
  lcd.print("Impedance:");
  lcd.setCursor(0, 1);
  lcd.print(impedance);
  lcd.print(" ohms");

  // Delay for a while before the next reading
  delay(1000);
}
