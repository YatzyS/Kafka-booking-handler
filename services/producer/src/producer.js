const _ = require('underscore');
const bodyParser = require('body-parser');
const express = require('express');
const Router = require('express-promise-router');
const kafka = require('kafka-node');
const { Client: PgClient } = require('pg');
const type = require('./type');

const pgClient = new PgClient();
pgClient.connect();

const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
const kafkaClient = new kafka.Client(process.env.KAFKA_ZOOKEEPER_CONNECT, 'producer-client', kafkaClientOptions);
const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);

kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

const app = express();
const router = new Router();

app.use('/', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/booking', (req, res) => {
  	const { user_id,vehicle_model_id, package_id, travel_type_id, from_area_id, to_area_id, from_city_id, to_city_id, from_date, to_date, online_booking, mobile_site_booking, booking_created, from_lat, from_long, to_lat, to_long, Car_Cancellation } = req.body


	const messageBuffer = type.toBuffer({
		user_id: Number(user_id),
		vehicle_model_id: Number(vehicle_model_id), 
		package_id: Number(package_id), 
		travel_type_id: Number(travel_type_id), 
		from_area_id: Number(from_area_id), 
		to_area_id: Number(to_area_id), 
		from_city_id: Number(from_city_id), 
		to_city_id: Number(to_city_id), 
		from_date: Date.parse(from_date), 
		to_date: Date.parse(to_date), 
		online_booking: Number(online_booking), 
		mobile_site_booking: Number(mobile_site_booking), 
		booking_created: Date.parse(booking_created), 
		from_lat: parseFloat(from_lat), 
		from_long: parseFloat(from_long), 
		to_lat: parseFloat(to_lat), 
		to_long: parseFloat(to_long), 
		car_cancellation: Number(Car_Cancellation)
	});
	//const messageBuffer = Buffer.from(JSON.stringify(req.body));

	const payload = [{
		topic: 'booking',
		messages: JSON.stringify(req.body),
		attributes: 1 	
	}];
	console.log(payload);
  kafkaProducer.send(payload, function(error, result) {
    if (error) {
     // console.error('Sending payload failed:', error);
      res.status(500).json(error);
    }
    //  console.log('Sending payload result:', result);
      res.status(202).json(result);
  });
});

router.get('/booking', async (req, res) => {
  const { rows } = await pgClient.query('SELECT * FROM bookings');
  res.status(200).json(rows);
});

app.listen(process.env.PRODUCER_PORT);
