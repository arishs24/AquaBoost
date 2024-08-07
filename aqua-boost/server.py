import logging

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s:%(message)s')

# Add logging in functions
def read_serial():
    global data
    while True:
        if ser.in_waiting:
            line = ser.readline().decode('utf-8').strip()
            try:
                impedance = float(line)
                cursor.execute("INSERT INTO impedance (value) VALUES (?)", (impedance,))
                conn.commit()
                data.append(impedance)
                if len(data) > 50:
                    data.pop(0)  # Keep only the last 50 data points
                
                logging.info(f'Received impedance value: {impedance}')

                # Check for alert threshold
                if impedance > ALERT_THRESHOLD:
                    send_email_alert(impedance)
            except ValueError as e:
                logging.error(f'Error parsing impedance value: {e}')
