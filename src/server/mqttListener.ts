import mqtt, { MqttClient } from 'mqtt';
import axios from 'axios';
import { parse } from 'path';

const brokerUrl = 'mqtt://localhost';
const client: MqttClient = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log('✅ Connected to MQTT broker');

    client.subscribe(['device/data'], (err) => {
        if (err) {
            console.error('❌ Subscription error:', err.message);
        } else {
            console.log('📡 Subscribed to topic: device/data');
        }
    });
});

client.on('message', (topic: string, message: Buffer) => {
    const payload = message.toString();
    if (!payload) {
        console.error('❌ Received empty payload');
        return;
    }
    const data = JSON.parse(payload); 

    console.log(`Received on topic: ${topic}`);
    
    async function postData() {
        try {
            const response = await axios.post('http://localhost:3000/api/persist', {
                deviceId: parseInt(data.deviceId, 10),
                latitude: data.gps.latitude,
                longitude: data.gps.longitude,
                speed: parseInt(data.speed.value, 10),
                // speed: parseInt(data.speed,10),
                datetime : data.timestamp
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    } postData();
});
