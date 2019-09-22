const kafka = require('kafka-node');
const { Client: PgClient } = require('pg');
const type = require('./type');  

(async () => {
  const pgClient = new PgClient();
  await pgClient.connect();

  const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
  const kafkaClient = new kafka.Client(process.env.KAFKA_ZOOKEEPER_CONNECT, 'consumer-client', kafkaClientOptions);

  const topics = [
    { topic: 'booking' }
  ];
  
 
  const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
  };


  
  const kafkaConsumer = new kafka.HighLevelConsumer(kafkaClient, topics, options);
  kafkaConsumer.on('message', async function(message) {
    console.log('Message received:', message.value);
    const messageBuffer = new Buffer(message.value);

    const { user_id, vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, Car_Cancellation } = JSON.parse(message.value)//type.fromBuffer(messageBuffer.slice(0));
  //  console.log('Decoded Message:', typeof decodedMessage, decodedMessage);

    const insertResponse = await pgClient.query({
      text: 'INSERT into bookings(user_id, vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, Car_Cancellation) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)',
      values: [user_id, vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, Car_Cancellation],
    });

    console.log('Insert Response:', insertResponse);
  });
  
  kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
  kafkaConsumer.on('error', (error) => console.error('Kafka consumer error:', error));
})();
